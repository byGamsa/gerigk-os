// Guestbook submission: validate → rate limit → link/word/spam filter → toxicity model (Hugging Face) → insert (service role)
import { createClient } from 'npm:@supabase/supabase-js@2';

const LIMITS = { title: 60, body: 1000 };
// Max entries per IP within the window
const RATE_LIMIT = { count: 3, windowMinutes: 30 };
// Free multilingual toxicity classifier (labels: neutral / toxic)
const MODEL_URL = 'https://router.huggingface.co/hf-inference/models/textdetox/xlmr-large-toxicity-classifier';
// Toxicity score from which a note is rejected
const TOXIC_THRESHOLD = 0.5;

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

// Obvious insults/slurs (normalized, whole words) – subtler cases are up to the model
const BLOCKED_WORDS = [
  'arschloch', 'wichser', 'fotze', 'hurensohn', 'hure', 'schlampe', 'missgeburt', 'spast', 'spasti',
  'fick', 'ficken', 'ficker', 'scheisse', 'kanake', 'neger', 'schwuchtel', 'bastard',
  'fuck', 'fucking', 'fucker', 'motherfucker', 'bitch', 'cunt', 'pussy', 'whore', 'slut', 'retard',
  'nigger', 'nigga', 'faggot', 'asshole', 'porn', 'porno',
];

const LINK_PATTERN = /(https?:\/\/|www\.|\b[a-z0-9-]+\.(com|de|net|org|io|ru|xyz|info|biz|link|app|me)\b|@[a-z0-9-]+\.[a-z]{2,})/i;
const PHONE_PATTERN = /(\+?\d[\d\s/-]{7,}\d)/;

const json = (status: number, body: unknown) =>
  new Response(JSON.stringify(body), { status, headers: { ...CORS, 'Content-Type': 'application/json' } });

// Lowercase, strip accents, map common leetspeak so "Sch3isse" or "f.u.c.k" still match
function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/ß/g, 'ss')
    .replace(/[0@4]/g, (c) => ({ '0': 'o', '@': 'a', '4': 'a' })[c]!)
    .replace(/[1!|]/g, 'i')
    .replace(/3/g, 'e')
    .replace(/[5$]/g, 's')
    .replace(/7/g, 't');
}

function containsBlockedWord(text: string): boolean {
  const normalized = normalize(text);
  const words = normalized.split(/[^a-z]+/).filter(Boolean);
  const squashed = normalized.replace(/[^a-z]/g, '');
  return words.some((w) => BLOCKED_WORDS.includes(w)) || BLOCKED_WORDS.some((w) => w.length >= 6 && squashed.includes(w));
}

// Keyboard mashing / repetition / no real words – the toxicity model doesn't catch these
function looksLikeSpam(text: string): boolean {
  const letters = text.replace(/[^\p{L}]/gu, '');
  if (letters.length < 2) return true;
  if (/(.)\1{7,}/u.test(text)) return true;
  const words = text.toLowerCase().split(/\s+/).filter((w) => w.length > 2);
  if (words.length >= 6 && new Set(words).size / words.length < 0.3) return true;
  // Long words without vowels ("asdfghjkl", "qwrtzpsd") are mashing
  return words.some((w) => w.length >= 8 && !/[aeiouyäöü]/.test(w));
}

// New secret keys (JSON dictionary) with fallback to the legacy service role key
function serviceKey(): string {
  try {
    const keys = JSON.parse(Deno.env.get('SUPABASE_SECRET_KEYS') ?? '{}') as Record<string, string>;
    const key = keys.default ?? Object.values(keys)[0];
    if (key) return key;
  } catch {
    // fall through to the legacy key
  }
  return Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';
}

// Salt: optional dedicated secret, otherwise the (server-only) project secret key
async function hashIp(ip: string): Promise<string> {
  const salt = Deno.env.get('GUESTBOOK_IP_SALT') ?? serviceKey();
  const data = new TextEncoder().encode(`${salt}:${ip}`);
  const digest = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(digest), (b) => b.toString(16).padStart(2, '0')).join('');
}

type Verdict = { status: 'approved' | 'rejected' | 'pending'; reason: string };

interface LabelScore {
  label: string;
  score: number;
}

async function moderate(text: string): Promise<Verdict> {
  const token = Deno.env.get('HF_TOKEN');
  // Without the model nothing is published automatically
  if (!token) return { status: 'pending', reason: 'no moderation token configured' };

  try {
    const res = await fetch(MODEL_URL, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ inputs: text, options: { wait_for_model: true } }),
      signal: AbortSignal.timeout(20_000),
    });
    if (!res.ok) return { status: 'pending', reason: `moderation error ${res.status}` };
    const raw = (await res.json()) as LabelScore[] | LabelScore[][];
    const scores = (Array.isArray(raw[0]) ? raw[0] : raw) as LabelScore[];
    const toxic = scores.find((s) => s.label.toLowerCase() === 'toxic')?.score;
    if (toxic === undefined) return { status: 'pending', reason: 'unexpected moderation result' };
    return toxic >= TOXIC_THRESHOLD
      ? { status: 'rejected', reason: `toxic (${toxic.toFixed(2)})` }
      : { status: 'approved', reason: `neutral (toxic ${toxic.toFixed(2)})` };
  } catch {
    return { status: 'pending', reason: 'moderation unavailable' };
  }
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: CORS });
  if (req.method !== 'POST') return json(405, { error: 'method_not_allowed' });

  let input: Record<string, unknown>;
  try {
    input = await req.json();
  } catch {
    return json(400, { error: 'invalid_json' });
  }

  // Honeypot: real visitors never fill the hidden "website" field
  if (typeof input.website === 'string' && input.website.trim() !== '') return json(200, { id: crypto.randomUUID() });

  const title = String(input.title ?? '').trim().replace(/\s+/g, ' ');
  const body = String(input.body ?? '').trim();
  const lang = input.lang === 'en' ? 'en' : 'de';

  if (!title || !body) return json(400, { error: 'missing_fields' });
  if (title.length > LIMITS.title || body.length > LIMITS.body) return json(400, { error: 'too_long' });

  const supabase = createClient(Deno.env.get('SUPABASE_URL')!, serviceKey(), {
    auth: { persistSession: false },
  });

  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  const ipHash = await hashIp(ip);
  const since = new Date(Date.now() - RATE_LIMIT.windowMinutes * 60_000).toISOString();
  const { count } = await supabase
    .from('guestbook_entries')
    .select('id', { count: 'exact', head: true })
    .eq('ip_hash', ipHash)
    .gte('created_at', since);
  if ((count ?? 0) >= RATE_LIMIT.count) return json(429, { error: 'rate_limited' });

  const text = `${title}\n${body}`;
  const verdict: Verdict =
    LINK_PATTERN.test(text) || PHONE_PATTERN.test(text)
      ? { status: 'rejected', reason: 'link or contact details' }
      : containsBlockedWord(text)
        ? { status: 'rejected', reason: 'blocked word' }
        : looksLikeSpam(body)
          ? { status: 'rejected', reason: 'spam or gibberish' }
          : await moderate(text);

  const { data, error } = await supabase
    .from('guestbook_entries')
    .insert({ title, body, lang, status: verdict.status, moderation_reason: verdict.reason, ip_hash: ipHash })
    .select('id')
    .single();
  if (error) return json(500, { error: 'insert_failed' });

  // The moderation result stays on the server – the visitor's file is saved either way
  return json(200, { id: data.id });
});

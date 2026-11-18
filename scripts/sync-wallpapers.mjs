// Downloads the curated Unsplash photos once, converts them to AVIF/WebP in several widths and uploads them to Supabase Storage (flags: --local, --refresh)
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import { mapLimit } from './lib/http.mjs';

const root = new URL('..', import.meta.url);
const path = (p) => fileURLToPath(new URL(p, root));
const manifestPath = path('src/config/wallpapers.manifest.json');
const outputPath = path('src/data/wallpapers.generated.json');

const BUCKET = 'wallpapers';
// Delivered widths (px); the client picks the smallest one that covers screen × DPR
const WIDTHS = [1280, 1920, 2560, 3840];
const FORMATS = [
  { ext: 'avif', type: 'image/avif', encode: (img) => img.avif({ quality: 55, effort: 4 }) },
  { ext: 'webp', type: 'image/webp', encode: (img) => img.webp({ quality: 80 }) },
];

const args = process.argv.slice(2);
const local = args.includes('--local');
const refresh = args.includes('--refresh');
const log = (msg) => console.log(`[wallpapers:sync] ${msg}`);
function fail(message) {
  console.error(`[wallpapers:sync] ${message}`);
  process.exit(1);
}

const readJson = (file, fallback) => (existsSync(file) ? JSON.parse(readFileSync(file, 'utf8')) : fallback);

// Target: Supabase Storage (public bucket) or, with --local, public/wallpapers for testing
async function createTarget() {
  if (local) {
    return {
      baseUrl: '/wallpapers',
      exists: (key) => existsSync(path(`public/wallpapers/${key}`)),
      put: async (key, buffer) => {
        const file = path(`public/wallpapers/${key}`);
        mkdirSync(dirname(file), { recursive: true });
        writeFileSync(file, buffer);
      },
    };
  }
  const url = process.env.VITE_SUPABASE_URL?.trim();
  const secret = process.env.SUPABASE_SECRET_KEY?.trim();
  if (!url || !secret) fail('VITE_SUPABASE_URL und SUPABASE_SECRET_KEY in .env.local nötig (oder --local).');
  const { createClient } = await import('@supabase/supabase-js');
  const storage = createClient(url, secret, { auth: { persistSession: false } }).storage.from(BUCKET);
  return {
    baseUrl: `${url.replace(/\/$/, '')}/storage/v1/object/public/${BUCKET}`,
    exists: () => true,
    put: async (key, buffer, contentType) => {
      // Paths never change for a photo → cache for a year
      const { error } = await storage.upload(key, buffer, { contentType, upsert: true, cacheControl: '31536000' });
      if (error) throw new Error(`Upload ${key}: ${error.message}`);
    },
  };
}

// Same as the "Download" button on unsplash.com – counts as a download for the photographer, no API key involved
async function downloadOriginal(id) {
  const res = await fetch(`https://unsplash.com/photos/${id}/download?force=true`, { redirect: 'follow' });
  if (!res.ok) throw new Error(`Download ${id}: HTTP ${res.status}`);
  return Buffer.from(await res.arrayBuffer());
}

const hex = ({ r, g, b }) => `#${[r, g, b].map((v) => v.toString(16).padStart(2, '0')).join('')}`;

async function processPhoto(photo, target) {
  const original = await downloadOriginal(photo.id);
  const base = sharp(original, { limitInputPixels: false }).rotate();
  const meta = await base.metadata();
  const width = meta.autoOrient?.width ?? meta.width;
  const height = meta.autoOrient?.height ?? meta.height;
  // Average color (1×1 resize) as the loading placeholder
  const { data: px } = await base.clone().resize(1, 1, { fit: 'fill' }).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const average = { r: px[0], g: px[1], b: px[2] };

  // Never upscale; the smallest width is always produced
  const widths = WIDTHS.filter((w, i) => i === 0 || w <= width);
  for (const w of widths) {
    const resized = base.clone().resize({ width: Math.min(w, width), withoutEnlargement: true });
    for (const format of FORMATS) {
      const buffer = await format.encode(resized.clone()).toBuffer();
      await target.put(`${photo.id}/${w}.${format.ext}`, buffer, format.type);
    }
  }
  return { ...photo, width, height, color: hex(average), widths };
}

const manifest = readJson(manifestPath, { photos: [] });
const previous = readJson(outputPath, { baseUrl: '', photos: [] });
const target = await createTarget();
const known = new Map(previous.baseUrl === target.baseUrl ? previous.photos.map((p) => [p.id, p]) : []);

log(`${manifest.photos.length} Fotos → ${local ? 'public/wallpapers' : `Supabase-Bucket „${BUCKET}“`}`);

const results = await mapLimit(manifest.photos, 2, async (photo) => {
  const done = known.get(photo.id);
  // Only new photos are processed; --refresh re-encodes all
  if (done && !refresh && target.exists(`${photo.id}/${done.widths[0]}.avif`)) {
    log(`✓ ${photo.id} (vorhanden)`);
    return { ...done, author: photo.author, username: photo.username };
  }
  try {
    const result = await processPhoto(photo, target);
    log(`✓ ${photo.id} ${result.width}×${result.height} → ${result.widths.join('/')} px`);
    return result;
  } catch (error) {
    log(`⚠ ${photo.id}: ${error.message}`);
    return done ?? null;
  }
});

const photos = results.filter(Boolean);
const removed = previous.photos.filter((p) => !manifest.photos.some((m) => m.id === p.id));
if (removed.length) log(`Nicht mehr im Manifest (Dateien ggf. manuell löschen): ${removed.map((p) => p.id).join(', ')}`);

writeFileSync(outputPath, `${JSON.stringify({ baseUrl: target.baseUrl, photos }, null, 2)}\n`);
log(`${photos.length} Fotos in src/data/wallpapers.generated.json`);
if (photos.length < manifest.photos.length) process.exitCode = 1;

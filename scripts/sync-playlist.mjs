// Syncs Spotify playlist + YouTube matches to src/data/playlist.generated.json (flags: <url>, --soft, --refresh)
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { mapLimit } from './lib/http.mjs';
import { fetchSpotifyPlaylist, playlistIdFromUrl } from './lib/spotify.mjs';
import { findVideos } from './lib/youtube.mjs';

const root = new URL('..', import.meta.url);
const path = (p) => fileURLToPath(new URL(p, root));
const configPath = path('src/config/spotify.config.json');
const overridesPath = path('src/config/youtube.overrides.json');
const outputPath = path('src/data/playlist.generated.json');

const args = process.argv.slice(2);
const soft = args.includes('--soft');
const refresh = args.includes('--refresh');
const urlArg = args.find((a) => a.startsWith('http'));
const apiKey = process.env.YOUTUBE_API_KEY;

const log = (msg) => console.log(`[playlist:sync] ${msg}`);
function fail(message) {
  console[soft ? 'warn' : 'error'](`[playlist:sync] ${message}`);
  process.exit(soft ? 0 : 1);
}

const readJson = (file, fallback) => (existsSync(file) ? JSON.parse(readFileSync(file, 'utf8')) : fallback);

const config = readJson(configPath, {});
const id = playlistIdFromUrl(urlArg ?? config.playlistUrl);
if (!id) fail(`Keine gültige Playlist-URL: ${urlArg ?? config.playlistUrl}`);

// Store the canonical URL (without tracking params like ?si=…)
const canonicalUrl = `https://open.spotify.com/playlist/${id}`;
if (config.playlistUrl !== canonicalUrl) {
  config.playlistUrl = canonicalUrl;
  writeFileSync(configPath, `${JSON.stringify(config, null, 2)}\n`);
}

try {
  const playlist = await fetchSpotifyPlaylist(id);
  const overrides = readJson(overridesPath, {});
  const previous = readJson(outputPath, null);
  const previousIds = new Map((previous?.tracks ?? []).map((t) => [t.id, t.videoIds ?? []]));

  log(`„${playlist.name}“ – ${playlist.tracks.length} Songs, suche YouTube-Videos ${apiKey ? '(Data API)' : '(ohne API-Key)'} …`);

  await mapLimit(playlist.tracks, 3, async (track) => {
    const known = previousIds.get(track.id) ?? [];
    let info;
    // Stable matching: only re-search known songs with --refresh (search results fluctuate)
    if (known.length && !refresh) {
      track.videoIds = known;
      info = `${known[0]} (gespeichert)`;
    } else {
      let found = [];
      try {
        found = await findVideos(track, apiKey);
      } catch (error) {
        log(`⚠ Suche fehlgeschlagen für „${track.title}“: ${error.message}`);
      }
      track.videoIds = found.length ? found.map((v) => v.id) : known;
      const best = found[0];
      info = best ? `${best.id} · ${best.channel} · „${best.title}“` : known.length ? `${known[0]} (behalten)` : 'kein Treffer';
    }
    if (overrides[track.id]) {
      track.videoIds = [overrides[track.id], ...track.videoIds.filter((v) => v !== overrides[track.id])];
      info = `override ${overrides[track.id]}`;
    }
    log(`  ${track.artist.split(',')[0]} – ${track.title} → ${info}`);
  });

  const missing = playlist.tracks.filter((t) => t.videoIds.length === 0);
  if (missing.length) log(`⚠ ${missing.length} Song(s) ohne Video – bitte in youtube.overrides.json eintragen.`);

  writeFileSync(outputPath, `${JSON.stringify({ ...playlist, syncedAt: new Date().toISOString() }, null, 2)}\n`);
  log('→ src/data/playlist.generated.json');
} catch (error) {
  fail(error instanceof Error ? error.message : String(error));
}

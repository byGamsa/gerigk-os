import { fetchJson, fetchText, mapLimit } from './http.mjs';

export const playlistIdFromUrl = (url) => url?.match(/playlist[/:]([A-Za-z0-9]+)/)?.[1] ?? null;

async function trackCover(trackId) {
  try {
    const json = await fetchJson(`https://open.spotify.com/oembed?url=https://open.spotify.com/track/${trackId}`);
    return json.thumbnail_url ?? null;
  } catch {
    return null;
  }
}

// Reads a public playlist via the embed page (no login/API key needed)
export async function fetchSpotifyPlaylist(id) {
  const html = await fetchText(`https://open.spotify.com/embed/playlist/${id}`);
  const match = html.match(/<script id="__NEXT_DATA__" type="application\/json">([\s\S]*?)<\/script>/);
  if (!match) throw new Error('Playlist-Daten nicht gefunden (Seitenformat geändert?)');
  const entity = JSON.parse(match[1])?.props?.pageProps?.state?.data?.entity;
  if (!entity?.trackList) throw new Error('Playlist ist privat oder leer');

  const tracks = entity.trackList
    .filter((t) => t.entityType === 'track' && t.uri?.startsWith('spotify:track:'))
    .map((t) => ({
      uri: t.uri,
      id: t.uri.split(':').pop(),
      title: t.title,
      artist: t.subtitle,
      durationMs: t.duration,
      explicit: Boolean(t.isExplicit),
      cover: null,
      videoIds: [],
    }));

  const covers = await mapLimit(tracks, 8, (t) => trackCover(t.id));
  tracks.forEach((t, i) => (t.cover = covers[i]));

  return {
    id,
    uri: `spotify:playlist:${id}`,
    url: `https://open.spotify.com/playlist/${id}`,
    name: entity.name ?? entity.title,
    owner: entity.subtitle ?? '',
    cover: entity.coverArt?.sources?.[0]?.url ?? null,
    tracks,
  };
}

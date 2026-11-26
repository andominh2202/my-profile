const SPOTIFY_TYPES = ['playlist', 'album', 'track', 'artist', 'episode', 'show'] as const;

export type SpotifyType = (typeof SPOTIFY_TYPES)[number];

export interface SpotifyInfo {
  type: SpotifyType;
  id: string;
  embedUrl: string;
  directUrl: string;
  title: string;
}

const LABELS: Record<SpotifyType, string> = {
  playlist: 'Playlist Spotify',
  album: 'Album Spotify',
  track: 'Bài hát Spotify',
  artist: 'Nghệ sĩ Spotify',
  episode: 'Tập podcast Spotify',
  show: 'Podcast Spotify'
};

export function parseSpotifyUrl(input?: string, isDark = true): SpotifyInfo | null {
  const raw = (input ?? '').trim();
  if (!raw) return null;

  let type = '';
  let id = '';

  const uriMatch = raw.match(/^spotify:([a-z]+):([A-Za-z0-9]+)$/);
  if (uriMatch) {
    type = uriMatch[1];
    id = uriMatch[2];
  } else {
    let url: URL;
    try {
      url = new URL(raw);
    } catch {
      return null;
    }
    if (url.protocol !== 'https:' && url.protocol !== 'http:') return null;
    if (url.hostname !== 'open.spotify.com') return null;
    const parts = url.pathname.split('/').filter(Boolean);
    if (parts[0] && /^intl-[a-z-]+$/i.test(parts[0])) parts.shift();
    if (parts[0] === 'embed') parts.shift();
    type = parts[0] ?? '';
    id = parts[1] ?? '';
  }

  if (!(SPOTIFY_TYPES as readonly string[]).includes(type)) return null;
  if (!id || !/^[A-Za-z0-9]{10,40}$/.test(id)) return null;

  const validType = type as SpotifyType;
  const themeParam = isDark ? '&theme=0' : '';
  return {
    type: validType,
    id,
    embedUrl: `https://open.spotify.com/embed/${validType}/${id}?utm_source=generator${themeParam}`,
    directUrl: `https://open.spotify.com/${validType}/${id}`,
    title: LABELS[validType]
  };
}

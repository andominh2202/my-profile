import { useEffect, useRef, useState } from 'react';
import { Music } from 'lucide-react';
import type { ThemeMode } from '../../types/profile';
import { parseSpotifyUrl } from '../../utils/spotify';

interface MusicSectionProps {
  playlistUrl: string;
  theme: ThemeMode;
}

export function MusicSection({ playlistUrl, theme }: MusicSectionProps) {
  const info = parseSpotifyUrl(playlistUrl, theme === 'dark');
  const embedRef = useRef<HTMLDivElement | null>(null);
  const [shouldMount, setShouldMount] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!info) return;
    if (window.navigator && window.navigator.onLine === false) {
      setFailed(true);
      return;
    }

    const node = embedRef.current;
    if (!node || !('IntersectionObserver' in window)) {
      setShouldMount(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          io.disconnect();
          setShouldMount(true);
        }
      },
      { rootMargin: '300px 0px' }
    );
    io.observe(node);
    return () => io.disconnect();
  }, [info]);

  useEffect(() => {
    if (!shouldMount || loaded || failed) return;
    const timer = window.setTimeout(() => {
      setFailed(true);
    }, 7000);
    return () => window.clearTimeout(timer);
  }, [shouldMount, loaded, failed]);

  return (
    <section id="music" className="card card--music reveal" aria-labelledby="music-title">
      <header className="card__head">
        <span className="card__icon" aria-hidden="true">
          <Music size={18} />
        </span>
        <div className="card__titles">
          <span className="card__eyebrow">04 / SPOTIFY</span>
          <h2 id="music-title" className="card__title">Playlist nhạc</h2>
        </div>
        <div className="music-wave" aria-hidden="true">
          <span /><span /><span /><span />
        </div>
        {info && (
          <a
            id="music-link"
            className="card__action"
            href={info.directUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>Mở Spotify</span>
            <span aria-hidden="true">↗</span>
          </a>
        )}
      </header>

      <div id="music-embed" className="music__embed" ref={embedRef}>
        {!info ? (
          <div className="music-embed__fallback">
            <p>Chưa có liên kết Spotify hợp lệ trong cấu hình.</p>
          </div>
        ) : failed ? (
          <div className="music-embed__fallback">
            <p>Trình phát Spotify không khả dụng (ngoại tuyến hoặc bị trình duyệt chặn).</p>
            <a
              className="btn btn--secondary"
              href={info.directUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Mở trực tiếp trên Spotify ↗
            </a>
          </div>
        ) : (
          <>
            {!loaded && (
              <div className="music__placeholder">
                <span>Đang tải trình phát Spotify…</span>
                <a
                  className="card__action"
                  style={{ marginLeft: 0 }}
                  href={info.directUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Mở trực tiếp trên Spotify ↗
                </a>
              </div>
            )}
            {shouldMount && (
              <iframe
                title={info.title}
                src={info.embedUrl}
                width="100%"
                height="352"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                className={loaded ? 'is-loaded' : ''}
                onLoad={() => setLoaded(true)}
                onError={() => setFailed(true)}
              />
            )}
          </>
        )}
      </div>
    </section>
  );
}

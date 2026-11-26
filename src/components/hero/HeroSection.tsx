import { ArrowRight, Check, Copy, MapPin } from 'lucide-react';
import type { ProfileData, QualityLevel } from '../../types/profile';
import { safeUrl } from '../../utils/clipboard';
import { parseSpotifyUrl } from '../../utils/spotify';
import { SocialIcon } from '../social/SocialIcons';

interface HeroSectionProps {
  profile: ProfileData;
  hasGamerTags: boolean;
  copiedKey: string | null;
  quality: QualityLevel;
  onCopy: (key: string, value: string) => void;
  onNavigate: (id: string) => void;
}

export function HeroSection({
  profile,
  hasGamerTags,
  copiedKey,
  quality,
  onCopy,
  onNavigate
}: HeroSectionProps) {
  const discord = profile.socials.find((s) => s.id === 'discord' && !safeUrl(s.url) && s.handle);
  const firstTag = profile.gamerTags.find((t) => t.value.trim().length > 0);
  const primaryCopy = discord
    ? { key: 'hero-discord', label: `Copy Discord · ${discord.handle}`, value: discord.handle }
    : firstTag
      ? { key: 'hero-tag', label: `Copy ${firstTag.label} · ${firstTag.value}`, value: firstTag.value }
      : null;

  const spotifyInfo = parseSpotifyUrl(profile.spotify.playlistUrl);
  const words = profile.name.trim().split(/\s+/);

  const handleTilt = (ev: React.PointerEvent<HTMLDivElement>) => {
    if (quality === 'low') return;
    const el = ev.currentTarget;
    const r = el.getBoundingClientRect();
    const px = ((ev.clientX - r.left) / r.width) * 100;
    const py = ((ev.clientY - r.top) / r.height) * 100;
    el.style.setProperty('--px', `${px.toFixed(1)}%`);
    el.style.setProperty('--py', `${py.toFixed(1)}%`);
    const rx = (-((ev.clientY - r.top) / r.height - 0.5) * 4.5).toFixed(2);
    const ry = (((ev.clientX - r.left) / r.width - 0.5) * 5.5).toFixed(2);
    el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg)`;
  };

  const resetTilt = (ev: React.PointerEvent<HTMLDivElement>) => {
    ev.currentTarget.style.transform = '';
  };

  return (
    <section id="top" className="hero" aria-labelledby="hero-name" tabIndex={-1}>
      <div className="hero__grid">
        <div className="hero__content">
          <ul className="hero__meta" aria-label="Trạng thái và khu vực">
            <li className="chip chip--status">
              <span className="chip__dot" aria-hidden="true" />
              <span id="hero-status">{profile.status}</span>
            </li>
            <li className="chip chip--location">
              <MapPin size={14} className="chip__pin" aria-hidden="true" />
              <span id="hero-location">{profile.location}</span>
            </li>
          </ul>

          <p className="hero__eyebrow">
            <span>Xin chào, mình là</span>
            <span className="hero__handle-pill">@{profile.nickname}</span>
          </p>

          <h1 id="hero-name" className="hero__name">
            {words.map((word, idx) => (
              <span key={`${word}-${idx}`}>
                <span className="kinetic-word">{word}</span>
                {idx < words.length - 1 ? ' ' : ''}
              </span>
            ))}
          </h1>

          <p id="hero-tagline" className="hero__tagline">{profile.tagline}</p>

          <div className="hero__actions">
            <a
              className="btn btn--primary"
              href="#connect"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('connect');
              }}
            >
              <span>Kết nối &amp; Rủ chơi game</span>
              <ArrowRight size={17} aria-hidden="true" />
            </a>

            {primaryCopy && (
              <button
                id="hero-copy-discord"
                className={`btn btn--secondary${copiedKey === primaryCopy.key ? ' is-copied' : ''}`}
                type="button"
                onClick={() => onCopy(primaryCopy.key, primaryCopy.value)}
              >
                {copiedKey === primaryCopy.key ? <Check size={17} aria-hidden="true" /> : <Copy size={17} aria-hidden="true" />}
                <span className="btn__copy-label">
                  {copiedKey === primaryCopy.key ? 'Đã copy ✓' : primaryCopy.label}
                </span>
              </button>
            )}
          </div>

          <div className="hero__quick">
            <span className="hero__quick-label">Kênh nhanh</span>
            <div className="hero__socials" aria-label="Liên kết mạng xã hội nhanh">
              {profile.socials.map((s) => {
                const url = safeUrl(s.url);
                if (url) {
                  return (
                    <a
                      key={s.id}
                      className="hero__social-btn"
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${s.label}: ${s.handle} (mở tab mới)`}
                      title={`${s.label} (${s.handle})`}
                    >
                      <SocialIcon platform={s.id} />
                    </a>
                  );
                }
                return (
                  <button
                    key={s.id}
                    type="button"
                    className={`hero__social-btn${copiedKey === `quick-${s.id}` ? ' is-copied' : ''}`}
                    onClick={() => onCopy(`quick-${s.id}`, s.handle)}
                    aria-label={`Copy ${s.label}: ${s.handle}`}
                    title={`Copy ${s.label}: ${s.handle}`}
                  >
                    <SocialIcon platform={s.id} />
                  </button>
                );
              })}

              {spotifyInfo && (
                <a
                  className="hero__social-btn"
                  href={spotifyInfo.directUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Mở playlist Spotify (mở tab mới)"
                  title="Playlist Spotify"
                >
                  <SocialIcon platform="spotify" />
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="hero__visual">
          <div className="hero__card" onPointerMove={handleTilt} onPointerLeave={resetTilt}>
            <div className="hero__cover">
              <img id="hero-cover" src={profile.cover} alt="" width={1600} height={680} />
              <span className="hero__cover-shade" aria-hidden="true" />
            </div>

            <div className="hero__identity">
              <div className="hero__avatar-wrap">
                <img
                  id="hero-avatar"
                  className="hero__avatar"
                  src={profile.avatar}
                  alt={`Ảnh đại diện của ${profile.name}`}
                  width={160}
                  height={160}
                />
              </div>

              <div className="hero__pass">
                <div className="hero__pass-meta">
                  <span className="hero__pass-label">HỒ SƠ CÁ NHÂN</span>
                  <span className="hero__pass-handle">@{profile.nickname}</span>
                </div>
                <a
                  className="hero__pass-link"
                  href={hasGamerTags ? '#gamertags' : '#socials'}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate(hasGamerTags ? 'gamertags' : 'socials');
                  }}
                >
                  <span>{hasGamerTags ? 'ID Ingame' : 'Mạng xã hội'}</span>
                  <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

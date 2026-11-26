import { Share2 } from 'lucide-react';
import type { SocialItem } from '../../types/profile';
import { safeUrl } from '../../utils/clipboard';
import { SocialIcon } from './SocialIcons';

interface SocialsSectionProps {
  socials: SocialItem[];
  copiedKey: string | null;
  onCopy: (key: string, value: string) => void;
}

export function SocialsSection({ socials, copiedKey, onCopy }: SocialsSectionProps) {
  if (!socials.length) return null;

  return (
    <section id="socials" className="card card--socials reveal" aria-labelledby="socials-title">
      <header className="card__head">
        <span className="card__icon" aria-hidden="true">
          <Share2 size={18} />
        </span>
        <div className="card__titles">
          <span className="card__eyebrow">03 / LIÊN KẾT</span>
          <h2 id="socials-title" className="card__title">Mạng xã hội</h2>
        </div>
      </header>
      <div className="socials-list">
        {socials.map((s) => {
          const url = safeUrl(s.url);
          if (url) {
            return (
              <a
                key={s.id}
                className={`social-card social-card--${s.id}`}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${s.label}: ${s.handle} (mở tab mới)`}
              >
                <span className="social-card__icon" aria-hidden="true">
                  <SocialIcon platform={s.id} />
                </span>
                <span className="social-card__text">
                  <span className="social-card__label">{s.label}</span>
                  <span className="social-card__handle">{s.handle}</span>
                </span>
                <span className="social-card__trail" aria-hidden="true">Mở ↗</span>
              </a>
            );
          }
          const key = `social-${s.id}`;
          const isCopied = copiedKey === key;
          return (
            <button
              key={s.id}
              type="button"
              className={`social-card social-card--${s.id}${isCopied ? ' is-copied' : ''}`}
              onClick={() => onCopy(key, s.handle)}
              aria-label={`Copy ${s.label}: ${s.handle}`}
            >
              <span className="social-card__icon" aria-hidden="true">
                <SocialIcon platform={s.id} />
              </span>
              <span className="social-card__text">
                <span className="social-card__label">{s.label}</span>
                <span className="social-card__handle">{s.handle}</span>
              </span>
              <span className="social-card__trail" aria-hidden="true">
                {isCopied ? 'Đã copy ✓' : 'Sao chép'}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}

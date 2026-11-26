import type { ProfileData, QualityLevel } from '../../types/profile';
import { safeUrl } from '../../utils/clipboard';

interface ConnectSectionProps {
  profile: ProfileData;
  copiedKey: string | null;
  quality: QualityLevel;
  onCopy: (key: string, value: string) => void;
}

export function ConnectSection({ profile, copiedKey, quality, onCopy }: ConnectSectionProps) {
  const validTags = profile.gamerTags.filter((t) => t.value.trim().length > 0);
  const hasRiotId = validTags.some((t) => t.platform.toLowerCase() === 'riot');

  const copyableSocials = profile.socials.filter((s) => !safeUrl(s.url) && s.handle.trim().length > 0);
  const linkedSocials = profile.socials
    .filter((s) => safeUrl(s.url).length > 0)
    .sort((a, b) => {
      const order: Record<string, number> = { facebook: 1, github: 2, instagram: 3, tiktok: 4 };
      return (order[a.id] ?? 9) - (order[b.id] ?? 9);
    })
    .slice(0, 2);

  const onSheen = (ev: React.PointerEvent<HTMLElement>) => {
    if (quality === 'low') return;
    const el = ev.currentTarget;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--px', `${(((ev.clientX - r.left) / r.width) * 100).toFixed(1)}%`);
    el.style.setProperty('--py', `${(((ev.clientY - r.top) / r.height) * 100).toFixed(1)}%`);
  };

  return (
    <section
      id="connect"
      className="card card--connect reveal"
      aria-labelledby="connect-title"
      onPointerMove={onSheen}
    >
      <div className="connect__grid">
        <div className="connect__copy">
          <div className="chip chip--status">
            <span className="chip__dot" aria-hidden="true" />
            <span id="connect-status">{profile.status}</span>
          </div>
          <h2 id="connect-title" className="connect__title">Cùng leo rank hoặc trò chuyện nhé?</h2>
          <p id="connect-desc" className="connect__desc">
            {hasRiotId
              ? 'Cứ thoải mái nhắn mình qua Discord, Facebook hoặc kết bạn trực tiếp bằng Riot ID để lập team buổi tối. Mọi thông tin kết nối đều sẵn sàng bên cạnh.'
              : 'Cứ thoải mái nhắn mình qua Discord hoặc Facebook để trò chuyện hay rủ chơi game cùng nhé. Mọi thông tin kết nối đều sẵn sàng bên cạnh.'}
          </p>
        </div>

        <div className="connect__actions" aria-label="Hành động kết nối nhanh">
          {copyableSocials.map((s) => {
            const key = `connect-${s.id}`;
            const isCopied = copiedKey === key;
            return (
              <button
                key={key}
                type="button"
                className={`connect-btn${isCopied ? ' is-copied' : ''}`}
                onClick={() => onCopy(key, s.handle)}
                aria-label={`Copy ${s.label}: ${s.handle}`}
              >
                <span className="connect-btn__top">
                  <span>{s.label}</span>
                  <span>{isCopied ? 'Đã copy ✓' : 'Sao chép'}</span>
                </span>
                <span className="connect-btn__value">{s.handle}</span>
              </button>
            );
          })}

          {validTags[0] && (
            <button
              type="button"
              className={`connect-btn${copiedKey === 'connect-tag-0' ? ' is-copied' : ''}`}
              onClick={() => onCopy('connect-tag-0', validTags[0].value)}
              aria-label={`Copy ${validTags[0].label}: ${validTags[0].value}`}
            >
              <span className="connect-btn__top">
                <span>{validTags[0].label}</span>
                <span>{copiedKey === 'connect-tag-0' ? 'Đã copy ✓' : 'Sao chép'}</span>
              </span>
              <span className="connect-btn__value">{validTags[0].value}</span>
            </button>
          )}

          {linkedSocials.map((s) => (
            <a
              key={s.id}
              className="connect-btn"
              href={safeUrl(s.url)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Mở ${s.label}: ${s.handle} (mở tab mới)`}
            >
              <span className="connect-btn__top">
                <span>{s.label}</span>
                <span>Mở ↗</span>
              </span>
              <span className="connect-btn__value">{s.handle}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

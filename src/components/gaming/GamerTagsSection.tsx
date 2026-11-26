import { Gamepad2, Pickaxe, Swords } from 'lucide-react';
import type { GamerTagItem } from '../../types/profile';

interface GamerTagsSectionProps {
  tags: GamerTagItem[];
  copiedKey: string | null;
  onCopy: (key: string, value: string) => void;
}

export function GamerTagsSection({ tags, copiedKey, onCopy }: GamerTagsSectionProps) {
  if (!tags.length) return null;

  return (
    <section id="gamertags" className="card card--gamertags reveal" aria-labelledby="gamertags-title">
      <header className="card__head">
        <span className="card__icon" aria-hidden="true">
          <Gamepad2 size={18} />
        </span>
        <div className="card__titles">
          <span className="card__eyebrow">02 / INGAME ID</span>
          <h2 id="gamertags-title" className="card__title">Tên ingame</h2>
        </div>
      </header>
      <p className="card__sub">Bấm vào thẻ bất kỳ để sao chép nhanh tên nhân vật và kết bạn trong game.</p>
      <div className="gamertags-list">
        {tags.map((tag) => {
          const key = `tag-${tag.platform}-${tag.value}`;
          const isCopied = copiedKey === key;
          const Icon = tag.platform === 'riot' ? Swords : tag.platform === 'minecraft' ? Pickaxe : Gamepad2;
          return (
            <button
              key={key}
              type="button"
              className={`tag-card tag-card--${tag.platform}${isCopied ? ' is-copied' : ''}`}
              onClick={() => onCopy(key, tag.value)}
              aria-label={`Copy ${tag.label}: ${tag.value}`}
            >
              <span className="tag-card__icon" aria-hidden="true">
                <Icon size={20} />
              </span>
              <span className="tag-card__label">{tag.label}</span>
              <span className="tag-card__value">{tag.value}</span>
              <span className="tag-card__hint" aria-hidden="true">
                {isCopied ? 'Đã copy ✓' : 'Bấm để copy'}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}

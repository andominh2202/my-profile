import { useMemo, useState } from 'react';
import { Star } from 'lucide-react';
import type { GameItem, QualityLevel } from '../../types/profile';

interface GamesSectionProps {
  games: GameItem[];
  quality: QualityLevel;
}

function GameCard({ game, index, quality }: { game: GameItem; index: number; quality: QualityLevel }) {
  const [imgFailed, setImgFailed] = useState(false);

  const onTilt = (ev: React.PointerEvent<HTMLElement>) => {
    if (quality === 'low') return;
    const el = ev.currentTarget;
    const r = el.getBoundingClientRect();
    const rx = (-((ev.clientY - r.top) / r.height - 0.5) * 4.5).toFixed(2);
    const ry = (((ev.clientX - r.left) / r.width - 0.5) * 5.5).toFixed(2);
    el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translate3d(0,-3px,0)`;
  };

  const resetTilt = (ev: React.PointerEvent<HTMLElement>) => {
    ev.currentTarget.style.transform = '';
  };

  return (
    <article
      className={`game-card${index === 0 ? ' game-card--featured' : ''}`}
      onPointerMove={onTilt}
      onPointerLeave={resetTilt}
    >
      <div className="game-card__cover">
        {index === 0 && <span className="game-card__badge">Tựa game chính</span>}
        {game.image && !imgFailed ? (
          <img src={game.image} alt={game.title} loading="lazy" onError={() => setImgFailed(true)} />
        ) : (
          <span className="game-card__monogram" aria-hidden="true">
            {game.title.trim().charAt(0).toUpperCase() || '?'}
          </span>
        )}
      </div>
      <div className="game-card__body">
        {game.genre && <span className="game-card__genre">{game.genre}</span>}
        <h3 className="game-card__title">{game.title}</h3>
        {game.note && <p className="game-card__note">{game.note}</p>}
      </div>
    </article>
  );
}

export function GamesSection({ games, quality }: GamesSectionProps) {
  const [activeGenre, setActiveGenre] = useState('Tất cả');

  const genres = useMemo(() => {
    const set = new Set<string>();
    games.forEach((g) => {
      if (g.genre.trim()) set.add(g.genre.trim());
    });
    return ['Tất cả', ...Array.from(set)];
  }, [games]);

  const filtered = useMemo(() => {
    if (activeGenre === 'Tất cả') return games;
    return games.filter((g) => g.genre.trim() === activeGenre);
  }, [games, activeGenre]);

  if (!games.length) return null;

  return (
    <section id="games" className="card card--games reveal" aria-labelledby="games-title">
      <header className="card__head">
        <span className="card__icon" aria-hidden="true">
          <Star size={18} />
        </span>
        <div className="card__titles">
          <span className="card__eyebrow">05 / ROTATION</span>
          <h2 id="games-title" className="card__title">Game yêu thích</h2>
        </div>
      </header>

      <div className="filter-bar" role="tablist" aria-label="Lọc theo thể loại game">
        {genres.map((genre) => (
          <button
            key={genre}
            type="button"
            role="tab"
            aria-selected={activeGenre === genre}
            className={`filter-pill${activeGenre === genre ? ' is-active' : ''}`}
            onClick={() => setActiveGenre(genre)}
          >
            {genre}
          </button>
        ))}
      </div>

      <div className="games-list">
        {filtered.map((game, idx) => (
          <GameCard key={game.title} game={game} index={idx} quality={quality} />
        ))}
      </div>
    </section>
  );
}

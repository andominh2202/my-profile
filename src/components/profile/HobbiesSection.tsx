import { Sparkles } from 'lucide-react';
import type { HobbyItem } from '../../types/profile';

export function HobbiesSection({ hobbies }: { hobbies: HobbyItem[] }) {
  if (!hobbies.length) return null;

  return (
    <section id="hobbies" className="card card--hobbies reveal" aria-labelledby="hobbies-title">
      <header className="card__head">
        <span className="card__icon" aria-hidden="true">
          <Sparkles size={18} />
        </span>
        <div className="card__titles">
          <span className="card__eyebrow">07 / ĐỜI THƯỜNG</span>
          <h2 id="hobbies-title" className="card__title">Sở thích</h2>
        </div>
      </header>
      <div className="hobbies-list">
        {hobbies.map((h) => (
          <div key={h.title} className="hobby-card">
            <span className="hobby-card__icon" aria-hidden="true">{h.icon || '✦'}</span>
            <div className="hobby-card__body">
              <h3 className="hobby-card__title">{h.title}</h3>
              <p className="hobby-card__desc">{h.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

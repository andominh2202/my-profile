import { User } from 'lucide-react';
import type { ProfileData } from '../../types/profile';

export function AboutSection({ profile }: { profile: ProfileData }) {
  const gameCount = profile.games.filter((g) => g.title.trim().length > 0).length;

  return (
    <section id="about" className="card card--about reveal" aria-labelledby="about-title">
      <header className="card__head">
        <span className="card__icon" aria-hidden="true">
          <User size={18} />
        </span>
        <div className="card__titles">
          <span className="card__eyebrow">01 / HỒ SƠ</span>
          <h2 id="about-title" className="card__title">Giới thiệu</h2>
        </div>
      </header>

      <div id="about-bio" className="about__bio">
        <p>{profile.bio}</p>
      </div>

      <div className="about__highlights" aria-label="Điểm nhấn cá nhân">
        <div className="highlight-tile">
          <span className="highlight-tile__label">Khu vực</span>
          <strong className="highlight-tile__value">{profile.location}</strong>
        </div>
        <div className="highlight-tile">
          <span className="highlight-tile__label">Góc game</span>
          <strong className="highlight-tile__value">{gameCount} tựa game yêu thích</strong>
        </div>
        <div className="highlight-tile">
          <span className="highlight-tile__label">Nhịp sống</span>
          <strong className="highlight-tile__value">Game · Nhạc · Code</strong>
        </div>
      </div>
    </section>
  );
}

import { Code2 } from 'lucide-react';
import type { ProjectItem } from '../../types/profile';
import { safeUrl } from '../../utils/clipboard';

export function ProjectsSection({ projects }: { projects: ProjectItem[] }) {
  if (!projects.length) return null;

  return (
    <section id="projects" className="card card--projects reveal" aria-labelledby="projects-title">
      <header className="card__head">
        <span className="card__icon" aria-hidden="true">
          <Code2 size={18} />
        </span>
        <div className="card__titles">
          <span className="card__eyebrow">06 / DỰ ÁN</span>
          <h2 id="projects-title" className="card__title">Dự án</h2>
        </div>
      </header>
      <div className="projects-list">
        {projects.map((item) => {
          const repo = safeUrl(item.repoUrl);
          const demo = safeUrl(item.demoUrl);
          return (
            <article key={item.title} className="project-card">
              {item.image && (
                <div className="project-card__cover">
                  <img src={item.image} alt={item.title} loading="lazy" />
                </div>
              )}
              <div className="project-card__body">
                <h3 className="project-card__title">{item.title}</h3>
                {item.description && <p className="project-card__desc">{item.description}</p>}
                {item.tech.length > 0 && (
                  <div className="project-card__tech">
                    {item.tech.map((t) => (
                      <span key={t} className="project-card__tag">{t}</span>
                    ))}
                  </div>
                )}
                {(repo || demo) && (
                  <div className="project-card__links">
                    {repo && (
                      <a
                        className="project-card__link"
                        href={repo}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Xem mã nguồn dự án ${item.title} (mở tab mới)`}
                      >
                        Code ↗
                      </a>
                    )}
                    {demo && (
                      <a
                        className="project-card__link project-card__link--demo"
                        href={demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Xem bản chạy thử dự án ${item.title} (mở tab mới)`}
                      >
                        Demo ↗
                      </a>
                    )}
                  </div>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

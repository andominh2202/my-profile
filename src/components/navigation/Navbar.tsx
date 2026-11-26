import { useEffect, useRef, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import type { ThemeMode } from '../../types/profile';

export interface NavItem {
  id: string;
  label: string;
  drawerLabel?: string;
}

interface NavbarProps {
  nickname: string;
  initials: string;
  items: NavItem[];
  activeId: string;
  theme: ThemeMode;
  onToggleTheme: () => void;
  onNavigate: (id: string) => void;
}

export function Navbar({
  nickname,
  initials,
  items,
  activeId,
  theme,
  onToggleTheme,
  onNavigate
}: NavbarProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement | null>(null);
  const drawerRef = useRef<HTMLDivElement | null>(null);
  const shellRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024 && drawerOpen) setDrawerOpen(false);
    };
    const onClickOutside = (ev: MouseEvent) => {
      if (drawerOpen && shellRef.current && !shellRef.current.contains(ev.target as Node)) {
        setDrawerOpen(false);
      }
    };
    const onKeyDown = (ev: KeyboardEvent) => {
      if (!drawerOpen) return;
      if (ev.key === 'Escape') {
        ev.preventDefault();
        setDrawerOpen(false);
        toggleRef.current?.focus();
      }
    };

    window.addEventListener('resize', onResize, { passive: true });
    document.addEventListener('click', onClickOutside);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('resize', onResize);
      document.removeEventListener('click', onClickOutside);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [drawerOpen]);

  const handleLinkClick = (ev: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    ev.preventDefault();
    setDrawerOpen(false);
    onNavigate(id);
  };

  return (
    <header className="site-header">
      <div className="nav-shell" ref={shellRef}>
        <nav className="nav" aria-label="Điều hướng chính">
          <a
            className="nav__brand"
            href="#top"
            aria-label={`${nickname} — Về đầu trang`}
            onClick={(e) => handleLinkClick(e, 'top')}
          >
            <span className="nav__logo" aria-hidden="true">{initials}</span>
            <span className="nav__brand-text">{nickname}</span>
          </a>

          <ul className="nav__list">
            {items.map((item) => {
              const isActive = activeId === item.id;
              return (
                <li key={item.id}>
                  <a
                    className={`nav__link${isActive ? ' is-active' : ''}`}
                    href={`#${item.id}`}
                    aria-current={isActive ? 'true' : undefined}
                    onClick={(e) => handleLinkClick(e, item.id)}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="nav__actions">
            <button
              id="theme-toggle"
              className="icon-btn theme-toggle"
              type="button"
              onClick={onToggleTheme}
              aria-pressed={theme === 'light'}
              aria-label={theme === 'light' ? 'Chuyển sang giao diện tối' : 'Chuyển sang giao diện sáng'}
              title="Đổi giao diện Sáng / Tối"
            >
              {theme === 'light' ? <Sun size={19} aria-hidden="true" /> : <Moon size={19} aria-hidden="true" />}
            </button>

            <a
              className="btn btn--primary btn--nav"
              href="#connect"
              onClick={(e) => handleLinkClick(e, 'connect')}
            >
              Kết nối
            </a>

            <button
              ref={toggleRef}
              id="nav-toggle"
              className="icon-btn nav__toggle"
              type="button"
              aria-label={drawerOpen ? 'Đóng menu điều hướng' : 'Mở menu điều hướng'}
              aria-expanded={drawerOpen}
              aria-controls="nav-drawer"
              onClick={() => setDrawerOpen((v) => !v)}
            >
              <span className="nav__bars" aria-hidden="true">
                <span />
                <span />
                <span />
              </span>
            </button>
          </div>
        </nav>

        <div
          ref={drawerRef}
          id="nav-drawer"
          className="nav__drawer"
          aria-label="Menu điều hướng di động"
          hidden={!drawerOpen}
        >
          <ul className="nav__drawer-list">
            {items
              .filter((i) => i.id !== 'connect')
              .map((item) => (
                <li key={item.id}>
                  <a
                    className={`nav__drawer-link${activeId === item.id ? ' is-active' : ''}`}
                    href={`#${item.id}`}
                    onClick={(e) => handleLinkClick(e, item.id)}
                  >
                    {item.drawerLabel ?? item.label}
                  </a>
                </li>
              ))}
          </ul>
          <a
            className="btn btn--primary nav__drawer-cta"
            href="#connect"
            onClick={(e) => handleLinkClick(e, 'connect')}
          >
            Kết nối &amp; Rủ chơi game
          </a>
        </div>
      </div>
    </header>
  );
}

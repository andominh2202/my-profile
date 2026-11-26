interface FooterProps {
  name: string;
  nickname: string;
  tagline: string;
  onBackToTop: () => void;
}

export function Footer({ name, nickname, tagline, onBackToTop }: FooterProps) {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__brand">
          <p className="site-footer__copy">
            © <span>{new Date().getFullYear()}</span> <strong>{name}</strong>{' '}
            <span className="site-footer__sep" aria-hidden="true">·</span>{' '}
            <span className="site-footer__nick">@{nickname}</span>
          </p>
          <p className="site-footer__tagline">{tagline}</p>
        </div>

        <div className="site-footer__links">
          <a
            id="back-to-top"
            className="site-footer__top"
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              onBackToTop();
            }}
          >
            <span>Lên đầu trang</span>
            <span className="site-footer__arrow" aria-hidden="true">↑</span>
          </a>
        </div>
      </div>
    </footer>
  );
}

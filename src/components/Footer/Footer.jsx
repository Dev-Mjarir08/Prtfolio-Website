import { profile } from '../../data/portfolio.js';

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-roots" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
      </div>
      <div>
        <strong>{profile.name}</strong>
        <p>{profile.role}</p>
      </div>
      <nav aria-label="Social links">
        {profile.socials.map((item) => {
          const Icon = item.icon;
          return (
            <a key={item.label} href={item.href} aria-label={item.label} data-cursor="magnetic">
              <Icon />
            </a>
          );
        })}
      </nav>
    </footer>
  );
}

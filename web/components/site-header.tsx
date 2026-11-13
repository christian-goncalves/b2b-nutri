import Link from "next/link";

const links = [
  { href: "/", label: "INÍCIO" },
  { href: "/ebooks", label: "E-BOOKS" },
  { href: "/#sobre", label: "SOBRE A AUTORA" },
  { href: "/#contato", label: "CONTATO" },
];

export function SiteHeader() {
  return (
    <header className="site-header foundation-header">
      <div className="site-container foundation-header__inner">
        <Link className="foundation-brand" href="/" aria-label="B2B Nutris — início">
          <span>B2B NUTRIS</span>
        </Link>

        <nav className="foundation-nav" aria-label="Navegação principal">
          {links.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>

        <details className="foundation-mobile-menu">
          <summary aria-label="Abrir menu">
            <span className="foundation-menu-icon" aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
          </summary>
          <nav className="foundation-mobile-nav" aria-label="Navegação principal">
            {links.map((link) => (
              <Link key={link.href} href={link.href}>
                {link.label}
              </Link>
            ))}
          </nav>
        </details>
      </div>
    </header>
  );
}

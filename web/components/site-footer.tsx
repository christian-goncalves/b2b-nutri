import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="foundation-footer">
      <div className="site-container">
        <div className="foundation-footer__inner">
          <div>
            <p className="foundation-footer__brand">B2B NUTRIS</p>
            <p className="site-footer__muted">Materiais digitais para a prática nutricional.</p>
          </div>
          <nav className="foundation-footer__links" aria-label="Navegação do rodapé">
            <strong>Navegação</strong>
            <Link href="/">Início</Link>
            <Link href="/ebooks">E-books</Link>
            <Link href="/#sobre">Sobre a autora</Link>
            <Link href="/#contato">Contato</Link>
          </nav>
          <nav className="foundation-footer__links" aria-label="Informações institucionais">
            <strong>Informações</strong>
            <Link href="/privacidade">Privacidade</Link>
            <Link href="/termos">Termos de uso</Link>
          </nav>
        </div>
        <div className="foundation-footer__bottom">
          <span>© {new Date().getFullYear()} B2B Nutris</span>
          <span>Compras realizadas exclusivamente na Hotmart.</span>
        </div>
      </div>
    </footer>
  );
}

import Link from "next/link";
import { BookCard } from "@/components/book-card";
import { HomeHeroSlider } from "@/components/home-hero-slider";
import { SectionHeading } from "@/components/section-heading";
import { featuredHomeBooks, homeBooks, sliderBooks } from "@/data/home-books";

export default function HomePage() {
  return (
    <main>
      <HomeHeroSlider books={sliderBooks} />

      <section className="home-section section--featured home-library-selection" aria-labelledby="featured-title">
        <div className="site-container">
          <SectionHeading
            id="featured-title"
            eyebrow="Seleção da biblioteca"
            title="E-books em destaque"
            description="Materiais disponíveis para conhecer a coleção B2B Nutris."
            centered
          />
          {featuredHomeBooks.length > 0 ? (
            <div className="book-grid">
              {featuredHomeBooks.map((book) => <BookCard key={book.id} book={book} />)}
            </div>
          ) : (
            <p className="empty-state">Os destaques serão publicados quando houver materiais selecionados.</p>
          )}
        </div>
      </section>

      <section className="home-section section--about" id="sobre" aria-labelledby="about-title">
        <div className="site-container">
          <div className="about-layout">
            <div className="about-photo" role="img" aria-label="Fotografia da autora ainda não fornecida">
              <span>Fotografia da autora<br />em breve</span>
            </div>
            <div className="about-copy">
              <span className="section-heading__eyebrow">Conheça a autora</span>
              <h2 id="about-title">Sobre a autora</h2>
              <p>A apresentação profissional será incluída quando a biografia oficial estiver disponível.</p>
              <Link href="/ebooks" className="btn btn--primary">VER TODOS OS E-BOOKS</Link>
            </div>
          </div>

          <div className="newsletter-panel" id="newsletter" aria-labelledby="newsletter-title">
            <div className="newsletter-panel__inner">
              <div>
                <h3 id="newsletter-title">Assine nossa newsletter</h3>
                <p className="newsletter-intro">Novidades e lançamentos da B2B Nutris.</p>
              </div>
              <div>
                <div className="newsletter-form">
                  <label className="field">
                    <span className="field__label">E-mail</span>
                    <input className="control" type="email" disabled placeholder="Inscrições em breve" />
                  </label>
                  <button className="btn btn--primary" type="button" disabled>EM BREVE</button>
                </div>
                <p className="form-status" role="status">As inscrições serão abertas após a integração do cadastro.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="home-section section--upcoming" aria-labelledby="upcoming-title">
        <div className="site-container">
          <SectionHeading id="upcoming-title" eyebrow="Próximo lançamento" title="Novidades" centered />
          <div className="upcoming-empty">
            <p>Nenhum lançamento foi anunciado até o momento.</p>
          </div>
        </div>
      </section>

      <section className="home-section section--catalog" id="catalogo" aria-labelledby="catalog-title">
        <div className="site-container">
          <SectionHeading
            id="catalog-title"
            eyebrow="Biblioteca B2B Nutris"
            title="Todos os livros"
            description="Conheça os materiais disponíveis da coleção."
            centered
          />
          {homeBooks.length > 0 ? (
            <div className="book-grid">
              {homeBooks.map((book) => <BookCard key={book.id} book={book} />)}
            </div>
          ) : (
            <p className="empty-state">Novos materiais serão apresentados aqui.</p>
          )}
        </div>
      </section>

      <section className="home-section section--testimonials" aria-labelledby="testimonials-title">
        <div className="site-container">
          <SectionHeading id="testimonials-title" eyebrow="Depoimentos" title="O que dizem nossos leitores?" centered />
          <p className="empty-state testimonial-empty">
            Depoimentos serão publicados quando houver relatos reais autorizados.
          </p>
        </div>
      </section>

      <section className="home-section section--contact" id="contato" aria-labelledby="contact-title">
        <div className="site-container contact-layout">
          <SectionHeading
            id="contact-title"
            eyebrow="Entre em contato"
            title="Vamos conversar?"
            description="O canal de contato será habilitado assim que a integração estiver pronta."
          />
          <div className="contact-card">
            <div className="contact-form" aria-label="Formulário de contato em preparação">
              <label className="field">
                <span className="field__label">Nome</span>
                <input className="control" autoComplete="name" disabled />
              </label>
              <label className="field">
                <span className="field__label">E-mail</span>
                <input className="control" type="email" autoComplete="email" disabled />
              </label>
              <label className="field">
                <span className="field__label">Assunto</span>
                <input className="control" disabled />
              </label>
              <label className="field">
                <span className="field__label">Mensagem</span>
                <textarea className="control" disabled />
              </label>
              <button className="btn btn--primary" type="button" disabled>FORMULÁRIO EM PREPARAÇÃO</button>
              <p className="form-status" role="status">Nenhuma mensagem é enviada nesta etapa.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

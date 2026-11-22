import Image from "next/image";
import Link from "next/link";
import { BookCard } from "@/components/book-card";
import { GuideCaptureForm } from "@/components/guide-capture-form";
import { SectionHeading } from "@/components/section-heading";
import { homeShowcaseBooks } from "@/data/home-books";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Materiais de nutrição para prática clínica",
  description: "E-books e conteúdos de nutrição organizados por tema para apoiar a prática clínica.",
  path: "/",
});

export default function HomePage() {
  return (
    <main>
      <section className="section--hero home-section" aria-labelledby="hero-title">
        <div className="site-container hero-layout">
          <div className="hero-copy">
            <span className="hero-eyebrow">B2B Nutris · conhecimento organizado</span>
            <h1 id="hero-title">Sua prática nutricional merece conhecimento organizado e ferramentas à mão.</h1>
            <p>
              Guias, materiais de referência e recursos práticos para facilitar o estudo, a consulta e a organização dos atendimentos. Um acervo desenvolvido pela B2B Nutris com a experiência profissional da nutricionista Bianca.
            </p>
            <div className="hero-actions">
              <Link href="#guia-gratuito" className="btn btn--primary btn--lg">
                Receba gratuitamente o guia Antes da Consulta
              </Link>
              <Link href="/ebooks" className="btn btn--secondary">
                Explorar e-books
              </Link>
            </div>
          </div>
          <aside className="contact-card" aria-label="Oferta do guia gratuito Antes da Consulta">
            <span className="section-heading__eyebrow">Guia gratuito</span>
            <h2>Antes da Consulta</h2>
            <p>Um material para apoiar a organização do pré-atendimento nutricional.</p>
            <Link href="#guia-gratuito" className="btn btn--primary">Conhecer o fluxo do guia</Link>
          </aside>
        </div>
      </section>

      <section className="home-section section--featured" aria-labelledby="credibility-title">
        <div className="site-container">
          <SectionHeading
            id="credibility-title"
            eyebrow="B2B Nutris"
            title="Conhecimento organizado para a prática nutricional"
            description="Materiais digitais desenvolvidos pela B2B Nutris com a experiência profissional da nutricionista Bianca Gonçalves."
            centered
          />
        </div>
      </section>

      <section className="home-section section--contact" aria-labelledby="problem-title">
        <div className="site-container">
          <SectionHeading
            id="problem-title"
            eyebrow="Mais tempo para cuidar"
            title="Você estudou para cuidar de pessoas, não para perder tempo procurando informações."
            centered
          />
        </div>
      </section>

      <section className="home-section section--featured" aria-labelledby="benefits-title">
        <div className="site-container">
          <SectionHeading
            id="benefits-title"
            eyebrow="Uma biblioteca para sua rotina"
            title="Encontre apoio para estudar, consultar e organizar"
            centered
          />
          <div className="book-grid" aria-label="Benefícios dos materiais B2B Nutris">
            <article className="card"><div className="card__body"><h3 className="card__title">Encontre o que precisa, com mais facilidade</h3></div></article>
            <article className="card"><div className="card__body"><h3 className="card__title">Leve o conhecimento para a prática</h3></div></article>
            <article className="card"><div className="card__body"><h3 className="card__title">Construa sua própria biblioteca de referência</h3></div></article>
          </div>
        </div>
      </section>

      <section className="home-section section--featured home-library-selection" aria-labelledby="featured-title">
        <div className="site-container">
          <SectionHeading
            id="featured-title"
            eyebrow="Seleção da biblioteca"
            title="E-books em destaque"
            description="Materiais de referência para apoiar diferentes momentos da prática nutricional."
            centered
          />
          <div className="book-grid">
            {homeShowcaseBooks.map((book) => <BookCard key={book.id} book={book} />)}
          </div>
          <div className="home-section__action">
            <Link href="/ebooks" className="btn btn--primary">Explorar todos os e-books</Link>
          </div>
        </div>
      </section>

      <section className="home-section section--catalog" aria-labelledby="library-title">
        <div className="site-container">
          <SectionHeading
            id="library-title"
            eyebrow="Biblioteca B2B Nutris"
            title="Conteúdos para continuar aprendendo"
            description="Explore os artigos científicos aprovados e os temas disponíveis na biblioteca."
            centered
          />
          <div className="home-section__action">
            <Link href="/biblioteca" className="btn btn--primary">EXPLORAR A BIBLIOTECA</Link>
          </div>
        </div>
      </section>

      <section className="home-section section--about" id="sobre" aria-labelledby="about-title">
        <div className="site-container">
          <div className="about-layout">
            <div className="about-photo">
              <Image
                src="/images/bianca-home.png"
                alt="Bianca Gonçalves"
                width={1122}
                height={1402}
                sizes="(max-width: 720px) 80vw, 320px"
                style={{ width: "100%", height: "auto", objectFit: "contain" }}
              />
            </div>
            <div className="about-copy">
              <span className="section-heading__eyebrow">Conheça a autora</span>
              <h2 id="about-title">Conheça Bianca Gonçalves</h2>
              <p>Bianca Gonçalves é nutricionista clínica (CRN-3 89451/P), formada pela Universidade Paulista (UNIP) e pós-graduada em Neurociência e Comportamento Alimentar pela PUC Campinas. Possui formação em Mindful Eating e atua em atendimentos particulares on-line, considerando a alimentação, o comportamento, o sono e as emoções em sua prática.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="home-section section--featured home-faq" aria-labelledby="faq-title">
        <div className="site-container">
          <SectionHeading
            id="faq-title"
            eyebrow="Dúvidas frequentes"
            title="Perguntas frequentes"
            description="Informações sobre os materiais e sobre o fluxo planejado do guia."
            centered
          />
          <div className="home-faq__list">
            <details className="home-faq__item">
              <summary>Para quem são os materiais?</summary>
              <p>O público varia conforme o material. Os e-books informam seu público específico nas respectivas páginas; há títulos voltados a profissionais de nutrição e outros também destinados a estudantes da área.</p>
            </details>
            <details className="home-faq__item">
              <summary>O que encontro em cada e-book?</summary>
              <p>Os conteúdos variam por título. As páginas individuais apresentam descrição, destaques e público de cada material para você consultar antes de escolher.</p>
            </details>
            <details className="home-faq__item">
              <summary>Posso ver uma amostra?</summary>
              <p>Alguns e-books têm amostras autorizadas para visualização. A disponibilidade aparece na página de cada material.</p>
            </details>
            <details className="home-faq__item">
              <summary>Como faço para comprar um e-book?</summary>
              <p><strong>Pendente:</strong> os links individuais de compra na Hotmart ainda não foram informados. As condições de compra e entrega também não estão confirmadas.</p>
            </details>
            <details className="home-faq__item">
              <summary>Como funciona o guia Antes da Consulta?</summary>
              <p>O fluxo previsto é informar o e-mail, confirmar o endereço e receber o material. A captação e a entrega ainda não estão operacionais; não há confirmação ou envio nesta prévia.</p>
            </details>
          </div>
        </div>
      </section>

      <section className="home-section section--contact" id="contato" aria-labelledby="contact-title">
        <div className="site-container">
          <SectionHeading
            id="contact-title"
            eyebrow="Canais de contato"
            title="Fale com a B2B Nutris"
            description="Nossos canais de WhatsApp e Instagram estarão disponíveis em breve."
            centered
          />
          <div className="book-grid" aria-label="Canais de contato em breve">
            <article className="card"><div className="card__body"><h3 className="card__title">WhatsApp</h3><p className="card__desc">Em breve</p></div></article>
            <article className="card"><div className="card__body"><h3 className="card__title">Instagram</h3><p className="card__desc">Em breve</p></div></article>
          </div>
        </div>
      </section>

      <section className="home-section section--hero" id="guia-gratuito" aria-labelledby="guide-title">
        <div className="site-container guide-section">
          <div className="guide-section__copy">
            <p className="hero-eyebrow">Oferta gratuita · interface em prévia</p>
            <h2 id="guide-title">Receba gratuitamente o guia Antes da Consulta</h2>
            <p>O fluxo planejado tem três etapas. Esta interface não coleta nem envia endereços de e-mail e não disponibiliza o PDF.</p>
            <ol className="guide-steps" aria-label="Etapas previstas para receber o guia">
              <li><span>1</span><div><strong>Informe seu e-mail</strong><p>O endereço será solicitado pela interface.</p></div></li>
              <li><span>2</span><div><strong>Confirme o endereço</strong><p>A confirmação ainda não está integrada.</p></div></li>
              <li><span>3</span><div><strong>Receba o material</strong><p>A entrega depende de integração e autorização do PDF.</p></div></li>
            </ol>
          </div>
          <div className="contact-card guide-section__form">
            <GuideCaptureForm />
          </div>
        </div>
      </section>
    </main>
  );
}

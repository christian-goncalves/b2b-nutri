import Image from "next/image";
import Link from "next/link";
import { BookCard } from "@/components/book-card";
import { HomeHeroInteraction } from "@/components/home-hero-interaction";
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
      <section className="section--hero home-section home-hero" aria-labelledby="hero-title">
        <div className="site-container home-hero__layout">
          <div className="home-hero__copy">
            <span className="hero-eyebrow">E-books e guias para nutricionistas</span>
            <h1 id="hero-title">
              Conhecimento à mão.{" "}
              <span className="home-hero__highlight home-hero__highlight--light-20">
                Mais praticidade no seu dia a dia.
              </span>
            </h1>
            <p>
              Chega de <strong>perder tempo</strong> procurando informações entre arquivos e pesquisas intermináveis. A B2B Nutris reúne <strong>guias e materiais práticos</strong> para você ganhar agilidade, organizar seu conhecimento e focar no que realmente importa: <strong>seus atendimentos</strong>.
            </p>
            <div className="home-hero__actions">
              <HomeHeroInteraction />
            </div>
          </div>
          <figure className="home-hero__visual">
            <div className="home-hero__page home-hero__page--back" aria-hidden="true">
              <Image src="/images/home-guide-poster-back.png" alt="" width={1055} height={1491} sizes="(max-width: 767px) 72vw, 29vw" />
            </div>
            <div className="home-hero__page home-hero__page--front">
              <Image
                src="/images/home-guide-poster-front.png"
                alt="Arte temporária do guia gratuito Antes da Consulta para nutricionistas, com a capa e telas do material."
                width={1055}
                height={1491}
                sizes="(max-width: 767px) 82vw, 34vw"
                preload
              />
            </div>
          </figure>
        </div>
      </section>

      <section className="home-section section--featured home-library-selection" id="ebooks-em-destaque" aria-labelledby="featured-title">
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

    </main>
  );
}

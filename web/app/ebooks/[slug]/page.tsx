import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { BookCard } from "@/components/book-card";
import { ebooks } from "@/data/home-books";
import { getAuthorizedSamplePath } from "@/lib/sample-pdf";
import type { HomeBook } from "@/types/home-book";

export const dynamicParams = false;

export function generateStaticParams() {
  return ebooks.map(({ slug }) => ({ slug }));
}

async function getEbook(params: Promise<{ slug: string }>) {
  const { slug } = await params;
  return ebooks.find((ebook) => ebook.slug === slug);
}

type EbookPageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: EbookPageProps): Promise<Metadata> {
  const ebook = await getEbook(params);
  if (!ebook) return { title: "E-book não encontrado" };

  return {
    title: ebook.seo.title,
    description: ebook.seo.description,
    openGraph: {
      title: `${ebook.seo.title} | B2B Nutris`,
      description: ebook.seo.description,
      type: "website",
    },
  };
}

function getRelatedBooks(ebook: HomeBook) {
  const bySlug = new Map(ebooks.map((item) => [item.slug, item]));
  return ebook.relatedSlugs
    .map((slug) => bySlug.get(slug))
    .filter((item): item is HomeBook => Boolean(item) && item?.slug !== ebook.slug)
    .slice(0, 3);
}

export default async function EbookDetailPage({ params }: EbookPageProps) {
  const ebook = await getEbook(params);
  if (!ebook) notFound();

  const relatedBooks = getRelatedBooks(ebook);
  const samplePath = getAuthorizedSamplePath(ebook);

  return (
    <main className="product-page">
      <section className="product-detail home-section">
        <div className="site-container">
          <nav className="product-breadcrumb" aria-label="Trilha de navegação">
            <Link href="/">Início</Link><span aria-hidden="true">/</span>
            <Link href="/ebooks">E-books</Link><span aria-hidden="true">/</span>
            <span aria-current="page">{ebook.title}</span>
          </nav>

          <div className="product-detail__layout">
            <div className="product-detail__cover">
              <Image
                src={ebook.cover}
                alt={ebook.coverAlt}
                sizes="(max-width: 720px) 100vw, 48vw"
                preload
              />
            </div>
            <div className="product-detail__content">
              <p className="section-heading__eyebrow">{ebook.category}</p>
              {ebook.collection && <p className="product-detail__collection">{ebook.collection}</p>}
              <h1>{ebook.title}</h1>
              <p className="product-detail__short-description">{ebook.description}</p>
              <p className="product-detail__long-description">{ebook.longDescription}</p>

              {ebook.highlights.length > 0 && (
                <div className="product-highlights">
                  <h2>O que você encontra no material</h2>
                  <ul>
                    {ebook.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
                  </ul>
                </div>
              )}

              {ebook.audience && <p className="product-detail__audience"><strong>Indicado para:</strong> {ebook.audience}</p>}

              {ebook.hotmartUrl ? (
                <a className="btn btn--primary btn--lg" href={ebook.hotmartUrl} target="_blank" rel="noreferrer">
                  COMPRAR NA HOTMART
                </a>
              ) : (
                <p className="product-detail__pending" role="status">O link individual de compra na Hotmart ainda não foi informado.</p>
              )}
              {samplePath && <Link className="btn btn--primary btn--lg" href={`/ebooks/${ebook.slug}/amostra`}>VISUALIZAR AMOSTRA GRÁTIS</Link>}
            </div>
          </div>
        </div>
      </section>

      {relatedBooks.length > 0 && (
        <section className="home-section section--featured" aria-labelledby="related-books-title">
          <div className="site-container">
            <div className="section-heading">
              <p className="section-heading__eyebrow">Continue explorando</p>
              <h2 className="section-heading__title" id="related-books-title">Materiais relacionados</h2>
            </div>
            <div className="book-grid">
              {relatedBooks.map((book) => <BookCard key={book.id} book={book} />)}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}

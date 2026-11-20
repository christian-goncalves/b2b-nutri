import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Children, isValidElement, type ComponentProps, type ReactNode } from "react";
import { BookCard } from "@/components/book-card";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { StructuredData } from "@/components/structured-data";
import { ebooks } from "@/data/home-books";
import { getApprovedArticle, getApprovedArticles } from "@/data/library/articles";
import { getLibraryCategory } from "@/data/library/categories";
import { absoluteSiteUrl, createPageMetadata } from "@/lib/seo";
import type { ScientificArticle } from "@/types/scientific-article";

type ArticlePageProps = { params: Promise<{ slug: string }> };

function getTextContent(node: ReactNode): string {
  return Children.toArray(node).map((child) => {
    if (typeof child === "string" || typeof child === "number") return String(child);
    if (isValidElement<{ children?: ReactNode }>(child)) return getTextContent(child.props.children);
    return "";
  }).join("");
}

const articleBodyComponents = {
  h1: () => null,
  p: ({ children, ...props }: ComponentProps<"p">) => {
    if (getTextContent(children).trim().startsWith("Resumo:")) return null;
    return <p {...props}>{children}</p>;
  },
};

export const dynamicParams = false;

export function generateStaticParams() {
  return getApprovedArticles().map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getApprovedArticle(slug);
  if (!article) {
    return createPageMetadata({
      title: "Artigo não encontrado",
      description: "O artigo solicitado não está disponível na biblioteca.",
      path: `/biblioteca/artigos/${slug}`,
      indexable: false,
    });
  }

  return createPageMetadata({
    title: article.seoTitle ?? article.title,
    absoluteTitle: article.seoTitleIsAbsolute,
    description: article.seoDescription ?? article.summary,
    path: `/biblioteca/artigos/${article.slug}`,
    openGraphType: "article",
    publishedTime: article.publishedAt,
    modifiedTime: article.updatedAt,
    authors: [article.editorialAuthor],
  });
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("pt-BR", { dateStyle: "long", timeZone: "UTC" }).format(new Date(`${date}T00:00:00Z`));
}

function resolveBooks(article: ScientificArticle) {
  const bySlug = new Map(ebooks.map((book) => [book.slug, book]));
  const primaryBook = article.primaryProductSlug ? bySlug.get(article.primaryProductSlug) : undefined;
  const relatedBooks = article.relatedProductSlugs
    .filter((slug) => slug !== article.primaryProductSlug)
    .map((slug) => bySlug.get(slug))
    .filter((book) => Boolean(book));

  return { primaryBook, relatedBooks };
}

function createArticleStructuredData(article: ScientificArticle, categoryTitle: string) {
  const articleUrl = absoluteSiteUrl(`/biblioteca/artigos/${article.slug}`);
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.summary,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    author: { "@type": "Organization", name: article.editorialAuthor },
    publisher: { "@type": "Organization", name: "B2B Nutris" },
    mainEntityOfPage: { "@type": "WebPage", "@id": articleUrl },
    image: [absoluteSiteUrl("/opengraph-image")],
    articleSection: categoryTitle,
    keywords: article.tags,
    version: article.version,
    citation: article.scientificReferences.map((reference) => reference.url ?? reference.citation),
  };

  return schema;
}

export default async function ScientificArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = getApprovedArticle(slug);
  if (!article) notFound();

  const category = getLibraryCategory(article.primaryCategory);
  if (!category) notFound();

  const { primaryBook, relatedBooks } = resolveBooks(article);
  const Content = article.content;

  return (
    <main className="library-page">
      <article className="home-section section--featured scientific-article">
        <div className="site-container scientific-article__container">
          <Breadcrumbs items={[
            { name: "Início", path: "/" },
            { name: "Biblioteca", path: "/biblioteca" },
            { name: category.title, path: `/biblioteca/${category.slug}` },
            { name: article.title, path: `/biblioteca/artigos/${article.slug}` },
          ]} />
          <StructuredData data={createArticleStructuredData(article, category.title)} />

          <header className="scientific-article__header">
            <p className="section-heading__eyebrow">{category.title}</p>
            <h1>{article.title}</h1>
            <p className="scientific-article__summary">{article.summary}</p>
            <dl className="scientific-article__byline">
              <div><dt>Autoria</dt><dd>{article.editorialAuthor}</dd></div>
              {article.reviewer && (
                <div>
                  <dt>Revisão científica</dt>
                  <dd>
                    {article.reviewer.name}
                    {article.reviewer.qualification ? ` · ${article.reviewer.qualification}` : ""}
                    {article.reviewer.crn ? ` · ${article.reviewer.crn}` : ""}
                  </dd>
                </div>
              )}
              <div><dt>Publicado em</dt><dd><time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time></dd></div>
            </dl>
            <ul className="scientific-article__tags" aria-label="Temas do artigo">
              {article.tags.map((tag) => <li key={tag}>{tag}</li>)}
            </ul>
          </header>

          <div className="scientific-article__body">
            <Content components={articleBodyComponents} />
          </div>
        </div>
      </article>

      {primaryBook && (
        <section className="home-section section--featured" aria-labelledby="primary-book-title">
          <div className="site-container">
            <div className="section-heading">
              <p className="section-heading__eyebrow">E-book principal</p>
              <h2 id="primary-book-title" className="section-heading__title">Material relacionado ao artigo</h2>
            </div>
            <div className="book-grid"><BookCard book={primaryBook} /></div>
          </div>
        </section>
      )}

      {relatedBooks.length > 0 && (
        <section className="home-section section--featured" aria-labelledby="related-books-title">
          <div className="site-container">
            <div className="section-heading">
              <p className="section-heading__eyebrow">Sugestões complementares</p>
              <h2 id="related-books-title" className="section-heading__title">Continue explorando</h2>
            </div>
            <div className="book-grid">
              {relatedBooks.map((book) => book && <BookCard key={book.id} book={book} />)}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}

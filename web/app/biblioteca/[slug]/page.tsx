import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BookCard } from "@/components/book-card";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { LibraryArticleCard } from "@/components/library-article-card";
import { ebooks } from "@/data/home-books";
import { getArticlesForCategory } from "@/data/library/articles";
import { getLibraryCategory, libraryCategories } from "@/data/library/categories";
import { createPageMetadata } from "@/lib/seo";

type CategoryPageProps = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return libraryCategories.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = getLibraryCategory(slug);
  if (!category) {
    return createPageMetadata({
      title: "Tema não encontrado",
      description: "O tema solicitado não está disponível na biblioteca.",
      path: `/biblioteca/${slug}`,
      indexable: false,
    });
  }

  return createPageMetadata({
    title: category.title,
    description: category.description,
    path: `/biblioteca/${category.slug}`,
  });
}

export default async function LibraryCategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = getLibraryCategory(slug);
  if (!category) notFound();

  const articles = getArticlesForCategory(category.slug);
  const showMicronutrientDemonstration =
    process.env.NODE_ENV === "development" &&
    category.slug === "micronutrientes" &&
    articles.length === 0;
  const relatedBooks = category.relatedProductSlugs
    .map((bookSlug) => ebooks.find((book) => book.slug === bookSlug))
    .filter((book) => Boolean(book));

  return (
    <main className="library-page">
      <section className="home-section section--featured" aria-labelledby="category-title">
        <div className="site-container">
          <Breadcrumbs items={[
            { name: "Início", path: "/" },
            { name: "Biblioteca", path: "/biblioteca" },
            { name: category.title, path: `/biblioteca/${category.slug}` },
          ]} />

          <header className="library-intro library-intro--category">
            <p className="section-heading__eyebrow">Biblioteca científica</p>
            <h1 id="category-title">{category.title}</h1>
            <p>{category.description}</p>
          </header>

          <section className="library-articles" aria-labelledby="category-articles-title">
            <div className="section-heading">
              <h2 id="category-articles-title" className="section-heading__title">Artigos</h2>
            </div>
            {articles.length > 0 ? (
              <div className="library-article-grid">
                {articles.map((article) => <LibraryArticleCard key={article.id} article={article} />)}
              </div>
            ) : showMicronutrientDemonstration ? (
              <div className="library-article-grid">
                {[0, 1, 2].map((copy) => (
                  <LibraryArticleCard
                    key={`micronutrientes-demonstration-${copy}`}
                    demonstration={{
                      title: "Ferritina e ferro: interpretação na prática clínica",
                      summary: "Entenda como avaliar os resultados de ferritina considerando os estoques de ferro, a inflamação e o contexto clínico.",
                      categorySlug: "micronutrientes",
                    }}
                  />
                ))}
              </div>
            ) : (
              <p className="empty-state">
                Ainda não há artigos aprovados neste tema. Conteúdos serão listados aqui após revisão editorial.
              </p>
            )}
          </section>

          {relatedBooks.length > 0 && (
            <section className="library-related" aria-labelledby="category-books-title">
              <div className="section-heading">
                <p className="section-heading__eyebrow">Materiais relacionados</p>
                <h2 id="category-books-title" className="section-heading__title">E-books da B2B Nutris</h2>
              </div>
              <div className="book-grid">
                {relatedBooks.map((book) => book && <BookCard key={book.id} book={book} />)}
              </div>
            </section>
          )}
        </div>
      </section>
    </main>
  );
}

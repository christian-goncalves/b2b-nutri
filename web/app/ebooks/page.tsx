import { EbookCatalog } from "@/components/ebook-catalog";
import { ebookCategories, ebooks } from "@/data/home-books";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "E-books",
  description: "Explore os materiais digitais da biblioteca B2B Nutris.",
  path: "/ebooks",
});

export default function EbooksPage() {
  return (
    <main className="catalog-page">
      <section className="home-section section--featured" aria-labelledby="catalog-page-title">
        <div className="site-container">
          <div className="catalog-page__intro">
            <p className="section-heading__eyebrow">Biblioteca B2B Nutris</p>
            <h1 id="catalog-page-title">E-books</h1>
            <p>Materiais digitais para apoiar a prática e o raciocínio clínico em nutrição.</p>
          </div>
          <EbookCatalog books={ebooks} categories={ebookCategories} />
        </div>
      </section>
    </main>
  );
}

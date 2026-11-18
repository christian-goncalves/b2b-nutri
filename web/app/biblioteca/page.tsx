import type { Metadata } from "next";
import { LibraryCategoryCard } from "@/components/library-category-card";
import { libraryCategories } from "@/data/library/categories";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Biblioteca científica",
  description: "Artigos de nutrição organizados por tema, com referências e histórico editorial.",
  path: "/biblioteca",
});

export default function LibraryPage() {
  return (
    <main className="library-page">
      <section className="home-section section--featured" aria-labelledby="library-title">
        <div className="site-container">
          <div className="library-intro">
            <p className="section-heading__eyebrow">B2B Nutris</p>
            <h1 id="library-title">Biblioteca científica</h1>
            <p>
              Conteúdos sobre nutrição organizados por tema. Os artigos publicados terão autoria institucional,
              referências identificáveis e informações de revisão e versão confirmadas.
            </p>
          </div>

          <div className="library-category-grid" aria-label="Temas da biblioteca">
            {libraryCategories.map((category) => (
              <LibraryCategoryCard key={category.slug} category={category} />
            ))}
          </div>

          <p className="library-editorial-note">
            Artigos são incorporados manualmente após a revisão científica. A biblioteca não publica rascunhos.
          </p>
        </div>
      </section>
    </main>
  );
}

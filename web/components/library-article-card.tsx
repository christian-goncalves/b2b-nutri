import Link from "next/link";
import { getLibraryCategory } from "@/data/library/categories";
import type { ScientificArticle } from "@/types/scientific-article";

function formatDate(date: string) {
  return new Intl.DateTimeFormat("pt-BR", { dateStyle: "long", timeZone: "UTC" }).format(new Date(`${date}T00:00:00Z`));
}

export function LibraryArticleCard({ article }: { article: ScientificArticle }) {
  const category = getLibraryCategory(article.primaryCategory);

  return (
    <article className="card library-article-card">
      <div className="card__body">
        {category && <p className="card__eyebrow">{category.title}</p>}
        <h2 className="card__title">
          <Link href={`/biblioteca/artigos/${article.slug}`}>{article.title}</Link>
        </h2>
        <p className="card__desc">{article.summary}</p>
        <p className="library-article-card__meta">
          Atualizado em <time dateTime={article.updatedAt}>{formatDate(article.updatedAt)}</time>
        </p>
        <p className="card__action">
          <Link href={`/biblioteca/artigos/${article.slug}`}>LER ARTIGO</Link>
        </p>
      </div>
    </article>
  );
}

import Link from "next/link";
import { getLibraryCategory } from "@/data/library/categories";
import type { ScientificArticle } from "@/types/scientific-article";

type LibraryArticleCardProps =
  | { article: ScientificArticle; demonstration?: never }
  | {
      article?: never;
      demonstration: {
        title: string;
        summary: string;
        categorySlug: ScientificArticle["primaryCategory"];
      };
    };

function formatDate(date: string) {
  return new Intl.DateTimeFormat("pt-BR", { dateStyle: "long", timeZone: "UTC" }).format(new Date(`${date}T00:00:00Z`));
}

export function LibraryArticleCard({ article, demonstration }: LibraryArticleCardProps) {
  const title = article ? article.title : demonstration.title;
  const summary = article ? article.summary : demonstration.summary;
  const category = getLibraryCategory(article ? article.primaryCategory : demonstration.categorySlug);
  const articlePath = article ? `/biblioteca/artigos/${article.slug}` : undefined;

  return (
    <article className="card library-article-card">
      <div className="card__body">
        {category && <p className="card__eyebrow">{category.title}</p>}
        <h2 className="card__title">
          {articlePath ? <Link href={articlePath}>{title}</Link> : title}
        </h2>
        <p className="card__desc">{summary}</p>
        {article && (
          <p className="library-article-card__meta">
            Atualizado em <time dateTime={article.updatedAt}>{formatDate(article.updatedAt)}</time>
          </p>
        )}
        <p className="card__action">
          {articlePath ? <Link href={articlePath}>Ler artigo</Link> : <span aria-disabled="true">Ler artigo</span>}
        </p>
      </div>
    </article>
  );
}

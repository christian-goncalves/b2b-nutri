import Link from "next/link";
import type { LibraryCategory } from "@/data/library/categories";

export function LibraryCategoryCard({ category }: { category: LibraryCategory }) {
  return (
    <article className="card library-category-card">
      <div className="card__body">
        <h2 className="card__title">
          <Link href={`/biblioteca/${category.slug}`}>{category.title}</Link>
        </h2>
        <p className="card__desc">{category.description}</p>
        <p className="card__action">
          <Link href={`/biblioteca/${category.slug}`} aria-label={`Ver artigos: ${category.title}`}>
            EXPLORAR TEMA <span aria-hidden="true">→</span>
          </Link>
        </p>
      </div>
    </article>
  );
}

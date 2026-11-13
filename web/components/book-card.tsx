import Image from "next/image";
import Link from "next/link";
import type { HomeBook } from "@/types/home-book";

export function BookCard({ book }: { book: HomeBook }) {
  const href = `/ebooks/${book.slug}`;
  return (
    <article className="card book-card">
      <Link className="book-card__cover" href={href} aria-label={`Conhecer ${book.title}`}>
        <Image src={book.cover} alt={book.coverAlt} sizes="(max-width: 499px) 100vw, (max-width: 980px) 50vw, 33vw" />
      </Link>
      <div className="card__body">
        <span className="card__eyebrow">{book.category}</span>
        <h3 className="card__title"><Link href={href}>{book.title}</Link></h3>
        <p className="card__desc">{book.description}</p>
        <div className="card__action">
          <Link href={href} className="btn btn--primary">
            CONHECER MATERIAL
          </Link>
        </div>
      </div>
    </article>
  );
}

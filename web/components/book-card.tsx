import Image from "next/image";
import Link from "next/link";
import type { HomeBook } from "@/types/home-book";

export function BookCard({ book, headingLevel = "h3" }: { book: HomeBook; headingLevel?: "h2" | "h3" }) {
  const href = `/ebooks/${book.slug}`;
  const Heading = headingLevel;
  return (
    <article className="card book-card">
      <Link className="book-card__cover" href={href} aria-label={`Conhecer ${book.title}`}>
        <Image src={book.cover} alt={book.coverAlt} sizes="(max-width: 499px) 100vw, (max-width: 980px) 50vw, 33vw" />
      </Link>
      <div className="card__body">
        <span className="card__eyebrow">{book.category}</span>
        <Heading className="card__title"><Link href={href}>{book.title}</Link></Heading>
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

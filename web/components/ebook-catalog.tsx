"use client";

import { useMemo, useState } from "react";
import { BookCard } from "@/components/book-card";
import type { HomeBook } from "@/types/home-book";

type EbookCatalogProps = {
  books: HomeBook[];
  categories: string[];
};

export function EbookCatalog({ books, categories }: EbookCatalogProps) {
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const visibleBooks = useMemo(
    () => selectedCategory === "Todos" ? books : books.filter((book) => book.category === selectedCategory),
    [books, selectedCategory],
  );

  return (
    <div className="catalog-browser">
      <div className="category-filter" role="group" aria-label="Filtrar e-books por categoria">
        {["Todos", ...categories].map((category) => (
          <button
            key={category}
            className="category-filter__button"
            type="button"
            aria-pressed={selectedCategory === category}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>
      <p className="catalog-browser__count" role="status" aria-live="polite">
        {visibleBooks.length} {visibleBooks.length === 1 ? "material" : "materiais"}
      </p>
      {visibleBooks.length > 0 ? (
        <div className="book-grid">
          {visibleBooks.map((book) => <BookCard key={book.id} book={book} headingLevel="h2" />)}
        </div>
      ) : (
        <p className="catalog-browser__empty">Ainda não há materiais publicados nesta categoria.</p>
      )}
    </div>
  );
}

import type { MetadataRoute } from "next";
import { ebooks } from "@/data/home-books";
import { getApprovedArticles } from "@/data/library/articles";
import { libraryCategories } from "@/data/library/categories";
import { absoluteSiteUrl, isProductionIndexingEnabled } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  if (!isProductionIndexingEnabled()) return [];

  const publicPaths = [
    "/",
    "/ebooks",
    ...ebooks.map((ebook) => `/ebooks/${ebook.slug}`),
    "/biblioteca",
    ...libraryCategories.map((category) => `/biblioteca/${category.slug}`),
  ];

  return [
    ...publicPaths.map((path) => ({ url: absoluteSiteUrl(path) })),
    ...getApprovedArticles().map((article) => ({
      url: absoluteSiteUrl(`/biblioteca/artigos/${article.slug}`),
      lastModified: article.updatedAt,
    })),
  ];
}

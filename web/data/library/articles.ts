import type { ScientificArticle } from "@/types/scientific-article";
import { ebooks } from "@/data/home-books";

// Only manually reviewed articles belong here. MDX files for draft or test use stay outside this registry.
const approvedArticles: ScientificArticle[] = [];

function validateArticle(article: ScientificArticle, slugs: Set<string>) {
  if (!article.id.trim() || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(article.slug) || slugs.has(article.slug)) {
    throw new Error(`Artigo da biblioteca com identificador ou slug inválido: ${article.slug}`);
  }
  if (!article.title.trim() || !article.summary.trim() || !article.version.trim() || !article.tags.length || !article.scientificReferences.length) {
    throw new Error(`Artigo aprovado incompleto: ${article.slug}`);
  }
  for (const date of [article.reviewedAt, article.publishedAt, article.updatedAt]) {
    const parsed = new Date(`${date}T00:00:00Z`);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || Number.isNaN(parsed.getTime()) || parsed.toISOString().slice(0, 10) !== date) {
      throw new Error(`Data não confirmada ou inválida no artigo: ${article.slug}`);
    }
  }

  const productSlugs = [article.primaryProductSlug, ...article.relatedProductSlugs];
  if (productSlugs.some((slug) => !ebooks.some((book) => book.slug === slug))) {
    throw new Error(`Associação com e-book inexistente no artigo: ${article.slug}`);
  }
  if (article.scientificReferences.some((reference) => !reference.title.trim() || !reference.citation.trim())) {
    throw new Error(`Referência científica incompleta no artigo: ${article.slug}`);
  }
  for (const reference of article.scientificReferences) {
    if (!reference.url) continue;
    try {
      const url = new URL(reference.url);
      if (url.protocol !== "https:" && url.protocol !== "http:") throw new Error("Protocolo não permitido");
    } catch {
      throw new Error(`URL de referência inválida no artigo: ${article.slug}`);
    }
  }
  slugs.add(article.slug);
}

export function getApprovedArticles() {
  const slugs = new Set<string>();
  for (const article of approvedArticles) validateArticle(article, slugs);
  return approvedArticles.filter((article) => article.editorialStatus === "approved");
}

export function getApprovedArticle(slug: string) {
  return getApprovedArticles().find((article) => article.slug === slug);
}

export function getArticlesForCategory(categorySlug: string) {
  return getApprovedArticles().filter((article) => article.primaryCategory === categorySlug);
}

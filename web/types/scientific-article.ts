import type { MDXContent } from "mdx/types";
import type { LibraryCategorySlug } from "@/data/library/categories";

export type ScientificReference = {
  title: string;
  citation: string;
  url?: string;
};

export type ScientificReviewer = {
  name: string;
  qualification?: string;
  crn?: string;
};

export type ScientificArticle = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  seoTitle?: string;
  seoDescription?: string;
  seoTitleIsAbsolute?: boolean;
  primaryCategory: LibraryCategorySlug;
  tags: string[];
  primaryProductSlug: string;
  relatedProductSlugs: string[];
  editorialAuthor: "B2B Nutris";
  reviewer?: ScientificReviewer;
  scientificReferences: ScientificReference[];
  version: string;
  reviewedAt: string;
  publishedAt: string;
  updatedAt: string;
  editorialStatus: "approved";
  content: MDXContent;
};

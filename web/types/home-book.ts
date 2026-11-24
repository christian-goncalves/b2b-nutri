import type { StaticImageData } from "next/image";

export type EbookCoverCollection =
  | "Comportamento Alimentar"
  | "Micronutrientes"
  | "Prática Clínica"
  | "Suplementação";

export type HomeBook = {
  id: string;
  slug: string;
  title: string;
  heroTitle?: string;
  category: string;
  description: string;
  heroDescription?: string;
  longDescription: string;
  cover: StaticImageData;
  coverAlt: string;
  coverCollection: EbookCoverCollection;
  collection?: string;
  highlights: string[];
  audience?: string;
  relatedSlugs: string[];
  samplePdf: { path: string; authorized: boolean } | null;
  hotmartUrl: string | null;
  isFree?: boolean;
  published: boolean;
  launch?: { label: string; date?: string };
  seo: { title: string; description: string };
  featuredInSlider: boolean;
  featuredOnHome: boolean;
};

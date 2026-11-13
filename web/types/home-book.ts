import type { StaticImageData } from "next/image";

export type HomeBook = {
  id: string;
  slug: string;
  title: string;
  category: string;
  description: string;
  longDescription: string;
  cover: StaticImageData;
  coverAlt: string;
  collection?: string;
  highlights: string[];
  audience?: string;
  relatedSlugs: string[];
  samplePdf: { path: string; authorized: boolean } | null;
  hotmartUrl: string | null;
  published: boolean;
  launch?: { label: string; date?: string };
  seo: { title: string; description: string };
  featuredInSlider: boolean;
  featuredOnHome: boolean;
};

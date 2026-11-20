import type { Metadata } from "next";

export const PRODUCTION_ORIGIN = "https://b2bnutris.com";

export function isProductionIndexingEnabled() {
  return process.env.VERCEL_ENV === "production";
}

export function getSiteOrigin() {
  if (isProductionIndexingEnabled()) return PRODUCTION_ORIGIN;

  const deploymentUrl = process.env.VERCEL_URL;
  if (deploymentUrl) return `https://${deploymentUrl}`;

  return "http://localhost:3000";
}

export function absoluteSiteUrl(path: string) {
  return new URL(path, getSiteOrigin()).toString();
}

type PageMetadataInput = {
  title: string;
  absoluteTitle?: boolean;
  description: string;
  path: string;
  indexable?: boolean;
  openGraphType?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
};

export function createPageMetadata({
  title,
  absoluteTitle = false,
  description,
  path,
  indexable = true,
  openGraphType = "website",
  publishedTime,
  modifiedTime,
  authors,
}: PageMetadataInput): Metadata {
  const canonical = absoluteSiteUrl(path);
  const productionEnvironment = isProductionIndexingEnabled();
  const shouldIndex = indexable && productionEnvironment;

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    robots: { index: shouldIndex, follow: productionEnvironment },
    openGraph: {
      title,
      description,
      type: openGraphType,
      url: canonical,
      siteName: "B2B Nutris",
      locale: "pt_BR",
      images: [
        {
          url: absoluteSiteUrl("/opengraph-image"),
          width: 1200,
          height: 630,
          alt: "B2B Nutris — materiais de nutrição",
        },
      ],
      ...(publishedTime ? { publishedTime } : {}),
      ...(modifiedTime ? { modifiedTime } : {}),
      ...(authors ? { authors } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [absoluteSiteUrl("/opengraph-image")],
    },
  };
}

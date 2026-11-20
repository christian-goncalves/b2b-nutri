import type { MetadataRoute } from "next";
import { absoluteSiteUrl, isProductionIndexingEnabled } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  if (!isProductionIndexingEnabled()) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  return {
    rules: { userAgent: "*", allow: "/", disallow: "/api/" },
    sitemap: absoluteSiteUrl("/sitemap.xml"),
  };
}

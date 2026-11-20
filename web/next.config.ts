import type { NextConfig } from "next";
import createMDX from "@next/mdx";
import path from "node:path";
import { fileURLToPath } from "node:url";

const withMDX = createMDX({ extension: /\.mdx?$/ });
const appRoot = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  turbopack: {
    root: path.resolve(appRoot, ".."),
  },
};

export default withMDX(nextConfig);

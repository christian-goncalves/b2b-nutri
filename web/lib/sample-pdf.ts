import { existsSync } from "node:fs";
import { join } from "node:path";
import type { HomeBook } from "@/types/home-book";

export function getAuthorizedSamplePath(ebook: HomeBook) {
  const sample = ebook.samplePdf;
  if (!sample?.authorized || !/^\/samples\/[\w./-]+\.pdf$/i.test(sample.path) || sample.path.includes("..")) {
    return null;
  }
  const publicDir = join(process.cwd(), "public");
  const pageDir = join(publicDir, "samples", "pages", sample.path.split("/").pop()!.slice(0, -4));
  const complete = existsSync(join(publicDir, sample.path.slice(1))) &&
    [1, 2, 3, 4, 5].every((page) => existsSync(join(pageDir, `${page}.webp`)));
  return complete ? sample.path : null;
}

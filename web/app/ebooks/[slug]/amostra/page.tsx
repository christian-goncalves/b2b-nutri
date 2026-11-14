import Link from "next/link";
import { notFound } from "next/navigation";
import { SampleReader } from "@/components/sample-reader";
import { ebooks } from "@/data/home-books";
import { getAuthorizedSamplePath } from "@/lib/sample-pdf";

export const dynamicParams = false;

export function generateStaticParams() {
  return ebooks.filter((ebook) => getAuthorizedSamplePath(ebook)).map(({ slug }) => ({ slug }));
}

export default async function SamplePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const ebook = ebooks.find((item) => item.slug === slug);
  const path = ebook && getAuthorizedSamplePath(ebook);
  if (!ebook || !path) notFound();

  return (
    <main className="catalog-page home-section sample-page">
      <div className="site-container">
        <nav className="product-breadcrumb sample-page__breadcrumb" aria-label="Trilha de navegação">
          <Link href="/ebooks">E-books</Link><span aria-hidden="true">/</span>
          <Link href={`/ebooks/${ebook.slug}`}>{ebook.title}</Link><span aria-hidden="true">/</span>
          <span aria-current="page">Amostra</span>
        </nav>
        <div className="sample-reader__heading"><h1><span className="sample-page__prefix">Amostra: </span>{ebook.title}</h1></div>
        <SampleReader path={path} title={ebook.title} />
      </div>
    </main>
  );
}

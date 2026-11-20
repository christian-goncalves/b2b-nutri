import Link from "next/link";
import { StructuredData, breadcrumbData } from "@/components/structured-data";

export type Breadcrumb = { name: string; path: string };

export function Breadcrumbs({ items }: { items: Breadcrumb[] }) {
  const schemaItems = items.map((item) => ({ name: item.name, path: item.path }));

  return (
    <>
      <nav className="library-breadcrumb" aria-label="Trilha de navegação">
        <ol>
          {items.map((item, index) => (
            <li key={`${item.name}-${index}`}>
              {index < items.length - 1 ? (
                <Link href={item.path}>{item.name}</Link>
              ) : (
                <span aria-current="page">{item.name}</span>
              )}
            </li>
          ))}
        </ol>
      </nav>
      <StructuredData data={breadcrumbData(schemaItems)} />
    </>
  );
}

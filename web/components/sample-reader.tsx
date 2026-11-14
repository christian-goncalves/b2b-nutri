"use client";

import { useState } from "react";

export function SampleReader({ path, title }: { path: string; title: string }) {
  const [page, setPage] = useState(1);
  const [zoom, setZoom] = useState(100);
  const name = path.split("/").pop()!.slice(0, -4);
  return (
    <section className="sample-reader" aria-label={`Amostra de ${title}`}>
      <div className="sample-reader__controls sample-reader__navigation" aria-label="Navegação da amostra">
        <button className="category-filter__button" type="button" aria-label="Página anterior" disabled={page === 1} onClick={() => setPage(page - 1)}><span className="sample-reader__desktop">Página anterior</span><span className="sample-reader__mobile" aria-hidden="true">Anterior</span></button>
        <span role="status" aria-live="polite"><span className="sample-reader__desktop">Página </span>{page} de 5</span>
        <button className="category-filter__button" type="button" aria-label="Próxima página" disabled={page === 5} onClick={() => setPage(page + 1)}><span className="sample-reader__desktop">Próxima página</span><span className="sample-reader__mobile" aria-hidden="true">Próxima</span></button>
      </div>
      <div className="sample-reader__controls sample-reader__zoom" aria-label="Ampliação da página">
        <button className="category-filter__button" type="button" aria-label="Reduzir" disabled={zoom === 100} onClick={() => setZoom(zoom - 50)}><span className="sample-reader__desktop">Reduzir</span><span className="sample-reader__mobile" aria-hidden="true">−</span></button>
        <span className="sample-reader__zoom-value" aria-live="polite">Ampliação: {zoom}%</span>
        <button className="category-filter__button" type="button" aria-label="Ampliar" disabled={zoom === 300} onClick={() => setZoom(zoom + 50)}><span className="sample-reader__desktop">Ampliar</span><span className="sample-reader__mobile" aria-hidden="true">+</span></button>
      </div>
      {/* Each image is rendered from the corresponding page of the approved sample PDF. */}
      <div className="sample-reader__viewport" tabIndex={zoom > 100 ? 0 : undefined} aria-label="Página da amostra">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="sample-reader__page" style={{ width: `${zoom}%` }} src={`/samples/pages/${name}/${page}.webp`} alt={`${title}, página ${page} de 5`} />
      </div>
    </section>
  );
}

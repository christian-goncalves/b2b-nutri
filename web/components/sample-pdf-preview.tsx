type SamplePdfPreviewProps = {
  path: string;
  authorized: boolean;
  title: string;
};

export function SamplePdfPreview({ path, authorized, title }: SamplePdfPreviewProps) {
  const safePath = path.startsWith("/samples/") && !path.includes("..") && !path.includes("?") && !path.includes("#");
  if (!authorized || !safePath) return null;

  return (
    <section className="product-sample" aria-labelledby="sample-title">
      <div className="product-sample__heading">
        <h2 id="sample-title">Amostra do material</h2>
        <a href={path} target="_blank" rel="noreferrer">Abrir PDF em nova aba</a>
      </div>
      <iframe
        className="product-sample__frame"
        src={`${path}#view=FitH`}
        title={`Amostra em PDF: ${title}`}
        loading="lazy"
      />
    </section>
  );
}

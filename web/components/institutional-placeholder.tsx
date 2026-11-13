import Link from "next/link";

export function InstitutionalPlaceholder({
  title,
  message,
}: {
  title: string;
  message: string;
}) {
  return (
    <main className="institutional-placeholder">
      <div className="site-container">
        <span className="section-heading__eyebrow">B2B Nutris</span>
        <h1>{title}</h1>
        <p>{message}</p>
        <Link href="/" className="btn btn--primary">
          VOLTAR AO INÍCIO
        </Link>
      </div>
    </main>
  );
}

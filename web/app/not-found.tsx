import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Página não encontrada",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main className="foundation-main">
      <div className="foundation-main__content">
        <p className="foundation-eyebrow">B2B Nutris</p>
        <h1>Página não encontrada</h1>
        <p>O endereço solicitado não corresponde a uma página disponível.</p>
      </div>
    </main>
  );
}

import type { Metadata } from "next";
import { InstitutionalPlaceholder } from "@/components/institutional-placeholder";

export const metadata: Metadata = { title: "Termos de uso" };

export default function TermsPage() {
  return (
    <InstitutionalPlaceholder
      title="Termos de uso"
      message="O texto dos termos de uso aguarda revisão e aprovação do responsável."
    />
  );
}

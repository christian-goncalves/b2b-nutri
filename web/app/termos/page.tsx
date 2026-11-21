import { InstitutionalPlaceholder } from "@/components/institutional-placeholder";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Termos de uso",
  description: "Consulte os termos de uso da B2B Nutris; o texto desta página aguarda revisão e aprovação do responsável.",
  path: "/termos",
  indexable: false,
});

export default function TermsPage() {
  return (
    <InstitutionalPlaceholder
      title="Termos de uso"
      message="O texto dos termos de uso aguarda revisão e aprovação do responsável."
    />
  );
}

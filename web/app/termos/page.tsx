import { InstitutionalPlaceholder } from "@/components/institutional-placeholder";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Termos de uso",
  description: "Termos de uso da B2B Nutris. O texto final aguarda aprovação.",
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

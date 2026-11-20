import { InstitutionalPlaceholder } from "@/components/institutional-placeholder";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Privacidade",
  description: "Informações sobre privacidade na B2B Nutris. O texto final aguarda aprovação.",
  path: "/privacidade",
  indexable: false,
});

export default function PrivacyPage() {
  return (
    <InstitutionalPlaceholder
      title="Privacidade"
      message="O texto da política de privacidade aguarda revisão e aprovação do responsável."
    />
  );
}

import type { Metadata } from "next";
import { InstitutionalPlaceholder } from "@/components/institutional-placeholder";

export const metadata: Metadata = { title: "Privacidade" };

export default function PrivacyPage() {
  return (
    <InstitutionalPlaceholder
      title="Privacidade"
      message="O texto da política de privacidade aguarda revisão e aprovação do responsável."
    />
  );
}

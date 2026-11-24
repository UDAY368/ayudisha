import { LegalPage } from "@/components/sections/LegalPage";
import { terms } from "@/data/legal";
import { site } from "@/config/site";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Terms of Service | AyuDisha",
  description: "The terms for using the AyuDisha website and the scope of the platform.",
  path: "/terms",
  noindex: !site.legal.approved,
});

export default function Page() {
  return <LegalPage doc={terms} href="/terms" draft={true} />;
}

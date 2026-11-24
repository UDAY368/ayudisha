import { LegalPage } from "@/components/sections/LegalPage";
import { privacy } from "@/data/legal";
import { site } from "@/config/site";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Privacy Policy | AyuDisha",
  description: "How AyuDisha handles the personal information you share through enquiry forms.",
  path: "/privacy-policy",
  noindex: !site.legal.approved,
});

export default function Page() {
  return <LegalPage doc={privacy} href="/privacy-policy" draft={true} />;
}

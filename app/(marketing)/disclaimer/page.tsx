import { LegalPage } from "@/components/sections/LegalPage";
import { disclaimer } from "@/data/legal";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Medical Disclaimer | AyuDisha",
  description: "AyuDisha facilitates practitioner discovery and consultation coordination. It is not an emergency service or a source of medical advice.",
  path: "/disclaimer",
  noindex: false,
});

export default function Page() {
  return <LegalPage doc={disclaimer} href="/disclaimer" draft={false} />;
}

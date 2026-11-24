import { Hero } from "@/components/sections/Hero";
import {
  ConcernGrid,
  FinalCTA,
  Principles,
  ProcessSteps,
  ProfilePreview,
  ResourcesAndFaq,
  StoryBand,
  TherapyGrid,
} from "@/components/sections/home";
import { getVisiblePractitioners, toCard } from "@/lib/directory";
import { env } from "@/lib/env";
import { buildMetadata } from "@/lib/metadata";
import { JsonLd, organizationJsonLd, websiteJsonLd } from "@/lib/jsonld";

export const metadata = buildMetadata({
  title: "AyuDisha – Your Path to Natural Wellbeing",
  description:
    "Explore Ayurveda, physiotherapy, naturopathy and chiropractic care. AyuDisha helps you connect with healthcare practitioners and request consultation guidance.",
  path: "/",
});

export default function HomePage() {
  const people = getVisiblePractitioners().map(toCard);
  return (
    <>
      <JsonLd data={organizationJsonLd()} />
      <JsonLd data={websiteJsonLd()} />
      <Hero />
      <ConcernGrid />
      <TherapyGrid />
      <ProcessSteps />
      <ProfilePreview practitioners={people} />
      <Principles />
      <StoryBand />
      <ResourcesAndFaq isDev={env.isDev} />
      <FinalCTA />
    </>
  );
}

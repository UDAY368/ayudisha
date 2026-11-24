import "server-only";
import { practitioners } from "@/data/practitioners";
import { demoPractitioners } from "@/data/demo-practitioners";
import type { Practitioner, PractitionerCard } from "@/data/practitioner-types";
import { env } from "./env";

/** Real, approved profiles — plus fictional demos in development only. */
export function getVisiblePractitioners(): Practitioner[] {
  const real = practitioners.filter((p) => p.isPublished && p.isVerified && !p.isDemo);
  return env.isDev ? [...real, ...demoPractitioners] : real;
}

export function getPractitioner(slug: string): Practitioner | undefined {
  return getVisiblePractitioners().find((p) => p.slug === slug);
}

export function toCard(p: Practitioner): PractitionerCard {
  const { slug, displayName, specialtyIds, qualificationSummary, isDemo, availability, languages, city } = p;
  return { slug, displayName, specialtyIds, qualificationSummary, isDemo, availability, languages, city };
}

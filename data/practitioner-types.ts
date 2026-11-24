import type { TherapySlug } from "./therapies";

export type ConsultationMode = "in-person" | "online" | "home-visit";

export type Practitioner = {
  id: string;
  slug: string;
  displayName: string;
  specialtyIds: TherapySlug[];
  qualificationSummary: string;
  portraitUrl?: string;
  portraitAlt?: string;
  bio: string;
  city?: string;
  languages: string[];
  consultationModes: ConsultationMode[];
  registrationAuthority?: string;
  registrationId?: string;
  verificationStatus: "unverified" | "pending" | "verified";
  availability: "unavailable" | "enquire";
  isDemo: boolean;
  isPublished: boolean;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
};

/** Public-safe subset passed to client components. */
export type PractitionerCard = Pick<
  Practitioner,
  "slug" | "displayName" | "specialtyIds" | "qualificationSummary" | "isDemo" | "availability" | "languages" | "city"
>;

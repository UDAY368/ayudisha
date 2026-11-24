import "server-only";
import type { Practitioner } from "./practitioner-types";

/**
 * FICTIONAL development seed records (spec §10). Not real clinicians.
 * Never published: lib/directory.ts only returns these when NODE_ENV !== "production".
 * No licence numbers, schools, experience, ratings, prices or reviews — on purpose.
 */
export const demoPractitioners: Practitioner[] = [
  {
    id: "demo-ayurveda-01",
    slug: "demo-ayurveda-01",
    displayName: "Ananya Sharma (Demo)",
    specialtyIds: ["ayurveda"],
    qualificationSummary: "BAMS, MD (Ayurveda)",
    bio: "Fictional profile used to preview the layout of a practitioner page. This person does not exist.",
    languages: [],
    consultationModes: [],
    verificationStatus: "unverified",
    availability: "unavailable",
    isDemo: true,
    isPublished: false,
    isVerified: false,
    createdAt: "2026-11-24",
    updatedAt: "2026-11-24",
  },
  {
    id: "demo-physio-02",
    slug: "demo-physio-02",
    displayName: "Arjun Reddy (Demo)",
    specialtyIds: ["physiotherapy"],
    qualificationSummary: "BPT, MPT",
    bio: "Fictional profile used to preview the layout of a practitioner page. This person does not exist.",
    languages: [],
    consultationModes: [],
    verificationStatus: "unverified",
    availability: "unavailable",
    isDemo: true,
    isPublished: false,
    isVerified: false,
    createdAt: "2026-11-24",
    updatedAt: "2026-11-24",
  },
  {
    id: "demo-naturopathy-03",
    slug: "demo-naturopathy-03",
    displayName: "Nandini Rao (Demo)",
    specialtyIds: ["naturopathy"],
    qualificationSummary: "BNYS",
    bio: "Fictional profile used to preview the layout of a practitioner page. This person does not exist.",
    languages: [],
    consultationModes: [],
    verificationStatus: "unverified",
    availability: "unavailable",
    isDemo: true,
    isPublished: false,
    isVerified: false,
    createdAt: "2026-11-24",
    updatedAt: "2026-11-24",
  },
];

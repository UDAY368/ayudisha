import type { Practitioner } from "./practitioner-types";

/**
 * Real practitioner records. Add entries only with the practitioner's written authorisation
 * and after credential verification. Only isPublished && isVerified && !isDemo are shown.
 */
export const practitioners: Practitioner[] = [];

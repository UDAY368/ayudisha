/**
 * Broad, non-sensitive interest categories. Navigation only:
 * there is deliberately no mapping from a concern to a therapy (no automated recommendation).
 */
export type ConcernIcon = "spine" | "joint" | "walk" | "bowl" | "leaf" | "moon" | "sun" | "compass";

export type Concern = { slug: string; title: string; blurb: string; icon: ConcernIcon };

export const concerns: Concern[] = [
  { slug: "back-neck", title: "Back & Neck Concerns", blurb: "Stiffness, posture and everyday discomfort.", icon: "spine" },
  { slug: "joint-muscle", title: "Joint & Muscle Concerns", blurb: "Knees, shoulders, strains and aches.", icon: "joint" },
  { slug: "mobility-rehab", title: "Mobility & Rehabilitation", blurb: "Getting moving after injury or surgery.", icon: "walk" },
  { slug: "lifestyle-nutrition", title: "Lifestyle & Nutrition", blurb: "Food, routine and daily habits.", icon: "bowl" },
  { slug: "digestive", title: "Digestive Wellbeing", blurb: "Talk through digestion with a practitioner.", icon: "leaf" },
  { slug: "stress-sleep", title: "Stress & Sleep", blurb: "Rest, routine and feeling settled.", icon: "moon" },
  { slug: "general", title: "General Wellbeing", blurb: "A broader look at how you feel day to day.", icon: "sun" },
  { slug: "not-sure", title: "Not Sure Where to Begin", blurb: "Talk to our team. We'll help you start.", icon: "compass" },
];

export const concernSlugs = concerns.map((c) => c.slug);

export function getConcern(slug: string | undefined) {
  return concerns.find((c) => c.slug === slug);
}

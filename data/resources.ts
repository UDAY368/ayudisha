export type Resource = {
  slug: string;
  title: string;
  excerpt: string;
  body: { heading: string; paragraphs: string[] }[];
  /** Articles publish only after human clinical review. */
  reviewStatus: "draft" | "reviewed";
  reviewedAt?: string;
  reviewer?: string;
  sources: { label: string; href: string }[];
};

export const resources: Resource[] = [
  {
    slug: "what-to-expect-physiotherapy-consultation",
    title: "What to expect from a physiotherapy consultation",
    excerpt: "How a first appointment usually runs, and what to bring.",
    reviewStatus: "draft",
    sources: [],
    body: [
      {
        heading: "Before you go",
        paragraphs: [
          "Note when the concern started, what makes it better or worse, and any reports or referral letters you already have.",
        ],
      },
      {
        heading: "During the appointment",
        paragraphs: [
          "A physiotherapist usually asks about your history and goals, then looks at how you move. They explain what they found and agree a plan with you.",
        ],
      },
    ],
  },
  {
    slug: "preparing-for-an-ayurveda-consultation",
    title: "Preparing for an Ayurveda consultation",
    excerpt: "Questions worth noting down before you meet a practitioner.",
    reviewStatus: "draft",
    sources: [],
    body: [
      {
        heading: "Bring a full picture",
        paragraphs: [
          "List every medicine and supplement you take, any conditions you are being treated for, and what you hope to get from the consultation.",
        ],
      },
    ],
  },
  {
    slug: "how-to-choose-a-healthcare-practitioner",
    title: "How to choose a healthcare practitioner",
    excerpt: "Qualifications, scope and the questions to ask first.",
    reviewStatus: "draft",
    sources: [],
    body: [
      {
        heading: "Check qualifications and scope",
        paragraphs: [
          "Ask what a practitioner is qualified in, how they are registered where applicable, and what falls outside their scope.",
        ],
      },
    ],
  },
];

export function isResourcePublic(r: Resource, isDev: boolean) {
  return r.reviewStatus === "reviewed" || isDev;
}

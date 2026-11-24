export type TherapySlug = "ayurveda" | "physiotherapy" | "naturopathy" | "chiropractic";

export type Therapy = {
  id: string;
  slug: TherapySlug;
  title: string; // page H1
  name: string; // short display name
  tagline: string; // one-line card summary
  shortDescription: string;
  image: string;
  imageAlt: string;
  overview: string[];
  whoMayExplore: string[];
  whatToExpect: string[];
  limitations: string[];
  faqItems: { q: string; a: string }[];
  relatedSlugs: TherapySlug[];
  /** Clinical copy must be approved by a qualified reviewer before "reviewed". */
  reviewStatus: "pending" | "reviewed";
  reviewedAt?: string;
  seo: { title: string; description: string };
};

export const therapies: Therapy[] = [
  {
    id: "therapy-ayurveda",
    slug: "ayurveda",
    title: "Explore Ayurveda Care",
    name: "Ayurveda",
    tagline: "Traditional approaches and practitioner-led consultation.",
    shortDescription:
      "Discover traditional Indian healthcare approaches and discuss lifestyle and care preferences with an appropriately qualified practitioner.",
    image: "/images/ayurveda-herbs.webp",
    imageAlt: "Bowls of dried roots, seeds and herbs laid out on a table",
    overview: [
      "Ayurveda is a traditional system of healthcare from India. A consultation usually starts with a conversation about your history, routines and what you would like to change.",
      "An Ayurveda practitioner considers your circumstances as a whole and explains which approaches may be appropriate, and which are not, for you.",
    ],
    whoMayExplore: [
      "People who want to understand traditional Indian healthcare approaches",
      "Those interested in discussing daily routine, diet and lifestyle with a practitioner",
      "Anyone who would like a practitioner-led view alongside their existing care",
    ],
    whatToExpect: ["Medical history", "Lifestyle", "Health goals", "Individualised assessment"],
    limitations: [
      "Do not stop or change prescribed medicines because of anything you read here. Discuss any change with your treating clinician.",
      "Tell the practitioner about all medicines and supplements you take.",
      "A practitioner decides what is suitable for you, and may refer you elsewhere.",
    ],
    faqItems: [
      {
        q: "What happens in a first Ayurveda consultation?",
        a: "Usually a conversation about your health history, routines and goals. The practitioner explains what they suggest and why, and what is outside their scope.",
      },
      {
        q: "Can I continue my current treatment?",
        a: "Do not discontinue prescribed care on the basis of website information. Share your current treatment with the practitioner and your treating clinician.",
      },
      {
        q: "Is an Ayurveda practitioner available near me?",
        a: "Availability depends on the practitioner network in your area. Contact the AyuDisha team for current options.",
      },
    ],
    relatedSlugs: ["naturopathy", "physiotherapy"],
    reviewStatus: "pending",
    seo: {
      title: "Ayurveda Practitioners & Consultations | AyuDisha",
      description:
        "Explore Ayurveda, learn what a consultation may involve and contact AyuDisha for practitioner availability.",
    },
  },
  {
    id: "therapy-physiotherapy",
    slug: "physiotherapy",
    title: "Explore Physiotherapy",
    name: "Physiotherapy",
    tagline: "Assessment, movement and rehabilitation.",
    shortDescription:
      "Connect with physiotherapy practitioners for assessment of movement, physical function and rehabilitation needs.",
    image: "/images/physio-studio.webp",
    imageAlt: "Exercise bikes and rehabilitation equipment in a bright treatment room",
    overview: [
      "Physiotherapy is an established healthcare profession focused on movement and physical function. Physiotherapists assess how you move and plan exercise-based rehabilitation with you.",
      "People often see a physiotherapist after an injury or operation, for ongoing joint or muscle concerns, or to return to everyday activity.",
    ],
    whoMayExplore: [
      "People recovering from an injury, surgery or a period of inactivity",
      "Those with movement, joint or muscle concerns who want a professional assessment",
      "Anyone looking for guided exercise towards a rehabilitation goal",
    ],
    whatToExpect: ["Mobility", "Function", "Rehabilitation goals", "Exercise guidance"],
    limitations: [
      "Seek urgent medical help for sudden severe pain, weakness, numbness or loss of bladder or bowel control.",
      "Bring any referral notes or scan reports you already have to the appointment.",
      "The physiotherapist decides what is suitable and may refer you to a doctor.",
    ],
    faqItems: [
      {
        q: "Do I need a referral to see a physiotherapist?",
        a: "It depends on the practitioner and your situation. The AyuDisha team can tell you what a specific practitioner asks for.",
      },
      {
        q: "What should I wear?",
        a: "Comfortable clothing that lets the physiotherapist see and assess the area of concern.",
      },
      {
        q: "Are home visits or online sessions possible?",
        a: "Service modes depend on individual practitioner availability and suitability. Contact us to confirm options.",
      },
    ],
    relatedSlugs: ["chiropractic", "ayurveda"],
    reviewStatus: "pending",
    seo: {
      title: "Physiotherapy & Rehabilitation | AyuDisha",
      description:
        "Explore physiotherapy for movement and rehabilitation needs and request information about available practitioners.",
    },
  },
  {
    id: "therapy-naturopathy",
    slug: "naturopathy",
    title: "Explore Naturopathy",
    name: "Naturopathy",
    tagline: "Lifestyle and wellbeing guidance.",
    shortDescription:
      "Explore practitioner-led lifestyle, nutrition and wellbeing discussions as appropriate to your needs.",
    image: "/images/naturopathy-tea.webp",
    imageAlt: "A cup of herbal tea among dried flowers and leaves on a pale table",
    overview: [
      "Naturopathy focuses on lifestyle: food, sleep, activity and daily habits. A naturopathy consultation is a structured conversation about these areas and the goals you set.",
      "A practitioner can help you think through realistic changes and explain where other professional care is needed.",
    ],
    whoMayExplore: [
      "People who want structured guidance on habits, food and routine",
      "Those interested in a lifestyle-focused conversation about wellbeing goals",
      "Anyone wanting a practitioner's view on small, sustainable changes",
    ],
    whatToExpect: ["Habits", "Nutrition", "Lifestyle", "Wellbeing goals"],
    limitations: [
      "Lifestyle guidance does not replace diagnosis or treatment by a doctor.",
      "Tell the practitioner about any medical condition, pregnancy, medicines or supplements.",
      "Do not begin fasting or restrictive diets without professional advice.",
    ],
    faqItems: [
      {
        q: "What does a naturopathy consultation cover?",
        a: "Typically your daily habits, food, sleep, activity and the goals you want to work towards.",
      },
      {
        q: "Will I be asked to stop my medicines?",
        a: "No one should stop prescribed care on the basis of website information. Discuss any change with your treating clinician.",
      },
      {
        q: "How do I find a naturopathy practitioner?",
        a: "Contact the AyuDisha team and we will explain current practitioner availability.",
      },
    ],
    relatedSlugs: ["ayurveda", "physiotherapy"],
    reviewStatus: "pending",
    seo: {
      title: "Naturopathy & Wellbeing | AyuDisha",
      description:
        "Discover naturopathy consultation options and learn how AyuDisha can help you connect with a practitioner.",
    },
  },
  {
    id: "therapy-chiropractic",
    slug: "chiropractic",
    title: "Explore Chiropractic Care",
    name: "Chiropractic Care",
    tagline: "Musculoskeletal assessment and support.",
    shortDescription:
      "Learn about musculoskeletal consultation and discuss whether the proposed approach is appropriate for your circumstances.",
    image: "/images/chiro-assessment.webp",
    imageAlt: "A practitioner assessing a person's upper back on a treatment table",
    overview: [
      "Chiropractic care focuses on the musculoskeletal system: the spine, joints and muscles. A chiropractor takes a history, assesses movement and discusses options with you.",
      "A good first consultation includes a clear explanation of the proposed approach, its limits, and when another professional should be involved.",
    ],
    whoMayExplore: [
      "People with back, neck or joint concerns who want a musculoskeletal assessment",
      "Those who want to understand whether chiropractic care suits their circumstances",
      "Anyone who prefers to discuss options before deciding",
    ],
    whatToExpect: ["History", "Movement concerns", "Professional assessment", "Suitable options"],
    limitations: [
      "Seek urgent medical help for sudden severe pain, weakness, numbness or loss of bladder or bowel control.",
      "Tell the practitioner about osteoporosis, recent injury, surgery or blood-thinning medicines.",
      "You can ask questions and decline any technique you are not comfortable with.",
    ],
    faqItems: [
      {
        q: "What happens at a chiropractic consultation?",
        a: "A history, a movement assessment and a discussion of options. Ask the practitioner to explain any technique before it is used.",
      },
      {
        q: "Is chiropractic care right for me?",
        a: "Only a qualified practitioner can assess that, after taking your history. They may suggest a different professional.",
      },
      {
        q: "How do I check practitioner availability?",
        a: "Contact the AyuDisha team for current chiropractic practitioner options.",
      },
    ],
    relatedSlugs: ["physiotherapy", "naturopathy"],
    reviewStatus: "pending",
    seo: {
      title: "Explore Chiropractic Care | AyuDisha",
      description: "Learn about chiropractic care and request guidance on available practitioner consultations.",
    },
  },
];

export const therapySlugs = therapies.map((t) => t.slug);

export function getTherapy(slug: string) {
  return therapies.find((t) => t.slug === slug);
}

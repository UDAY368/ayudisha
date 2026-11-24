import { site } from "@/config/site";

export type FaqItem = { id: string; q: string; a: string; group: "About AyuDisha" | "Your care" | "Practical" };

export const faq: FaqItem[] = [
  {
    id: "what-is",
    group: "About AyuDisha",
    q: "What is AyuDisha?",
    a: "AyuDisha is a digital platform that helps people explore holistic and complementary healthcare options and connect with practitioners for consultations.",
  },
  {
    id: "specialties",
    group: "About AyuDisha",
    q: "Which specialties can I explore?",
    a: "Our initial focus includes Ayurveda, physiotherapy, naturopathy and chiropractic care. Contact us for current practitioner availability.",
  },
  {
    id: "not-sure",
    group: "Your care",
    q: "What if I don't know which practitioner I need?",
    a: "You can request guidance from our coordination team. A qualified practitioner can assess your needs and advise on appropriate care or referral.",
  },
  {
    id: "treatment",
    group: "About AyuDisha",
    q: "Does AyuDisha provide treatment directly?",
    a: "AyuDisha facilitates discovery and coordination. Clinical assessment and treatment are undertaken by appropriately qualified practitioners within their respective scope of practice.",
  },
  {
    id: "existing-treatment",
    group: "Your care",
    q: "Can I stop my existing treatment when exploring holistic care?",
    a: "Do not discontinue prescribed care on the basis of website information. Discuss any changes with your treating clinician.",
  },
  {
    id: "online",
    group: "Practical",
    q: "Do you offer online consultations?",
    a: "Service modes depend on individual practitioner availability and the suitability of the consultation. Contact us to confirm available options.",
  },
  {
    id: "cost",
    group: "Practical",
    q: "How much does a consultation cost?",
    a: "Fees depend on the practitioner and service. Ask the team for any applicable fees before confirming an appointment.",
  },
  {
    id: "emergency",
    group: "Your care",
    q: "What if I have an urgent or emergency concern?",
    a: "AyuDisha is not an emergency service. Seek appropriate urgent medical assistance immediately for an emergency.",
  },
  {
    id: "contact",
    group: "Practical",
    q: "How do I contact AyuDisha?",
    a: `Call ${site.contact.phoneDisplay} or email ${site.contact.email}.`,
  },
  {
    id: "join",
    group: "Practical",
    q: "I am a practitioner. How can I join?",
    a: "Submit an interest request through the Join as Practitioner page. The team will explain the review and onboarding process.",
  },
];

export const homeFaqIds = ["what-is", "specialties", "not-sure", "treatment", "emergency"];

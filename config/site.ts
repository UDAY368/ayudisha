/**
 * The single source of truth for AyuDisha's public business details.
 * Phone, email and social links must not be repeated anywhere else in the codebase.
 */
export type NavItem = { label: string; href: string };

const phoneE164 = "+916302385910";

export const site = {
  name: "AyuDisha",
  wordmark: "AYUDISHA",
  telugu: "ఆయుదిశ",
  hindi: "आयुदिशा",
  tagline: "Your Path to Natural Wellbeing.",
  motto: "One platform. Many paths to wellbeing.",
  locale: "en_IN",
  category: "Digital holistic healthcare discovery and care-navigation platform",

  contact: {
    phoneDisplay: "+91 63023 85910",
    phoneHref: `tel:${phoneE164}`,
    email: "ayudishaservices@gmail.com",
    emailHref: "mailto:ayudishaservices@gmail.com",
  },

  social: {
    instagram: { label: "Instagram", handle: "@ayudishaservices", href: "https://www.instagram.com/ayudishaservices/" },
    facebook: { label: "Facebook", handle: "AyuDisha", href: "https://www.facebook.com/profile.php?id=61596925258577" },
  },

  /** Rendered only when ENABLE_WHATSAPP=true. Generic text only — never symptoms or personal data. */
  whatsappHref:
    "https://wa.me/916302385910?text=Hello%20AyuDisha%2C%20I%20would%20like%20to%20know%20more%20about%20your%20services.",

  /** India's single emergency number. Owner to confirm wording before launch. */
  emergency: { number: "112", href: "tel:112", label: "Call 112 (national emergency number)" },

  /** Not supplied by the owner. Left undefined on purpose: never publish guessed values. */
  optional: {
    legalName: undefined as string | undefined,
    address: undefined as string | undefined,
    hours: undefined as string | undefined,
  },

  /** Approved PNG assets. Leave undefined to use the interim SVG emblem. */
  brand: {
    logoSrc: undefined as string | undefined, // e.g. "/brand/ayudisha-logo.png"
    iconSrc: undefined as string | undefined, // e.g. "/brand/ayudisha-icon.png"
  },

  legal: {
    approved: false,
    consentVersion: "2026-11-draft",
  },

  nav: [
    { label: "Home", href: "/" },
    { label: "Find Care", href: "/find-care" },
    { label: "Therapies", href: "/therapies" },
    { label: "Practitioners", href: "/practitioners" },
    { label: "About Us", href: "/about" },
  ] satisfies NavItem[],

  primaryCta: { label: "Connect with AyuDisha", href: "/consultation" },

  disclaimer:
    "AyuDisha facilitates practitioner discovery and consultation coordination. Clinical advice and treatment decisions are made by qualified practitioners. For emergencies, seek urgent medical assistance.",
} as const;

export const footerGroups: { title: string; links: NavItem[] }[] = [
  {
    title: "Care",
    links: [
      { label: "Ayurveda", href: "/therapies/ayurveda" },
      { label: "Physiotherapy", href: "/therapies/physiotherapy" },
      { label: "Naturopathy", href: "/therapies/naturopathy" },
      { label: "Chiropractic Care", href: "/therapies/chiropractic" },
      { label: "Find Care", href: "/find-care" },
    ],
  },
  {
    title: "AyuDisha",
    links: [
      { label: "Practitioners", href: "/practitioners" },
      { label: "About Us", href: "/about" },
      { label: "Join as Practitioner", href: "/join-practitioner" },
      { label: "Resources", href: "/resources" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Help",
    links: [
      { label: "FAQ", href: "/faq" },
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms", href: "/terms" },
      { label: "Disclaimer", href: "/disclaimer" },
    ],
  },
];

/** Photo credits for illustrative stand-in photographs (Wikimedia Commons). */
export const photoCredits = [
  { by: "Vis M", licence: "CC BY-SA 4.0", page: "https://commons.wikimedia.org/wiki/File:Ayurvedic_herbs_02.jpg" },
  { by: "EDWIN010", licence: "CC0", page: "https://commons.wikimedia.org/wiki/File:Herbal-tea-for-daily-support.jpg" },
  {
    by: "Happi Raphael",
    licence: "CC BY-SA 4.0",
    page: "https://commons.wikimedia.org/wiki/File:Appareils_de_R%C3%A9%C3%A9ducation_-_Kin%C3%A9sith%C3%A9rapie_Hopital_Laquinitinie_Cameroun_02.jpg",
  },
  { by: "Michael Dorausch", licence: "CC BY-SA 2.0", page: "https://commons.wikimedia.org/wiki/File:Chiropractic_spinal_adjustment.jpg" },
  { by: "Ajay Suresh", licence: "CC BY 2.0", page: "https://commons.wikimedia.org/wiki/File:Indian_Spices_(49696133942).jpg" },
];

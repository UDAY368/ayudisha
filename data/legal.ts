import { site } from "@/config/site";

/**
 * DRAFT legal text for owner and legal review. Not a compliance determination.
 * Bracketed items must be completed with the operator's real details before launch.
 */
export type LegalDoc = { title: string; intro: string; sections: { heading: string; body: string[] }[] };

const operator = site.optional.legalName ?? "[Operator legal name — to be confirmed by owner]";
const address = site.optional.address ?? "[Registered address — to be confirmed by owner]";

export const privacy: LegalDoc = {
  title: "Privacy Policy",
  intro: `This policy explains how ${site.name} handles the personal information you share through this website.`,
  sections: [
    { heading: "Who we are", body: [`${site.name} is operated by ${operator}, ${address}. Contact: ${site.contact.email}, ${site.contact.phoneDisplay}.`] },
    {
      heading: "What we collect",
      body: [
        "When you send an enquiry we collect your name, phone number, and optionally your email address, preferred specialty and city. Practitioner enquiries also include your discipline and an optional short qualification summary.",
        "We do not ask for medical history, diagnoses, documents, government ID or payment details through this website. Please do not send them.",
      ],
    },
    {
      heading: "Why we use it",
      body: ["To contact you about the enquiry you made, using the contact method you chose. We do not use enquiry data for marketing unless you separately agree."],
    },
    {
      heading: "Sharing",
      body: ["[To be confirmed by owner: whether and how enquiry details are shared with practitioners, and with which service providers (hosting, database, email).]"],
    },
    { heading: "Retention", body: ["[To be confirmed by owner: how long enquiries are kept and how they are deleted.]"] },
    {
      heading: "Your choices",
      body: [`You can ask us to access, correct or delete your enquiry details by contacting ${site.contact.email}.`],
    },
    {
      heading: "Analytics and cookies",
      body: ["This website does not use advertising trackers. Health-related selections are never sent to analytics or advertising platforms."],
    },
  ],
};

export const terms: LegalDoc = {
  title: "Terms of Service",
  intro: `These terms describe how you may use the ${site.name} website and what the platform does and does not provide.`,
  sections: [
    { heading: "The service", body: [`${site.name} helps people explore holistic and complementary healthcare disciplines and request contact from our coordination team. A consultation request is not a confirmed appointment.`] },
    { heading: "Not medical advice", body: ["Information on this website is general and educational. It is not a diagnosis, prescription or treatment plan. Clinical decisions are made by qualified practitioners."] },
    { heading: "Not for emergencies", body: [`${site.name} is not an emergency service. In an emergency call ${site.emergency.number} or go to the nearest hospital.`] },
    { heading: "Practitioners", body: ["Practitioners are independent professionals responsible for their own clinical care. [Owner to confirm the contractual relationship and verification process.]"] },
    { heading: "Fees", body: ["Any fees are set by the practitioner or service and are confirmed with you before an appointment. No payments are taken on this website."] },
    { heading: "Operator", body: [`${operator}, ${address}.`] },
  ],
};

export const disclaimer: LegalDoc = {
  title: "Medical Disclaimer",
  intro: site.disclaimer,
  sections: [
    {
      heading: "General information only",
      body: ["Content on this website is general information to help you understand care options. It is not a substitute for professional assessment, diagnosis or treatment."],
    },
    {
      heading: "Your existing treatment",
      body: ["Do not stop, change or delay prescribed treatment because of anything you read here. Discuss any change with your treating clinician."],
    },
    {
      heading: "Emergencies",
      body: [`${site.name} is not an emergency service. If you or someone else is in immediate danger or has a medical emergency, call ${site.emergency.number} or go to the nearest hospital emergency department.`],
    },
    {
      heading: "Disciplines and outcomes",
      body: [
        "No discipline is suitable for every person or condition, and no outcome is guaranteed. A qualified practitioner decides what is appropriate for you and may refer you elsewhere.",
        "Business registration of the platform does not itself authorise the provision of clinical treatment.",
      ],
    },
    {
      heading: "Imagery",
      body: ["Photographs on this website are illustrative. They do not show AyuDisha practitioners, patients or treatment results."],
    },
  ],
};

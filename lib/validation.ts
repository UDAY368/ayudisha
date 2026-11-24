import { z } from "zod";

/** Shared by client (inline errors) and server (authoritative validation). */

export const specialtyOptions = ["ayurveda", "physiotherapy", "naturopathy", "chiropractic", "unsure"] as const;
export const disciplineOptions = ["ayurveda", "physiotherapy", "naturopathy", "chiropractic", "other"] as const;
export const countryCodes = ["+91", "+1", "+44", "+61", "+65", "+971"] as const;

/** Normalise a phone number to E.164-like form. Returns null if implausible. */
export function normalisePhone(countryCode: string, raw: string): string | null {
  let digits = raw.replace(/[\s\-().]/g, "");
  if (digits.startsWith("+")) {
    digits = digits.slice(1);
    return /^\d{8,15}$/.test(digits) ? `+${digits}` : null;
  }
  if (!/^\d+$/.test(digits)) return null;
  const cc = countryCode.replace("+", "");
  if (cc === "91") {
    digits = digits.replace(/^0+/, "");
    if (digits.length === 12 && digits.startsWith("91")) digits = digits.slice(2);
    return /^[6-9]\d{9}$/.test(digits) ? `+91${digits}` : null;
  }
  digits = digits.replace(/^0+/, "");
  const full = cc + digits;
  return /^\d{8,15}$/.test(full) ? `+${full}` : null;
}

const name = z
  .string()
  .trim()
  .min(2, "Please enter your full name (at least 2 characters).")
  .max(100, "Please keep your name under 100 characters.");

const email = z
  .string()
  .trim()
  .max(254, "Please enter a shorter email address.")
  .refine((v) => v === "" || z.email().safeParse(v).success, "Please enter a valid email address, like name@example.com.");

const city = z.string().trim().max(60, "Please enter just your city name.");

const consent = z.literal(true, { error: "Please confirm we may contact you about this enquiry." });

const phoneFields = {
  countryCode: z.enum(countryCodes),
  phone: z
    .string()
    .trim()
    .min(1, "Please enter your phone number.")
    .max(24, "That phone number looks too long.")
    .refine(
      (v) => {
        const d = v.replace(/\D/g, "");
        return /^[+\d\s\-().]+$/.test(v) && d.length >= 8 && d.length <= 15;
      },
      "Please enter a valid phone number, for example 98765 43210."
    ),
};

const meta = {
  idempotencyKey: z.string().uuid().optional(),
  company_website: z.string().max(200).optional(), // honeypot
  startedAt: z.number().optional(),
};

export const consultationSchema = z
  .object({
    name,
    ...phoneFields,
    email,
    specialty: z.enum(specialtyOptions).or(z.literal("")),
    contactPreference: z.enum(["phone", "email"], { error: "Please choose how we should contact you." }),
    city,
    consent,
    source: z.enum(["consultation", "contact", "find-care"]).optional(),
    ...meta,
  })
  .strict()
  .superRefine((v, ctx) => {
    if (!normalisePhone(v.countryCode, v.phone)) {
      ctx.addIssue({ code: "custom", path: ["phone"], message: "Please enter a valid phone number, for example 98765 43210." });
    }
    if (v.contactPreference === "email" && !v.email) {
      ctx.addIssue({ code: "custom", path: ["email"], message: "Add an email address, or choose phone as your contact method." });
    }
  });

export const practitionerSchema = z
  .object({
    name,
    ...phoneFields,
    email: z.string().trim().min(1, "Please enter your email address.").pipe(email),
    discipline: z.enum(disciplineOptions, { error: "Please choose your discipline." }),
    qualificationSummary: z.string().trim().max(200, "Please keep this under 200 characters."),
    city,
    consent,
    ...meta,
  })
  .strict()
  .superRefine((v, ctx) => {
    if (!normalisePhone(v.countryCode, v.phone)) {
      ctx.addIssue({ code: "custom", path: ["phone"], message: "Please enter a valid phone number, for example 98765 43210." });
    }
  });

export type ConsultationInput = z.infer<typeof consultationSchema>;
export type PractitionerInput = z.infer<typeof practitionerSchema>;

export function fieldErrors(error: z.ZodError): Record<string, string> {
  const out: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? "form");
    if (!out[key]) out[key] = issue.message;
  }
  return out;
}

"use client";
import { disciplineOptions, practitionerSchema } from "@/lib/validation";
import type { FormMode } from "@/lib/storage/types";
import { ConsentField, describedBy, Field, Honeypot, PhoneField } from "./fields";
import { ErrorSummary, ModeBanner, SubmitFeedback } from "./FormStatus";
import { useEnquiryForm } from "./useEnquiryForm";

const labels: Record<(typeof disciplineOptions)[number], string> = {
  ayurveda: "Ayurveda",
  physiotherapy: "Physiotherapy",
  naturopathy: "Naturopathy",
  chiropractic: "Chiropractic",
  other: "Other complementary discipline",
};

type Values = {
  name: string;
  countryCode: string;
  phone: string;
  email: string;
  discipline: string;
  qualificationSummary: string;
  city: string;
  consent: boolean;
};

export function PractitionerEnquiryForm({ mode }: { mode: FormMode }) {
  const f = useEnquiryForm<Values>({
    initial: { name: "", countryCode: "+91", phone: "", email: "", discipline: "", qualificationSummary: "", city: "", consent: false },
    schema: practitionerSchema,
    endpoint: "/api/practitioner-enquiries",
    order: ["name", "email", "phone", "discipline", "qualificationSummary", "city", "consent"],
  });
  const { values: v, errors: e } = f;
  const disabled = mode === "disabled";

  return (
    <form onSubmit={f.submit} noValidate className="flex flex-col gap-6">
      <ModeBanner mode={mode} />
      <ErrorSummary items={f.summary} refEl={f.summaryRef} />
      <fieldset disabled={disabled} className="flex flex-col gap-6 disabled:opacity-70">
        <legend className="sr-only">Your professional details</legend>
        <Field id="name" label="Full name" error={e.name}>
          <input id="name" className="input" autoComplete="name" value={v.name} onChange={(x) => f.set("name", x.target.value)} onBlur={() => f.blur("name")} aria-invalid={e.name ? true : undefined} aria-describedby={describedBy("name", e.name)} required />
        </Field>
        <Field id="email" label="Email" error={e.email}>
          <input id="email" type="email" inputMode="email" autoComplete="email" className="input" value={v.email} onChange={(x) => f.set("email", x.target.value)} onBlur={() => f.blur("email")} aria-invalid={e.email ? true : undefined} aria-describedby={describedBy("email", e.email)} required />
        </Field>
        <PhoneField values={v} error={e.phone} onChange={(k, val) => f.set(k, val)} onBlur={() => f.blur("phone")} />
        <div className="grid gap-6 sm:grid-cols-2">
          <Field id="discipline" label="Discipline" error={e.discipline}>
            <select id="discipline" className="input" value={v.discipline} onChange={(x) => f.set("discipline", x.target.value)} onBlur={() => f.blur("discipline")} aria-invalid={e.discipline ? true : undefined} aria-describedby={describedBy("discipline", e.discipline)} required>
              <option value="">Choose one</option>
              {disciplineOptions.map((d) => (
                <option key={d} value={d}>
                  {labels[d]}
                </option>
              ))}
            </select>
          </Field>
          <Field id="city" label="City" optional error={e.city}>
            <input id="city" className="input" autoComplete="address-level2" value={v.city} onChange={(x) => f.set("city", x.target.value)} onBlur={() => f.blur("city")} aria-invalid={e.city ? true : undefined} aria-describedby={describedBy("city", e.city)} />
          </Field>
        </div>
        <Field id="qualificationSummary" label="Qualifications in brief" optional hint="For example: BAMS, BPT, MPT. No documents needed at this stage." error={e.qualificationSummary}>
          <input id="qualificationSummary" className="input" maxLength={200} value={v.qualificationSummary} onChange={(x) => f.set("qualificationSummary", x.target.value)} onBlur={() => f.blur("qualificationSummary")} aria-invalid={e.qualificationSummary ? true : undefined} aria-describedby={describedBy("qualificationSummary", e.qualificationSummary, true)} />
        </Field>
        <ConsentField checked={v.consent} error={e.consent} onChange={(c) => f.set("consent", c)} />
        <Honeypot value={f.honeypot} onChange={f.setHoneypot} />
      </fieldset>
      <SubmitFeedback state={f.state} />
      <div>
        <button type="submit" className="btn btn-primary" disabled={disabled || f.state === "sending"} aria-busy={f.state === "sending"}>
          {f.state === "sending" ? "Sending…" : disabled ? "Online requests coming soon" : "Submit my interest"}
        </button>
      </div>
    </form>
  );
}

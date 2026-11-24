"use client";
import { consultationSchema, specialtyOptions } from "@/lib/validation";
import type { FormMode } from "@/lib/storage/types";
import { ConsentField, describedBy, Field, Honeypot, PhoneField } from "./fields";
import { ErrorSummary, ModeBanner, SubmitFeedback } from "./FormStatus";
import { useEnquiryForm } from "./useEnquiryForm";

const specialtyLabels: Record<(typeof specialtyOptions)[number], string> = {
  ayurveda: "Ayurveda",
  physiotherapy: "Physiotherapy",
  naturopathy: "Naturopathy",
  chiropractic: "Chiropractic Care",
  unsure: "Unsure — I'd like guidance",
};

type Values = {
  name: string;
  countryCode: string;
  phone: string;
  email: string;
  specialty: string;
  contactPreference: string;
  city: string;
  consent: boolean;
  source: "consultation" | "contact" | "find-care";
};

export function ConsultationForm({
  mode,
  defaultSpecialty = "",
  source = "consultation",
  submitLabel = "Send my request",
}: {
  mode: FormMode;
  defaultSpecialty?: string;
  source?: Values["source"];
  submitLabel?: string;
}) {
  const f = useEnquiryForm<Values>({
    initial: {
      name: "",
      countryCode: "+91",
      phone: "",
      email: "",
      specialty: (specialtyOptions as readonly string[]).includes(defaultSpecialty) ? defaultSpecialty : "",
      contactPreference: "phone",
      city: "",
      consent: false,
      source,
    },
    schema: consultationSchema,
    endpoint: "/api/enquiries",
    order: ["name", "phone", "email", "specialty", "contactPreference", "city", "consent"],
  });
  const { values: v, errors: e } = f;
  const disabled = mode === "disabled";

  return (
    <form onSubmit={f.submit} noValidate className="relative flex flex-col gap-6" aria-describedby="form-note">
      <ModeBanner mode={mode} />
      <ErrorSummary items={f.summary} refEl={f.summaryRef} />
      <fieldset disabled={disabled} className="flex flex-col gap-6 disabled:opacity-70">
        <legend className="sr-only">Your details</legend>
        <Field id="name" label="Full name" error={e.name}>
          <input
            id="name"
            name="name"
            className="input"
            autoComplete="name"
            value={v.name}
            onChange={(x) => f.set("name", x.target.value)}
            onBlur={() => f.blur("name")}
            aria-invalid={e.name ? true : undefined}
            aria-describedby={describedBy("name", e.name)}
            required
          />
        </Field>
        <PhoneField values={v} error={e.phone} onChange={(k, val) => f.set(k, val)} onBlur={() => f.blur("phone")} />
        <Field id="email" label="Email" optional={v.contactPreference !== "email"} error={e.email}>
          <input
            id="email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            className="input"
            value={v.email}
            onChange={(x) => f.set("email", x.target.value)}
            onBlur={() => f.blur("email")}
            aria-invalid={e.email ? true : undefined}
            aria-describedby={describedBy("email", e.email)}
          />
        </Field>
        <div className="grid gap-6 sm:grid-cols-2">
          <Field id="specialty" label="Preferred specialty" optional error={e.specialty}>
            <select id="specialty" name="specialty" className="input" value={v.specialty} onChange={(x) => f.set("specialty", x.target.value)}>
              <option value="">No preference</option>
              {specialtyOptions.map((s) => (
                <option key={s} value={s}>
                  {specialtyLabels[s]}
                </option>
              ))}
            </select>
          </Field>
          <Field id="city" label="City" optional hint="Your city only. No address needed." error={e.city}>
            <input
              id="city"
              name="city"
              className="input"
              autoComplete="address-level2"
              value={v.city}
              onChange={(x) => f.set("city", x.target.value)}
              onBlur={() => f.blur("city")}
              aria-invalid={e.city ? true : undefined}
              aria-describedby={describedBy("city", e.city, true)}
            />
          </Field>
        </div>
        <fieldset>
          <legend className="field-label">How should we contact you?</legend>
          <div className="grid gap-3 sm:grid-cols-2">
            {(["phone", "email"] as const).map((m) => (
              <label key={m} className="choice">
                <input type="radio" name="contactPreference" value={m} checked={v.contactPreference === m} onChange={() => f.set("contactPreference", m)} />
                <span className="font-semibold">{m === "phone" ? "By phone" : "By email"}</span>
              </label>
            ))}
          </div>
          {e.contactPreference && <p className="field-error">{e.contactPreference}</p>}
        </fieldset>
        <ConsentField checked={v.consent} error={e.consent} onChange={(c) => f.set("consent", c)} />
        <Honeypot value={f.honeypot} onChange={f.setHoneypot} />
      </fieldset>

      <SubmitFeedback state={f.state} />

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <button type="submit" className="btn btn-primary" disabled={disabled || f.state === "sending"} aria-busy={f.state === "sending"}>
          {f.state === "sending" ? "Sending…" : disabled ? "Online requests coming soon" : submitLabel}
        </button>
        <p id="form-note" className="text-sm text-muted">
          Please don&apos;t include medical details. A request is not a confirmed appointment.
        </p>
      </div>
    </form>
  );
}

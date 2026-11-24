"use client";
import Link from "next/link";
import { countryCodes } from "@/lib/validation";

export type Errors = Record<string, string | undefined>;

export function Field({
  id,
  label,
  hint,
  error,
  optional,
  children,
}: {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="field-label">
        {label} {optional && <span className="font-normal text-muted">(optional)</span>}
      </label>
      {children}
      {hint && !error && (
        <p id={`${id}-hint`} className="field-hint">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="field-error">
          {error}
        </p>
      )}
    </div>
  );
}

export const describedBy = (id: string, error?: string, hint?: boolean) =>
  error ? `${id}-error` : hint ? `${id}-hint` : undefined;

export function PhoneField({
  values,
  error,
  onChange,
  onBlur,
}: {
  values: { countryCode: string; phone: string };
  error?: string;
  onChange: (k: "countryCode" | "phone", v: string) => void;
  onBlur: () => void;
}) {
  return (
    <div>
      <label htmlFor="phone" className="field-label">
        Phone
      </label>
      <div className="flex gap-2">
        <label htmlFor="countryCode" className="sr-only">
          Country code
        </label>
        <select
          id="countryCode"
          name="countryCode"
          className="input w-[104px] flex-none"
          value={values.countryCode}
          onChange={(e) => onChange("countryCode", e.target.value)}
          autoComplete="tel-country-code"
        >
          {countryCodes.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <input
          id="phone"
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel-national"
          className="input"
          value={values.phone}
          onChange={(e) => onChange("phone", e.target.value)}
          onBlur={onBlur}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy("phone", error, true)}
          required
        />
      </div>
      {!error && (
        <p id="phone-hint" className="field-hint">
          We use this only to contact you about this enquiry.
        </p>
      )}
      {error && (
        <p id="phone-error" className="field-error">
          {error}
        </p>
      )}
    </div>
  );
}

export function ConsentField({ checked, error, onChange }: { checked: boolean; error?: string; onChange: (v: boolean) => void }) {
  return (
    <div>
      <label className="choice items-start">
        <input
          type="checkbox"
          name="consent"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? "consent-error" : undefined}
          className="mt-1"
          id="consent"
          required
        />
        <span className="text-[0.95rem] leading-relaxed">
          I agree that AyuDisha may contact me about this enquiry using the details above. Read the{" "}
          <Link href="/privacy-policy" className="font-semibold text-forest underline">
            Privacy Policy
          </Link>
          .
        </span>
      </label>
      {error && (
        <p id="consent-error" className="field-error">
          {error}
        </p>
      )}
    </div>
  );
}

/** Off-screen honeypot. Real users never see or fill it. */
export function Honeypot({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div aria-hidden="true" style={{ position: "absolute", left: "-10000px", width: 1, height: 1, overflow: "hidden" }}>
      <label htmlFor="company_website">Company website</label>
      <input id="company_website" name="company_website" tabIndex={-1} autoComplete="off" value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}

"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { site } from "@/config/site";
import type { Concern } from "@/data/concerns";
import { Icon } from "@/components/ui/Icon";

type TherapyLite = { slug: string; name: string; shortDescription: string; available: number };
type Step = "interest" | "preference" | "specialty" | "guidance" | "emergency";

export function FindCareWizard({
  concerns,
  therapies,
  initialInterest,
}: {
  concerns: Concern[];
  therapies: TherapyLite[];
  initialInterest?: string;
}) {
  const [step, setStep] = useState<Step>(initialInterest ? (initialInterest === "not-sure" ? "guidance" : "preference") : "interest");
  const [history, setHistory] = useState<Step[]>([]);
  const [interest, setInterest] = useState<string | undefined>(initialInterest);
  const [specialty, setSpecialty] = useState<string | undefined>();
  const headingRef = useRef<HTMLHeadingElement>(null);
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    headingRef.current?.focus();
  }, [step]);

  useEffect(() => {
    const url = new URL(window.location.href);
    if (interest) url.searchParams.set("interest", interest);
    else url.searchParams.delete("interest");
    window.history.replaceState(null, "", url.toString());
  }, [interest]);

  const go = (s: Step) => {
    setHistory((h) => [...h, step]);
    setStep(s);
  };
  const back = () => {
    setHistory((h) => {
      const prev = h[h.length - 1] ?? "interest";
      setStep(prev);
      return h.slice(0, -1);
    });
  };

  const concern = concerns.find((c) => c.slug === interest);
  const chosen = therapies.find((t) => t.slug === specialty);
  const stepNo = step === "interest" ? 1 : step === "preference" ? 2 : 3;

  if (step === "emergency") {
    return (
      <div role="alert" className="rounded-[var(--radius-panel)] border border-[#e8c3b9] bg-[#fbeeea] p-8 md:p-12">
        <Icon name="alert" size={36} className="text-danger" />
        <h2 ref={headingRef} tabIndex={-1} className="t-h2 mt-6 outline-none" style={{ color: "#6b2416" }}>
          Please get urgent help now.
        </h2>
        <p className="mt-4 max-w-xl text-lg text-[#6b2416]">
          AyuDisha is not an emergency service and cannot help in an emergency. Call the national emergency number or go to
          the nearest hospital emergency department.
        </p>
        <a href={site.emergency.href} className="btn mt-8 bg-danger text-white hover:bg-[#6e2418]">
          <Icon name="phone" size={20} /> {site.emergency.label}
        </a>
        <p className="mt-10">
          <button type="button" onClick={back} className="link-u min-h-11 cursor-pointer">
            This isn&apos;t an emergency. Go back
          </button>
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-10 flex flex-col gap-4 rounded-2xl border border-[#e8c3b9] bg-[#fbeeea] px-5 py-4 text-[#6b2416] sm:flex-row sm:items-center sm:justify-between">
        <p className="flex gap-3 text-[0.95rem]">
          <Icon name="alert" size={20} className="mt-0.5 flex-none" />
          <span>
            <strong>Not for emergencies.</strong> This guide helps you navigate options. It does not diagnose or recommend
            treatment.
          </span>
        </p>
        <button type="button" onClick={() => go("emergency")} className="btn btn-sm flex-none border border-[#c98f80] bg-white text-[#6b2416] hover:bg-[#fff6f3]">
          I need urgent help
        </button>
      </div>

      <div className="mb-8 flex items-center justify-between gap-4">
        <p className="text-sm font-bold uppercase tracking-[0.16em] text-muted" aria-live="polite">
          Step {stepNo} of 3
        </p>
        <div className="flex gap-1.5" aria-hidden="true">
          {[1, 2, 3].map((n) => (
            <span key={n} className={`h-1 w-10 rounded-full ${n <= stepNo ? "bg-forest" : "bg-line"}`} />
          ))}
        </div>
      </div>

      {step === "interest" && (
        <fieldset>
          <legend>
            <h2 ref={headingRef} tabIndex={-1} className="t-h2 outline-none">
              What would you like to explore?
            </h2>
          </legend>
          <p className="mt-3 text-muted">Choose a broad area. You can change it at any time.</p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {concerns.map((c) => (
              <label key={c.slug} className="choice min-h-[72px]">
                <input
                  type="radio"
                  name="interest"
                  value={c.slug}
                  checked={interest === c.slug}
                  onChange={() => setInterest(c.slug)}
                />
                <span className="grid h-10 w-10 flex-none place-items-center rounded-full bg-sage-wash text-forest">
                  <Icon name={c.icon} size={20} />
                </span>
                <span>
                  <span className="block font-semibold">{c.title}</span>
                  <span className="block text-sm text-muted">{c.blurb}</span>
                </span>
              </label>
            ))}
          </div>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <button
              type="button"
              className="btn btn-primary"
              disabled={!interest}
              onClick={() => go(interest === "not-sure" ? "guidance" : "preference")}
            >
              Continue <Icon name="arrow" size={18} className="btn-arrow" />
            </button>
            <button type="button" className="link-u min-h-11 cursor-pointer self-start sm:self-center" onClick={() => go("guidance")}>
              Skip — just contact the team
            </button>
          </div>
        </fieldset>
      )}

      {step === "preference" && (
        <div>
          <h2 ref={headingRef} tabIndex={-1} className="t-h2 outline-none">
            How would you like to continue?
          </h2>
          {concern && (
            <p className="mt-3 text-muted">
              You chose <strong className="text-forest">{concern.title}</strong>.
            </p>
          )}
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <button type="button" onClick={() => go("specialty")} className="card card-link cursor-pointer p-7 text-left">
              <Icon name="compass" size={28} className="text-forest" />
              <span className="t-h3 mt-6 block text-forest-deep">I&apos;d like to explore a specialty</span>
              <span className="mt-2 block text-muted">Read about the four disciplines and pick one to ask about.</span>
            </button>
            <button type="button" onClick={() => go("guidance")} className="card card-link cursor-pointer p-7 text-left">
              <Icon name="connect" size={28} className="text-forest" />
              <span className="t-h3 mt-6 block text-forest-deep">I&apos;d like guidance from the team</span>
              <span className="mt-2 block text-muted">Talk to a person who can explain your options.</span>
            </button>
          </div>
          <BackButton onClick={back} />
        </div>
      )}

      {step === "specialty" && (
        <div>
          <h2 ref={headingRef} tabIndex={-1} className="t-h2 outline-none">
            Which specialty would you like to ask about?
          </h2>
          <p className="mt-3 text-muted">
            These are shown in the same order for everyone. AyuDisha does not match concerns to treatments; a qualified
            practitioner advises what is appropriate.
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2" role="radiogroup" aria-label="Specialty">
            {therapies.map((t) => (
              <label key={t.slug} className="choice items-start">
                <input type="radio" name="specialty" value={t.slug} checked={specialty === t.slug} onChange={() => setSpecialty(t.slug)} className="mt-1" />
                <span>
                  <span className="block font-semibold">{t.name}</span>
                  <span className="mt-1 block text-sm text-muted">{t.shortDescription}</span>
                </span>
              </label>
            ))}
          </div>

          {chosen && (
            <div className="card mt-8 p-7" aria-live="polite">
              <h3 className="t-h3">{chosen.name}</h3>
              <p className="mt-2 text-muted">
                {chosen.available > 0
                  ? `${chosen.available} profile${chosen.available === 1 ? "" : "s"} listed. Our team confirms current availability with you.`
                  : "Practitioners for this specialty are still being added. Our team can tell you about current options."}
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Link href={`/consultation?specialty=${chosen.slug}`} className="btn btn-primary">
                  Request a Consultation <Icon name="arrow" size={18} className="btn-arrow" />
                </Link>
                <Link href={`/therapies/${chosen.slug}`} className="btn btn-secondary">
                  Read about {chosen.name}
                </Link>
                {chosen.available > 0 && (
                  <Link href={`/practitioners?specialty=${chosen.slug}`} className="btn btn-secondary">
                    View profiles
                  </Link>
                )}
              </div>
            </div>
          )}
          <BackButton onClick={back} />
        </div>
      )}

      {step === "guidance" && (
        <div>
          <h2 ref={headingRef} tabIndex={-1} className="t-h2 outline-none">
            Talk to our coordination team.
          </h2>
          <p className="t-lead mt-4 prose-measure">
            You don&apos;t need to know which specialty to choose. Share how to reach you, or contact us directly, and a member
            of the team will help you understand your options.
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <Link href="/consultation?specialty=unsure" className="card card-link p-7 no-underline">
              <Icon name="connect" size={26} className="text-forest" />
              <span className="mt-5 block font-semibold text-forest-deep">Request a call back</span>
              <span className="mt-1 block text-sm text-muted">Short form, no medical details.</span>
            </Link>
            <a href={site.contact.phoneHref} className="card card-link p-7 no-underline">
              <Icon name="phone" size={26} className="text-forest" />
              <span className="mt-5 block font-semibold text-forest-deep">Call {site.contact.phoneDisplay}</span>
              <span className="mt-1 block text-sm text-muted">Speak to the team.</span>
            </a>
            <a href={site.contact.emailHref} className="card card-link p-7 no-underline">
              <Icon name="mail" size={26} className="text-forest" />
              <span className="mt-5 block break-all font-semibold text-forest-deep">{site.contact.email}</span>
              <span className="mt-1 block text-sm text-muted">Write to us.</span>
            </a>
          </div>
          <BackButton onClick={back} />
        </div>
      )}
    </div>
  );
}

function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className="mt-10 inline-flex min-h-11 cursor-pointer items-center gap-2 font-semibold text-forest hover:underline">
      <Icon name="arrow" size={18} className="rotate-180" /> Back
    </button>
  );
}

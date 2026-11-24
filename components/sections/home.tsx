import Link from "next/link";
import { site } from "@/config/site";
import { concerns } from "@/data/concerns";
import { therapies } from "@/data/therapies";
import { faq, homeFaqIds } from "@/data/faq";
import { resources } from "@/data/resources";
import type { PractitionerCard as PCard } from "@/data/practitioner-types";
import { Icon } from "../ui/Icon";
import { Accordion, ButtonLink, EmptyState, SectionHeading } from "../ui/primitives";
import { DishaLine } from "../ui/DishaLine";
import { PractitionerCard, TherapyCard } from "./cards";

export function ConcernGrid() {
  return (
    <section className="section" aria-labelledby="concerns-title">
      <div className="wrap">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            id="concerns-title"
            folio="01"
            eyebrow="Discover"
            title="Start with what matters to you."
            lede="You don't need to know which specialty to choose. Explore a health concern or talk to our team."
          />
          <Link href="/find-care" className="link-u self-start lg:self-end">
            Open the Find Care guide
          </Link>
        </div>
        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {concerns.map((c) => {
            const special = c.slug === "not-sure";
            return (
              <li key={c.slug}>
                <Link
                  href={`/find-care?interest=${c.slug}`}
                  className={`card-link group flex h-full min-h-[184px] flex-col justify-between rounded-[var(--radius-card)] border p-6 no-underline ${
                    special ? "on-dark border-forest bg-forest" : "border-line bg-surface"
                  }`}
                >
                  <span
                    className={`inline-flex h-12 w-12 items-center justify-center rounded-full ${
                      special ? "bg-ivory/10 text-gold" : "bg-sage-wash text-forest"
                    }`}
                  >
                    <Icon name={c.icon} size={24} />
                  </span>
                  <span className="mt-8 block">
                    <span className={`block font-display text-[1.45rem] leading-tight ${special ? "text-ivory" : "text-forest-deep"}`}>
                      {c.title}
                    </span>
                    <span className={`mt-1.5 flex items-end justify-between gap-3 text-sm ${special ? "text-ivory/75" : "text-muted"}`}>
                      {c.blurb}
                      <Icon name="arrow" size={18} className="flex-none transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

export function TherapyGrid() {
  return (
    <section className="section bg-linen-band" aria-labelledby="therapies-title">
      <div className="wrap">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            id="therapies-title"
            folio="02"
            eyebrow="Specialties"
            title="Whole-person care. More possibilities."
            lede="Explore our holistic care network."
          />
          <Link href="/consultation" className="link-u self-start lg:self-end">
            Ask about other care options
          </Link>
        </div>
        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {therapies.map((t) => (
            <li key={t.slug}>
              <TherapyCard therapy={t} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

const steps = [
  { title: "Share your concern", body: "Select a broad interest or simply request guidance from our team." },
  { title: "Explore your options", body: "Understand the services and the suitable practitioners available." },
  { title: "Connect with a practitioner", body: "Request an appointment or speak with the coordination team." },
];

export function ProcessSteps({ folio = "03", withCta = true }: { folio?: string; withCta?: boolean }) {
  return (
    <section className="section on-dark relative overflow-hidden" aria-labelledby="process-title">
      <div className="wrap relative">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading id="process-title" folio={folio} eyebrow="How it works" title="Your next step starts here." />
          {withCta && (
            <ButtonLink href={site.primaryCta.href} variant="on-dark" arrow className="self-start lg:self-end">
              {site.primaryCta.label}
            </ButtonLink>
          )}
        </div>
        <div className="relative mt-16">
          <DishaLine
            className="absolute left-9 top-[16px] hidden h-10 w-[calc((100%+2.5rem)*2/3)] md:block"
            viewBox="0 0 1000 40"
            d="M0 20C120 20 140 4 260 4S420 36 520 36 720 4 840 4 960 20 1000 20"
          />
          <ol className="relative grid gap-12 md:grid-cols-3 md:gap-10">{/* circles sit on the line */}
            {steps.map((s, i) => (
              <li key={s.title} className="flex flex-col">
                <span className="grid h-[72px] w-[72px] place-items-center rounded-full border border-gold/60 bg-forest font-display text-3xl italic text-gold">
                  {i + 1}
                </span>
                <h3 className="t-h3 mt-8">{s.title}</h3>
                <p className="mt-3 max-w-xs text-ivory/80">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

export function ProfilePreview({ practitioners }: { practitioners: PCard[] }) {
  return (
    <section className="section" aria-labelledby="people-title">
      <div className="wrap">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading id="people-title" folio="04" eyebrow="Practitioners" title="Meet the people behind your care." />
          <Link href="/practitioners" className="link-u self-start lg:self-end">
            Browse practitioners
          </Link>
        </div>
        <div className="mt-14">
          {practitioners.length > 0 ? (
            <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {practitioners.slice(0, 3).map((p) => (
                <li key={p.slug}>
                  <PractitionerCard p={p} />
                </li>
              ))}
            </ul>
          ) : (
            <EmptyState
              title="Our practitioner network is being prepared."
              actions={
                <ButtonLink href="/consultation" arrow>
                  Request a Consultation
                </ButtonLink>
              }
            >
              Contact us to learn about available care options.
            </EmptyState>
          )}
        </div>
      </div>
    </section>
  );
}

const principles = [
  { title: "One place to explore care", body: "Four disciplines, explained plainly, in one place." },
  { title: "Clear practitioner information", body: "Qualifications and scope shown only once checked." },
  { title: "Simple consultation coordination", body: "One enquiry, and a person from our team follows up." },
  { title: "Respect for individual needs", body: "Your preferences shape the options we discuss." },
];

export function Principles() {
  return (
    <section className="section" aria-labelledby="why-title">
      <div className="wrap grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionHeading
            id="why-title"
            folio="05"
            eyebrow="Why AyuDisha"
            title="Guidance that begins with you."
            lede="These are the commitments we hold ourselves to as the network grows."
          />
        </div>
        <ul className="grid border-t border-line sm:grid-cols-2 lg:col-span-7">
          {principles.map((p, i) => (
            <li
              key={p.title}
              className={`border-b border-line py-8 sm:px-8 ${i % 2 === 0 ? "sm:border-r sm:pl-0" : "sm:pr-0"}`}
            >
              <span className="font-display text-xl italic text-gold-ink">0{i + 1}</span>
              <h3 className="t-h3 mt-3">{p.title}</h3>
              <p className="mt-2 text-muted">{p.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function StoryBand() {
  return (
    <section className="section bg-linen-band relative overflow-hidden" aria-labelledby="story-title">
      <div className="wrap grid items-center gap-12 lg:grid-cols-12">
        <div className="relative lg:col-span-6" aria-hidden="true">
          <div className="relative mx-auto flex aspect-square max-w-[460px] flex-col items-center justify-center text-center">
            <DishaLine className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet" d="M74 9.5A44 44 0 1 1 30 8.8" />
            <span className="font-display text-[clamp(4.5rem,10vw,7.5rem)] leading-[0.9] text-forest-deep">Ayu</span>
            <span className="mt-5 text-xs font-bold uppercase tracking-[0.3em] text-gold-ink">life</span>
            <span className="my-4 h-10 w-px bg-gold" />
            <span className="font-display text-[clamp(4.5rem,10vw,7.5rem)] italic leading-[0.9] text-forest">Disha</span>
            <span className="mt-1 text-xs font-bold uppercase tracking-[0.3em] text-gold-ink">direction</span>
          </div>
        </div>
        <div className="lg:col-span-6">
          <SectionHeading
            id="story-title"
            folio="06"
            eyebrow="Our story"
            title="Rooted in care. Guided by purpose."
            lede="AyuDisha combines the meaning of Ayu — life — and Disha — direction. We are building an easier way for people to discover holistic healthcare disciplines, learn about their options and seek appropriate professional guidance."
          />
          <div className="mt-9">
            <ButtonLink href="/about" variant="secondary" arrow>
              Our Story
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ResourcesAndFaq({ isDev }: { isDev: boolean }) {
  const items = faq.filter((f) => homeFaqIds.includes(f.id));
  return (
    <section className="section" aria-labelledby="learn-title">
      <div className="wrap grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionHeading id="learn-title" folio="07" eyebrow="Learn" title="Questions, answered plainly." />
          <ul className="mt-10 flex flex-col gap-3">
            {resources.map((r) => {
              const linked = r.reviewStatus === "reviewed" || isDev;
              const inner = (
                <>
                  <span>
                    <span className="block font-display text-[1.3rem] leading-snug text-forest-deep">{r.title}</span>
                    <span className="mt-1 block text-sm text-muted">
                      {r.reviewStatus === "reviewed" ? r.excerpt : "In clinical review · publishing soon"}
                    </span>
                  </span>
                  {linked && <Icon name="arrow" size={18} className="mt-1.5 flex-none text-forest" />}
                </>
              );
              return (
                <li key={r.slug}>
                  {linked ? (
                    <Link href={`/resources/${r.slug}`} className="card card-link flex items-start justify-between gap-4 p-5 no-underline">
                      {inner}
                    </Link>
                  ) : (
                    <div className="card flex items-start justify-between gap-4 p-5">{inner}</div>
                  )}
                </li>
              );
            })}
          </ul>
          <Link href="/resources" className="link-u mt-8 inline-block">
            Visit resources
          </Link>
        </div>
        <div className="lg:col-span-7">
          <h3 className="sr-only">Frequently asked questions</h3>
          <Accordion name="home-faq" items={items.map((f) => ({ id: f.id, q: f.q, a: <p>{f.a}</p> }))} />
          <Link href="/faq" className="link-u mt-8 inline-block">
            Read all FAQs
          </Link>
        </div>
      </div>
    </section>
  );
}

export function FinalCTA({
  title = "Find the right direction for your wellbeing.",
  body = "Speak with our team to explore practitioner and consultation options.",
}: {
  title?: string;
  body?: string;
}) {
  return (
    <section className="on-dark relative overflow-hidden" aria-labelledby="cta-title">
      <div className="wrap relative grid gap-10 py-24 md:py-32 lg:grid-cols-12 lg:items-center">
        <DishaLine
          className="absolute -right-24 top-1/2 hidden h-[520px] w-[520px] -translate-y-1/2 opacity-70 lg:block"
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid meet"
          d="M74 9.5A44 44 0 1 1 30 8.8"
        />
        <div className="relative lg:col-span-8">
          <h2 id="cta-title" className="t-h2 max-w-2xl" style={{ fontSize: "clamp(2.25rem, 1.4rem + 3.4vw, 4rem)" }}>
            {title}
          </h2>
          <p className="mt-5 max-w-xl text-lg text-ivory/80">{body}</p>
        </div>
        <div className="relative flex flex-col gap-3 sm:flex-row lg:col-span-4 lg:flex-col lg:items-start">
          <ButtonLink href="/consultation" variant="on-dark" arrow>
            Request a Consultation
          </ButtonLink>
          <ButtonLink href={site.contact.phoneHref} variant="outline-light" icon="phone">
            {`Call ${site.contact.phoneDisplay}`}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}

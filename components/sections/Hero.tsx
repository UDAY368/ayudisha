import Image from "next/image";
import { site } from "@/config/site";
import { therapies } from "@/data/therapies";
import { ButtonLink } from "../ui/primitives";
import { DishaLine } from "../ui/DishaLine";

export function Hero() {
  return (
    <section className="relative overflow-hidden" aria-labelledby="hero-title">
      {/* soft sun wash */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 right-[-10%] h-[640px] w-[640px] rounded-full opacity-70"
        style={{ background: "radial-gradient(closest-side, #f1e6cc, rgba(250,248,242,0))" }}
      />
      <div className="wrap relative grid items-center gap-12 pb-16 pt-10 md:pt-14 lg:min-h-[min(calc(100svh-76px),780px)] lg:grid-cols-12 lg:gap-8 lg:pb-20 lg:pt-8">
        <div className="lg:col-span-6 xl:col-span-6" data-enter>
          <p className="eyebrow">Holistic care. Human connection.</p>
          <h1 id="hero-title" className="t-display mt-6">
            A new direction for your <em className="font-display italic text-forest">wellbeing.</em>
          </h1>
          <p className="t-lead prose-measure mt-6">
            AyuDisha connects you with qualified healthcare practitioners across Ayurveda, physiotherapy, naturopathy and
            chiropractic care. Discover care options, understand your next step and connect for a consultation.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/find-care" arrow>
              Find My Care
            </ButtonLink>
            <ButtonLink href="/therapies" variant="secondary">
              Explore Therapies
            </ButtonLink>
          </div>
          <ul className="mt-10 flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold text-muted" aria-label="Specialties">
            {therapies.map((t, i) => (
              <li key={t.slug} className="flex items-center gap-5">
                {i > 0 && <span aria-hidden="true" className="h-1 w-1 rounded-full bg-gold" />}
                {t.name}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative lg:col-span-6 lg:col-start-7 xl:col-span-5 xl:col-start-8">
          <div className="relative mx-auto max-w-[520px]" data-enter-img>
            {/* open gold arc peeking behind the shoulder */}
            <svg aria-hidden="true" viewBox="0 0 200 200" className="absolute -left-[12%] -top-[6%] w-[124%] max-w-none">
              <path d="M150 22A90 90 0 1 1 74 14" fill="none" stroke="#C4A36B" strokeWidth="0.6" />
            </svg>
            <div className="arch relative aspect-[4/5] w-full bg-linen">
              <Image
                src="/images/spices.webp"
                alt="Steel bowls of turmeric, cumin and other ground spices, seen from above"
                fill
                priority
                sizes="(min-width: 1024px) 520px, 90vw"
                className="object-cover"
              />
              <span className="arch-keyline" aria-hidden="true" />
            </div>
            {/* name meaning card */}
            <div className="card absolute -bottom-8 left-0 w-[250px] p-5 shadow-[0_24px_48px_-28px_rgba(25,56,45,0.45)] sm:-left-8">
              <p className="font-display text-[1.65rem] leading-none text-forest-deep">
                Ayu <span className="text-gold-ink">+</span> Disha
              </p>
              <p className="mt-2 text-sm leading-snug text-muted">Life and direction.<br /><span lang="te">{site.telugu}</span> · <span lang="hi">{site.hindi}</span></p>
            </div>
          </div>
        </div>
      </div>
      <DishaLine
        className="absolute bottom-0 left-1/2 hidden h-24 w-px -translate-x-1/2 lg:block"
        viewBox="0 0 2 100"
        d="M1 0V100"
      />
    </section>
  );
}

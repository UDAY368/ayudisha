import Image from "next/image";
import { notFound } from "next/navigation";
import { getTherapy, therapies, type TherapySlug } from "@/data/therapies";
import { PageHero } from "@/components/sections/PageHero";
import { FinalCTA } from "@/components/sections/home";
import { PractitionerCard, TherapyCard } from "@/components/sections/cards";
import { Accordion, ButtonLink, EmptyState } from "@/components/ui/primitives";
import { Icon } from "@/components/ui/Icon";
import { getVisiblePractitioners, toCard } from "@/lib/directory";
import { buildMetadata } from "@/lib/metadata";
import { site } from "@/config/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return therapies.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: PageProps<"/therapies/[slug]">) {
  const { slug } = await params;
  const t = getTherapy(slug);
  if (!t) return {};
  return buildMetadata({ title: t.seo.title, description: t.seo.description, path: `/therapies/${t.slug}` });
}

export default async function TherapyPage({ params }: PageProps<"/therapies/[slug]">) {
  const { slug } = await params;
  const t = getTherapy(slug);
  if (!t) notFound();

  const people = getVisiblePractitioners()
    .filter((p) => p.specialtyIds.includes(t.slug as TherapySlug))
    .map(toCard);
  const related = t.relatedSlugs.map((s) => getTherapy(s)!).filter(Boolean);

  return (
    <>
      <PageHero
        crumbs={[
          { label: "Therapies", href: "/therapies" },
          { label: t.name, href: `/therapies/${t.slug}` },
        ]}
        eyebrow={t.name}
        title={t.title}
        lede={t.shortDescription}
        aside={
          <div className="arch relative mx-auto aspect-[4/5] w-full max-w-[420px] bg-linen" data-enter-img>
            <Image src={t.image} alt={t.imageAlt} fill priority sizes="(min-width: 1024px) 420px, 90vw" className="object-cover" />
            <span className="arch-keyline" />
          </div>
        }
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <ButtonLink href={`/consultation?specialty=${t.slug}`} arrow>
            Request a Consultation
          </ButtonLink>
          <ButtonLink href={site.contact.phoneHref} variant="secondary" icon="phone">
            Call the team
          </ButtonLink>
        </div>
      </PageHero>

      <section className="section" aria-labelledby="overview-title">
        <div className="wrap grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="folio">
              <span className="folio-num">01</span>
              <span className="folio-rule" />
              <span className="eyebrow">Overview</span>
            </p>
            <h2 id="overview-title" className="t-h2 mt-6">
              What is {t.name.toLowerCase().replace("care", "").trim()}?
            </h2>
          </div>
          <div className="flex flex-col gap-5 text-[1.075rem] lg:col-span-7 lg:col-start-6">
            {t.overview.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-linen-band" aria-label="Who and what to expect">
        <div className="wrap grid gap-6 md:grid-cols-2">
          <div className="card p-8 md:p-10">
            <p className="eyebrow">02 · Who may explore it</p>
            <h2 className="t-h3 mt-4">Who may wish to explore a consultation</h2>
            <ul className="mt-6 flex flex-col gap-4">
              {t.whoMayExplore.map((w) => (
                <li key={w} className="flex gap-3">
                  <Icon name="check" size={20} className="mt-1 flex-none text-forest" />
                  <span>{w}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="card p-8 md:p-10">
            <p className="eyebrow">03 · What to expect</p>
            <h2 className="t-h3 mt-4">A consultation may discuss</h2>
            <ul className="mt-6 grid grid-cols-2 gap-3">
              {t.whatToExpect.map((w) => (
                <li key={w} className="rounded-2xl border border-line bg-sage-wash px-4 py-4 font-semibold text-forest">
                  {w}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-muted">These are topics, not promises of a particular treatment or outcome.</p>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="safety-title">
        <div className="wrap grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="folio">
              <span className="folio-num">04</span>
              <span className="folio-rule" />
              <span className="eyebrow">Safety</span>
            </p>
            <h2 id="safety-title" className="t-h2 mt-6">
              Important to know
            </h2>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <ul className="flex flex-col border-t border-line">
              {t.limitations.map((l) => (
                <li key={l} className="flex gap-4 border-b border-line py-5">
                  <Icon name="alert" size={20} className="mt-1 flex-none text-gold-ink" />
                  <span>{l}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-muted">
              AyuDisha is not an emergency service. In an emergency, call{" "}
              <a href={site.emergency.href} className="font-semibold text-forest">
                {site.emergency.number}
              </a>
              .
            </p>
          </div>
        </div>
      </section>

      <section className="section bg-linen-band" aria-labelledby="avail-title">
        <div className="wrap">
          <h2 id="avail-title" className="t-h2">
            Practitioner availability
          </h2>
          <div className="mt-10">
            {people.length ? (
              <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {people.map((p) => (
                  <li key={p.slug}>
                    <PractitionerCard p={p} />
                  </li>
                ))}
              </ul>
            ) : (
              <EmptyState
                title={`${t.name} practitioners are being added to the network.`}
                actions={
                  <ButtonLink href={`/consultation?specialty=${t.slug}`} arrow>
                    Ask about availability
                  </ButtonLink>
                }
              >
                Contact us and our team will explain current options.
              </EmptyState>
            )}
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="tfaq-title">
        <div className="wrap grid gap-12 lg:grid-cols-12">
          <h2 id="tfaq-title" className="t-h2 lg:col-span-4">
            Questions about {t.name.toLowerCase()}
          </h2>
          <div className="lg:col-span-7 lg:col-start-6">
            <Accordion name={`faq-${t.slug}`} items={t.faqItems.map((f, i) => ({ id: String(i), q: f.q, a: <p>{f.a}</p> }))} />
            {t.reviewStatus === "reviewed" && t.reviewedAt && (
              <p className="mt-6 text-sm text-muted">Last reviewed {t.reviewedAt}</p>
            )}
          </div>
        </div>
      </section>

      <section className="section-tight bg-linen-band" aria-labelledby="related-title">
        <div className="wrap">
          <h2 id="related-title" className="t-h3">
            Related specialties
          </h2>
          <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:max-w-3xl">
            {related.map((r) => (
              <li key={r.slug}>
                <TherapyCard therapy={r} />
              </li>
            ))}
          </ul>
        </div>
      </section>
      <FinalCTA />
    </>
  );
}

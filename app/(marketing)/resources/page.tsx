import Link from "next/link";
import { PageHero } from "@/components/sections/PageHero";
import { FinalCTA } from "@/components/sections/home";
import { Icon } from "@/components/ui/Icon";
import { resources } from "@/data/resources";
import { env } from "@/lib/env";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Resources | AyuDisha",
  description: "Practical guidance on preparing for a consultation and understanding holistic healthcare disciplines.",
  path: "/resources",
});

const questions = [
  "What is your qualification, and are you registered where applicable?",
  "What does a first consultation involve, and how long does it take?",
  "What are the fees, and what do they include?",
  "What is outside your scope, and when would you refer me elsewhere?",
  "Is it safe to combine this with my current treatment?",
];

export default function ResourcesPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Resources", href: "/resources" }]}
        eyebrow="Resources"
        title="Understand your options before you choose."
        lede="General, practical information about navigating consultations. It is not medical advice and does not replace a qualified practitioner."
      />
      <section className="section" aria-labelledby="ask-title">
        <div className="wrap grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 id="ask-title" className="t-h2">
              Five questions to ask any practitioner
            </h2>
            <p className="mt-5 text-muted">Useful for every discipline, and a good way to judge whether someone is right for you.</p>
          </div>
          <ol className="flex flex-col border-t border-line lg:col-span-7 lg:col-start-6">
            {questions.map((q, i) => (
              <li key={q} className="flex gap-5 border-b border-line py-6">
                <span className="font-display text-2xl italic text-gold-ink">0{i + 1}</span>
                <span className="pt-1 text-[1.075rem]">{q}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section bg-linen-band" aria-labelledby="articles-title">
        <div className="wrap">
          <h2 id="articles-title" className="t-h2">
            Articles
          </h2>
          <ul className="mt-12 grid gap-5 md:grid-cols-3">
            {resources.map((r) => {
              const linked = r.reviewStatus === "reviewed" || env.isDev;
              const body = (
                <>
                  <span className={`badge ${r.reviewStatus === "reviewed" ? "" : "badge-demo"}`}>
                    {r.reviewStatus === "reviewed" ? "Clinically reviewed" : env.isDev ? "Draft · dev preview" : "In review"}
                  </span>
                  <h3 className="t-h3 mt-6">{r.title}</h3>
                  <p className="mt-2 flex-1 text-muted">{r.excerpt}</p>
                  {linked && (
                    <span className="mt-6 inline-flex items-center gap-2 font-semibold text-forest">
                      Read <Icon name="arrow" size={18} />
                    </span>
                  )}
                </>
              );
              return (
                <li key={r.slug}>
                  {linked ? (
                    <Link href={`/resources/${r.slug}`} className="card card-link flex h-full flex-col p-7 no-underline">
                      {body}
                    </Link>
                  ) : (
                    <div className="card flex h-full flex-col p-7">{body}</div>
                  )}
                </li>
              );
            })}
          </ul>
          <div className="mt-14 max-w-3xl">
            <h3 className="t-h3">Our review policy</h3>
            <p className="mt-3 text-muted">
              Health articles are published only after review by an appropriately qualified clinician. Each published article
              shows its reviewer, review date and sources. If you spot something inaccurate, please tell us and we will
              correct it.
            </p>
          </div>
        </div>
      </section>
      <FinalCTA />
    </>
  );
}

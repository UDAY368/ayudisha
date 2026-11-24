import { PageHero } from "@/components/sections/PageHero";
import { FinalCTA } from "@/components/sections/home";
import { Accordion } from "@/components/ui/primitives";
import { faq } from "@/data/faq";
import { faqJsonLd, JsonLd } from "@/lib/jsonld";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Frequently Asked Questions | AyuDisha",
  description: "Answers about AyuDisha, the specialties you can explore, consultations, fees and how to contact the team.",
  path: "/faq",
});

const groups = ["About AyuDisha", "Your care", "Practical"] as const;

export default function FaqPage() {
  return (
    <>
      <JsonLd data={faqJsonLd(faq)} />
      <PageHero crumbs={[{ label: "FAQ", href: "/faq" }]} eyebrow="Help" title="Frequently asked questions" lede="If your question isn't here, our team is happy to help." />
      <section className="section">
        <div className="wrap flex flex-col gap-16">
          {groups.map((g) => (
            <div key={g} className="grid gap-8 lg:grid-cols-12">
              <h2 className="t-h3 lg:col-span-3">{g}</h2>
              <div className="lg:col-span-8 lg:col-start-5">
                <Accordion name={`faq-${g}`} items={faq.filter((f) => f.group === g).map((f) => ({ id: f.id, q: f.q, a: <p>{f.a}</p> }))} />
              </div>
            </div>
          ))}
        </div>
      </section>
      <FinalCTA />
    </>
  );
}

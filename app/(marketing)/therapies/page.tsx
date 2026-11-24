import Image from "next/image";
import Link from "next/link";
import { therapies } from "@/data/therapies";
import { PageHero } from "@/components/sections/PageHero";
import { FinalCTA } from "@/components/sections/home";
import { Notice } from "@/components/ui/primitives";
import { Icon } from "@/components/ui/Icon";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Explore Holistic Healthcare Services | AyuDisha",
  description:
    "Learn about Ayurveda, physiotherapy, naturopathy and chiropractic care and discover available practitioner options.",
  path: "/therapies",
});

export default function TherapiesPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Therapies", href: "/therapies" }]}
        eyebrow="Our specialties"
        title="Four disciplines. One place to begin."
        lede="AyuDisha's initial network focuses on Ayurveda, physiotherapy, naturopathy and chiropractic care. Read what each involves, then speak to our team about current practitioner availability."
      />
      <section className="section" aria-label="Specialties">
        <div className="wrap flex flex-col gap-20 md:gap-28">
          {therapies.map((t, i) => (
            <article key={t.slug} className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
              <Link
                href={`/therapies/${t.slug}`}
                tabIndex={-1}
                aria-hidden="true"
                className={`group block lg:col-span-5 ${i % 2 ? "lg:order-2 lg:col-start-8" : ""}`}
              >
                <div className="arch relative aspect-[4/5] max-h-[560px] w-full bg-linen">
                  <Image src={t.image} alt="" fill sizes="(min-width: 1024px) 480px, 90vw" className="zoom-img object-cover group-hover:scale-[1.03]" />
                  <span className="arch-keyline" />
                </div>
              </Link>
              <div className={`lg:col-span-6 ${i % 2 ? "lg:order-1 lg:col-start-1" : "lg:col-start-7"}`}>
                <p className="folio">
                  <span className="folio-num">0{i + 1}</span>
                  <span className="folio-rule" />
                  <span className="eyebrow">{t.tagline.replace(/\.$/, "")}</span>
                </p>
                <h2 className="t-h2 mt-6">{t.name}</h2>
                <p className="t-lead mt-5 prose-measure">{t.shortDescription}</p>
                <p className="mt-8 text-sm font-bold uppercase tracking-[0.14em] text-muted">Consultations may cover</p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {t.whatToExpect.map((w) => (
                    <li key={w} className="badge">
                      {w}
                    </li>
                  ))}
                </ul>
                <Link href={`/therapies/${t.slug}`} className="btn btn-secondary mt-9">
                  {t.title} <Icon name="arrow" size={18} className="btn-arrow" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section className="pb-20">
        <div className="wrap max-w-4xl">
          <Notice title="About these pages">
            This is general information, not medical advice. A qualified practitioner decides what is appropriate for you.
            Other disciplines such as yoga therapy, Siddha or Unani will be listed only once practitioners are confirmed.
          </Notice>
        </div>
      </section>
      <FinalCTA />
    </>
  );
}

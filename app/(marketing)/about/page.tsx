import { site } from "@/config/site";
import { PageHero } from "@/components/sections/PageHero";
import { FinalCTA, ProcessSteps } from "@/components/sections/home";
import { DishaLine } from "@/components/ui/DishaLine";
import { JsonLd, organizationJsonLd, websiteJsonLd } from "@/lib/jsonld";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "About AyuDisha | Our Vision and Mission",
  description:
    "Learn about AyuDisha's vision to make discovery of holistic healthcare and practitioner guidance more accessible.",
  path: "/about",
});

const values = [
  { title: "Trust", body: "Accurate information and transparent practitioner credentials." },
  { title: "Compassion", body: "We acknowledge people's individual needs and preferences." },
  { title: "Accessibility", body: "Simple navigation, readable language and mobile-first access." },
  { title: "Choice", body: "Helping people understand the available disciplines and their limitations." },
  { title: "Responsibility", body: "Supporting appropriate clinical referrals and avoiding misleading health claims." },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd data={organizationJsonLd()} />
      <JsonLd data={websiteJsonLd()} />
      <PageHero
        crumbs={[{ label: "About Us", href: "/about" }]}
        eyebrow="About AyuDisha"
        title={
          <>
            Life, and the <em className="italic text-forest">direction</em> to care for it.
          </>
        }
        lede="AyuDisha is a digital platform for discovering holistic and complementary healthcare in India, and for connecting with qualified practitioners for a consultation."
      />

      <section className="section" aria-labelledby="name-title">
        <div className="wrap grid items-center gap-14 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <p className="eyebrow">The name</p>
            <h2 id="name-title" className="t-h2 mt-5">
              Ayu means life. Disha means direction.
            </h2>
            <p className="t-lead mt-6 prose-measure">
              Together they describe what we do: offering guidance on each person&apos;s journey towards wellbeing.
            </p>
            <dl className="mt-10 grid grid-cols-3 gap-6 border-t border-line pt-6">
              <div>
                <dt className="text-xs font-bold uppercase tracking-[0.16em] text-muted">English</dt>
                <dd className="mt-2 font-display text-2xl text-forest-deep">AyuDisha</dd>
              </div>
              <div>
                <dt className="text-xs font-bold uppercase tracking-[0.16em] text-muted">Telugu</dt>
                <dd lang="te" className="mt-2 text-2xl text-forest-deep">
                  {site.telugu}
                </dd>
              </div>
              <div>
                <dt className="text-xs font-bold uppercase tracking-[0.16em] text-muted">Hindi</dt>
                <dd lang="hi" className="mt-2 text-2xl text-forest-deep">
                  {site.hindi}
                </dd>
              </div>
            </dl>
          </div>
          <div className="relative lg:col-span-5 lg:col-start-8">
            <div className="on-dark arch relative flex aspect-[4/5] flex-col items-center justify-center p-10 text-center">
              <DishaLine className="absolute inset-0 h-full w-full" viewBox="0 0 100 125" preserveAspectRatio="xMidYMid meet" d="M70 20A34 34 0 1 1 34 16" />
              <p className="eyebrow relative">Our motto</p>
              <p className="relative mt-6 font-display text-[clamp(2rem,1.4rem+2vw,2.75rem)] leading-tight text-ivory">
                One platform.
                <br />
                <em className="italic text-sage">Many paths</em> to wellbeing.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-linen-band" aria-label="Vision and mission">
        <div className="wrap grid gap-6 md:grid-cols-2">
          <article className="card p-8 md:p-12">
            <p className="eyebrow">Vision</p>
            <p className="mt-6 font-display text-[clamp(1.5rem,1.2rem+1vw,2rem)] leading-snug text-forest-deep">
              To make it easier for people to discover and access qualified practitioners across holistic and complementary
              healthcare disciplines, creating a trusted starting point for personalised care and wellbeing.
            </p>
          </article>
          <article className="card p-8 md:p-12">
            <p className="eyebrow">Mission</p>
            <p className="mt-6 font-display text-[clamp(1.5rem,1.2rem+1vw,2rem)] leading-snug text-forest-deep">
              To connect people seeking Ayurveda, physiotherapy, chiropractic care, naturopathy and other suitable
              complementary services with qualified practitioners through a simple journey: discover, understand, connect
              and consult.
            </p>
          </article>
        </div>
      </section>

      <section className="section" aria-labelledby="values-title">
        <div className="wrap">
          <h2 id="values-title" className="t-h2 max-w-2xl">
            What we stand by
          </h2>
          <ul className="mt-14 grid gap-px overflow-hidden rounded-[var(--radius-card)] border border-line bg-line sm:grid-cols-2 lg:grid-cols-5">
            {values.map((v, i) => (
              <li key={v.title} className="bg-surface p-7">
                <span className="font-display text-xl italic text-gold-ink">0{i + 1}</span>
                <h3 className="t-h3 mt-4">{v.title}</h3>
                <p className="mt-2 text-[0.95rem] text-muted">{v.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <ProcessSteps folio="—" />

      <section className="section" aria-labelledby="scope-title">
        <div className="wrap grid gap-12 lg:grid-cols-12">
          <h2 id="scope-title" className="t-h2 lg:col-span-4">
            What AyuDisha is, and isn&apos;t
          </h2>
          <div className="flex flex-col gap-5 text-[1.075rem] lg:col-span-7 lg:col-start-6">
            <p>
              AyuDisha is a discovery and coordination platform for holistic, traditional and complementary care. We help you
              explore disciplines, understand your options and connect with practitioners.
            </p>
            <p>
              We are not a replacement for emergency services, medical diagnosis or necessary conventional medical care.
              Clinical assessment and treatment decisions are made by qualified practitioners within their scope of practice.
              Physiotherapy is an established healthcare discipline, and we present every discipline with its limits.
            </p>
            <p>Please do not stop prescribed treatment on the basis of anything you read here.</p>
          </div>
        </div>
      </section>
      <FinalCTA />
    </>
  );
}

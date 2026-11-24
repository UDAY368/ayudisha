import type { LegalDoc } from "@/data/legal";
import { site } from "@/config/site";
import { Notice } from "../ui/primitives";
import { PageHero } from "./PageHero";

const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export function LegalPage({ doc, href, draft = true }: { doc: LegalDoc; href: string; draft?: boolean }) {
  return (
    <>
      <PageHero crumbs={[{ label: doc.title, href }]} eyebrow="Legal" title={doc.title} lede={doc.intro} />
      <section className="section">
        <div className="wrap grid gap-12 lg:grid-cols-12">
          <nav aria-label="On this page" className="lg:col-span-3">
            <div className="lg:sticky lg:top-28">
              <p className="eyebrow">On this page</p>
              <ul className="mt-4 flex flex-col">
                {doc.sections.map((s) => (
                  <li key={s.heading}>
                    <a href={`#${slugify(s.heading)}`} className="inline-flex min-h-10 items-center text-[0.95rem] text-muted no-underline hover:text-forest">
                      {s.heading}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
          <div className="lg:col-span-8 lg:col-start-5">
            {draft && !site.legal.approved && (
              <div className="mb-12">
                <Notice tone="warning" title="Draft pending owner and legal review">
                  This text is a working draft. Bracketed items will be completed with the operator&apos;s confirmed details
                  before public launch.
                </Notice>
              </div>
            )}
            {doc.sections.map((s) => (
              <section key={s.heading} id={slugify(s.heading)} className="mb-12 scroll-mt-28">
                <h2 className="t-h3">{s.heading}</h2>
                {s.body.map((p) => (
                  <p key={p} className="mt-4 max-w-[68ch] text-[1.05rem]">
                    {p}
                  </p>
                ))}
              </section>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

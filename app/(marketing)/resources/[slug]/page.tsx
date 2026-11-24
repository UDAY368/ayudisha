import { notFound } from "next/navigation";
import { PageHero } from "@/components/sections/PageHero";
import { FinalCTA } from "@/components/sections/home";
import { Notice } from "@/components/ui/primitives";
import { isResourcePublic, resources } from "@/data/resources";
import { env } from "@/lib/env";
import { buildMetadata } from "@/lib/metadata";

export const dynamicParams = false;

export function generateStaticParams() {
  return resources.filter((r) => isResourcePublic(r, env.isDev)).map((r) => ({ slug: r.slug }));
}

function get(slug: string) {
  const r = resources.find((x) => x.slug === slug);
  return r && isResourcePublic(r, env.isDev) ? r : undefined;
}

export async function generateMetadata({ params }: PageProps<"/resources/[slug]">) {
  const r = get((await params).slug);
  if (!r) return {};
  return buildMetadata({ title: `${r.title} | AyuDisha`, description: r.excerpt, path: `/resources/${r.slug}`, noindex: r.reviewStatus !== "reviewed" });
}

export default async function ResourcePage({ params }: PageProps<"/resources/[slug]">) {
  const r = get((await params).slug);
  if (!r) notFound();
  return (
    <>
      <PageHero
        crumbs={[
          { label: "Resources", href: "/resources" },
          { label: r.title, href: `/resources/${r.slug}` },
        ]}
        eyebrow="Resource"
        title={r.title}
        lede={r.excerpt}
      />
      <article className="section">
        <div className="wrap max-w-3xl">
          {r.reviewStatus !== "reviewed" && (
            <div className="mb-10">
              <Notice tone="demo" title="Draft — not clinically reviewed">
                This placeholder is visible only in development. It will not be published until a qualified reviewer approves it.
              </Notice>
            </div>
          )}
          {r.body.map((s) => (
            <section key={s.heading} className="mb-10">
              <h2 className="t-h3">{s.heading}</h2>
              {s.paragraphs.map((p) => (
                <p key={p} className="mt-4 text-[1.075rem]">
                  {p}
                </p>
              ))}
            </section>
          ))}
          {r.reviewStatus === "reviewed" && (
            <p className="border-t border-line pt-6 text-sm text-muted">
              Reviewed by {r.reviewer} on {r.reviewedAt}.
            </p>
          )}
        </div>
      </article>
      <FinalCTA />
    </>
  );
}

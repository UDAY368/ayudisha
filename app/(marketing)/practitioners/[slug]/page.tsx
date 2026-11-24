import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PortraitPlaceholder } from "@/components/sections/cards";
import { FinalCTA } from "@/components/sections/home";
import { ButtonLink, Notice } from "@/components/ui/primitives";
import { getTherapy } from "@/data/therapies";
import { getPractitioner, getVisiblePractitioners } from "@/lib/directory";
import { buildMetadata } from "@/lib/metadata";

export const dynamicParams = false;

export function generateStaticParams() {
  // Empty in production builds (no verified profiles yet) — demo slugs then 404.
  return getVisiblePractitioners().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/practitioners/[slug]">) {
  const { slug } = await params;
  const p = getPractitioner(slug);
  if (!p) return {};
  return buildMetadata({
    title: `${p.displayName} | AyuDisha`,
    description: `${p.displayName}: ${p.qualificationSummary}.`,
    path: `/practitioners/${p.slug}`,
    noindex: p.isDemo,
  });
}

const modeLabel = { "in-person": "In person", online: "Online", "home-visit": "Home visit" } as const;

export default async function PractitionerPage({ params }: PageProps<"/practitioners/[slug]">) {
  const { slug } = await params;
  const p = getPractitioner(slug);
  if (!p) notFound();
  const specialty = p.specialtyIds.map((s) => getTherapy(s)?.name).join(", ");

  const rows: [string, string][] = [
    ["Specialty", specialty],
    ["Qualifications", p.qualificationSummary + (p.isDemo ? " (illustrative)" : "")],
    ["Languages", p.languages.length ? p.languages.join(", ") : "Not yet listed"],
    ["Consultation mode", p.consultationModes.length ? p.consultationModes.map((m) => modeLabel[m]).join(", ") : "Not yet listed"],
    ["Availability", p.availability === "unavailable" ? "Unavailable" : "Ask our team"],
  ];
  if (p.registrationAuthority && p.registrationId && p.isVerified) rows.push(["Registration", `${p.registrationAuthority} · ${p.registrationId}`]);

  return (
    <>
      <section className="border-b border-line/70">
        <div className="wrap pb-16 pt-8">
          <Breadcrumbs
            items={[
              { label: "Practitioners", href: "/practitioners" },
              { label: p.displayName, href: `/practitioners/${p.slug}` },
            ]}
          />
          {p.isDemo && (
            <div className="mt-8">
              <Notice tone="demo" title="Fictional demo profile">
                This person does not exist. The profile previews the page layout during development and is never shown in
                production. Qualifications are illustrative and have not been verified.
              </Notice>
            </div>
          )}
          <div className="mt-12 grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <div className="mx-auto max-w-[340px]">
                <PortraitPlaceholder name={p.displayName} tall />
              </div>
            </div>
            <div className="lg:col-span-7 lg:col-start-6">
              <div className="flex flex-wrap gap-2">
                {p.isDemo && <span className="badge badge-demo">Demo · not bookable</span>}
                {p.isVerified && <span className="badge">Credentials checked</span>}
              </div>
              <h1 className="t-display mt-5" style={{ fontSize: "clamp(2.25rem, 1.4rem + 3vw, 3.75rem)" }}>
                {p.displayName}
              </h1>
              <p className="t-lead mt-3 font-semibold text-forest">{specialty}</p>
              <p className="mt-6 max-w-xl">{p.bio}</p>
              <dl className="mt-10 border-t border-line">
                {rows.map(([k, v]) => (
                  <div key={k} className="grid grid-cols-[150px_1fr] gap-4 border-b border-line py-4 sm:grid-cols-[200px_1fr]">
                    <dt className="text-sm font-bold uppercase tracking-[0.12em] text-muted">{k}</dt>
                    <dd>{v}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                {p.isDemo ? (
                  <ButtonLink href="/consultation" arrow>
                    Ask about real practitioners
                  </ButtonLink>
                ) : (
                  <ButtonLink href={`/consultation?specialty=${p.specialtyIds[0]}`} arrow>
                    Request a Consultation
                  </ButtonLink>
                )}
                <ButtonLink href="/practitioners" variant="secondary">
                  Back to directory
                </ButtonLink>
              </div>
            </div>
          </div>
        </div>
      </section>
      <FinalCTA />
    </>
  );
}

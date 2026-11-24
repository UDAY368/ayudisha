import Link from "next/link";
import { PageHero } from "@/components/sections/PageHero";
import { PractitionerCard } from "@/components/sections/cards";
import { FinalCTA } from "@/components/sections/home";
import { ButtonLink, EmptyState, Notice } from "@/components/ui/primitives";
import { therapies } from "@/data/therapies";
import { getVisiblePractitioners, toCard } from "@/lib/directory";
import { env } from "@/lib/env";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Explore Healthcare Practitioners | AyuDisha",
  description:
    "Browse available profiles and healthcare specialties, or contact our team about current practitioner options.",
  path: "/practitioners",
});

export default async function PractitionersPage({ searchParams }: PageProps<"/practitioners">) {
  const sp = await searchParams;
  const all = getVisiblePractitioners();
  const specialty = typeof sp.specialty === "string" && therapies.some((t) => t.slug === sp.specialty) ? sp.specialty : undefined;

  // Filters exist only for dimensions backed by real data (2+ distinct values).
  const specialtyCounts = therapies
    .map((t) => ({ t, count: all.filter((p) => p.specialtyIds.includes(t.slug)).length }))
    .filter((x) => x.count > 0);
  const showFilters = specialtyCounts.length >= 2;

  const list = (specialty ? all.filter((p) => p.specialtyIds.includes(specialty as never)) : all).map(toCard);
  const hasDemos = all.some((p) => p.isDemo);

  return (
    <>
      <PageHero
        crumbs={[{ label: "Practitioners", href: "/practitioners" }]}
        eyebrow="Practitioner network"
        title="Meet the people behind your care."
        lede="Profiles appear here only after a practitioner has authorised their listing and our team has checked their details."
      />
      <section className="section" aria-labelledby="dir-title">
        <div className="wrap">
          <h2 id="dir-title" className="sr-only">
            Directory
          </h2>
          {hasDemos && env.isDev && (
            <div className="mb-10">
              <Notice tone="demo" title="Development preview: fictional profiles">
                These three profiles are fictional layout samples. They are not real clinicians, cannot be booked, and do
                not exist in production builds.
              </Notice>
            </div>
          )}

          {all.length === 0 ? (
            <EmptyState
              title="Our practitioner network is being prepared."
              actions={
                <>
                  <ButtonLink href="/consultation" arrow>
                    Request a Consultation
                  </ButtonLink>
                  <ButtonLink href="/join-practitioner" variant="secondary">
                    Join as Practitioner
                  </ButtonLink>
                </>
              }
            >
              Contact us to learn about available care options. Our team will explain which practitioners are currently
              available for your preferred specialty.
            </EmptyState>
          ) : (
            <>
              {showFilters && (
                <nav aria-label="Filter by specialty" className="mb-10 flex flex-wrap gap-2">
                  <Link
                    href="/practitioners"
                    aria-current={!specialty ? "page" : undefined}
                    className="btn btn-sm btn-secondary aria-[current=page]:bg-forest aria-[current=page]:text-ivory"
                  >
                    All ({all.length})
                  </Link>
                  {specialtyCounts.map(({ t, count }) => (
                    <Link
                      key={t.slug}
                      href={`/practitioners?specialty=${t.slug}`}
                      aria-current={specialty === t.slug ? "page" : undefined}
                      className="btn btn-sm btn-secondary aria-[current=page]:bg-forest aria-[current=page]:text-ivory"
                    >
                      {t.name} ({count})
                    </Link>
                  ))}
                </nav>
              )}
              {list.length ? (
                <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {list.map((p) => (
                    <li key={p.slug}>
                      <PractitionerCard p={p} />
                    </li>
                  ))}
                </ul>
              ) : (
                <EmptyState
                  title="No practitioners match this filter yet."
                  actions={
                    <ButtonLink href="/practitioners" variant="secondary">
                      Clear filters
                    </ButtonLink>
                  }
                >
                  Our team can tell you about options that are not listed yet.
                </EmptyState>
              )}
            </>
          )}
        </div>
      </section>
      <FinalCTA title="Not sure who to see?" body="Our coordination team can talk you through current practitioner options." />
    </>
  );
}

import Link from "next/link";
import { PageHero } from "@/components/sections/PageHero";
import { concerns, getConcern } from "@/data/concerns";
import { therapies } from "@/data/therapies";
import { getVisiblePractitioners } from "@/lib/directory";
import { buildMetadata } from "@/lib/metadata";
import { FindCareWizard } from "./FindCareWizard";

export const metadata = buildMetadata({
  title: "Find Holistic Care & Practitioners | AyuDisha",
  description: "Explore care options, select your preferred specialty and contact AyuDisha for consultation guidance.",
  path: "/find-care",
});

export default async function FindCarePage({ searchParams }: PageProps<"/find-care">) {
  const sp = await searchParams;
  // Only allowlisted, non-sensitive category slugs are accepted.
  const interest = getConcern(typeof sp.interest === "string" ? sp.interest : undefined)?.slug;
  const people = getVisiblePractitioners();
  const lite = therapies.map((t) => ({
    slug: t.slug,
    name: t.name,
    shortDescription: t.shortDescription,
    available: people.filter((p) => p.specialtyIds.includes(t.slug)).length,
  }));

  return (
    <>
      <PageHero
        crumbs={[{ label: "Find Care", href: "/find-care" }]}
        eyebrow="Find Care"
        title="Find your starting point."
        lede="Three short steps to explore your options. Skip any of them and talk to our team instead."
      />
      <section className="section">
        <div className="wrap max-w-4xl">
          <FindCareWizard concerns={concerns} therapies={lite} initialInterest={interest} />
          <noscript>
            <p className="mt-8">
              This guide needs JavaScript. You can <Link href="/therapies">explore therapies</Link> or{" "}
              <Link href="/consultation">request a consultation</Link> instead.
            </p>
          </noscript>
        </div>
      </section>
    </>
  );
}

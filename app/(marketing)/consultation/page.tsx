import { PageHero } from "@/components/sections/PageHero";
import { ContactPanel } from "@/components/sections/ContactPanel";
import { ConsultationForm } from "@/components/forms/ConsultationForm";
import { getFormMode } from "@/lib/storage";
import { env } from "@/lib/env";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Request a Consultation | AyuDisha",
  description: "Share a few details and the AyuDisha team will contact you about practitioner and consultation options.",
  path: "/consultation",
});

const next = [
  "Our coordination team reviews your request.",
  "We contact you by your preferred method to understand what you are looking for.",
  "We explain the practitioner options available, including any fees, before anything is booked.",
];

export default async function ConsultationPage({ searchParams }: PageProps<"/consultation">) {
  const sp = await searchParams;
  const specialty = typeof sp.specialty === "string" ? sp.specialty : "";
  return (
    <>
      <PageHero
        crumbs={[{ label: "Request a Consultation", href: "/consultation" }]}
        eyebrow="Consultation request"
        title="Tell us how to reach you."
        lede="A few details are enough. Our team will get in touch to talk through practitioner and consultation options."
      />
      <section className="section">
        <div className="wrap grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <ConsultationForm mode={getFormMode()} defaultSpecialty={specialty} />
          </div>
          <aside className="flex flex-col gap-8 lg:col-span-5" aria-label="What happens next">
            <div className="card p-8">
              <h2 className="t-h3">What happens next</h2>
              <ol className="mt-6 flex flex-col gap-5">
                {next.map((n, i) => (
                  <li key={n} className="flex gap-4">
                    <span className="grid h-9 w-9 flex-none place-items-center rounded-full border border-gold font-display text-lg italic text-gold-ink">
                      {i + 1}
                    </span>
                    <span className="pt-1">{n}</span>
                  </li>
                ))}
              </ol>
            </div>
            <ContactPanel showWhatsApp={env.enableWhatsApp} />
          </aside>
        </div>
      </section>
    </>
  );
}

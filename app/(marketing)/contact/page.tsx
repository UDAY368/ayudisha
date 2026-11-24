import { PageHero } from "@/components/sections/PageHero";
import { ContactPanel } from "@/components/sections/ContactPanel";
import { ConsultationForm } from "@/components/forms/ConsultationForm";
import { getFormMode } from "@/lib/storage";
import { env } from "@/lib/env";
import { buildMetadata } from "@/lib/metadata";
import { site } from "@/config/site";

export const metadata = buildMetadata({
  title: "Contact AyuDisha | Consultation Enquiries",
  description: `Contact AyuDisha at ${site.contact.phoneDisplay} or ${site.contact.email} to explore consultation options.`,
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Contact", href: "/contact" }]}
        eyebrow="Contact"
        title="We're here to help you begin."
        lede="Call, email or send us a message. Our team will help you explore practitioner and consultation options."
      />
      <section className="section">
        <div className="wrap grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5 lg:order-2 lg:col-start-8">
            <ContactPanel showWhatsApp={env.enableWhatsApp} />
          </div>
          <div className="lg:col-span-7 lg:order-1 lg:col-start-1 lg:row-start-1">
            <h2 className="t-h3 mb-8">Send a general enquiry</h2>
            <ConsultationForm mode={getFormMode()} source="contact" submitLabel="Send my enquiry" />
          </div>
        </div>
      </section>
    </>
  );
}

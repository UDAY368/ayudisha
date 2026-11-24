import { PageHero } from "@/components/sections/PageHero";
import { PractitionerEnquiryForm } from "@/components/forms/PractitionerEnquiryForm";
import { Notice } from "@/components/ui/primitives";
import { getFormMode } from "@/lib/storage";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Join as a Practitioner | AyuDisha",
  description:
    "Qualified practitioners in Ayurveda, physiotherapy, naturopathy and chiropractic care can register interest in joining the AyuDisha network.",
  path: "/join-practitioner",
});

const steps = [
  { title: "Submit interest", body: "Share your name, contact details and discipline." },
  { title: "Team contacts you", body: "We explain how the network works and what we ask of practitioners." },
  { title: "Credential verification", body: "We check qualifications and registration where applicable." },
  { title: "Profile approval", body: "You approve your public profile before anything is published." },
];

export default function JoinPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Join as Practitioner", href: "/join-practitioner" }]}
        eyebrow="For practitioners"
        title="Bring your expertise to the AyuDisha network."
        lede="We are building a trusted starting point for people exploring Ayurveda, physiotherapy, naturopathy and chiropractic care, and we are looking for qualified practitioners who share that aim."
      />
      <section className="section bg-linen-band" aria-labelledby="review-title">
        <div className="wrap">
          <h2 id="review-title" className="t-h2 max-w-2xl">
            How the review works
          </h2>
          <ol className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <li key={s.title} className="card relative p-7">
                <span className="font-display text-4xl italic text-gold-ink">0{i + 1}</span>
                <h3 className="t-h3 mt-6">{s.title}</h3>
                <p className="mt-2 text-muted">{s.body}</p>
              </li>
            ))}
          </ol>
          <p className="mt-10 max-w-3xl text-muted">
            Submitting interest does not mean acceptance into the network, and AyuDisha does not guarantee patient referrals.
            Eligibility, scope and affiliation requirements are shared with you during review.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="wrap grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 className="t-h2">Register your interest</h2>
            <p className="mt-5 text-muted">Basic details only. Please don&apos;t upload or send documents at this stage.</p>
            <div className="mt-8">
              <Notice>Your details are used only to contact you about joining the network.</Notice>
            </div>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <PractitionerEnquiryForm mode={getFormMode()} />
          </div>
        </div>
      </section>
    </>
  );
}

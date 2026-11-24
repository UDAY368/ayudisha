import { buildMetadata } from "@/lib/metadata";
import { ThankYouMessage } from "./ThankYouMessage";

export const metadata = buildMetadata({
  title: "Thank you | AyuDisha",
  description: "Enquiry receipt.",
  path: "/thank-you",
  noindex: true,
});

export default function ThankYouPage() {
  return (
    <section className="section relative overflow-hidden">
      <div className="wrap max-w-3xl text-center">
        <ThankYouMessage />
      </div>
    </section>
  );
}

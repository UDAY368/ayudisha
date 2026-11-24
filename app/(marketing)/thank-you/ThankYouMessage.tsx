"use client";
import { useEffect, useState } from "react";
import { Emblem } from "@/components/brand/Emblem";
import { ButtonLink } from "@/components/ui/primitives";
import { site } from "@/config/site";

/** Shows the receipt only after a confirmed server receipt in this tab. No details are echoed. */
export function ThankYouMessage() {
  const [received, setReceived] = useState<boolean | null>(null);
  useEffect(() => {
    // Effects can run twice in development, so the one-time flag is cleared on a short delay.
    setReceived(sessionStorage.getItem("ayd_receipt") === "1");
    const t = setTimeout(() => sessionStorage.removeItem("ayd_receipt"), 500);
    return () => clearTimeout(t);
  }, []);

  if (received === null) return <div className="min-h-[50vh]" aria-busy="true" />;

  return (
    <div className="flex flex-col items-center" role={received ? "status" : undefined}>
      <Emblem size={88} />
      {received ? (
        <>
          <h1 className="t-h2 mt-10">Thank you.</h1>
          <p className="t-lead mx-auto mt-5 max-w-xl">
            Your enquiry has been received. Our team will contact you using your preferred contact method.
          </p>
          <p className="mt-4 text-sm text-muted">
            If your concern becomes urgent, don&apos;t wait for us. Call {site.emergency.number} for emergency help.
          </p>
        </>
      ) : (
        <>
          <h1 className="t-h2 mt-10">Looking to get in touch?</h1>
          <p className="t-lead mx-auto mt-5 max-w-xl">
            You can request a consultation online, or call us on {site.contact.phoneDisplay}.
          </p>
        </>
      )}
      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <ButtonLink href="/" variant="secondary">
          Back to home
        </ButtonLink>
        <ButtonLink href={received ? "/therapies" : "/consultation"} arrow>
          {received ? "Explore Therapies" : "Request a Consultation"}
        </ButtonLink>
      </div>
    </div>
  );
}

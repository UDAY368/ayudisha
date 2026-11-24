"use client";
import { site } from "@/config/site";
import type { FormMode } from "@/lib/storage/types";
import { Notice } from "../ui/primitives";
import { Icon } from "../ui/Icon";
import type { SubmitState } from "./useEnquiryForm";

export function ContactAlternatives() {
  return (
    <span className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
      <a href={site.contact.phoneHref} className="inline-flex min-h-11 items-center gap-2 font-semibold underline">
        <Icon name="phone" size={16} /> {site.contact.phoneDisplay}
      </a>
      <a href={site.contact.emailHref} className="inline-flex min-h-11 items-center gap-2 break-all font-semibold underline">
        <Icon name="mail" size={16} /> {site.contact.email}
      </a>
    </span>
  );
}

export function ModeBanner({ mode }: { mode: FormMode }) {
  if (mode === "disabled")
    return (
      <Notice tone="warning" title="Online requests are not enabled yet">
        This form is a preview. Please call or email our team and we will help you directly.
        <ContactAlternatives />
      </Notice>
    );
  if (mode === "dev-preview")
    return (
      <Notice tone="demo" title="Development mode">
        Submissions are validated on the server and saved to a local file (.data/enquiries.json). Nothing is emailed.
      </Notice>
    );
  return null;
}

export function SubmitFeedback({ state }: { state: SubmitState }) {
  if (state === "failed")
    return (
      <Notice tone="emergency" role="alert" title="Your enquiry was not sent">
        Something went wrong on our side and nothing was saved. Your answers are still here, so you can try again, or contact
        us directly:
        <ContactAlternatives />
      </Notice>
    );
  if (state === "rate_limited")
    return (
      <Notice tone="warning" role="alert" title="Too many attempts">
        Please wait a few minutes before trying again, or contact us directly:
        <ContactAlternatives />
      </Notice>
    );
  if (state === "disabled")
    return (
      <Notice tone="warning" role="alert" title="Online requests are not enabled yet">
        Your enquiry was not sent. Please contact us directly:
        <ContactAlternatives />
      </Notice>
    );
  return null;
}

export function ErrorSummary({ items, refEl }: { items: string[]; refEl: React.RefObject<HTMLDivElement | null> }) {
  return (
    <div ref={refEl} tabIndex={-1} className="outline-none" aria-live="assertive">
      {items.length > 0 && (
        <Notice tone="emergency" title={`Please check ${items.length === 1 ? "one answer" : `${items.length} answers`}`}>
          <ul className="mt-1 list-disc pl-5">
            {items.map((i) => (
              <li key={i}>{i}</li>
            ))}
          </ul>
        </Notice>
      )}
    </div>
  );
}

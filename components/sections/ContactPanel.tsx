import { site } from "@/config/site";
import { Icon, type IconName } from "../ui/Icon";

export function ContactPanel({ showWhatsApp = false }: { showWhatsApp?: boolean }) {
  const rows: { icon: IconName; label: string; value: string; href: string; ext?: boolean }[] = [
    { icon: "phone", label: "Call", value: site.contact.phoneDisplay, href: site.contact.phoneHref },
    { icon: "mail", label: "Email", value: site.contact.email, href: site.contact.emailHref },
    ...(showWhatsApp ? [{ icon: "whatsapp" as const, label: "WhatsApp", value: "Send a message", href: site.whatsappHref, ext: true }] : []),
    { icon: "instagram", label: "Instagram", value: site.social.instagram.handle, href: site.social.instagram.href, ext: true },
    { icon: "facebook", label: "Facebook", value: "AyuDisha on Facebook", href: site.social.facebook.href, ext: true },
  ];
  return (
    <div className="on-dark relative overflow-hidden rounded-[var(--radius-panel)] bg-forest p-8 md:p-10">
      <svg aria-hidden="true" viewBox="0 0 100 100" className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 opacity-50">
        <path d="M74 9.5A44 44 0 1 1 30 8.8" fill="none" stroke="#C4A36B" strokeWidth="0.5" />
      </svg>
      <h2 className="t-h3 relative">Talk to our team</h2>
      <p className="relative mt-2 text-ivory/80">Prefer to speak to someone? Reach us directly.</p>
      <ul className="relative mt-8 flex flex-col divide-y divide-ivory/15">
        {rows.map((r) => (
          <li key={r.label}>
            <a
              href={r.href}
              {...(r.ext ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="group flex min-h-16 items-center gap-4 py-3 no-underline"
            >
              <span className="grid h-11 w-11 flex-none place-items-center rounded-full bg-ivory/10 text-gold">
                <Icon name={r.icon} size={20} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-xs font-bold uppercase tracking-[0.16em] text-sage">{r.label}</span>
                <span className="block break-words font-semibold group-hover:underline">{r.value}</span>
              </span>
              <Icon name={r.ext ? "external" : "arrow"} size={18} className="flex-none text-ivory/60" />
              {r.ext && <span className="sr-only">(opens in a new tab)</span>}
            </a>
          </li>
        ))}
      </ul>
      <p className="relative mt-8 border-t border-ivory/15 pt-6 text-sm text-ivory/75">
        Not for emergencies. In an emergency call{" "}
        <a href={site.emergency.href} className="font-bold text-ivory underline">
          {site.emergency.number}
        </a>
        .
      </p>
    </div>
  );
}

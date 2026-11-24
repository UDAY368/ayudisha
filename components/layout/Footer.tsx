import Link from "next/link";
import { footerGroups, photoCredits, site } from "@/config/site";
import { Logo } from "../brand/Logo";
import { Icon } from "../ui/Icon";
import { ExternalLink } from "../ui/primitives";
import { CopyrightYear } from "./CopyrightYear";

export function Footer() {
  return (
    <footer id="site-footer" className="on-dark relative overflow-hidden bg-forest-deep">
      <svg aria-hidden="true" viewBox="0 0 600 600" className="pointer-events-none absolute -right-40 -top-40 h-[560px] w-[560px] opacity-25">
        <path d="M470 90A250 250 0 1 1 210 58" fill="none" stroke="#C4A36B" strokeWidth="1" />
      </svg>
      <div className="wrap relative pb-10 pt-20">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_2fr]">
          <div className="flex flex-col gap-6">
            <Logo tone="ivory" showTagline size="lg" />
            <p className="max-w-sm text-[0.95rem] text-ivory/75">{site.motto}</p>
            <ul className="flex flex-col gap-2 text-[0.95rem]">
              <li>
                <a href={site.contact.phoneHref} className="inline-flex min-h-11 items-center gap-3 no-underline hover:text-sage">
                  <Icon name="phone" size={18} className="text-gold" /> {site.contact.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={site.contact.emailHref} className="inline-flex min-h-11 items-center gap-3 break-all no-underline hover:text-sage">
                  <Icon name="mail" size={18} className="text-gold" /> {site.contact.email}
                </a>
              </li>
            </ul>
            <div className="flex gap-3">
              {[site.social.instagram, site.social.facebook].map((s) => (
                <ExternalLink
                  key={s.href}
                  href={s.href}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-ivory/25 transition-colors hover:border-gold hover:bg-ivory/5"
                >
                  <Icon name={s.label === "Instagram" ? "instagram" : "facebook"} size={18} />
                  <span className="sr-only">AyuDisha on {s.label}</span>
                </ExternalLink>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            {footerGroups.map((g) => (
              <div key={g.title}>
                <h2 className="font-sans text-xs font-bold uppercase tracking-[0.18em] text-sage">{g.title}</h2>
                <ul className="mt-4 flex flex-col">
                  {g.links.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className="inline-flex min-h-11 items-center text-[0.95rem] text-ivory/85 no-underline hover:text-ivory hover:underline">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 border-t border-ivory/15 pt-8">
          <p className="max-w-3xl text-[0.9rem] leading-relaxed text-ivory/80">{site.disclaimer}</p>
          <div className="mt-6 flex flex-col gap-3 text-xs text-ivory/55 md:flex-row md:items-end md:justify-between">
            <p>
              © <CopyrightYear /> {site.name}. All rights reserved.
            </p>
            <p className="max-w-2xl md:text-right">
              Photographs are illustrative and do not show AyuDisha practitioners or patients. Credits:{" "}
              {photoCredits.map((c, i) => (
                <span key={c.page}>
                  <ExternalLink href={c.page} className="underline hover:text-ivory">
                    {c.by}
                  </ExternalLink>{" "}
                  ({c.licence}){i < photoCredits.length - 1 ? ", " : ""}
                </span>
              ))}
              , via Wikimedia Commons.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

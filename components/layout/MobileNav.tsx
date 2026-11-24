"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { site } from "@/config/site";
import { Icon } from "../ui/Icon";
import { Logo } from "../brand/Logo";
import { isActive } from "./NavLinks";

export function MobileNav() {
  const ref = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    ref.current?.close();
  }, [pathname]);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    const onClose = () => setOpen(false);
    d.addEventListener("close", onClose);
    return () => d.removeEventListener("close", onClose);
  }, []);

  const show = () => {
    ref.current?.showModal();
    setOpen(true);
  };

  const links = [...site.nav, { label: "Join as Practitioner", href: "/join-practitioner" }, { label: "Contact", href: "/contact" }];

  return (
    <>
      <button
        type="button"
        onClick={show}
        aria-expanded={open}
        aria-controls="mobile-nav"
        className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line bg-surface text-forest lg:hidden"
      >
        <Icon name="menu" size={22} />
        <span className="sr-only">Open menu</span>
      </button>
      <dialog ref={ref} id="mobile-nav" className="mnav" aria-label="Site menu">
        <div className="flex h-full flex-col">
          <div className="wrap flex h-[72px] items-center justify-between">
            <Logo />
            <button
              type="button"
              onClick={() => ref.current?.close()}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line bg-surface text-forest"
              autoFocus
            >
              <Icon name="close" size={22} />
              <span className="sr-only">Close menu</span>
            </button>
          </div>
          <nav aria-label="Mobile" className="wrap mt-6 flex-1 overflow-y-auto">
            <ul className="flex flex-col">
              {links.map((l) => (
                <li key={l.href} className="border-b border-line">
                  <Link
                    href={l.href}
                    aria-current={isActive(pathname, l.href) ? "page" : undefined}
                    className="flex min-h-14 items-center justify-between py-3 font-display text-[1.75rem] text-forest-deep no-underline aria-[current=page]:text-forest"
                  >
                    {l.label}
                    <Icon name="arrow" size={20} className="text-gold-ink" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="wrap flex flex-col gap-3 pb-8 pt-6">
            <Link href={site.primaryCta.href} className="btn btn-primary w-full">
              {site.primaryCta.label}
            </Link>
            <a href={site.contact.phoneHref} className="btn btn-secondary w-full">
              <Icon name="phone" size={18} /> Call {site.contact.phoneDisplay}
            </a>
          </div>
        </div>
      </dialog>
    </>
  );
}

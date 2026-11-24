import Link from "next/link";
import { site } from "@/config/site";
import { Logo } from "../brand/Logo";
import { NavLinks } from "./NavLinks";
import { MobileNav } from "./MobileNav";

export function Header() {
  return (
    <header className="relative z-40 border-b border-line/70 bg-ivory/90 backdrop-blur-md md:sticky md:top-0">
      <div className="wrap flex h-[76px] items-center justify-between gap-6">
        <Logo />
        <nav aria-label="Main" className="hidden lg:block">
          <NavLinks items={site.nav} />
        </nav>
        <div className="flex items-center gap-2">
          <Link href={site.primaryCta.href} className="btn btn-primary btn-sm hidden sm:inline-flex">
            {site.primaryCta.label}
          </Link>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}

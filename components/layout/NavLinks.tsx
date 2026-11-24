"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { NavItem } from "@/config/site";

export function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href + "/");
}

export function NavLinks({ items }: { items: NavItem[] }) {
  const pathname = usePathname();
  return (
    <ul className="flex items-center gap-1">
      {items.map((item) => {
        const active = isActive(pathname, item.href);
        return (
          <li key={item.href}>
            <Link
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={`group relative inline-flex min-h-11 items-center whitespace-nowrap rounded-full px-3 xl:px-3.5 text-[0.95rem] font-semibold no-underline transition-colors ${
                active ? "text-forest-deep" : "text-muted hover:text-forest-deep"
              }`}
            >
              {item.label}
              <span
                aria-hidden="true"
                className={`absolute inset-x-3.5 bottom-2 h-px origin-left bg-gold transition-transform duration-300 ${
                  active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                }`}
              />
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

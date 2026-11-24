"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { site } from "@/config/site";
import { Icon } from "../ui/Icon";

/** One persistent mobile action. Hides when the footer is in view so it never covers footer links. */
export function MobileActionBar() {
  const [hidden, setHidden] = useState(false);
  useEffect(() => {
    const footer = document.getElementById("site-footer");
    if (!footer) return;
    const io = new IntersectionObserver((e) => setHidden(e[0].isIntersecting), { threshold: 0 });
    io.observe(footer);
    return () => io.disconnect();
  }, []);
  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-30 border-t border-line bg-ivory/95 px-4 pb-[max(12px,env(safe-area-inset-bottom))] pt-3 backdrop-blur-md transition-transform duration-300 md:hidden ${
        hidden ? "translate-y-full" : ""
      }`}
      aria-hidden={hidden || undefined}
      inert={hidden || undefined}
    >
      <div className="flex gap-3">
        <Link href="/find-care" className="btn btn-primary flex-1">
          Find My Care
        </Link>
        <a href={site.contact.phoneHref} className="btn btn-secondary w-[52px] px-0" aria-label={`Call AyuDisha on ${site.contact.phoneDisplay}`}>
          <Icon name="phone" size={20} />
        </a>
      </div>
    </div>
  );
}

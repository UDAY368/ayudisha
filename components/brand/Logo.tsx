import Link from "next/link";
import { site } from "@/config/site";
import { Emblem } from "./Emblem";

type Props = { tone?: "forest" | "ivory"; showTagline?: boolean; asLink?: boolean; size?: "md" | "lg" };

export function Logo({ tone = "forest", showTagline = false, asLink = true, size = "md" }: Props) {
  const iconSize = size === "lg" ? 56 : 42;
  const inner = site.brand.logoSrc ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={site.brand.logoSrc} alt={`${site.name} logo`} height={iconSize} style={{ height: iconSize, width: "auto" }} />
  ) : (
    <span className="flex items-center gap-3">
      {site.brand.iconSrc ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={site.brand.iconSrc} alt="" width={iconSize} height={iconSize} />
      ) : (
        <Emblem size={iconSize} tone={tone} />
      )}
      <span className="flex flex-col leading-none">
        <span
          className="font-display font-semibold"
          style={{
            fontSize: size === "lg" ? "1.85rem" : "1.5rem",
            letterSpacing: "0.14em",
            color: tone === "ivory" ? "var(--color-ivory)" : "var(--color-forest-deep)",
          }}
        >
          {site.wordmark}
        </span>
        {showTagline && (
          <span
            className="mt-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.16em]"
            style={{ color: tone === "ivory" ? "var(--color-sage)" : "var(--color-muted)" }}
          >
            {site.tagline}
          </span>
        )}
      </span>
    </span>
  );

  if (!asLink) return inner;
  return (
    <Link href="/" aria-label={`${site.name} home`} className="inline-flex rounded-lg no-underline">
      {inner}
    </Link>
  );
}

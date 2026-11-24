import Link from "next/link";
import { breadcrumbJsonLd, JsonLd } from "@/lib/jsonld";
import { Icon } from "../ui/Icon";

export type Crumb = { label: string; href: string };

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const all = [{ label: "Home", href: "/" }, ...items];
  return (
    <>
      <nav aria-label="Breadcrumb" className="text-sm">
        <ol className="flex flex-wrap items-center gap-1.5 text-muted">
          {all.map((c, i) => {
            const last = i === all.length - 1;
            return (
              <li key={c.href} className="flex items-center gap-1.5">
                {last ? (
                  <span aria-current="page" className="font-semibold text-forest">
                    {c.label}
                  </span>
                ) : (
                  <>
                    <Link href={c.href} className="rounded py-2 no-underline hover:text-forest hover:underline">
                      {c.label}
                    </Link>
                    <Icon name="chevron" size={14} />
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
      <JsonLd data={breadcrumbJsonLd(all)} />
    </>
  );
}

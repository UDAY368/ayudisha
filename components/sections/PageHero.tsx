import { Breadcrumbs, type Crumb } from "../layout/Breadcrumbs";
import { DishaLine } from "../ui/DishaLine";

export function PageHero({
  crumbs,
  eyebrow,
  title,
  lede,
  children,
  aside,
}: {
  crumbs: Crumb[];
  eyebrow?: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
  children?: React.ReactNode;
  aside?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-line/70">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 -top-48 h-[520px] w-[520px] rounded-full opacity-70"
        style={{ background: "radial-gradient(closest-side, #f1e6cc, rgba(250,248,242,0))" }}
      />
      <DishaLine
        className="absolute -right-20 -top-24 hidden h-[420px] w-[420px] opacity-80 md:block"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid meet"
        d="M74 9.5A44 44 0 1 1 30 8.8"
      />
      <div className={`wrap relative grid gap-10 pb-16 pt-8 md:pb-20 ${aside ? "lg:grid-cols-12 lg:items-end" : ""}`}>
        <div className={aside ? "lg:col-span-7" : ""}>
          <Breadcrumbs items={crumbs} />
          <div className="mt-12 flex max-w-3xl flex-col gap-6 md:mt-16" data-enter>
            {eyebrow && <p className="eyebrow">{eyebrow}</p>}
            <h1 className="t-display">{title}</h1>
            {lede && <p className="t-lead prose-measure">{lede}</p>}
            {children}
          </div>
        </div>
        {aside && <div className="lg:col-span-5">{aside}</div>}
      </div>
    </section>
  );
}

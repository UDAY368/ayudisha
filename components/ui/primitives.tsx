import Link from "next/link";
import { Icon, type IconName } from "./Icon";

type BtnVariant = "primary" | "secondary" | "on-dark" | "outline-light";

export function ButtonLink({
  href,
  children,
  variant = "primary",
  size,
  arrow = false,
  icon,
  className = "",
  external = false,
}: {
  href: string;
  children: React.ReactNode;
  variant?: BtnVariant;
  size?: "sm";
  arrow?: boolean;
  icon?: IconName;
  className?: string;
  external?: boolean;
}) {
  const cls = `btn btn-${variant} ${size === "sm" ? "btn-sm" : ""} ${className}`;
  const content = (
    <>
      {icon && <Icon name={icon} size={18} />}
      <span>{children}</span>
      {arrow && <Icon name="arrow" size={18} className="btn-arrow" />}
    </>
  );
  // tel:, mailto: and external links use a plain anchor
  if (external || /^(tel:|mailto:|https?:)/.test(href)) {
    const isWeb = /^https?:/.test(href);
    return (
      <a href={href} className={cls} {...(isWeb ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
        {content}
        {isWeb && <span className="sr-only"> (opens in a new tab)</span>}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {content}
    </Link>
  );
}

export function Folio({ num, label }: { num: string; label: string }) {
  return (
    <div className="folio">
      <span className="folio-num" aria-hidden="true">
        {num}
      </span>
      <span className="folio-rule" aria-hidden="true" />
      <span className="eyebrow">{label}</span>
    </div>
  );
}

export function SectionHeading({
  folio,
  eyebrow,
  title,
  lede,
  align = "left",
  as: As = "h2",
  id,
}: {
  folio?: string;
  eyebrow?: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
  align?: "left" | "center";
  as?: "h1" | "h2";
  id?: string;
}) {
  const center = align === "center";
  return (
    <div className={`${center ? "mx-auto text-center items-center" : ""} flex max-w-3xl flex-col gap-5`}>
      {folio && eyebrow ? <Folio num={folio} label={eyebrow} /> : eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <As id={id} className={As === "h1" ? "t-display" : "t-h2"}>
        {title}
      </As>
      {lede && <p className={`t-lead prose-measure ${center ? "mx-auto" : ""}`}>{lede}</p>}
    </div>
  );
}

export function Accordion({ items, name }: { items: { id: string; q: string; a: React.ReactNode }[]; name: string }) {
  return (
    <div>
      {items.map((item) => (
        <details key={item.id} className="acc" name={name}>
          <summary>
            <span>{item.q}</span>
            <span className="acc-icon" aria-hidden="true">
              <Icon name="plus" size={16} />
            </span>
          </summary>
          <div className="acc-body">{item.a}</div>
        </details>
      ))}
    </div>
  );
}

export function Notice({
  tone = "info",
  title,
  children,
  role,
}: {
  tone?: "info" | "warning" | "emergency" | "demo";
  title?: string;
  children: React.ReactNode;
  role?: "alert" | "status";
}) {
  const styles: Record<string, string> = {
    info: "bg-sage-wash border-line text-ink",
    warning: "bg-[#fff6e6] border-[#ead7b0] text-[#5b3f0e]",
    demo: "bg-[repeating-linear-gradient(135deg,#fff6e6_0_12px,#fdf0d8_12px_24px)] border-[#ead7b0] text-[#5b3f0e]",
    emergency: "bg-[#fbeeea] border-[#e8c3b9] text-[#6b2416]",
  };
  return (
    <div role={role} className={`flex gap-3 rounded-2xl border px-5 py-4 text-[0.95rem] leading-relaxed ${styles[tone]}`}>
      <Icon name={tone === "info" ? "compass" : "alert"} size={20} className="mt-0.5 flex-none" />
      <div>
        {title && <p className="font-bold">{title}</p>}
        <div>{children}</div>
      </div>
    </div>
  );
}

export function EmptyState({ title, children, actions }: { title: string; children: React.ReactNode; actions?: React.ReactNode }) {
  return (
    <div className="card relative overflow-hidden px-6 py-12 text-center md:px-12 md:py-16">
      <svg aria-hidden="true" className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 opacity-50 md:-right-10 md:-top-10 md:h-48 md:w-48" viewBox="0 0 100 100">
        <path d="M80 18A42 42 0 1 1 30 12" className="disha-path" />
      </svg>
      <h3 className="t-h3 mx-auto max-w-xl">{title}</h3>
      <div className="mx-auto mt-3 max-w-xl text-muted">{children}</div>
      {actions && <div className="mt-8 flex flex-wrap justify-center gap-3">{actions}</div>}
    </div>
  );
}

export function ExternalLink({ href, children, className = "" }: { href: string; children: React.ReactNode; className?: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}

import Image from "next/image";
import Link from "next/link";
import type { Therapy } from "@/data/therapies";
import { getTherapy } from "@/data/therapies";
import type { PractitionerCard as PCard } from "@/data/practitioner-types";
import { Icon } from "../ui/Icon";

export function TherapyCard({ therapy, headingLevel = "h3" }: { therapy: Therapy; headingLevel?: "h2" | "h3" }) {
  const H = headingLevel;
  return (
    <Link
      href={`/therapies/${therapy.slug}`}
      className="card card-link group flex h-full flex-col overflow-hidden p-3 no-underline"
    >
      <div className="relative aspect-[4/5] overflow-hidden rounded-[999px_999px_14px_14px] bg-linen">
        <Image src={therapy.image} alt={therapy.imageAlt} fill sizes="(min-width: 1024px) 300px, (min-width: 640px) 45vw, 90vw" className="zoom-img object-cover" />
      </div>
      <div className="flex flex-1 flex-col px-3 pb-4 pt-6">
        <H className="t-h3">{therapy.name}</H>
        <p className="mt-2 flex-1 text-[0.95rem] text-muted">{therapy.tagline}</p>
        <span className="mt-5 inline-flex items-center gap-2 text-[0.95rem] font-semibold text-forest">
          Learn more <span className="sr-only">about {therapy.name}</span>
          <Icon name="arrow" size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}

export function PortraitPlaceholder({ name, tall = false }: { name: string; tall?: boolean }) {
  const initials = name
    .replace(/\(Demo\)/, "")
    .trim()
    .split(/\s+/)
    .map((p) => p[0])
    .slice(0, 2)
    .join("");
  return (
    <div className={`relative grid ${tall ? "aspect-[4/5]" : "aspect-[4/3]"} place-items-center overflow-hidden rounded-[999px_999px_14px_14px] bg-sage-wash`} aria-hidden="true">
      <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet" className="absolute inset-[12%] h-[76%] w-[76%]">
        <path d="M72 14A40 40 0 1 1 36 12" fill="none" stroke="#C4A36B" strokeWidth="0.5" />
      </svg>
      <span className="relative mt-6 font-display text-6xl italic text-forest/70">{initials}</span>
    </div>
  );
}

export function PractitionerCard({ p }: { p: PCard }) {
  const specialty = p.specialtyIds.map((s) => getTherapy(s)?.name).join(", ");
  return (
    <Link href={`/practitioners/${p.slug}`} className="card card-link group flex h-full flex-col p-3 no-underline">
      <PortraitPlaceholder name={p.displayName} />
      <div className="flex flex-1 flex-col px-3 pb-4 pt-5">
        <div className="flex flex-wrap gap-2">
          {p.isDemo && <span className="badge badge-demo">Demo · not bookable</span>}
        </div>
        <h3 className="t-h3 mt-3">{p.displayName}</h3>
        <p className="mt-1 text-[0.95rem] font-semibold text-forest">{specialty}</p>
        <p className="mt-1 flex-1 text-sm text-muted">{p.qualificationSummary}</p>
        <span className="mt-5 inline-flex items-center gap-2 text-[0.95rem] font-semibold text-forest">
          {p.isDemo ? "View Demo Profile" : "View Profile"}
          <Icon name="arrow" size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}

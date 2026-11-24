import type { ConcernIcon } from "@/data/concerns";

export type IconName =
  | ConcernIcon
  | "arrow"
  | "phone"
  | "mail"
  | "instagram"
  | "facebook"
  | "whatsapp"
  | "menu"
  | "close"
  | "plus"
  | "check"
  | "alert"
  | "external"
  | "share"
  | "search"
  | "connect"
  | "chevron";

const paths: Record<IconName, React.ReactNode> = {
  arrow: <path d="M5 12h14m-5-5 5 5-5 5" />,
  chevron: <path d="m9 6 6 6-6 6" />,
  phone: (
    <path d="M5 4h3l2 5-2.5 1.5a11 11 0 0 0 6 6L15 14l5 2v3a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" />
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="m4 7 8 6 8-6" />
    </>
  ),
  instagram: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
    </>
  ),
  facebook: <path d="M14 8.5V7c0-.8.5-1.2 1.2-1.2H17V2.6h-2.7C11.6 2.6 10.6 4.4 10.6 7v1.5H8V12h2.6v9.4H14V12h2.7l.4-3.5H14Z" />,
  whatsapp: (
    <>
      <path d="M4 20l1.2-4A8 8 0 1 1 8 19l-4 1Z" />
      <path d="M9.2 8.6c.2-.5.6-.5.9-.5l.6.1 1 2-.6.9a5 5 0 0 0 2.3 2.2l.9-.6 2 .9c0 .6-.2 1.4-1 1.8-1 .4-2.8 0-4.6-1.6-1.6-1.4-2.4-3.2-2-4.2" />
    </>
  ),
  menu: <path d="M4 7h16M4 12h16M4 17h10" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  plus: <path d="M12 5v14M5 12h14" />,
  check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
  alert: (
    <>
      <path d="M12 3 2.5 20h19L12 3Z" />
      <path d="M12 10v4.5M12 17.4v.1" />
    </>
  ),
  external: <path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />,
  share: <path d="M12 3v12M7 8l5-5 5 5M5 14v5a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-5" />,
  search: (
    <>
      <circle cx="11" cy="11" r="6.5" />
      <path d="m16 16 4.5 4.5" />
    </>
  ),
  connect: (
    <>
      <circle cx="6" cy="12" r="2.5" />
      <circle cx="18" cy="6" r="2.5" />
      <circle cx="18" cy="18" r="2.5" />
      <path d="M8.3 11 15.7 7M8.3 13l7.4 4" />
    </>
  ),
  spine: (
    <>
      <path d="M12 2.5c-1.8 3.2 1.8 6.3 0 9.5s1.8 6.3 0 9.5" />
      <path d="M9 5.5h6M8.5 9.5h7M8.5 14.5h7M9 18.5h6" />
    </>
  ),
  joint: (
    <>
      <path d="M5 4.5 10 10M19 19.5 14 14" />
      <circle cx="12" cy="12" r="3" />
      <path d="M4 7.5a2 2 0 1 1 3-3M20 16.5a2 2 0 1 1-3 3" />
    </>
  ),
  walk: (
    <>
      <circle cx="13.5" cy="4.5" r="1.8" />
      <path d="m10 21 2.5-6.5L15 16v5M9 11.5l2-3.5 3.5 1.5 2 3M12.5 14.5 11 8" />
    </>
  ),
  bowl: (
    <>
      <path d="M3.5 11.5h17a8.5 8.5 0 0 1-17 0Z" />
      <path d="M12 11.5c0-3 1.6-5.6 4.5-7M12 11.5c-.6-2.2-2-3.8-4.2-4.6" />
    </>
  ),
  leaf: (
    <>
      <path d="M5 19C5 10 10 5 20 4c0 10-5 15-14 15Z" />
      <path d="M5 19 13 11" />
    </>
  ),
  moon: <path d="M19.5 14.5A8 8 0 0 1 9.5 4.5a8 8 0 1 0 10 10Z" />,
  sun: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M5.3 18.7l1.4-1.4M17.3 6.7l1.4-1.4" />
    </>
  ),
  compass: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="m15.5 8.5-2 5-5 2 2-5 5-2Z" />
    </>
  ),
};

export function Icon({ name, size = 20, className, strokeWidth = 1.6 }: { name: IconName; size?: number; className?: string; strokeWidth?: number }) {
  const filled = name === "facebook";
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke={filled ? "none" : "currentColor"}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {paths[name]}
    </svg>
  );
}

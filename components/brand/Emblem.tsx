/**
 * INTERIM STAND-IN EMBLEM.
 * Drawn to the approved concept (open circular arc, moving human figure, upward leaf, flowing path)
 * until the owner's approved PNG is placed at public/brand/ayudisha-icon.png and
 * site.brand.iconSrc is set. Do not treat this as the final production mark.
 */
type Props = { size?: number; className?: string; title?: string; tone?: "forest" | "ivory" };

export function Emblem({ size = 40, className, title, tone = "forest" }: Props) {
  const stroke = tone === "ivory" ? "#FAF8F2" : "#234C3D";
  const gold = "#C4A36B";
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      className={className}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* open circular arc: life */}
      <path d="M44.5 9.6A26 26 0 1 1 22.6 7.7" stroke={stroke} strokeWidth="2.4" />
      {/* moving figure: head in the opening, forward stride */}
      <circle cx="35.2" cy="14.6" r="3.6" fill={stroke} />
      <path d="M33.6 20.4c-1.2 5.4-3 10-5.4 14.2" stroke={stroke} strokeWidth="2.8" />
      <path d="M32.6 24.2c3 1.6 5.8 2.4 8.8 2.2" stroke={stroke} strokeWidth="2.4" />
      <path d="M32 24.4c-2.8 1.2-5.4 3.2-7.4 5.6" stroke={stroke} strokeWidth="2.4" />
      <path d="M28.2 34.6c3.2 2.6 5.8 5.8 7.4 9.6" stroke={stroke} strokeWidth="2.6" />
      <path d="M28.2 34.6c-2.6 2.8-5.6 5-9 6.4" stroke={stroke} strokeWidth="2.6" />
      {/* upward leaf: nature */}
      <path d="M43.6 47.4c.4-7.6 4.2-13.4 11-17-.2 8.2-4.2 14-11 17Z" fill="#91B49A" stroke={stroke} strokeWidth="1.6" />
      <path d="M44.4 46.4c2.6-4.4 5.2-8 8.6-11.6" stroke={stroke} strokeWidth="1.2" />
      {/* flowing path: direction */}
      <path d="M13 50.5c6.8 3.6 13.6 3.4 20.4-.4 4.6-2.6 9-3.2 13.6-1.6" stroke={gold} strokeWidth="2.4" />
    </svg>
  );
}

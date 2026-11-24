# AyuDisha: implementation plan (drafted by Claude Fable 5.2)

The planning agent's full plan is summarised here. The build follows it, with the deviations noted at the end.

## Stack
Next.js App Router, TypeScript strict, Tailwind v4 (`@theme` tokens), Zod, `server-only`. Native `<details>` for the accordion, native `<dialog>` for the mobile menu, and a hand-written SVG icon set. Fonts come from `next/font`: Cormorant Garamond for display and Manrope for body.

## Design system
- **Tokens:** forest `#234C3D`, forest-deep `#19382D`, sage `#91B49A`, ivory `#FAF8F2`, gold `#C4A36B`, ink `#24352D`, muted `#57675D`, line `#E0E6DC`, plus derived sage-wash and linen. Gold is never used for body text.
- **Type:** clamped display, H2, H3 and lead sizes; body at 16–17px, line-height 1.7, max 62ch.
- **Signature, the "Disha line":** a gold hairline path that draws once on view and threads the sections.
- **Arch frames:** a 999px top radius with an inset keyline and an open gold arc echoing the emblem.
- **Editorial folios:** "01 — Discover" numbering on sections.
- **Motion:** CSS only, with a single hero entrance, and everything honours `prefers-reduced-motion`.

## Pages
- **Home:** the spec §7 order.
- **Therapy template:** the spec §8 structure.
- **Find Care:** a three-step wizard with an emergency stop that unmounts the flow and moves focus. There is no concern-to-therapy mapping.
- **Directory:** filters appear only for dimensions with real data, plus empty states.
- **Forms:** three modes (live, dev-preview, disabled), Zod on client and server, an error summary, and no fake success.
- **Legal:** draft templates.
- **Status pages:** a 404, and a thank-you page gated by a sessionStorage flag.

## API
Same-origin check, size limit, rate limit, honeypot and minimum fill time, strict schema, duplicate window, and a storage adapter with no production default. Responses contain no personal data.

## SEO
- `buildMetadata` helper.
- OG and apple icons via `ImageResponse`.
- Sitemap of public routes only; robots disallows everything outside production.
- JSON-LD: Organization and WebSite, BreadcrumbList, and FAQPage.

## Deviations during the build
- **Photography:** licensed Wikimedia Commons stand-ins replace the planned illustrated SVG scenes, because real photos read as more premium. All are credited and flagged in the footer as illustrative.
- **Scroll motion:** no per-card scroll fades; motion is limited to the hero entrance and the path draw.

# AyuDisha website

Marketing and practitioner-discovery site for **AyuDisha — Your Path to Natural Wellbeing.**
Built from `AyuDisha_Website_Master_Build_Specification.md` (spec) and the implementation plan in `PLAN.md`.

**Stack:** Next.js 16 (App Router), React 19, TypeScript 7, Tailwind CSS 4, Zod 4. No UI, animation or tracking libraries.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000  (development: demo profiles + local file storage)
npm run build      # production build (type-checks)
npm run start      # serve the production build
```

Copy `.env.example` to `.env.local` and adjust as needed.

## Where things live

| What | File |
|---|---|
| Phone, email, socials, tagline, nav, disclaimer (single source of truth) | `config/site.ts` |
| Therapy page copy | `data/therapies.ts` |
| Concern categories (Find Care) | `data/concerns.ts` |
| FAQ (verbatim from spec §12) | `data/faq.ts` |
| Real practitioners (empty) | `data/practitioners.ts` |
| Fictional demo practitioners (dev only) | `data/demo-practitioners.ts` |
| Resources / articles | `data/resources.ts` |
| Draft legal text | `data/legal.ts` |
| Design tokens | `app/globals.css` (`@theme`) |
| Enquiry API logic | `lib/enquiry-handler.ts`, `lib/validation.ts`, `lib/storage/` |

## Safety behaviour (verified)

- **Demo profiles** appear only in `npm run dev`. In production builds `/practitioners/demo-*` returns 404, the directory and homepage show the "network is being prepared" state, and no demo names are in the bundle.
- **Draft articles** are linked only in development; in production they show as "In review" and their URLs 404.
- **Forms:** in development they validate on the server and save to `.data/enquiries.json` (gitignored). In production, with no durable storage adapter, they are shown disabled with call and email alternatives, and the API returns `503 integration_disabled`. The success message appears only after a confirmed save.
- **API:** same-origin check, 4 KB body limit, strict allowlisted schema, honeypot plus minimum fill time, a per-instance rate limit (5 per 10 minutes), duplicate prevention (same phone within 10 minutes), and no personal data in responses or logs.
- **Indexing:** the whole site is `noindex` with a disallow-all robots file unless `SITE_ENV=production`. Thank-you and demo pages are always `noindex`. Privacy and Terms stay out of the sitemap until `site.legal.approved = true`.
- **No analytics or advertising trackers.** Health selections never leave the page; only the generic `interest` slug goes in the URL.

## Owner actions before public launch

1. **Logo:** put the approved PNGs in `public/brand/` (`ayudisha-logo.png`, `ayudisha-icon.png`) and set `site.brand.logoSrc` / `iconSrc`. The current emblem (`components/brand/Emblem.tsx`, `app/icon.svg`) is an **interim stand-in** drawn to the concept.
2. **Photography:** the five photos in `public/images/` are licensed Wikimedia Commons stand-ins (credited in the footer). Replace them with commissioned or licensed photography in the spec's art direction, and update `image` in `data/therapies.ts` and the hero in `components/sections/Hero.tsx`.
3. **Enquiry storage:** implement a durable adapter (e.g. `lib/storage/postgres.ts`) against the `StorageAdapter` interface and return it from `getStorage()` in production. Optionally add a notification adapter where `lib/enquiry-handler.ts` marks it. Replace the in-memory rate limiter with a shared store before scaling out.
4. **Clinical review:** have a qualified reviewer approve the therapy copy and articles, then set `reviewStatus: "reviewed"` and `reviewedAt`.
5. **Legal:** complete the bracketed operator details in `data/legal.ts` and `site.optional`, get the Privacy Policy and Terms approved, then set `site.legal.approved = true` and bump `consentVersion`.
6. **WhatsApp:** set `ENABLE_WHATSAPP=true` only after confirming the number is on WhatsApp Business.
7. **Emergency wording:** confirm the "112" guidance in `site.emergency`.
8. **Practitioners:** add real, authorised, verified records to `data/practitioners.ts` (or a database) with `isPublished` and `isVerified` set.
9. **Deploy:** set `SITE_URL` and `SITE_ENV=production`, configure DNS, HTTPS and the canonical `www` redirect, then submit the sitemap in Search Console. Do this only after owner sign-off.

## Private documents

`documents/` contains private owner files (credentials and ID numbers). It is gitignored and excluded from TypeScript and Tailwind scanning. **Move it out of this project folder** before sharing or deploying the repository.

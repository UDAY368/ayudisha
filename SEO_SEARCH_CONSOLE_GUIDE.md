# AyuDisha: Google Search setup guide

Site: **https://www.ayudisha.in** (hosted on Vercel, auto-deploys from GitHub `UDAY368/ayudisha`, branch `main`).

## 1. What the website already does for SEO

| Area | Status |
|---|---|
| Indexing | `index, follow` on all public pages. Thank-you and demo pages are `noindex`. |
| One canonical address | `ayudisha.in`, `http://` and `ayudisha.vercel.app` all redirect (308) to `https://www.ayudisha.in`. Every page has a `<link rel="canonical">`. |
| robots.txt | https://www.ayudisha.in/robots.txt allows everything except `/api/` and `/thank-you`, and points to the sitemap. |
| Sitemap | https://www.ayudisha.in/sitemap.xml lists only public, finished pages. Privacy and Terms join it once `site.legal.approved = true`. |
| Titles and descriptions | Unique per page, 20–55 character titles, 70–160 character descriptions. |
| Headings | Exactly one `<h1>` per page. |
| Structured data | Organization (logo, phone, email, Instagram, Facebook), WebSite, BreadcrumbList on inner pages, FAQPage on /faq. |
| Social sharing | Open Graph and Twitter card with a 1200×630 image on every page. |
| Speed and mobile | Static pre-rendered pages, optimised AVIF/WebP images, self-hosted fonts, responsive layout. |
| Security | HTTPS, security headers. |
| Preview deployments | Vercel preview URLs stay `noindex` (only production has `SITE_ENV=production`). |

## 2. Add the site to Google Search Console

Use a **Domain property**. It covers `ayudisha.in`, `www.ayudisha.in`, http and https in one place.

1. Open https://search.google.com/search-console and sign in with the Google account that should own the site (preferably the business account, `ayudishaservices@gmail.com`).
2. Click the property dropdown (top left), then **Add property**.
3. Choose **Domain** (left box), type `ayudisha.in` (no `www`, no `https://`), and click **Continue**.
4. Google shows a **TXT record** like `google-site-verification=AbC123...`. Click **Copy**.
5. Add that TXT record where your domain's DNS is managed. For `ayudisha.in` this is **your domain registrar** (where you bought the domain). Vercel shows it as a third-party domain.
   - **If you later move nameservers to Vercel:** Vercel dashboard → your team → **Domains** → `ayudisha.in` → **DNS Records** → **Add**.
     - Name: leave **empty** (or `@`)
     - Type: `TXT`
     - Value: paste the `google-site-verification=...` text
     - TTL: default → **Add**
   - **At your registrar (current setup)** (GoDaddy, Hostinger, BigRock, Namecheap…): open the DNS / DNS Management page for `ayudisha.in` and add the same TXT record with host `@`.
   - Don't delete the existing A / CNAME records that point to Vercel.
6. Wait 5–10 minutes, go back to Search Console and click **Verify**. If it fails, wait an hour (DNS can take up to 24–48 h) and click **Verify** again.

   You can check whether the record is live from PowerShell:
   ```powershell
   Resolve-DnsName ayudisha.in -Type TXT
   ```

> **Alternative (URL-prefix property, no DNS access):** Add property → **URL prefix** → `https://www.ayudisha.in/` → **HTML tag** method. Copy only the `content="..."` value, add it in Vercel → Project `ayudisha` → **Settings → Environment Variables** as `GOOGLE_SITE_VERIFICATION` (Production), redeploy (Deployments → ⋯ → Redeploy), then click **Verify**. The site already prints this meta tag when the variable is set.

## 3. Submit the sitemap

1. In Search Console, select the `ayudisha.in` property.
2. Left menu → **Indexing → Sitemaps**.
3. Under "Add a new sitemap", enter the full URL `https://www.ayudisha.in/sitemap.xml` and click **Submit**.
4. Status should show **Success** within minutes to a day, with 15 discovered pages.

## 4. Ask Google to index the key pages now

1. Click the search bar at the top (**URL inspection**) and paste `https://www.ayudisha.in/`.
2. If it says "URL is not on Google", click **Request indexing** and wait about a minute.
3. Repeat for these, about 10 per day (Google limits manual requests):
   - `https://www.ayudisha.in/therapies`
   - `https://www.ayudisha.in/therapies/ayurveda`
   - `https://www.ayudisha.in/therapies/physiotherapy`
   - `https://www.ayudisha.in/therapies/naturopathy`
   - `https://www.ayudisha.in/therapies/chiropractic`
   - `https://www.ayudisha.in/find-care`
   - `https://www.ayudisha.in/consultation`
   - `https://www.ayudisha.in/about`
   - `https://www.ayudisha.in/contact`
4. Use **Test live URL** to confirm Google sees "Page is available to Google" and "Indexing allowed? Yes".

## 5. Checks to run once (first week)

- **Rich results:** https://search.google.com/test/rich-results, test `https://www.ayudisha.in/` (Organization) and `https://www.ayudisha.in/faq` (FAQ). Both should show "valid items".
- **Speed:** https://pagespeed.web.dev, test the home page on mobile.
- **Search Console → Experience → Core Web Vitals and HTTPS:** they fill in after Google has enough visits (can take weeks).
- **Search Console → Indexing → Pages:** "Excluded by noindex" for `/thank-you` and demo pages is correct and expected. "Page with redirect" for `ayudisha.in` / `ayudisha.vercel.app` is also correct.
- Search Google for `site:ayudisha.in` after 3–7 days to see what is indexed.

## 6. Off-site steps that matter most for a new site

1. **Google Business Profile** (https://business.google.com): this is the biggest win for local health searches ("ayurveda near me"). Add the business name, category (for example "Health consultant" or "Alternative medicine practitioner", whichever is accurate), phone `+91 63023 85910`, website `https://www.ayudisha.in`, service areas, hours and real photos. Verify by the method Google offers.
2. **Link your socials to the site:** put `https://www.ayudisha.in` in the Instagram bio and Facebook page "Website" field. The site already lists both profiles in its structured data.
3. **Bing Webmaster Tools** (https://www.bing.com/webmasters): use **Import from Google Search Console**. It covers Bing, Yahoo and DuckDuckGo in two clicks.
4. **Local directories:** create consistent listings (same name, phone and website) on Justdial, Sulekha, Practo (once practitioners are verified) and IndiaMART if relevant.
5. **Content:** publish reviewed articles in `/resources` regularly (they're in `data/resources.ts`; set `reviewStatus: "reviewed"` to publish and add them to the sitemap). Helpful, reviewed health content is what earns rankings over time.

## 7. Things to finish on the site (they affect trust and ranking)

Health sites are judged on trust (Google's "YMYL" and E-E-A-T rules). Before pushing for traffic:

- Replace the interim emblem with the approved logo (`public/brand/`, `site.brand` in `config/site.ts`).
- Replace the stand-in photos with real photos of AyuDisha's work.
- Complete and approve the Privacy Policy and Terms (`data/legal.ts`), then set `site.legal.approved = true`. They then enter the sitemap automatically.
- Add real, verified practitioners with qualifications (`data/practitioners.ts`).
- Get the therapy pages clinically reviewed and set `reviewStatus: "reviewed"`.
- Connect a database so the enquiry forms work (README, "Owner actions").

## 8. Ongoing (monthly, about 15 minutes)

- Search Console → **Performance**: check which searches show the site, then improve the pages that get impressions but few clicks.
- Search Console → **Indexing → Pages**: fix any new "Not found (404)" or "Server error" items.
- After adding a page, it appears in the sitemap automatically. Use URL inspection → **Request indexing** to speed it up.

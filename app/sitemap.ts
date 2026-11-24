import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { therapies } from "@/data/therapies";
import { resources } from "@/data/resources";
import { practitioners } from "@/data/practitioners";
import { env } from "@/lib/env";

/** Public, published routes only: no thank-you, demo profiles, drafts or unapproved legal pages. */
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "/",
    "/find-care",
    "/therapies",
    ...therapies.map((t) => `/therapies/${t.slug}`),
    "/practitioners",
    ...practitioners.filter((p) => p.isPublished && p.isVerified && !p.isDemo).map((p) => `/practitioners/${p.slug}`),
    "/consultation",
    "/about",
    "/join-practitioner",
    "/contact",
    "/resources",
    ...resources.filter((r) => r.reviewStatus === "reviewed").map((r) => `/resources/${r.slug}`),
    "/faq",
    "/disclaimer",
    ...(site.legal.approved ? ["/privacy-policy", "/terms"] : []),
  ];
  return paths.map((p) => ({ url: `${env.siteUrl}${p === "/" ? "" : p}`, changeFrequency: "monthly", priority: p === "/" ? 1 : 0.7 }));
}

import { createElement } from "react";
import { site } from "@/config/site";
import { env } from "./env";

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    url: env.siteUrl,
    logo: `${env.siteUrl}/icon.svg`,
    slogan: site.tagline,
    description:
      "AyuDisha is a digital platform that helps people explore holistic and complementary healthcare options and connect with practitioners for consultations.",
    email: site.contact.email,
    telephone: site.contact.phoneHref.replace("tel:", ""),
    sameAs: [site.social.instagram.href, site.social.facebook.href],
    areaServed: { "@type": "Country", name: "India" },
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    url: env.siteUrl,
    inLanguage: "en-IN",
  };
}

export function breadcrumbJsonLd(items: { label: string; href: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.label,
      item: `${env.siteUrl}${c.href === "/" ? "" : c.href}`,
    })),
  };
}

export function faqJsonLd(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((i) => ({ "@type": "Question", name: i.q, acceptedAnswer: { "@type": "Answer", text: i.a } })),
  };
}

export function JsonLd({ data }: { data: object }) {
  return createElement("script", {
    type: "application/ld+json",
    dangerouslySetInnerHTML: { __html: JSON.stringify(data).replace(/</g, "\\u003c") },
  });
}

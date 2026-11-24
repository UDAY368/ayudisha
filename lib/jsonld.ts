import { createElement } from "react";
import { site } from "@/config/site";
import { env } from "./env";

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${env.siteUrl}/#organization`,
    name: site.name,
    alternateName: ["Ayudisha", site.telugu, site.hindi],
    url: env.siteUrl,
    logo: { "@type": "ImageObject", url: `${env.siteUrl}/logo.png`, width: 512, height: 512 },
    image: `${env.siteUrl}/opengraph-image`,
    slogan: site.tagline,
    description:
      "AyuDisha is a digital platform that helps people explore holistic and complementary healthcare options and connect with practitioners for consultations.",
    email: site.contact.email,
    telephone: site.contact.phoneHref.replace("tel:", ""),
    sameAs: [site.social.instagram.href, site.social.facebook.href],
    areaServed: { "@type": "Country", name: "India" },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      telephone: site.contact.phoneHref.replace("tel:", ""),
      email: site.contact.email,
      areaServed: "IN",
    },
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${env.siteUrl}/#website`,
    name: site.name,
    alternateName: ["Ayudisha", "AyuDisha – Your Path to Natural Wellbeing"],
    url: `${env.siteUrl}/`,
    inLanguage: "en-IN",
    publisher: { "@id": `${env.siteUrl}/#organization` },
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

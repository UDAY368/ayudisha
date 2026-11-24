import type { Metadata } from "next";
import { site } from "@/config/site";
import { env } from "./env";

export function buildMetadata({
  title,
  description,
  path,
  noindex = false,
  absoluteTitle = false,
}: {
  title: string;
  description: string;
  path: string;
  noindex?: boolean;
  absoluteTitle?: boolean;
}): Metadata {
  const index = env.isProductionSite && !noindex;
  return {
    title: absoluteTitle ? { absolute: title } : { absolute: title },
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: site.locale,
      siteName: site.name,
      url: path,
      title,
      description,
    },
    twitter: { card: "summary_large_image", title, description },
    robots: index ? { index: true, follow: true } : { index: false, follow: !noindex },
  };
}

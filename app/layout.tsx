import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { site } from "@/config/site";
import { env } from "@/lib/env";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(env.siteUrl),
  title: { default: "AyuDisha – Your Path to Natural Wellbeing", template: "%s" },
  description:
    "Explore Ayurveda, physiotherapy, naturopathy and chiropractic care. AyuDisha helps you connect with healthcare practitioners and request consultation guidance.",
  applicationName: site.name,
  openGraph: { locale: site.locale, siteName: site.name, type: "website" },
  twitter: { card: "summary_large_image" },
  robots: env.isProductionSite ? { index: true, follow: true } : { index: false, follow: false },
  formatDetection: { telephone: false },
  ...(env.googleSiteVerification ? { verification: { google: env.googleSiteVerification } } : {}),
};

export const viewport: Viewport = {
  themeColor: "#234C3D",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={`${cormorant.variable} ${manrope.variable}`} suppressHydrationWarning>
      <head>
        {/* Enables JS-only entrance states; without JS all content stays visible */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>{children}</body>
    </html>
  );
}

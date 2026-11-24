/**
 * Server-side environment flags. Never import secrets from here into client components;
 * only booleans derived from it are passed down as props.
 */
export const env = {
  isDev: process.env.NODE_ENV !== "production",
  siteUrl: (process.env.SITE_URL || "https://www.ayudisha.in").replace(/\/$/, ""),
  /** Only "production" is indexable. Preview and staging builds are noindex. */
  isProductionSite: process.env.SITE_ENV === "production",
  enableWhatsApp: process.env.ENABLE_WHATSAPP === "true",
  hasDatabase: Boolean(process.env.DATABASE_URL),
  hasEmailProvider: Boolean(process.env.EMAIL_PROVIDER_API_KEY && process.env.ENQUIRY_NOTIFICATION_EMAIL),
  /** Optional Search Console HTML-tag token (only needed for a URL-prefix property). */
  googleSiteVerification: process.env.GOOGLE_SITE_VERIFICATION || undefined,
  hashSalt: process.env.HASH_SALT || "ayudisha-dev-salt",
};

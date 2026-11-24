import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileActionBar } from "@/components/layout/MobileActionBar";

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mobile-bar-space">
      <a
        href="#main"
        className="sr-only z-50 rounded-full bg-forest px-5 py-3 font-semibold text-ivory focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>
      <Header />
      <main id="main" tabIndex={-1} className="outline-none">
        {children}
      </main>
      <Footer />
      <MobileActionBar />
    </div>
  );
}

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ButtonLink } from "@/components/ui/primitives";
import { DishaLine } from "@/components/ui/DishaLine";

export const metadata = { title: "Page not found | AyuDisha", robots: { index: false } };

export default function NotFound() {
  return (
    <>
      <Header />
      <main id="main" className="relative overflow-hidden">
        <div className="wrap flex min-h-[70vh] flex-col items-center justify-center py-24 text-center">
          <div className="relative grid h-56 w-56 place-items-center">
            <DishaLine className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet" d={["M74 9.5A44 44 0 1 1 30 8.8", "M20 70C35 80 55 60 80 72"]} />
            <span className="font-display text-7xl italic text-forest">404</span>
          </div>
          <h1 className="t-h2 mt-10 max-w-xl">Let&rsquo;s get you back on the right path.</h1>
          <p className="t-lead mt-4 max-w-lg">The page you were looking for has moved or doesn&rsquo;t exist.</p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/">Back to Home</ButtonLink>
            <ButtonLink href="/find-care" variant="secondary" arrow>
              Find Care
            </ButtonLink>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

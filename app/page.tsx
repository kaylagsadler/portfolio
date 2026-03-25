'use client';

import Button from "./design-system/components/react/Button";
import Navbar from "./design-system/components/react/Navbar";
import { usePageVisible } from "./hooks/usePageVisible";
import './design-system/components/tag.css';

export default function Home() {
  const visible = usePageVisible();
  const r = (cls: string) => visible ? `hero-reveal ${cls}` : 'opacity-0';

  return (
    <div className="flex min-h-screen flex-col bg-[var(--color-gray-010)] font-sans">
      <Navbar visible={visible} />

      <main className="flex w-full max-w-[1440px] mx-auto flex-col gap-16 px-16 py-20">
        <div className="flex flex-col">
          <div className="flex flex-col gap-6">

            {/* Row 1 — tag */}
            <div className={`tag self-start ${r('hero-reveal-1')}`}>
              <span className="tag__icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <circle cx="12.1" cy="12.1" r="2" fill="var(--color-teal-500)" className="tag__dot" />
                </svg>
              </span>
              <span className="tag__text">Currently building</span>
            </div>

            {/* Row 2 — h1 */}
            <div className={r('hero-reveal-2')}>
              <h1 className="font-display-d2 text-[var(--color-gray-900)]">
                Something good is{' '}
                <span className="text-[var(--color-teal-500)]">on its way</span>
              </h1>
            </div>

            <div className={`flex flex-col gap-4 ${r('hero-reveal-3')}`}>
              <p className="font-heading-default-h4 text-[var(--color-gray-400)] max-w-[699px]">
                My portfolio is in progress. I&apos;m a product designer who writes her own code, and I&apos;m building this from scratch with React and Next.js.
              </p>
              <p className="font-heading-default-h4 text-[var(--color-gray-900)] max-w-[699px]">
                Feel free to poke around while it takes shape.{' '}
                <span className="text-[var(--color-gray-400)]">Full case studies dropping soon.</span>
              </p>
            </div>

          </div>

          {/* Row 3 — byline */}
          <p className={`font-mono-m1 italic text-[var(--color-gray-300)] mt-[22px] ${r('hero-reveal-4')}`}>
            // KAYLA SADLER · PRODUCT DESIGNER &amp; FRONTEND ENGINEER
          </p>
        </div>

        {/* Row 4 — buttons */}
        <div className="flex items-center gap-6">
          <div className={r('hero-reveal-5')}>
            <Button size="large" variant="primary">
              View recent work || coming soon
            </Button>
          </div>
          <div className={r('hero-reveal-6')}>
            <Button size="large" variant="secondary">
              Get in touch
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
"use client";

import { useCallback, useState } from "react";
import Link from "next/link";
import { Shader, Swirl, ChromaFlow, FlutedGlass, FilmGrain } from "shaders/react";
import { Navigation } from "./Navbar";
import { IntroAnimation } from "./intro-animation";
import { BOOK_DEMO_URL } from "@/app/lib/links";

/* ─── Starburst SVG partner icon ───────────────────────────── */
const StarburstIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" className={className}>
    <path d="m19.6 66.5 19.7-11 .3-1-.3-.5h-1l-3.3-.2-11.2-.3L14 53l-9.5-.5-2.4-.5L0 49l.2-1.5 2-1.3 2.9.2 6.3.5 9.5.6 6.9.4L38 49.1h1.6l.2-.7-.5-.4-.4-.4L29 41l-10.6-7-5.6-4.1-3-2-1.5-2-.6-4.2 2.7-3 3.7.3.9.2 3.7 2.9 8 6.1L37 36l1.5 1.2.6-.4.1-.3-.7-1.1L33 25l-6-10.4-2.7-4.3-.7-2.6c-.3-1-.4-2-.4-3l3-4.2L28 0l4.2.6L33.8 2l2.6 6 4.1 9.3L47 29.9l2 3.8 1 3.4.3 1h.7v-.5l.5-7.2 1-8.7 1-11.2.3-3.2 1.6-3.8 3-2L61 2.6l2 2.9-.3 1.8-1.1 7.7L59 27.1l-1.5 8.2h.9l1-1.1 4.1-5.4 6.9-8.6 3-3.5L77 13l2.3-1.8h4.3l3.1 4.7-1.4 4.9-4.4 5.6-3.7 4.7-5.3 7.1-3.2 5.7.3.4h.7l12-2.6 6.4-1.1 7.6-1.3 3.5 1.6.4 1.6-1.4 3.4-8.2 2-9.6 2-14.3 3.3-.2.1.2.3 6.4.6 2.8.2h6.8l12.6 1 3.3 2 1.9 2.7-.3 2-5.1 2.6-6.8-1.6-16-3.8-5.4-1.3h-.8v.4l4.6 4.5 8.3 7.5L89 80.1l.5 2.4-1.3 2-1.4-.2-9.2-7-3.6-3-8-6.8h-.5v.7l1.8 2.7 9.8 14.7.5 4.5-.7 1.4-2.6 1-2.7-.6-5.8-8-6-9-4.7-8.2-.5.4-2.9 30.2-1.3 1.5-3 1.2-2.5-2-1.4-3 1.4-6.2 1.6-8 1.3-6.4 1.2-7.9.7-2.6v-.2H49L43 72l-9 12.3-7.2 7.6-1.7.7-3-1.5.3-2.8L24 86l10-12.8 6-7.9 4-4.6-.1-.5h-.3L17.2 77.4l-4.7.6-2-2 .2-3 1-1 8-5.5Z" fill="currentColor" />
  </svg>
);

function RollButton({ label }: { label: string }) {
  return (
    <Link
      href={BOOK_DEMO_URL}
      className="group relative inline-flex h-11 items-center justify-center overflow-hidden rounded-[4px] px-5 sm:px-6 text-[13px] sm:text-[14px] font-medium bg-[#ff5f03] text-white transition-colors hover:bg-[#e55503]"
    >
      <span className="relative block h-[1.2em] overflow-hidden leading-[1.2em]">
        <span className="block transition-transform duration-300 ease-out group-hover:-translate-y-full">
          {label}
        </span>
        <span className="absolute inset-0 block translate-y-full transition-transform duration-300 ease-out group-hover:translate-y-0">
          {label}
        </span>
      </span>
    </Link>
  );
}

/* ─── Main Hero ────────────────────────────────────────────── */
export default function HeroSection() {
  const [heroReady, setHeroReady] = useState(false);
  const handleIntroDone = useCallback(() => setHeroReady(true), []);

  const reveal = (delayMs: number) => ({
    opacity: heroReady ? 1 : 0,
    filter: heroReady ? "blur(0px)" : "blur(20px)",
    transform: heroReady ? "translateY(0px)" : "translateY(28px)",
    transition: `opacity 1s cubic-bezier(0.16,1,0.3,1) ${delayMs}ms, filter 1s cubic-bezier(0.16,1,0.3,1) ${delayMs}ms, transform 1s cubic-bezier(0.16,1,0.3,1) ${delayMs}ms`,
  });

  return (
    <div className="relative min-h-screen bg-white flex flex-col overflow-hidden">
      {/* ── ENTROPIA letter intro ── */}
      <IntroAnimation onDone={handleIntroDone} />

      {/* ── Shader background ── */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <Shader style={{ width: "100%", height: "100%" }}>
          <Swirl colorA="#ffffff" colorB="#f0f0f0" detail={1.7} />
          <ChromaFlow
            baseColor="#ffffff"
            downColor="#ff5f03"
            leftColor="#ff5f03"
            rightColor="#ff5f03"
            upColor="#ff5f03"
            momentum={13}
            radius={3.5}
          />
          <FlutedGlass
            aberration={0.61}
            angle={31}
            frequency={8}
            highlight={0.12}
            highlightSoftness={0}
            lightAngle={-90}
            refraction={4}
            shape="rounded"
            softness={1}
            speed={0.15}
          />
          <FilmGrain strength={0.05} />
        </Shader>
      </div>

      <Navigation />

      {/* ── Hero content (centered) ── */}
      <div className="relative z-20 flex-1 flex flex-col items-center justify-center">
        <div className="max-w-[1440px] mx-auto w-full px-5 sm:px-8 lg:px-12 pt-24 pb-16 text-center">
          {/* Label */}
          <p
            className="text-[13px] sm:text-[14px] text-gray-900 tracking-wide mb-5 sm:mb-8"
            style={reveal(0)}
          >
            Entropia · Kiosk &amp; HRMS
          </p>

          {/* Headline */}
          <h1
            className="font-medium leading-[1.08] tracking-[-0.03em] text-gray-900 mb-8 sm:mb-12 mx-auto max-w-5xl"
            style={{
              fontSize: "clamp(1.75rem, 7vw, 4.2rem)",
              ...reveal(80),
            }}
          >
            Old software is bleeding
            <br className="hidden sm:block" />
            <span className="sm:hidden"> </span>
            your business dry.
            <br className="hidden sm:block" />
            <span className="sm:hidden"> </span>
            Ready to replace the giants?
          </h1>

          {/* CTA row */}
          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5"
            style={reveal(160)}
          >
            <RollButton label="Get a free demo" />

            {/* Social proof badge */}
            <button
              type="button"
              className="group flex items-center gap-2.5 bg-white rounded-[4px] px-3 sm:px-4 py-2.5 transition-all duration-300 cursor-pointer"
              style={{
                boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 16px rgba(0,0,0,0.12)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = "0 2px 8px rgba(0,0,0,0.08)";
              }}
            >
              <StarburstIcon className="w-5 h-5 sm:w-6 sm:h-6 text-[#E8704E] fill-current flex-shrink-0" />
              <span className="text-[13px] sm:text-[14px] font-medium text-gray-900">
                Face Scan · Global Payroll · 45+ Tax Packs
              </span>
              <span
                className="text-white bg-gray-900 rounded px-1.5 sm:px-2 py-0.5 leading-none whitespace-nowrap"
                style={{ fontSize: "10px", lineHeight: "11px" }}
              >
                Live
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

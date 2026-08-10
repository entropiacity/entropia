"use client";

import { usePathname } from "next/navigation";
import { ReactLenis } from "lenis/react";
import "lenis/dist/lenis.css";

export function LenisProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  // Agentic/home landing uses native sticky stacking — Lenis makes scroll feel stuck there.
  const useLenis = pathname !== "/";

  if (!useLenis) {
    return <>{children}</>;
  }

  return (
    <ReactLenis
      root
      options={{
        autoRaf: true,
        duration: 1.05,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.4,
        anchors: true,
        prevent: (node) =>
          node instanceof HTMLElement &&
          !!node.closest("[data-lenis-prevent], .kd-device-wrap, .kd-device-shell"),
      }}
    >
      {children}
    </ReactLenis>
  );
}

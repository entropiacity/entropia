import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/react";
import { IBM_Plex_Sans, Courier_Prime } from "next/font/google";
import { JsonLd } from "./components/json-ld";
import "./globals.css";
import { LenisProvider } from "./components/lenis-provider";
import { globalSchemas } from "./lib/seo-schemas";
import {
  HOME_METADATA,
  LOGO_PATH,
  SITE_LEGAL_NAME,
  SITE_NAME,
  assetUrl,
} from "./lib/seo";

const ibmPlexSans = IBM_Plex_Sans({
  weight: ["300", "400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-ibm-plex-sans",
});

const courierPrime = Courier_Prime({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-pixel",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#111111" },
  ],
};

export const metadata: Metadata = {
  ...HOME_METADATA,
  applicationName: SITE_NAME,
  generator: "Next.js",
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: true,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: LOGO_PATH, type: "image/png" },
    ],
    apple: [{ url: LOGO_PATH, type: "image/png" }],
    shortcut: [LOGO_PATH],
  },
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    title: SITE_NAME,
    statusBarStyle: "default",
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION,
    other: {
      "msvalidate.01": process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION ?? "",
      "facebook-domain-verification": process.env.NEXT_PUBLIC_FACEBOOK_DOMAIN_VERIFICATION ?? "",
    },
  },
  openGraph: {
    ...HOME_METADATA.openGraph,
    images: [
      {
        url: assetUrl("/kiosk.png"),
        width: 1200,
        height: 630,
        alt: "Entropia Kiosk and HRMS software for India",
      },
      {
        url: assetUrl("/hrms.png"),
        width: 1200,
        height: 630,
        alt: "Entropia HRMS face attendance and payroll platform",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-IN" className={`${ibmPlexSans.variable} ${courierPrime.variable}`}>
      <head>
        <link rel="alternate" type="text/plain" href="/llms.txt" title="LLM-readable site summary" />
        <link rel="author" href={assetUrl("/llms.txt")} />
        <meta name="author" content={SITE_LEGAL_NAME} />
        <meta name="copyright" content={SITE_LEGAL_NAME} />
        <meta name="rating" content="general" />
        <meta name="distribution" content="global" />
        <meta name="coverage" content="Worldwide" />
        <meta name="target" content="all" />
        <meta name="HandheldFriendly" content="true" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
      </head>
      <body>
        <JsonLd data={globalSchemas()} />
        <LenisProvider>{children}</LenisProvider>
        <Analytics />
      </body>
    </html>
  );
}

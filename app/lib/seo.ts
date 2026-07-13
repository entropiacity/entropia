import type { Metadata } from "next";
import { SITE_BASE_URL } from "./links";

export const SITE_NAME = "Entropia";
export const SITE_LEGAL_NAME = "Entropia Technologies Pvt. Ltd.";
export const SITE_TAGLINE = "Software built to replace the giants";
export const SITE_EMAIL = "hello@entropia.in";
export const SITE_LOCALE = "en_IN";
export const SITE_COUNTRY = "IN";

export const DEFAULT_OG_IMAGE = "/kiosk.png";
export const DEFAULT_TWITTER_IMAGE = "/kiosk.png";
export const LOGO_PATH = "/logo.png";

export const SITE_KEYWORDS = [
  "Entropia",
  "Entropia Technologies",
  "Entropia Kiosk",
  "Entropia HRMS",
  "restaurant kiosk software India",
  "self ordering kiosk",
  "PetPooja kiosk integration",
  "UEngage alternative",
  "UEngage replacement",
  "restaurant POS kiosk",
  "UPI kiosk payments",
  "Razorpay kiosk checkout",
  "HRMS software India",
  "face attendance software",
  "face scan attendance",
  "payroll software India",
  "PagarBook alternative",
  "PagarBook replacement",
  "EPF payroll software",
  "ESIC compliance software",
  "TDS payroll automation",
  "multi branch HRMS",
  "restaurant technology India",
  "QSR self ordering",
  "food court kiosk",
  "employee attendance system",
  "salary formula engine",
  "one click payroll India",
  "business software India",
  "SaaS kiosk India",
  "white label kiosk software",
] as const;

export type SitemapRoute = {
  path: string;
  changeFrequency: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority: number;
};

export const PUBLIC_ROUTES: readonly SitemapRoute[] = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/kiosk", changeFrequency: "weekly", priority: 0.95 },
  { path: "/hrms", changeFrequency: "weekly", priority: 0.95 },
  { path: "/book", changeFrequency: "monthly", priority: 0.85 },
] as const;

export function absoluteUrl(path = "/"): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  if (normalized === "/") return SITE_BASE_URL;
  return `${SITE_BASE_URL}${normalized}`;
}

export function assetUrl(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_BASE_URL}${normalized}`;
}

type PageSeoInput = {
  title: string;
  description: string;
  path: string;
  keywords?: readonly string[];
  ogImage?: string;
  ogImageAlt?: string;
  noIndex?: boolean;
  type?: "website" | "article";
};

export function createPageMetadata({
  title,
  description,
  path,
  keywords = [],
  ogImage = DEFAULT_OG_IMAGE,
  ogImageAlt,
  noIndex = false,
  type = "website",
}: PageSeoInput): Metadata {
  const canonical = absoluteUrl(path);
  const image = assetUrl(ogImage);
  const mergedKeywords = [...new Set([...SITE_KEYWORDS, ...keywords])];
  const fullTitle = title;

  return {
    title: {
      default: fullTitle,
      template: `%s | ${SITE_NAME}`,
    },
    description,
    keywords: mergedKeywords,
    authors: [{ name: SITE_LEGAL_NAME, url: SITE_BASE_URL }],
    creator: SITE_LEGAL_NAME,
    publisher: SITE_LEGAL_NAME,
    category: "technology",
    metadataBase: new URL(SITE_BASE_URL),
    alternates: {
      canonical,
      languages: {
        "en-IN": canonical,
        en: canonical,
      },
    },
    robots: noIndex
      ? {
          index: false,
          follow: false,
          nocache: true,
          googleBot: {
            index: false,
            follow: false,
          },
        }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
    openGraph: {
      type,
      locale: SITE_LOCALE,
      url: canonical,
      siteName: SITE_NAME,
      title: fullTitle,
      description,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: ogImageAlt ?? `${SITE_NAME} product preview`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image],
      creator: "@entropia",
      site: "@entropia",
    },
    other: {
      "geo.region": "IN",
      "geo.placename": "India",
      "content-language": "en-IN",
      "apple-mobile-web-app-title": SITE_NAME,
      "application-name": SITE_NAME,
      "msapplication-TileColor": "#111111",
      "theme-color": "#ffffff",
    },
  };
}

export const HOME_METADATA = createPageMetadata({
  title: `${SITE_NAME} | ${SITE_TAGLINE}`,
  description:
    "Entropia builds modern restaurant kiosk and HRMS software for India. Replace UEngage and PagarBook with PetPooja-native self-ordering, face scan attendance, one-click payroll, EPF, ESIC, and TDS automation at 60 to 80% lower cost.",
  path: "/",
  keywords: [
    "replace UEngage",
    "replace PagarBook",
    "restaurant software stack India",
    "kiosk and HRMS platform",
  ],
  ogImage: "/kiosk.png",
  ogImageAlt: "Entropia Kiosk and HRMS software for restaurants and growing businesses in India",
});

export const KIOSK_METADATA = createPageMetadata({
  title: "Entropia Kiosk System | Self-Ordering for Restaurants",
  description:
    "PetPooja-integrated self-ordering kiosks with UPI and card payments, custom branding, kitchen sync, and live analytics. Replace UEngage at up to 30x lower cost. Plans from Rs 999 per outlet per month.",
  path: "/kiosk",
  keywords: [
    "PetPooja kiosk",
    "restaurant self ordering kiosk India",
    "QSR kiosk software",
    "kiosk UPI payments",
    "kitchen display integration",
  ],
  ogImage: "/kiosk.png",
  ogImageAlt: "Entropia self-ordering restaurant kiosk integrated with PetPooja and Razorpay",
});

export const HRMS_METADATA = createPageMetadata({
  title: "Entropia HRMS | Face Attendance to Payroll in One Click",
  description:
    "AI face scan attendance, live salary formulas, one-click payroll, and automated EPF, ESIC, and TDS for Indian teams. Replace PagarBook at 70% lower cost. Plans from Rs 99 per employee per month.",
  path: "/hrms",
  keywords: [
    "face recognition attendance India",
    "payroll automation India",
    "statutory compliance HRMS",
    "multi branch payroll software",
    "formula based salary engine",
  ],
  ogImage: "/hrms.png",
  ogImageAlt: "Entropia HRMS dashboard with face scan attendance and automated payroll",
});

export const BOOK_METADATA = createPageMetadata({
  title: "Book a Demo | Entropia Kiosk and HRMS",
  description:
    "Schedule a free 15-minute walkthrough of Entropia Kiosk or HRMS. See PetPooja sync, UPI checkout, face scan attendance, and payroll automation on your real use case with zero sales pressure.",
  path: "/book",
  keywords: [
    "book Entropia demo",
    "kiosk software demo India",
    "HRMS demo India",
    "schedule product walkthrough",
  ],
  ogImage: "/logo.png",
  ogImageAlt: "Book a free Entropia product demo",
});

export const THANKYOU_METADATA = createPageMetadata({
  title: "Thank You | Entropia Kiosk Demo",
  description:
    "Thanks for completing the Entropia kiosk demo. Book a call to bring PetPooja-native self-ordering, UPI payments, and branded kiosk flows to your restaurant locations.",
  path: "/thankyou",
  keywords: ["Entropia kiosk demo complete", "restaurant kiosk onboarding"],
  ogImage: "/kiosk.png",
  ogImageAlt: "Entropia kiosk demo thank you page",
  noIndex: true,
});

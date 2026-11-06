import { BLOG_POSTS, type BlogPost } from "./blog-data";
import { ALL_FAQS, SITE_FAQS, type FaqItem } from "./faq-data";
import {
  SITE_COUNTRY,
  SITE_EMAIL,
  SITE_LEGAL_NAME,
  SITE_NAME,
  absoluteUrl,
  assetUrl,
} from "./seo";

type JsonLd = Record<string, unknown>;

function organizationSchema(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${absoluteUrl("/")}#organization`,
    name: SITE_NAME,
    legalName: SITE_LEGAL_NAME,
    url: absoluteUrl("/"),
    logo: assetUrl("/logo.png"),
    email: SITE_EMAIL,
    description:
      "Entropia builds modern kiosk and HRMS software for restaurants and growing businesses in India.",
    areaServed: {
      "@type": "Country",
      name: "India",
    },
    address: {
      "@type": "PostalAddress",
      addressCountry: SITE_COUNTRY,
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        email: SITE_EMAIL,
        availableLanguage: ["English", "Hindi"],
        areaServed: SITE_COUNTRY,
      },
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        email: SITE_EMAIL,
        availableLanguage: ["English", "Hindi"],
        areaServed: SITE_COUNTRY,
      },
    ],
    sameAs: [
      "https://x.com/entropiacity",
      "https://www.linkedin.com/company/entropiacity",
      "https://www.instagram.com/entropiacity",
      "https://www.youtube.com/@entropiacity",
    ],
    knowsAbout: [
      "Restaurant kiosk software",
      "PetPooja integration",
      "Self-ordering systems",
      "HRMS software",
      "Face attendance",
      "Payroll automation",
      "EPF compliance",
      "ESIC compliance",
      "TDS filing",
    ],
  };
}

function websiteSchema(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${absoluteUrl("/")}#website`,
    name: SITE_NAME,
    url: absoluteUrl("/"),
    description:
      "Official website for Entropia Kiosk and Entropia HRMS. Book demos, compare pricing, and explore product features.",
    publisher: {
      "@id": `${absoluteUrl("/")}#organization`,
    },
    inLanguage: "en-IN",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${absoluteUrl("/")}?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

function breadcrumbSchema(items: { name: string; path: string }[]): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

function faqEntities(faqs: readonly FaqItem[]) {
  return faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  }));
}

function faqPageSchema(faqs: readonly FaqItem[] = SITE_FAQS, path = "/"): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${absoluteUrl(path)}#faq`,
    url: absoluteUrl(path),
    mainEntity: faqEntities(faqs),
  };
}

function blogPostingSchema(post: BlogPost): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${absoluteUrl(`/blog/${post.slug}`)}#article`,
    headline: post.title,
    description: post.description,
    image: assetUrl(post.ogImage),
    datePublished: post.date,
    dateModified: post.updated,
    author: {
      "@type": "Organization",
      name: SITE_LEGAL_NAME,
      url: absoluteUrl("/"),
    },
    publisher: {
      "@id": `${absoluteUrl("/")}#organization`,
    },
    mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`),
    keywords: post.keywords.join(", "),
    articleSection: post.category,
    inLanguage: "en-IN",
  };
}

function blogListSchema(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${absoluteUrl("/blog")}#blog`,
    name: "Entropia Blog",
    url: absoluteUrl("/blog"),
    description:
      "Guides on restaurant kiosk software, HRMS, PetPooja integration, and Indian payroll compliance.",
    publisher: {
      "@id": `${absoluteUrl("/")}#organization`,
    },
    blogPost: BLOG_POSTS.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      url: absoluteUrl(`/blog/${post.slug}`),
      datePublished: post.date,
      dateModified: post.updated,
    })),
  };
}

function kioskSoftwareSchema(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": `${absoluteUrl("/kiosk")}#software`,
    name: "Entropia Kiosk System",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web, Android, Windows",
    url: absoluteUrl("/kiosk"),
    image: assetUrl("/kiosk.png"),
    description:
      "Self-ordering kiosk software for restaurants with native PetPooja integration, Razorpay UPI and card payments, custom branding, and real-time order analytics.",
    offers: {
      "@type": "Offer",
      price: "99999",
      priceCurrency: "INR",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: "99999",
        priceCurrency: "INR",
        unitText: "one-time license",
      },
      availability: "https://schema.org/InStock",
      url: absoluteUrl("/book"),
    },
    featureList: [
      "Self-ordering kiosk flow",
      "PetPooja POS integration",
      "UPI and card payments via Razorpay",
      "Custom branding and UI",
      "Multi-terminal support",
      "Real-time order analytics",
      "Kitchen ticket automation",
    ],
    provider: {
      "@id": `${absoluteUrl("/")}#organization`,
    },
  };
}

function hrmsSoftwareSchema(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": `${absoluteUrl("/hrms")}#software`,
    name: "Entropia HRMS",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web, Android, iOS",
    url: absoluteUrl("/hrms"),
    image: assetUrl("/hrms.png"),
    description:
      "HRMS platform with AI face scan attendance, formula-based payroll, and automated EPF, ESIC, and TDS compliance for Indian businesses.",
    offers: {
      "@type": "Offer",
      price: "34999",
      priceCurrency: "INR",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: "34999",
        priceCurrency: "INR",
        unitText: "one-time license",
      },
      availability: "https://schema.org/InStock",
      url: absoluteUrl("/book"),
    },
    featureList: [
      "Face scan attendance",
      "Automatic attendance marking",
      "Custom salary formulas",
      "One-click payroll",
      "EPF automation",
      "ESIC automation",
      "TDS automation",
      "Multi-branch dashboard",
    ],
    provider: {
      "@id": `${absoluteUrl("/")}#organization`,
    },
  };
}

function webPageSchema({
  path,
  name,
  description,
}: {
  path: string;
  name: string;
  description: string;
}): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${absoluteUrl(path)}#webpage`,
    url: absoluteUrl(path),
    name,
    description,
    isPartOf: {
      "@id": `${absoluteUrl("/")}#website`,
    },
    about: {
      "@id": `${absoluteUrl("/")}#organization`,
    },
    inLanguage: "en-IN",
  };
}

export function globalSchemas(): JsonLd[] {
  return [organizationSchema(), websiteSchema()];
}

export function homePageSchemas(): JsonLd[] {
  return [
    webPageSchema({
      path: "/",
      name: "Entropia | Software built to replace the giants",
      description:
        "Entropia replaces UEngage and PagarBook with modern kiosk and HRMS software for India.",
    }),
    faqPageSchema(),
    kioskSoftwareSchema(),
    hrmsSoftwareSchema(),
  ];
}

export function kioskPageSchemas(): JsonLd[] {
  return [
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Kiosk System", path: "/kiosk" },
    ]),
    webPageSchema({
      path: "/kiosk",
      name: "Entropia Kiosk System",
      description:
        "Self-ordering kiosk software for restaurants with PetPooja integration and UPI payments.",
    }),
    kioskSoftwareSchema(),
  ];
}

export function hrmsPageSchemas(): JsonLd[] {
  return [
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "HRMS", path: "/hrms" },
    ]),
    webPageSchema({
      path: "/hrms",
      name: "Entropia HRMS",
      description:
        "Face scan attendance and automated payroll software for Indian teams.",
    }),
    hrmsSoftwareSchema(),
  ];
}

export function bookPageSchemas(): JsonLd[] {
  return [
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Book a Demo", path: "/book" },
    ]),
    webPageSchema({
      path: "/book",
      name: "Book a Demo",
      description: "Schedule a free Entropia product walkthrough.",
    }),
  ];
}

export function faqRouteSchemas(): JsonLd[] {
  return [
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "FAQ", path: "/faq" },
    ]),
    webPageSchema({
      path: "/faq",
      name: "Entropia FAQ",
      description:
        "Frequently asked questions about Entropia Kiosk, HRMS, pricing, and migration.",
    }),
    faqPageSchema(ALL_FAQS, "/faq"),
  ];
}

export function blogIndexSchemas(): JsonLd[] {
  return [
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Blog", path: "/blog" },
    ]),
    webPageSchema({
      path: "/blog",
      name: "Entropia Blog",
      description: "Insights on kiosk, HRMS, and restaurant technology in India.",
    }),
    blogListSchema(),
  ];
}

export function blogPostSchemas(post: BlogPost): JsonLd[] {
  return [
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Blog", path: "/blog" },
      { name: post.title, path: `/blog/${post.slug}` },
    ]),
    blogPostingSchema(post),
  ];
}

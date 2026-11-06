import type { MetadataRoute } from "next";
import { SITE_BASE_URL } from "./lib/links";

const AI_CRAWLERS = [
  "GPTBot",
  "ChatGPT-User",
  "OAI-SearchBot",
  "ClaudeBot",
  "Claude-Web",
  "anthropic-ai",
  "PerplexityBot",
  "Google-Extended",
  "Applebot-Extended",
  "Bytespider",
  "CCBot",
  "cohere-ai",
  "meta-externalagent",
  "FacebookBot",
  "Diffbot",
  "YouBot",
  "Amazonbot",
] as const;

const DISALLOW = ["/api/", "/_next/", "/thankyou"];

export default function robots(): MetadataRoute.Robots {
  const sitemap = `${SITE_BASE_URL}/sitemap.xml`;

  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/llms.txt", "/blog", "/faq", "/kiosk", "/hrms", "/book"],
        disallow: DISALLOW,
      },
      ...AI_CRAWLERS.map((userAgent) => ({
        userAgent,
        allow: ["/", "/llms.txt", "/blog", "/faq", "/kiosk", "/hrms", "/book"],
        disallow: DISALLOW,
      })),
    ],
    sitemap,
    host: SITE_BASE_URL,
  };
}

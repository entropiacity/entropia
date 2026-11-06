import type { MetadataRoute } from "next";
import { BLOG_POSTS } from "./lib/blog-data";
import { PUBLIC_ROUTES, absoluteUrl } from "./lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = PUBLIC_ROUTES.map((route) => ({
    url: absoluteUrl(route.path),
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const blogRoutes: MetadataRoute.Sitemap = BLOG_POSTS.map((post) => ({
    url: absoluteUrl(`/blog/${post.slug}`),
    lastModified: new Date(post.updated),
    changeFrequency: "monthly",
    priority: 0.75,
  }));

  return [
    ...staticRoutes,
    ...blogRoutes,
    {
      url: absoluteUrl("/llms.txt"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.5,
    },
  ];
}

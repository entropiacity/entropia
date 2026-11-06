import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "../components/footer";
import { JsonLd } from "../components/json-ld";
import { PageGrid } from "../components/page-grid";
import { SiteNavbar } from "../components/site-navbar";
import { BLOG_POSTS } from "../lib/blog-data";
import { BLOG_METADATA } from "../lib/seo";
import { blogIndexSchemas } from "../lib/seo-schemas";

export const metadata: Metadata = BLOG_METADATA;

export default function BlogIndexPage() {
  const posts = [...BLOG_POSTS].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  return (
    <PageGrid>
      <JsonLd data={blogIndexSchemas()} />
      <SiteNavbar />

      <main className="section-grid-lines" style={{ background: "#fff", padding: "120px 0 80px" }}>
        <div className="section-shell">
          <p style={{ fontSize: 13, fontWeight: 500, color: "#888", margin: "0 0 12px" }}>Blog</p>
          <h1
            style={{
              fontSize: "clamp(36px, 5vw, 56px)",
              lineHeight: 1.08,
              letterSpacing: -1.5,
              margin: "0 0 16px",
              fontWeight: 500,
              color: "#111",
              maxWidth: 760,
            }}
          >
            Kiosk, HRMS, and industry playbooks for India
          </h1>
          <p style={{ fontSize: 17, lineHeight: 1.55, color: "#555", maxWidth: 640, margin: "0 0 48px" }}>
            SEO, GEO, and AEO-ready guides on UEngage and PagarBook alternatives, PetPooja sync, face attendance, and payroll compliance.
          </p>

          <div style={{ display: "grid", gap: 16 }}>
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                style={{
                  display: "block",
                  border: "1px solid rgba(0,0,0,0.09)",
                  borderRadius: 16,
                  padding: "22px 24px",
                  textDecoration: "none",
                  background: "#fff",
                }}
              >
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 10, alignItems: "center" }}>
                  <span style={{ fontSize: 12, fontWeight: 500, color: "#666" }}>{post.category}</span>
                  <span style={{ fontSize: 12, color: "#bbb" }}>·</span>
                  <time dateTime={post.date} style={{ fontSize: 12, color: "#888" }}>
                    {post.date}
                  </time>
                  <span style={{ fontSize: 12, color: "#bbb" }}>·</span>
                  <span style={{ fontSize: 12, color: "#888" }}>{post.readingMinutes} min read</span>
                </div>
                <h2 style={{ fontSize: 22, letterSpacing: -0.5, margin: "0 0 8px", fontWeight: 500, color: "#111" }}>
                  {post.title}
                </h2>
                <p style={{ margin: 0, fontSize: 15, lineHeight: 1.55, color: "#555" }}>{post.excerpt}</p>
              </Link>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </PageGrid>
  );
}

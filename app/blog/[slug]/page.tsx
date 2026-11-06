import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer } from "../../components/footer";
import { JsonLd } from "../../components/json-ld";
import { PageGrid } from "../../components/page-grid";
import { SiteNavbar } from "../../components/site-navbar";
import { BLOG_POSTS, getAllSlugs, getPost } from "../../lib/blog-data";
import { BOOK_DEMO_URL } from "../../lib/links";
import { createPageMetadata } from "../../lib/seo";
import { blogPostSchemas } from "../../lib/seo-schemas";

type Params = { slug: string };

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return createPageMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${post.slug}`,
    keywords: post.keywords,
    ogImage: post.ogImage,
    ogImageAlt: post.title,
    type: "article",
  });
}

export default async function BlogPostPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const related = BLOG_POSTS.filter((p) => p.slug !== post.slug && p.category === post.category).slice(0, 3);

  return (
    <PageGrid>
      <JsonLd data={blogPostSchemas(post)} />
      <SiteNavbar />

      <main className="section-grid-lines" style={{ background: "#fff", padding: "120px 0 80px" }}>
        <article className="section-shell" style={{ maxWidth: 760 }}>
          <Link href="/blog" style={{ fontSize: 13, color: "#888", textDecoration: "none", fontWeight: 500 }}>
            ← All posts
          </Link>
          <p style={{ margin: "24px 0 12px", fontSize: 13, color: "#888" }}>
            {post.category} · <time dateTime={post.date}>{post.date}</time> · {post.readingMinutes} min read
          </p>
          <h1
            style={{
              fontSize: "clamp(32px, 4.5vw, 48px)",
              lineHeight: 1.1,
              letterSpacing: -1.2,
              margin: "0 0 18px",
              fontWeight: 500,
              color: "#111",
            }}
          >
            {post.title}
          </h1>
          <p style={{ fontSize: 18, lineHeight: 1.6, color: "#444", margin: "0 0 40px" }}>{post.excerpt}</p>

          {post.sections.map((section) => (
            <section key={section.heading} style={{ marginBottom: 36 }}>
              <h2 style={{ fontSize: 24, letterSpacing: -0.5, margin: "0 0 12px", fontWeight: 500, color: "#111" }}>
                {section.heading}
              </h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 24)} style={{ fontSize: 16, lineHeight: 1.7, color: "#333", margin: "0 0 14px" }}>
                  {paragraph}
                </p>
              ))}
            </section>
          ))}

          <div
            style={{
              marginTop: 48,
              padding: 24,
              borderRadius: 16,
              border: "1px solid rgba(0,0,0,0.09)",
              background: "#fafafa",
            }}
          >
            <p style={{ margin: "0 0 12px", fontSize: 16, fontWeight: 500, color: "#111" }}>
              Ready to see Entropia on your use case?
            </p>
            <Link
              href={BOOK_DEMO_URL}
              style={{
                display: "inline-flex",
                height: 42,
                alignItems: "center",
                padding: "0 16px",
                borderRadius: 10,
                background: "#111",
                color: "#fff",
                textDecoration: "none",
                fontSize: 14,
                fontWeight: 500,
              }}
            >
              Book a free demo →
            </Link>
          </div>

          {related.length > 0 && (
            <section style={{ marginTop: 56 }}>
              <h2 style={{ fontSize: 20, margin: "0 0 16px", fontWeight: 500 }}>Related reading</h2>
              <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "grid", gap: 10 }}>
                {related.map((item) => (
                  <li key={item.slug}>
                    <Link href={`/blog/${item.slug}`} style={{ color: "#111", fontSize: 15, fontWeight: 500 }}>
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </article>
      </main>

      <Footer />
    </PageGrid>
  );
}

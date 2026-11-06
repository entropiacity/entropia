import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "../components/footer";
import { JsonLd } from "../components/json-ld";
import { PageGrid } from "../components/page-grid";
import { SiteNavbar } from "../components/site-navbar";
import { FAQ_CATEGORIES } from "../lib/faq-data";
import { BOOK_DEMO_URL } from "../lib/links";
import { FAQ_METADATA } from "../lib/seo";
import { faqRouteSchemas } from "../lib/seo-schemas";

export const metadata: Metadata = FAQ_METADATA;

export default function FaqPage() {
  return (
    <PageGrid>
      <JsonLd data={faqRouteSchemas()} />
      <SiteNavbar />

      <main className="section-grid-lines" style={{ background: "#fff", padding: "120px 0 80px" }}>
        <div className="section-shell">
          <p style={{ fontSize: 13, fontWeight: 500, color: "#888", margin: "0 0 12px", letterSpacing: 0.2 }}>
            FAQ
          </p>
          <h1
            style={{
              fontSize: "clamp(36px, 5vw, 56px)",
              lineHeight: 1.08,
              letterSpacing: -1.5,
              margin: "0 0 16px",
              fontWeight: 500,
              color: "#111",
              maxWidth: 720,
            }}
          >
            Everything operators ask about Entropia Kiosk and HRMS
          </h1>
          <p style={{ fontSize: 17, lineHeight: 1.55, color: "#555", maxWidth: 640, margin: "0 0 40px" }}>
            Product-specific, industry, pricing, migration, and AI-search ready answers for restaurants and growing Indian teams.
          </p>
          <Link
            href={BOOK_DEMO_URL}
            style={{
              display: "inline-flex",
              alignItems: "center",
              height: 44,
              padding: "0 18px",
              borderRadius: 10,
              background: "#111",
              color: "#fff",
              textDecoration: "none",
              fontSize: 14,
              fontWeight: 500,
              marginBottom: 64,
            }}
          >
            Book a free demo →
          </Link>

          <div style={{ display: "flex", flexDirection: "column", gap: 56 }}>
            {FAQ_CATEGORIES.map((category) => (
              <section key={category.id} id={category.id} style={{ scrollMarginTop: 96 }}>
                <h2 style={{ fontSize: 28, letterSpacing: -0.8, margin: "0 0 8px", fontWeight: 500, color: "#111" }}>
                  {category.title}
                </h2>
                <p style={{ fontSize: 15, color: "#777", margin: "0 0 24px" }}>{category.description}</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {category.items.map((item) => (
                    <details
                      key={item.question}
                      style={{
                        border: "1px solid rgba(0,0,0,0.09)",
                        borderRadius: 14,
                        padding: "16px 18px",
                        background: "#fff",
                      }}
                    >
                      <summary
                        style={{
                          cursor: "pointer",
                          fontSize: 16,
                          fontWeight: 500,
                          color: "#111",
                          letterSpacing: -0.2,
                          listStyle: "none",
                        }}
                      >
                        {item.question}
                      </summary>
                      <p style={{ margin: "12px 0 0", fontSize: 15, lineHeight: 1.6, color: "#444" }}>
                        {item.answer}
                      </p>
                    </details>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </PageGrid>
  );
}

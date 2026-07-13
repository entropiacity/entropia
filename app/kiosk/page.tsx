import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { JsonLd } from "../components/json-ld";
import { Footer } from "../components/footer";
import { KioskAutoplayVideo } from "../components/kiosk-autoplay-video";
import { KioskInteractiveDemoSection } from "../components/kiosk-interactive-demo-section";
import { KioskPricingPlans } from "../components/kiosk-pricing-plans";
import { PageGrid } from "../components/page-grid";
import { SiteNavbar } from "../components/site-navbar";
import { BOOK_DEMO_URL } from "../lib/links";
import { KIOSK_METADATA } from "../lib/seo";
import { kioskPageSchemas } from "../lib/seo-schemas";

export const metadata: Metadata = KIOSK_METADATA;

const SCREENSHOTS = [
  { src: "/kiosk/ss-app1.png", alt: "Kiosk menu browsing screen" },
  { src: "/kiosk/ss-app2.png", alt: "Kiosk order customization screen" },
  { src: "/kiosk/ss-app3.png", alt: "Kiosk checkout screen" },
];

const FEATURES = [
  { title: "Self-Ordering Kiosk", desc: "Customers browse, customize, and pay without waiting in line." },
  { title: "PetPooja POS Integration", desc: "Orders sync in real time to your kitchen display and reports." },
  { title: "Real-time Order Analytics", desc: "Track peak hours, bestsellers, and average order value live." },
  { title: "UPI & Card Payments", desc: "Accept UPI, cards via Razorpay, or pay-at-counter in one checkout flow." },
  { title: "Custom Branding & UI", desc: "Match your restaurant identity with fully branded screens." },
  { title: "Multi-terminal Support", desc: "Run unlimited kiosks across locations from one dashboard." },
];

const INTEGRATIONS = ["PetPooja", "Razorpay", "WhatsApp", "GST Ready"];

const CUSTOMER_STATS = [
  { value: "5L+", label: "monthly order value" },
  { value: "3", label: "stores live" },
  { value: "MP", label: "Madhya Pradesh" },
];

export default function KioskPage() {
  return (
    <PageGrid>
      <JsonLd data={kioskPageSchemas()} />
      <SiteNavbar />

      <main className="kiosk-page">
        {/* Hero */}
        <section className="kiosk-hero section-shell">
          <div className="kiosk-hero-grid">
            <div>
              <div className="availability-badge" style={{ marginBottom: 24 }}>
                <span className="availability-dot" />
                30× cheaper than UEngage
              </div>
              <h1 className="hero-heading" style={{ marginBottom: 20 }}>
                <span className="hero-heading-light">Self-ordering kiosks</span>
                <br />
                <span className="hero-heading-bold">built for restaurants.</span>
              </h1>
              <p className="hero-subtitle" style={{ maxWidth: 440, marginBottom: 32 }}>
                <strong>Replace expensive legacy terminals.</strong>{" "}
                Entropia Kiosk integrates natively with PetPooja, accepts UPI and card payments, and goes live in days.
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 28 }}>
                {INTEGRATIONS.map((label) => (
                  <span key={label} className="kiosk-badge">{label}</span>
                ))}
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
                <Link href={BOOK_DEMO_URL} className="cta-button">
                  <div style={{
                    width: 36, height: 36, borderRadius: "50%",
                    background: "rgba(255,255,255,0.2)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0,
                  }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="4" width="18" height="18" rx="2"/>
                      <path d="M16 2v4M8 2v4M3 10h18"/>
                    </svg>
                  </div>
                  Book a Free Demo
                </Link>
                <Link href="/#pricing" className="kiosk-secondary-cta">
                  View pricing
                </Link>
              </div>
            </div>

            <div className="kiosk-portrait-frame kiosk-hero-phone">
              <Image
                src="/kiosk/ss-app1.png"
                alt="Entropia kiosk menu screen"
                width={1080}
                height={1920}
                priority
                className="kiosk-hero-shot"
              />
            </div>
          </div>
        </section>

        <KioskInteractiveDemoSection />

        {/* Screenshots */}
        <section className="section-grid-lines kiosk-section section-shell">
          <div className="kiosk-section-header">
            <p className="kiosk-eyebrow">Product screens</p>
            <h2 className="kiosk-section-title">
              <span style={{ fontWeight: 400, color: "#b0b0b0" }}>An ordering flow</span>
              <br />
              <span style={{ fontWeight: 500, color: "#111" }}>customers actually enjoy.</span>
            </h2>
          </div>
          <div className="kiosk-screenshots">
            {SCREENSHOTS.map((shot) => (
              <div key={shot.src} className="kiosk-screenshot-card">
                <Image
                  src={shot.src}
                  alt={shot.alt}
                  fill
                  sizes="(max-width: 900px) 100vw, 33vw"
                  style={{ objectFit: "cover" }}
                />
              </div>
            ))}
          </div>
        </section>

        {/* App recording, portrait 1080×1920 */}
        <section className="section-grid-lines kiosk-section section-shell">
          <div className="kiosk-split">
            <div>
              <p className="kiosk-eyebrow">Customer experience</p>
              <h2 className="kiosk-section-title" style={{ marginBottom: 16 }}>
                Browse, customize, pay.
              </h2>
              <p style={{ fontSize: 15, lineHeight: 1.65, color: "#666", maxWidth: 420, margin: 0 }}>
                Intuitive touch flow designed for speed. Customers add items, apply modifiers,
                and complete payment in under a minute with zero staff intervention.
              </p>
            </div>
            <KioskAutoplayVideo
              src="/kiosk/screenrecordingapp.mov"
              label="In-app ordering flow"
              poster="/kiosk/ss-app2.png"
              aspect="portrait"
            />
          </div>
        </section>

        {/* Dashboard recording, landscape */}
        <section className="section-grid-lines kiosk-section section-shell">
          <div className="kiosk-split kiosk-split-reverse">
            <div>
              <p className="kiosk-eyebrow">Owner dashboard</p>
              <h2 className="kiosk-section-title" style={{ marginBottom: 16 }}>
                Every order, every location.
              </h2>
              <p style={{ fontSize: 15, lineHeight: 1.65, color: "#666", maxWidth: 420, margin: "0 0 24px" }}>
                Monitor live orders, revenue trends, and terminal health from a single dashboard.
                Built for operators who run multiple outlets.
              </p>
              <ul className="kiosk-checklist">
                {["Live order feed", "Revenue by hour", "Terminal status", "Menu sync logs"].map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <KioskAutoplayVideo
              src="/kiosk/screenrecordingdashboard.mov"
              label="Analytics dashboard"
              poster="/kiosk/ss-app3.png"
              aspect="landscape"
            />
          </div>
        </section>

        {/* Features */}
        <section className="section-grid-lines kiosk-section section-shell">
          <div className="kiosk-section-header">
            <p className="kiosk-eyebrow">Capabilities</p>
            <h2 className="kiosk-section-title">
              <span style={{ fontWeight: 400, color: "#b0b0b0" }}>Everything you need</span>
              <br />
              <span style={{ fontWeight: 500, color: "#111" }}>to replace UEngage.</span>
            </h2>
          </div>
          <div className="kiosk-features">
            {FEATURES.map((feat) => (
              <div key={feat.title} className="kiosk-feature-card">
                <div className="kiosk-feature-dot" />
                <div>
                  <h3 style={{ fontSize: 16, fontWeight: 500, color: "#111", margin: "0 0 6px", letterSpacing: -0.2 }}>
                    {feat.title}
                  </h3>
                  <p style={{ fontSize: 14, lineHeight: 1.6, color: "#777", margin: 0 }}>
                    {feat.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Customer story, portrait video */}
        <section className="section-grid-lines kiosk-section section-shell">
          <div className="kiosk-testimonial-grid">
            <div>
              <p className="kiosk-eyebrow">Customer story</p>
              <h2 className="kiosk-section-title" style={{ marginBottom: 20 }}>
                <span style={{ fontWeight: 400, color: "#b0b0b0" }}>Trusted by operators</span>
                <br />
                <span style={{ fontWeight: 500, color: "#111" }}>who run at scale.</span>
              </h2>
              <blockquote className="kiosk-quote">
                <strong>Kiosk client</strong> in Madhya Pradesh runs Entropia Kiosk across their outlets.
                Customers order directly from the screen, orders hit PetPooja instantly, and the team
                tracks everything from one dashboard.
              </blockquote>
              <div className="kiosk-stat-row">
                {CUSTOMER_STATS.map((stat) => (
                  <div key={stat.label} className="kiosk-stat">
                    <span className="kiosk-stat-value">{stat.value}</span>
                    <span className="kiosk-stat-label">{stat.label}</span>
                  </div>
                ))}
              </div>
              <p className="kiosk-quote-meta">Kiosk client · Madhya Pradesh</p>
            </div>
            <KioskAutoplayVideo
              src="/kiosk/recordedappvideo.mp4"
              label="Kiosk in action"
              poster="/kiosk/ss-app1.png"
              aspect="portrait"
            />
          </div>
        </section>

        {/* Pricing */}
        <section className="section-grid-lines kiosk-section section-shell">
          <KioskPricingPlans />
        </section>
      </main>

      <Footer />
    </PageGrid>
  );
}

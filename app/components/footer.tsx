"use client";

import Link from "next/link";
import { BOOK_DEMO_URL, HRMS_DEMO_URL } from "../lib/links";

function XIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.259 5.63 5.905-5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function YoutubeIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.54C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
      <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white"/>
    </svg>
  );
}

const SOCIAL = [
  { label: "X", icon: <XIcon />, count: "2,840", href: "https://x.com/entropiacity" },
  { label: "LinkedIn", icon: <LinkedInIcon />, href: "https://www.linkedin.com/company/entropiacity" },
  { label: "Instagram", icon: <InstagramIcon />, href: "https://www.instagram.com/entropiacity" },
  { label: "YouTube", icon: <YoutubeIcon />, href: "https://www.youtube.com/@entropiacity" },
];

function FooterWatermark() {
  return (
    <div className="footer-watermark" aria-hidden>
      <svg
        className="footer-watermark-svg"
        viewBox="0 0 1000 200"
        preserveAspectRatio="xMidYMax meet"
      >
        <text
          x="500"
          y="172"
          textAnchor="middle"
          fontSize="200"
          fontWeight="500"
          fill="#ffffff"
          textLength="980"
          lengthAdjust="spacingAndGlyphs"
          style={{ fontFamily: '"Main", sans-serif' }}
        >
          ENTROPIA
        </text>
      </svg>
    </div>
  );
}

export function Footer() {
  return (
    <footer id="lets-connect" style={{ background: "#000", color: "#fff", overflowX: "clip" }}>
      <div className="footer-shell">

        {/* ── Headline ── */}
        <h2 style={{
          fontSize: "clamp(44px, 6vw, 72px)",
          lineHeight: 1.1,
          letterSpacing: -2.5,
          margin: "0 0 56px",
          fontWeight: 500,
        }}>
          <span style={{ color: "#fff" }}>Lets build the future</span>
          <br />
          <span style={{ color: "rgba(255,255,255,0.35)" }}>of business software.</span>
        </h2>

        {/* ── Contact row ── */}
        <div className="footer-contact-grid" style={{
          marginBottom: 48,
          paddingBottom: 48,
          borderBottom: "1px solid rgba(255,255,255,0.1)",
        }}>
          {/* Email */}
          <div>
            <p style={{ fontSize: 11.5, fontWeight: 500, color: "rgba(255,255,255,0.4)", letterSpacing: 0.3, margin: "0 0 10px" }}>
              Email
            </p>
            <a
              href="mailto:hello@entropiacity.com"
              style={{ fontSize: 16, fontWeight: 500, color: "#fff", textDecoration: "none", letterSpacing: -0.3 }}
            >
              hello@entropiacity.com
            </a>
          </div>

          {/* Book Demo */}
          <div>
            <p style={{ fontSize: 11.5, fontWeight: 500, color: "rgba(255,255,255,0.4)", letterSpacing: 0.3, margin: "0 0 10px" }}>
              Book a Demo
            </p>
            <Link
              href={BOOK_DEMO_URL}
              style={{ fontSize: 16, fontWeight: 500, color: "#fff", textDecoration: "none", letterSpacing: -0.3 }}
            >
              Schedule Now →
            </Link>
          </div>

          {/* Social */}
          <div>
            <p style={{ fontSize: 11.5, fontWeight: 500, color: "rgba(255,255,255,0.4)", letterSpacing: 0.3, margin: "0 0 12px" }}>
              Social
            </p>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              {SOCIAL.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    height: 34,
                    padding: s.count ? "0 10px" : "0",
                    width: s.count ? "auto" : 34,
                    borderRadius: 50,
                    background: "rgba(255,255,255,0.1)",
                    color: "#fff",
                    textDecoration: "none",
                    fontSize: 12,
                    fontWeight: 500,
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  {s.icon}
                  {s.count && <span>{s.count}</span>}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* ── Bottom row ── */}
        <div className="footer-bottom-grid" style={{ paddingBottom: 56, alignItems: "start" }}>
          {/* Products */}
          <div>
            <p style={{ fontSize: 11.5, fontWeight: 500, color: "rgba(255,255,255,0.4)", letterSpacing: 0.3, margin: "0 0 14px" }}>
              Products
            </p>
            <div style={{ display: "flex", gap: 24 }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <a href="/kiosk" style={{ fontSize: 13, color: "rgba(255,255,255,0.7)", textDecoration: "none", fontWeight: 400 }}>
                  Kiosk System
                </a>
                <a href="/hrms" style={{ fontSize: 13, color: "rgba(255,255,255,0.7)", textDecoration: "none", fontWeight: 400 }}>
                  HRMS
                </a>
                <a
                  href={HRMS_DEMO_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontSize: 13, color: "rgba(255,255,255,0.7)", textDecoration: "none", fontWeight: 400 }}
                >
                  HRMS live demo →
                </a>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {["Pricing", "Blog"].map((item) => (
                  <a key={item} href={item === "Pricing" ? "/#pricing" : "#"} style={{ fontSize: 13, color: "rgba(255,255,255,0.7)", textDecoration: "none", fontWeight: 400 }}>
                    {item}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Legal */}
          <div>
            <p style={{ fontSize: 11.5, fontWeight: 500, color: "rgba(255,255,255,0.4)", letterSpacing: 0.3, margin: "0 0 14px" }}>
              Legal
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {["Terms of service", "Privacy Policy"].map((item) => (
                <a key={item} href="#" style={{ fontSize: 13, color: "rgba(255,255,255,0.7)", textDecoration: "none", fontWeight: 400 }}>
                  {item}
                </a>
              ))}
            </div>
          </div>

          {/* Copyright */}
          <div style={{ display: "flex", alignItems: "flex-end", paddingBottom: 2 }}>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.35)", margin: 0, fontWeight: 400 }}>
              © 2026 Entropia Technologies Pvt. Ltd.
            </p>
          </div>
        </div>
      </div>

      <FooterWatermark />
    </footer>
  );
}

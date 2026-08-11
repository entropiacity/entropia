import Link from "next/link";
import { BOOK_DEMO_URL } from "../lib/links";

const ONETIME_FEATURES = [
  "Face scan attendance",
  "Auto attendance marking",
  "Custom salary formulas",
  "One-click payroll from check-ins",
  "Tax packs for 45+ countries",
  "Multi-branch dashboard",
];

const CUSTOM_FEATURES = [
  "Everything in one-time license",
  "Custom rollout across branches",
  "Dedicated onboarding & training",
  "Custom integrations on request",
  "Priority support SLA",
  "Tailored compliance workflows",
];

function PlanCheck({ dark = false }: { dark?: boolean }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={dark ? "rgba(255,255,255,0.5)" : "#bbb"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 1 }}>
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

export function HrmsPricingPlans({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`plans-pricing${compact ? " plans-pricing--compact" : ""}`}>
      <div className="plans-pricing-header">
        <h2 className="plans-pricing-title">Plans and Pricing</h2>
        <p className="plans-pricing-subtitle">
          One-time license or a custom plan for your workforce. No hidden fees.
        </p>
      </div>

      <div className="plans-pricing-grid">
        <article className="plan-card">
          <div className="plan-card-top">
            <div className="plan-card-title-row">
              <h3 className="plan-card-name">One-time License</h3>
              <span className="plan-popular-badge">🔥 Popular</span>
            </div>
            <div className="plan-card-price-row">
              <span className="plan-card-price">$499</span>
            </div>
            <p className="plan-card-billing">One-time license fee</p>
            <p className="plan-card-desc">Full HRMS with face attendance and payroll. Pay once, own it.</p>
          </div>

          <ul className="plan-feature-list">
            {ONETIME_FEATURES.map((feat) => (
              <li key={feat}>
                <PlanCheck />
                <span>{feat}</span>
              </li>
            ))}
          </ul>

          <Link href={BOOK_DEMO_URL} className="plan-cta plan-cta--dark">
            Get started
          </Link>
        </article>

        <article className="plan-card plan-card--dark">
          <div className="plan-card-top">
            <h3 className="plan-card-name">Custom</h3>
            <div className="plan-card-price-row">
              <span className="plan-card-price">Custom</span>
            </div>
            <p className="plan-card-billing">Pricing based on your workforce</p>
            <p className="plan-card-desc">For growing teams and multi-branch operators that need a tailored HRMS rollout.</p>
          </div>

          <ul className="plan-feature-list">
            {CUSTOM_FEATURES.map((feat) => (
              <li key={feat}>
                <PlanCheck dark />
                <span>{feat}</span>
              </li>
            ))}
          </ul>

          <Link href={BOOK_DEMO_URL} className="plan-cta plan-cta--light">
            Talk to sales
          </Link>
        </article>
      </div>

      <p className="plans-pricing-footer">
        All plans include face scan attendance, formula-based payroll, EPF/ESIC automation, and free PagarBook migration.
      </p>
    </div>
  );
}

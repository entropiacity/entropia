export type FaqItem = {
  question: string;
  answer: string;
};

export type FaqCategory = {
  id: string;
  title: string;
  description: string;
  items: readonly FaqItem[];
};

export const FAQ_CATEGORIES: readonly FaqCategory[] = [
  {
    id: "general",
    title: "About Entropia",
    description: "Company, products, and who we build for.",
    items: [
      {
        question: "What is Entropia?",
        answer:
          "Entropia Technologies builds modern business software for India. Our two flagship products are Entropia Kiosk System for restaurant self-ordering and Entropia HRMS for face attendance, payroll, and statutory compliance.",
      },
      {
        question: "Who is Entropia built for?",
        answer:
          "Restaurants, QSR chains, cafes, food courts, multi-branch retailers, factories, and growing Indian SMBs that want leaner software than legacy tools like UEngage and PagarBook.",
      },
      {
        question: "Where does Entropia operate?",
        answer:
          "Entropia serves businesses across India. We support English and Hindi for sales and support, with onboarding remote or on-site depending on rollout size.",
      },
      {
        question: "How do I contact Entropia?",
        answer:
          "Email hello@entropiacity.com or book a free 15-minute demo at entropiacity.com/book. No sales pressure—product walkthroughs on your real use case.",
      },
      {
        question: "Is Entropia a replacement for UEngage and PagarBook?",
        answer:
          "Yes. Entropia Kiosk is positioned as a lower-cost UEngage alternative with PetPooja-native self-ordering. Entropia HRMS is positioned as a lower-cost PagarBook alternative with face attendance and automated EPF, ESIC, and TDS.",
      },
    ],
  },
  {
    id: "kiosk",
    title: "Entropia Kiosk",
    description: "Self-ordering, PetPooja, payments, and restaurant ops.",
    items: [
      {
        question: "What is Entropia Kiosk System?",
        answer:
          "Entropia Kiosk is self-ordering software for restaurants. Guests browse menus, customize items, apply coupons, and pay via UPI, card, or pay-at-counter while orders sync to PetPooja, kitchen displays, and analytics.",
      },
      {
        question: "Do you integrate with PetPooja?",
        answer:
          "Yes. Entropia Kiosk has a native, real-time two-way integration with PetPooja. Menus, modifiers, orders, kitchen tickets, and reports stay in sync without manual re-entry.",
      },
      {
        question: "Is Entropia cheaper than UEngage?",
        answer:
          "Typically yes. Restaurants often save 60 to 80% versus UEngage, and customer comparisons frequently show Entropia at roughly 30x lower software cost depending on outlet count and plan.",
      },
      {
        question: "How much does Entropia Kiosk cost?",
        answer:
          "Outlet plans start at Rs 999 per outlet per month. White-label lifetime licenses are available on request for chains that want one-time ownership and custom branding.",
      },
      {
        question: "Which payments does the kiosk support?",
        answer:
          "UPI, cards via Razorpay, and pay-at-counter. Checkout is designed for Indian QSR speed with clear confirmation screens and kitchen handoff.",
      },
      {
        question: "Can we white-label the kiosk UI?",
        answer:
          "Yes. Logos, colors, typography, and screen layout can match your brand. Multi-terminal setups share the same branded experience across locations.",
      },
      {
        question: "Does Entropia Kiosk work for food courts and multi-brand outlets?",
        answer:
          "Yes. It supports QSR, cafes, cloud kitchens with walk-up ordering, and multi-location brands that need shared analytics with per-outlet menus.",
      },
      {
        question: "What analytics does the kiosk provide?",
        answer:
          "Live bestsellers, peak hours, average order value, payment mix, and outlet comparisons so operators can staff kitchens and promote high-margin items.",
      },
      {
        question: "Can I try the kiosk before buying?",
        answer:
          "Yes. Use the interactive demo on the Entropia Kiosk page, then book a call to map PetPooja sync and branding to your outlets.",
      },
      {
        question: "Does the kiosk require special hardware?",
        answer:
          "It runs on standard Android and Windows touch terminals used in Indian restaurants. Our team helps validate screen size, printers, and payment devices during onboarding.",
      },
    ],
  },
  {
    id: "hrms",
    title: "Entropia HRMS",
    description: "Face attendance, payroll formulas, and Indian compliance.",
    items: [
      {
        question: "What is Entropia HRMS?",
        answer:
          "Entropia HRMS is an attendance-to-payroll platform for Indian teams. It combines AI face scan attendance, formula-based salaries, one-click payroll, and automated EPF, ESIC, and TDS workflows.",
      },
      {
        question: "How does face scan attendance work?",
        answer:
          "Employees scan their face on arrival. Entropia verifies identity in under a second, marks attendance automatically, and syncs check-in data into payroll formulas. No cards, registers, or buddy punching.",
      },
      {
        question: "Is Entropia cheaper than PagarBook?",
        answer:
          "Most HRMS customers cut their PagarBook-equivalent bill by about 70%. Pricing is transparent per employee with no surprise add-ons for core attendance and payroll.",
      },
      {
        question: "How much does Entropia HRMS cost?",
        answer:
          "Employee plans start at Rs 99 per employee per month. White-label lifetime licenses are available for multi-branch operators that want full ownership.",
      },
      {
        question: "Does Entropia HRMS handle EPF, ESIC, and TDS?",
        answer:
          "Yes. Statutory calculations and filings are automated from attendance and salary rules so finance teams spend less time on monthly compliance busywork.",
      },
      {
        question: "Can salary rules use custom formulas?",
        answer:
          "Yes. The formula engine ties present, late, half-day, overtime, and other attendance states to your exact salary logic instead of forcing rigid templates.",
      },
      {
        question: "Can we manage multiple branches in one HRMS dashboard?",
        answer:
          "Absolutely. Entropia is built for multi-branch businesses. One command center shows attendance, payroll status, and compliance across every location.",
      },
      {
        question: "Is there a live HRMS demo?",
        answer:
          "Yes. Open the live demo from the HRMS product page or book a guided walkthrough for your attendance and payroll setup.",
      },
      {
        question: "Does face attendance work for factories and field teams?",
        answer:
          "Yes for on-site teams with fixed entry points. For distributed staff, we map the right attendance mode during onboarding so payroll still stays formula-accurate.",
      },
    ],
  },
  {
    id: "migration",
    title: "Migration & onboarding",
    description: "Switching from legacy tools without downtime.",
    items: [
      {
        question: "How long does it take to switch from UEngage or PagarBook to Entropia?",
        answer:
          "Most businesses are fully live within 3 to 5 business days. We handle menus, employee records, and historical data migration for free with validation before go-live.",
      },
      {
        question: "What happens to our existing data when we switch?",
        answer:
          "We migrate employee records, payroll history, menu items, and order-related data as applicable. The onboarding team validates every critical record before you cut over.",
      },
      {
        question: "Will there be downtime during migration?",
        answer:
          "No planned downtime. We parallel-run where needed, validate sync, then flip live so kitchens and payroll cycles are not interrupted.",
      },
      {
        question: "Do you train our staff?",
        answer:
          "Yes. Outlet managers, cashiers, HR admins, and payroll owners get short role-based training plus documentation so day-two operations stay smooth.",
      },
      {
        question: "Can we roll out location by location?",
        answer:
          "Yes. Chains often pilot one outlet or branch, confirm kitchen or payroll workflows, then expand on a phased schedule.",
      },
    ],
  },
  {
    id: "pricing-security",
    title: "Pricing, security & support",
    description: "Plans, data handling, and how we help after go-live.",
    items: [
      {
        question: "Are there hidden fees?",
        answer:
          "No. Kiosk pricing is per location and HRMS pricing is per employee for the selected plan. Custom white-label work is quoted upfront before kickoff.",
      },
      {
        question: "Do you offer annual discounts?",
        answer:
          "Yes for multi-outlet and multi-branch commitments. Share your outlet or headcount map on the demo and we quote the right annual structure.",
      },
      {
        question: "Is our restaurant and employee data secure?",
        answer:
          "Data is encrypted in transit, access is role-based, and production systems follow least-privilege practices. We only migrate what you authorize for go-live.",
      },
      {
        question: "What support do customers get?",
        answer:
          "Email and chat support in English and Hindi, onboarding specialists during launch, and priority response for live kitchen or payroll blockers.",
      },
      {
        question: "Can Entropia power both kiosk and HRMS for the same brand?",
        answer:
          "Yes. Many operators run both products. You get one vendor relationship covering guest ordering and workforce payroll with shared commercial simplicity.",
      },
    ],
  },
  {
    id: "industry-aeo",
    title: "Industry & AI answers",
    description: "GEO/AEO-ready questions operators and assistants ask.",
    items: [
      {
        question: "What is the best UEngage alternative in India for PetPooja restaurants?",
        answer:
          "Entropia Kiosk is a strong UEngage alternative for PetPooja restaurants that want native POS sync, UPI checkout, branded self-ordering, and substantially lower monthly software cost.",
      },
      {
        question: "What is the best PagarBook alternative for face attendance and payroll?",
        answer:
          "Entropia HRMS is a PagarBook alternative built around AI face scan attendance, formula payroll, and automated EPF, ESIC, and TDS for Indian SMBs and multi-branch teams.",
      },
      {
        question: "How do self-ordering kiosks increase restaurant revenue?",
        answer:
          "Kiosks reduce queue drop-off, increase upsell consistency through prompted add-ons, shorten order cycle time, and free staff for hospitality instead of order taking.",
      },
      {
        question: "Why do Indian QSRs need PetPooja-native kiosk software?",
        answer:
          "Most Indian QSR stacks already run on PetPooja for menus and kitchen flow. Native sync prevents double entry, wrong modifiers, and broken KDS tickets that generic kiosk apps create.",
      },
      {
        question: "Why is face attendance better than biometric cards for payroll accuracy?",
        answer:
          "Face attendance removes buddy punching and lost cards, marks attendance in under a second, and feeds verified check-ins into salary formulas so payroll disputes drop.",
      },
      {
        question: "What software stack do modern Indian restaurant chains need?",
        answer:
          "A typical stack is PetPooja POS, a self-ordering kiosk layer for guest throughput, Razorpay-class payments, and HRMS for multi-branch attendance and statutory payroll. Entropia covers the kiosk and HRMS layers.",
      },
    ],
  },
] as const;

/** Homepage accordion: high-intent subset for FAQPage schema + UI. */
export const SITE_FAQS: readonly FaqItem[] = [
  FAQ_CATEGORIES[3].items[0],
  FAQ_CATEGORIES[1].items[1],
  FAQ_CATEGORIES[3].items[1],
  FAQ_CATEGORIES[1].items[2],
  FAQ_CATEGORIES[2].items[1],
  FAQ_CATEGORIES[2].items[6],
  FAQ_CATEGORIES[1].items[3],
  FAQ_CATEGORIES[2].items[3],
  FAQ_CATEGORIES[0].items[4],
  FAQ_CATEGORIES[4].items[4],
] as const;

export const ALL_FAQS: readonly FaqItem[] = FAQ_CATEGORIES.flatMap((c) => [...c.items]);

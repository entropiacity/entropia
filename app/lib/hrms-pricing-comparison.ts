export const MIN_EMPLOYEES = 10;
export const MAX_EMPLOYEES = 500;
export const EMPLOYEE_STEP = 5;
export const ENTROPIA_LIFETIME_USD = 499;

export type PricingResult = {
  monthly: number;
  annual: number;
  oneTime?: boolean;
};

export type CompetitorRow = {
  id: string;
  provider: string;
  plan: string;
  note?: string;
  faceScan: boolean;
  isEntropia?: boolean;
  compute: (employees: number) => PricingResult;
};

export function clampEmployees(value: number): number {
  const stepped = Math.round(value / EMPLOYEE_STEP) * EMPLOYEE_STEP;
  return Math.min(MAX_EMPLOYEES, Math.max(MIN_EMPLOYEES, stepped));
}

export function entropiaPricing(): PricingResult {
  return {
    monthly: ENTROPIA_LIFETIME_USD / 12,
    annual: ENTROPIA_LIFETIME_USD,
    oneTime: true,
  };
}

export function pagarbookStandardPricing(employees: number): PricingResult {
  const annual = employees * 699;
  return { monthly: annual / 12, annual };
}

export function pagarbookLensPricing(employees: number): PricingResult {
  const annual = employees * 1398;
  return { monthly: annual / 12, annual };
}

export function kredilyProfessionalPricing(employees: number): PricingResult {
  const monthly = 1749 + Math.max(0, employees - 25) * 60;
  return { monthly, annual: monthly * 12 };
}

export function greythrGrowthPricing(employees: number): PricingResult {
  const monthly = 4495 + Math.max(0, employees - 50) * 85;
  return { monthly, annual: monthly * 12 };
}

export function kekaFoundationPricing(employees: number): PricingResult {
  const monthly = 9999 + Math.max(0, employees - 100) * 90;
  return { monthly, annual: monthly * 12 };
}

export const HRMS_COMPETITORS: CompetitorRow[] = [
  {
    id: "entropia",
    provider: "Entropia",
    plan: "Lifetime license",
    note: "Pay once, own forever",
    faceScan: true,
    isEntropia: true,
    compute: () => entropiaPricing(),
  },
  {
    id: "pagarbook-lens",
    provider: "PagarBook",
    plan: "Lens",
    note: "Face scan included",
    faceScan: true,
    compute: pagarbookLensPricing,
  },
  {
    id: "pagarbook-standard",
    provider: "PagarBook",
    plan: "Standard",
    note: "No face scan",
    faceScan: false,
    compute: pagarbookStandardPricing,
  },
  {
    id: "kredily",
    provider: "Kredily",
    plan: "Professional",
    faceScan: false,
    compute: kredilyProfessionalPricing,
  },
  {
    id: "greythr",
    provider: "greytHR",
    plan: "Growth",
    faceScan: false,
    compute: greythrGrowthPricing,
  },
  {
    id: "keka",
    provider: "Keka",
    plan: "Foundation",
    faceScan: false,
    compute: kekaFoundationPricing,
  },
];

export function formatInr(value: number, fractionDigits = 0): string {
  return `$${value.toLocaleString("en-US", {
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  })}`;
}

export function computeComparison(employees: number) {
  const baseline = entropiaPricing();

  return HRMS_COMPETITORS.map((row) => {
    const pricing = row.compute(employees);
    const monthlySavings = pricing.monthly - baseline.monthly;
    const annualSavings = pricing.annual - baseline.annual;
    const oneYearSavings = row.isEntropia
      ? 0
      : pricing.annual - ENTROPIA_LIFETIME_USD;
    const fiveYearSavings = row.isEntropia
      ? 0
      : pricing.annual * 5 - ENTROPIA_LIFETIME_USD;

    return {
      ...row,
      pricing,
      monthlySavings,
      annualSavings,
      oneYearSavings,
      fiveYearSavings,
    };
  });
}

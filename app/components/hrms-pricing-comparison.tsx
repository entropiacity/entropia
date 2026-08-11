"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { AnimatedInr, CountUp } from "./count-up";
import {
  MAX_EMPLOYEES,
  MIN_EMPLOYEES,
  EMPLOYEE_STEP,
  clampEmployees,
  computeComparison,
} from "../lib/hrms-pricing-comparison";
import { BOOK_DEMO_URL } from "../lib/links";

function YearSavingsCell({
  value,
  isBaseline,
  highlight = false,
}: {
  value: number;
  isBaseline: boolean;
  highlight?: boolean;
}) {
  if (isBaseline) {
    return <span className="hrms-compare-baseline">—</span>;
  }

  if (value <= 0) {
    return <span className="hrms-compare-no-save">—</span>;
  }

  return (
    <span
      className={
        highlight
          ? "hrms-compare-savings hrms-compare-savings--strong"
          : "hrms-compare-savings"
      }
    >
      <AnimatedInr value={value} />
    </span>
  );
}

export function HrmsPricingComparison() {
  const [employees, setEmployees] = useState(50);
  const [inputValue, setInputValue] = useState("50");

  const rows = useMemo(() => computeComparison(employees), [employees]);
  const mostExpensive = useMemo(
    () => [...rows].sort((a, b) => b.fiveYearSavings - a.fiveYearSavings)[0],
    [rows],
  );
  const lensRow = rows.find((row) => row.id === "pagarbook-lens");
  const sliderPct =
    ((employees - MIN_EMPLOYEES) / (MAX_EMPLOYEES - MIN_EMPLOYEES)) * 100;

  function updateEmployees(next: number) {
    const clamped = clampEmployees(next);
    setEmployees(clamped);
    setInputValue(String(clamped));
  }

  return (
    <div className="hrms-compare">
      <div className="hrms-compare-top">
        <div>
          <p className="hrms-compare-eyebrow">Pricing comparison</p>
          <h2 className="hrms-compare-title">
            What competitors charge at{" "}
            <span>
              <CountUp to={employees} /> employees
            </span>
          </h2>
        </div>
        <Link href={BOOK_DEMO_URL} className="hrms-compare-cta">
          Get Entropia · $499
        </Link>
      </div>

      <div className="hrms-compare-toolbar">
        <div className="hrms-compare-count">
          <input
            id="hrms-employee-count"
            type="number"
            className="hrms-compare-count-input"
            min={MIN_EMPLOYEES}
            max={MAX_EMPLOYEES}
            step={EMPLOYEE_STEP}
            value={inputValue}
            onChange={(event) => {
              setInputValue(event.target.value);
              const parsed = Number(event.target.value);
              if (!Number.isNaN(parsed)) updateEmployees(parsed);
            }}
            onBlur={() => setInputValue(String(employees))}
            aria-label="Employee count"
          />
          <span className="hrms-compare-count-label">employees</span>
        </div>

        <div className="hrms-compare-slider-wrap">
          <input
            type="range"
            className="hrms-compare-slider"
            min={MIN_EMPLOYEES}
            max={MAX_EMPLOYEES}
            step={EMPLOYEE_STEP}
            value={employees}
            style={{
              background: `linear-gradient(to right, #6366f1 0%, #6366f1 ${sliderPct}%, #e8e8ef ${sliderPct}%, #e8e8ef 100%)`,
            }}
            onChange={(event) => updateEmployees(Number(event.target.value))}
            aria-label="Employee count slider"
          />
          <div className="hrms-compare-slider-labels">
            <span>{MIN_EMPLOYEES}</span>
            <span>{MAX_EMPLOYEES}</span>
          </div>
        </div>

        <div className="hrms-compare-highlight">
          <span className="hrms-compare-highlight-label">5-year savings</span>
          <strong>
            <AnimatedInr value={mostExpensive.fiveYearSavings} />
          </strong>
          <span className="hrms-compare-highlight-sub">
            saved in 5 yrs vs {mostExpensive.provider}
          </span>
        </div>
      </div>

      {lensRow && lensRow.oneYearSavings > 0 ? (
        <p className="hrms-compare-lens-note">
          vs PagarBook Lens (face scan): save{" "}
          <AnimatedInr value={lensRow.fiveYearSavings} /> over 5 years with
          Entropia
        </p>
      ) : null}

      <div className="hrms-compare-table-wrap">
        <table className="hrms-compare-table">
          <thead>
            <tr>
              <th>Provider</th>
              <th>Monthly</th>
              <th>Annual</th>
              <th>Saved in 1 year</th>
              <th>Saved in 5 years</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr
                key={row.id}
                className={row.isEntropia ? "hrms-compare-row--entropia" : undefined}
              >
                <td>
                  <div className="hrms-compare-provider">
                    <div className="hrms-compare-provider-top">
                      <span className="hrms-compare-provider-name">
                        {row.provider}
                      </span>
                      <span className="hrms-compare-plan-tag">{row.plan}</span>
                      {row.isEntropia ? (
                        <span className="hrms-compare-badge hrms-compare-badge--ours">
                          Ours
                        </span>
                      ) : null}
                      {row.faceScan && !row.isEntropia ? (
                        <span className="hrms-compare-badge hrms-compare-badge--face">
                          Face scan
                        </span>
                      ) : null}
                    </div>
                    {row.note ? (
                      <span className="hrms-compare-plan-note">{row.note}</span>
                    ) : null}
                  </div>
                </td>
                <td>
                  <AnimatedInr
                    value={row.pricing.monthly}
                    className="hrms-compare-price"
                  />
                  <span className="hrms-compare-price-note">
                    {row.pricing.oneTime ? "eff. / mo" : "/ mo"}
                  </span>
                </td>
                <td>
                  <AnimatedInr
                    value={row.pricing.annual}
                    className="hrms-compare-price"
                  />
                  <span className="hrms-compare-price-note">
                    {row.pricing.oneTime ? "one-time" : "/ yr"}
                  </span>
                </td>
                <td>
                  <YearSavingsCell
                    value={row.oneYearSavings}
                    isBaseline={!!row.isEntropia}
                  />
                </td>
                <td>
                  <YearSavingsCell
                    value={row.fiveYearSavings}
                    isBaseline={!!row.isEntropia}
                    highlight
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="hrms-compare-source">
        Verified June 2026 · Entropia $499 one-time · 5-year savings =
        competitor total − lifetime license
      </p>
    </div>
  );
}

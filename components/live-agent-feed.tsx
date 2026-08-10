"use client"

import { useEffect, useState, useRef } from "react"

const AGENT_NAMES = [
  "kiosk-indiranagar", "kiosk-koramangala", "hrms-hq", "payroll-engine",
  "face-scan-01", "petpooja-sync", "razorpay-upi", "branch-mg-road",
  "attendance-live", "tds-filer",
]

const TASKS = [
  "Syncing PetPooja menu — 142 items",
  "UPI payment confirmed · ₹480",
  "Face scan check-in · Priya S.",
  "Kitchen ticket sent · Order #1842",
  "Running payroll formulas · Branch 3",
  "EPF contribution batch filed",
  "ESIC records updated · 28 staff",
  "Peak-hour AOV spike detected",
  "Multi-kiosk menu push · 4 terminals",
  "Overtime auto-calculated · Night shift",
  "TDS quarterly draft ready",
  "Branch attendance 97% live",
  "Razorpay settlement reconciled",
  "Upsell screen converted · +₹90",
]

const REGIONS = ["BLR-01", "BLR-02", "HYD-01", "DEL-01", "MUM-01"]
const STATUSES = [
  { label: "live",     color: "#4ade80" },
  { label: "live",     color: "#4ade80" },
  { label: "live",     color: "#4ade80" },
  { label: "queued",   color: "#facc15" },
  { label: "synced",   color: "#60a5fa" },
]

type AgentRow = {
  id: string
  name: string
  task: string
  region: string
  status: typeof STATUSES[number]
  progress: number
  elapsed: string
  key: number
}

function randomRow(key: number): AgentRow {
  return {
    id: Math.random().toString(36).slice(2, 8).toUpperCase(),
    name: AGENT_NAMES[Math.floor(Math.random() * AGENT_NAMES.length)],
    task: TASKS[Math.floor(Math.random() * TASKS.length)],
    region: REGIONS[Math.floor(Math.random() * REGIONS.length)],
    status: STATUSES[Math.floor(Math.random() * STATUSES.length)],
    progress: Math.floor(Math.random() * 85 + 10),
    elapsed: `${Math.floor(Math.random() * 14 + 1)}m ${Math.floor(Math.random() * 59)}s`,
    key,
  }
}

function ProgressBar({ initial }: { initial: number }) {
  const [pct, setPct] = useState(initial)
  const rafRef = useRef<number>(0)
  const pctRef = useRef(initial)

  useEffect(() => {
    const tick = () => {
      pctRef.current = Math.min(99, pctRef.current + 0.015)
      setPct(Math.round(pctRef.current))
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  return (
    <div style={{ width: "100%", height: 2, background: "rgba(0,0,0,0.08)", borderRadius: 9 }}>
      <div style={{
        height: "100%", borderRadius: 9,
        width: `${pct}%`,
        background: "rgba(0,0,0,0.35)",
        transition: "width 0.5s linear",
      }} />
    </div>
  )
}

const SEED_ROWS: AgentRow[] = [
  { id: "A1B2C3", name: "kiosk-indiranagar", task: "UPI payment confirmed · ₹480",        region: "BLR-01", status: STATUSES[0], progress: 42, elapsed: "0m 12s", key: 0 },
  { id: "D4E5F6", name: "petpooja-sync",     task: "Syncing PetPooja menu — 142 items",    region: "BLR-02", status: STATUSES[0], progress: 67, elapsed: "1m 48s", key: 1 },
  { id: "G7H8I9", name: "face-scan-01",      task: "Face scan check-in · Priya S.",        region: "HYD-01", status: STATUSES[3], progress: 18, elapsed: "0m 05s", key: 2 },
  { id: "J0K1L2", name: "payroll-engine",    task: "Running payroll formulas · Branch 3",  region: "DEL-01", status: STATUSES[0], progress: 55, elapsed: "5m 30s", key: 3 },
  { id: "M3N4O5", name: "hrms-hq",           task: "EPF contribution batch filed",         region: "MUM-01", status: STATUSES[0], progress: 80, elapsed: "2m 22s", key: 4 },
  { id: "P6Q7R8", name: "razorpay-upi",      task: "Razorpay settlement reconciled",       region: "BLR-01", status: STATUSES[4], progress: 99, elapsed: "4m 01s", key: 5 },
]

export function LiveAgentFeed() {
  const [rows, setRows] = useState<AgentRow[]>(SEED_ROWS)
  const keyRef = useRef(100)

  useEffect(() => {
    setRows(Array.from({ length: 6 }, (_, i) => randomRow(i)))

    const t = setInterval(() => {
      keyRef.current++
      setRows(prev => [...prev.slice(1), randomRow(keyRef.current)])
    }, 2800)
    return () => clearInterval(t)
  }, [])

  return (
    <div style={{
      border: "1px solid rgba(0,0,0,0.08)",
      borderRadius: 16,
      overflow: "hidden",
      background: "rgba(255,255,255,0.7)",
    }}>
      <div style={{
        display: "grid",
        gridTemplateColumns: "80px 1fr 80px 70px",
        padding: "8px 16px",
        borderBottom: "1px solid rgba(0,0,0,0.06)",
        background: "rgba(0,0,0,0.03)",
      }}>
        {["NODE", "EVENT", "SITE", "STATUS"].map(h => (
          <span key={h} style={{ fontSize: 8, letterSpacing: "0.16em", color: "rgba(0,0,0,0.30)", fontFamily: "monospace" }}>{h}</span>
        ))}
      </div>

      <div style={{ overflow: "hidden" }}>
        {rows.map((row, i) => (
          <div
            key={row.key}
            style={{
              display: "grid",
              gridTemplateColumns: "80px 1fr 80px 70px",
              padding: "10px 16px",
              borderBottom: "1px solid rgba(0,0,0,0.04)",
              gap: 8,
              alignItems: "center",
              animation: i === rows.length - 1 ? "rowSlideIn 0.4s cubic-bezier(0.16,1,0.3,1) both" : "none",
            }}
          >
            <div>
              <div style={{ fontSize: 9, fontFamily: "monospace", color: "rgba(0,0,0,0.65)", marginBottom: 1 }}>{row.name}</div>
              <div style={{ fontSize: 7.5, fontFamily: "monospace", color: "rgba(0,0,0,0.25)" }}>#{row.id}</div>
            </div>

            <div style={{ minWidth: 0 }}>
              <div style={{
                fontSize: 9, color: "rgba(0,0,0,0.50)", lineHeight: 1.35, marginBottom: 5,
                overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
              }}>{row.task}</div>
              <ProgressBar initial={row.progress} />
            </div>

            <div style={{ fontSize: 8, fontFamily: "monospace", color: "rgba(0,0,0,0.30)" }}>{row.region}</div>

            <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <span style={{
                width: 5, height: 5, borderRadius: "50%",
                background: row.status.color,
                boxShadow: row.status.label === "live" ? `0 0 6px ${row.status.color}` : "none",
                animation: row.status.label === "live" ? "statusPulse 2s ease-in-out infinite" : "none",
                flexShrink: 0,
              }} />
              <span style={{ fontSize: 8, fontFamily: "monospace", color: "rgba(0,0,0,0.35)" }}>{row.status.label}</span>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes rowSlideIn {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes statusPulse {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.4; }
        }
      `}</style>
    </div>
  )
}

export function LiveAgentCounter() {
  const [count, setCount] = useState(1284)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const t = setInterval(() => {
      setCount(v => v + Math.floor(Math.random() * 3 - 1))
    }, 1200)
    return () => clearInterval(t)
  }, [])

  return (
    <span style={{
      fontFamily: "monospace",
      fontSize: "clamp(3rem, 6vw, 5rem)",
      fontWeight: 300,
      color: "rgba(0,0,0,0.85)",
      lineHeight: 1,
      letterSpacing: "-0.02em",
      transition: "color 0.3s ease",
    }}>
      {mounted ? count.toLocaleString("en-IN") : "1,284"}
    </span>
  )
}

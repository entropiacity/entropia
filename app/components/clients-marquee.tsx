"use client";

const CLIENTS = [
  { name: "Kiosk client", icon: <FoodIcon /> },
  { name: "Nandhishwar Polymers", icon: <FactoryIcon /> },
  { name: "Spice Garden Restaurants", icon: <FoodIcon /> },
  { name: "Urban Diner Chain", icon: <StoreIcon /> },
  { name: "Bite Club", icon: <StoreIcon /> },
];

const MARQUEE_ITEMS = [...CLIENTS, ...CLIENTS];

function FoodIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 11l19-9-9 19-2-8-8-2z" />
    </svg>
  );
}

function FactoryIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 20h20M5 20V10l4-2v12M13 20V6l6-3v17" />
    </svg>
  );
}

function StoreIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

export function ClientsMarquee({ className = "" }: { className?: string }) {
  return (
    <div className={`clients-shell clients-row ${className}`.trim()}>
      <p style={{ margin: 0, fontSize: 15, color: "#888", letterSpacing: -0.2, flexShrink: 0 }}>
        Trusted by businesses
      </p>

      <div
        style={{
          flex: 1,
          overflow: "hidden",
          position: "relative",
          minWidth: 0,
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            width: 48,
            background: "linear-gradient(to right, #fff, transparent)",
            zIndex: 2,
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            right: 0,
            width: 48,
            background: "linear-gradient(to left, #fff, transparent)",
            zIndex: 2,
            pointerEvents: "none",
          }}
        />

        <div
          className="clients-marquee-track"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 56,
            width: "max-content",
          }}
        >
          {MARQUEE_ITEMS.map((client, i) => (
            <div
              key={`${client.name}-${i}`}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                color: "#555",
                fontSize: 14.5,
                fontWeight: 500,
                whiteSpace: "nowrap",
                opacity: 0.8,
                letterSpacing: -0.2,
                userSelect: "none",
              }}
            >
              <span style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                {client.icon}
              </span>
              <span>{client.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

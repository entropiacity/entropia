import { KioskWebDemo } from '../components/kiosk-demo';

export function KioskInteractiveDemoSection() {
  return (
    <section className="section-grid-lines kiosk-section section-shell" id="kiosk-demo">
      <div className="kiosk-split">
        <div>
          <p className="kiosk-eyebrow">Try it live</p>
          <h2 className="kiosk-section-title" style={{ marginBottom: 16 }}>
            <span style={{ fontWeight: 400, color: '#b0b0b0' }}>Tap through the</span>
            <br />
            <span style={{ fontWeight: 500, color: '#111' }}>kiosk yourself.</span>
          </h2>
          <p style={{ fontSize: 15, lineHeight: 1.65, color: '#666', maxWidth: 420, margin: '0 0 20px' }}>
            Pick dine-in or take-away, browse the menu, add items, and complete a fake checkout.
            Nothing connects to a POS. It&apos;s a hands-on preview for your team.
          </p>
          <ul className="kiosk-checklist">
            {['Dummy menu & photos', 'Cart & checkout UI', 'UPI / counter flow', 'Auto-resets when done'].map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <KioskWebDemo className="kd-device-wrap--wide" autoFocusOnView />
      </div>
    </section>
  );
}

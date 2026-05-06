// Small visual atoms shared across the layout. Pure presentational.
import { Q, FONT } from "./tokens.js";

// The Quartr asterisk mark (matches the #FF4000 SVG from quartr.com).
export function QuartrMark({ size = 14, color = Q.brand }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
      <path d="M8 1C8 1 8.5 5.5 11.5 8C8.5 10.5 8 15 8 15C8 15 7.5 10.5 4.5 8C7.5 5.5 8 1 8 1Z" fill={color} />
    </svg>
  );
}

// SVG caret — replaces the unicode ▾ which clashes with Inter.
export function Caret({ size = 12, open = false, color = Q.textSubtle }) {
  return (
    <svg width={size} height={size} viewBox="0 0 12 12" fill="none"
      style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform .15s", flexShrink: 0 }}>
      <path d="M3 4.5L6 7.5L9 4.5" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ImpactBadge({ impact, compact = false }) {
  const m = {
    critical: { label: "Critical", bg: "rgba(255,64,0,0.12)",  color: Q.brand,    border: "rgba(255,64,0,0.3)"  },
    high:     { label: "High",     bg: "rgba(52,211,153,0.12)",color: "#34D399",  border: "rgba(52,211,153,0.3)" },
    medium:   { label: "Medium",   bg: "rgba(74,158,245,0.12)",color: "#4A9EF5",  border: "rgba(74,158,245,0.3)" },
    med:      { label: "Medium",   bg: "rgba(74,158,245,0.12)",color: "#4A9EF5",  border: "rgba(74,158,245,0.3)" },
  };
  const s = m[impact]; if (!s) return null;
  return (
    <span style={{
      background: s.bg, color: s.color,
      border: `1px solid ${s.border}`,
      padding: compact ? "1px 6px" : "2px 8px",
      borderRadius: "4px",
      fontSize: compact ? "9px" : "10px",
      fontWeight: 600, letterSpacing: "0.3px",
      textTransform: "uppercase",
      fontFamily: FONT,
    }}>
      {s.label}
    </span>
  );
}

export function FeatureTag({ name, onClick, active }) {
  return (
    <span
      onClick={onClick}
      style={{
        background: active ? Q.brandDim : "rgba(255,64,0,0.08)",
        color: Q.brand,
        border: `1px solid ${active ? Q.brandBorder : "rgba(255,64,0,0.22)"}`,
        padding: "3px 9px",
        borderRadius: "4px",
        fontSize: "11px",
        fontWeight: 600,
        letterSpacing: "0.1px",
        fontFamily: FONT,
        cursor: onClick ? "pointer" : "default",
        whiteSpace: "nowrap",
      }}>
      {name}
    </span>
  );
}

// Quartr Pro glyph-pill used inside step titles and the right pane header.
export function QuartrPill({ accent = Q.brand }) {
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: "4px",
      background: "rgba(255,64,0,0.13)",
      border: `1px solid rgba(255,64,0,0.4)`,
      padding: "1px 7px", borderRadius: "4px",
      fontSize: "9px", fontWeight: 700, color: Q.brand,
      letterSpacing: "0.5px", textTransform: "uppercase",
      fontFamily: FONT,
    }}>
      <QuartrMark size={9} />
      <span>Quartr Pro</span>
    </span>
  );
}

// Step dot — emoji stays the visual primary, Quartr touch is a small badge.
// This keeps the at-a-glance period rhythm (☀️ → 📧 → 🔍) intact while
// signalling Quartr-relevance.
export function StepDot({ icon, isQuartr, isActive, accent }) {
  return (
    <div style={{ position: "relative", flexShrink: 0 }}>
      <div style={{
        width: 36, height: 36, borderRadius: "50%",
        background: isActive
          ? (isQuartr ? "rgba(255,64,0,0.12)" : `${accent}22`)
          : "rgba(255,255,255,0.04)",
        border: `1.5px solid ${
          isActive
            ? (isQuartr ? Q.brandBorder : `${accent}66`)
            : Q.borderSub
        }`,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 16, transition: "background .15s, border-color .15s",
      }}>
        <span>{icon}</span>
      </div>
      {isQuartr && (
        <div style={{
          position: "absolute", right: -2, bottom: -2,
          width: 14, height: 14, borderRadius: "50%",
          background: Q.bg,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <QuartrMark size={10} />
        </div>
      )}
    </div>
  );
}

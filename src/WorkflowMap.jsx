import { useEffect, useMemo, useState } from "react";
import { Q, FONT, ICP_WASH } from "./tokens.js";
import {
  QuartrMark, Caret, ImpactBadge, FeatureTag, QuartrPill, StepDot,
} from "./atoms.jsx";
import {
  ICPS, WORKFLOWS, PLAYBOOKS, PERIOD_ICON, periodLabel, findStep,
} from "./data.js";

/* ──────────────────────────────────────────────────────────────────────────
   Quartr ICP Workflow Map — v2
   Two-pane workspace: left rail = workflow timeline, right pane = the
   selected step's pain → value (the actual sales weapon).
   On narrow viewports the rail collapses and the right pane stacks below.
   Data + behaviour are otherwise unchanged from v1.
   ──────────────────────────────────────────────────────────────────────── */

// ── Responsive breakpoint hook ────────────────────────────────────────────
// Five bands, each with its own intentional layout (not just a shrunken
// version of the next):
//   xs  < 560   — phone. Drawer for ICP/period. No card chrome on detail.
//   sm  560–839 — tablet portrait. Stacked but with chrome.
//   md  840–1079 — small laptop / iPad land. Horizontal step strip above.
//   lg  1080–1399 — two-pane (320 rail + detail).
//   xl  ≥ 1400  — two-pane (360 rail + detail), capped content width.
function useViewport() {
  const compute = () => {
    if (typeof window === "undefined") return { w: 1440, band: "lg" };
    const w = window.innerWidth;
    let band = "xl";
    if (w < 560) band = "xs";
    else if (w < 840) band = "sm";
    else if (w < 1080) band = "md";
    else if (w < 1400) band = "lg";
    return { w, band };
  };
  const [vp, setVp] = useState(compute);
  useEffect(() => {
    let raf = 0;
    const onResize = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setVp(compute()));
    };
    window.addEventListener("resize", onResize);
    return () => { window.removeEventListener("resize", onResize); cancelAnimationFrame(raf); };
  }, []);
  return vp;
}

// ── Top header bar ────────────────────────────────────────────────────────
// 64px sticky bar with wordmark, ICP tabs, period selector and the
// Quartr-Only toggle. Replaces the previous full-bleed marketing header which
// took ~280px every period switch.
function TopBar({ icp, qOnly, band, onSwitchIcp, onToggleQ, aboutOpen, onToggleAbout }) {
  // Three layout modes:
  //   xs/sm — wordmark + About + icon-only ICP segmented + Q-only icon button
  //   md    — wordmark + About + ICP labels (compact) + Q-only icon
  //   lg/xl — full layout
  const compact = band === "xs" || band === "sm";
  const semi    = band === "md";
  const showLabels = !compact; // md and up show ICP labels
  const showQText  = band === "lg" || band === "xl";
  const showSubtitle = band !== "xs";
  const padX = compact ? 16 : 24;
  return (
    <header style={{
      position: "sticky", top: 0, zIndex: 20,
      background: "rgba(10,10,11,0.92)",
      backdropFilter: "blur(14px)",
      borderBottom: `1px solid ${Q.borderSub}`,
      display: "grid",
      gridTemplateColumns: compact ? "auto 1fr auto" : "auto 1fr auto",
      alignItems: "center",
      gap: compact ? 12 : 24,
      padding: `0 ${padX}px`,
      height: compact ? 56 : 64,
    }}>
      {/* Wordmark */}
      <div style={{ display: "flex", alignItems: "center", gap: compact ? 8 : 10 }}>
        <QuartrMark size={18} />
        <span style={{ fontSize: 15, fontWeight: 700, color: Q.text, letterSpacing: "-0.4px", fontFamily: FONT }}>Quartr</span>
        {showSubtitle && <span style={{ width: 1, height: 14, background: Q.border }} />}
        {showSubtitle && (
          <span style={{ fontSize: 12, color: Q.textMuted, fontFamily: FONT }}>
            {band === "sm" ? "Workflow Map" : "ICP Workflow Map"}
          </span>
        )}
        <button onClick={onToggleAbout}
          aria-expanded={aboutOpen} aria-label="About this tool"
          style={{
            marginLeft: compact ? 2 : 6,
            background: aboutOpen ? "rgba(255,255,255,0.05)" : "transparent",
            border: `1px solid ${aboutOpen ? Q.border : Q.borderSub}`,
            color: aboutOpen ? Q.textRead : Q.textSubtle,
            borderRadius: 5, padding: compact ? "4px 7px" : "4px 9px",
            fontSize: 11, fontWeight: 500, cursor: "pointer",
            fontFamily: FONT, display: "inline-flex", alignItems: "center", gap: 5,
            whiteSpace: "nowrap",
          }}>
          {compact
            ? <span style={{ fontSize: 11, fontWeight: 700 }}>?</span>
            : <><span>About</span><Caret size={9} open={aboutOpen} /></>
          }
        </button>
      </div>

      {/* ICP tabs — center. On xs/sm the tab labels disappear, leaving icons. */}
      <nav role="tablist" aria-label="Select ICP" className="icp-tabs"
        style={{ display: "flex", gap: 4, justifySelf: "center", overflowX: "auto" }}>
        {Object.entries(ICPS).map(([key, meta]) => {
          const active = key === icp;
          return (
            <button key={key}
              role="tab" aria-selected={active}
              aria-label={meta.label}
              title={meta.label}
              onClick={() => onSwitchIcp(key)}
              style={{
                background: active ? `${meta.accent}1A` : "transparent",
                border: `1px solid ${active ? meta.border : "transparent"}`,
                color: active ? meta.accent : Q.textSubtle,
                fontWeight: active ? 600 : 500,
                fontSize: 13, fontFamily: FONT,
                padding: showLabels ? (semi ? "7px 12px" : "8px 16px") : "8px 10px",
                borderRadius: 6,
                cursor: "pointer", whiteSpace: "nowrap",
                display: "flex", alignItems: "center", gap: showLabels ? 8 : 0,
                transition: "background .12s, color .12s, border-color .12s",
                minHeight: compact ? 32 : 36, minWidth: compact ? 38 : "auto",
                justifyContent: "center",
              }}>
              <span style={{ fontSize: 14 }}>{meta.icon}</span>
              {showLabels && <span>{semi ? meta.abbr : meta.label}</span>}
            </button>
          );
        })}
      </nav>

      {/* Quartr Only toggle */}
      <button onClick={onToggleQ}
        aria-label={qOnly ? "Show all steps" : "Show Quartr-only steps"}
        title={qOnly ? "Show all steps" : "Show Quartr-only steps"}
        style={{
          background: qOnly ? Q.brandDim : "transparent",
          color: qOnly ? Q.brand : Q.textSubtle,
          border: `1px solid ${qOnly ? Q.brandBorder : Q.border}`,
          borderRadius: 6,
          padding: showQText ? "8px 12px" : "8px 10px",
          fontSize: 12, fontWeight: 600, cursor: "pointer",
          fontFamily: FONT, display: "flex", alignItems: "center", gap: showQText ? 6 : 0,
          minHeight: compact ? 32 : 36, whiteSpace: "nowrap",
          justifyContent: "center",
        }}>
        <QuartrMark size={11} color={qOnly ? Q.brand : Q.textSubtle} />
        {showQText && <span>{qOnly ? "Quartr only" : "Show Quartr only"}</span>}
      </button>
    </header>
  );
}

// ── About panel ───────────────────────────────────────────────────────────
// Expandable explainer that sits between the period strip and the workspace.
// Tells a sales rep what the tool is, who it's for, and how to use it on a
// customer call. Collapsed by default — once a rep knows the answers they
// don't want this in the way.
function AboutPanel({ onClose, band }) {
  const compact = band === "xs" || band === "sm";
  const padX = compact ? 16 : 24;
  return (
    <div style={{
      background: Q.card,
      borderBottom: `1px solid ${Q.borderSub}`,
      padding: `20px ${padX}px 24px`,
    }}>
      <div style={{
        maxWidth: 1480, margin: "0 auto",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
        gap: 24,
      }}>
        <div>
          <div style={{
            fontSize: 10, fontWeight: 700, color: Q.brand,
            textTransform: "uppercase", letterSpacing: "0.9px",
            marginBottom: 8, fontFamily: FONT,
            display: "flex", alignItems: "center", gap: 6,
          }}>
            <QuartrMark size={10} />
            <span>What this is</span>
          </div>
          <p style={{ margin: 0, fontSize: 13, color: Q.textRead, lineHeight: 1.6, fontFamily: FONT, textWrap: "pretty" }}>
            A working map of how each Quartr ICP — IR, Buyside, Sellside —
            actually spends their day, week, and earnings cycle. Every step
            is tagged with the pain they feel today and, where it fits, the
            Quartr Pro feature that solves it.
          </p>
        </div>

        <div>
          <div style={{
            fontSize: 10, fontWeight: 700, color: Q.textRead,
            textTransform: "uppercase", letterSpacing: "0.9px",
            marginBottom: 8, fontFamily: FONT,
          }}>
            Who it's for
          </div>
          <p style={{ margin: 0, fontSize: 13, color: Q.textRead, lineHeight: 1.6, fontFamily: FONT, textWrap: "pretty" }}>
            Internal Quartr — Sales and Customer Success. Use it to find fit
            in your prospect's recurring workflows, empathise with their day,
            and drive sharper conversations. Bring it into discovery calls,
            QBRs and renewal prep.
          </p>
        </div>

        <div>
          <div style={{
            fontSize: 10, fontWeight: 700, color: Q.textRead,
            textTransform: "uppercase", letterSpacing: "0.9px",
            marginBottom: 8, fontFamily: FONT,
          }}>
            How to use it on a call
          </div>
          <ol style={{ margin: 0, paddingLeft: 18, fontSize: 13, color: Q.textRead, lineHeight: 1.65, fontFamily: FONT, textWrap: "pretty" }}>
            <li>Pick the ICP that matches your prospect.</li>
            <li>Pick the period that matches the conversation
              (Daily for day‑in‑the‑life; Pre/Earnings/Post for cycle pain).</li>
            <li>Open the playbook on the right — that's your lead.</li>
            <li>Click any step to surface its <em>Today, without Quartr</em> →
              <em> How Quartr Pro solves it</em> talk track.</li>
          </ol>
        </div>

        <div>
          <div style={{
            fontSize: 10, fontWeight: 700, color: Q.textRead,
            textTransform: "uppercase", letterSpacing: "0.9px",
            marginBottom: 8, fontFamily: FONT,
          }}>
            Reading the timeline
          </div>
          <ul style={{ margin: 0, paddingLeft: 0, listStyle: "none", fontSize: 13, color: Q.textRead, lineHeight: 1.7, fontFamily: FONT }}>
            <li style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <QuartrMark size={10} />
              <span>Step touched by Quartr Pro</span>
            </li>
            <li style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ width: 10, height: 3, background: Q.brand, borderRadius: 2 }} />
              <span>Rail thickness = impact (critical → medium)</span>
            </li>
            <li style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: Q.brand }}>★</span>
              <span>Cornerstone = the step we always demo</span>
            </li>
          </ul>
        </div>
      </div>

      <div style={{
        maxWidth: 1480, margin: "16px auto 0",
        display: "flex", justifyContent: "flex-end",
      }}>
        <button onClick={onClose} style={{
          background: "transparent", border: `1px solid ${Q.border}`,
          color: Q.textSubtle, fontSize: 11, fontWeight: 500,
          padding: "5px 11px", borderRadius: 5, cursor: "pointer",
          fontFamily: FONT,
        }}>Got it</button>
      </div>
    </div>
  );
}

// ── Period strip ──────────────────────────────────────────────────────────
// Sits under the top bar. Carries the persona tagline + the period chips.
// One row, scrollable horizontally on narrow screens.
function PeriodStrip({ icp, period, periods, onSwitchPeriod, onKeyDown, band }) {
  const icpMeta = ICPS[icp];
  const compact = band === "xs" || band === "sm";
  const padX = compact ? 16 : 24;
  // On xs/sm the tagline + roles stack ABOVE the period chip rail so each
  // gets its own row at full width. On md+ they share a row.
  const stack = compact;
  return (
    <div style={{
      background: Q.card,
      borderBottom: `1px solid ${Q.borderSub}`,
      padding: compact ? "10px 0 12px" : "12px 24px",
      display: "flex",
      flexDirection: stack ? "column" : "row",
      alignItems: stack ? "stretch" : "center",
      gap: stack ? 10 : 18,
      flexWrap: stack ? "nowrap" : "wrap",
      minWidth: 0, maxWidth: "100%", overflow: "hidden",
    }}>
      <div style={{
        display: "flex", alignItems: "center", gap: 10,
        minWidth: 0, flex: stack ? "0 0 auto" : "1 1 auto",
        padding: stack ? `0 ${padX}px` : 0,
      }}>
        <div style={{ width: 3, height: compact ? 24 : 28, background: icpMeta.accent, borderRadius: 2, flexShrink: 0 }} />
        <div style={{ minWidth: 0, flex: 1 }}>
          <div style={{
            fontSize: 10, fontWeight: 600, color: Q.textMuted,
            textTransform: "uppercase", letterSpacing: "0.8px", fontFamily: FONT,
            marginBottom: 2,
            whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
          }}>
            {compact ? icpMeta.roles[0] : icpMeta.roles.join("  \u00b7  ")}
          </div>
          <div style={{ fontSize: 13, fontWeight: 600, color: icpMeta.accent, fontFamily: FONT, letterSpacing: "-0.1px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            {icpMeta.tagline}
          </div>
        </div>
      </div>

      <div role="tablist" aria-label="Select workflow period" className="period-tabs"
        onKeyDown={onKeyDown}
        style={{
          display: "flex", gap: 4, flexShrink: 0,
          // On stacked mode, allow horizontal scroll with side padding so chips
          // bleed nicely off-screen instead of wrapping.
          padding: stack ? `0 ${padX}px` : 0,
          overflowX: stack ? "auto" : "visible",
          width: stack ? "100%" : "auto",
          scrollSnapType: stack ? "x proximity" : "none",
        }}>
        {periods.map((p) => {
          const active = p === period;
          const qc = WORKFLOWS[icp][p].steps.filter((s) => s.quartr).length;
          return (
            <button key={p} role="tab" aria-selected={active} tabIndex={active ? 0 : -1}
              onClick={() => onSwitchPeriod(p)}
              style={{
                background: active ? icpMeta.dim : "transparent",
                border: `1px solid ${active ? icpMeta.border : Q.border}`,
                borderRadius: 6, padding: "6px 12px",
                color: active ? icpMeta.accent : Q.textSubtle,
                fontWeight: active ? 600 : 500, fontSize: 12,
                cursor: "pointer", display: "flex", alignItems: "center", gap: 6,
                fontFamily: FONT,
                // Explicit transition list (no "all"): font-weight 500↔600 is
                // not interpolatable smoothly and was snapping mid-transition,
                // causing a visible shimmer when the active tab swapped on a
                // period click.
                transition: "background-color .12s ease, color .12s ease, border-color .12s ease",
                whiteSpace: "nowrap", minHeight: 32,
                scrollSnapAlign: stack ? "start" : "none",
                flexShrink: 0,
              }}>
              <span style={{ fontSize: 12 }}>{PERIOD_ICON[p]}</span>
              <span>{periodLabel(icp, p)}</span>
              <span style={{
                background: active ? "rgba(255,255,255,0.1)" : Q.borderSub,
                color: active ? icpMeta.accent : Q.textMuted,
                borderRadius: 3, padding: "0 5px", fontSize: 10, fontWeight: 700,
              }}>{qc}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ── Period intro card ─────────────────────────────────────────────────────
// Sits at the top of the right pane when no step is selected. Replaces the
// old "period subheader" + acts as the playbook landing card.
function PeriodIntro({ icp, period, band }) {
  const compact = band === "xs" || band === "sm";
  const heroSize = band === "xl" ? 34 : band === "lg" ? 30 : band === "md" ? 28 : band === "sm" ? 24 : 22;
  const icpMeta = ICPS[icp];
  const wf = WORKFLOWS[icp][period];
  const pb = PLAYBOOKS[icp]?.[period];
  const totalSteps = wf.steps.length;
  const qSteps = wf.steps.filter((s) => s.quartr).length;
  const coverage = Math.round((qSteps / totalSteps) * 100);

  // Top features by frequency across the period
  const featureCounts = new Map();
  wf.steps.forEach((s) => (s.features || []).forEach((f) => featureCounts.set(f, (featureCounts.get(f) || 0) + 1)));
  const topFeatures = [...featureCounts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 5);

  const topPlaybookSteps = (pb?.top || []).map((id) => findStep(icp, period, id)).filter(Boolean);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {/* Hero */}
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
          <span style={{
            fontSize: 10, fontWeight: 700, color: icpMeta.accent,
            background: icpMeta.dim, border: `1px solid ${icpMeta.border}`,
            padding: "3px 8px", borderRadius: 4, textTransform: "uppercase", letterSpacing: "0.8px", fontFamily: FONT,
          }}>{icpMeta.label} · {periodLabel(icp, period)}</span>
        </div>
        <h1 style={{
          margin: 0, fontSize: heroSize, fontWeight: 550, color: Q.text,
          lineHeight: 1.18, letterSpacing: heroSize >= 28 ? "-0.7px" : "-0.4px", fontFamily: FONT,
          textWrap: "balance",
        }}>{wf.tagline}</h1>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 14 }}>
          {wf.goals.map((g, i) => (
            <span key={i} style={{
              background: icpMeta.dim, color: icpMeta.accent,
              border: `1px solid ${icpMeta.border}`,
              padding: "3px 10px", borderRadius: 4,
              fontSize: 11, fontWeight: 600, fontFamily: FONT,
            }}>{g}</span>
          ))}
        </div>
      </div>

      {/* Coverage stat */}
      <div style={{
        background: Q.card, border: `1px solid ${Q.border}`, borderRadius: 8,
        padding: "16px 18px",
      }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 10 }}>
          <span style={{ fontSize: 28, fontWeight: 700, color: Q.brand, fontFamily: FONT, letterSpacing: "-0.6px" }}>{qSteps}</span>
          <span style={{ fontSize: 13, color: Q.textRead, fontFamily: FONT }}>of {totalSteps} workflow steps touched by Quartr Pro</span>
          <span style={{ marginLeft: "auto", fontSize: 11, fontWeight: 600, color: Q.textMuted, fontFamily: FONT }}>{coverage}% coverage</span>
        </div>
        <div style={{ height: 6, background: "rgba(255,255,255,0.05)", borderRadius: 3, overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${coverage}%`, background: Q.brand, borderRadius: 3 }} />
        </div>
      </div>

      {/* Top features for this period */}
      {topFeatures.length > 0 && (
        <div>
          <div style={{ fontSize: 10, fontWeight: 700, color: Q.textMuted, textTransform: "uppercase", letterSpacing: "0.8px", marginBottom: 10, fontFamily: FONT }}>
            Top Quartr features in this period
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {topFeatures.map(([f, count]) => (
              <span key={f} style={{
                display: "inline-flex", alignItems: "center", gap: 6,
                background: "rgba(255,64,0,0.08)",
                border: "1px solid rgba(255,64,0,0.22)",
                color: Q.brand, padding: "5px 10px", borderRadius: 4,
                fontSize: 12, fontWeight: 600, fontFamily: FONT,
              }}>
                <QuartrMark size={9} />
                {f}
                <span style={{ color: Q.textMuted, fontWeight: 600, fontSize: 10 }}>×{count}</span>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Sales playbook — promoted from bottom of page to the default landing
          state of the right pane */}
      {pb && (
        <div style={{
          background: Q.card,
          border: `1px solid ${Q.border}`,
          borderTop: `2px solid ${Q.brand}`,
          borderRadius: 8, padding: "18px 20px",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
            <QuartrMark size={13} />
            <h3 style={{ margin: 0, fontSize: 13, fontWeight: 700, color: Q.text, letterSpacing: "-0.2px", fontFamily: FONT }}>
              Sales Playbook · how to lead
            </h3>
          </div>
          <p style={{ margin: 0, fontSize: 13.5, color: Q.textRead, lineHeight: 1.65, fontFamily: FONT }}>
            {pb.pitch}
          </p>
          {topPlaybookSteps.length > 0 && (
            <div style={{ marginTop: 14, display: "flex", gap: 8, flexWrap: "wrap" }}>
              <span style={{ fontSize: 10, fontWeight: 700, color: Q.textMuted, textTransform: "uppercase", letterSpacing: "0.8px", fontFamily: FONT, alignSelf: "center" }}>
                Lead with →
              </span>
              {topPlaybookSteps.map((s) => (
                <span key={s.id} style={{
                  display: "inline-flex", alignItems: "center", gap: 6,
                  background: Q.cardMid, border: `1px solid ${Q.border}`,
                  borderRadius: 4, padding: "5px 10px",
                  fontSize: 12, color: Q.textRead, fontFamily: FONT,
                }}>
                  <span>{s.icon}</span>
                  <span>{s.title}</span>
                </span>
              ))}
            </div>
          )}
        </div>
      )}

      <p style={{ margin: 0, fontSize: 12, color: Q.textMuted, fontFamily: FONT, textAlign: "center" }}>
        Select a workflow step on the left to see the pain it solves and the Quartr Pro answer.
      </p>
    </div>
  );
}

// ── Step row in the left rail ──────────────────────────────────────────────
function StepRow({ step, isActive, onSelect, isLast, accent }) {
  const isQ = step.quartr;
  // Impact → rail thickness; turns the timeline rail into a visual weight map.
  const railWidth = isQ ? (step.impact === "critical" ? 3 : step.impact === "high" ? 2 : 1) : 1;
  return (
    <button
      onClick={onSelect}
      className="step-row"
      style={{
        all: "unset",
        display: "grid",
        gridTemplateColumns: "44px 1fr",
        alignItems: "stretch",
        cursor: "pointer",
        position: "relative",
        padding: "8px 14px 8px 0",
      }}
    >
      {/* Timeline column */}
      <div style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <StepDot icon={step.icon} isQuartr={isQ} isActive={isActive} accent={accent} />
        {!isLast && (
          <div style={{
            width: railWidth, flex: 1, minHeight: 14,
            background: isQ ? Q.brandBorder : Q.borderSub,
            marginTop: 4, opacity: 0.5,
          }} />
        )}
      </div>

      {/* Title block */}
      <div style={{
        flex: 1, padding: "2px 0 14px 4px",
        borderRadius: 6,
      }}>
        <div style={{
          display: "flex", alignItems: "center", gap: 8, marginBottom: 4,
          fontSize: 10, fontWeight: 600, color: isQ ? Q.brand : Q.textMuted,
          textTransform: "uppercase", letterSpacing: "0.8px", fontFamily: FONT,
          flexWrap: "wrap",
        }}>
          <span style={{ whiteSpace: "nowrap" }}>{step.time}</span>
          {step.isCore && (
            <span style={{
              background: Q.brandDim, color: Q.brand,
              border: `1px solid ${Q.brandBorder}`,
              padding: "1px 6px", borderRadius: 3,
              fontSize: 9, fontWeight: 700, letterSpacing: "0.5px",
            }}>★ Cornerstone</span>
          )}
        </div>
        <div style={{
          fontSize: 13.5, fontWeight: isActive ? 600 : 500,
          color: isActive ? Q.text : Q.textRead,
          fontFamily: FONT, letterSpacing: "-0.2px", lineHeight: 1.35,
        }}>
          {step.title}
        </div>
      </div>

      {/* Active rail accent — thin coloured stripe on the far left of the row */}
      {isActive && (
        <div style={{
          position: "absolute", left: 0, top: 6, bottom: 6,
          width: 2, borderRadius: 2,
          background: isQ ? Q.brand : accent,
        }} />
      )}
    </button>
  );
}

// ── Compact step card (used in the stack-grid + stack-strip layouts) ─────
// On tablets and phones we don't have a vertical rail — the steps render as
// horizontal chips (phone) or a 2-column grid (tablet). This card is denser
// than StepRow and stands on its own without a connecting rail line.
function StepCard({ step, isActive, onSelect, accent, layout }) {
  const isQ = step.quartr;
  // 'strip' = phone horizontal chip, 'grid' = tablet card.
  const strip = layout === "strip";
  return (
    <button onClick={onSelect} className="step-card"
      aria-pressed={isActive}
      style={{
        all: "unset", cursor: "pointer",
        display: "flex", flexDirection: strip ? "row" : "column",
        alignItems: strip ? "center" : "flex-start",
        gap: strip ? 10 : 8,
        background: isActive
          ? (isQ ? "rgba(255,64,0,0.08)" : `${accent}14`)
          : "rgba(255,255,255,0.025)",
        border: `1px solid ${isActive ? (isQ ? Q.brandBorder : `${accent}55`) : Q.borderSub}`,
        borderLeft: isActive
          ? `3px solid ${isQ ? Q.brand : accent}`
          : `1px solid ${Q.borderSub}`,
        borderRadius: 8,
        padding: strip ? "10px 12px" : "12px 14px",
        minWidth: strip ? 180 : 0,
        maxWidth: strip ? 220 : "none",
        flexShrink: 0,
        transition: "background .12s, border-color .12s",
      }}>
      <StepDot icon={step.icon} isQuartr={isQ} isActive={isActive} accent={accent} />
      <div style={{ minWidth: 0, flex: 1 }}>
        <div style={{
          display: "flex", alignItems: "center", gap: 6, marginBottom: 3,
          fontSize: 9.5, fontWeight: 700, color: isQ ? Q.brand : Q.textMuted,
          textTransform: "uppercase", letterSpacing: "0.7px", fontFamily: FONT,
        }}>
          <span style={{ whiteSpace: "nowrap" }}>{step.time}</span>
          {step.isCore && <span title="Cornerstone" style={{ color: Q.brand }}>★</span>}
        </div>
        <div style={{
          fontSize: strip ? 12.5 : 13, fontWeight: isActive ? 600 : 500,
          color: isActive ? Q.text : Q.textRead,
          fontFamily: FONT, letterSpacing: "-0.1px", lineHeight: 1.3,
          textWrap: "balance",
          overflow: "hidden",
          textOverflow: "ellipsis",
          display: "-webkit-box",
          WebkitLineClamp: strip ? 2 : 3,
          WebkitBoxOrient: "vertical",
        }}>
          {step.title}
        </div>
      </div>
    </button>
  );
}

// ── Detail pane — the hero. Pain → Value as the headline. ─────────────────
function DetailPane({ step, accent, band }) {
  const heroSize = band === "xl" ? 28 : band === "lg" ? 26 : band === "md" ? 24 : band === "sm" ? 22 : 20;
  const isQ = step.quartr;
  return (
    <article style={{ display: "flex", flexDirection: "column", gap: 18 }}>
      {/* Title block */}
      <header>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10, flexWrap: "wrap" }}>
          <span style={{ fontSize: 22 }}>{step.icon}</span>
          <span style={{
            fontSize: 10, fontWeight: 700, color: isQ ? Q.brand : Q.textMuted,
            background: isQ ? Q.brandSoft : "transparent",
            border: `1px solid ${isQ ? Q.brandBorder : Q.border}`,
            padding: "3px 8px", borderRadius: 4,
            textTransform: "uppercase", letterSpacing: "0.8px", fontFamily: FONT,
          }}>{step.time}</span>
          {isQ && <QuartrPill />}
          {step.isCore && (
            <span style={{
              background: Q.brandDim, color: Q.brand,
              border: `1px solid ${Q.brandBorder}`,
              padding: "2px 8px", borderRadius: 4,
              fontSize: 9, fontWeight: 700, letterSpacing: "0.5px",
            }}>★ Cornerstone</span>
          )}
          {isQ && step.impact && <ImpactBadge impact={step.impact} />}
        </div>
        <h2 style={{
          margin: 0, fontSize: heroSize, fontWeight: 550, color: Q.text,
          letterSpacing: heroSize >= 24 ? "-0.6px" : "-0.3px", lineHeight: 1.2, fontFamily: FONT,
          textWrap: "balance",
        }}>
          {step.title}
        </h2>
        <p style={{
          margin: "10px 0 0", fontSize: 14.5, color: Q.textRead,
          lineHeight: 1.6, fontFamily: FONT, textWrap: "pretty",
          maxWidth: "62ch",
        }}>
          {step.summary}
        </p>
      </header>

      {/* For Quartr steps: Pain → Value blocks lead, large.
          For non-Quartr steps: just the activities. */}
      {isQ ? (
        <>
          <section style={{
            background: "rgba(255,255,255,0.025)",
            border: `1px solid ${Q.border}`,
            borderRadius: 8, padding: "16px 18px",
          }}>
            <div style={{
              fontSize: 10, fontWeight: 700, color: Q.textMuted,
              textTransform: "uppercase", letterSpacing: "0.9px",
              marginBottom: 8, fontFamily: FONT,
            }}>Today, without Quartr</div>
            <p style={{
              margin: 0, fontSize: 14.5, color: Q.textRead,
              lineHeight: 1.65, fontFamily: FONT, textWrap: "pretty",
              maxWidth: "62ch",
            }}>{step.pain}</p>
          </section>

          <section style={{
            background: "rgba(255,64,0,0.06)",
            border: `1px solid rgba(255,64,0,0.25)`,
            borderLeft: `3px solid ${Q.brand}`,
            borderRadius: 8, padding: "16px 18px",
          }}>
            <div style={{
              display: "flex", alignItems: "center", gap: 8, marginBottom: 10,
            }}>
              <QuartrMark size={12} />
              <span style={{
                fontSize: 10, fontWeight: 700, color: Q.brand,
                textTransform: "uppercase", letterSpacing: "0.9px", fontFamily: FONT,
                whiteSpace: "nowrap",
              }}>How Quartr Pro solves it</span>
            </div>
            <p style={{
              margin: 0, fontSize: 15, color: Q.text,
              lineHeight: 1.65, fontWeight: 500, fontFamily: FONT,
              textWrap: "pretty", maxWidth: "62ch",
            }}>{step.value}</p>

            {step.features && step.features.length > 0 && (
              <div style={{ marginTop: 14, display: "flex", flexWrap: "wrap", gap: 6 }}>
                {step.features.map((f) => <FeatureTag key={f} name={f} />)}
              </div>
            )}
          </section>

          {/* Activities — secondary, collapsed in a quiet block */}
          <section>
            <div style={{
              fontSize: 10, fontWeight: 700, color: Q.textMuted,
              textTransform: "uppercase", letterSpacing: "0.9px",
              marginBottom: 8, fontFamily: FONT,
            }}>Key activities</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {step.tasks.map((t, i) => (
                <span key={i} style={{
                  background: "rgba(255,255,255,0.04)",
                  color: Q.textRead,
                  border: `1px solid ${Q.borderSub}`,
                  padding: "5px 10px", borderRadius: 4,
                  fontSize: 12, fontFamily: FONT,
                }}>{t}</span>
              ))}
            </div>
          </section>
        </>
      ) : (
        <section>
          <div style={{
            fontSize: 10, fontWeight: 700, color: Q.textMuted,
            textTransform: "uppercase", letterSpacing: "0.9px",
            marginBottom: 8, fontFamily: FONT,
          }}>Key activities</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {step.tasks.map((t, i) => (
              <span key={i} style={{
                background: "rgba(255,255,255,0.04)",
                color: Q.textRead,
                border: `1px solid ${Q.borderSub}`,
                padding: "5px 10px", borderRadius: 4,
                fontSize: 12, fontFamily: FONT,
              }}>{t}</span>
            ))}
          </div>
          <p style={{
            margin: "16px 0 0", fontSize: 12, color: Q.textMuted,
            fontStyle: "italic", fontFamily: FONT,
          }}>
            This step doesn't currently map to a Quartr Pro touchpoint. It's
            kept in the workflow so the full picture stays honest.
          </p>
        </section>
      )}
    </article>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────
export default function WorkflowMap() {
  const [icp, setIcp] = useState("IR");
  const [period, setPeriod] = useState("Daily");
  const [activeId, setActiveId] = useState(null);
  const [qOnly, setQOnly] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);

  const icpMeta = ICPS[icp];
  const periods = icpMeta.periods;
  const safePeriod = periods.includes(period) ? period : periods[0];
  const workflow = WORKFLOWS[icp][safePeriod];
  const allSteps = workflow.steps;
  const visibleSteps = qOnly ? allSteps.filter((s) => s.quartr) : allSteps;
  const { band } = useViewport();
  // Three intentionally different layouts (not just shrunken versions):
  //   xs/sm — DETAIL-FIRST. Right pane is at the top (the value above the
  //           fold). Step list below as a horizontally-scrolling chip strip
  //           (xs) or 2-column grid (sm). No vertical rail.
  //   md    — DETAIL-FIRST too, but step list below becomes a denser
  //           2-column grid that uses the wider canvas.
  //   lg/xl — TWO-PANE. Sticky rail left, detail right. The desktop layout.
  const layoutMode =
    (band === "lg" || band === "xl") ? "twoPane"
    : (band === "md" || band === "sm") ? "stackGrid"
    : "stackStrip";
  const isWide = layoutMode === "twoPane";
  // On narrow viewports (phone strip + tablet-portrait grid) the step list
  // belongs above the detail pane: pick a step first, then read its pain →
  // value. md (small laptop / iPad land) keeps detail-first since it has
  // sideways room and the grid sits comfortably below.
  const stepsAboveDetail =
    layoutMode === "stackStrip" || (layoutMode === "stackGrid" && band === "sm");

  // The active step. We deliberately don't auto-select on period change so the
  // right pane returns to the "what to lead with" intro view — which is the
  // most useful default for a sales rep starting a new conversation.
  const activeStep = useMemo(
    () => activeId ? findStep(icp, safePeriod, activeId) : null,
    [icp, safePeriod, activeId]
  );

  const switchIcp = (key) => {
    setIcp(key);
    setPeriod(ICPS[key].periods[0]);
    setActiveId(null);
    setQOnly(false);
  };
  const switchPeriod = (p) => {
    setPeriod(p);
    setActiveId(null);
  };

  const onPeriodKeyDown = (e) => {
    const idx = periods.indexOf(safePeriod);
    if (idx < 0) return;
    let next = idx;
    if (e.key === "ArrowRight") next = (idx + 1) % periods.length;
    else if (e.key === "ArrowLeft") next = (idx - 1 + periods.length) % periods.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = periods.length - 1;
    else return;
    e.preventDefault();
    switchPeriod(periods[next]);
  };

  return (
    <div style={{
      fontFamily: FONT, color: Q.text, minHeight: "100vh",
      // Two stacked gradients: ICP wash on top, page-fade beneath. Single
      // backgroundImage avoids the prior `background` + `backgroundImage`
      // conflict where the shorthand reset the image then the longhand set
      // it again — React touched both properties on every render and could
      // briefly repaint the gradient on innocuous re-renders like a period
      // switch.
      backgroundColor: Q.bg,
      backgroundImage: `linear-gradient(180deg, ${ICP_WASH[icp]} 0%, transparent 600px), linear-gradient(180deg, ${Q.bgPage} 0%, ${Q.bg} 280px)`,
      overflowX: "hidden", maxWidth: "100vw",
    }}>
      <TopBar
        icp={icp} qOnly={qOnly} band={band}
        onSwitchIcp={switchIcp}
        onToggleQ={() => setQOnly(!qOnly)}
        aboutOpen={aboutOpen}
        onToggleAbout={() => setAboutOpen(o => !o)}
      />
      <PeriodStrip
        icp={icp} period={safePeriod} periods={periods} band={band}
        onSwitchPeriod={switchPeriod} onKeyDown={onPeriodKeyDown}
      />
      {aboutOpen && <AboutPanel onClose={() => setAboutOpen(false)} band={band} />}

      {/* Workspace — three intentionally different layouts:
          twoPane    (lg/xl): rail left + detail right, sticky.
          stackGrid  (md/sm): detail first, then a 2-column step grid below.
          stackStrip (xs):    detail first, then a horizontal step strip below. */}
      <main className={`qm-workspace qm-workspace--${layoutMode}`}
        style={{
          display: "grid",
          gridTemplateColumns:
            layoutMode === "twoPane"
              ? (band === "xl" ? "minmax(300px, 360px) 1fr" : "minmax(280px, 320px) 1fr")
              : "1fr",
          alignItems: "start",
          maxWidth: band === "xl" ? 1480 : (isWide ? 1320 : 880),
          margin: "0 auto",
          padding:
            band === "xl" ? "24px 32px 72px"
            : band === "lg" ? "20px 24px 60px"
            : band === "md" ? "20px 24px 56px"
            : band === "sm" ? "16px 20px 48px"
            : "12px 14px 40px",
          gap: band === "xl" ? 28 : band === "lg" ? 20 : 18,
          rowGap: band === "xs" ? 14 : 18,
        }}>

        {/* ── DETAIL PANE ── always rendered.
            On twoPane it sits in the right column. On stack* it leads above
            the step list so the actual sales weapon is above the fold. */}
        <section className="qm-detail" style={{
          order: layoutMode === "twoPane" ? 2 : (stepsAboveDetail ? 2 : 1),
          background: band === "xs" ? "transparent" : Q.card,
          border: band === "xs" ? "none" : `1px solid ${Q.border}`,
          borderRadius: band === "xs" ? 0 : 12,
          padding:
            band === "xl" ? "36px 40px"
            : band === "lg" ? "32px 36px"
            : band === "md" ? "28px 30px"
            : band === "sm" ? "24px 22px"
            : "16px 8px",
          minHeight: layoutMode === "twoPane" ? "calc(100vh - 200px)" : "auto",
        }}>
          {activeStep
            ? <DetailPane step={activeStep} accent={icpMeta.accent} band={band} />
            : <PeriodIntro icp={icp} period={safePeriod} band={band} />
          }
        </section>

        {/* ── STEP LIST ── three forms:
            twoPane    → vertical rail of StepRow with connecting line
            stackGrid  → 2/3-col card grid (above detail on sm, below on md)
            stackStrip → horizontal scrolling chip strip, above detail on xs */}
        <aside style={{
          order: layoutMode === "twoPane" ? 1 : (stepsAboveDetail ? 1 : 2),
          position: layoutMode === "twoPane" ? "sticky" : "static",
          top: layoutMode === "twoPane" ? 132 : "auto",
          maxHeight: layoutMode === "twoPane" ? "calc(100vh - 152px)" : "auto",
          overflowY: layoutMode === "twoPane" ? "auto" : "visible",
          padding: layoutMode === "twoPane" ? "0 8px 0 0" : 0,
        }} className={layoutMode === "twoPane" ? "qm-rail" : ""}>
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            marginBottom: 12, padding: "0 4px",
          }}>
            <div style={{
              fontSize: 11, fontWeight: 700, color: Q.textMuted,
              textTransform: "uppercase", letterSpacing: "0.9px", fontFamily: FONT,
            }}>
              {layoutMode === "twoPane" ? "Workflow" : "Steps in this period"}
              {" · "}{visibleSteps.length} {visibleSteps.length === 1 ? "step" : "steps"}
            </div>
            {activeId && (
              <button onClick={() => setActiveId(null)} style={{
                background: "transparent", border: "none", cursor: "pointer",
                color: Q.textSubtle, fontSize: 11, fontFamily: FONT,
                padding: "4px 8px", borderRadius: 4, fontWeight: 500,
              }}>← Overview</button>
            )}
          </div>

          {layoutMode === "twoPane" && (
            <div>
              {visibleSteps.map((s, i) => (
                <StepRow key={s.id} step={s}
                  isActive={activeId === s.id}
                  onSelect={() => setActiveId(s.id)}
                  isLast={i === visibleSteps.length - 1}
                  accent={icpMeta.accent}
                />
              ))}
            </div>
          )}

          {layoutMode === "stackGrid" && (
            <div style={{
              display: "grid",
              gridTemplateColumns: band === "md" ? "repeat(3, 1fr)" : "repeat(2, 1fr)",
              gap: 10,
            }}>
              {visibleSteps.map((s) => (
                <StepCard key={s.id} step={s}
                  isActive={activeId === s.id}
                  onSelect={() => setActiveId(s.id)}
                  accent={icpMeta.accent} layout="grid" />
              ))}
            </div>
          )}

          {layoutMode === "stackStrip" && (
            // Phone strip. Each wrapper needs flex-shrink: 0 explicitly —
            // styles.css applies `* { min-width: 0 }` (a standard reset that
            // prevents flex items from clipping their children) and without
            // shrink:0 here the wrappers collapse under the cards' minWidth,
            // so the cards overflow their wrappers and overlap horizontally.
            <div className="qm-strip" style={{
              display: "flex", gap: 10,
              overflowX: "auto", paddingBottom: 8,
              scrollSnapType: "x proximity",
              margin: "0 -14px", padding: "0 14px 10px",
            }}>
              {visibleSteps.map((s) => (
                <div key={s.id} style={{
                  scrollSnapAlign: "start",
                  flex: "0 0 auto",   // don't grow, don't shrink, base on content
                }}>
                  <StepCard step={s}
                    isActive={activeId === s.id}
                    onSelect={() => setActiveId(s.id)}
                    accent={icpMeta.accent} layout="strip" />
                </div>
              ))}
            </div>
          )}
        </aside>
      </main>

      {/* Footer legend — small, single line */}
      <footer style={{
        borderTop: `1px solid ${Q.borderSub}`,
        padding: "16px 24px",
        display: "flex", justifyContent: "center", alignItems: "center", gap: 22,
        flexWrap: "wrap", fontSize: 11, color: Q.textMuted, fontFamily: FONT,
      }}>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
          <QuartrMark size={9} /> Quartr Pro touchpoint
        </span>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: Q.critical, display: "inline-block" }} /> Critical
        </span>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: Q.high, display: "inline-block" }} /> High
        </span>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: Q.med, display: "inline-block" }} /> Medium
        </span>
        <span style={{ opacity: 0.6 }}>·</span>
        <span>
          Tap any step{
            layoutMode === "twoPane" ? " on the left" :
            stepsAboveDetail ? " above" :
            " below"
          } to surface its pain → value
        </span>
      </footer>
    </div>
  );
}

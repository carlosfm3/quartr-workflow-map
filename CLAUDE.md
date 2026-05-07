# CLAUDE.md — Quartr ICP Workflow Intelligence Map

## What this app is

A sales-enablement web app that visualises how Quartr's three customer personas — IR teams, Buyside analysts, and Sellside equity researchers — actually spend their time, and where Quartr Pro features fit inside each workflow. Each ICP gets a set of time-period tabs (daily rhythms, weekly cadences, key annual milestones, and the full earnings cycle). Every step in the map is either a genuine Quartr touchpoint (with pain, value, and features documented) or an honest non-Quartr step. The map runs at quartr-workflow-map.vercel.app, is auto-deployed from `main` via Vercel, and every PR branch gets a preview URL automatically.

---

## Repo layout

```
src/
  data.js          — WORKFLOWS + PLAYBOOKS. ~95% of all edits land here.
  tokens.js        — Design tokens: Q palette, FONT, ICP_WASH. Touch only when adding a new ICP or adjusting brand colour.
  atoms.jsx        — Pure presentational primitives (QuartrMark, ImpactBadge, FeatureTag, StepDot, QuartrPill, Caret). Edit for visual tweaks only.
  WorkflowMap.jsx  — Rendering, responsive layout (five viewport bands), state management. Edit for layout/UX changes only.
```

`data.js` is the only file that changes during normal content work. The rendering layer reads from it but has no content knowledge of its own.

**Key exports from `data.js`:**
- `ICPS` — ICP config (label, accent colours, period list, persona roles).
- `QF` — Quartr Pro feature constants.
- `PERIOD_ICON`, `PERIOD_LABEL`, `PERIOD_LABEL_BY_ICP`, `periodLabel()` — period display metadata.
- `WORKFLOWS` — the full step tree, keyed `WORKFLOWS[icp][period].steps`.
- `PLAYBOOKS` — per ICP x period sales pitches, keyed `PLAYBOOKS[icp][period]`.
- `findStep(icp, period, id)` — resolves PLAYBOOKS `top` step IDs; used by the rendering layer.

---

## ICP and period structure

**IR and Buyside** use time-based periods: `Daily`, `Weekly`, `Monthly`, `Yearly`, `PreEarnings`, `EarningsDay`, `PostEarnings`.

**Sellside** uses a workflow-aligned IA per the Sell-Side Navigation PRD: `Daily`, `PreEarnings`, `EarningsDay`, `PostEarnings`, `NonEarnings`. `EarningsDay` renders as "Earnings (live)" for Sellside only, via `PERIOD_LABEL_BY_ICP`.

This IA is fixed. Do not restructure it without an explicit request from Carlos.

---

## Step schema

Every entry in a `steps` array has this shape:

```js
{
  id:       "sell-ed-print",     // string — unique across the whole file. Convention: icp-prefix + period-abbrev + short-descriptor
  time:     "Press Release",     // free-form display string: "7-9 AM", "T-14", "Q1-Q4 x4", etc.
  icon:     "⚡",                // single emoji
  title:    "Live Print — First-Look Scaffold",  // 3-6 words, action-led (see Title conventions)
  summary:  "...",              // one sentence describing what the analyst does at this moment
  tasks:    ["...", "..."],     // 3-6 concrete sub-tasks as short noun phrases
  quartr:   true,               // boolean — is Quartr genuinely useful here?

  // Required when quartr: true:
  features: [QF.PRESS, QF.AI], // 1-5 QF constants
  pain:     "...",              // friction without Quartr (50-80 words, second-person, specific)
  value:    "...",              // how Quartr features dispatch that friction (50-80 words, specific)
  impact:   "critical",        // "critical" | "high" | "medium"

  // Optional flags:
  isCore:   true,               // marks the 1-2 most important steps in a period — drives visual weight in the rail
  major:    true,               // Yearly period only — marks annual milestones for larger rendering
}
```

**When `quartr: false`:** omit `features`, `pain`, `value`, and `impact` entirely. The step still appears on the map with `tasks` and `summary` intact.

**`impact` enum:**
- `"critical"` — brand orange accent, thickest rail line. Quartr is genuinely decisive here.
- `"high"` — green. Significant time-save or signal improvement.
- `"medium"` — blue. Useful but not the core use case.

**`isCore`:** use sparingly — one or two steps per period maximum. Avoid assigning it to `quartr: false` steps.

**Step ID convention:** `{icp}-{period-abbrev}-{descriptor}`. ICP prefixes: `ir`, `buy`, `sell`. Period abbreviations: `d` (Daily), `w` (Weekly), `m` (Monthly), `y` (Yearly), `pre` (PreEarnings), `ed` (EarningsDay), `post` (PostEarnings), `non` (NonEarnings).

---

## Feature taxonomy (QF.*)

Defined near the top of `data.js`. Each constant maps to a real named Quartr Pro feature:

| Constant | Display name |
|---|---|
| `QF.SEARCH` | Global Transcript Search |
| `QF.SLIDE` | Slide Search |
| `QF.SUMMARY` | Event Summaries |
| `QF.MENTION` | Mentioned By |
| `QF.KEYWORD` | Keyword Alerts |
| `QF.HISTORY` | History Mode |
| `QF.AI` | AI Chat |
| `QF.LIVE_AI` | AI Chat on Live Events |
| `QF.UPLOAD` | Document Upload |
| `QF.TEMPLATE` | Prompt Templates |
| `QF.WATCHLIST` | Watchlists |
| `QF.BOOKMARK` | Bookmarks & Folders |
| `QF.SPLIT` | Split-View |
| `QF.LIVE` | Live Earnings Calls |
| `QF.PRESS` | Press Releases |
| `QF.NAV` | Event & Document Navigation |
| `QF.CHAPTERS` | Transcript Chapters |
| `QF.GOVERNANCE` | Governance Filings |
| `QF.MCP` | Claude MCP |

**Rule for adding a new feature:** declare the constant in the `QF` object (upper-case key, title-case display string), then append it to the `features` arrays of any steps where it genuinely applies. Update the `value` text of those steps to name the feature explicitly. Never pad a feature list — every entry must reflect real product value at that workflow moment.

---

## Title conventions

**Pattern:** `<Object> + <Action>` or `<Action> + <Object>`, 3-6 words. The title should communicate what the analyst does, not the tool name or the output artefact.

**Good examples from the codebase:**
- "Pre-Market Sweep" — action verb + object, immediately clear
- "Competitive Intelligence Sweep" — object + action, scans well in the rail
- "Read-Through Radar" — named capability, action-oriented
- "Earnings Preview Builder" — object + verb-as-noun
- "Live Print — First-Look Scaffold" — compound with dash, acceptable for named product features

**Anti-patterns:**
- Pure event nouns with no action: "Investor Days" (marginal — acceptable only when the step IS the event)
- Tool name as title: avoid leading with the tool ("Note Publishing Hub" is borderline; "Note Publishing" would be cleaner)
- Redundant suffixes that don't add meaning: "— Initiation Workspace" as a standalone title without the action lead
- Marketing descriptors: "Powerful Competitive Intelligence Solution"

Titles appear in both the left-rail step list (space-constrained) and the detail pane header. Short, scannable titles work better in the rail.

---

## Voice for pain / value

**Pain block:** The friction the analyst experiences without Quartr. Write in second person ("you", "your"). Be specific — name the task, the time cost, the specific thing that gets missed. No marketing language. Roughly 50-80 words.

**Value block:** How specific Quartr Pro features resolve that friction. Name the features by their product names (Watchlist, AI Chat, Keyword Alerts, History Mode — not "our platform" or "Quartr's capabilities"). Describe what the feature does at this specific workflow moment, not what it does in general. Roughly 50-80 words.

**Register benchmark — pair from `ir-d3`:**

Pain: "Finding what a peer CFO said on last quarter's call about a topic your investors will ask about requires manually scrubbing hours of recordings — and risk terms like 'impairment' or 'covenant breach' never get caught at all."

Value: "Keyword Alerts run passively across 14,000+ companies — firing the moment a tracked term appears on any earnings call. Global Transcript Search finds the exact quote in seconds. Connect via Claude MCP to turn alert hits into structured competitive digests automatically."

If a value block could pass as a homepage headline, it is too generic. Pull it back toward the specific moment.

---

## Honesty rule (`quartr: false`)

When a workflow step genuinely does not involve Quartr — financial modelling in Excel, compliance review, CRM entry, proxy statement legal review, conference travel, board briefings, IC presentations — mark it `quartr: false` and **omit** `features`, `pain`, `value`, and `impact` entirely. Do not invent a Quartr angle. The map's credibility with sales reps depends on it being selective.

**Current `quartr: false` examples in the codebase:**
- `ir-d2` — Investor Inbox & CRM Triage
- `ir-d5` — End-of-Day Wrap & Management Brief
- `ir-w1` — IR Team Sync & Priority Setting
- `ir-w5` — Weekly IR Report to CFO/CEO
- `ir-m5` — Events & Calendar Planning
- `ir-y5` — Strategic Investor Targeting
- `buy-d5` — Portfolio Review & IC Prep
- `buy-w1` — Portfolio & Earnings Calendar Review
- `buy-m1` — Portfolio Attribution & Review
- `buy-m5` — Monthly IC Reporting & Strategy
- `buy-pre4` — Position Sizing Review
- `buy-ed4` — Position & Conviction Update
- `sell-d5` — End-of-Day Wrap & Tomorrow's Setup

When uncertain whether Quartr applies, default to `quartr: false`. A conservative honest map is more valuable in a sales demo than an over-claimed one.

---

## PLAYBOOKS

`PLAYBOOKS[icp][period]` has two fields:

```js
{
  pitch: "...",          // 1-2 sentence hook written for the sales rep, not the prospect
  top:   ["id1", "id2"] // 1-2 step IDs to lead the demo with — must exist in WORKFLOWS[icp][period].steps
}
```

**The `pitch`** often opens with a discovery question ("Ask: 'How do you...?'") then states exactly what to demo. Keep it concrete and demo-specific — it will be read in a live call context.

**`top` IDs are a hard reference.** Every ID listed in `top` must exist as a step in `WORKFLOWS[icp][period].steps`. If you rename or delete a step, scan every `PLAYBOOKS` entry for the old ID and update it. The cross-reference check below catches stale references.

---

## Common operations

### 1. Add a new Quartr feature

1. Open `src/data.js`.
2. In the `QF` object, add: `NEWKEY: "Display Name As Shown In UI"`.
3. Identify the steps where the feature genuinely applies.
4. Append `QF.NEWKEY` to their `features` arrays.
5. Update the `value` text of those steps to name the feature if it isn't already covered.
6. Run `npm run build` — must succeed.
7. Commit: `feat: add QF.NEWKEY (Display Name) to N steps`.

### 2. Add a new step

1. Locate the target `WORKFLOWS[icp][period].steps` array.
2. Insert the new step object in chronological order using the ID convention described in the schema section.
3. If `quartr: true`, fill all required fields: `features`, `pain`, `value`, `impact`. Review the voice guide before writing.
4. If `quartr: false`, omit those four fields.
5. Decide whether the new step should be referenced in `PLAYBOOKS[icp][period].top`. Update `pitch` if relevant.
6. Run `npm run build`.
7. Run the PLAYBOOKS cross-reference check.

### 3. Rename or remove a step

1. Apply the change in `WORKFLOWS`.
2. Search the entire file for the old ID: `grep -n "old-step-id" src/data.js`.
3. Update every matching `PLAYBOOKS.top` reference.
4. If removing an `isCore` step, consider whether another step in that period warrants `isCore: true`.
5. Run `npm run build` and the PLAYBOOKS check.

### 4. Audit a workflow period

Use this template before proposing any rewrites. **Do not apply edits directly** — produce the review table, share it with Carlos, and wait for confirmation.

For each step, check four criteria:

| Criterion | Question |
|---|---|
| Real recurring activity | Does this task actually recur at this cadence for this ICP? |
| Title is action-led | Does the title follow the `<Object> + <Action>` convention? |
| Features still apply | Are all listed QF constants genuinely relevant here, or have any become stale? |
| Pain is honest | Does the pain block describe a current friction — not something Quartr already solves, and not inflated? |

**Output format:** a markdown table with one row per step: Step ID / Title / Flag (ok | review-title | review-features | review-pain | review-quartr) / Notes. Then stop. Do not rewrite multiple steps in one pass without explicit confirmation per step.

---

## Verification and deploy

```bash
npm install
npm run build      # must succeed before any commit
```

**If `EPERM` on `dist/` during build** (FUSE quirk in the Cowork sandbox):
```bash
mv dist dist.old.$RANDOM && npm run build
```

**PLAYBOOKS cross-reference check** — paste into a `node --input-type=module` session from the repo root:

```js
import { WORKFLOWS, PLAYBOOKS } from './src/data.js';
let ok = true;
for (const [icp, periods] of Object.entries(PLAYBOOKS)) {
  for (const [period, pb] of Object.entries(periods)) {
    for (const id of (pb.top || [])) {
      const steps = WORKFLOWS[icp]?.[period]?.steps || [];
      if (!steps.find(s => s.id === id)) {
        console.error(`BROKEN: PLAYBOOKS.${icp}.${period}.top references "${id}" — not found`);
        ok = false;
      }
    }
  }
}
if (ok) console.log('All PLAYBOOKS.top IDs resolve OK');
```

**Branch and PR workflow:**
- One branch per change, cut from `origin/main`.
- Vercel auto-generates a preview URL for every open PR.
- Squash-and-merge into `main` — Vercel deploys automatically.
- Do not push from the Cowork sandbox (no GitHub auth). Hand the push command to Carlos.

---

## Sandbox quirks (agents in Cowork sessions)

The FUSE-mounted filesystem at `/sessions/.../mnt/quartr-workflow-map` cannot unlink `.lock` files. This causes errors like:

```
fatal: Unable to create '.../.git/index.lock': File exists.
```

**Workaround A** — overwrite the lock with an empty file:
```bash
> .git/index.lock
> .git/objects/maintenance.lock
```

**Workaround B** (more reliable) — clone to `/tmp` and work there:
```bash
git clone /sessions/.../mnt/quartr-workflow-map /tmp/quartr-work
cd /tmp/quartr-work
git checkout origin/main -b your-branch-name
# ... make changes, commit ...
# Copy finished file(s) back before handing over:
cp CLAUDE.md /sessions/.../mnt/quartr-workflow-map/CLAUDE.md
```

The `/tmp` clone has a local `origin` pointing at the mounted repo, not GitHub. To get the branch to GitHub, check it out in the desktop repo and push from there, or give Carlos the explicit push command.

**Push command after this CLAUDE.md commit:**
```bash
cd ~/Desktop/quartr-workflow-map
git push -u origin add-claude-md
```

---

## What NOT to change without asking

**IR and Buyside workflow data:** more mature, already validated with Carlos. If you spot issues (stale pain text, a title that breaks convention, a missing Quartr angle), produce an audit table and wait for confirmation. Do not unilaterally rewrite multiple steps.

**The period IA:** the period structure for each ICP is fixed by product decisions documented in the Sell-Side Navigation PRD. Do not add, remove, or rename periods without an explicit request from Carlos.

- IR + Buyside: `Daily / Weekly / Monthly / Yearly / PreEarnings / EarningsDay / PostEarnings`
- Sellside: `Daily / PreEarnings / EarningsDay / PostEarnings / NonEarnings`

**`tokens.js`:** do not change palette values during content work. The only valid reason to touch this file is adding a new ICP — which requires Carlos sign-off on the accent colour before touching the file.

**`WorkflowMap.jsx`:** do not touch for content work. It contains no business data. Only edit it for explicit layout or UX tasks.

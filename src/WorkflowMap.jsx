import { useState } from "react";

// ─── Quartr Design System (extracted live from quartr.com) ───────────────────
// Font:        InterVariable, Inter — weight 550 headlines, tight letter-spacing
// Background:  #0D0D0E  (rgb 13,13,14  — body/page)
// Card dark:   #111212  (rgb 17,18,18  — panels)
// Card mid:    #1A1A1B  (rgb 26,26,27  — elevated panels)
// Card hover:  #282829  (--color-v4BgPanelHover)
// Border sub:  #1E2023  (--quik_border-neutral-subtler)
// Border:      #262A2F  (--quik_border-neutral-subtle)
// Icon muted:  #485259  (--quik_form-border-filled)
// Text:        #FBFCFC  (--quik_text-default)
// Text read:   #D2D5D7  (--quik_text-reading)
// Text subtle: #8F98A1  (--quik_text-subtle)
// Brand red:   #FF4000  (Quartr logomark / star icon — exact SVG fill)
// Btn primary: #FBFCFC bg · #111212 text · radius 4–6px

const Q = {
  // Page
  bg:          "#0D0D0E",
  bgPage:      "#0A0A0B",
  // Cards
  card:        "#111212",
  cardMid:     "#1A1A1B",
  cardHover:   "#282829",
  // Borders
  borderSub:   "#1E2023",
  border:      "#262A2F",
  borderMid:   "#38424A",
  // Text
  text:        "#FBFCFC",
  textRead:    "#D2D5D7",
  textSubtle:  "#8F98A1",
  textMuted:   "#485259",
  // Brand
  brand:       "#FF4000",   // Quartr red-orange — used for ALL Quartr Pro markers
  brandDim:    "rgba(255,64,0,0.15)",
  brandBorder: "rgba(255,64,0,0.35)",
  // Buttons
  btnBg:       "#FBFCFC",
  btnText:     "#111212",
  // ICP accents (work on dark bg, each visually distinct)
  ir:          "#4A9EF5",   // Blue  — IR
  irDim:       "rgba(74,158,245,0.12)",
  irBorder:    "rgba(74,158,245,0.3)",
  buy:         "#34D399",   // Green — Buyside
  buyDim:      "rgba(52,211,153,0.12)",
  buyBorder:   "rgba(52,211,153,0.3)",
  sell:        "#A78BFA",   // Purple — Sellside
  sellDim:     "rgba(167,139,250,0.12)",
  sellBorder:  "rgba(167,139,250,0.3)",
  // Impact
  critical:    "#FF4000",
  critDim:     "rgba(255,64,0,0.12)",
  critBorder:  "rgba(255,64,0,0.3)",
  high:        "#34D399",
  highDim:     "rgba(52,211,153,0.12)",
  highBorder:  "rgba(52,211,153,0.3)",
  med:         "#4A9EF5",
  medDim:      "rgba(74,158,245,0.12)",
  medBorder:   "rgba(74,158,245,0.3)",
};

const FONT = "'InterVariable', 'Inter', -apple-system, sans-serif";

// ─── ICP Config ───────────────────────────────────────────────────────────────
const ICPS = {
  IR: {
    label: "Investor Relations", abbr: "IR", icon: "🏢",
    tagline: "Manage the equity story. Protect the share price.",
    accent: Q.ir, dim: Q.irDim, border: Q.irBorder,
    roles: ["Head of IR", "IR Manager", "IR Officer", "CFO"],
  },
  Buyside: {
    label: "Buyside", abbr: "BUY", icon: "📈",
    tagline: "Find alpha, build conviction, manage risk.",
    accent: Q.buy, dim: Q.buyDim, border: Q.buyBorder,
    roles: ["Portfolio Manager", "Equity Analyst", "Hedge Fund Analyst"],
  },
  Sellside: {
    label: "Sellside", abbr: "SELL", icon: "🔬",
    tagline: "Cover companies, inform clients, move markets.",
    accent: Q.sell, dim: Q.sellDim, border: Q.sellBorder,
    roles: ["Equity Research Analyst", "Research Associate", "Sector Strategist"],
  },
};

// ─── Quartr Pro Feature Tags ───────────────────────────────────────────────────
const QF = {
  SEARCH:     "Global Transcript Search",
  SLIDE:      "Slide Search",
  SUMMARY:    "Event Summaries",
  MENTION:    "Mentioned By",
  KEYWORD:    "Keyword Alerts",
  HISTORY:    "History Mode",
  AI:         "AI Chat",
  LIVE_AI:    "AI Chat on Live Events",
  UPLOAD:     "Document Upload",
  TEMPLATE:   "Prompt Templates",
  WATCHLIST:  "Watchlists",
  BOOKMARK:   "Bookmarks & Folders",
  SPLIT:      "Split-View",
  LIVE:       "Live Earnings Calls",
  PRESS:      "Press Releases",
  NAV:        "Event & Document Navigation",
  CHAPTERS:   "Transcript Chapters",
  GOVERNANCE: "Governance Filings",
  MCP:        "Claude MCP",
};

// ─── Workflow Data ─────────────────────────────────────────────────────────────
const WORKFLOWS = {
  IR: {
    Daily: {
      tagline: "Stay ahead of the market — protect the narrative every day",
      goals: ["Market monitoring", "Investor responsiveness", "Competitive awareness"],
      steps: [
        { id:"ir-d1", time:"7–9 AM", icon:"☀️",
          title:"Morning Market & Intelligence Briefing",
          summary:"Check own stock, scan overnight peer filings, review press releases and any mentions of your company across the market",
          tasks:["Stock price & volume check","Pre-market peer announcement scan","Overnight press release & 8-K review","'Mentioned By' feed — who referenced you overnight"],
          quartr:true, features:[QF.MENTION,QF.SUMMARY,QF.PRESS,QF.WATCHLIST],
          pain:"Visiting each competitor's IR site or EDGAR manually to catch overnight filings and mentions wastes 45–60 minutes every morning — and things still get missed.",
          value:"The Watchlist surfaces every event, press release, and filing for your peer set overnight. The 'Mentioned By' feed catches every reference to your company. Event Summaries give you the full earnings digest in seconds — all before the market opens.",
          impact:"high" },
        { id:"ir-d2", time:"9–11 AM", icon:"📧",
          title:"Investor Inbox & CRM Triage",
          summary:"Prioritise investor and analyst emails, log call notes, escalate data requests to finance",
          tasks:["Email priority triage","Talking point drafting","CRM entry & updates","VIP investor flagging"],
          quartr:false },
        { id:"ir-d3", time:"11 AM–1 PM", icon:"🔍",
          title:"Competitive Intelligence Sweep",
          summary:"Monitor what peers are saying, how analysts are framing the sector, flag any narrative risks",
          tasks:["Peer announcement tracking","Keyword alert digest review","Sector theme monitoring","Competitor press release scan"],
          quartr:true, features:[QF.KEYWORD,QF.SEARCH,QF.CHAPTERS,QF.MCP],
          pain:"Finding what a peer CFO said on last quarter's call about a topic your investors will ask about requires manually scrubbing hours of recordings — and risk terms like 'impairment' or 'covenant breach' never get caught at all.",
          value:"Keyword Alerts run passively across 14,000+ companies — firing the moment a tracked term appears on any earnings call. Global Transcript Search finds the exact quote in seconds. Connect via Claude MCP to turn alert hits into structured competitive digests automatically.",
          impact:"high" },
        { id:"ir-d4", time:"1–4 PM", icon:"📞",
          title:"Investor & Analyst Outreach",
          summary:"Conduct investor calls, prep talking points, handle ad-hoc meeting requests",
          tasks:["Investor calls & follow-ups","Talking point updates","Live peer call monitoring","Analyst relationship management"],
          quartr:true, features:[QF.SEARCH,QF.TEMPLATE,QF.AI,QF.LIVE_AI],
          pain:"Preparing a sharp, data-backed position for a surprise investor call in 30 minutes is nearly impossible without a central reference point. And when a key peer is reporting live, there's no way to monitor their call and manage your own agenda simultaneously.",
          value:"Reusable Prompt Templates give instant access to your Q&A framework. AI Chat on Live Events lets you query a peer's earnings call as it's happening — extracting what their CFO just said on your investors' key topic, in real time.",
          impact:"medium" },
        { id:"ir-d5", time:"4:30 PM", icon:"📋",
          title:"End-of-Day Wrap & Management Brief",
          summary:"Compile daily summary of notable events, brief the CFO/CEO, set tomorrow's priorities",
          tasks:["Daily events summary","Management briefing note","CRM finalisation","Next-day agenda"],
          quartr:false },
      ],
    },
    Weekly: {
      tagline: "Synthesise intelligence, align stakeholders, sharpen the narrative",
      goals: ["Investor activity synthesis", "Peer benchmarking", "Management alignment"],
      steps: [
        { id:"ir-w1", time:"Monday", icon:"🤝",
          title:"IR Team Sync & Priority Setting",
          summary:"Recap prior week, set the week's communication priorities, align on the event calendar",
          tasks:["IR team standup","Key events recap","Calendar review","Open items tracking"],
          quartr:false },
        { id:"ir-w2", time:"Tue–Wed", icon:"🏦",
          title:"Peer Intelligence Report",
          summary:"Compile weekly digest of competitor earnings, press releases, investor days, and sector narratives",
          tasks:["Peer announcement & press release aggregation","Key competitor quote extraction","Sector theme tracking","Keyword alert digest review"],
          quartr:true, features:[QF.SEARCH,QF.SLIDE,QF.SUMMARY,QF.PRESS,QF.BOOKMARK,QF.MCP],
          pain:"Building a peer intelligence report means visiting 10–20 IR sites, checking press releases, and manually compiling highlights — easily half a working day.",
          value:"Press releases, transcripts, slides, and event summaries for every peer in one searchable library. Slide Search surfaces competitor visuals. Use Claude MCP to turn the whole digest into a structured briefing automatically — bookmark the best quotes as you go.",
          impact:"high" },
        { id:"ir-w3", time:"Wednesday", icon:"✍️",
          title:"Messaging & Content Refresh",
          summary:"Update FAQs, refresh talking points, review public IR materials for accuracy and competitive positioning",
          tasks:["FAQ and Q&A updates","Talking point refresh","Website IR content review","Narrative consistency check"],
          quartr:true, features:[QF.SLIDE,QF.HISTORY,QF.AI],
          pain:"Knowing whether your investor narrative is best-in-class is nearly impossible without visibility into how top-performing IR teams communicate.",
          value:"Slide Search shows how peer IR teams visually present their story. History Mode tracks how their narratives evolve quarter-over-quarter — a live benchmark.",
          impact:"medium" },
        { id:"ir-w4", time:"Thursday", icon:"🎯",
          title:"Investor Meeting Preparation",
          summary:"Brief management ahead of investor meetings, anticipate tough questions, tailor the story by investor type",
          tasks:["Investor background research","Q&A anticipation prep","Management briefing deck","Talking points by investor type"],
          quartr:true, features:[QF.SEARCH,QF.CHAPTERS,QF.TEMPLATE,QF.AI],
          pain:"Anticipating what a specific investor will challenge you on requires knowing what they've asked management teams across your sector — a question that's impossible to answer without reading hundreds of Q&A sections.",
          value:"Search Q&A sections across all public earnings calls to surface recurring investor pressure points. Transcript Chapters jump straight to Q&A. Ask AI Chat: 'What questions has this investor type asked most persistently in our sector?' — and walk into the meeting prepared.",
          impact:"high" },
        { id:"ir-w5", time:"Friday", icon:"📈",
          title:"Weekly IR Report to CFO/CEO",
          summary:"Compile weekly investor interactions, stock vs. peers, and notable events for leadership",
          tasks:["Investor interaction summary","Stock vs. peer performance","Notable events & themes","Next week outlook"],
          quartr:false },
      ],
    },
    Monthly: {
      tagline: "Own the shareholder base, drive the narrative, protect the premium",
      goals: ["Ownership analysis", "Management reporting", "Materials excellence"],
      steps: [
        { id:"ir-m1", time:"Week 1", icon:"📊",
          title:"Shareholder Base Analysis",
          summary:"Review 13F filings, identify new institutional holders, track position changes and activist risk",
          tasks:["13F institutional ownership review","New holder identification","Position size change tracking","Activist risk screening"],
          quartr:false },
        { id:"ir-m2", time:"Week 2", icon:"⚖️",
          title:"Deep-Dive Peer Benchmarking",
          summary:"Comprehensive peer comparison: messaging, narrative positioning, KPI disclosure, analyst framing",
          tasks:["Peer KPI disclosure review","Transcript theme & language analysis","Narrative benchmarking","Analyst sentiment comparison"],
          quartr:true, features:[QF.SEARCH,QF.SLIDE,QF.HISTORY,QF.AI,QF.MCP],
          pain:"Monthly benchmarking takes days of manual research and is frequently deprioritised because the time cost is prohibitive — which means IR messaging is benchmarked against instinct rather than data.",
          value:"AI Chat runs a peer benchmarking analysis across all comparable transcripts and slides in minutes. History Mode shows exactly how competitor narratives have shifted quarter by quarter. Use Claude MCP to run the analysis directly in your AI environment and output a structured report.",
          impact:"high" },
        { id:"ir-m-narrative", time:"Week 2–3", icon:"🧭",
          title:"Narrative & KPI Audit",
          summary:"Audit your own equity story for drift — track which KPIs you've introduced, dropped, or reframed across the last 6–8 quarters",
          tasks:["Prepared remarks comparison across 8 quarters","KPI foregrounding shift analysis","Language drift detection","Equity story gap identification"],
          quartr:true, features:[QF.HISTORY,QF.AI,QF.TEMPLATE,QF.MCP],
          pain:"Equity stories don't fail all at once — they drift. A KPI moves from headline to footnote, a strategic frame quietly shifts. By the time analysts reprice, the signal was already visible in the transcripts for 2–4 quarters.",
          value:"Use AI Chat to review your last 8 earnings transcripts chronologically and flag every instance language shifted from confident to hedged — or vice versa. History Mode maps the full arc in one view. Prompt: 'Compare how [Company] opened prepared remarks in Q1 [Year-2] vs Q1 [Year]. Which KPIs moved to footnote? What new language appeared?' Use Claude MCP to run this audit on a recurring schedule before every earnings cycle.",
          impact:"high" },
        { id:"ir-m3", time:"Wk 2–3", icon:"📋",
          title:"Monthly Management IR Dashboard",
          summary:"Prepare monthly IR dashboard with investor feedback, sentiment, and competitive context for board and CFO",
          tasks:["IR activity KPIs","Stock performance vs. peers","Key investor feedback","Analyst & media sentiment"],
          quartr:true, features:[QF.MENTION,QF.KEYWORD,QF.SUMMARY],
          pain:"Adding meaningful competitive context to management reports requires hours of research that usually gets cut when time is tight.",
          value:"'Mentioned By' feeds directly into your competitive context section. Keyword tracking data shows how often your key themes are being discussed across the market.",
          impact:"medium" },
        { id:"ir-m4", time:"Week 3", icon:"🖊️",
          title:"IR Materials & Investor Deck Update",
          summary:"Refresh investor presentation, update fact sheet, ensure all public IR content is current and compelling",
          tasks:["Investor deck refresh","Fact sheet updates","Website content audit","Press release archive"],
          quartr:true, features:[QF.SLIDE,QF.UPLOAD,QF.AI],
          pain:"Improving IR materials without visibility into how best-in-class IR teams in your sector structure their story means working blind.",
          value:"Upload your deck to AI Chat for instant feedback. Slide Search shows how peers frame similar KPIs and tell their growth story.",
          impact:"medium" },
        { id:"ir-m5", time:"Week 4", icon:"📅",
          title:"Events & Calendar Planning",
          summary:"Manage the IR calendar, confirm conferences and NDR schedules, plan earnings logistics",
          tasks:["Conference & NDR scheduling","Earnings date coordination","Investor day pipeline","Management travel"],
          quartr:false },
      ],
    },
    Yearly: {
      tagline: "The milestones that define the company's investor narrative",
      goals: ["Earnings cycle excellence", "Annual report & AGM", "Investor Day", "Strategic targeting"],
      steps: [
        { id:"ir-y1", time:"Q1 · Jan–Mar", icon:"📄", major:true,
          title:"Annual Report & 10-K Filing",
          summary:"Produce and publish the annual report and 10-K — the cornerstone of investor disclosure",
          tasks:["Annual report narrative","10-K with legal & finance","Investor & media distribution","Website posting"],
          quartr:true, features:[QF.SEARCH,QF.GOVERNANCE,QF.UPLOAD],
          pain:"Structuring a best-in-class annual report without competitive benchmarks on peer disclosure depth and format leads to missed opportunities.",
          value:"Access and compare annual reports and governance filings across your entire peer set. Upload your draft to AI Chat for narrative gap identification.",
          impact:"high" },
        { id:"ir-y2", time:"Q1–Q4 · ×4", icon:"🎤", major:true, isCore:true,
          title:"Earnings Cycle",
          summary:"The highest-stakes recurring IR event — preparation, execution, and distribution of quarterly results",
          tasks:["Earnings script & Q&A prep","Press release production","Slides & visual materials","Earnings call hosting","Transcript & replay distribution","Post-earnings roadshow"],
          quartr:true, features:[QF.SEARCH,QF.TEMPLATE,QF.AI,QF.LIVE_AI,QF.UPLOAD,QF.SUMMARY,QF.LIVE,QF.PRESS,QF.NAV],
          pain:"Each earnings cycle involves weeks of fragmented work: peer transcript research for prep, manual materials distribution, and no way to monitor live peer calls while managing your own. No single source of truth.",
          value:"Every earnings stage accelerated — AI Chat researches peer scripts for Q&A prep; AI Chat on Live Events lets you query peer calls as they happen; Press Releases, slides, and transcripts are unified in one event view via the new navigation; Prompt Templates standardise your workflow; Event Summaries create instant post-call digests.",
          impact:"critical" },
        { id:"ir-y3", time:"Q1–Q2 · Mar–Jun", icon:"🏛️", major:true,
          title:"Annual General Meeting (AGM)",
          summary:"Manage proxy statement, shareholder vote logistics, and the AGM presentation",
          tasks:["Proxy statement drafting","Shareholder vote logistics","AGM presentation materials","Post-AGM communication"],
          quartr:true, features:[QF.GOVERNANCE,QF.SLIDE,QF.UPLOAD],
          pain:"Knowing how to position your AGM and proxy communications relative to peer best practice requires significant manual research.",
          value:"Governance Filings gives direct access to proxy statements across your peer universe. Slide Search surfaces how comparable companies structure their AGM presentations.",
          impact:"medium" },
        { id:"ir-y4", time:"Q2–Q3 · May–Sep", icon:"🌟", major:true, isCore:true,
          title:"Investor Day / Capital Markets Day",
          summary:"The flagship annual IR event — full-day investor event with executive deep-dives and major narrative reset",
          tasks:["Event strategy & multi-exec planning","Re-rating catalyst research","Presentation development","Investor outreach & registration","Materials production & distribution","Live event management","Post-event follow-up"],
          quartr:true, features:[QF.SLIDE,QF.SEARCH,QF.HISTORY,QF.UPLOAD,QF.AI,QF.MCP],
          pain:"Planning a standout Investor Day without visibility into how competitors structure their events, presentations, and narratives is a critical blind spot. And knowing which narrative moves have actually unlocked valuation in your sector requires research most IR teams can't do in time.",
          value:"Study every peer Investor Day — presentations, KPI formats, capital allocation framing — all searchable in Quartr Pro. Use AI Chat to reverse-engineer which narrative moves drove re-ratings in your sector 2–4 quarters before they happened. Upload your draft deck for pre-event stress-testing. Claude MCP lets you run the full analysis in your own AI environment.",
          impact:"critical" },
        { id:"ir-y5", time:"Q3 · Jul–Sep", icon:"🎯", major:false,
          title:"Strategic Investor Targeting",
          summary:"Identify and proactively engage new institutional investors aligned with your equity story",
          tasks:["Target investor identification","Conference strategy","Outreach campaigns","Investor perception studies"],
          quartr:false },
        { id:"ir-y6", time:"Q4 · Oct–Dec", icon:"🗓️", major:false,
          title:"Year-End Strategy & Next Year Planning",
          summary:"Review full-year IR performance, set guidance strategy, build next year's IR plan",
          tasks:["Full-year IR review","Guidance strategy","Next year IR calendar","Budget planning"],
          quartr:true, features:[QF.HISTORY,QF.AI,QF.KEYWORD],
          pain:"Strategic IR planning without a panoramic view of how competitive communications have evolved across the year leads to reactive IR.",
          value:"History Mode maps every shift in peer narratives across four quarters. AI Chat synthesises full-year trends to sharpen next year's strategy.",
          impact:"medium" },
      ],
    },
  },

  Buyside: {
    Daily: {
      tagline: "Find signal, build conviction, stay ahead of every name you own",
      goals: ["Portfolio monitoring", "Earnings intelligence", "New idea sourcing"],
      steps: [
        { id:"buy-d1", time:"Pre-Market", icon:"⚡",
          title:"Overnight Earnings & Portfolio Briefing",
          summary:"Check portfolio company news, overnight earnings results, press releases and filings from names you're monitoring",
          tasks:["Portfolio company news scan","Overnight earnings results & press releases","Keyword alert digest","Pre-market price & volume for holdings"],
          quartr:true, features:[QF.LIVE,QF.SUMMARY,QF.PRESS,QF.WATCHLIST,QF.KEYWORD],
          pain:"Tracking overnight earnings, press releases, and material filings across a diversified portfolio means checking dozens of sites before market open — almost no one does this comprehensively.",
          value:"Your Watchlist surfaces every earnings event, press release, and filing for your holdings overnight. Keyword Alerts catch sector signals you weren't actively looking for. Event Summaries give you a structured digest of each result before you've opened Bloomberg.",
          impact:"high" },
        { id:"buy-d2", time:"9:30–12 PM", icon:"📡",
          title:"Live Earnings Call Coverage",
          summary:"Follow live calls for portfolio and watchlist companies — extract key data points, management tone, and guidance changes in real time",
          tasks:["Live call attendance (audio + transcript)","Real-time AI questioning on live transcript","KPI & guidance extraction","Press release vs. prepared remarks comparison"],
          quartr:true, features:[QF.LIVE,QF.LIVE_AI,QF.SPLIT,QF.PRESS,QF.NAV,QF.CHAPTERS],
          pain:"Following a live call while reading the press release, comparing to model, and extracting key quotes is a 3-screen exercise — something always gets missed, especially when covering two calls simultaneously.",
          value:"AI Chat on Live Events lets you ask questions directly on the live transcript as management speaks — 'What guidance did they give on margins?' without waiting for the replay. Split-View and the new Event Navigation keep the live transcript, press release, and slides open together in one unified workspace.",
          impact:"critical" },
        { id:"buy-d3", time:"Midday", icon:"🔍",
          title:"Post-Earnings Deep-Dive & Model Update",
          summary:"Process earnings results, extract key metrics, compare to prior quarters, update financial model",
          tasks:["KPI extraction from transcript & slides","Actuals vs. prior quarter comparison","Model update & estimate revision","Conviction rating review"],
          quartr:true, features:[QF.AI,QF.UPLOAD,QF.SEARCH,QF.SUMMARY],
          pain:"Extracting specific KPIs, management commentary changes, and comparable quotes from dense transcripts takes hours of manual reading.",
          value:"AI Chat extracts any KPI, ratio, or management quote on demand. Upload your earnings preview and compare it line-by-line to the actual transcript — instantly identify where you were wrong.",
          impact:"high" },
        { id:"buy-d4", time:"Afternoon", icon:"💡",
          title:"New Idea Research & Thesis Building",
          summary:"Research new investment ideas, build initial understanding of a company's narrative and competitive position",
          tasks:["Company earnings history review","Peer positioning analysis","Management communication style assessment","Initial thesis framework"],
          quartr:true, features:[QF.SEARCH,QF.HISTORY,QF.AI,QF.SLIDE],
          pain:"Getting up to speed on a new name requires reading years of transcripts, filings, and presentations — a multi-day process with traditional tools.",
          value:"AI Chat compresses years of transcripts into a structured briefing in minutes. History Mode shows how the company's key messages and KPIs have evolved — the thesis trajectory in one view.",
          impact:"high" },
        { id:"buy-d5", time:"EOD", icon:"📋",
          title:"Portfolio Review & IC Prep",
          summary:"Review portfolio positions, flag conviction changes, prep for morning IC discussion",
          tasks:["Position review & sizing","Conviction change flagging","IC discussion prep","Risk review"],
          quartr:false },
      ],
    },
    Weekly: {
      tagline: "Stress-test every position and find the next great trade",
      goals: ["Thesis stress-testing", "Earnings week management", "Sector intelligence"],
      steps: [
        { id:"buy-w1", time:"Monday", icon:"📋",
          title:"Portfolio & Earnings Calendar Review",
          summary:"Review the week's earnings calendar across holdings and watchlist, set research priorities",
          tasks:["Earnings calendar review","Portfolio P&L & attribution","Research priority setting","IC / PM briefing"],
          quartr:false },
        { id:"buy-w2", time:"Tue–Thu", icon:"📡",
          title:"Earnings Week Coverage",
          summary:"Cover earnings calls across portfolio and watchlist; process results fast and update models",
          tasks:["Multi-company live call coverage","Real-time AI questioning on live calls","Rapid result processing","Actuals vs. estimates comparison","Cross-company theme extraction"],
          quartr:true, features:[QF.LIVE,QF.LIVE_AI,QF.SPLIT,QF.PRESS,QF.NAV,QF.SUMMARY,QF.CHAPTERS,QF.TEMPLATE],
          pain:"Earnings season is an information avalanche — covering 10+ companies in a week while processing results deeply is practically impossible without workflow automation.",
          value:"AI Chat on Live Events lets you extract answers from any call in real time — no waiting for the replay. Press Releases sit alongside transcripts and slides in the new unified event view. Event Summaries process each result automatically. Prompt Templates standardise your post-earnings analysis so nothing gets missed.",
          impact:"critical" },
        { id:"buy-w3", time:"Wednesday", icon:"🔬",
          title:"Sellside Research Interrogation",
          summary:"Digest sellside notes on your holdings; challenge consensus assumptions with primary source data",
          tasks:["Sellside note review","Consensus assumption challenge","Primary source verification","Counter-thesis identification"],
          quartr:true, features:[QF.UPLOAD,QF.AI,QF.SEARCH],
          pain:"Sellside research is dense and consensus-anchored. Challenging it with primary sources requires digging through transcripts that don't cross-reference each other.",
          value:"Upload any sellside report to AI Chat. Ask it to identify where the analyst's assumptions diverge from what management has actually said — with transcript citations.",
          impact:"high" },
        { id:"buy-w4", time:"Thursday", icon:"🌐",
          title:"Sector & Supply Chain Intelligence",
          summary:"Track what companies across your sector's ecosystem are signalling — customers, suppliers, competitors",
          tasks:["Keyword alert digest review","Customer company call review","Supplier commentary extraction","Competitor management tone analysis","Sector theme triangulation"],
          quartr:true, features:[QF.MENTION,QF.KEYWORD,QF.SEARCH,QF.MCP],
          pain:"Understanding the full supply chain signal requires monitoring dozens of companies across multiple sub-sectors — impossible to do manually at scale. And the most important signals — a competitor namedrop, a 'buyback' announcement, a capex pivot — are buried in calls you didn't cover.",
          value:"Keyword Alerts run passively all week across 14,000+ companies — surfacing competitor namedrops, capital allocation signals, and risk terms the moment they appear in any earnings call. 'Mentioned By' catches every time your holdings are referenced. Claude MCP turns the week's alert hits into a structured sector intelligence digest automatically.",
          impact:"high" },
        { id:"buy-w-keyword", time:"Ongoing", icon:"⚙️",
          title:"Automated Keyword Intelligence Feed",
          summary:"Passive background monitoring of sectors, themes, and risk signals across the full universe — running continuously while you focus elsewhere",
          tasks:["Keyword alert configuration & maintenance","Risk term monitoring (impairment, covenant, restatement)","Capital allocation signal tracking (buyback, M&A, deleveraging)","Sector theme feed (sector-specific language: ARR, GLP-1, reshoring)","Weekly alert digest review"],
          quartr:true, features:[QF.KEYWORD,QF.MENTION,QF.WATCHLIST,QF.MCP],
          pain:"~10,000 earnings calls hit the wire every quarter. Buried inside are exact signals that move portfolios: a competitor namedrop, a 'restatement' whisper, a surprise capex pivot. Nobody has time to listen to all of them — which means most signals are caught from a sellside note rather than the source.",
          value:"Configure Keyword Alerts for risk terms, capital allocation signals, competitor names, and sector-specific themes. Quartr monitors every call across 14,000+ companies and delivers alerts the moment any tracked term enters the public domain — straight from management, before the analyst note is written. Pair with Claude MCP to automatically convert alert hits into structured investment digests. This runs in the background all week, compounding intelligence passively.",
          impact:"high" },
        { id:"buy-w5", time:"Friday", icon:"🎯",
          title:"Weekly Thesis Review & IC Presentation",
          summary:"Consolidate week's research, update conviction ratings, present new ideas or changes to IC",
          tasks:["Conviction rating updates","New idea presentation prep","Risk factor refresh","Next week research priorities"],
          quartr:false },
      ],
    },
    Monthly: {
      tagline: "Portfolio construction, risk management, and big-picture thesis work",
      goals: ["Portfolio construction", "Thesis stress-testing", "New idea generation"],
      steps: [
        { id:"buy-m1", time:"Week 1", icon:"🗂️",
          title:"Portfolio Attribution & Review",
          summary:"Deep-dive into what drove returns, which theses played out, and where the misses were",
          tasks:["Attribution analysis","Thesis hit-rate review","Position sizing assessment","Drawdown postmortem"],
          quartr:false },
        { id:"buy-m2", time:"Week 2", icon:"🔬",
          title:"Deep Research on Core Positions",
          summary:"Monthly deep-dive into highest-conviction positions — re-reading transcripts, checking narrative drift",
          tasks:["Multi-year transcript review","Management tone & consistency check","KPI foregrounding shift audit","Thesis vs. reality gap analysis"],
          quartr:true, features:[QF.HISTORY,QF.AI,QF.SEARCH,QF.BOOKMARK,QF.MCP],
          pain:"Re-reading transcripts from 6–8 quarters back to check for narrative drift or management credibility issues takes 2–3 full days per company. KPI definition changes go undetected and quietly break models.",
          value:"History Mode shows KPI and narrative evolution across every quarter in a single timeline. AI Chat surfaces every instance management changed their language on a given topic — and flags when a KPI definition shifted. Use Claude MCP to automate monthly narrative drift checks across your entire book.",
          impact:"high" },
        { id:"buy-m3", time:"Wk 2–3", icon:"💡",
          title:"New Idea Generation & Screening",
          summary:"Systematically screen for new ideas — sector deep-dives, thematic research, event-driven opportunities",
          tasks:["Sector transcript screening","Thematic search across companies","Management quality assessment","Initial financial screen"],
          quartr:true, features:[QF.SEARCH,QF.SLIDE,QF.AI,QF.SUMMARY],
          pain:"Screening for new ideas requires reading enough about each company to form a view — there are thousands of companies across relevant sectors.",
          value:"AI Chat compresses any company's multi-year transcript history into a structured investment brief in minutes. Slide Search finds every company that has mentioned a specific growth theme.",
          impact:"high" },
        { id:"buy-m4", time:"Week 3", icon:"📊",
          title:"ESG & Governance Deep-Dive",
          summary:"Review governance practices, compensation structures, and any activist or proxy-related dynamics",
          tasks:["Proxy filing review","Compensation structure analysis","Board composition check","Activist monitoring"],
          quartr:true, features:[QF.GOVERNANCE,QF.MENTION,QF.SEARCH],
          pain:"Governance analysis requires digging through proxy statements — documents that are notoriously hard to parse and cross-reference.",
          value:"Governance Filings gives structured access to proxy statements across all holdings. 'Mentioned By' flags any activist or governance-related commentary from external sources.",
          impact:"medium" },
        { id:"buy-m5", time:"Week 4", icon:"📅",
          title:"Monthly IC Reporting & Strategy",
          summary:"Present monthly portfolio review to fund management; flag thesis changes, new ideas, and risk updates",
          tasks:["Portfolio review deck","New ideas presentation","Risk & scenario update","Outlook & positioning"],
          quartr:false },
      ],
    },
    Yearly: {
      tagline: "The rhythms that shape annual performance and long-term alpha",
      goals: ["Full earnings cycle", "Investor Day season", "Annual portfolio construction"],
      steps: [
        { id:"buy-y1", time:"Q1–Q4 · ×4", icon:"🎤", major:true, isCore:true,
          title:"Earnings Season (×4/year)",
          summary:"The dominant recurring cycle — processing results across the portfolio efficiently and extracting the real signal",
          tasks:["Multi-company call coverage","Real-time AI Chat on live calls","Rapid earnings processing","Actuals vs. model comparison","Post-earnings position review","Guidance extraction"],
          quartr:true, features:[QF.LIVE,QF.LIVE_AI,QF.SUMMARY,QF.SPLIT,QF.PRESS,QF.NAV,QF.AI,QF.UPLOAD,QF.TEMPLATE],
          pain:"Four earnings seasons define the year. Without an efficient workflow, analysts are drowning in calls and notes — and the signal gets buried in noise.",
          value:"AI Chat on Live Events gives you answers from any call as management speaks. Press Releases, transcripts, and slides unified in one event view. Real-time transcripts, AI Event Summaries, and earnings preview vs. actual comparison — Quartr Pro covers the full earnings workflow in one place.",
          impact:"critical" },
        { id:"buy-y2", time:"Q2–Q3 · May–Sep", icon:"🌟", major:true, isCore:true,
          title:"Investor Day Season",
          summary:"Management teams lay out their multi-year strategy — the richest information event of the year",
          tasks:["Investor Day attendance (live + real-time AI)","Long-term guidance extraction","Management quality assessment","Thesis confirmation or challenge"],
          quartr:true, features:[QF.LIVE,QF.LIVE_AI,QF.SLIDE,QF.NAV,QF.AI,QF.SUMMARY,QF.BOOKMARK],
          pain:"Investor Days are the richest information events of the year — hours of management presentations that are impossible to process efficiently without the right tools. Most PMs miss half the CMDs they want to cover.",
          value:"Attend live with AI Chat answering your questions in real time as management presents. Every Investor Day — live audio, slides, transcript, and press releases — in one unified view. AI Chat extracts multi-year targets and capital allocation commitments in minutes from the replay if you missed it.",
          impact:"critical" },
        { id:"buy-y3", time:"Q1 · Jan–Mar", icon:"📄", major:true,
          title:"Annual Report Season",
          summary:"Annual reports and 20-F filings provide the deepest management commentary — a qualitative goldmine",
          tasks:["Annual report / 20-F deep-read","Risk factor analysis","MD&A commentary extraction","Year-on-year comparison"],
          quartr:true, features:[QF.GOVERNANCE,QF.AI,QF.UPLOAD,QF.HISTORY],
          pain:"Annual reports are dense — extracting key management insights and comparing them year-on-year requires hours of careful reading per company.",
          value:"AI Chat extracts and synthesises the key narrative from annual reports and 20-Fs in minutes. History Mode shows how risk disclosures and MD&A language have changed.",
          impact:"high" },
        { id:"buy-y4", time:"Q3 · Jul–Sep", icon:"🌍", major:false,
          title:"Conference Season",
          summary:"Bank-hosted conferences where management teams make off-schedule presentations — an underused source",
          tasks:["Conference presentation review","Management fireside tracking","Cross-company theme extraction","Meeting intel processing"],
          quartr:true, features:[QF.LIVE,QF.SEARCH,QF.SUMMARY],
          pain:"Management teams often say things in conference presentations they don't say on earnings calls — tracking dozens of appearances manually is impractical.",
          value:"Quartr captures conference presentations and firesides from 14,000+ companies. Event Summaries mean you never miss a signal from a presentation you couldn't attend.",
          impact:"medium" },
        { id:"buy-y5", time:"Q4 · Oct–Dec", icon:"🗓️", major:false,
          title:"Annual Portfolio Construction & Outlook",
          summary:"Build next year's portfolio, set position sizing, identify new sectors or themes for the year ahead",
          tasks:["Annual portfolio review","Thesis prioritisation","New sector/theme identification","Sizing & risk framework"],
          quartr:true, features:[QF.HISTORY,QF.AI,QF.KEYWORD],
          pain:"Making high-conviction annual portfolio decisions without a comprehensive view of how each company's narrative has evolved across the year is flying blind.",
          value:"History Mode maps the full-year narrative evolution for every holding. AI Chat synthesises four quarters of earnings calls into the key themes and thesis confirmation points.",
          impact:"medium" },
      ],
    },
  },

  Sellside: {
    Daily: {
      tagline: "Be the first call — before the market opens and after the close",
      goals: ["Pre-market intelligence", "Client value delivery", "Coverage excellence"],
      steps: [
        { id:"sell-d1", time:"5–7 AM", icon:"⚡",
          title:"Pre-Market Earnings & News Sweep",
          summary:"Process overnight earnings, press releases, and filings from covered and adjacent companies; draft the morning note before clients are at their desks",
          tasks:["Covered company earnings results & press releases","Adjacent sector announcements","Pre-market price action","Draft morning note bullets"],
          quartr:true, features:[QF.SUMMARY,QF.PRESS,QF.NAV,QF.LIVE,QF.WATCHLIST,QF.AI],
          pain:"Processing overnight earnings, press releases, and filing changes and drafting a sharp morning note before 7 AM requires a research infrastructure most analysts don't have.",
          value:"Event Summaries process each earnings result the moment it drops. Press releases now sit alongside transcripts and slides in one unified event view — no switching between sources. Structured output ready to build your morning note from before the market opens.",
          impact:"critical" },
        { id:"sell-d2", time:"7–9 AM", icon:"📝",
          title:"Morning Note & Client Briefing",
          summary:"Publish morning note, brief sales team, field early client calls on key developments",
          tasks:["Morning note publication","Sales team briefing","Key client calls","Price target flag review"],
          quartr:false },
        { id:"sell-d3", time:"9:30 AM–1 PM", icon:"📡",
          title:"Live Earnings Call Coverage",
          summary:"Cover live calls from companies in and adjacent to your sector; extract quotes, KPIs, and guidance changes instantly",
          tasks:["Live call attendance","Real-time AI Chat on live transcript","KPI & guidance extraction","Q&A monitoring for key signals","Flash note drafting during the call"],
          quartr:true, features:[QF.LIVE,QF.LIVE_AI,QF.SPLIT,QF.PRESS,QF.NAV,QF.CHAPTERS,QF.AI],
          pain:"Following the live call, reading the press release, extracting key quotes for the flash note, and tracking management tone simultaneously is a 3-person job with traditional tools.",
          value:"AI Chat on Live Events lets you query the live transcript as management speaks — 'What did the CFO just say about margins?' — while you're drafting. Split-View and the new unified Event Navigation keep the live transcript, press release, and slides in one workspace. Flash note is half-written before the Q&A ends.",
          impact:"critical" },
        { id:"sell-d4", time:"1–4 PM", icon:"📊",
          title:"Post-Earnings Analysis & Note Publishing",
          summary:"Deep-dive into results, update estimates, write the full research note, and distribute to clients",
          tasks:["Actuals vs. preview comparison","Press release vs. transcript cross-check","Estimate revision","Research note drafting","Client distribution"],
          quartr:true, features:[QF.UPLOAD,QF.AI,QF.PRESS,QF.NAV,QF.SEARCH,QF.TEMPLATE],
          pain:"Comparing actual results to your earnings preview line-by-line and publishing a quality note — all within 2 hours of the call — is an extreme time pressure.",
          value:"Upload your earnings preview to AI Chat: it identifies every line where actuals deviated, with transcript citations. Press releases are now unified with transcripts and slides in one view — no context switching. Prompt Templates standardise your post-earnings note structure so depth doesn't get sacrificed for speed.",
          impact:"critical" },
        { id:"sell-d5", time:"4–6 PM", icon:"📋",
          title:"Client Follow-Up & Model Maintenance",
          summary:"Field post-close client questions, update financial model, flag estimate changes to sales team",
          tasks:["Client Q&A calls","Financial model updates","Estimate revision flagging","Tomorrow's priorities"],
          quartr:false },
      ],
    },
    Weekly: {
      tagline: "Build differentiated views and deliver them to clients before consensus catches up",
      goals: ["Differentiated research", "Coverage management", "Client value"],
      steps: [
        { id:"sell-w1", time:"Monday", icon:"📅",
          title:"Coverage Calendar & Priority Setting",
          summary:"Review the week's events across covered universe, assign research priorities, brief the sales team",
          tasks:["Earnings calendar review","Research priority alignment","Sales team briefing","Upcoming event prep list"],
          quartr:false },
        { id:"sell-w2", time:"Tue–Thu", icon:"📡",
          title:"Earnings Season Coverage Sprint",
          summary:"Cover multiple earnings calls across your sector; turn around quality research quickly and consistently",
          tasks:["Multi-company live call coverage with real-time AI","Flash note publication","Full note drafting","Estimate revision across universe"],
          quartr:true, features:[QF.LIVE,QF.LIVE_AI,QF.SUMMARY,QF.SPLIT,QF.PRESS,QF.NAV,QF.TEMPLATE,QF.UPLOAD],
          pain:"Covering 5–10 earnings in a single week while maintaining quality across flash notes, full notes, and estimate revisions is an almost impossible sprint.",
          value:"AI Chat on Live Events means flash note bullets are drafted while the call is still running. Event Summaries, Split-View with unified press release access, and standardised Prompt Templates turn a 3-hour post-earnings workflow into 45 minutes — without sacrificing depth.",
          impact:"critical" },
        { id:"sell-w3", time:"Wednesday", icon:"🔍",
          title:"Sector Thematic Research",
          summary:"Identify sector-wide themes emerging from earnings transcripts; build the differentiated view clients pay for",
          tasks:["Keyword alert digest review","Cross-company transcript theme extraction","Consensus vs. reality gap analysis","Thematic note drafting","Client call on key themes"],
          quartr:true, features:[QF.SEARCH,QF.AI,QF.KEYWORD,QF.CHAPTERS,QF.MCP],
          pain:"Identifying a sector theme before consensus requires reading dozens of transcripts for a signal that might appear in just a few sentences across many companies.",
          value:"Keyword Alerts surface exact quotes across 14,000+ companies the moment a theme emerges in any earnings call. AI Chat synthesises cross-company patterns into a thematic brief. Claude MCP lets you turn the week's alert hits into a structured thematic digest inside your own AI environment — before the rest of the Street has read the transcripts.",
          impact:"high" },
        { id:"sell-w-intel", time:"Ongoing", icon:"⚙️",
          title:"Automated Coverage Intelligence Pipeline",
          summary:"Passive keyword monitoring across the full covered universe and adjacent sectors — running continuously so you catch signals the moment they enter the public domain",
          tasks:["Keyword alert configuration by sector theme","Risk term alerts (impairment, restatement, SEC inquiry)","Capital allocation signal tracking","Competitor & customer mention monitoring","Weekly digest via Claude MCP"],
          quartr:true, features:[QF.KEYWORD,QF.MENTION,QF.WATCHLIST,QF.MCP],
          pain:"The most valuable signals — a company in your supply chain flagging demand weakness, a competitor announcing a surprise buyback, a management team using 'restatement' for the first time — are buried in calls you didn't cover. By the time the sellside note lands, the edge is gone.",
          value:"Configure Keyword Alerts for your sector's critical terms and risk signals. Quartr monitors every public earnings call and event across 14,000+ companies and delivers alerts straight from the source — before the sellside note exists. Pair with Claude MCP to automatically synthesise the week's signals into a structured intelligence digest. This is the differentiated view clients pay for, built passively.",
          impact:"high" },
        { id:"sell-w4", time:"Thursday", icon:"📊",
          title:"Model & Estimate Revision Cycle",
          summary:"Update financial models across covered universe based on earnings; revise estimates and flag price target changes",
          tasks:["KPI extraction from transcripts","Estimate revision across universe","Price target review","Rating change assessment"],
          quartr:true, features:[QF.AI,QF.SEARCH,QF.HISTORY],
          pain:"Extracting the exact KPIs and management comments needed for model updates from dense transcripts — across 10+ companies — is a half-day exercise.",
          value:"AI Chat extracts any KPI or guidance change from any transcript on demand. History Mode flags where a KPI definition has changed — which breaks models silently.",
          impact:"high" },
        { id:"sell-w5", time:"Friday", icon:"🎯",
          title:"Client Call & Week Wrap",
          summary:"Synthesise the week's findings for top clients; identify what you got wrong and how your thesis has evolved",
          tasks:["Top client debrief calls","Thesis evolution review","Differentiated view identification","Next week's research priorities"],
          quartr:false },
      ],
    },
    Monthly: {
      tagline: "Build conviction, initiate coverage, and create content clients can't get elsewhere",
      goals: ["Coverage initiation", "Differentiated research", "Client education"],
      steps: [
        { id:"sell-m1", time:"Week 1", icon:"📋",
          title:"Coverage Universe Review",
          summary:"Monthly review of the full covered universe — ratings at risk, story drift, what needs a re-read",
          tasks:["Full universe earnings review","Narrative drift detection","Consensus gap analysis","Rating risk assessment"],
          quartr:true, features:[QF.HISTORY,QF.AI,QF.KEYWORD,QF.MCP],
          pain:"A monthly universe review requires re-reading recent transcripts for 15–20+ companies — a task that rarely happens because there isn't enough time. Rating changes are triggered by narrative drift that was visible in the transcripts quarters earlier.",
          value:"AI Chat generates a structured company update — management tone, KPI trends, narrative shifts — for each covered name in minutes. History Mode flags where the story has changed. Use Claude MCP to run the full universe review automatically and surface the names with the most significant drift since last quarter.",
          impact:"high" },
        { id:"sell-m2", time:"Week 2", icon:"📝",
          title:"Coverage Initiation Deep-Dive",
          summary:"Comprehensive research on a new coverage initiation — full transcript and filing history to build conviction",
          tasks:["Multi-year transcript deep-read","Annual report & filing analysis","Competitor positioning analysis","Financial model construction"],
          quartr:true, features:[QF.HISTORY,QF.AI,QF.SEARCH,QF.SLIDE,QF.GOVERNANCE],
          pain:"A proper coverage initiation requires reading years of transcripts, filings, and presentations — a 2–3 week process that drains research resources.",
          value:"AI Chat compresses 5 years of earnings transcripts into a structured narrative chronology. History Mode maps the evolution of every key metric and management commitment.",
          impact:"high" },
        { id:"sell-m3", time:"Wk 2–3", icon:"🌐",
          title:"Sector Monthly Report",
          summary:"Monthly sector-wide report synthesising earnings themes, estimate revisions, and the differentiated view",
          tasks:["Cross-company theme extraction","Sector multiple & valuation analysis","Key quote compilation","Differentiated view articulation"],
          quartr:true, features:[QF.SEARCH,QF.AI,QF.KEYWORD,QF.BOOKMARK],
          pain:"Writing a genuinely differentiated monthly sector report requires identifying cross-company patterns that are invisible without reading everything.",
          value:"AI Chat surfaces cross-sector themes across all transcripts in your covered universe. Bookmarked quotes build your evidence base as you go.",
          impact:"high" },
        { id:"sell-m4", time:"Week 3", icon:"📊",
          title:"Client Education & Thought Leadership",
          summary:"Deep educational content for clients — 'how to think about X' pieces that build relationships and demonstrate expertise",
          tasks:["Thematic deep-dive note","Client webinar preparation","Peer benchmarking content","Historical analysis & pattern"],
          quartr:true, features:[QF.HISTORY,QF.AI,QF.SLIDE,QF.SEARCH],
          pain:"Producing compelling thought leadership requires synthesising patterns across large amounts of qualitative source material — a week's work without the right tools.",
          value:"History Mode and Global Transcript Search turn historical pattern analysis from a week's work into hours — 'how 12 companies described margin pressure across 3 cycles'.",
          impact:"medium" },
        { id:"sell-m5", time:"Week 4", icon:"📅",
          title:"Sales Team Enablement & Forward Planning",
          summary:"Arm the sales team with the month's best ideas; plan the next month's research priorities",
          tasks:["Sales team research briefing","Client meeting prep support","Next month's earnings calendar","Research pipeline planning"],
          quartr:false },
      ],
    },
    Yearly: {
      tagline: "The annual rhythms that define coverage quality and client relationships",
      goals: ["Earnings season excellence", "Investor Day coverage", "Coverage universe expansion"],
      steps: [
        { id:"sell-y1", time:"Q1–Q4 · ×4", icon:"🎤", major:true, isCore:true,
          title:"Earnings Season (×4/year)",
          summary:"The defining rhythm of sellside life — covering 15–25 companies across four annual sprints with speed and quality",
          tasks:["Multi-company live call coverage with real-time AI","Flash note (<30 min)","Full research note drafting","Estimate revision cascade","Client communication & calls"],
          quartr:true, features:[QF.LIVE,QF.LIVE_AI,QF.SUMMARY,QF.SPLIT,QF.PRESS,QF.NAV,QF.UPLOAD,QF.TEMPLATE,QF.AI],
          pain:"Analysts who lack efficient tools publish slower, shallower notes — and lose client mind-share to faster competitors.",
          value:"AI Chat on Live Events means flash note bullets are drafted before the Q&A ends. Press releases, transcripts, and slides unified in one event view via the new navigation. Automatic Event Summary, earnings preview vs. actual comparison, note template — all in one platform. Publish faster with more depth.",
          impact:"critical" },
        { id:"sell-y2", time:"Q2–Q3 · May–Sep", icon:"🌟", major:true, isCore:true,
          title:"Investor Day Season",
          summary:"The richest content creation event — management strategy deep-dives that inform your multi-year thesis",
          tasks:["Investor Day coverage (live with AI Chat)","Long-term guidance extraction","Management strategy analysis","Updated financial model","Client webinar on key takeaways"],
          quartr:true, features:[QF.LIVE,QF.LIVE_AI,QF.SLIDE,QF.NAV,QF.AI,QF.SUMMARY,QF.HISTORY],
          pain:"Investor Days contain more strategically valuable content than any other event — but they're hours long and the key signals are buried without an efficient system.",
          value:"Attend live with AI Chat answering questions on the transcript in real time. AI Chat extracts multi-year targets, capital allocation commitments, and strategy shifts from full-day Investor Day transcripts. Compare this year's CMD to prior year using History Mode. Publish a deeper note faster than any competitor.",
          impact:"critical" },
        { id:"sell-y3", time:"Q1 · Jan–Mar", icon:"📄", major:true,
          title:"Annual Report Season & Coverage Initiation",
          summary:"Annual reports contain the deepest management commentary — a primary source for coverage initiations",
          tasks:["Annual report deep-read","MD&A & risk factor analysis","Coverage initiation note","Annual outlook report"],
          quartr:true, features:[QF.GOVERNANCE,QF.AI,QF.HISTORY,QF.UPLOAD],
          pain:"Annual reports and initiations require reading years of filings. Without efficient tooling, initiations become shallow and coverage spreads thin.",
          value:"AI Chat processes years of annual reports into a structured historical briefing. History Mode maps how MD&A language and risk disclosures have evolved year-by-year.",
          impact:"high" },
        { id:"sell-y4", time:"Q3 · Jul–Sep", icon:"🌍", major:false,
          title:"Conference Season Coverage",
          summary:"Bank-hosted conferences with off-schedule management appearances — an under-leveraged research source",
          tasks:["Conference presentation coverage","Management fireside tracking","Off-script signal extraction","Cross-company conference themes"],
          quartr:true, features:[QF.LIVE,QF.SEARCH,QF.SUMMARY,QF.MENTION],
          pain:"Conference presentations often contain the most candid management commentary — but most analysts can only cover a fraction of them.",
          value:"Quartr Pro captures conference presentations and firesides across 14,000+ companies. Event Summaries let you process every covered company conference appearance.",
          impact:"medium" },
        { id:"sell-y5", time:"Q4 · Oct–Dec", icon:"🗓️", major:false,
          title:"Annual Outlook & Year-Ahead Report",
          summary:"The flagship year-end publication — sector outlook, top picks, and the differentiated macro thesis for next year",
          tasks:["Full-year earnings trend analysis","Sector theme synthesis","Top picks selection","Annual outlook note publication"],
          quartr:true, features:[QF.HISTORY,QF.AI,QF.KEYWORD,QF.SEARCH],
          pain:"A genuinely differentiated annual outlook requires synthesising patterns across a full year of transcripts — a prohibitive manual task.",
          value:"History Mode maps every narrative shift across the full year for each covered company. AI Chat synthesises cross-company patterns into the sector themes that will define next year's trades.",
          impact:"high" },
      ],
    },
  },
};

// ─── Sales Playbooks ───────────────────────────────────────────────────────────
const PLAYBOOKS = {
  IR: {
    Daily:   { pitch:"Lead with the morning — 'How do you find out when a competitor mentions your company overnight, or when a peer drops a press release after hours?' The Watchlist + Mentioned By demo is the fastest route to an 'I need this' moment.", top:["ir-d1","ir-d3"] },
    Weekly:  { pitch:"The weekly peer intelligence report is the single most tangible time-save. Ask: 'How long does your team spend compiling the weekly competitor digest?' Then show Quartr does it in 10 minutes — press releases included.", top:["ir-w2","ir-w4"] },
    Monthly: { pitch:"Hit the narrative audit pain. IR Directors know their story may have drifted — they just don't have a process to catch it. Demo the AI Chat narrative drift prompt: 8 quarters of transcripts, analysed in 2 minutes.", top:["ir-m2","ir-m-narrative"] },
    Yearly:  { pitch:"Earnings cycle and Investor Day are the two events IR teams fear most. Show AI Chat on Live Events for earnings — then show the re-rating reverse engineering prompt for Investor Day planning. Both are jaw-droppers.", top:["ir-y2","ir-y4"] },
  },
  Buyside: {
    Daily:   { pitch:"Start with earnings day: 'What does your workflow look like when you have 3 covered companies reporting the same morning?' Demo AI Chat on Live Events — questions answered on the live transcript before the Q&A ends.", top:["buy-d2","buy-d3"] },
    Weekly:  { pitch:"The Automated Keyword Intelligence Feed is the sleeper feature. Ask: 'How do you currently find out when a company in your supply chain mentions something relevant?' Then show passive alerts delivering signals before the sellside note.", top:["buy-w-keyword","buy-w2"] },
    Monthly: { pitch:"Thesis stress-testing via Document Upload is a powerful differentiator for hedge funds. 'Upload your sellside report and find where the analyst's assumptions diverge from what management actually said.' Then layer in MCP for automation.", top:["buy-m2","buy-m3"] },
    Yearly:  { pitch:"Investor Day season is underserved — most PMs can't process all the CMDs they want to attend. Lead with: 'How many Investor Days did you miss last year?' Then demo AI Chat answering questions on the live Investor Day transcript.", top:["buy-y1","buy-y2"] },
  },
  Sellside: {
    Daily:   { pitch:"The flash note time pressure is visceral for every equity analyst. 'How long does it take you to publish your post-earnings flash note?' Demo AI Chat on Live Events — show how the flash note is half-written before the Q&A ends.", top:["sell-d3","sell-d4"] },
    Weekly:  { pitch:"The Automated Coverage Intelligence Pipeline is the differentiation story. Ask: 'How do you currently find out about signals in companies you don't actively cover?' Then show keyword alerts delivering signals straight from the source.", top:["sell-w-intel","sell-w2"] },
    Monthly: { pitch:"Coverage initiation is the deepest research work in sellside — and the most painful. 'How long does a new initiation take your team?' The AI-powered history deep-dive demo is a jaw-dropper. Layer in MCP for automated universe reviews.", top:["sell-m2","sell-m1"] },
    Yearly:  { pitch:"Investor Day notes are where sellside differentiation lives — but most analysts publish shallow notes because processing a full-day CMD is too time-consuming. Show AI Chat answering live questions at an Investor Day. That's the moment.", top:["sell-y1","sell-y2"] },
  },
};

function findStep(icp, period, id) {
  return (WORKFLOWS[icp]?.[period]?.steps || []).find(s => s.id === id);
}

// ─── Components ───────────────────────────────────────────────────────────────

function ImpactBadge({ impact }) {
  const m = {
    critical: { bg: Q.critDim,  color: Q.critical, border: Q.critBorder,  label:"⚡ Critical" },
    high:     { bg: Q.highDim,  color: Q.high,     border: Q.highBorder,  label:"🔥 High" },
    medium:   { bg: Q.medDim,   color: Q.med,       border: Q.medBorder,  label:"📌 Medium" },
  };
  const s = m[impact]; if (!s) return null;
  return (
    <span style={{ background:s.bg, color:s.color, border:`1px solid ${s.border}`, padding:"2px 8px", borderRadius:"4px", fontSize:"10px", fontWeight:"600", letterSpacing:"0.2px" }}>
      {s.label}
    </span>
  );
}

function FeatureTag({ name }) {
  return (
    <span style={{ background:"rgba(255,64,0,0.1)", color:Q.brand, border:`1px solid rgba(255,64,0,0.25)`, padding:"2px 8px", borderRadius:"4px", fontSize:"10px", fontWeight:"600", letterSpacing:"0.2px" }}>
      {name}
    </span>
  );
}

// The Quartr asterisk/star mark (matches the #FF4000 SVG from the site)
function QuartrMark({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" style={{ flexShrink:0 }}>
      <path d="M8 1C8 1 8.5 5.5 11.5 8C8.5 10.5 8 15 8 15C8 15 7.5 10.5 4.5 8C7.5 5.5 8 1 8 1Z" fill="#FF4000"/>
      <path d="M1 8C1 8 5.5 8.5 8 11.5C10.5 8.5 15 8 15 8C15 8 10.5 7.5 8 4.5C5.5 7.5 1 8 1 8Z" fill="#FF4000"/>
    </svg>
  );
}

function WorkflowStep({ step, isOpen, onToggle, isLast, accent }) {
  const isQ = step.quartr;
  return (
    <div style={{ display:"flex", gap:"0", position:"relative" }}>
      {/* Timeline */}
      <div className="step-timeline" style={{ display:"flex", flexDirection:"column", alignItems:"center", width:"42px", flexShrink:0 }}>
        <div className="step-dot" style={{
          width:"34px", height:"34px", borderRadius:"50%",
          background: isQ ? Q.brandDim : "rgba(255,255,255,0.04)",
          border: `1.5px solid ${isQ ? Q.brandBorder : Q.border}`,
          display:"flex", alignItems:"center", justifyContent:"center",
          fontSize:"15px", flexShrink:0, zIndex:1, position:"relative",
        }}>
          {isQ
            ? <QuartrMark size={16} />
            : <span>{step.icon}</span>}
        </div>
        {!isLast && (
          <div style={{ width:"1px", flex:1, minHeight:"16px", background: isQ ? Q.brandBorder : Q.borderSub, marginTop:"4px", opacity:0.5 }} />
        )}
      </div>

      {/* Card */}
      <div style={{ flex:1, paddingBottom: isLast ? 0 : "16px", paddingLeft:"12px" }}>
        {/* Time label */}
        <div style={{ fontSize:"10px", fontWeight:"600", color: isQ ? Q.brand : Q.textMuted, textTransform:"uppercase", letterSpacing:"0.8px", marginBottom:"5px", display:"flex", alignItems:"center", gap:"8px", fontFamily:FONT }}>
          <span>{step.time}</span>
          {step.icon && isQ && <span style={{ color:Q.textMuted, fontWeight:"400", fontSize:"11px", letterSpacing:"0" }}>{step.icon}</span>}
          {step.isCore && (
            <span style={{ background:Q.brandDim, color:Q.brand, border:`1px solid ${Q.brandBorder}`, padding:"1px 7px", borderRadius:"4px", fontSize:"9px", fontWeight:"700", letterSpacing:"0.5px" }}>
              CORNERSTONE
            </span>
          )}
        </div>

        <div
          className="step-card"
          onClick={onToggle}
          style={{
            background: isQ ? (isOpen ? "rgba(255,64,0,0.07)" : "rgba(255,64,0,0.04)") : (isOpen ? Q.cardMid : Q.card),
            border: `1px solid ${isQ ? (isOpen ? Q.brandBorder : "rgba(255,64,0,0.2)") : (isOpen ? Q.borderMid : Q.border)}`,
            borderRadius:"8px", padding:"16px 18px", cursor:"pointer",
            transition:"all 0.15s ease",
          }}
        >
          <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", gap:"10px" }}>
            <div style={{ flex:1 }}>
              <div style={{ display:"flex", alignItems:"center", gap:"8px", flexWrap:"wrap", marginBottom:"4px" }}>
                <span style={{ fontSize:"14px", fontWeight:"600", color:Q.text, fontFamily:FONT, letterSpacing:"-0.2px" }}>
                  {step.title}
                </span>
                {isQ && (
                  <span style={{ display:"flex", alignItems:"center", gap:"4px", background:Q.brandDim, border:`1px solid ${Q.brandBorder}`, padding:"1px 7px", borderRadius:"4px" }}>
                    <QuartrMark size={9} />
                    <span style={{ fontSize:"9px", fontWeight:"700", color:Q.brand, letterSpacing:"0.5px", textTransform:"uppercase" }}>Quartr Pro</span>
                  </span>
                )}
              </div>
              <p style={{ margin:0, fontSize:"13px", color:Q.textSubtle, lineHeight:"1.65", fontFamily:FONT }}>{step.summary}</p>
            </div>
            <div style={{ color: isQ ? Q.brand : Q.textMuted, fontSize:"16px", transform:isOpen?"rotate(180deg)":"rotate(0deg)", transition:"transform 0.15s", flexShrink:0, marginTop:"2px", opacity:0.7 }}>▾</div>
          </div>

          {isOpen && (
            <div style={{ marginTop:"16px", borderTop:`1px solid ${isQ ? "rgba(255,64,0,0.15)" : Q.borderSub}`, paddingTop:"16px" }}>
              {/* Tasks */}
              <p style={{ margin:"0 0 8px 0", fontSize:"10px", fontWeight:"700", color:Q.textMuted, textTransform:"uppercase", letterSpacing:"0.8px", fontFamily:FONT }}>Key Activities</p>
              <div style={{ display:"flex", flexWrap:"wrap", gap:"6px", marginBottom: isQ ? "16px" : 0 }}>
                {step.tasks.map((t,i) => (
                  <span key={i} style={{ background:"rgba(255,255,255,0.05)", color:Q.textRead, border:`1px solid ${Q.borderSub}`, padding:"5px 10px", borderRadius:"4px", fontSize:"12px", fontFamily:FONT }}>
                    {t}
                  </span>
                ))}
              </div>

              {isQ && step.features && (
                <div style={{ marginBottom:"12px" }}>
                  <p style={{ margin:"0 0 6px 0", fontSize:"10px", fontWeight:"700", color:Q.brand, textTransform:"uppercase", letterSpacing:"0.8px", fontFamily:FONT }}>Quartr Pro Features</p>
                  <div style={{ display:"flex", flexWrap:"wrap", gap:"5px" }}>
                    {step.features.map((f,i) => <FeatureTag key={i} name={f} />)}
                  </div>
                </div>
              )}

              {isQ && (
                <>
                  <div style={{ background:"rgba(255,255,255,0.03)", border:`1px solid ${Q.border}`, borderRadius:"6px", padding:"12px 14px", marginBottom:"12px" }}>
                    <p style={{ margin:"0 0 5px 0", fontSize:"10px", fontWeight:"700", color:Q.textMuted, textTransform:"uppercase", letterSpacing:"0.7px", fontFamily:FONT }}>The Pain</p>
                    <p style={{ margin:0, fontSize:"13px", color:Q.textRead, lineHeight:"1.65", fontFamily:FONT }}>{step.pain}</p>
                  </div>
                  <div style={{ background:"rgba(255,64,0,0.06)", border:`1px solid rgba(255,64,0,0.2)`, borderLeft:`3px solid ${Q.brand}`, borderRadius:"6px", padding:"12px 14px" }}>
                    <div style={{ display:"flex", alignItems:"center", gap:"8px", marginBottom:"7px", flexWrap:"wrap" }}>
                      <div style={{ display:"flex", alignItems:"center", gap:"5px" }}>
                        <QuartrMark size={11} />
                        <p style={{ margin:0, fontSize:"10px", fontWeight:"700", color:Q.brand, textTransform:"uppercase", letterSpacing:"0.7px", fontFamily:FONT }}>How Quartr Pro Solves It</p>
                      </div>
                      <ImpactBadge impact={step.impact} />
                    </div>
                    <p style={{ margin:0, fontSize:"13px", color:Q.textRead, lineHeight:"1.65", fontFamily:FONT, fontWeight:"500" }}>{step.value}</p>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function SalesPlaybook({ icp, period, accent }) {
  const pb = PLAYBOOKS[icp]?.[period];
  if (!pb) return null;
  const topSteps = pb.top.map(id => findStep(icp, period, id)).filter(Boolean);
  return (
    <div style={{ marginTop:"24px", background:Q.card, border:`1px solid ${Q.border}`, borderTop:`2px solid ${Q.brand}`, borderRadius:"8px", padding:"20px 22px" }}>
      <div style={{ display:"flex", alignItems:"center", gap:"8px", marginBottom:"5px" }}>
        <QuartrMark size={14} />
        <h3 style={{ margin:0, fontSize:"13px", fontWeight:"700", color:Q.text, letterSpacing:"-0.2px", fontFamily:FONT }}>
          Sales Playbook — {ICPS[icp].label} / {period}
        </h3>
      </div>
      <p style={{ margin:"0 0 16px 0", fontSize:"13px", color:Q.textSubtle, lineHeight:"1.65", fontFamily:FONT, fontStyle:"italic" }}>
        {pb.pitch}
      </p>
      {topSteps.length > 0 && (
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(210px, 1fr))", gap:"10px" }}>
          {topSteps.map(s => (
            <div key={s.id} style={{ background:Q.cardMid, border:`1px solid ${Q.border}`, borderRadius:"6px", padding:"14px" }}>
              <div style={{ fontSize:"16px", marginBottom:"5px" }}>{s.icon}</div>
              <p style={{ margin:"0 0 6px 0", fontSize:"13px", fontWeight:"600", color:Q.text, fontFamily:FONT }}>{s.title}</p>
              <ImpactBadge impact={s.impact} />
              <p style={{ margin:"9px 0 0 0", fontSize:"12px", color:Q.textSubtle, lineHeight:"1.55", fontFamily:FONT }}>
                {s.value?.slice(0, 100)}{(s.value?.length||0) > 100 ? "…" : ""}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function WorkflowMap() {
  const [icp,    setIcp]    = useState("IR");
  const [period, setPeriod] = useState("Daily");
  const [openId, setOpenId] = useState(null);
  const [qOnly,  setQOnly]  = useState(false);

  const icpMeta  = ICPS[icp];
  const workflow = WORKFLOWS[icp][period];
  const steps    = qOnly ? workflow.steps.filter(s => s.quartr) : workflow.steps;
  const periods  = ["Daily","Weekly","Monthly","Yearly"];
  const periodIcon = { Daily:"🕐", Weekly:"📅", Monthly:"🗓️", Yearly:"🏆" };

  const allFeatures = [...new Set(workflow.steps.filter(s=>s.quartr&&s.features).flatMap(s=>s.features))];
  const quartrCount = workflow.steps.filter(s=>s.quartr).length;

  return (
    <div style={{ fontFamily:FONT, background:Q.bg, minHeight:"100vh", color:Q.text }}>

      {/* ── Header ── */}
      <div className="app-header" style={{ background:Q.bgPage, borderBottom:`1px solid ${Q.borderSub}`, padding:"24px 28px 0" }}>
        {/* Top bar */}
        <div className="header-top" style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", flexWrap:"wrap", gap:"16px", marginBottom:"24px" }}>
          <div>
            {/* Wordmark row */}
            <div style={{ display:"flex", alignItems:"center", gap:"8px", marginBottom:"14px" }}>
              <QuartrMark size={18} />
              <span style={{ fontSize:"15px", fontWeight:"700", color:Q.text, letterSpacing:"-0.5px", fontFamily:FONT }}>Quartr</span>
              <span style={{ width:"1px", height:"14px", background:Q.border }} />
              <span style={{ fontSize:"12px", color:Q.textMuted, fontWeight:"400", letterSpacing:"0.2px" }}>ICP Workflow Intelligence Map</span>
            </div>
            <h1 className="header-h1" style={{ margin:"0 0 8px 0", fontSize:"28px", fontWeight:"550", color:Q.text, lineHeight:"1.2", letterSpacing:"-1.2px", fontFamily:FONT }}>
              Where Quartr Pro<br />
              <span style={{ color:Q.brand }}>creates the most value.</span>
            </h1>
            <p style={{ margin:0, fontSize:"13px", color:Q.textSubtle, maxWidth:"420px", lineHeight:"1.6", fontFamily:FONT }}>
              Daily, weekly, monthly &amp; yearly workflows for IR, Buyside, and Sellside teams — with every Quartr Pro touchpoint mapped to the exact pain it solves.
            </p>
          </div>

          {/* Feature digest */}
          <div className="feature-digest" style={{ background:Q.card, border:`1px solid ${Q.border}`, borderRadius:"8px", padding:"14px 16px", minWidth:"185px" }}>
            <p style={{ margin:"0 0 10px 0", fontSize:"10px", color:Q.textMuted, fontWeight:"700", textTransform:"uppercase", letterSpacing:"0.8px", fontFamily:FONT }}>
              {period} Quartr Features
            </p>
            <div style={{ display:"flex", flexDirection:"column", gap:"5px" }}>
              {allFeatures.slice(0,8).map(f => (
                <div key={f} style={{ display:"flex", alignItems:"center", gap:"7px" }}>
                  <QuartrMark size={9} />
                  <span style={{ fontSize:"11px", color:Q.textRead, fontFamily:FONT }}>{f}</span>
                </div>
              ))}
              {allFeatures.length > 8 && <span style={{ fontSize:"10px", color:Q.textMuted, paddingLeft:"16px", fontFamily:FONT }}>+{allFeatures.length-8} more</span>}
            </div>
          </div>
        </div>

        {/* ── ICP Tabs ── */}
        <div className="icp-tabs" style={{ display:"flex", gap:"2px" }}>
          {Object.entries(ICPS).map(([key, meta]) => {
            const active = key === icp;
            const totalQ = Object.values(WORKFLOWS[key]).reduce((a,w)=>a+w.steps.filter(s=>s.quartr).length, 0);
            return (
              <button key={key}
                onClick={() => { setIcp(key); setOpenId(null); setQOnly(false); }}
                style={{
                  background: active ? Q.card : "transparent",
                  border: active ? `1px solid ${Q.border}` : "1px solid transparent",
                  borderBottom: active ? `1px solid ${Q.card}` : "1px solid transparent",
                  borderRadius:"8px 8px 0 0", padding:"11px 20px",
                  cursor:"pointer", display:"flex", alignItems:"center", gap:"8px",
                  color: active ? Q.text : Q.textSubtle,
                  fontWeight: active ? "600" : "400", fontSize:"13px",
                  fontFamily:FONT, letterSpacing:"-0.2px",
                  transition:"all 0.12s ease", whiteSpace:"nowrap", minHeight:"44px",
                }}
              >
                <span style={{ fontSize:"14px" }}>{meta.icon}</span>
                <span>{meta.label}</span>
                <span style={{
                  background: active ? Q.brandDim : "rgba(255,255,255,0.05)",
                  color: active ? Q.brand : Q.textMuted,
                  border: active ? `1px solid ${Q.brandBorder}` : `1px solid ${Q.borderSub}`,
                  borderRadius:"4px", padding:"0px 6px", fontSize:"10px", fontWeight:"700",
                  fontFamily:FONT,
                }}>
                  {totalQ}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── ICP Strip ── */}
      <div className="icp-strip" style={{ background:Q.card, borderBottom:`1px solid ${Q.border}`, padding:"10px 28px", display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:"10px" }}>
        <div style={{ display:"flex", alignItems:"center", gap:"10px" }}>
          <div style={{ width:"3px", height:"32px", background:icpMeta.accent, borderRadius:"2px" }} />
          <div>
            <p style={{ margin:0, fontSize:"10px", fontWeight:"600", color:Q.textMuted, textTransform:"uppercase", letterSpacing:"0.8px", fontFamily:FONT }}>
              {icpMeta.roles.join("  ·  ")}
            </p>
            <p style={{ margin:0, fontSize:"13px", fontWeight:"600", color:icpMeta.accent, letterSpacing:"-0.2px", fontFamily:FONT }}>
              {icpMeta.tagline}
            </p>
          </div>
        </div>
        {/* Period tabs */}
        <div className="period-tabs" style={{ display:"flex", gap:"4px" }}>
          {periods.map(p => {
            const active = p === period;
            const qc = WORKFLOWS[icp][p].steps.filter(s=>s.quartr).length;
            return (
              <button key={p}
                onClick={() => { setPeriod(p); setOpenId(null); }}
                style={{
                  background: active ? icpMeta.dim : "transparent",
                  border: `1px solid ${active ? icpMeta.border : Q.border}`,
                  borderRadius:"6px", padding:"7px 13px",
                  cursor:"pointer", color: active ? icpMeta.accent : Q.textSubtle,
                  fontWeight: active ? "600" : "400", fontSize:"12px",
                  display:"flex", alignItems:"center", gap:"5px",
                  fontFamily:FONT, transition:"all 0.12s ease", letterSpacing:"-0.1px",
                  whiteSpace:"nowrap", minHeight:"36px",
                }}
              >
                <span style={{ fontSize:"12px" }}>{periodIcon[p]}</span>
                <span>{p}</span>
                <span style={{
                  background: active ? `rgba(255,255,255,0.1)` : Q.borderSub,
                  color: active ? icpMeta.accent : Q.textMuted,
                  borderRadius:"3px", padding:"0 5px", fontSize:"10px", fontWeight:"700",
                }}>{qc}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Body ── */}
      <div className="workflow-body" style={{ padding:"22px 28px", maxWidth:"800px", margin:"0 auto" }}>

        {/* Period subheader */}
        <div style={{ background:Q.card, border:`1px solid ${Q.border}`, borderRadius:"8px", padding:"14px 18px", marginBottom:"20px", display:"flex", alignItems:"flex-start", justifyContent:"space-between", flexWrap:"wrap", gap:"10px" }}>
          <div>
            <p style={{ margin:"0 0 8px 0", fontSize:"13px", color:Q.textSubtle, fontStyle:"italic", fontFamily:FONT, lineHeight:"1.6" }}>
              {workflow.tagline}
            </p>
            <div style={{ display:"flex", flexWrap:"wrap", gap:"5px" }}>
              {workflow.goals.map((g,i) => (
                <span key={i} style={{ background:icpMeta.dim, color:icpMeta.accent, border:`1px solid ${icpMeta.border}`, padding:"3px 10px", borderRadius:"4px", fontSize:"11px", fontWeight:"600", fontFamily:FONT }}>
                  {g}
                </span>
              ))}
            </div>
          </div>
          <button onClick={() => setQOnly(!qOnly)} style={{
            background: qOnly ? Q.brandDim : "transparent",
            color: qOnly ? Q.brand : Q.textSubtle,
            border: `1px solid ${qOnly ? Q.brandBorder : Q.border}`,
            borderRadius:"6px", padding:"8px 14px",
            fontSize:"12px", fontWeight:"600", cursor:"pointer",
            fontFamily:FONT, display:"flex", alignItems:"center", gap:"6px",
            transition:"all 0.12s ease", whiteSpace:"nowrap", minHeight:"36px",
          }}>
            <QuartrMark size={10} />
            {qOnly ? "Quartr Only" : "Show Quartr Only"}
          </button>
        </div>

        {/* Steps */}
        <div>
          {steps.map((step, i) => (
            <WorkflowStep
              key={step.id}
              step={step}
              accent={icpMeta.accent}
              isOpen={openId === step.id}
              onToggle={() => setOpenId(openId === step.id ? null : step.id)}
              isLast={i === steps.length - 1}
            />
          ))}
        </div>

        {/* Sales Playbook */}
        <SalesPlaybook icp={icp} period={period} accent={icpMeta.accent} />

        {/* Footer */}
        <div style={{ display:"flex", justifyContent:"center", alignItems:"center", gap:"20px", flexWrap:"wrap", marginTop:"24px", paddingTop:"18px", borderTop:`1px solid ${Q.borderSub}` }}>
          {[
            { el:<><QuartrMark size={9} /><span>Quartr Pro touchpoint</span></>, },
            { el:<><div style={{width:8,height:8,borderRadius:"50%",background:Q.brand,display:"inline-block"}} /><span>⚡ Critical</span></> },
            { el:<><div style={{width:8,height:8,borderRadius:"50%",background:Q.high,display:"inline-block"}} /><span>🔥 High</span></> },
            { el:<><div style={{width:8,height:8,borderRadius:"50%",background:Q.med,display:"inline-block"}} /><span>📌 Medium</span></> },
          ].map((item,i) => (
            <div key={i} style={{ display:"flex", alignItems:"center", gap:"5px", color:Q.textMuted, fontSize:"11px", fontFamily:FONT }}>
              {item.el}
            </div>
          ))}
        </div>
        <p style={{ textAlign:"center", margin:"8px 0 0 0", fontSize:"10px", color:Q.textMuted, fontFamily:FONT }}>
          Tap a step to expand details · Toggle Quartr Only to filter · Switch ICP tabs to compare personas
        </p>
      </div>
    </div>
  );
}

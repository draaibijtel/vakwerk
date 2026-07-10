import { useState } from "react";

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=DM+Mono:wght@300;400&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --white:  #f6f3ee;
    --black:  #090807;
    --orange: #e03d00;
    --gray:   #6b6860;
    --line:   rgba(9,8,7,0.1);
    --display:'Space Grotesk', sans-serif;
    --mono:   'DM Mono', monospace;
    --pad:    72px;
  }

  html { scroll-behavior: smooth; }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes drawLine {
    from { transform: scaleX(0); }
    to   { transform: scaleX(1); }
  }

  .f1 { animation: fadeUp 0.7s ease both 0.05s; }
  .f2 { animation: fadeUp 0.7s ease both 0.2s;  }
  .f3 { animation: fadeUp 0.7s ease both 0.35s; }
  .f4 { animation: fadeUp 0.7s ease both 0.5s;  }
  .f5 { animation: fadeUp 0.7s ease both 0.65s; }

  .nav-link {
    font-family: var(--mono);
    font-size: 11.5px;
    color: var(--gray);
    text-decoration: none;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    transition: color 0.15s;
  }
  .nav-link:hover { color: var(--black); }

  .cta-btn {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 14px 28px;
    background: var(--orange);
    color: var(--white);
    font-family: var(--mono);
    font-size: 11px;
    letter-spacing: 2px;
    text-transform: uppercase;
    text-decoration: none;
    border: none;
    cursor: pointer;
    transition: background 0.2s, transform 0.2s;
  }
  .cta-btn:hover { background: #c43500; transform: translateY(-1px); }

  .svc-card {
    border-top: 1px solid var(--line);
    padding: 32px 0;
    transition: border-color 0.2s;
  }
  .svc-card:hover { border-top-color: var(--orange); }

  .svc-card-dark {
    border-top: 1px solid rgba(255,255,255,0.14);
    padding: 32px 0;
    transition: border-color 0.2s;
  }
  .svc-card-dark:hover { border-top-color: var(--orange); }

  .disc-item {
    padding: 24px 0;
    border-bottom: 1px solid var(--line);
    display: grid;
    grid-template-columns: 48px 1fr;
    gap: 24px;
    align-items: start;
  }

  /* RESPONSIVE */
  @media (max-width: 640px) {
    :root { --pad: 24px; }
    .nav-links { display: none !important; }
    .hero-word { font-size: clamp(64px, 18vw, 96px) !important; }
    .two-col { grid-template-columns: 1fr !important; gap: 40px !important; }
    .three-col { grid-template-columns: 1fr !important; }
    .four-col { grid-template-columns: 1fr 1fr !important; }
    .section-pad { padding: 64px var(--pad) !important; }
    .founder-grid { grid-template-columns: 1fr !important; }
    .footer-inner { flex-direction: column !important; gap: 10px !important; align-items: flex-start !important; }
    .manifesto-text { font-size: clamp(20px, 5.5vw, 28px) !important; }
    .problem-head { font-size: clamp(26px, 7vw, 36px) !important; }
  }

  @media (max-width: 900px) {
    .three-col { grid-template-columns: 1fr 1fr !important; }
    .founder-grid { grid-template-columns: 1fr 1fr !important; }
  }

  ::-webkit-scrollbar { width: 3px; }
  ::-webkit-scrollbar-track { background: var(--white); }
  ::-webkit-scrollbar-thumb { background: var(--orange); }
`;

function VakwerkLogo({ width = 640, dark = false, showTagline = false, panels = 6, color = "#e03d00", opacity = 0.35 }) {
  const W = 1000, textY = 210, trussTop = 250, trussH = 70;
  const insetLeft = 20, insetRight = 90; // calibrated to Space Grotesk Bold "V"/"K" ink edges
  const H = showTagline ? 340 : trussTop + trussH + 10;
  const black = dark ? "#f6f3ee" : "#090807";
  const gray  = dark ? "#6b6860" : "#9a9590";

  const trussX0 = insetLeft, trussX1 = W - insetRight;
  const span = trussX1 - trussX0;
  const pw = span / panels;
  const lines = [];
  lines.push(<line key="bc" x1={trussX0} y1={trussTop + trussH} x2={trussX1} y2={trussTop + trussH} strokeWidth={5} />);
  lines.push(<line key="tc" x1={trussX0 + pw} y1={trussTop} x2={trussX1 - pw} y2={trussTop} strokeWidth={5} />);
  lines.push(<line key="lep" x1={trussX0} y1={trussTop + trussH} x2={trussX0 + pw} y2={trussTop} strokeWidth={5} />);
  lines.push(<line key="rep" x1={trussX1 - pw} y1={trussTop} x2={trussX1} y2={trussTop + trussH} strokeWidth={5} />);
  for (let i = 1; i < panels; i++) {
    const x = trussX0 + i * pw;
    lines.push(<line key={`v${i}`} x1={x} y1={trussTop} x2={x} y2={trussTop + trussH} strokeWidth={3} />);
  }
  for (let i = 1; i < panels - 1; i++) {
    const xa = trussX0 + i * pw, xb = trussX0 + (i + 1) * pw;
    if (i % 2 === 1) lines.push(<line key={`d${i}`} x1={xa} y1={trussTop} x2={xb} y2={trussTop + trussH} strokeWidth={3} />);
    else lines.push(<line key={`d${i}`} x1={xa} y1={trussTop + trussH} x2={xb} y2={trussTop} strokeWidth={3} />);
  }

  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width, display: "block" }}>
      <text x={0} y={textY} fontFamily="'Space Grotesk', sans-serif" fontWeight={700} fontSize={200}
        textLength={W} lengthAdjust="spacingAndGlyphs">
        <tspan fill={black}>VAK</tspan>
        <tspan fill="#e03d00">W</tspan>
        <tspan fill={black}>ERK</tspan>
      </text>
      <g stroke={color} strokeLinecap="round" strokeLinejoin="round" opacity={opacity}>{lines}</g>
      {showTagline && (
        <text x={0} y={H - 8} fontFamily="'DM Mono', monospace" fontWeight={300} fontSize={20} letterSpacing={3} fill={gray}>
          FRACTIONAL ENGINEERING PARTNERS
        </text>
      )}
    </svg>
  );
}

function BrokenTruss({ width = 500, height = 44, panels = 3, gapFrac = 0.16, color = "#e03d00", opacity = 0.5 }) {
  const W = 1000;
  const gap = W * gapFrac;
  const halfSpan = (W - gap) / 2;
  const pw = halfSpan / panels;

  const buildHalf = (x0, mirrored) => {
    const lines = [];
    const sign = mirrored ? -1 : 1;
    // bottom chord for this half
    lines.push(<line key={`bc-${mirrored}`} x1={x0} y1={height} x2={x0 + sign * halfSpan} y2={height} strokeWidth={5} />);
    // outer raker end (triangular), inner end cut straight (unfinished look)
    const outerX = mirrored ? x0 - halfSpan : x0 + halfSpan;
    const firstNodeX = mirrored ? x0 - pw : x0 + pw;
    lines.push(<line key={`tc-${mirrored}`} x1={firstNodeX} y1={0} x2={x0 + sign * (halfSpan - pw) + (mirrored ? pw * 0 : 0)} y2={0} strokeWidth={5} />);
    lines.push(<line key={`ep-${mirrored}`} x1={x0} y1={height} x2={firstNodeX} y2={0} strokeWidth={5} />);
    // inner vertical (the "cut" edge, unfinished)
    lines.push(<line key={`cut-${mirrored}`} x1={outerX} y1={0} x2={outerX} y2={height} strokeWidth={5} strokeDasharray="6 6" opacity={0.6} />);
    // interior verticals + diagonals
    for (let i = 1; i < panels; i++) {
      const x = x0 + sign * i * pw;
      lines.push(<line key={`v-${mirrored}-${i}`} x1={x} y1={0} x2={x} y2={height} strokeWidth={3} />);
    }
    for (let i = 0; i < panels - 1; i++) {
      const xa = x0 + sign * i * pw;
      const xb = x0 + sign * (i + 1) * pw;
      if (i % 2 === 0) lines.push(<line key={`d-${mirrored}-${i}`} x1={xa} y1={height} x2={xb} y2={0} strokeWidth={3} />);
      else lines.push(<line key={`d-${mirrored}-${i}`} x1={xa} y1={0} x2={xb} y2={height} strokeWidth={3} />);
    }
    return lines;
  };

  return (
    <svg viewBox={`0 0 ${W} ${height}`} preserveAspectRatio="none" fill="none"
      style={{ width, height, display: "block" }}
      stroke={color} strokeLinecap="round" strokeLinejoin="round" opacity={opacity}>
      {buildHalf(0, false)}
      {buildHalf(W, true)}
    </svg>
  );
}

function TrussOnly({ width = 300, height = 40, panels = 6, color = "#e03d00", opacity = 0.3 }) {
  const W = 1000;
  const pw = W / panels;
  const lines = [];
  lines.push(<line key="bc" x1={0} y1={height} x2={W} y2={height} strokeWidth={5} />);
  lines.push(<line key="tc" x1={pw} y1={0} x2={(panels - 1) * pw} y2={0} strokeWidth={5} />);
  lines.push(<line key="lep" x1={0} y1={height} x2={pw} y2={0} strokeWidth={5} />);
  lines.push(<line key="rep" x1={(panels - 1) * pw} y1={0} x2={W} y2={height} strokeWidth={5} />);
  for (let i = 1; i < panels; i++) {
    lines.push(<line key={`v${i}`} x1={i * pw} y1={0} x2={i * pw} y2={height} strokeWidth={3} />);
  }
  for (let i = 1; i < panels - 1; i++) {
    if (i % 2 === 1) lines.push(<line key={`d${i}`} x1={i * pw} y1={0} x2={(i + 1) * pw} y2={height} strokeWidth={3} />);
    else lines.push(<line key={`d${i}`} x1={i * pw} y1={height} x2={(i + 1) * pw} y2={0} strokeWidth={3} />);
  }
  return (
    <svg viewBox={`0 0 ${W} ${height}`} preserveAspectRatio="none" fill="none"
      style={{ width, height, display: "block" }}
      stroke={color} strokeLinecap="round" strokeLinejoin="round" opacity={opacity}>
      {lines}
    </svg>
  );
}

function GradientTruss({ width = 280, height = 32, panels = 6, opacity = 1, id = "svcTrussGrad" }) {
  const W = 1000;
  const pw = W / panels;
  const lines = [];
  lines.push(<line key="bc" x1={0} y1={height} x2={W} y2={height} strokeWidth={5} />);
  lines.push(<line key="tc" x1={pw} y1={0} x2={(panels - 1) * pw} y2={0} strokeWidth={5} />);
  lines.push(<line key="lep" x1={0} y1={height} x2={pw} y2={0} strokeWidth={5} />);
  lines.push(<line key="rep" x1={(panels - 1) * pw} y1={0} x2={W} y2={height} strokeWidth={5} />);
  for (let i = 1; i < panels; i++) {
    lines.push(<line key={`v${i}`} x1={i * pw} y1={0} x2={i * pw} y2={height} strokeWidth={3} />);
  }
  for (let i = 1; i < panels - 1; i++) {
    if (i % 2 === 1) lines.push(<line key={`d${i}`} x1={i * pw} y1={0} x2={(i + 1) * pw} y2={height} strokeWidth={3} />);
    else lines.push(<line key={`d${i}`} x1={i * pw} y1={height} x2={(i + 1) * pw} y2={0} strokeWidth={3} />);
  }
  return (
    <svg viewBox={`0 0 ${W} ${height}`} preserveAspectRatio="none" fill="none"
      style={{ width, height, display: "block" }}
      strokeLinecap="round" strokeLinejoin="round" opacity={opacity}>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#e03d00" />
          <stop offset="100%" stopColor="#6b6860" />
        </linearGradient>
      </defs>
      <g stroke={`url(#${id})`}>{lines}</g>
    </svg>
  );
}

const Label = ({ children, style = {} }) => (
  <span style={{ fontFamily: "var(--mono)", fontSize: "11.5px", color: "var(--gray)", letterSpacing: "2px", textTransform: "uppercase", ...style }}>
    {children}
  </span>
);

const Rule = ({ style = {} }) => (
  <div style={{ height: "1px", background: "var(--line)", ...style }} />
);

export default function App() {
  const [hovered, setHovered] = useState(null);

  return (
    <div style={{ background: "var(--white)", color: "var(--black)", fontFamily: "var(--display)", overflowX: "hidden" }}>
      <style>{css}</style>

      {/* NAV */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: "rgba(246,243,238,0.93)", backdropFilter: "blur(8px)",
        borderBottom: "1px solid var(--line)",
        padding: "0 var(--pad)", height: "52px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <a href="#top" style={{ textDecoration: "none" }}>
          <span style={{ fontFamily: "var(--display)", fontWeight: 700, fontSize: "15px", color: "var(--black)", letterSpacing: "-0.3px" }}>
            Vakwerk<span style={{ color: "var(--orange)" }}>.</span>
          </span>
        </a>
        <div className="nav-links" style={{ display: "flex", gap: "36px", alignItems: "center" }}>
          {[["#services", "Services"], ["#founder", "Founder"]].map(([href, label]) => (
            <a key={href} href={href} className="nav-link">{label}</a>
          ))}
          <a href="#contact" style={{
            fontFamily: "var(--mono)", fontSize: "10px", letterSpacing: "1.5px",
            textTransform: "uppercase", color: "var(--orange)", textDecoration: "none",
            borderBottom: "1px solid var(--orange)", paddingBottom: "1px",
          }}>Let's talk</a>
        </div>
      </nav>

      {/* HERO */}
      <section id="top" style={{ paddingTop: "52px", minHeight: "92vh", display: "flex", flexDirection: "column" }}>
        <div style={{ padding: "20px var(--pad) 0", display: "flex", alignItems: "center", gap: "20px" }}>
          <div style={{ height: "1px", flex: 1, background: "var(--orange)", transformOrigin: "left", animation: "drawLine 0.9s ease both 0.1s" }} />
          <Label className="f1">Fractional Engineering Partners</Label>
        </div>

        <div style={{ padding: "12px var(--pad) 0", flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <div className="f2" style={{ display: "inline-block" }}>
            <VakwerkLogo width="min(680px, 88vw)" dark={false} panels={6} />
          </div>

          <p className="f4" style={{
            fontFamily: "var(--display)", fontWeight: 300, fontSize: "20px",
            color: "var(--gray)", marginTop: "32px", maxWidth: "500px", lineHeight: 1.6,
          }}>
            We solve industrial engineering problems for Small and Medium-sized Enterprises —
            mechanically, digitally, and at the pace your operation demands.
          </p>

          <div className="f5" style={{ display: "flex", gap: "24px", marginTop: "40px", alignItems: "center", flexWrap: "wrap" }}>
            <a href="#contact" className="cta-btn">Start a conversation</a>
            <a href="#services" style={{
              fontFamily: "var(--mono)", fontSize: "10px", color: "var(--gray)",
              letterSpacing: "1.5px", textTransform: "uppercase", textDecoration: "none", transition: "color 0.2s",
            }}
              onMouseEnter={e => e.target.style.color = "var(--black)"}
              onMouseLeave={e => e.target.style.color = "var(--gray)"}
            >See our services ↓</a>
          </div>
        </div>

        <div style={{ borderTop: "1px solid var(--line)", marginTop: "28px" }}>
          <div style={{ padding: "0 var(--pad)", display: "grid", gridTemplateColumns: "repeat(4, 1fr)" }} className="four-col">
            {[
              ["3+", "Years delivering"],
              ["4",  "Disciplines. One partner."],
              ["0",  "Bullshit tolerated."],
              ["∞",  "Problems solvable."],
            ].map(([val, label], i) => (
              <div key={i} style={{
                padding: "24px 0",
                borderRight: i < 3 ? "1px solid var(--line)" : "none",
                paddingRight: i < 3 ? "32px" : 0,
                paddingLeft: i > 0 ? "32px" : 0,
              }}>
                <div style={{ fontFamily: "var(--display)", fontWeight: 700, fontSize: "clamp(24px, 3vw, 32px)", color: i === 2 ? "var(--orange)" : "var(--black)", lineHeight: 1 }}>{val}</div>
                <Label style={{ display: "block", marginTop: "6px" }}>{label}</Label>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROBLEM */}
      <section style={{ padding: "120px var(--pad)", background: "var(--black)" }} className="section-pad">
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "start" }} className="two-col">
            <div>
              <Label style={{ color: "#6b6860" }}>The problem</Label>
              <h2 className="problem-head" style={{
                fontFamily: "var(--display)", fontWeight: 700,
                fontSize: "clamp(28px, 3.5vw, 44px)", color: "#f6f3ee",
                lineHeight: 1.15, marginTop: "20px", letterSpacing: "-0.5px",
              }}>
                Expertise: rare.<br />
                Access: rarer.<br />
                <span style={{ color: "var(--orange)" }}>The bridge: missing.</span>
              </h2>

              {/* the graph: a truss with the middle deliberately unbuilt */}
              <div style={{ marginTop: "36px" }}>
                <BrokenTruss width={340} height={30} panels={3} gapFrac={0.18} color="#e03d00" opacity={0.55} />
              </div>
              <Label style={{ marginTop: "10px", display: "block", color: "#4a453d" }}>Two sides. No span between them. Yet.</Label>
            </div>
            <div style={{ paddingTop: "4px" }}>
              <p style={{ fontFamily: "var(--mono)", fontSize: "20px", color: "#6b6860", lineHeight: 1.6, fontWeight: 300 }}>
                Mid-sized industrial companies run complex machines — but often can't justify a full-time senior engineer. They rely on machine builders who are long gone, or on knowledge that lives only in one person's head.
              </p>
              <p style={{ fontFamily: "var(--mono)", fontSize: "20px", color: "#6b6860", lineHeight: 1.6, fontWeight: 300, marginTop: "20px" }}>
                Meanwhile, many experienced engineers want flexible, meaningful work — not tied to one employer, not reduced to hourly gigs. The expertise exists. The need exists. The connection doesn't.
              </p>
              <p style={{ fontFamily: "var(--mono)", fontSize: "20px", color: "#f6f3ee", lineHeight: 1.6, fontWeight: 400, marginTop: "20px" }}>
                <span style={{ color: "var(--orange)", fontWeight: 700 }}>Vakwerk</span> is that bridge.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* MANIFESTO */}
      <section style={{ padding: "120px var(--pad)", borderBottom: "1px solid var(--line)" }} className="section-pad">
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <Label>How we work</Label>
          <div style={{ marginTop: "48px" }}>
            {[
              <>We <span style={{ color: "var(--orange)" }}>bring</span> engineers. We <span style={{ color: "#3d7ea8" }}>take</span> responsibility.</>,
              "Your problem is ours until it's solved.",
            ].map((line, i) => (
              <div key={i}>
                <Rule />
                <p className="manifesto-text" style={{
                  fontFamily: "var(--display)", fontWeight: 600,
                  fontSize: "clamp(24px, 3.2vw, 42px)", lineHeight: 1.25,
                  padding: "28px 0", letterSpacing: "-0.3px",
                  color: hovered === i ? "var(--orange)" : "var(--black)",
                  paddingLeft: hovered === i ? "12px" : "0",
                  transition: "color 0.2s, padding-left 0.2s",
                  cursor: "default",
                }}
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                >{line}</p>
              </div>
            ))}
            <Rule />
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" style={{ padding: "120px var(--pad)" }} className="section-pad">
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>

          {/* Black band: "What we deliver" header + the 3 service cards */}
          <div style={{
            background: "var(--black)",
            marginLeft: "calc(-1 * var(--pad))", marginRight: "calc(-1 * var(--pad))",
            paddingLeft: "var(--pad)", paddingRight: "var(--pad)",
            paddingTop: "72px", paddingBottom: "72px",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "64px", flexWrap: "wrap", gap: "24px" }}>
              <div>
                <Label>What we deliver</Label>
                <h2 style={{ fontFamily: "var(--display)", fontWeight: 700, fontSize: "clamp(32px, 4.5vw, 52px)", lineHeight: 0.95, marginTop: "16px", letterSpacing: "-0.5px", color: "#f6f3ee" }}>
                  Engineering capacity<br />at the scale you need.
                </h2>
              </div>
              <div style={{ width: "280px" }}>
                <GradientTruss width={280} height={32} panels={6} opacity={0.7} id="svcHeaderTruss" />
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0 48px" }} className="three-col">
              {[
                {
                  num: "I",
                  title: "Fractional Plant Engineer",
                  body: "Someone who knows your machines as well as you do. Health checks, small fixes before they become downtime, full visibility into what's actually happening on the floor — owned by us, not delegated.",
                  tags: ["Retainer-based", "Proactive", "Embedded"],
                },
                {
                  num: "II",
                  title: "Fractional R&D Engineer",
                  body: "New machine concepts, test rigs, smart automation — from first sketch to a commissioned, working system. One point of contact, not three vendors to coordinate.",
                  tags: ["Fixed scope", "Full-stack", "New builds"],
                },
                {
                  num: "III",
                  title: "CE & Documentation",
                  body: "Risk assessment, technical file, Betriebsanleitung and Declaration of Conformity. Part of every machine delivery, not an afterthought.",
                  tags: ["2006/42/EG", "ISO 12100", "Annex VII"],
                },
              ].map((s, i) => (
                <div key={i} className="svc-card-dark">
                  <Label style={{ color: "var(--orange)", marginBottom: "20px", display: "block" }}>{s.num}</Label>
                  <h3 style={{ fontFamily: "var(--display)", fontWeight: 600, fontSize: "20px", lineHeight: 1.2, letterSpacing: "-0.2px", color: "#f6f3ee" }}>{s.title}</h3>
                  <p style={{ fontFamily: "var(--mono)", fontSize: "20px", color: "#9a9590", lineHeight: 1.6, marginTop: "16px", fontWeight: 300 }}>{s.body}</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginTop: "20px" }}>
                    {s.tags.map(t => (
                      <span key={t} style={{ fontFamily: "var(--mono)", fontSize: "10.5px", letterSpacing: "1px", textTransform: "uppercase", color: "#9a9590", border: "1px solid rgba(255,255,255,0.15)", padding: "4px 9px" }}>{t}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Retainer scale — belongs to "Fractional Plant Engineer" above, not a separate pitch */}
          <div style={{ marginTop: "88px", paddingTop: "56px", borderTop: "1px solid var(--line)" }}>
            <Label>How the retainer scales</Label>
            <p style={{ fontFamily: "var(--mono)", fontSize: "20px", color: "var(--gray)", lineHeight: 1.6, marginTop: "14px", maxWidth: "560px", fontWeight: 300 }}>
              Every engagement starts small and grows only as far as the operation needs.
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0 40px", marginTop: "56px", alignItems: "start" }} className="three-col">
              {[
                { tier: "Foundation", cadence: "≈ 2 days / month", panels: 3, trussW: 160, trussH: 22,
                  desc: "Preventive checks, system health monitoring, remote support on call." },
                { tier: "Active Partner", cadence: "≈ 4–6 days / month", panels: 5, trussW: 240, trussH: 34,
                  desc: "Everything in Foundation, plus active improvements, data analysis, CE documentation." },
                { tier: "Project Burst", cadence: "Defined scope", panels: 8, trussW: 320, trussH: 48,
                  desc: "Larger builds layered on top — fixed scope, fixed price." },
              ].map((t, i) => (
                <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                  <Label style={{ color: "var(--orange)", marginBottom: "4px" }}>{`0${i + 1}`}</Label>
                  <h3 style={{ fontFamily: "var(--display)", fontWeight: 600, fontSize: "20px", marginBottom: "6px" }}>{t.tier}</h3>
                  <Label style={{ marginBottom: "20px" }}>{t.cadence}</Label>
                  <div style={{ height: "56px", display: "flex", alignItems: "flex-end", marginBottom: "16px" }}>
                    <TrussOnly width={t.trussW} height={t.trussH} panels={t.panels} color="#e03d00" opacity={0.5} />
                  </div>
                  <p style={{ fontFamily: "var(--mono)", fontSize: "20px", color: "var(--gray)", lineHeight: 1.5, fontWeight: 300, maxWidth: "260px" }}>{t.desc}</p>
                </div>
              ))}
            </div>

            <div style={{ marginTop: "40px", paddingTop: "16px", borderTop: "1px solid var(--line)", display: "flex", justifyContent: "space-between" }}>
              <Label>Less commitment</Label>
              <Label style={{ color: "var(--orange)" }}>↑ scope · cadence · depth ↑</Label>
              <Label>More commitment</Label>
            </div>
          </div>

          {/* Disciplines — the technical engine behind the three services above, not a separate pitch */}
          <div style={{
            marginTop: "88px", paddingTop: "56px", borderTop: "1px solid var(--line)",
            background: "#f0ece4",
            marginLeft: "calc(-1 * var(--pad))", marginRight: "calc(-1 * var(--pad))",
            paddingLeft: "var(--pad)", paddingRight: "var(--pad)", paddingBottom: "56px",
          }}>
            <Label>Built from four disciplines</Label>
            <h3 style={{ fontFamily: "var(--display)", fontWeight: 700, fontSize: "clamp(24px, 3.2vw, 34px)", marginTop: "14px", letterSpacing: "-0.4px", lineHeight: 1.1 }}>
              From bolt to browser.
            </h3>
            <div style={{ marginTop: "40px" }}>
              {[
                { num: "01", label: "Mechanical Design", desc: "Mechanisms, fixtures, test rigs. Designed for manufacturability, built to last.", tags: "SolidWorks · FEA · GD&T · BOM" },
                { num: "02", label: "PLC & Control", desc: "Deterministic machine logic. State machines, motion coordination, safety, fault handling.", tags: "Allen Bradley · Beckhoff · IEC 61131-3" },
                { num: "03", label: "Browser HMI", desc: "No SCADA licences. Any device, any browser. Real-time data, alarms, user management.", tags: "React · WebSocket · REST · Node-RED" },
                { num: "04", label: "Time-Series Data", desc: "Every cycle logged. OEE, torque curves, Pareto analysis, anomaly detection.", tags: "InfluxDB · Grafana · Flux · MQTT" },
              ].map((d, i) => (
                <div key={i} className="disc-item">
                  <Label style={{ color: "var(--orange)", paddingTop: "2px" }}>{d.num}</Label>
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: "8px" }}>
                      <h3 style={{ fontFamily: "var(--display)", fontWeight: 600, fontSize: "20px" }}>{d.label}</h3>
                      <Label>{d.tags}</Label>
                    </div>
                    <p style={{ fontFamily: "var(--mono)", fontSize: "20px", color: "var(--gray)", lineHeight: 1.5, marginTop: "8px", fontWeight: 300 }}>{d.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FOUNDER */}
      <section id="founder" style={{ padding: "120px var(--pad)", borderTop: "1px solid var(--line)" }} className="section-pad">
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "80px", alignItems: "start" }} className="founder-grid two-col">
            <div>
              <Label>Founder</Label>
              <h2 style={{ fontFamily: "var(--display)", fontWeight: 700, fontSize: "32px", marginTop: "16px", letterSpacing: "-0.3px", lineHeight: 1.1 }}>
                Herman<br />de Jong
              </h2>
              <div style={{ marginTop: "20px", display: "inline-flex", alignItems: "center", gap: "8px", padding: "6px 12px", border: "1px solid var(--line)" }}>
                <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#4a9a4a", display: "inline-block", flexShrink: 0 }} />
                <Label>Available for new engagements</Label>
              </div>
            </div>
            <div>
              <p style={{ fontFamily: "var(--mono)", fontSize: "20px", color: "var(--gray)", lineHeight: 1.6, fontWeight: 300 }}>
                Mechanical engineer with 20+ years of industrial experience and 3+ years operating as a freelance engineering partner — spanning mechanical design, PLC control, browser-based HMI development and time-series data infrastructure.
              </p>
              <p style={{ fontFamily: "var(--mono)", fontSize: "20px", color: "var(--gray)", lineHeight: 1.6, fontWeight: 300, marginTop: "20px" }}>
                Vakwerk began as one engineer able to cover that much ground alone — and is built to grow into a small network of senior partners who work the same way, each accountable end-to-end rather than handed off between specialists.
              </p>
              <div style={{ marginTop: "32px", paddingTop: "32px", borderTop: "1px solid var(--line)" }}>
                <Label>Background</Label>
                <p style={{ fontFamily: "var(--mono)", fontSize: "20px", color: "var(--gray)", lineHeight: 1.6, marginTop: "10px", fontWeight: 300 }}>
                  Dutch roots, based in Germany. Fluent in Deutsch, English and Nederlands — moves between German SME culture and international engineering standards without friction.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{ padding: "120px var(--pad)", background: "var(--black)" }} className="section-pad">
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <Label style={{ color: "#6b6860" }}>Get in touch</Label>
          <h2 style={{ fontFamily: "var(--display)", fontWeight: 700, fontSize: "clamp(36px, 6vw, 70px)", color: "#f6f3ee", lineHeight: 0.95, marginTop: "20px", letterSpacing: "-1px" }}>
            Got a problem<br />worth solving<span style={{ color: "var(--orange)" }}>?</span>
          </h2>
          <p style={{ fontFamily: "var(--mono)", fontSize: "20px", color: "#6b6860", lineHeight: 1.6, marginTop: "32px", maxWidth: "440px", fontWeight: 300 }}>
            We work with a small number of clients at any time. If that's a fit, let's have a direct conversation.
          </p>
          <div style={{ marginTop: "48px" }}>
            <a href="mailto:info@hermandejong.de" className="cta-btn">
              info@hermandejong.de <span>→</span>
            </a>
          </div>
          <div style={{ marginTop: "80px", paddingTop: "48px", borderTop: "1px solid rgba(255,255,255,0.07)" }}>
            <TrussOnly width={520} height={32} panels={6} color="#f6f3ee" opacity={0.07} />
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: "1px solid var(--line)", padding: "20px var(--pad)", background: "var(--white)" }}>
        <div className="footer-inner" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontFamily: "var(--display)", fontWeight: 700, fontSize: "15px", letterSpacing: "-0.2px" }}>
            Vakwerk<span style={{ color: "var(--orange)" }}>.</span>
          </span>
          <Label>Engineering Partners · Germany</Label>
          <Label>© 2025 Herman de Jong</Label>
        </div>
      </footer>
    </div>
  );
}

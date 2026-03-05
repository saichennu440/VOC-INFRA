import { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronRight, ArrowRight, Mail, Phone, MapPin, Zap, Database, Brain, Server, Cpu, Network, TrendingUp, Globe, Award, CheckCircle, Linkedin } from "lucide-react";

/* ─── STATIC DATA ────────────────────────────────────────────── */
const NAV_LINKS = ["Home","About","Solutions","Technology","Industries","Case Studies","Leadership","Contact"];

const SOLUTIONS = [
  { icon:Brain,    color:"#00b4d8", title:"AI & Machine Learning Systems",           desc:"Intelligent automation and predictive systems that transform enterprise decision-making.",         items:["Predictive analytics platforms","Intelligent workflow automation","AI-based decision engines","Computer vision & NLP solutions"] },
  { icon:Database, color:"#9333ea", title:"Data Engineering & Intelligent Pipelines", desc:"End-to-end data infrastructure built for real-time intelligence and enterprise scale.",           items:["Data lake architecture","Real-time data pipelines","Enterprise data orchestration","Data governance frameworks"] },
  { icon:Cpu,      color:"#0891b2", title:"Cognitive Enterprise Platforms",           desc:"Self-optimising enterprise workflows powered by cognitive automation engines.",                   items:["Autonomous workflow systems","AI-powered knowledge systems","Cognitive automation engines","Decision support platforms"] },
  { icon:Server,   color:"#0284c7", title:"Intelligent IT Infrastructure",            desc:"AI-monitored, infrastructure-as-code powered cloud and hybrid systems.",                          items:["Infrastructure as Code (IaC)","AI-based infrastructure monitoring","Cloud & hybrid management","DevOps automation frameworks"] },
  { icon:Network,  color:"#6366f1", title:"Cybernetic Enterprise Systems",            desc:"Adaptive, self-correcting architectures that autonomously optimise performance via AI feedback.", items:["Adaptive infrastructure management","Autonomous enterprise operations","Self-correcting architectures","AI feedback loop optimisation"] },
];

const TECH = [
  { cat:"AI & Machine Learning",  items:["Python","TensorFlow","PyTorch","Scikit-learn"],          color:"#00b4d8" },
  { cat:"Data Engineering",       items:["Apache Spark","Hadoop","Kafka","Snowflake","Databricks"], color:"#9333ea" },
  { cat:"Cloud Platforms",        items:["AWS","Microsoft Azure","Google Cloud"],                    color:"#0891b2" },
  { cat:"DevOps & Infrastructure",items:["Docker","Kubernetes","Terraform","Ansible"],              color:"#0284c7" },
  { cat:"Data Visualization",     items:["Power BI","Tableau","Looker"],                            color:"#6366f1" },
  { cat:"Enterprise Integration", items:["REST APIs","Microservices","Event-driven Systems"],       color:"#00b4d8" },
];

const INDUSTRIES = [
  { icon:TrendingUp, name:"Financial Services & FinTech",  desc:"AI-powered risk modelling and intelligent transaction systems" },
  { icon:Award,      name:"Healthcare & Life Sciences",     desc:"Cognitive data platforms for clinical analytics and research" },
  { icon:Cpu,        name:"Manufacturing & Industrial",     desc:"Autonomous operational control and predictive maintenance" },
  { icon:Zap,        name:"Energy & Utilities",             desc:"Intelligent grid management and demand forecasting" },
  { icon:Globe,      name:"Logistics & Supply Chain",       desc:"Real-time visibility and AI-driven supply optimisation" },
  { icon:Network,    name:"Media & Digital Platforms",      desc:"Cognitive automation for content and workflow operations" },
];

const CASES = [
  { tag:"Financial Services", color:"#00b4d8", title:"AI Infrastructure Automation",     metric:"40%",  metricLabel:"Downtime Reduced",  challenge:"High infrastructure downtime and operational inefficiencies impacting core banking operations.", solution:"Implemented AI-based monitoring and predictive infrastructure management with automated remediation.", result:"40% downtime reduction and improved operational efficiency." },
  { tag:"Healthcare",         color:"#9333ea", title:"Data Engineering for Analytics",    metric:"100%", metricLabel:"Data Unified",      challenge:"Fragmented healthcare data across multiple disconnected systems preventing real-time insights.", solution:"Built a unified data pipeline and intelligent analytics platform with enterprise governance.", result:"Enabled real-time analytics and dramatically improved decision making." },
  { tag:"Media Platform",     color:"#0891b2", title:"Intelligent Automation Deployment", metric:"60%",  metricLabel:"Faster Operations", challenge:"Manual operational workflows causing critical delays and resource inefficiency at scale.", solution:"Deployed cognitive automation and self-optimising workflow orchestration engines.", result:"60% increase in operational speed across all workflow units." },
];

const PARTNERS = ["AWS","Microsoft Azure","Google Cloud","Databricks","Snowflake"];

const TEAM = [
  {
    initials:"JG", accent:"#0077a8",
    gradient:"linear-gradient(135deg,rgba(0,119,168,0.18),rgba(147,51,234,0.18))",
    border:"rgba(0,119,168,0.35)",
    name:"Jagadish Gadireddy",
    role:"Director – Enterprise Systems & Infrastructure",
    badges:["22+ Years","250+ Team","Fortune 500"],
    bio:"Over 22 years of global IT services leadership with expertise in enterprise infrastructure, large-scale delivery management, and mission-critical IT operations.",
    highlights:["Led programs for Microsoft, Wells Fargo & MasterCard","Managed global delivery teams of 250+ professionals","Implemented Agile, ITIL & enterprise service frameworks","Delivered Fortune 500 mission-critical programs"],
  },
  {
    initials:"AR", accent:"#9333ea",
    gradient:"linear-gradient(135deg,rgba(147,51,234,0.18),rgba(99,102,241,0.15))",
    border:"rgba(147,51,234,0.35)",
    name:"[Leader Name]",
    role:"VP – AI & Machine Learning",
    badges:["15+ Years","AI Strategy","Research Lead"],
    bio:"Placeholder — replace with actual bio. Brings deep expertise in AI research, large-scale ML platform engineering, and enterprise-grade model deployment across regulated industries.",
    highlights:["[Led AI platform for a Fortune 100 company]","[Managed team of 80+ ML engineers]","[Published research in top-tier AI conferences]","[Holds 5+ AI/ML patents]"],
  },
  {
    initials:"SK", accent:"#0891b2",
    gradient:"linear-gradient(135deg,rgba(8,145,178,0.18),rgba(6,182,212,0.12))",
    border:"rgba(8,145,178,0.35)",
    name:"[Leader Name]",
    role:"Head of Cloud Architecture",
    badges:["18+ Years","Multi-Cloud","DevOps Expert"],
    bio:"Placeholder — replace with actual bio. Extensive experience designing resilient multi-cloud infrastructures for global enterprises, with a focus on automation, cost optimisation and zero-downtime deployments.",
    highlights:["[Designed cloud infra for 20+ enterprises]","[AWS & Azure certified architect]","[Reduced cloud spend by 35% avg. per client]","[Led 50+ cloud migration programmes]"],
  },
  {
    initials:"PM", accent:"#6366f1",
    gradient:"linear-gradient(135deg,rgba(99,102,241,0.18),rgba(139,92,246,0.15))",
    border:"rgba(99,102,241,0.35)",
    name:"[Leader Name]",
    role:"Director – Data Engineering",
    badges:["16+ Years","Data Platforms","Analytics"],
    bio:"Placeholder — replace with actual bio. Specialises in building large-scale data platforms, real-time streaming pipelines, and enterprise data governance frameworks that power intelligent decision-making.",
    highlights:["[Built data lake for a global bank]","[Delivered real-time pipelines processing 10B+ events/day]","[Led data governance for 3 Fortune 500 firms]","[Expert in Snowflake, Databricks & Spark]"],
  },
  {
    initials:"NR", accent:"#0284c7",
    gradient:"linear-gradient(135deg,rgba(2,132,199,0.18),rgba(0,180,216,0.15))",
    border:"rgba(2,132,199,0.35)",
    name:"[Leader Name]",
    role:"Head of Cybersecurity & Compliance",
    badges:["14+ Years","CISO Level","Zero Trust"],
    bio:"Placeholder — replace with actual bio. Leads enterprise cybersecurity strategy with deep experience in zero-trust architecture, threat intelligence, compliance frameworks and incident response programs.",
    highlights:["[Designed zero-trust model for a major bank]","[Led ISO 27001 & SOC 2 certification programs]","[Reduced breach risk by 60% at past orgs]","[Expert in NIST, GDPR & HIPAA compliance]"],
  },
  {
    initials:"VK", accent:"#7c3aed",
    gradient:"linear-gradient(135deg,rgba(124,58,237,0.18),rgba(147,51,234,0.12))",
    border:"rgba(124,58,237,0.35)",
    name:"[Leader Name]",
    role:"Head of Enterprise Delivery",
    badges:["20+ Years","Delivery Lead","Agile Coach"],
    bio:"Placeholder — replace with actual bio. A seasoned delivery executive with two decades of leading complex, multi-geography enterprise programmes, specialising in Agile transformation and large-scale IT service management.",
    highlights:["[Delivered $500M+ enterprise transformation]","[Managed cross-geo teams of 300+ members]","[Certified SAFe & ITIL Master practitioner]","[Led PMOs for 10+ Fortune 500 clients]"],
  },
];

/* ─── THEME PALETTES ─────────────────────────────────────────── */
const DARK = {
  bg0:"#05080f", bg1:"#070a10", bg2:"#0a0d18", foot:"#030406",
  border:"rgba(255,255,255,0.06)", borderAccent:"rgba(0,180,216,0.15)",
  text:"#e2e8f0", head:"#ffffff", sub:"#94a3b8", muted:"#475569", label:"#334155",
  navBg:"rgba(5,8,15,0.95)", navBorder:"rgba(0,180,216,0.1)",
  inputBg:"#0d1221", inputBorder:"rgba(255,255,255,0.1)", inputText:"#e2e8f0",
  cardHover:"#0d1221", partnerBg:"#0a0d18", partnerColor:"#475569",
  dotOpacity:"0.07", orbCyan:"rgba(0,180,216,0.09)", orbPurple:"rgba(147,51,234,0.08)",
  aboutCard:"rgba(0,180,216,0.03)", leaderBg:"#0a0d18",
  ctaBg:"linear-gradient(135deg,rgba(0,180,216,0.06),rgba(147,51,234,0.06))",
  ctaBorder:"rgba(0,180,216,0.1)",
  contactLeft:"linear-gradient(135deg,rgba(0,180,216,0.06),rgba(147,51,234,0.06))",
  contactLeftBorder:"rgba(0,180,216,0.14)",
  sectionDivider:"rgba(255,255,255,0.04)",
  scrollbar:"#05080f", scrollThumb:"rgba(0,180,216,0.2)",
  navLinkColor:"#64748b", navLinkHover:"#00b4d8",
  accent:"#00b4d8", accentDark:"#0284c7",
  shimmer:"linear-gradient(90deg,#00b4d8,#9333ea,#38bdf8,#00b4d8)",
  badgeBg:"rgba(0,180,216,0.07)", badgeBorder:"rgba(0,180,216,0.22)",
  whyBg:"rgba(0,180,216,0.09)", whyBorder:"rgba(0,180,216,0.18)",
  footerText:"#1e293b",
};

const LIGHT = {
  bg0:"#f4f7ff", bg1:"#eaeffa", bg2:"#ffffff", foot:"#1a2035",
  border:"rgba(0,0,0,0.08)", borderAccent:"rgba(0,100,180,0.2)",
  text:"#1e293b", head:"#0f172a", sub:"#475569", muted:"#94a3b8", label:"#64748b",
  navBg:"rgba(244,247,255,0.95)", navBorder:"rgba(0,100,180,0.12)",
  inputBg:"#f8faff", inputBorder:"rgba(0,0,0,0.1)", inputText:"#0f172a",
  cardHover:"#eef2ff", partnerBg:"#ffffff", partnerColor:"#64748b",
  dotOpacity:"0.05", orbCyan:"rgba(0,150,200,0.1)", orbPurple:"rgba(147,51,234,0.08)",
  aboutCard:"rgba(0,100,180,0.04)", leaderBg:"#ffffff",
  ctaBg:"linear-gradient(135deg,rgba(0,100,200,0.06),rgba(147,51,234,0.05))",
  ctaBorder:"rgba(0,100,180,0.15)",
  contactLeft:"linear-gradient(135deg,rgba(0,100,200,0.07),rgba(147,51,234,0.05))",
  contactLeftBorder:"rgba(0,100,180,0.18)",
  sectionDivider:"rgba(0,0,0,0.06)",
  scrollbar:"#f4f7ff", scrollThumb:"rgba(0,100,180,0.2)",
  navLinkColor:"#64748b", navLinkHover:"#0077a8",
  accent:"#0077a8", accentDark:"#005f8a",
  shimmer:"linear-gradient(90deg,#0077a8,#7c3aed,#0891b2,#0077a8)",
  badgeBg:"rgba(0,100,180,0.08)", badgeBorder:"rgba(0,100,180,0.22)",
  whyBg:"rgba(0,100,180,0.07)", whyBorder:"rgba(0,100,180,0.18)",
  footerText:"#94a3b8",
};

/* ─── REVEAL HOOK ────────────────────────────────────────────── */
function useReveal(delay = 0) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      requestAnimationFrame(() => requestAnimationFrame(() =>
        setTimeout(() => { if (el) { el.style.opacity="1"; el.style.transform="translateY(0px) scale(1)"; } }, delay)
      ));
      obs.disconnect();
    }, { threshold: 0.08 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);
  return ref;
}

function Reveal({ delay=0, children, style={} }) {
  const ref = useReveal(delay);
  return (
    <div ref={ref} style={{ opacity:0, transform:"translateY(30px) scale(0.98)", transition:"opacity 0.65s cubic-bezier(0.4,0,0.2,1), transform 0.65s cubic-bezier(0.4,0,0.2,1)", willChange:"opacity,transform", ...style }}>
      {children}
    </div>
  );
}

/* ─── MAIN APP ───────────────────────────────────────────────── */
export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hovered,  setHovered]  = useState(null);

  const T = LIGHT;

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 56);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const scrollTo = id => {
    const el = document.getElementById(id.toLowerCase().replace(/\s+/g,"-"));
    if (el) { el.scrollIntoView({ behavior:"smooth" }); setMenuOpen(false); }
  };

  const SL = ({ children }) => (
    <span style={{ display:"block", fontSize:11, fontWeight:700, letterSpacing:"0.16em", textTransform:"uppercase", color:T.accent, marginBottom:14 }}>{children}</span>
  );
  const Div = () => (
    <div style={{ width:48, height:3, background:`linear-gradient(90deg,${T.accent},#9333ea)`, borderRadius:2, margin:"18px 0 26px" }}/>
  );

  return (
    <div style={{ background:T.bg0, color:T.text, fontFamily:"'DM Sans','Segoe UI',sans-serif", overflowX:"hidden", transition:"background 0.4s, color 0.4s" }}>

      {/* ── GLOBAL CSS (theme-aware via injected vars) ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,700&family=Space+Grotesk:wght@400;500;600;700&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        html{scroll-behavior:smooth}
        ::-webkit-scrollbar{width:5px}
        ::-webkit-scrollbar-track{background:${T.scrollbar}}
        ::-webkit-scrollbar-thumb{background:${T.scrollThumb};border-radius:3px}
        input,textarea,button{font-family:inherit}

        .dot-bg{
          background-image:radial-gradient(rgba(0,100,180,${T.dotOpacity}) 1px, transparent 1px);
          background-size:30px 30px;
        }
        .shimmer-t{
          background:${T.shimmer};
          background-size:300% auto;
          -webkit-background-clip:text;
          -webkit-text-fill-color:transparent;
          background-clip:text;
          animation:shimTxt 5s linear infinite;
        }
        @keyframes shimTxt{to{background-position:300% center}}

        .orb1{animation:orbA 10s ease-in-out infinite}
        .orb2{animation:orbB 13s ease-in-out infinite}
        .orb3{animation:orbA 8s ease-in-out infinite 2s}
        @keyframes orbA{0%,100%{transform:translateY(0) scale(1)}50%{transform:translateY(-22px) scale(1.04)}}
        @keyframes orbB{0%,100%{transform:translateY(0) scale(1)}50%{transform:translateY(18px) scale(0.97)}}

        .pulse-d{animation:dPulse 2.2s ease-out infinite}
        @keyframes dPulse{
          0%{box-shadow:0 0 0 0 rgba(0,100,180,0.4)}
          70%{box-shadow:0 0 0 9px transparent}
          100%{box-shadow:0 0 0 0 transparent}
        }

        .card{transition:transform .3s cubic-bezier(.4,0,.2,1),border-color .3s,box-shadow .3s,background .4s;cursor:default}
        .card:hover{transform:translateY(-6px)}

        .nav-btn{background:none;border:none;cursor:pointer;color:${T.navLinkColor};font-size:13.5px;font-weight:500;transition:color .2s;letter-spacing:.02em;padding:2px 0}
        .nav-btn:hover{color:${T.navLinkHover}}

        .btn-p{background:linear-gradient(135deg,${T.accent},${T.accentDark});color:#ffffff;font-weight:700;padding:13px 28px;border-radius:8px;border:none;cursor:pointer;font-size:15px;transition:all .25s;display:inline-flex;align-items:center;gap:8px;letter-spacing:.01em}
        .btn-p:hover{transform:translateY(-2px);box-shadow:0 14px 32px rgba(0,100,180,0.3)}

        .btn-s{background:transparent;color:${T.accent};font-weight:600;padding:13px 28px;border-radius:8px;border:2px solid rgba(0,100,180,0.3);cursor:pointer;font-size:15px;transition:all .25s;display:inline-flex;align-items:center;gap:8px}
        .btn-s:hover{background:rgba(0,100,180,0.07);border-color:${T.accent};transform:translateY(-2px)}

        .inp{width:100%;padding:13px 15px;background:${T.inputBg};border:1px solid ${T.inputBorder};border-radius:8px;color:${T.inputText};font-size:15px;outline:none;transition:border-color .2s, background .4s, color .4s}
        .inp:focus{border-color:${T.accent}80}
        .inp::placeholder{color:${T.muted}}

        .partner{padding:14px 28px;background:${T.partnerBg};border:1px solid ${T.border};border-radius:10px;font-size:14px;font-weight:700;color:${T.partnerColor};letter-spacing:.04em;transition:all .3s, background .4s;cursor:default}
        .partner:hover{border-color:${T.accent}55;color:${T.accent};transform:translateY(-3px)}

        @media(max-width:820px){.desk-nav{display:none!important}}
        @media(min-width:821px){.mob-ham{display:none!important}}
        @media(max-width:768px){
          .two-col{grid-template-columns:1fr!important;gap:36px!important}
          .three-col{grid-template-columns:1fr!important}
          .leader-g{grid-template-columns:1fr!important;gap:28px!important}
          .foot-g{grid-template-columns:1fr 1fr!important}
        }
        @media(max-width:480px){.foot-g{grid-template-columns:1fr!important}}
      `}</style>

      {/* ════════════ NAV ════════════ */}
      <header style={{
        position:"fixed", top:0, left:0, right:0, zIndex:200,
        background: scrolled ? T.navBg : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? `1px solid ${T.navBorder}` : "1px solid transparent",
        transition:"all .35s",
      }}>
        <div style={{ maxWidth:1280, margin:"0 auto", padding:"0 28px", height:68, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <button onClick={() => scrollTo("home")} style={{ background:"none", border:"none", cursor:"pointer", textAlign:"left" }}>
            <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:21, fontWeight:700, color:T.head, letterSpacing:"-.02em", transition:"color .4s" }}>
              VOC<span style={{ color:T.accent }}>Infra</span>
            </div>
            <div style={{ fontSize:9.5, color:T.muted, letterSpacing:".1em", marginTop:1, transition:"color .4s" }}>VECTORIZED OPERATIONS & CYBERNETICS</div>
          </button>

          <div className="desk-nav" style={{ display:"flex", gap:26, alignItems:"center" }}>
            {NAV_LINKS.map(l => <button key={l} className="nav-btn" onClick={() => scrollTo(l)}>{l}</button>)}
            <button className="btn-p" style={{ padding:"9px 20px", fontSize:13 }} onClick={() => scrollTo("contact")}>Book Consultation</button>
          </div>

          <div style={{ display:"flex", gap:12, alignItems:"center" }}>
            <button className="mob-ham" onClick={() => setMenuOpen(o => !o)} style={{ background:"none", border:"none", cursor:"pointer", color:T.sub }}>
              {menuOpen ? <X size={22}/> : <Menu size={22}/>}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div style={{ background:"rgba(244,247,255,0.97)", borderTop:`1px solid ${T.sectionDivider}`, padding:"22px 28px 28px", display:"flex", flexDirection:"column", gap:18 }}>
            {NAV_LINKS.map(l => <button key={l} className="nav-btn" style={{ fontSize:16, textAlign:"left" }} onClick={() => scrollTo(l)}>{l}</button>)}
            <button className="btn-p" onClick={() => scrollTo("contact")}>Book Consultation <ArrowRight size={16}/></button>
          </div>
        )}
      </header>

      {/* ════════════ HERO ════════════ */}
      <section id="home" className="dot-bg" style={{ minHeight:"100vh", display:"flex", alignItems:"center", paddingTop:68, position:"relative", overflow:"hidden", transition:"background 0.4s" }}>
        <div className="orb1" style={{ position:"absolute", top:"12%", right:"7%",  width:500, height:500, borderRadius:"50%", background:`radial-gradient(circle,${T.orbCyan} 0%,transparent 68%)`, pointerEvents:"none" }}/>
        <div className="orb2" style={{ position:"absolute", bottom:"10%", left:"3%", width:420, height:420, borderRadius:"50%", background:`radial-gradient(circle,${T.orbPurple} 0%,transparent 68%)`, pointerEvents:"none" }}/>
        <div className="orb3" style={{ position:"absolute", top:"55%", left:"58%",  width:260, height:260, borderRadius:"50%", background:`radial-gradient(circle,${T.orbCyan} 0%,transparent 68%)`, pointerEvents:"none" }}/>

        <div style={{ maxWidth:1280, margin:"0 auto", padding:"50px 28px 80px", width:"100%", position:"relative" }}>
          <Reveal>
            <div style={{ display:"inline-flex", alignItems:"center", gap:10, padding:"7px 16px", background:T.badgeBg, border:`1px solid ${T.badgeBorder}`, borderRadius:100, marginBottom:28 }}>
              <div className="pulse-d" style={{ width:7, height:7, borderRadius:"50%", background:T.accent, flexShrink:0 }}/>
              <span style={{ fontSize:11.5, fontWeight:700, color:T.accent, letterSpacing:".12em", textTransform:"uppercase" }}>AI-First Enterprise Technology Company</span>
            </div>
          </Reveal>

          <Reveal delay={90}>
            <h1 style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:"clamp(40px,6.2vw,78px)", fontWeight:700, lineHeight:1.04, letterSpacing:"-.03em", color:T.head, marginBottom:26, transition:"color .4s" }}>
              AI-Powered Enterprise<br/>
              <span className="shimmer-t">Automation &amp;</span><br/>
              Intelligent Infrastructure
            </h1>
          </Reveal>

          <Reveal delay={180}>
            <p style={{ fontSize:18, color:T.sub, lineHeight:1.75, maxWidth:620, marginBottom:12, transition:"color .4s" }}>
              VOC Infra helps enterprises transform operations using Artificial Intelligence, Machine Learning, Data Engineering, and Cybernetic Systems.
            </p>
            <p style={{ fontSize:15, color:T.muted, lineHeight:1.75, maxWidth:600, marginBottom:42, transition:"color .4s" }}>
              We design intelligent enterprise platforms integrating automation, predictive analytics, and self-optimising infrastructure — enabling organisations to build autonomous digital ecosystems.
            </p>
          </Reveal>

          <Reveal delay={260}>
            <div style={{ display:"flex", flexWrap:"wrap", gap:14, marginBottom:62 }}>
              <button className="btn-p" onClick={() => scrollTo("contact")}>Schedule a Strategy Call <ArrowRight size={17}/></button>
              <button className="btn-s" onClick={() => scrollTo("solutions")}>Explore Solutions <ChevronRight size={17}/></button>
            </div>
          </Reveal>

          <Reveal delay={340}>
            <div style={{ display:"flex", flexWrap:"wrap", gap:44 }}>
              {[["22+","Years Leadership"],["250+","Global Professionals"],["Fortune 500","Clients Served"],["40%+","Avg. Efficiency Gain"]].map(([n,l]) => (
                <div key={l}>
                  <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:30, fontWeight:700, color:T.accent, lineHeight:1, transition:"color .4s" }}>{n}</div>
                  <div style={{ fontSize:12, color:T.muted, marginTop:4, transition:"color .4s" }}>{l}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ════════════ ABOUT ════════════ */}
      <section id="about" style={{ padding:"116px 28px", background:T.bg1, transition:"background .4s" }}>
        <div className="two-col" style={{ maxWidth:1280, margin:"0 auto", display:"grid", gridTemplateColumns:"1fr 1fr", gap:72, alignItems:"center" }}>
          <div>
            <Reveal><SL>About VOC Infra</SL></Reveal>
            <Reveal delay={70}>
              <h2 style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:"clamp(28px,3.8vw,50px)", fontWeight:700, color:T.head, lineHeight:1.14, letterSpacing:"-.025em", transition:"color .4s" }}>
                Vectorized Operations<br/>&amp; <span style={{ color:T.accent }}>Cybernetics</span>
              </h2>
              <Div/>
            </Reveal>
            <Reveal delay={140}>
              <p style={{ fontSize:16.5, color:T.sub, lineHeight:1.8, marginBottom:18, transition:"color .4s" }}>
                VOC Infra is an enterprise technology company focused on building intelligent operational systems powered by AI, ML, and advanced data engineering.
              </p>
              <p style={{ fontSize:15, color:T.muted, lineHeight:1.8, marginBottom:36, transition:"color .4s" }}>
                Our mission: enable organisations to transition from traditional IT operations to autonomous, intelligent, and scalable enterprise systems. We blend cybernetic control systems with AI-powered automation for continuous optimisation through feedback-driven digital ecosystems.
              </p>
            </Reveal>
            <Reveal delay={200}>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"12px 18px" }}>
                {["AI-first enterprise architecture","Cybernetic feedback-driven systems","Automation-led infrastructure management","Data-driven decision platforms","Enterprise-grade scalability"].map(i => (
                  <div key={i} style={{ display:"flex", alignItems:"flex-start", gap:9 }}>
                    <CheckCircle size={14} style={{ color:T.accent, flexShrink:0, marginTop:4, transition:"color .4s" }}/>
                    <span style={{ fontSize:13.5, color:T.sub, lineHeight:1.5, transition:"color .4s" }}>{i}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal delay={120}>
            <div style={{ background:T.aboutCard, border:`1px solid ${T.borderAccent}`, borderRadius:18, padding:38, transition:"background .4s, border-color .4s" }}>
              <h3 style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:19, fontWeight:600, color:T.head, marginBottom:30, transition:"color .4s" }}>Why We Are Different</h3>
              {[["01","Autonomous","Self-managing systems that adapt without human intervention"],
                ["02","Predictive","AI models that anticipate issues before they occur"],
                ["03","Scalable","Enterprise-grade architecture designed to grow with you"],
                ["04","Data-Driven","Every decision powered by real-time intelligence"],
                ["05","Self-Optimising","Feedback-driven systems that continuously improve"]].map(([n,t,d],i,arr) => (
                <div key={n} style={{ display:"flex", gap:18, alignItems:"flex-start", marginBottom:i<arr.length-1?20:0, paddingBottom:i<arr.length-1?20:0, borderBottom:i<arr.length-1?`1px solid ${T.sectionDivider}`:"none" }}>
                  <div style={{ width:38, height:38, borderRadius:9, background:T.whyBg, border:`1px solid ${T.whyBorder}`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, transition:"background .4s" }}>
                    <span style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:12, fontWeight:700, color:T.accent }}>{n}</span>
                  </div>
                  <div>
                    <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:600, color:T.head, marginBottom:4, fontSize:14.5, transition:"color .4s" }}>{t}</div>
                    <div style={{ fontSize:13, color:T.muted, lineHeight:1.6, transition:"color .4s" }}>{d}</div>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ════════════ SOLUTIONS ════════════ */}
      <section id="solutions" className="dot-bg" style={{ padding:"116px 28px", transition:"background .4s" }}>
        <div style={{ maxWidth:1280, margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:68 }}>
            <Reveal><SL>Enterprise Solutions</SL></Reveal>
            <Reveal delay={70}>
              <h2 style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:"clamp(28px,3.8vw,50px)", fontWeight:700, color:T.head, letterSpacing:"-.025em", transition:"color .4s" }}>
                Intelligent Systems for<br/><span style={{ color:T.accent }}>Modern Enterprise</span>
              </h2>
            </Reveal>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(330px,1fr))", gap:20 }}>
            {SOLUTIONS.map((s,i) => (
              <Reveal key={s.title} delay={i*90}>
                <div className="card"
                  onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)}
                  style={{ background:hovered===i ? T.cardHover : T.bg2, border:`1px solid ${hovered===i ? s.color+"55" : T.border}`, borderRadius:15, padding:34, position:"relative", overflow:"hidden", height:"100%", boxShadow:hovered===i ? `0 20px 50px ${s.color}14` : "none", transition:"background .4s, border-color .3s, box-shadow .3s, transform .3s" }}>
                  <div style={{ position:"absolute", top:0, left:0, right:0, height:2, background:`linear-gradient(90deg,${s.color},transparent)`, opacity:hovered===i?1:0.35, transition:"opacity .3s" }}/>
                  <div style={{ position:"absolute", top:-50, right:-50, width:180, height:180, borderRadius:"50%", background:`radial-gradient(circle,${s.color}12 0%,transparent 65%)`, pointerEvents:"none", opacity:hovered===i?1:0, transition:"opacity .3s" }}/>
                  <div style={{ width:50, height:50, borderRadius:11, background:`${s.color}14`, border:`1px solid ${s.color}28`, display:"flex", alignItems:"center", justifyContent:"center", marginBottom:22, transition:"transform .3s", transform:hovered===i?"scale(1.1)":"scale(1)" }}>
                    <s.icon size={23} style={{ color:s.color }}/>
                  </div>
                  <h3 style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:17, fontWeight:600, color:T.head, marginBottom:11, lineHeight:1.35, transition:"color .4s" }}>{s.title}</h3>
                  <p style={{ fontSize:13.5, color:T.muted, marginBottom:18, lineHeight:1.7, transition:"color .4s" }}>{s.desc}</p>
                  <ul style={{ listStyle:"none", display:"flex", flexDirection:"column", gap:8 }}>
                    {s.items.map(it => (
                      <li key={it} style={{ display:"flex", alignItems:"center", gap:9 }}>
                        <div style={{ width:5, height:5, borderRadius:"50%", background:s.color, flexShrink:0 }}/>
                        <span style={{ fontSize:13, color:T.sub, transition:"color .4s" }}>{it}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════ TECHNOLOGY ════════════ */}
      <section id="technology" style={{ padding:"116px 28px", background:T.bg1, transition:"background .4s" }}>
        <div style={{ maxWidth:1280, margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:68 }}>
            <Reveal><SL>Technology Stack</SL></Reveal>
            <Reveal delay={70}>
              <h2 style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:"clamp(28px,3.8vw,50px)", fontWeight:700, color:T.head, letterSpacing:"-.025em", transition:"color .4s" }}>
                Built on <span style={{ color:T.accent }}>Best-in-Class</span> Technology
              </h2>
            </Reveal>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(288px,1fr))", gap:18 }}>
            {TECH.map((t,i) => (
              <Reveal key={t.cat} delay={i*75}>
                <div className="card" style={{ background:T.bg2, border:`1px solid ${T.border}`, borderRadius:13, padding:26, height:"100%", transition:"background .4s, border-color .4s" }}>
                  <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:18 }}>
                    <div style={{ width:8, height:8, borderRadius:"50%", background:t.color, boxShadow:`0 0 10px ${t.color}` }}/>
                    <span style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:13.5, fontWeight:600, color:T.sub, transition:"color .4s" }}>{t.cat}</span>
                  </div>
                  <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
                    {t.items.map(item => (
                      <span key={item} style={{ padding:"5px 13px", background:`${t.color}18`, border:`1px solid ${t.color}35`, borderRadius:100, fontSize:12.5, color:t.color, fontWeight:500 }}>{item}</span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════ INDUSTRIES ════════════ */}
      <section id="industries" className="dot-bg" style={{ padding:"116px 28px", transition:"background .4s" }}>
        <div style={{ maxWidth:1280, margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:68 }}>
            <Reveal><SL>Industries We Serve</SL></Reveal>
            <Reveal delay={70}>
              <h2 style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:"clamp(28px,3.8vw,50px)", fontWeight:700, color:T.head, letterSpacing:"-.025em", transition:"color .4s" }}>
                Cross-Industry <span style={{ color:T.accent }}>Expertise</span>
              </h2>
            </Reveal>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(270px,1fr))", gap:18 }}>
            {INDUSTRIES.map((ind,i) => (
              <Reveal key={ind.name} delay={i*80}>
                <div className="card" style={{ background:T.bg2, border:`1px solid ${T.border}`, borderRadius:13, padding:28, display:"flex", gap:18, alignItems:"flex-start", height:"100%", transition:"background .4s, border-color .4s" }}>
                  <div style={{ width:46, height:46, borderRadius:11, background:T.whyBg, border:`1px solid ${T.whyBorder}`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, transition:"background .4s" }}>
                    <ind.icon size={20} style={{ color:T.accent, transition:"color .4s" }}/>
                  </div>
                  <div>
                    <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:600, color:T.head, marginBottom:7, fontSize:14.5, lineHeight:1.3, transition:"color .4s" }}>{ind.name}</div>
                    <div style={{ fontSize:13, color:T.muted, lineHeight:1.6, transition:"color .4s" }}>{ind.desc}</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════ CASE STUDIES ════════════ */}
      <section id="case-studies" style={{ padding:"116px 28px", background:T.bg1, transition:"background .4s" }}>
        <div style={{ maxWidth:1280, margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:68 }}>
            <Reveal><SL>Case Studies</SL></Reveal>
            <Reveal delay={70}>
              <h2 style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:"clamp(28px,3.8vw,50px)", fontWeight:700, color:T.head, letterSpacing:"-.025em", transition:"color .4s" }}>
                Proven Results at <span style={{ color:T.accent }}>Enterprise Scale</span>
              </h2>
            </Reveal>
          </div>
          <div className="three-col" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:22 }}>
            {CASES.map((cs,i) => (
              <Reveal key={cs.title} delay={i*110}>
                <div className="card" style={{ background:T.bg2, border:`1px solid ${T.border}`, borderRadius:15, padding:34, position:"relative", overflow:"hidden", height:"100%", transition:"background .4s, border-color .4s" }}>
                  <div style={{ position:"absolute", top:0, left:0, right:0, height:2, background:`linear-gradient(90deg,${cs.color},transparent)` }}/>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:22 }}>
                    <span style={{ padding:"4px 11px", background:`${cs.color}18`, border:`1px solid ${cs.color}30`, borderRadius:100, fontSize:11, fontWeight:700, letterSpacing:".08em", textTransform:"uppercase", color:cs.color }}>{cs.tag}</span>
                    <div style={{ textAlign:"right" }}>
                      <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:30, fontWeight:700, color:cs.color, lineHeight:1 }}>{cs.metric}</div>
                      <div style={{ fontSize:10.5, color:T.muted, textTransform:"uppercase", letterSpacing:".06em", marginTop:2, transition:"color .4s" }}>{cs.metricLabel}</div>
                    </div>
                  </div>
                  <h3 style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:18, fontWeight:700, color:T.head, marginBottom:20, lineHeight:1.3, transition:"color .4s" }}>{cs.title}</h3>
                  {[["Challenge",cs.challenge],["Solution",cs.solution],["Result",cs.result]].map(([lbl,txt]) => (
                    <div key={lbl} style={{ marginBottom:14 }}>
                      <div style={{ fontSize:10.5, fontWeight:700, letterSpacing:".1em", color:cs.color, marginBottom:5 }}>{lbl.toUpperCase()}</div>
                      <div style={{ fontSize:13.5, color:T.sub, lineHeight:1.65, transition:"color .4s" }}>{txt}</div>
                    </div>
                  ))}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════ LEADERSHIP ════════════ */}
      <section id="leadership" className="dot-bg" style={{ padding:"116px 28px" }}>
        <div style={{ maxWidth:1280, margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:68 }}>
            <Reveal><SL>Leadership</SL></Reveal>
            <Reveal delay={70}>
              <h2 style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:"clamp(28px,3.8vw,50px)", fontWeight:700, color:T.head, letterSpacing:"-.025em" }}>
                Guided by <span style={{ color:T.accent }}>Industry Veterans</span>
              </h2>
              <p style={{ fontSize:16, color:T.muted, marginTop:16, maxWidth:560, margin:"16px auto 0" }}>
                Our leadership team brings decades of combined experience across AI, cloud infrastructure, data engineering, and enterprise transformation.
              </p>
            </Reveal>
          </div>

          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:24 }} className="team-grid">
            {TEAM.map((p, i) => (
              <Reveal key={p.initials} delay={80 + i * 90}>
                <div className="card" style={{ background:T.leaderBg, border:`1px solid ${T.borderAccent}`, borderRadius:18, padding:32, height:"100%", position:"relative", overflow:"hidden" }}>
                  {/* accent top bar */}
                  <div style={{ position:"absolute", top:0, left:0, right:0, height:3, background:`linear-gradient(90deg,${p.accent},transparent)` }}/>

                  {/* avatar row */}
                  <div style={{ display:"flex", alignItems:"flex-start", gap:18, marginBottom:20 }}>
                    <div style={{ flexShrink:0 }}>
                      <div style={{ width:72, height:72, borderRadius:"50%", background:p.gradient, border:`2px solid ${p.border}`, display:"flex", alignItems:"center", justifyContent:"center", marginBottom:10 }}>
                        <span style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:22, fontWeight:700, color:p.accent }}>{p.initials}</span>
                      </div>
                      <div style={{ display:"flex", flexDirection:"column", gap:5 }}>
                        {p.badges.map(b => (
                          <div key={b} style={{ padding:"3px 9px", background:`${p.accent}12`, border:`1px solid ${p.accent}28`, borderRadius:100, fontSize:9.5, color:p.accent, fontWeight:700, textAlign:"center", whiteSpace:"nowrap", letterSpacing:".04em" }}>{b}</div>
                        ))}
                      </div>
                    </div>

                    <div style={{ flex:1, minWidth:0 }}>
                      <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", gap:8, marginBottom:4 }}>
                        <h3 style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:17, fontWeight:700, color:T.head, lineHeight:1.3 }}>{p.name}</h3>
                        <Linkedin size={15} style={{ color:p.accent, flexShrink:0, marginTop:2, opacity:0.7 }}/>
                      </div>
                      <p style={{ fontSize:12, color:p.accent, fontWeight:600, letterSpacing:".04em", marginBottom:10, lineHeight:1.4 }}>{p.role}</p>
                      <p style={{ fontSize:13, color:T.sub, lineHeight:1.7 }}>{p.bio}</p>
                    </div>
                  </div>

                  {/* divider */}
                  <div style={{ height:1, background:T.sectionDivider, margin:"0 0 18px" }}/>

                  {/* highlights */}
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"9px 12px" }}>
                    {p.highlights.map(item => (
                      <div key={item} style={{ display:"flex", alignItems:"flex-start", gap:7 }}>
                        <CheckCircle size={11} style={{ color:p.accent, flexShrink:0, marginTop:3 }}/>
                        <span style={{ fontSize:12, color:T.muted, lineHeight:1.5 }}>{item}</span>
                      </div>
                    ))}
                  </div>

                 
                </div>
              </Reveal>
            ))}
          </div>
        </div>
        <style>{`
          @media(max-width:1024px){.team-grid{grid-template-columns:repeat(2,1fr)!important}}
          @media(max-width:600px){.team-grid{grid-template-columns:1fr!important}}
        `}</style>
      </section>

      {/* ════════════ PARTNERS ════════════ */}
      <section style={{ padding:"64px 28px", background:T.bg1, borderTop:`1px solid ${T.sectionDivider}`, transition:"background .4s" }}>
        <div style={{ maxWidth:1280, margin:"0 auto", textAlign:"center" }}>
          <Reveal>
            <p style={{ fontSize:11, color:T.label, letterSpacing:".12em", textTransform:"uppercase", fontWeight:700, marginBottom:34, transition:"color .4s" }}>Ecosystem Partners &amp; Technology Platforms</p>
            <div style={{ display:"flex", flexWrap:"wrap", justifyContent:"center", gap:14 }}>
              {PARTNERS.map(p => <div key={p} className="partner card">{p}</div>)}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ════════════ CTA BANNER ════════════ */}
      <section style={{ padding:"72px 28px", background:T.ctaBg, borderTop:`1px solid ${T.ctaBorder}`, borderBottom:`1px solid ${T.ctaBorder}`, transition:"background .4s" }}>
        <div style={{ maxWidth:780, margin:"0 auto", textAlign:"center" }}>
          <Reveal>
            <h2 style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:"clamp(26px,3.8vw,46px)", fontWeight:700, color:T.head, letterSpacing:"-.02em", marginBottom:18, lineHeight:1.2, transition:"color .4s" }}>
              Ready to Transform Your<br/><span style={{ color:T.accent }}>Enterprise Operations?</span>
            </h2>
            <p style={{ fontSize:16, color:T.muted, marginBottom:34, lineHeight:1.7, transition:"color .4s" }}>
              VOC Infra helps organisations build intelligent digital ecosystems powered by AI, automation, and advanced data engineering.
            </p>
            <div style={{ display:"flex", flexWrap:"wrap", gap:14, justifyContent:"center" }}>
              <button className="btn-p" onClick={() => scrollTo("contact")}>Book an Enterprise AI Consultation <ArrowRight size={17}/></button>
              <button className="btn-s" onClick={() => scrollTo("contact")}>Contact Our Solutions Team</button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ════════════ CONTACT ════════════ */}
      <section id="contact" style={{ padding:"116px 28px", background:T.bg0, transition:"background .4s" }}>
        <div style={{ maxWidth:940, margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:60 }}>
            <Reveal><SL>Get In Touch</SL></Reveal>
            <Reveal delay={70}>
              <h2 style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:"clamp(28px,3.8vw,50px)", fontWeight:700, color:T.head, letterSpacing:"-.025em", transition:"color .4s" }}>
                Start Your <span style={{ color:T.accent }}>Transformation</span>
              </h2>
            </Reveal>
          </div>
          <div className="two-col" style={{ display:"grid", gridTemplateColumns:"1fr 1.2fr", gap:34 }}>
            <Reveal delay={90}>
              <div style={{ background:T.contactLeft, border:`1px solid ${T.contactLeftBorder}`, borderRadius:15, padding:34, height:"100%", transition:"background .4s, border-color .4s" }}>
                <h3 style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:19, fontWeight:600, color:T.head, marginBottom:26, transition:"color .4s" }}>Contact Information</h3>
                {[[Mail,"Email","info@vocinfratech.com"],[Phone,"Phone","+91 XXXXX XXXXX"],[MapPin,"Location","Hyderabad, India"]].map(([Icon,label,val]) => (
                  <div key={label} style={{ display:"flex", gap:14, alignItems:"flex-start", marginBottom:22 }}>
                    <div style={{ width:38, height:38, borderRadius:9, background:T.whyBg, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, transition:"background .4s" }}>
                      <Icon size={17} style={{ color:T.accent, transition:"color .4s" }}/>
                    </div>
                    <div>
                      <div style={{ fontSize:10.5, color:T.label, textTransform:"uppercase", letterSpacing:".09em", marginBottom:3, fontWeight:700, transition:"color .4s" }}>{label}</div>
                      <div style={{ color:T.sub, fontSize:14.5, transition:"color .4s" }}>{val}</div>
                    </div>
                  </div>
                ))}
                <div style={{ marginTop:26, paddingTop:22, borderTop:`1px solid ${T.sectionDivider}` }}>
                  <p style={{ fontSize:13, color:T.label, lineHeight:1.7, transition:"color .4s" }}>Enterprise AI · Intelligent Infrastructure · Cognitive Systems</p>
                  <p style={{ fontSize:13, color:T.label, marginTop:8, lineHeight:1.7, transition:"color .4s" }}>Partner with us to build the next generation of autonomous enterprise operations.</p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={160}>
              <div style={{ background:T.bg2, border:`1px solid ${T.border}`, borderRadius:15, padding:34, transition:"background .4s, border-color .4s" }}>
                <div style={{ display:"flex", flexDirection:"column", gap:17 }}>
                  {[["Name","text","Your full name"],["Email","email","your@company.com"],["Company","text","Your company name"]].map(([lbl,type,ph]) => (
                    <div key={lbl}>
                      <label style={{ display:"block", fontSize:11, fontWeight:700, color:T.muted, textTransform:"uppercase", letterSpacing:".09em", marginBottom:7, transition:"color .4s" }}>{lbl}</label>
                      <input type={type} placeholder={ph} className="inp"/>
                    </div>
                  ))}
                  <div>
                    <label style={{ display:"block", fontSize:11, fontWeight:700, color:T.muted, textTransform:"uppercase", letterSpacing:".09em", marginBottom:7, transition:"color .4s" }}>Message</label>
                    <textarea rows={4} placeholder="Tell us about your enterprise transformation goals…" className="inp" style={{ resize:"none" }}/>
                  </div>
                  <button className="btn-p" style={{ width:"100%", justifyContent:"center" }}>
                    Send Message <ArrowRight size={16}/>
                  </button>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ════════════ FOOTER ════════════ */}
      <footer style={{ background:T.foot, borderTop:`1px solid ${T.sectionDivider}`, padding:"56px 28px 28px", transition:"background .4s" }}>
        <div style={{ maxWidth:1280, margin:"0 auto" }}>
          <div className="foot-g" style={{ display:"grid", gridTemplateColumns:"2fr 1fr 1fr 1fr", gap:44, marginBottom:44 }}>
            <div>
              <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:21, fontWeight:700, color:"#ffffff", marginBottom:4 }}>VOC<span style={{ color:T.accent }}>Infra</span></div>
              <div style={{ fontSize:9.5, color:"#64748b", letterSpacing:".1em", marginBottom:14 }}>VECTORIZED OPERATIONS & CYBERNETICS</div>
              <p style={{ fontSize:13.5, color:"#64748b", lineHeight:1.75, maxWidth:260 }}>Enterprise AI, Intelligent Infrastructure, and Cognitive Systems for the modern enterprise.</p>
            </div>
            {[["Solutions",["AI & ML Systems","Data Engineering","Cognitive Platforms","Infrastructure Automation","Cybernetic Systems"]],
              ["Company",["About VOC Infra","Leadership","Industries","Case Studies","Partners"]],
              ["Resources",["Technology Stack","Insights","Careers","Contact","Book Consultation"]]].map(([h,links]) => (
              <div key={h}>
                <h4 style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:11.5, fontWeight:700, color:"#94a3b8", textTransform:"uppercase", letterSpacing:".1em", marginBottom:18 }}>{h}</h4>
                <ul style={{ listStyle:"none", display:"flex", flexDirection:"column", gap:10 }}>
                  {links.map(l => (
                    <li key={l}>
                      <button style={{ background:"none", border:"none", cursor:"pointer", color:"#64748b", fontSize:13.5, transition:"color .2s", padding:0 }}
                        onMouseEnter={e => e.target.style.color="#94a3b8"} onMouseLeave={e => e.target.style.color="#64748b"}>
                        {l}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div style={{ borderTop:"1px solid rgba(255,255,255,0.06)", paddingTop:24, display:"flex", justifyContent:"space-between", flexWrap:"wrap", gap:10 }}>
            <p style={{ fontSize:12.5, color:"#637691" }}>© 2025 VOC Infra — Vectorized Operations & Cybernetics. All rights reserved.</p>
            <p style={{ fontSize:12.5, color:"#637691" }}>Hyderabad, India · info@vocinfratech.com</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
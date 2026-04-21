import { useState, useEffect, useRef } from "react";
import {
  Menu, X, ChevronRight, ArrowRight, Mail, Phone, MapPin,
  Zap, Database, Brain, Server, Cpu, Network, TrendingUp,
  Globe, Award, CheckCircle, Activity, Shield, BarChart3,
  Code2, Cloud, Layers
} from "lucide-react";

/* ══════════════════════ STATIC DATA ══════════════════════ */

const NAV_LINKS = ["Home","About","Solutions","Technology","Industries","Case Studies","Leadership","Contact"];

const SOLUTIONS = [
  { icon:Brain,    color:"#0099c6", title:"AI & Machine Learning Systems",           desc:"Intelligent automation and predictive systems that transform enterprise decision-making.",         items:["Predictive analytics platforms","Intelligent workflow automation","AI-based decision engines","Computer vision & NLP solutions"] },
  { icon:Database, color:"#7c3aed", title:"Data Engineering & Intelligent Pipelines", desc:"End-to-end data infrastructure built for real-time intelligence and enterprise scale.",           items:["Data lake architecture","Real-time data pipelines","Enterprise data orchestration","Data governance frameworks"] },
  { icon:Cpu,      color:"#0891b2", title:"Cognitive Enterprise Platforms",           desc:"Self-optimising enterprise workflows powered by cognitive automation engines.",                   items:["Autonomous workflow systems","AI-powered knowledge systems","Cognitive automation engines","Decision support platforms"] },
  { icon:Server,   color:"#0284c7", title:"Intelligent IT Infrastructure",            desc:"AI-monitored, infrastructure-as-code powered cloud and hybrid systems.",                          items:["Infrastructure as Code (IaC)","AI-based infrastructure monitoring","Cloud & hybrid management","DevOps automation frameworks"] },
  { icon:Network,  color:"#6366f1", title:"Cybernetic Enterprise Systems",            desc:"Adaptive, self-correcting architectures that autonomously optimise performance via AI feedback.", items:["Adaptive infrastructure management","Autonomous enterprise operations","Self-correcting architectures","AI feedback loop optimisation"] },
];

const TECH = [
  { cat:"AI & Machine Learning",   items:["Python","TensorFlow","PyTorch","Scikit-learn"],          color:"#0099c6" },
  { cat:"Data Engineering",        items:["Apache Spark","Kafka","Snowflake","Databricks"],          color:"#7c3aed" },
  { cat:"Cloud Platforms",         items:["AWS","Microsoft Azure","Google Cloud"],                   color:"#0891b2" },
  { cat:"DevOps & Infrastructure", items:["Docker","Kubernetes","Terraform","Ansible"],              color:"#0284c7" },
  { cat:"Data Visualization",      items:["Power BI","Tableau","Looker"],                            color:"#6366f1" },
  { cat:"Enterprise Integration",  items:["REST APIs","Microservices","Event-driven Systems"],       color:"#0099c6" },
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
  { tag:"Financial Services", color:"#0099c6", title:"AI Infrastructure Automation",     metric:"40%",  metricLabel:"Downtime Reduced",  challenge:"High infrastructure downtime and operational inefficiencies impacting core banking operations.", solution:"Implemented AI-based monitoring and predictive infrastructure management with automated remediation.", result:"40% downtime reduction and improved operational efficiency." },
  { tag:"Healthcare",         color:"#7c3aed", title:"Data Engineering for Analytics",    metric:"100%", metricLabel:"Data Unified",      challenge:"Fragmented healthcare data across multiple disconnected systems preventing real-time insights.", solution:"Built a unified data pipeline and intelligent analytics platform with enterprise governance.", result:"Enabled real-time analytics and dramatically improved decision making." },
  { tag:"Media Platform",     color:"#0891b2", title:"Intelligent Automation Deployment", metric:"60%",  metricLabel:"Faster Operations", challenge:"Manual operational workflows causing critical delays and resource inefficiency at scale.", solution:"Deployed cognitive automation and self-optimising workflow orchestration engines.", result:"60% increase in operational speed across all workflow units." },
];

const PARTNERS = ["AWS","Microsoft Azure","Google Cloud","Databricks","Snowflake"];

const TEAM = [
  {
    photo:"/Jagadish_Gadireddy.png", initials:"JG", accent:"#0099c6",
    gradient:"linear-gradient(135deg,rgba(0,153,198,0.18),rgba(147,51,234,0.18))",
    border:"rgba(0,153,198,0.35)",
    name:"Jagadish Gadireddy", role:"Founder & Managing Director",
    badges:["30+ Years","IT & EdTech","Entrepreneur"],
    bio:"Entrepreneur and business leader with interests spanning Information Technology, Education, and Wellness sectors. Based in Hyderabad, he builds ventures that combine technology, knowledge, and holistic well-being to create meaningful impact.",
    highlights:["Founded and led organizations in digital technology, education services, and wellness platforms","Strategic approach to building sustainable, technology-enabled businesses","Passionate about fostering innovation and collaborative ecosystems","Drives long-term growth by integrating technology, learning, and wellness"],
  },
  {
    photo:"/Suresh_Giriraj.png", initials:"SG", accent:"#7c3aed",
    gradient:"linear-gradient(135deg,rgba(124,58,237,0.18),rgba(99,102,241,0.15))",
    border:"rgba(124,58,237,0.35)",
    name:"Suresh Giriraj", role:"Chief Innovation Officer",
    badges:["30+ Years","Corporate Comms","AgriTech"],
    bio:"Engineering graduate from Anna University Chennai with 30+ years in the service industry. Expert in corporate communications, branding, and technology innovation — from enterprise back-office operations to cutting-edge controlled environment agriculture.",
    highlights:["Formalised communications and branding for BITS Pilani, ITC Agrotech, and EPE Process Controls","Incorporated EquiNordic Systems and managed Lufthansa Cargo's back-office operations in India","Designed and built an automated hydroponic farm with remote IoT-based management","Successfully built and deployed University Management Software at BITS Hyderabad"],
  },
  {
    photo:"/Krishna_Kanth.png", initials:"TK", accent:"#0891b2",
    gradient:"linear-gradient(135deg,rgba(8,145,178,0.18),rgba(6,182,212,0.12))",
    border:"rgba(8,145,178,0.35)",
    name:"T R Krishna Kanth", role:"Director – Strategy & Growth",
    badges:["10+ Years","Digital Growth","AI & DeepTech"],
    bio:"Technology entrepreneur and business strategist with over 10 years of experience across HealthTech, FinTech, EdTech, Manufacturing, and Enterprise Technology. Expert in go-to-market strategy, digital transformation, and building scalable growth ecosystems.",
    highlights:["Worked with global organizations including Wipro and Salesforce on strategic partnerships and enterprise solutions","Built growth-driven digital ecosystems for startups and enterprises using full-funnel marketing systems","Engaged in developing AI, DeepTech, and enterprise automation solutions","Designs scalable business models with data-driven marketing and sales frameworks"],
  },
  {
    photo:"/Manoj_kumar_jain.png", initials:"MJ", accent:"#6366f1",
    gradient:"linear-gradient(135deg,rgba(99,102,241,0.18),rgba(139,92,246,0.15))",
    border:"rgba(99,102,241,0.35)",
    name:"Manoj Kumar Jain", role:"Chief Product & Technology Architect",
    badges:["35+ Years","ERP & SQL","ISO Expert"],
    bio:"Technologist and entrepreneur with over 35 years in enterprise software design, ERP architecture, and business process automation. Combines deep expertise in database systems and enterprise applications with ISO management systems consulting.",
    highlights:["Developed advanced software licensing and data protection technologies used in VFX and digital font environments","ISO 9001 auditor and consultant across ISO 9001, 14001, 27001, and 50001 standards","Designed training and examination modules for multiple ISO management systems","Practicing valuer and trained insurance professional with expertise in asset valuation and financial risk"],
  },
];

/* marquee items — two rows, reverse direction */
const MARQUEE_ROW1 = [
  { label:"TensorFlow", Icon:Brain    },
  { label:"AWS",        Icon:Cloud    },
  { label:"Kubernetes", Icon:Network  },
  { label:"Snowflake",  Icon:Database },
  { label:"PyTorch",    Icon:Cpu      },
  { label:"Azure",      Icon:Layers   },
  { label:"Kafka",      Icon:Activity },
  { label:"Databricks", Icon:BarChart3},
  { label:"Terraform",  Icon:Code2    },
  { label:"Google Cloud",Icon:Globe   },
  { label:"Docker",     Icon:Server   },
  { label:"Power BI",   Icon:TrendingUp},
];
const MARQUEE_ROW2 = [
  { label:"Apache Spark",Icon:Zap     },
  { label:"Scikit-learn",Icon:Brain   },
  { label:"Ansible",     Icon:Shield  },
  { label:"Tableau",     Icon:BarChart3},
  { label:"Hadoop",      Icon:Database},
  { label:"REST APIs",   Icon:Code2   },
  { label:"Microservices",Icon:Network},
  { label:"Python",      Icon:Cpu     },
  { label:"Looker",      Icon:TrendingUp},
  { label:"Snowflake",   Icon:Database},
  { label:"Azure DevOps",Icon:Layers  },
  { label:"OCI",         Icon:Cloud   },
];

/* hero orbit nodes */
const ORBIT_NODES = [
  { angle:0,   Icon:Database, label:"Data",     color:"#7c3aed", delay:"0s"   },
  { angle:72,  Icon:Shield,   label:"Security", color:"#0891b2", delay:"0.5s" },
  { angle:144, Icon:Server,   label:"Infra",    color:"#0284c7", delay:"1.0s" },
  { angle:216, Icon:Activity, label:"Monitor",  color:"#6366f1", delay:"1.5s" },
  { angle:288, Icon:Zap,      label:"Automate", color:"#0099c6", delay:"2.0s" },
];

const STATS = [
  { end:30, suffix:"+", label:"Years of Leadership",  color:"#0099c6" },
  { end:40, suffix:"%", label:"Avg. Efficiency Gain", color:"#7c3aed" },
  { end:98, suffix:"%", label:"Client Satisfaction",  color:"#0891b2" },
  { end:60, suffix:"%", label:"Faster Operations",    color:"#6366f1" },
];

/* ══════════════════════ THEME ══════════════════════ */
const T = {
  bg0:"#f4f7ff", bg1:"#eaeffa", bg2:"#ffffff",
  foot:"#0c1524",
  border:"rgba(0,0,0,0.07)", borderAccent:"rgba(0,120,190,0.18)",
  text:"#1e293b", head:"#0a1628", sub:"#475569", muted:"#475569", label:"#64748b",
  navBg:"rgba(244,247,255,0.96)", navBorder:"rgba(0,100,180,0.1)",
  inputBg:"#f8faff", inputBorder:"rgba(0,0,0,0.1)", inputText:"#0f172a",
  cardHover:"#eef2ff", partnerBg:"#ffffff", partnerColor:"#64748b",
  dotOpacity:"0.045",
  orbCyan:"rgba(0,150,200,0.11)", orbPurple:"rgba(124,58,237,0.07)",
  aboutCard:"rgba(0,120,180,0.04)", leaderBg:"#ffffff",
  ctaBg:"linear-gradient(135deg,rgba(0,120,200,0.07),rgba(124,58,237,0.06))",
  ctaBorder:"rgba(0,120,180,0.15)",
  contactLeft:"linear-gradient(135deg,rgba(0,120,200,0.07),rgba(124,58,237,0.05))",
  contactLeftBorder:"rgba(0,120,180,0.18)",
  sectionDivider:"rgba(0,0,0,0.055)",
  scrollbar:"#f4f7ff", scrollThumb:"rgba(0,120,180,0.18)",
  navLinkColor:"#64748b", navLinkHover:"#0077a8",
  accent:"#0077a8", accentDark:"#005f8a",
  shimmer:"linear-gradient(90deg,#0077a8,#7c3aed,#0891b2,#0077a8)",
  badgeBg:"rgba(0,120,180,0.08)", badgeBorder:"rgba(0,120,180,0.22)",
  whyBg:"rgba(0,120,180,0.07)", whyBorder:"rgba(0,120,180,0.18)",
};

/* ══════════════════════ HOOKS ══════════════════════ */
function useReveal(delay=0){
  const ref=useRef(null);
  useEffect(()=>{
    const el=ref.current; if(!el) return;
    const obs=new IntersectionObserver(([e])=>{
      if(!e.isIntersecting) return;
      requestAnimationFrame(()=>requestAnimationFrame(()=>
        setTimeout(()=>{ if(el){el.style.opacity="1";el.style.transform="translateY(0px) scale(1)";} },delay)
      ));
      obs.disconnect();
    },{threshold:0.08});
    obs.observe(el);
    return ()=>obs.disconnect();
  },[delay]);
  return ref;
}

function useCounter(end,duration=2200){
  const [val,setVal]=useState(0);
  const ref=useRef(null);
  useEffect(()=>{
    const el=ref.current; if(!el) return;
    const obs=new IntersectionObserver(([e])=>{
      if(!e.isIntersecting) return;
      obs.disconnect();
      let start=null;
      const tick=(ts)=>{
        if(!start) start=ts;
        const p=Math.min((ts-start)/duration,1);
        const ease=1-Math.pow(1-p,3);
        setVal(Math.floor(ease*end));
        if(p<1) requestAnimationFrame(tick); else setVal(end);
      };
      requestAnimationFrame(tick);
    },{threshold:0.3});
    obs.observe(el);
    return ()=>obs.disconnect();
  },[end,duration]);
  return {val,ref};
}

/* ══════════════════════ COMPONENTS ══════════════════════ */

function Reveal({delay=0,children,style={}}){
  const ref=useReveal(delay);
  return(
    <div ref={ref} style={{opacity:0,transform:"translateY(30px) scale(0.98)",transition:"opacity 0.65s cubic-bezier(0.4,0,0.2,1),transform 0.65s cubic-bezier(0.4,0,0.2,1)",willChange:"opacity,transform",...style}}>
      {children}
    </div>
  );
}

function SL({children}){
  return <span style={{display:"block",fontSize:14,fontWeight:700,letterSpacing:"0.16em",textTransform:"uppercase",color:T.accent,marginBottom:14}}>{children}</span>;
}
function Div(){
  return <div style={{width:48,height:3,background:`linear-gradient(90deg,${T.accent},#7c3aed)`,borderRadius:2,margin:"18px 0 26px"}}/>;
}

/* ── Animated counter ── */
function Counter({end,suffix,label,color}){
  const {val,ref}=useCounter(end);
  return(
    <div ref={ref} style={{textAlign:"center",padding:"28px 20px"}}>
      <div style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:"clamp(42px,5.5vw,64px)",fontWeight:800,color,lineHeight:1,letterSpacing:"-.04em",transition:"color .3s"}}>
        {val}{suffix}
      </div>
      <div style={{fontSize:13,color:T.muted,marginTop:8,fontWeight:500,letterSpacing:".02em"}}>{label}</div>
    </div>
  );
}

/* ── Marquee strip ── */
function MarqueeRow({items,reverse=false,speed=38}){
  const triple=[...items,...items,...items];
  return(
    <div style={{overflow:"hidden",maskImage:"linear-gradient(90deg,transparent 0%,#000 8%,#000 92%,transparent 100%)",WebkitMaskImage:"linear-gradient(90deg,transparent 0%,#000 8%,#000 92%,transparent 100%)"}}>
      <div style={{display:"flex",width:"max-content",gap:0,animation:`mqScroll${reverse?"R":""} ${speed}s linear infinite`}}>
        {triple.map((item,i)=>(
          <div key={i} style={{display:"flex",alignItems:"center",gap:9,padding:"11px 22px",margin:"0 5px",background:T.bg2,border:`1px solid ${T.border}`,borderRadius:10,flexShrink:0,boxShadow:"0 2px 8px rgba(0,0,0,0.045)"}}>
            <item.Icon size={15} style={{color:T.accent,opacity:0.65}}/>
            <span style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:13,fontWeight:600,color:T.sub,whiteSpace:"nowrap"}}>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Hero orbital tech visual ── */
function HeroVisual(){
  const W=500, H=500, CX=250, CY=260;
  const RADII=[220,165,110];
  return(
    <div style={{position:"relative",width:W,height:H,margin:"0 auto",flexShrink:0}}>

      {/* background radial glow */}
      <div style={{position:"absolute",inset:0,background:"radial-gradient(ellipse 80% 80% at 50% 50%, rgba(0,150,200,0.10) 0%, rgba(124,58,237,0.07) 55%, transparent 100%)",borderRadius:"50%",animation:"orbPulse 5s ease-in-out infinite"}}/>

      {/* SVG: static rings + animated dashed orbit + connection lines */}
      <svg width={W} height={H} style={{position:"absolute",top:0,left:0,overflow:"visible",pointerEvents:"none"}}>
        {/* ── large outermost accent ring ── */}
        <circle cx={CX} cy={CY} r={RADII[0]} fill="none" stroke="rgba(0,150,200,0.07)" strokeWidth="1"/>

        {/* ── mid dashed ring — spins ── */}
        <circle cx={CX} cy={CY} r={RADII[1]}
          fill="none" stroke="rgba(0,150,200,0.18)" strokeWidth="1"
          strokeDasharray="6 10"
          style={{transformOrigin:`${CX}px ${CY}px`,animation:"spin1 22s linear infinite"}}/>

        {/* ── inner solid ring — reverse spin ── */}
        <circle cx={CX} cy={CY} r={RADII[2]}
          fill="none" stroke="rgba(124,58,237,0.2)" strokeWidth="1"
          strokeDasharray="4 8"
          style={{transformOrigin:`${CX}px ${CY}px`,animation:"spin1 14s linear infinite reverse"}}/>

        {/* ── connection lines from center to each orbit node ── */}
        {ORBIT_NODES.map(({angle,color},i)=>{
          const rad=(angle-90)*Math.PI/180;
          const x2=CX+Math.cos(rad)*RADII[1];
          const y2=CY+Math.sin(rad)*RADII[1];
          return(
            <line key={i} x1={CX} y1={CY} x2={x2} y2={y2}
              stroke={color} strokeWidth="1" strokeOpacity="0.25"
              strokeDasharray="4 5"
              style={{animation:`dashFlow 3s linear infinite`,animationDelay:`${i*0.45}s`}}/>
          );
        })}

        {/* ── traveling dots along lines ── */}
        {ORBIT_NODES.map(({angle,color},i)=>{
          const rad=(angle-90)*Math.PI/180;
          const x2=CX+Math.cos(rad)*RADII[1];
          const y2=CY+Math.sin(rad)*RADII[1];
          return(
            <circle key={`dot-${i}`} r="3" fill={color} opacity="0.8">
              <animateMotion dur={`${2.5+i*0.3}s`} repeatCount="indefinite" begin={`${i*0.5}s`}>
                <mpath/>
              </animateMotion>
              {/* fallback: just pulse at the end */}
              <animate attributeName="cx" values={`${CX};${x2};${CX}`} dur={`${2.5+i*0.3}s`} repeatCount="indefinite" begin={`${i*0.5}s`}/>
              <animate attributeName="cy" values={`${CY};${y2};${CY}`} dur={`${2.5+i*0.3}s`} repeatCount="indefinite" begin={`${i*0.5}s`}/>
            </circle>
          );
        })}

        {/* ── hex outline around center ── */}
        {[0,1].map(j=>{
          const r=j===0?58:44;
          const pts=[0,60,120,180,240,300].map(a=>{
            const rad2=(a-90)*Math.PI/180;
            return `${CX+Math.cos(rad2)*r},${CY+Math.sin(rad2)*r}`;
          }).join(" ");
          return <polygon key={j} points={pts} fill={j===0?"rgba(0,150,200,0.06)":"none"} stroke={j===0?"rgba(0,150,200,0.35)":"rgba(0,150,200,0.2)"} strokeWidth="1.5"/>;
        })}
      </svg>

      {/* ── centre brain icon ── */}
      <div style={{position:"absolute",left:CX,top:CY,transform:"translate(-50%,-50%)",zIndex:10}}>
        <div style={{width:68,height:68,borderRadius:16,background:"linear-gradient(135deg,#0077a8,#7c3aed)",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 0 0 12px rgba(0,119,168,0.09), 0 0 40px rgba(0,119,168,0.35)",animation:"centerPulse 3.5s ease-in-out infinite"}}>
          <Brain size={30} color="#fff"/>
        </div>
      </div>

      {/* ── orbit nodes — positioned absolutely ── */}
      {ORBIT_NODES.map(({angle,Icon,label,color,delay})=>{
        const rad=(angle-90)*Math.PI/180;
        const x=CX+Math.cos(rad)*RADII[1];
        const y=CY+Math.sin(rad)*RADII[1];
        return(
          <div key={label} style={{position:"absolute",left:x,top:y,transform:"translate(-50%,-50%)",zIndex:10,animation:"floatNode 3.2s ease-in-out infinite",animationDelay:delay}}>
            <div style={{background:T.bg2,border:`1.5px solid ${color}45`,borderRadius:12,padding:"9px 14px",display:"flex",flexDirection:"column",alignItems:"center",gap:5,boxShadow:`0 4px 20px ${color}18, 0 0 0 1px ${color}10`,minWidth:76}}>
              <div style={{width:32,height:32,borderRadius:8,background:`${color}14`,display:"flex",alignItems:"center",justifyContent:"center"}}>
                <Icon size={16} style={{color}}/>
              </div>
              <span style={{fontSize:10,fontWeight:700,color:T.sub,letterSpacing:".05em",whiteSpace:"nowrap"}}>{label}</span>
            </div>
          </div>
        );
      })}

      {/* ── floating metric badges ── */}
      {[
        {label:"40% ↓ Downtime",  x:CX+RADII[0]-10, y:CY-90, color:"#0099c6"},
        {label:"98% Satisfaction", x:CX-RADII[0]+10, y:CY+70, color:"#7c3aed"},
        {label:"60% ↑ Speed",     x:CX+60,           y:CY+RADII[0]-20, color:"#0891b2"},
      ].map(({label,x,y,color})=>(
        <div key={label} style={{position:"absolute",left:x,top:y,transform:"translate(-50%,-50%)",zIndex:8,animation:"floatNode 4s ease-in-out infinite",animationDelay:"1s"}}>
          <div style={{padding:"5px 12px",background:T.bg2,border:`1px solid ${color}35`,borderRadius:100,fontSize:11,fontWeight:700,color,whiteSpace:"nowrap",boxShadow:`0 2px 12px ${color}18`}}>
            {label}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ══════════════════════ MAIN APP ══════════════════════ */
export default function App(){
  const [menuOpen,setMenuOpen]=useState(false);
  const [scrolled,setScrolled]=useState(false);
  const [hovered,setHovered]=useState(null);

  useEffect(()=>{
    const fn=()=>setScrolled(window.scrollY>56);
    window.addEventListener("scroll",fn);
    return ()=>window.removeEventListener("scroll",fn);
  },[]);

  const scrollTo=id=>{
    const el=document.getElementById(id.toLowerCase().replace(/\s+/g,"-"));
    if(el){el.scrollIntoView({behavior:"smooth"});setMenuOpen(false);}
  };

  return(
  <div style={{background:T.bg0,color:T.text,fontFamily:"'DM Sans','Segoe UI',sans-serif",overflowX:"hidden"}}>

  {/* ════ GLOBAL CSS ════ */}
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,700&family=Space+Grotesk:wght@400;500;600;700;800&display=swap');
    *{box-sizing:border-box;margin:0;padding:0}
    html{scroll-behavior:smooth}
    ::-webkit-scrollbar{width:5px}
    ::-webkit-scrollbar-track{background:#f4f7ff}
    ::-webkit-scrollbar-thumb{background:rgba(0,120,180,0.2);border-radius:3px}
    input,textarea,button{font-family:inherit}

    /* dots */
    .dot-bg{background-image:radial-gradient(rgba(0,100,180,${T.dotOpacity}) 1px,transparent 1px);background-size:30px 30px}

    /* shimmer */
    .shimmer-t{
      background:${T.shimmer};
      background-size:300% auto;
      -webkit-background-clip:text;-webkit-text-fill-color:transparent;
      background-clip:text;
      animation:shimTxt 5s linear infinite;
    }
    @keyframes shimTxt{to{background-position:300% center}}

    /* orbs */
    .orb1{animation:orbA 10s ease-in-out infinite}
    .orb2{animation:orbB 13s ease-in-out infinite}
    .orb3{animation:orbA 8s ease-in-out infinite 2s}
    @keyframes orbA{0%,100%{transform:translateY(0) scale(1)}50%{transform:translateY(-22px) scale(1.04)}}
    @keyframes orbB{0%,100%{transform:translateY(0) scale(1)}50%{transform:translateY(18px) scale(0.97)}}

    /* hero visual */
    @keyframes spin1{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
    @keyframes centerPulse{
      0%,100%{box-shadow:0 0 0 12px rgba(0,119,168,0.09),0 0 30px rgba(0,119,168,0.3)}
      50%{box-shadow:0 0 0 18px rgba(0,119,168,0.05),0 0 60px rgba(0,119,168,0.55),0 0 90px rgba(124,58,237,0.2)}
    }
    @keyframes orbPulse{0%,100%{opacity:0.8;transform:scale(1)}50%{opacity:1;transform:scale(1.04)}}
    @keyframes floatNode{0%,100%{transform:translate(-50%,-50%) translateY(0)}50%{transform:translate(-50%,-50%) translateY(-9px)}}
    @keyframes dashFlow{to{stroke-dashoffset:-18}}

    /* badge pulse */
    .pulse-d{animation:dPulse 2.2s ease-out infinite}
    @keyframes dPulse{
      0%{box-shadow:0 0 0 0 rgba(0,120,180,0.45)}
      70%{box-shadow:0 0 0 9px transparent}
      100%{box-shadow:0 0 0 0 transparent}
    }

    /* marquee */
    @keyframes mqScroll{from{transform:translateX(0)}to{transform:translateX(calc(-100% / 3))}}
    @keyframes mqScrollR{from{transform:translateX(calc(-100% / 3))}to{transform:translateX(0)}}

    /* cards */
    .card{transition:transform .3s cubic-bezier(.4,0,.2,1),border-color .3s,box-shadow .3s;cursor:default}
    .card:hover{transform:translateY(-6px)}

    /* stat card */
    .stat-card{background:#fff;border:1px solid rgba(0,120,180,0.1);border-radius:18px;box-shadow:0 4px 24px rgba(0,0,0,0.045);transition:all .3s}
    .stat-card:hover{border-color:rgba(0,120,180,0.25);box-shadow:0 10px 36px rgba(0,120,180,0.12);transform:translateY(-4px)}

    /* nav */
    .nav-btn{background:none;border:none;cursor:pointer;color:${T.navLinkColor};font-size:13.5px;font-weight:500;transition:color .2s;letter-spacing:.02em;padding:2px 0}
    .nav-btn:hover{color:${T.navLinkHover}}

    /* buttons */
    .btn-p{background:linear-gradient(135deg,${T.accent},${T.accentDark});color:#fff;font-weight:700;padding:13px 28px;border-radius:8px;border:none;cursor:pointer;font-size:15px;transition:all .25s;display:inline-flex;align-items:center;gap:8px;letter-spacing:.01em}
    .btn-p:hover{transform:translateY(-2px);box-shadow:0 14px 32px rgba(0,100,180,0.3)}
    .btn-s{background:transparent;color:${T.accent};font-weight:600;padding:13px 28px;border-radius:8px;border:2px solid rgba(0,100,180,0.3);cursor:pointer;font-size:15px;transition:all .25s;display:inline-flex;align-items:center;gap:8px}
    .btn-s:hover{background:rgba(0,100,180,0.07);border-color:${T.accent};transform:translateY(-2px)}

    /* inputs */
    .inp{width:100%;padding:13px 15px;background:${T.inputBg};border:1px solid ${T.inputBorder};border-radius:8px;color:${T.inputText};font-size:15px;outline:none;transition:border-color .2s}
    .inp:focus{border-color:${T.accent}80}
    .inp::placeholder{color:${T.muted}}

    /* partner pills */
    .partner{padding:14px 28px;background:${T.partnerBg};border:1px solid ${T.border};border-radius:10px;font-size:14px;font-weight:700;color:${T.partnerColor};letter-spacing:.04em;transition:all .3s;cursor:default}
    .partner:hover{border-color:${T.accent}55;color:${T.accent};transform:translateY(-3px)}

    /* responsive */
    @media(max-width:820px){.desk-nav{display:none!important}}
    @media(min-width:821px){.mob-ham{display:none!important}}
    @media(max-width:1040px){.hero-visual-wrap{display:none!important}}
    @media(max-width:768px){
      .two-col{grid-template-columns:1fr!important;gap:36px!important}
      .three-col{grid-template-columns:1fr!important}
      .foot-g{grid-template-columns:1fr 1fr!important}
    }
    @media(max-width:600px){
      .team-grid{grid-template-columns:1fr!important}
      .stats-grid{grid-template-columns:1fr 1fr!important}
      .foot-g{grid-template-columns:1fr!important}
    }

    /* ── leadership card: mobile blank-space fix ── */
    @media(max-width:900px){
      .leader-top{flex-direction:column!important}
      .leader-avatar-col{display:flex!important;flex-direction:row!important;align-items:center!important;gap:14px!important;width:100%!important;margin-bottom:14px!important}
      .leader-avatar-circle{margin-bottom:0!important;flex-shrink:0!important}
      .leader-badges{flex-direction:row!important;flex-wrap:wrap!important;gap:6px!important;margin-top:0!important}
      .leader-text-col{width:100%}
    }

    /* ── section imagery ── */
    .section-img{width:100%;height:100%;object-fit:cover;border-radius:16px;display:block;box-shadow:0 16px 48px rgba(0,0,0,0.1)}
    @media(max-width:768px){.hide-mobile{display:none!important}}
  `}</style>

  {/* ════ NAV ════ */}
  <header style={{position:"fixed",top:0,left:0,right:0,zIndex:200,background:scrolled?T.navBg:"transparent",backdropFilter:scrolled?"blur(20px)":"none",borderBottom:scrolled?`1px solid ${T.navBorder}`:"1px solid transparent",transition:"all .35s"}}>
    <div style={{maxWidth:1280,margin:"0 auto",padding:"0 28px",height:68,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
      <button onClick={()=>scrollTo("home")} style={{background:"none",border:"none",cursor:"pointer",textAlign:"left"}}>
        <div style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:21,fontWeight:700,color:T.head,letterSpacing:"-.02em"}}>
          <img src="/voc_logo.png" alt="VOC Infra Logo" style={{width:200,height:27,verticalAlign:"middle"}}/>
        </div>
        {/* <div style={{fontSize:9.5,color:T.muted,letterSpacing:".1em",marginTop:1}}>VECTORIZED OPERATIONS & CYBERNETICS</div> */}
      </button>

      <div className="desk-nav" style={{display:"flex",gap:26,alignItems:"center"}}>
        {NAV_LINKS.map(l=><button key={l} className="nav-btn" onClick={()=>scrollTo(l)}>{l}</button>)}
        {/* <button className="btn-p" style={{padding:"9px 20px",fontSize:13}} onClick={()=>scrollTo("contact")}>Book Consultation</button> */}
      </div>

      <button className="mob-ham" onClick={()=>setMenuOpen(o=>!o)} style={{background:"none",border:"none",cursor:"pointer",color:T.sub}}>
        {menuOpen?<X size={22}/>:<Menu size={22}/>}
      </button>
    </div>

    {menuOpen&&(
      <div style={{background:"rgba(244,247,255,0.98)",borderTop:`1px solid ${T.sectionDivider}`,padding:"22px 28px 28px",display:"flex",flexDirection:"column",gap:18}}>
        {NAV_LINKS.map(l=><button key={l} className="nav-btn" style={{fontSize:16,textAlign:"left"}} onClick={()=>scrollTo(l)}>{l}</button>)}
        <button className="btn-p" onClick={()=>scrollTo("contact")}>Book Consultation <ArrowRight size={16}/></button>
      </div>
    )}
  </header>

{/* ════ HERO ════ */}
<style>{`
  .hero-grid {
    max-width: 1280px;
    margin: 0 auto;
    padding: 50px 28px 80px;
    width: 100%;
    box-sizing: border-box;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 32px;
    align-items: flex-start;
    position: relative;
  }
  @media (max-width: 768px) {
    .hero-grid {
      grid-template-columns: 1fr;
    }
    .hero-visual-wrap {
      display: none !important;
    }
  }
`}</style>

<section id="home" className="dot-bg" style={{minHeight:"100vh",display:"flex",alignItems:"center",paddingTop:68,position:"relative",overflow:"hidden",boxSizing:"border-box",width:"100%"}}>
  {/* background orbs */}
  <div className="orb1" style={{position:"absolute",top:"8%",right:"4%",width:"min(560px,80vw)",height:"min(560px,80vw)",borderRadius:"50%",background:`radial-gradient(circle,${T.orbCyan} 0%,transparent 68%)`,pointerEvents:"none"}}/>
  <div className="orb2" style={{position:"absolute",bottom:"8%",left:"2%",width:"min(460px,70vw)",height:"min(460px,70vw)",borderRadius:"50%",background:`radial-gradient(circle,${T.orbPurple} 0%,transparent 68%)`,pointerEvents:"none"}}/>

  <div className="hero-grid">

    {/* LEFT — copy */}
    <div>
      <Reveal>
        <div style={{display:"inline-flex",alignItems:"center",gap:10,padding:"7px 16px",background:T.badgeBg,border:`1px solid ${T.badgeBorder}`,borderRadius:100,marginBottom:28}}>
          <div className="pulse-d" style={{width:7,height:7,borderRadius:"50%",background:T.accent,flexShrink:0}}/>
          <span style={{fontSize:11.5,fontWeight:700,color:T.accent,letterSpacing:".12em",textTransform:"uppercase"}}>AI-First Enterprise Technology Company</span>
        </div>
      </Reveal>

      <Reveal delay={90}>
        <h1 style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:"clamp(40px,5.5vw,72px)",fontWeight:800,lineHeight:1.04,letterSpacing:"-.03em",color:T.head,marginBottom:26}}>
          AI-Powered
          Enterprise<br/>
          <span className="shimmer-t">Automation </span><br/>
        </h1>
      </Reveal>

      <Reveal delay={180}>
        <p style={{fontSize:18,color:T.sub,lineHeight:1.75,maxWidth:580,marginBottom:12}}>
          VOC Infra helps enterprises transform operations using Artificial Intelligence, Machine Learning, Data Engineering, and Cybernetic Systems.
        </p>
        <p style={{fontSize:15,color:T.muted,lineHeight:1.75,maxWidth:560,marginBottom:42}}>
          We design intelligent enterprise platforms integrating automation, predictive analytics, and self-optimising infrastructure — enabling organisations to build autonomous digital ecosystems.
        </p>
      </Reveal>

      <Reveal delay={260}>
        <div style={{display:"flex",flexWrap:"wrap",gap:14,marginBottom:56}}>
          <button className="btn-p" onClick={()=>scrollTo("contact")}>Schedule a Strategy Call <ArrowRight size={17}/></button>
          <button className="btn-s" onClick={()=>scrollTo("solutions")}>Explore Solutions <ChevronRight size={17}/></button>
        </div>
      </Reveal>

      <Reveal delay={340}>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr", gap:40}}>
          {[["30+","Years Leadership"],["250+","Global Professionals"],["Fortune 500","Clients Served"],["40%+","Avg. Efficiency Gain"]].map(([n,l])=>(
            <div key={l}>
              <div style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:30,fontWeight:700,color:T.accent,lineHeight:1}}>{n}</div>
              <div style={{fontSize:12,color:T.muted,marginTop:4}}>{l}</div>
            </div>
          ))}
        </div>
      </Reveal>
    </div>

    {/* RIGHT — animated orbital visual */}
    <div className="hero-visual-wrap" style={{display:"flex",justifyContent:"center",alignItems:"flex-start",marginTop:40}}>
      <HeroVisual/>
    </div>
  </div>
</section>

  {/* ════ MARQUEE STRIP ════ */}
  <section style={{padding:"36px 0",background:T.bg1,borderTop:`1px solid ${T.border}`,borderBottom:`1px solid ${T.border}`,overflow:"hidden"}}>
    <div style={{marginBottom:12}}>
      <MarqueeRow items={MARQUEE_ROW1} speed={42}/>
    </div>
    <MarqueeRow items={MARQUEE_ROW2} speed={36} reverse/>
  </section>

  {/* ════ ANIMATED STATS ════ */}
  <section style={{padding:"72px 28px",background:T.bg2}}>
    <div style={{maxWidth:1280,margin:"0 auto"}}>
      <Reveal>
        <div className="stats-grid" style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:20}}>
          {STATS.map(s=>(
            <div key={s.label} className="stat-card">
              <Counter end={s.end} suffix={s.suffix} label={s.label} color={s.color}/>
            </div>
          ))}
        </div>
      </Reveal>
    </div>
  </section>

  {/* ════ ABOUT ════ */}
  <section id="about" style={{padding:"116px 28px",background:T.bg1}}>
    <div className="two-col" style={{maxWidth:1280,margin:"0 auto",display:"grid",gridTemplateColumns:"1fr 1fr",gap:72,alignItems:"center"}}>
      <div>
        <Reveal><SL>About VOC Infra</SL></Reveal>
        <Reveal delay={70}>
          <h2 style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:"clamp(28px,3.8vw,50px)",fontWeight:700,color:T.head,lineHeight:1.14,letterSpacing:"-.025em"}}>
            Vectorized Operations<br/>&amp; <span >Cybernetics</span>
          </h2>
          <Div/>
        </Reveal>
        <Reveal delay={140}>
          <p style={{fontSize:16.5,color:T.sub,lineHeight:1.8,marginBottom:18}}>
            VOC Infra is an enterprise technology company focused on building intelligent operational systems powered by AI, ML, and advanced data engineering.
          </p>
          <p style={{fontSize:15,color:T.muted,lineHeight:1.8,marginBottom:36}}>
            Our mission: enable organisations to transition from traditional IT operations to autonomous, intelligent, and scalable enterprise systems. We blend cybernetic control systems with AI-powered automation for continuous optimisation through feedback-driven digital ecosystems.
          </p>
        </Reveal>
        <Reveal delay={200}>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"12px 18px"}}>
            {["AI-first enterprise architecture","Cybernetic feedback-driven systems","Automation-led infrastructure management","Data-driven decision platforms","Enterprise-grade scalability"].map(i=>(
              <div key={i} style={{display:"flex",alignItems:"flex-start",gap:9}}>
                <CheckCircle size={14} style={{color:T.accent,flexShrink:0,marginTop:4}}/>
                <span style={{fontSize:13.5,color:T.sub,lineHeight:1.5}}>{i}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>

      <Reveal delay={120}>
        <div style={{display:"flex",flexDirection:"column",gap:20}}>
          {/* real image */}
          <div style={{borderRadius:16,overflow:"hidden",boxShadow:"0 12px 40px rgba(0,100,180,0.1)",border:`1px solid ${T.borderAccent}`,height:220,position:"relative"}}>
            <img
              src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&q=80"
              alt="Enterprise technology team"
              style={{width:"100%",height:"100%",objectFit:"cover",objectPosition:"center"}}
            />
            <div style={{position:"absolute",inset:0,background:"linear-gradient(to bottom,transparent 50%,rgba(10,22,40,0.55))"}}/>
            <div style={{position:"absolute",bottom:16,left:18}}>
              <span style={{fontSize:12,fontWeight:700,color:"#fff",letterSpacing:".08em",textTransform:"uppercase",opacity:0.9}}>AI-Driven Enterprise Technology</span>
            </div>
          </div>

          {/* Why We Are Different */}
          <div style={{background:T.aboutCard,border:`1px solid ${T.borderAccent}`,borderRadius:18,padding:32}}>
            <h3 style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:18,fontWeight:600,color:T.head,marginBottom:24}}>Why We Are Different</h3>
            {[["01","Autonomous","Self-managing systems that adapt without human intervention"],
              ["02","Predictive","AI models that anticipate issues before they occur"],
              ["03","Scalable","Enterprise-grade architecture designed to grow with you"],
              ["04","Data-Driven","Every decision powered by real-time intelligence"],
              ["05","Self-Optimising","Feedback-driven systems that continuously improve"]].map(([n,t,d],i,arr)=>(
              <div key={n} style={{display:"flex",gap:16,alignItems:"flex-start",marginBottom:i<arr.length-1?16:0,paddingBottom:i<arr.length-1?16:0,borderBottom:i<arr.length-1?`1px solid ${T.sectionDivider}`:"none"}}>
                <div style={{width:34,height:34,borderRadius:8,background:T.whyBg,border:`1px solid ${T.whyBorder}`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                  <span style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:11,fontWeight:700,color:T.accent}}>{n}</span>
                </div>
                <div>
                  <div style={{fontFamily:"'Space Grotesk',sans-serif",fontWeight:600,color:T.head,marginBottom:3,fontSize:14}}>{t}</div>
                  <div style={{fontSize:12.5,color:T.muted,lineHeight:1.6}}>{d}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </div>
  </section>

  {/* ════ SOLUTIONS ════ */}
  <section id="solutions" className="dot-bg" style={{padding:"116px 28px"}}>
    <div style={{maxWidth:1280,margin:"0 auto"}}>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:48,alignItems:"center",marginBottom:72}} className="two-col">
        <div>
          <Reveal><SL>Enterprise Solutions</SL></Reveal>
          <Reveal delay={70}>
            <h2 style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:"clamp(28px,3.8vw,50px)",fontWeight:700,color:T.head,letterSpacing:"-.025em"}}>
              Intelligent Systems for<br/><span >Modern Enterprise</span>
            </h2>
            <Div/>
          </Reveal>
          <Reveal delay={130}>
            <p style={{fontSize:15.5,color:T.sub,lineHeight:1.8}}>
              From AI and machine learning to cybernetic enterprise systems, we build the intelligent platforms that power next-generation enterprise operations — all engineered for scale, resilience, and continuous self-optimisation.
            </p>
          </Reveal>
        </div>
        <Reveal delay={100}>
          <div className="hide-mobile" style={{borderRadius:16,overflow:"hidden",height:280,position:"relative",boxShadow:"0 16px 48px rgba(0,100,180,0.12)",border:`1px solid ${T.borderAccent}`}}>
            <img
              src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=900&q=80"
              alt="AI and machine learning systems"
              style={{width:"100%",height:"100%",objectFit:"cover",objectPosition:"center"}}
            />
            <div style={{position:"absolute",inset:0,background:"linear-gradient(to top,rgba(0,50,100,0.5) 0%,transparent 60%)"}}/>
            <div style={{position:"absolute",bottom:16,left:18}}>
              <span style={{fontSize:11.5,fontWeight:700,color:"rgba(255,255,255,0.9)",letterSpacing:".08em",textTransform:"uppercase"}}>AI-First Architecture</span>
            </div>
          </div>
        </Reveal>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(330px,1fr))",gap:20}}>
        {SOLUTIONS.map((s,i)=>(
          <Reveal key={s.title} delay={i*90}>
            <div className="card"
              onMouseEnter={()=>setHovered(i)} onMouseLeave={()=>setHovered(null)}
              style={{background:hovered===i?T.cardHover:T.bg2,border:`1px solid ${hovered===i?s.color+"55":T.border}`,borderRadius:15,padding:34,position:"relative",overflow:"hidden",height:"100%",boxShadow:hovered===i?`0 20px 50px ${s.color}14`:"none",transition:"background .3s,border-color .3s,box-shadow .3s,transform .3s"}}>
              <div style={{position:"absolute",top:0,left:0,right:0,height:2,background:`linear-gradient(90deg,${s.color},transparent)`,opacity:hovered===i?1:0.35,transition:"opacity .3s"}}/>
              <div style={{position:"absolute",top:-50,right:-50,width:180,height:180,borderRadius:"50%",background:`radial-gradient(circle,${s.color}12 0%,transparent 65%)`,pointerEvents:"none",opacity:hovered===i?1:0,transition:"opacity .3s"}}/>
              <div style={{width:50,height:50,borderRadius:11,background:`${s.color}12`,border:`1px solid ${s.color}25`,display:"flex",alignItems:"center",justifyContent:"center",marginBottom:22,transition:"transform .3s",transform:hovered===i?"scale(1.1)":"scale(1)"}}>
                <s.icon size={23} style={{color:s.color}}/>
              </div>
              <h3 style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:17,fontWeight:600,color:T.head,marginBottom:11,lineHeight:1.35}}>{s.title}</h3>
              <p style={{fontSize:13.5,color:T.muted,marginBottom:18,lineHeight:1.7}}>{s.desc}</p>
              <ul style={{listStyle:"none",display:"flex",flexDirection:"column",gap:8}}>
                {s.items.map(it=>(
                  <li key={it} style={{display:"flex",alignItems:"center",gap:9}}>
                    <div style={{width:5,height:5,borderRadius:"50%",background:s.color,flexShrink:0}}/>
                    <span style={{fontSize:13,color:T.sub}}>{it}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>

{/* ════ TECHNOLOGY ════ */}
<section id="technology" style={{padding:"116px 28px",background:T.bg1}}>
  <div style={{maxWidth:1280,margin:"0 auto"}}>
    <div style={{textAlign:"center",marginBottom:68}}>
      <Reveal><SL>Technology Stack</SL></Reveal>
      <Reveal delay={70}>
        <h2 style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:"clamp(28px,3.8vw,50px)",fontWeight:700,color:T.head,letterSpacing:"-.025em"}}>
          Built on <span>Best-in-Class</span> Technology
        </h2>
      </Reveal>
    </div>
    <div className="three-col" style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:18}}>
      {TECH.map((t,i)=>(
        <Reveal key={t.cat} delay={i*75}>
          <div className="card" style={{background:T.bg2,border:`1px solid ${T.border}`,borderRadius:13,padding:26,height:"100%"}}>
            <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:18}}>
              <div style={{width:8,height:8,borderRadius:"50%",background:t.color,boxShadow:`0 0 10px ${t.color}`}}/>
              <span style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:13.5,fontWeight:600,color:T.sub}}>{t.cat}</span>
            </div>
            <div style={{display:"flex",flexWrap:"wrap",gap:8}}>
              {t.items.map(item=>(
                <span key={item} style={{padding:"5px 13px",background:`${t.color}10`,border:`1px solid ${t.color}28`,borderRadius:100,fontSize:12.5,color:t.color,fontWeight:500}}>{item}</span>
              ))}
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  </div>
</section>

{/* ════ INDUSTRIES ════ */}
  <section id="industries" className="dot-bg" style={{padding:"116px 28px"}}>
    <div style={{maxWidth:1280,margin:"0 auto"}}>

      {/* image + header row */}
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:48,alignItems:"center",marginBottom:64}} className="two-col">
        <Reveal>
          <div className="hide-mobile" style={{borderRadius:16,overflow:"hidden",height:280,position:"relative",boxShadow:"0 16px 48px rgba(0,0,0,0.1)",border:`1px solid ${T.border}`}}>
            <img
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=900&q=80"
              alt="Industries served"
              style={{width:"100%",height:"100%",objectFit:"cover",objectPosition:"center"}}
            />
            <div style={{position:"absolute",inset:0,background:"linear-gradient(to top,rgba(0,30,60,0.55) 0%,transparent 55%)"}}/>
            <div style={{position:"absolute",bottom:16,left:18}}>
              <span style={{fontSize:11.5,fontWeight:700,color:"rgba(255,255,255,0.9)",letterSpacing:".08em",textTransform:"uppercase"}}>Global Industries</span>
            </div>
          </div>
        </Reveal>
        <div>
          <Reveal><SL>Industries We Serve</SL></Reveal>
          <Reveal delay={70}>
            <h2 style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:"clamp(28px,3.8vw,50px)",fontWeight:700,color:T.head,letterSpacing:"-.025em"}}>
              Cross-Industry <span>Expertise</span>
            </h2>
            <Div/>
          </Reveal>
          <Reveal delay={130}>
            <p style={{fontSize:15.5,color:T.sub,lineHeight:1.8}}>
              VOC Infra delivers AI-driven transformation across diverse sectors — from financial services to healthcare — bringing deep domain expertise and intelligent technology tailored to each industry's unique challenges.
            </p>
          </Reveal>
        </div>
      </div>
      <div className="three-col" style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:18}}>
        {INDUSTRIES.map((ind,i)=>(
          <Reveal key={ind.name} delay={i*80}>
            <div className="card" style={{background:T.bg2,border:`1px solid ${T.border}`,borderRadius:13,padding:28,display:"flex",gap:18,alignItems:"flex-start",height:"100%"}}>
              <div style={{width:46,height:46,borderRadius:11,background:T.whyBg,border:`1px solid ${T.whyBorder}`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                <ind.icon size={20} style={{color:T.accent}}/>
              </div>
              <div>
                <div style={{fontFamily:"'Space Grotesk',sans-serif",fontWeight:600,color:T.head,marginBottom:7,fontSize:14.5,lineHeight:1.3}}>{ind.name}</div>
                <div style={{fontSize:13,color:T.muted,lineHeight:1.6}}>{ind.desc}</div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>

  {/* ════ CASE STUDIES ════ */}
  <section id="case-studies" style={{padding:"116px 28px",background:T.bg1}}>
    <div style={{maxWidth:1280,margin:"0 auto"}}>
      <div style={{textAlign:"center",marginBottom:52}}>
        <Reveal><SL>Case Studies</SL></Reveal>
        <Reveal delay={70}>
          <h2 style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:"clamp(28px,3.8vw,50px)",fontWeight:700,color:T.head,letterSpacing:"-.025em"}}>
            Proven Results at <span >Enterprise Scale</span>
          </h2>
        </Reveal>
      </div>

      {/* banner image */}
      <Reveal delay={100}>
        <div style={{borderRadius:18,overflow:"hidden",marginBottom:40,height:220,position:"relative",boxShadow:"0 12px 40px rgba(0,0,0,0.1)"}}>
          <img
            src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1400&q=80"
            alt="Enterprise data analytics"
            style={{width:"100%",height:"100%",objectFit:"cover",objectPosition:"center top"}}
          />
          <div style={{position:"absolute",inset:0,background:"linear-gradient(105deg,rgba(0,60,100,0.72) 0%,rgba(10,10,30,0.45) 60%,transparent 100%)"}}/>
          <div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",padding:"0 48px"}}>
            <div>
              <div style={{fontSize:11,fontWeight:700,letterSpacing:".16em",textTransform:"uppercase",color:"rgba(255,255,255,0.6)",marginBottom:10}}>Real-World Impact</div>
              <div style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:"clamp(20px,2.8vw,34px)",fontWeight:700,color:"#fff",lineHeight:1.25,maxWidth:480}}>
                Transforming enterprise operations with AI-first intelligence
              </div>
            </div>
            <div className="hide-mobile" style={{marginLeft:"auto",display:"flex",gap:32}}>
              {[["40%","Downtime ↓"],["100%","Data Unified"],["60%","Ops Speed ↑"]].map(([n,l])=>(
                <div key={l} style={{textAlign:"center"}}>
                  <div style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:36,fontWeight:800,color:T.accent,lineHeight:1}}>{n}</div>
                  <div style={{fontSize:12,color:"rgba(255,255,255,0.7)",marginTop:4}}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Reveal>
      <div className="three-col" style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:22}}>
        {CASES.map((cs,i)=>(
          <Reveal key={cs.title} delay={i*110}>
            <div className="card" style={{background:T.bg2,border:`1px solid ${T.border}`,borderRadius:15,padding:34,position:"relative",overflow:"hidden",height:"100%"}}>
              <div style={{position:"absolute",top:0,left:0,right:0,height:2,background:`linear-gradient(90deg,${cs.color},transparent)`}}/>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:22}}>
                <span style={{padding:"4px 11px",background:`${cs.color}14`,border:`1px solid ${cs.color}28`,borderRadius:100,fontSize:11,fontWeight:700,letterSpacing:".08em",textTransform:"uppercase",color:cs.color}}>{cs.tag}</span>
                <div style={{textAlign:"right"}}>
                  <div style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:30,fontWeight:700,color:cs.color,lineHeight:1}}>{cs.metric}</div>
                  <div style={{fontSize:10.5,color:T.muted,textTransform:"uppercase",letterSpacing:".06em",marginTop:2}}>{cs.metricLabel}</div>
                </div>
              </div>
              <h3 style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:18,fontWeight:700,color:T.head,marginBottom:20,lineHeight:1.3}}>{cs.title}</h3>
              {[["Challenge",cs.challenge],["Solution",cs.solution],["Result",cs.result]].map(([lbl,txt])=>(
                <div key={lbl} style={{marginBottom:14}}>
                  <div style={{fontSize:10.5,fontWeight:700,letterSpacing:".1em",color:cs.color,marginBottom:5}}>{lbl.toUpperCase()}</div>
                  <div style={{fontSize:13.5,color:T.sub,lineHeight:1.65}}>{txt}</div>
                </div>
              ))}
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>

  {/* ════ LEADERSHIP ════ */}


  {/* ════ PARTNERS ════ */}
  <section style={{padding:"64px 28px",background:T.bg1,borderTop:`1px solid ${T.sectionDivider}`}}>
    <div style={{maxWidth:1280,margin:"0 auto",textAlign:"center"}}>
      <Reveal>
        <p style={{fontSize:11,color:T.label,letterSpacing:".12em",textTransform:"uppercase",fontWeight:700,marginBottom:34}}>Ecosystem Partners &amp; Technology Platforms</p>
        <div style={{display:"flex",flexWrap:"wrap",justifyContent:"center",gap:14}}>
          {PARTNERS.map(p=><div key={p} className="partner card">{p}</div>)}
        </div>
      </Reveal>
    </div>
  </section>

  {/* ════ CTA BANNER ════ */}
  <section style={{padding:"0",borderTop:`1px solid ${T.ctaBorder}`,borderBottom:`1px solid ${T.ctaBorder}`,position:"relative",overflow:"hidden",minHeight:320,display:"flex",alignItems:"center"}}>
    {/* background image */}
    <img
      src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1600&q=80"
      alt="Enterprise transformation"
      style={{position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover",objectPosition:"center"}}
    />
    {/* overlay */}
    <div style={{position:"absolute",inset:0,background:"linear-gradient(135deg,rgba(0,40,80,0.88) 0%,rgba(50,10,90,0.75) 100%)"}}/>

    <div style={{position:"relative",maxWidth:780,margin:"0 auto",textAlign:"center",padding:"80px 28px",width:"100%"}}>
      <Reveal>
        <h2 style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:"clamp(26px,3.8vw,48px)",fontWeight:700,color:"#ffffff",letterSpacing:"-.02em",marginBottom:18,lineHeight:1.2}}>
          Ready to Transform Your<br/><span >Enterprise Operations?</span>
        </h2>
        <p style={{fontSize:16,color:"rgba(255,255,255,0.72)",marginBottom:36,lineHeight:1.7,maxWidth:520,margin:"0 auto 36px"}}>
          VOC Infra helps organisations build intelligent digital ecosystems powered by AI, automation, and advanced data engineering.
        </p>
        <button className="btn-p" onClick={()=>scrollTo("contact")} style={{background:"linear-gradient(135deg,#0099c6,#0077a8)"}}>
          Book an Enterprise AI Consultation <ArrowRight size={17}/>
        </button>
      </Reveal>
    </div>
  </section>

  {/* ════ CONTACT ════ */}
  <section id="contact" style={{padding:"116px 28px",background:T.bg0}}>
    <div style={{maxWidth:940,margin:"0 auto"}}>
      <div style={{textAlign:"center",marginBottom:60}}>
        <Reveal><SL>Get In Touch</SL></Reveal>
        <Reveal delay={70}>
          <h2 style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:"clamp(28px,3.8vw,50px)",fontWeight:700,color:T.head,letterSpacing:"-.025em"}}>
            Start Your <span >Transformation</span>
          </h2>
        </Reveal>
      </div>
      <div className="two-col" style={{display:"grid",gridTemplateColumns:"1fr 1.2fr",gap:34}}>
        <Reveal delay={90}>
          <div style={{background:T.contactLeft,border:`1px solid ${T.contactLeftBorder}`,borderRadius:15,padding:34,height:"100%"}}>
            <h3 style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:19,fontWeight:600,color:T.head,marginBottom:26}}>Contact Information</h3>
            {[[Mail,"Email","info@vocinfra.com"],[Phone,"Phone",<a href="tel:+919318619318" style={{color:"inherit",textDecoration:"none"}}>+91-9318 61 9318</a>],[MapPin,"Location","Hyderabad, India"]].map(([Icon,label,val])=>(
              <div key={label} style={{display:"flex",gap:14,alignItems:"flex-start",marginBottom:22}}>
                <div style={{width:38,height:38,borderRadius:9,background:T.whyBg,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                  <Icon size={17} style={{color:T.accent}}/>
                </div>
                <div>
                  <div style={{fontSize:10.5,color:T.label,textTransform:"uppercase",letterSpacing:".09em",marginBottom:3,fontWeight:700}}>{label}</div>
                  <div style={{color:T.sub,fontSize:14.5}}>{val}</div>
                </div>
              </div>
            ))}
            <div style={{marginTop:26,paddingTop:22,borderTop:`1px solid ${T.sectionDivider}`}}>
              <p style={{fontSize:13,color:T.label,lineHeight:1.7}}>Enterprise AI · Intelligent Infrastructure · Cognitive Systems</p>
              <p style={{fontSize:13,color:T.label,marginTop:8,lineHeight:1.7}}>Partner with us to build the next generation of autonomous enterprise operations.</p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={160}>
          <div style={{background:T.bg2,border:`1px solid ${T.border}`,borderRadius:15,padding:34}}>
            <div style={{display:"flex",flexDirection:"column",gap:17}}>
              {[["Name","text","Your full name"],["Email","email","your@company.com"],["Company","text","Your company name"]].map(([lbl,type,ph])=>(
                <div key={lbl}>
                  <label style={{display:"block",fontSize:11,fontWeight:700,color:T.muted,textTransform:"uppercase",letterSpacing:".09em",marginBottom:7}}>{lbl}</label>
                  <input type={type} placeholder={ph} className="inp"/>
                </div>
              ))}
              <div>
                <label style={{display:"block",fontSize:11,fontWeight:700,color:T.muted,textTransform:"uppercase",letterSpacing:".09em",marginBottom:7}}>Message</label>
                <textarea rows={4} placeholder="Tell us about your enterprise transformation goals…" className="inp" style={{resize:"none"}}/>
              </div>
              <button className="btn-p" style={{width:"100%",justifyContent:"center"}}>
                Send Message <ArrowRight size={16}/>
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  </section>

{/* ════ FOOTER ════ */}
<style>{`
  .foot-g {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 1fr;
    gap: 44px;
    margin-bottom: 44px;
  }
  @media (max-width: 768px) {
    .foot-g {
      grid-template-columns: 1fr 1fr !important;
      gap: 32px !important;
    }
    .foot-g > div:first-child {
      grid-column: 1 / -1;
    }
  }
`}</style>

<footer style={{background:T.foot,borderTop:"1px solid rgba(255,255,255,0.06)",padding:"56px 28px 28px"}}>
  <div style={{maxWidth:1280,margin:"0 auto"}}>
    <div className="foot-g">
      <div>
        <div style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:21,fontWeight:700,letterSpacing:"-.02em"}}>
          <img src="/voc_logo.png" alt="VOC Infra Logo" style={{width:200,height:27,verticalAlign:"middle",filter:"brightness(0) invert(1)", marginBottom: 10 }}/>
        </div>
        <p style={{fontSize:13.5,color:"#64748b",lineHeight:1.75,maxWidth:260}}>Enterprise AI, Intelligent Infrastructure, and Cognitive Systems for the modern enterprise.</p>
      </div>
      {[
        ["Solutions",["AI & ML Systems","Data Engineering","Cognitive Platforms","Infrastructure Automation","Cybernetic Systems"]],
        ["Company",["About VOC Infra","Leadership","Industries","Case Studies","Partners"]],
        ["Resources",["Technology Stack","Book Consultation"]],
      ].map(([h,links])=>(
        <div key={h}>
          <h4 style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:11.5,fontWeight:700,color:"#475569",textTransform:"uppercase",letterSpacing:".1em",marginBottom:18}}>{h}</h4>
          <ul style={{listStyle:"none",display:"flex",flexDirection:"column",gap:10}}>
            {links.map(l=>(
              <li key={l}><span style={{fontSize:13.5,color:"#64748b"}}>{l}</span></li>
            ))}
          </ul>
        </div>
      ))}
    </div>
    <div style={{borderTop:"1px solid rgba(255,255,255,0.06)",paddingTop:24,display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:10}}>
      <p style={{fontSize:12.5,color:"#637691"}}>© 2026 VOC Infra — Vectorized Operations & Cybernetics. All rights reserved.</p>
      <p style={{fontSize:12.5,color:"#637691"}}>Hyderabad, India · <a href="mailto:info@vocinfra.com" style={{color:"inherit",textDecoration:"none"}}>info@vocinfra.com</a></p>
    </div>
  </div>
</footer>

  </div>
  );
}

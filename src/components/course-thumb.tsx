import { useId, type ReactNode } from "react";
import { DiagramPreview } from "@/components/diagram-preview";

type IconName = "layers" | "chat" | "code" | "table" | "model" | "search" | "document" | "check" | "shield" | "tools" | "browser" | "graph" | "memory" | "trace" | "folder" | "workflow";
type Artwork = {
  label: string;
  caption: string;
  color: string;
  icons: [IconName, IconName];
  description: string;
};

const ARTWORK: Record<string, Artwork> = {
  "ai-foundations": { label: "The AI landscape", caption: "Understand how the ideas fit together", color: "#6ee7b7", icons: ["layers", "model"], description: "Nested fields: artificial intelligence contains machine learning, deep learning, and generative AI." },
  "working-with-llms": { label: "A better conversation", caption: "Give context. Check the response. Refine.", color: "#6ee7b7", icons: ["chat", "check"], description: "A prompt supplies a task, context, and format. The response is checked and refined." },
  "python-and-data-essentials": { label: "From data to insight", caption: "Load, transform, and explore", color: "#7dd3fc", icons: ["code", "table"], description: "JSON data passes through a Python script to become a table and chart." },
  "machine-learning-basics": { label: "The learning workflow", caption: "Train on one split. Evaluate on another.", color: "#7dd3fc", icons: ["model", "check"], description: "Data is split into training and test sets. Training produces a model, which is evaluated on the test set." },
  "build-with-llm-apis": { label: "Your first AI integration", caption: "Request, structure, validate", color: "#7dd3fc", icons: ["code", "model"], description: "An application sends a request to a language model, receives JSON, and validates its schema." },
  "chat-with-your-documents": { label: "Answers with evidence", caption: "Retrieve the source. Cite the answer.", color: "#7dd3fc", icons: ["document", "search"], description: "Documents are searched for relevant passages, which ground an answer with citations." },
  "evaluate-and-use-ai-responsibly": { label: "Evidence before release", caption: "Test quality, privacy, and safety", color: "#fcd34d", icons: ["shield", "check"], description: "Quality, privacy, and safety checks inform a human review and a ship or hold decision." },
  "agents-fundamentals": { label: "Inside the agent loop", caption: "Choose a tool. Observe. Repeat or finish.", color: "#c4b5fd", icons: ["model", "tools"], description: "A model chooses a tool, receives its result, and uses that observation to choose the next step or finish." },
  "browser-automation": { label: "An agent on the web", caption: "Observe the page. Act. Verify the result.", color: "#c4b5fd", icons: ["browser", "tools"], description: "A browser agent observes a page, interacts with a control, and verifies the resulting page state." },
  graphrag: { label: "Retrieve the relationships", caption: "Follow connections across your sources", color: "#7dd3fc", icons: ["graph", "search"], description: "A knowledge graph connects a team, project, service, and owner, allowing a retrieval path across related entities." },
  "agent-memory": { label: "Context that carries forward", caption: "Store what matters. Retrieve what helps.", color: "#c4b5fd", icons: ["memory", "chat"], description: "Working context can store selected facts in persistent memory and retrieve relevant facts for later tasks." },
  "production-agents": { label: "See the whole run", caption: "Trace, evaluate, and monitor", color: "#fcd34d", icons: ["trace", "shield"], description: "A request is traced through an agent and tool. Tests, traces, and monitoring support production reliability." },
  "repo-context": { label: "Give the agent a map", caption: "Instructions, relevant code, fast feedback", color: "#c4b5fd", icons: ["folder", "code"], description: "Repository instructions, source files, and tests give a coding agent context. Checks provide feedback on its changes." },
  "synthetic-data": { label: "A data generation pipeline", caption: "Generate, filter, train, and test", color: "#7dd3fc", icons: ["table", "model"], description: "Examples seed generated data. A quality filter precedes training, and a separate held-out set is used for testing." },
  "meta-harness": { label: "Improve the system around AI", caption: "Change the harness. Measure the result.", color: "#c4b5fd", icons: ["workflow", "tools"], description: "A harness connects a model, tools, and memory. Evaluation informs the next change to the harness." },
  "financial-workflows": { label: "A controlled workflow", caption: "Extract, validate, approve, and audit", color: "#fcd34d", icons: ["workflow", "shield"], description: "An AI extraction step feeds deterministic validation and human approval, with an audit record for each step." },
  "ai-code-analysis": { label: "From generated code to review", caption: "Test the change before it ships", color: "#fcd34d", icons: ["code", "shield"], description: "A generated code change passes through tests, security scanning, and review before a merge decision." },
  "ai-solution-designer": { label: "Your solution blueprint", caption: "Connect the problem, architecture, and pilot", color: "#6ee7b7", icons: ["workflow", "check"], description: "An AI solution design connects users, an application, a model, and data, while accounting for cost, risk, and the pilot." },
};

// Shared geometry keeps the set cohesive. Labels remain SVG text, and the
// compact variant omits labels that would be unreadable at thumbnail size.
function Icon({ name, x, y, scale = 1, color = "currentColor" }: { name: IconName; x: number; y: number; scale?: number; color?: string }) {
  let shape: ReactNode;
  switch (name) {
    case "layers": shape = <><path d="m2 9 14-7 14 7-14 7Z" /><path d="m2 16 14 7 14-7M2 23l14 7 14-7" /></>; break;
    case "chat": shape = <><path d="M4 3h24v19H14l-8 7v-7H4Z" /><path d="M10 10h12M10 16h8" /></>; break;
    case "code": shape = <><path d="m9 7-7 9 7 9m14-18 7 9-7 9M19 3l-6 26" /></>; break;
    case "table": shape = <><rect x="2" y="3" width="28" height="26" rx="3" /><path d="M2 12h28M12 12v17M2 20h28" /></>; break;
    case "model": shape = <><rect x="7" y="7" width="18" height="18" rx="4" /><rect x="12" y="12" width="8" height="8" rx="1" /><path d="M12 2v5m8-5v5M12 25v5m8-5v5M2 12h5m-5 8h5m18-8h5m-5 8h5" /></>; break;
    case "search": shape = <><circle cx="13" cy="13" r="10" /><path d="m21 21 9 9M8 13h10m-5-5v10" /></>; break;
    case "document": shape = <><path d="M7 2h13l7 7v21H7ZM20 2v8h7M12 16h10m-10 6h7" /></>; break;
    case "check": shape = <><circle cx="16" cy="16" r="13" /><path d="m9 16 5 5 10-11" /></>; break;
    case "shield": shape = <><path d="m16 2 12 5v10c0 6-6 11-12 14C10 28 4 23 4 17V7Z" /><path d="m10 16 4 4 8-9" /></>; break;
    case "tools": shape = <><path d="m20 3-5 5 2 7 7 2 5-5c2 8-5 13-12 10L7 31l-6-6 10-10C8 7 13 1 20 3Z" /></>; break;
    case "browser": shape = <><rect x="1" y="3" width="30" height="26" rx="4" /><path d="M1 11h30M6 7h1m4 0h1m4 0h1M12 16l10 5-5 1-2 5Z" /></>; break;
    case "graph": shape = <><path d="m7 7 18 3-9 15ZM7 7l9 18" /><circle cx="7" cy="7" r="4" /><circle cx="25" cy="10" r="4" /><circle cx="16" cy="25" r="4" /></>; break;
    case "memory": shape = <><ellipse cx="16" cy="6" rx="12" ry="4" /><path d="M4 6v20c0 5 24 5 24 0V6M4 16c0 5 24 5 24 0" /></>; break;
    case "trace": shape = <><path d="M2 4v26h28M6 21h5l4-11 6 14 5-9h4" /></>; break;
    case "folder": shape = <><path d="M2 8V4h11l4 5h13v20H2ZM2 13h28" /></>; break;
    case "workflow": shape = <><rect x="11" y="1" width="10" height="9" rx="2" /><rect x="1" y="22" width="10" height="9" rx="2" /><rect x="21" y="22" width="10" height="9" rx="2" /><path d="M16 10v6H6v6m10-6h10v6" /></>; break;
  }
  return <g transform={`translate(${x} ${y}) scale(${scale})`} fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{shape}</g>;
}

function Text({ x, y, children, size = 14, color = "#dce7ee", center = false, weight = 500 }: { x: number; y: number; children: ReactNode; size?: number; color?: string; center?: boolean; weight?: number }) {
  return <text x={x} y={y} fontSize={size} fontWeight={weight} fill={color} textAnchor={center ? "middle" : "start"}>{children}</text>;
}

function Panel({ x, y, w, h, color = "#334350", tint = false }: { x: number; y: number; w: number; h: number; color?: string; tint?: boolean }) {
  return <rect x={x} y={y} width={w} height={h} rx="10" fill={tint ? color : "#141e29"} fillOpacity={tint ? 0.1 : 1} stroke={color} strokeOpacity={tint ? 0.65 : 1} />;
}

function Node({ x, y, label, icon, color, w = 96 }: { x: number; y: number; label: string; icon: IconName; color: string; w?: number }) {
  return <><Panel x={x} y={y} w={w} h={84} color={color} tint /><Icon name={icon} x={x + w / 2 - 14} y={y + 12} scale={0.875} color={color} /><Text x={x + w / 2} y={y + 65} center size={13}>{label}</Text></>;
}

function Arrow({ d, color, id, dashed = false }: { d: string; color: string; id: string; dashed?: boolean }) {
  return <path d={d} fill="none" stroke={color} strokeWidth="1.7" strokeDasharray={dashed ? "4 5" : undefined} strokeLinejoin="round" markerEnd={`url(#${id})`} />;
}

function Lines({ x, y, color = "#526778", widths = [62, 48, 56] }: { x: number; y: number; color?: string; widths?: number[] }) {
  return <>{widths.map((width, index) => <rect key={index} x={x} y={y + index * 12} width={width} height="4" rx="2" fill={color} />)}</>;
}

function Scene({ slug, color: c, arrow: a }: { slug: string; color: string; arrow: string }) {
  const arrow = (d: string, dashed = false) => <Arrow d={d} color={c} id={a} dashed={dashed} />;
  switch (slug) {
    case "ai-foundations":
      return <>{[
        { x: 28, y: 55, w: 344, h: 165, label: "Artificial intelligence", opacity: 0.025 },
        { x: 56, y: 96, w: 294, h: 124, label: "Machine learning", opacity: 0.045 },
        { x: 84, y: 137, w: 244, h: 83, label: "Deep learning", opacity: 0.065 },
        { x: 112, y: 178, w: 194, h: 42, label: "Generative AI", opacity: 0.12 },
      ].map((box) => <g key={box.label}><rect x={box.x} y={box.y} width={box.w} height={box.h} rx="9" fill={c} fillOpacity={box.opacity} stroke={c} strokeOpacity="0.5" /><Text x={box.x + 14} y={box.y + 26} size={14}>{box.label}</Text></g>)}</>;
    case "working-with-llms":
      return <><Panel x={28} y={62} w={144} h={142} /><Text x={44} y={87} color={c}>Your prompt</Text>{["Task", "Context", "Format"].map((label, i) => <g key={label}><rect x="44" y={102 + i * 28} width="5" height="5" rx="1" fill={c} /><Text x={58} y={109 + i * 28} size={14}>{label}</Text></g>)}{arrow("M174 130H219")}<Panel x={228} y={62} w={144} h={142} color={c} tint /><Icon name="chat" x={244} y={78} scale={0.8} color={c} /><Text x={283} y={97} size={13}>Response</Text><Lines x={244} y={120} widths={[105, 84]} /><Icon name="check" x={244} y={161} scale={0.65} color={c} /><Text x={274} y={178} size={13}>Check & refine</Text></>;
    case "python-and-data-essentials":
      return <><Node x={24} y={86} icon="document" label="JSON data" color={c} /><Node x={152} y={86} icon="code" label="Python" color={c} /><Node x={280} y={86} icon="table" label="Analysis" color={c} />{arrow("M122 128H144")}{arrow("M250 128H272")}<Text x={200} y={205} center size={13} color="#a7bac9">Files + APIs → scripts → useful results</Text></>;
    case "machine-learning-basics":
      return <><Panel x={148} y={54} w={104} h={38} /><Text x={200} y={79} center>Dataset</Text>{arrow("M174 94V112H89V127")}{arrow("M226 94V112H309V127", true)}<Panel x={28} y={135} w={118} h={37} color={c} tint /><Text x={87} y={159} center>Training set</Text><Panel x={254} y={135} w={118} h={37} /><Text x={313} y={159} center>Test set</Text>{arrow("M87 174V192H166")}{arrow("M313 174V208H257", true)}<Panel x={174} y={178} w={75} h={43} color={c} tint /><Text x={211} y={204} center size={13}>Model</Text><Text x={114} y={211} size={11} color="#a7bac9">Train</Text><Text x={284} y={197} size={11} color="#a7bac9">Evaluate</Text></>;
    case "build-with-llm-apis":
      return <><Node x={24} y={68} icon="code" label="Your app" color={c} /><Node x={152} y={68} icon="model" label="LLM API" color={c} /><Node x={280} y={68} icon="document" label="JSON" color={c} />{arrow("M122 110H144")}{arrow("M250 110H272")}<Panel x={110} y={177} w={180} h={39} /><Icon name="check" x={127} y={186} scale={0.65} color={c} /><Text x={158} y={202} size={13}>Validate the schema</Text>{arrow("M329 154V196H299", true)}</>;
    case "chat-with-your-documents":
      return <><Node x={24} y={69} icon="document" label="Sources" color={c} /><Node x={152} y={69} icon="search" label="Retrieval" color={c} /><Node x={280} y={69} icon="chat" label="Answer" color={c} />{arrow("M122 110H144")}{arrow("M250 110H272")}<Panel x={46} y={177} w={308} h={40} /><Lines x={62} y={191} widths={[154, 126]} /><Text x={248} y={202} color={c}>[1]</Text><Text x={294} y={202} color={c}>[2]</Text></>;
    case "evaluate-and-use-ai-responsibly":
      return <>{["Quality", "Privacy", "Safety"].map((label, i) => <g key={label}><Panel x={28} y={59 + i * 53} w={144} h={41} /><Icon name={i === 0 ? "trace" : "shield"} x={41} y={70 + i * 53} scale={0.6} color={c} /><Text x={72} y={85 + i * 53}>{label}</Text></g>)}{arrow("M180 81H201V133H224")}{arrow("M180 186H201V133")}{arrow("M180 133H224")}<Panel x={232} y={65} w={140} h={142} color={c} tint /><Icon name="check" x={286} y={82} color={c} /><Text x={302} y={141} center>Human review</Text><Text x={302} y={178} center size={13} color={c}>Ship / Hold</Text></>;
    case "agents-fundamentals":
      return <><Node x={38} y={65} icon="model" label="Model" color={c} w={120} /><Node x={242} y={65} icon="tools" label="Tool" color={c} w={120} />{arrow("M160 104H233")}<Text x={199} y={85} center size={11} color="#a7bac9">Action</Text><Panel x={151} y={178} w={98} h={38} /><Text x={200} y={203} center>Result</Text>{arrow("M302 151V197H257")}{arrow("M149 197H98V157")}<Text x={35} y={183} size={11} color="#a7bac9">Observe</Text></>;
    case "browser-automation":
      return <><Panel x={45} y={55} w={310} h={136} /><path d="M45 82H355" stroke="#334350" />{[61, 73, 85].map((x) => <circle key={x} cx={x} cy="69" r="2.5" fill={c} />)}<rect x="111" y="63" width="222" height="12" rx="4" fill="#233442" /><Lines x={65} y={99} widths={[118, 99, 110]} /><rect x="65" y="150" width="110" height="24" rx="5" fill={c} fillOpacity="0.12" stroke={c} /><Text x={120} y={166} center size={11} color={c}>Open result</Text><Panel x={224} y={99} w={107} h={75} /><path d="m151 160 24 12-13 3-4 13Z" fill="#e8f3f9" stroke="#101822" strokeWidth="2" /><Text x={200} y={218} center size={13}>Observe → Act → Verify</Text></>;
    case "graphrag":
      return <><path d="M153 88H245M293 108V162M245 182H153M105 162V108" fill="none" stroke="#3a4b5c" strokeWidth="1.5" /><path d="M142 107 200 135 256 163M256 107 200 135 142 163" fill="none" stroke={c} strokeWidth="2" />{[{x:105,y:88,l:"Team"},{x:293,y:88,l:"Owner"},{x:105,y:182,l:"Project"},{x:293,y:182,l:"Service"}].map((n) => <g key={n.l}><Panel x={n.x-48} y={n.y-20} w={96} h={40} color={c} tint /><Text x={n.x} y={n.y+5} center>{n.l}</Text></g>)}<circle cx="200" cy="135" r="8" fill={c} /><Text x={200} y={75} center size={10} color="#a7bac9">leads</Text><Text x={200} y={217} center size={10} color="#a7bac9">depends on</Text></>;
    case "agent-memory":
      return <><Panel x={65} y={58} w={270} h={56} /><Icon name="chat" x={83} y={70} scale={0.9} color={c} /><Text x={131} y={91}>Working context</Text>{arrow("M132 116V157")}{arrow("M268 163V122")}<Text x={97} y={144} center size={11} color="#a7bac9">Store</Text><Text x={309} y={144} center size={11} color="#a7bac9">Retrieve</Text><Panel x={65} y={164} w={270} h={56} color={c} tint /><Icon name="memory" x={83} y={176} scale={0.9} color={c} /><Text x={131} y={197}>Persistent memory</Text></>;
    case "production-agents":
      return <><Panel x={25} y={58} w={350} h={86} /><Text x={42} y={81} size={11} color="#a7bac9">RUN TRACE</Text>{["Request", "Agent", "Tool"].map((label,i) => <g key={label}><circle cx={60+i*132} cy="104" r="6" fill={c} /><Text x={60+i*132} y={128} center size={12}>{label}</Text></g>)}{arrow("M69 104H175")}{arrow("M201 104H307")}{[{l:"Trace",i:"trace"},{l:"Test",i:"check"},{l:"Monitor",i:"shield"}].map((item,i) => <g key={item.l}><Panel x={25+i*121} y={165} w={108} h={52} color={c} tint /><Icon name={item.i as IconName} x={38+i*121} y={180} scale={0.65} color={c} /><Text x={66+i*121} y={197} size={12}>{item.l}</Text></g>)}</>;
    case "repo-context":
      return <><Panel x={25} y={58} w={158} h={159} /><Icon name="folder" x={40} y={71} scale={0.7} color={c} /><Text x={73} y={87} size={13}>Repository</Text>{["AGENTS.md", "src/", "tests/"].map((label,i)=><g key={label}><path d={`M47 ${111+i*31}v12h10`} stroke="#526778" fill="none" /><Text x={66} y={123+i*31} size={13}>{label}</Text></g>)}{arrow("M187 114H225")}<Node x={235} y={65} icon="code" label="Coding agent" color={c} w={140} /><Text x={305} y={192} center size={13}>Run checks</Text>{arrow("M305 153V165")}{arrow("M248 189H192", true)}</>;
    case "synthetic-data":
      return <><Node x={24} y={54} icon="table" label="Examples" color={c} /><Node x={152} y={54} icon="model" label="Generate" color={c} /><Node x={280} y={54} icon="check" label="Filter" color={c} />{arrow("M122 95H144")}{arrow("M250 95H272")}{arrow("M329 140V158H174V174")}<Panel x={132} y={181} w={80} h={34} color={c} tint /><Text x={172} y={203} center size={12}>Train</Text><Panel x={280} y={181} w={96} h={34} color={c} tint /><Text x={328} y={203} center size={12}>Test</Text>{arrow("M214 198H272")}<Text x={245} y={186} center size={10} color="#a7bac9">Model</Text><Text x={25} y={200} size={11}>Held-out set</Text>{arrow("M91 204V226H328V217", true)}</>;
    case "meta-harness":
      return <><Panel x={40} y={56} w={320} h={131} color={c} tint /><Text x={58} y={81} size={13} color={c}>Harness</Text>{[{i:"model",l:"Model"},{i:"tools",l:"Tools"},{i:"memory",l:"Memory"}].map((item,i)=><g key={item.l}><Icon name={item.i as IconName} x={78+i*105} y={101} color={c} /><Text x={94+i*105} y={160} center size={13}>{item.l}</Text></g>)}<Text x={200} y={217} center size={13}>Evaluate → Improve</Text>{arrow("M362 122H380V213H290")}{arrow("M108 213H20V122H33")}</>;
    case "financial-workflows":
      return <><Node x={24} y={61} icon="document" label="Extract" color={c} /><Node x={152} y={61} icon="shield" label="Validate" color={c} /><Node x={280} y={61} icon="check" label="Approve" color={c} />{arrow("M122 102H144")}{arrow("M250 102H272")}<Panel x={42} y={175} w={316} h={42} /><Icon name="trace" x={59} y={186} scale={0.65} color={c} /><Text x={93} y={202}>Audit trail at every step</Text>{[72,200,328].map(x=><path key={x} d={`M${x} 148V173`} stroke="#526778" strokeDasharray="3 4" />)}</>;
    case "ai-code-analysis":
      return <><Panel x={27} y={61} w={142} h={150} /><Text x={43} y={86} color={c}>Code change</Text><rect x="39" y="102" width="118" height="22" rx="3" fill="#6ee7b7" fillOpacity="0.1" /><Text x={44} y={118} color="#6ee7b7" size={12}>+</Text><Lines x={61} y={111} widths={[78]} color="#6ee7b7" /><Lines x={43} y={138} widths={[94,72,84,60]} />{arrow("M173 133H218")}<Panel x={227} y={61} w={146} h={150} color={c} tint />{["Tests", "Security scan", "Review"].map((label,i)=><g key={label}><Icon name="check" x={242} y={81+i*40} scale={0.6} color={c} /><Text x={272} y={97+i*40} size={12}>{label}</Text></g>)}</>;
    case "ai-solution-designer":
      return <><Panel x={25} y={56} w={350} h={160} /><Text x={43} y={79} size={11} color="#a7bac9">SOLUTION ARCHITECTURE</Text><Panel x={43} y={96} w={74} h={42} /><Text x={80} y={122} center size={13}>Users</Text><Panel x={157} y={96} w={86} h={42} color={c} tint /><Text x={200} y={122} center size={13}>App</Text><Panel x={283} y={96} w={74} h={42} /><Text x={320} y={122} center size={13}>Model</Text>{arrow("M119 117H149")}{arrow("M245 117H275")}<Panel x={157} y={168} w={86} h={32} /><Text x={200} y={189} center size={12}>Data</Text>{arrow("M200 166V146")}<Text x={44} y={189} size={11} color={c}>Cost + risk</Text><Text x={298} y={189} size={11} color={c}>Pilot plan</Text></>;
    default:
      return <Node x={152} y={85} icon="model" label="Explore AI" color={c} />;
  }
}

export function CourseThumb({ slug, className = "", variant = "diagram" }: { slug: string; className?: string; variant?: "diagram" | "thumbnail" }) {
  const uid = useId().replace(/:/g, "");
  const art = ARTWORK[slug] ?? ARTWORK["ai-foundations"];
  const compact = variant === "thumbnail";
  const arrowId = `art-${uid}-arrow`;
  return (
    <svg viewBox="0 0 400 260" role={compact ? "presentation" : "img"} aria-hidden={compact ? true : undefined} aria-labelledby={compact ? undefined : `art-${uid}-title`} aria-describedby={compact ? undefined : `art-${uid}-desc`} focusable="false" className={className} preserveAspectRatio="xMidYMid meet" style={{ fontFamily: "var(--font-geist-sans), system-ui, sans-serif", background: "#101822" }}>
      {!compact && <><title id={`art-${uid}-title`}>{art.label}</title><desc id={`art-${uid}-desc`}>{art.description}</desc></>}
      <defs>
        <pattern id={`art-${uid}-grid`} width="20" height="20" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r="0.65" fill="#557080" fillOpacity="0.2" /></pattern>
        <radialGradient id={`art-${uid}-light`} cx="0.9" cy="0" r="0.9"><stop offset="0" stopColor={art.color} stopOpacity="0.09" /><stop offset="1" stopColor={art.color} stopOpacity="0" /></radialGradient>
        <marker id={arrowId} viewBox="0 0 8 8" refX="7" refY="4" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="m1 1 5 3-5 3" fill="none" stroke={art.color} strokeWidth="1.4" /></marker>
      </defs>
      <rect width="400" height="260" fill="#101822" /><rect width="400" height="260" fill={`url(#art-${uid}-grid)`} /><rect width="400" height="260" fill={`url(#art-${uid}-light)`} />
      {compact ? <>
        <path d="M26 130H86M278 130H374" stroke={art.color} strokeOpacity="0.45" strokeWidth="3" strokeDasharray="6 7" />
        <rect x="88" y="48" width="200" height="164" rx="24" fill={art.color} fillOpacity="0.06" stroke={art.color} strokeWidth="2" strokeOpacity="0.5" />
        <path d="M116 48h48" stroke={art.color} strokeWidth="5" strokeLinecap="round" />
        <Icon name={art.icons[0]} x={140} y={80} scale={3} color={art.color} />
        <rect x="249" y="154" width="82" height="76" rx="18" fill="#172530" stroke={art.color} strokeWidth="2" />
        <Icon name={art.icons[1]} x={265} y={169} scale={1.5} color={art.color} />
        <circle cx="28" cy="130" r="5" fill={art.color} /><circle cx="373" cy="130" r="5" fill={art.color} />
      </> : <>
        <Text x={24} y={29} size={12} color={art.color} weight={600}>{art.label}</Text>
        <path d="M24 41H376" stroke="#293b48" />
        <Scene slug={slug} color={art.color} arrow={arrowId} />
        <Text x={200} y={246} size={11} color="#a7bac9" center>{art.caption}</Text>
      </>}
    </svg>
  );
}


export function CourseArtwork({ slug, className = "" }: { slug: string; className?: string }) {
  const art = ARTWORK[slug] ?? ARTWORK["ai-foundations"];
  return (
    <DiagramPreview
      className={className}
      title={art.label}
      description={art.description}
      preview={<CourseThumb slug={slug} className="aspect-[400/260] w-full rounded-xl border border-line" />}
      detail={<CourseThumb slug={slug} className="aspect-[400/260] w-full rounded-xl border border-line" />}
    />
  );
}

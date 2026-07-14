import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Reveal from "../components/Reveal";
import PreviewImage from "../components/PreviewImage";
import { projectBySlug } from "../data";

const BACK_LINK =
  "inline-flex items-center gap-2 text-muted font-mono text-[13px] font-medium transition-colors duration-200 hover:text-accent";

const SECTIONS = [
  { id: "overview", label: "Overview" },
  { id: "features", label: "Features" },
  { id: "architecture", label: "Architecture" },
  { id: "stack", label: "Tech Stack" },
  { id: "security", label: "Security" },
  { id: "limitations", label: "Limitations" },
];

function StatusBadge({ status }) {
  const isLive = status === "LIVE";
  const tone = isLive
    ? "text-whatsapp border-[rgba(37,211,102,0.3)] bg-[rgba(37,211,102,0.06)]"
    : "text-[#f59e0b] border-[rgba(245,158,11,0.3)] bg-[rgba(245,158,11,0.06)]";
  return (
    <span
      className={`font-mono text-[11px] font-medium border rounded-full py-1 px-3 whitespace-nowrap ${tone}`}
    >
      ● {status.toUpperCase()}
    </span>
  );
}

function SectionHeading({ index, children }) {
  return (
    <div className="flex items-baseline gap-4">
      <span className="text-accent font-mono text-[15px] font-bold">{index}</span>
      <h2 className="font-display text-[30px] font-extrabold tracking-[-1px] mobile:text-[24px]">
        {children}
      </h2>
    </div>
  );
}

/* Highlights whichever section is currently nearest the top of the viewport. */
function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0]);

  useEffect(() => {
    function onScroll() {
      let current = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 140) current = id;
      }
      setActive(current);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [ids]);

  return active;
}

function HeroPreview({ project }) {
  return (
    <div
      className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden border border-border shadow-[0_40px_80px_-32px_rgba(0,0,0,0.7)]"
      style={{ background: project.color }}
    >
      {/* Base layer: visible while the preview loads, and if every source fails. */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
        <span className="font-mono text-[15px] font-bold text-[rgba(0,0,0,0.55)]">
          {project.num}
        </span>
        <span className="font-display text-[34px] font-extrabold text-[#14121f] tracking-[-0.5px]">
          {project.name}
        </span>
      </div>

      <PreviewImage
        sources={project.previewSources}
        alt={`${project.name} preview`}
        className="absolute inset-0 z-[1] w-full h-full object-cover object-top transition-opacity duration-500 ease-out"
      />
    </div>
  );
}

export function NotFound({
  title = "Page not found",
  message = "That page doesn't exist — check the URL, or head back to the portfolio.",
}) {
  return (
    <div className="bg-bg min-h-screen flex flex-col items-center justify-center gap-6 px-12 mobile:px-6">
      <div className="font-display text-[44px] font-extrabold tracking-[-1.5px] text-center">
        {title}<span className="text-accent">.</span>
      </div>
      <p className="text-muted font-sans text-[16px] text-center max-w-[520px]">
        {message}
      </p>
      <Link to="/" className={BACK_LINK}>
        ← Back to portfolio
      </Link>
    </div>
  );
}

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = projectBySlug(slug);

  const sectionIds = useMemo(() => SECTIONS.map((s) => s.id), []);
  const active = useActiveSection(sectionIds);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!project)
    return (
      <NotFound
        title="Project not found"
        message="That project doesn't exist — it may have been renamed or removed."
      />
    );

  const d = project.details;
  const heroTagline = d.tagline || project.tagline;

  return (
    <div className="bg-bg min-h-screen relative">
      {/* overflow-hidden lives on this wrapper, not the page root — clipping the
          root would break position:sticky on the section nav below. */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(239,127,63,0.10),transparent_70%)] top-[-180px] right-[-160px] animate-[drift_11s_ease-in-out_infinite]" />
      </div>

      <div className="relative max-w-[1000px] mx-auto pt-[60px] px-12 pb-[120px] mobile:px-6 mobile:pt-10 mobile:pb-20">
        <Link to="/" className={BACK_LINK}>
          ← Back to portfolio
        </Link>

        {/* ─────────────── hero ─────────────── */}
        <Reveal>
          <div className="flex items-center gap-4 mt-14 flex-wrap">
            <span className="text-accent font-mono text-[15px] font-bold">
              {project.num}
            </span>
            <StatusBadge status={project.status} />
          </div>

          <h1 className="font-display text-[clamp(44px,7vw,76px)] font-extrabold leading-[1.02] tracking-[-2px] mt-6">
            {project.name}
            <span className="text-accent">.</span>
          </h1>

          <p className="text-muted font-sans text-[19px] leading-[1.6] mt-5 max-w-[720px] mobile:text-[17px]">
            {heroTagline}
          </p>

          <div className="flex gap-3 mt-8 flex-wrap">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-accent text-bg font-sans text-[14px] font-semibold py-[11px] px-5 rounded-full inline-block transition-transform duration-200 hover:-translate-y-[3px] hover:text-bg"
              >
                Visit live ↗
              </a>
            )}
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-border-2 text-fg font-sans text-[14px] font-semibold py-[11px] px-5 rounded-full inline-flex items-center gap-[10px] transition-[border-color,transform] duration-200 hover:border-accent hover:-translate-y-[3px] hover:text-fg"
            >
              GitHub →
            </a>
          </div>

          <div className="mt-12">
            <HeroPreview project={project} />
          </div>
        </Reveal>

        {/* ─────────────── stats row ─────────────── */}
        <Reveal delay={0.05}>
          <div className="flex gap-5 mt-12 flex-wrap">
            {d.stats.map((s) => (
              <div
                key={s.label}
                className="flex-[1_1_140px] bg-bg-alt border border-border rounded-[14px] py-[22px] px-5 [transition:transform_0.3s_cubic-bezier(0.2,0.7,0.2,1),border-color_0.3s,box-shadow_0.3s] hover:-translate-y-[5px] hover:border-border-3 hover:shadow-[0_20px_40px_-24px_rgba(239,127,63,0.25)]"
              >
                <span className="font-display text-[40px] font-extrabold text-accent block tabular-nums leading-none">
                  {s.value}
                </span>
                <div className="text-muted font-sans text-[13px] font-medium mt-[10px]">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* ─────────────── sticky section nav ─────────────── */}
        <nav
          className="sticky top-0 z-40 mt-16 -mx-12 px-12 py-4 bg-[rgba(14,12,10,0.85)] backdrop-blur-[14px] border-b border-border mobile:-mx-6 mobile:px-6"
        >
          <div className="flex gap-6 flex-wrap mobile:gap-4">
            {SECTIONS.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className={`font-mono text-[12px] font-medium transition-colors duration-200 ${
                  active === s.id ? "text-accent" : "text-muted-2 hover:text-fg"
                }`}
              >
                {s.label}
              </a>
            ))}
          </div>
        </nav>

        {/* ─────────────── overview ─────────────── */}
        <Reveal delay={0.05}>
          <section id="overview" className="scroll-mt-24 mt-14">
            <SectionHeading index="01">Overview</SectionHeading>
            <p className="text-body font-sans text-[17px] leading-[1.8] mt-6 max-w-[820px]">
              {d.overview}
            </p>
          </section>
        </Reveal>

        {/* ─────────────── key features ─────────────── */}
        <Reveal delay={0.05}>
          <section
            id="features"
            className="scroll-mt-24 border-t border-border mt-16 pt-14"
          >
            <SectionHeading index="02">Key features</SectionHeading>
            <div className="grid grid-cols-2 gap-5 mt-8 tablet:grid-cols-1">
              {d.keyFeatures.map((f) => (
                <div
                  key={f.title}
                  className="bg-bg-alt border border-border rounded-[14px] p-6 [transition:transform_0.3s_cubic-bezier(0.2,0.7,0.2,1),border-color_0.3s] hover:-translate-y-[4px] hover:border-border-3"
                >
                  <div className="flex items-center gap-3">
                    {f.icon && <span className="text-[20px]">{f.icon}</span>}
                    <h3 className="font-display text-[19px] font-bold tracking-[-0.3px] text-fg">
                      {f.title}
                    </h3>
                  </div>
                  <p className="text-body font-sans text-[15px] leading-[1.75] mt-3">
                    {f.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </Reveal>

        {/* ─────────────── architecture decisions ─────────────── */}
        <Reveal delay={0.05}>
          <section
            id="architecture"
            className="scroll-mt-24 border-t border-border mt-16 pt-14"
          >
            <SectionHeading index="03">
              {d.architectureTitle || "Architecture decisions"}
            </SectionHeading>
            <p className="text-muted-2 font-mono text-[13px] mt-3">
              // the decisions worth knowing about
            </p>
            <div className="flex flex-col gap-4 mt-8">
              {d.architectureDecisions.map((a) => (
                <div
                  key={a.title}
                  className="border-l-2 border-accent bg-[rgba(239,127,63,0.04)] rounded-r-[10px] py-5 pl-6 pr-6 [transition:background-color_0.3s,border-color_0.3s] hover:bg-[rgba(239,127,63,0.07)]"
                >
                  <h3 className="font-display text-[18px] font-bold tracking-[-0.3px] text-fg">
                    {a.title}
                  </h3>
                  <p className="text-body font-sans text-[15.5px] leading-[1.8] mt-2">
                    {a.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </Reveal>

        {/* ─────────────── tech stack ─────────────── */}
        <Reveal delay={0.05}>
          <section
            id="stack"
            className="scroll-mt-24 border-t border-border mt-16 pt-14"
          >
            <SectionHeading index="04">Tech stack</SectionHeading>
            <div className="flex flex-col gap-8 mt-8">
              {d.techStack.map((group, i) => (
                <div key={group.group || i}>
                  {group.group && (
                    <div className="text-muted-3 font-mono text-[12px] font-semibold tracking-[2px] uppercase mb-4">
                      {group.group}
                    </div>
                  )}
                  <div className="flex gap-2 flex-wrap">
                    {group.items.map((item) => (
                      <span
                        key={item}
                        className="text-muted-2 font-mono text-[12px] font-medium border border-border rounded-md py-[5px] px-[11px] [transition:color_0.2s,border-color_0.2s] hover:text-fg hover:border-border-3"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </Reveal>

        {/* ─────────────── security ─────────────── */}
        <Reveal delay={0.05}>
          <section
            id="security"
            className="scroll-mt-24 border-t border-border mt-16 pt-14"
          >
            <SectionHeading index="05">
              {d.securityTitle || "Security"}
            </SectionHeading>
            <div className="flex flex-col mt-8">
              {d.security.map((s, i) => (
                <div
                  key={i}
                  className="flex gap-4 items-baseline py-4 border-b border-border"
                >
                  <span className="text-whatsapp font-mono text-[13px] font-bold flex-none">
                    ✓
                  </span>
                  <p className="text-body font-sans text-[15.5px] leading-[1.7]">{s}</p>
                </div>
              ))}
            </div>
          </section>
        </Reveal>

        {/* ─────────────── known limitations ─────────────── */}
        <Reveal delay={0.05}>
          <section
            id="limitations"
            className="scroll-mt-24 border-t border-border mt-16 pt-14"
          >
            <SectionHeading index="06">
              {d.limitationsTitle || "Known limitations — documented, not hidden"}
            </SectionHeading>
            <p className="text-muted-2 font-mono text-[13px] mt-3">
              // deliberate, documented scope decisions — not oversights
            </p>
            <div className="flex flex-col gap-4 mt-8">
              {d.knownLimitations.map((l, i) => (
                <div
                  key={i}
                  className="flex gap-4 items-baseline bg-bg-alt border border-border rounded-[12px] py-5 px-6"
                >
                  <span className="text-muted-3 font-mono text-[13px] font-bold flex-none tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-body font-sans text-[15.5px] leading-[1.8]">{l}</p>
                </div>
              ))}
            </div>
          </section>
        </Reveal>

        {/* ─────────────── footer ─────────────── */}
        <div className="border-t border-border mt-16 pt-8 flex justify-between items-center gap-4 flex-wrap mobile:justify-center">
          <Link to="/" className={BACK_LINK}>
            ← Back to portfolio
          </Link>
          <span className="text-muted-3 font-mono text-[13px] font-medium">
            {project.num} — {project.name}
          </span>
        </div>
      </div>
    </div>
  );
}

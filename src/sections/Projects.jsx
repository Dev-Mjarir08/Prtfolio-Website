import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projects } from '../data/portfolioData';
import ProjectModal from '../components/ProjectModal';
import {
  ArrowUpRight,
  Github,
  ShieldCheck,
  Database,
  Workflow,
  Users,
  ShoppingCart,
  Code
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const sectionRef = useRef(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !sectionRef.current) return;

    const cards = sectionRef.current.querySelectorAll('.project-card-container');

    cards.forEach((card) => {
      const visual = card.querySelector('.project-visual');
      const content = card.querySelector('.project-content');
      const header = card.querySelector('.project-header');

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
          end: 'top 20%',
          scrub: 0.6
        }
      });

      if (visual) {
        tl.fromTo(
          visual,
          { scale: 0.88, opacity: 0.6, y: 50 },
          { scale: 1, opacity: 1, y: 0, ease: 'power2.out' },
          0
        );
      }

      if (content) {
        tl.fromTo(
          content,
          { opacity: 0.2, y: 60 },
          { opacity: 1, y: 0, ease: 'power2.out' },
          0
        );
      }

      if (header) {
        tl.fromTo(
          header,
          { opacity: 0.4, y: 30 },
          { opacity: 1, y: 0, ease: 'power2.out' },
          0
        );
      }
    });
  }, []);

  const handleOpenModal = (project) => {
    setSelectedProject(project);
    setModalOpen(true);
  };

  return (
    <section
      id="work"
      ref={sectionRef}
      className="relative py-28 md:py-36 px-6 md:px-12 bg-background border-t border-white/[0.06] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Tag */}
        <div className="flex items-center justify-between border-b border-white/[0.08] pb-6 mb-16">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs uppercase tracking-widest text-accent font-semibold">
              02 / SELECTED WORK
            </span>
            <div className="h-[1px] w-12 bg-accent/40" />
          </div>
          <span className="font-mono text-xs text-brand-dim uppercase tracking-wider hidden sm:inline">
            4 PRODUCTION & ENTERPRISE BUILDS
          </span>
        </div>

        {/* Section Headline */}
        <div className="mb-20">
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-display font-extrabold uppercase tracking-tight text-brand-text">
            SELECTED WORK<span className="text-accent">.</span>
          </h2>
          <p className="mt-4 font-mono text-xs sm:text-sm text-brand-muted max-w-xl">
            A curated selection of scalable systems, enterprise ERP solutions, role-based platforms, and modern web applications.
          </p>
        </div>

        {/* Project Cards List */}
        <div className="space-y-24 md:space-y-36">
          {projects.map((project) => {
            const isHero = project.isHero;

            return (
              <div
                key={project.id}
                className="project-card-container group"
              >
                <div
                  data-cursor-project="true"
                  onClick={() => handleOpenModal(project)}
                  className={`relative rounded-2xl md:rounded-3xl border ${
                    isHero
                      ? 'border-accent/40 bg-gradient-to-b from-[#0e1726]/60 via-[#0d0d0d] to-[#080808] shadow-2xl shadow-sky-950/30 ring-1 ring-accent/20 hover:border-accent/70 hover:shadow-[0_0_40px_rgba(56,189,248,0.22)]'
                      : 'border-white/[0.08] bg-surface-card hover:border-accent/50 hover:shadow-[0_0_35px_rgba(56,189,248,0.14)]'
                  } p-6 sm:p-8 md:p-12 transition-all duration-500 overflow-hidden cursor-pointer hover:-translate-y-1`}
                >
                  {/* Cyber Corner Brackets on Card Hover */}
                  <div className="absolute top-4 right-4 w-3.5 h-3.5 border-t-2 border-r-2 border-transparent group-hover:border-accent transition-all duration-300 pointer-events-none" />
                  <div className="absolute bottom-4 left-4 w-3.5 h-3.5 border-b-2 border-l-2 border-transparent group-hover:border-accent transition-all duration-300 pointer-events-none" />

                  {/* Subtle Background Glow Accent for Hero */}
                  {isHero && (
                    <div className="absolute -top-24 -right-24 w-96 h-96 bg-accent/[0.08] rounded-full blur-3xl pointer-events-none" />
                  )}

                  {/* Project Metadata Header */}
                  <div className="project-header flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.06] pb-6 mb-8">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs font-bold text-accent tracking-widest uppercase">
                        PROJECT // {project.number}
                      </span>
                      {project.badges?.map((badge, bIdx) => (
                        <span
                          key={bIdx}
                          className={`font-mono text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded transition-transform duration-300 group-hover:scale-105 ${
                            badge === 'TEAM LEAD'
                              ? 'bg-accent text-black font-extrabold shadow-[0_0_10px_rgba(56,189,248,0.4)]'
                              : 'bg-white/[0.08] text-white border border-white/10 group-hover:border-accent/30'
                          }`}
                        >
                          {badge}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs text-brand-dim hidden md:inline group-hover:text-accent/80 transition-colors">
                        CLICK TO INSPECT ARCHITECTURE
                      </span>
                      <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-brand-text group-hover:bg-accent group-hover:text-black group-hover:shadow-[0_0_15px_#38BDF8] group-hover:scale-110 group-hover:rotate-45 transition-all duration-300">
                        <ArrowUpRight size={16} />
                      </div>
                    </div>
                  </div>

                  {/* Main Grid: Info + Visual Scene */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                    {/* Left: Project Content Info */}
                    <div className="project-content lg:col-span-5 space-y-6">
                      <div>
                        <h3 className="text-2xl sm:text-4xl md:text-5xl font-display font-extrabold uppercase tracking-tight text-brand-text group-hover:text-accent group-hover:translate-x-1.5 transition-all duration-300">
                          {project.title}
                        </h3>
                        <p className="font-mono text-xs text-accent mt-2 font-semibold tracking-wider flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                          {project.category}
                        </p>
                      </div>

                      <p className="text-sm sm:text-base text-brand-muted leading-relaxed">
                        {project.description}
                      </p>

                      <div className="p-4 rounded-xl bg-black/40 border border-white/[0.04] group-hover:border-accent/20 transition-colors">
                        <p className="text-xs text-brand-text/90 leading-relaxed font-mono">
                          {project.extendedDescription}
                        </p>
                      </div>

                      {/* Display Tags with Unique Holographic Chip Hover */}
                      <div className="flex flex-wrap gap-2 pt-2">
                        {project.displayTags.map((tag, tIdx) => (
                          <span
                            key={tIdx}
                            className="font-mono text-[10px] sm:text-xs px-2.5 py-1 rounded bg-white/[0.03] border border-white/[0.08] text-brand-muted hover-tag-glow cursor-pointer"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* CTAs inside card */}
                      <div className="flex items-center gap-3 pt-4">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleOpenModal(project);
                          }}
                          className="px-5 py-2.5 rounded-full font-mono text-xs uppercase tracking-wider bg-white text-black font-semibold hover:bg-accent hover:shadow-[0_0_20px_rgba(56,189,248,0.5)] hover:-translate-y-0.5 active:scale-95 transition-all duration-300"
                        >
                          EXPLORE DETAILS
                        </button>

                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="p-2.5 rounded-full bg-white/5 border border-white/10 text-brand-muted hover:text-white hover:border-accent hover:bg-accent/15 hover:shadow-[0_0_15px_rgba(56,189,248,0.3)] hover:-translate-y-0.5 hover:rotate-6 active:scale-95 transition-all duration-300"
                          aria-label="View Source on GitHub"
                        >
                          <Github size={16} />
                        </a>
                      </div>
                    </div>

                    {/* Right: Rich Visual Architectural Scene / Dashboard Preview */}
                    <div className="project-visual lg:col-span-7">
                      <div className="relative rounded-xl md:rounded-2xl bg-black/80 border border-white/[0.08] p-5 sm:p-6 shadow-inner overflow-hidden group-hover:border-accent/40 transition-all duration-500">
                        {/* Terminal Header */}
                        <div className="flex items-center justify-between border-b border-white/[0.06] pb-3 mb-5">
                          <div className="flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                            <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                            <span className="font-mono text-[10px] text-brand-dim ml-2">
                              SYS://JARIR/{project.id.toUpperCase()}
                            </span>
                          </div>
                          <span className="font-mono text-[10px] text-accent font-semibold">
                            STATUS: ACTIVE
                          </span>
                        </div>

                        {/* Visual Mock Interface based on Project Type */}
                        {project.id === 'project-02' ? (
                          /* ENTERPRISE ERP SYSTEM PREVIEW (HERO) */
                          <div className="space-y-4 font-mono text-xs select-none">
                            {/* ERP Pipeline Visual Stats */}
                            <div className="grid grid-cols-3 gap-3">
                              <div className="p-3 rounded-lg bg-white/[0.03] border border-white/[0.06]">
                                <div className="text-[10px] text-brand-dim">DATA TRANSACTIONS</div>
                                <div className="text-base sm:text-lg font-bold text-accent font-display mt-0.5">
                                  OPTIMIZED
                                </div>
                              </div>
                              <div className="p-3 rounded-lg bg-white/[0.03] border border-white/[0.06]">
                                <div className="text-[10px] text-brand-dim">PIPELINE INTEGRITY</div>
                                <div className="text-base sm:text-lg font-bold text-emerald-400 font-display mt-0.5">
                                  99.98%
                                </div>
                              </div>
                              <div className="p-3 rounded-lg bg-white/[0.03] border border-white/[0.06]">
                                <div className="text-[10px] text-brand-dim">AUTH MIDDLEWARE</div>
                                <div className="text-base sm:text-lg font-bold text-brand-text font-display mt-0.5">
                                  RBAC JWT
                                </div>
                              </div>
                            </div>

                            {/* Schema & Aggregation Pipeline Matrix */}
                            <div className="p-3.5 rounded-lg bg-surface-elevated/80 border border-white/[0.06] space-y-2">
                              <div className="flex items-center justify-between text-[11px] text-brand-muted border-b border-white/[0.04] pb-2">
                                <span className="flex items-center gap-1.5 text-accent font-semibold">
                                  <Workflow size={13} />
                                  ENTERPRISE DATA PIPELINE
                                </span>
                                <span className="text-[10px] text-brand-dim">MONGOOSE AGGREGATION</span>
                              </div>
                              <div className="text-[11px] text-brand-muted space-y-1">
                                <p className="text-emerald-400/90 font-mono">
                                  $match: &#123; status: &quot;ACTIVE&quot;, orgId: &quot;ENTERPRISE_CORE&quot; &#125;
                                </p>
                                <p className="text-sky-300/80 font-mono">
                                  $lookup: &#123; from: &quot;departments&quot;, localField: &quot;deptId&quot;, as: &quot;metrics&quot; &#125;
                                </p>
                                <p className="text-brand-dim font-mono">
                                  $group: &#123; _id: &quot;$workflowId&quot;, totalTransactions: &#123; $sum: 1 &#125; &#125;
                                </p>
                              </div>
                            </div>

                            {/* Team Leadership / Architecture Banner */}
                            <div className="flex items-center justify-between p-3 rounded-lg bg-accent/10 border border-accent/30 text-accent text-xs">
                              <span className="flex items-center gap-2 font-semibold">
                                <Users size={14} />
                                LED MULTI-DEVELOPER ERP SPRINT
                              </span>
                              <span className="text-[10px] font-mono tracking-widest uppercase">
                                PRODUCTION DEPLOYED
                              </span>
                            </div>
                          </div>
                        ) : project.id === 'project-01' ? (
                          /* EMPLOYEE MANAGEMENT SYSTEM PREVIEW */
                          <div className="space-y-4 font-mono text-xs select-none">
                            <div className="p-3.5 rounded-lg bg-surface-elevated/80 border border-white/[0.06] space-y-3">
                              <div className="flex items-center justify-between text-[11px] text-brand-muted border-b border-white/[0.04] pb-2">
                                <span className="flex items-center gap-1.5 text-indigo-400 font-semibold">
                                  <ShieldCheck size={13} />
                                  ROLE-BASED ACCESS CONTROL (RBAC)
                                </span>
                                <span className="text-[10px] text-brand-dim">JWT VERIFIED</span>
                              </div>
                              <div className="grid grid-cols-3 gap-2 text-center text-[10px]">
                                <div className="p-2 rounded bg-white/[0.03] border border-white/[0.04]">
                                  <div className="text-brand-dim">ADMIN</div>
                                  <div className="text-emerald-400 font-bold mt-1">FULL_ACCESS</div>
                                </div>
                                <div className="p-2 rounded bg-white/[0.03] border border-white/[0.04]">
                                  <div className="text-brand-dim">MANAGER</div>
                                  <div className="text-sky-400 font-bold mt-1">DEPT_TASKS</div>
                                </div>
                                <div className="p-2 rounded bg-white/[0.03] border border-white/[0.04]">
                                  <div className="text-brand-dim">STAFF</div>
                                  <div className="text-brand-muted font-bold mt-1">ASSIGNMENTS</div>
                                </div>
                              </div>
                            </div>
                            <div className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.06] flex items-center justify-between text-[11px] text-brand-muted">
                              <span className="flex items-center gap-2">
                                <Database size={13} className="text-accent" />
                                Cloudinary Avatar Asset Pipeline & Mongoose Schemas
                              </span>
                              <span className="text-emerald-400 text-[10px]">REST 200 OK</span>
                            </div>
                          </div>
                        ) : project.id === 'project-03' ? (
                          /* E-COMMERCE PLATFORM PREVIEW */
                          <div className="space-y-4 font-mono text-xs select-none">
                            <div className="p-3.5 rounded-lg bg-surface-elevated/80 border border-white/[0.06] space-y-3">
                              <div className="flex items-center justify-between text-[11px] text-brand-muted border-b border-white/[0.04] pb-2">
                                <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                                  <ShoppingCart size={13} />
                                  CENTRALIZED REDUX TOOLKIT STATE
                                </span>
                                <span className="text-[10px] text-brand-dim">PERSISTED CART</span>
                              </div>
                              <div className="grid grid-cols-2 gap-2 text-[11px]">
                                <div className="p-2.5 rounded bg-white/[0.03] border border-white/[0.04]">
                                  <span className="text-brand-dim">State Slice: </span>
                                  <span className="text-emerald-400 font-bold">cartSlice.js</span>
                                </div>
                                <div className="p-2.5 rounded bg-white/[0.03] border border-white/[0.04]">
                                  <span className="text-brand-dim">Filter Engine: </span>
                                  <span className="text-sky-400 font-bold">Multi-Query</span>
                                </div>
                              </div>
                            </div>
                            <div className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.06] flex items-center justify-between text-[11px] text-brand-muted">
                              <span>RESTful Express & MongoDB Order Workflow</span>
                              <span className="text-accent text-[10px]">ORDER_MANAGEMENT</span>
                            </div>
                          </div>
                        ) : (
                          /* DEVELOPER PORTFOLIO PREVIEW */
                          <div className="space-y-4 font-mono text-xs select-none">
                            <div className="p-3.5 rounded-lg bg-surface-elevated/80 border border-white/[0.06] space-y-3">
                              <div className="flex items-center justify-between text-[11px] text-brand-muted border-b border-white/[0.04] pb-2">
                                <span className="flex items-center gap-1.5 text-white font-semibold">
                                  <Code size={13} className="text-accent" />
                                  GSAP & LENIS SMOOTH ARCHITECTURE
                                </span>
                                <span className="text-[10px] text-accent">60 FPS TICKER</span>
                              </div>
                              <div className="grid grid-cols-2 gap-2 text-[11px]">
                                <div className="p-2.5 rounded bg-white/[0.03] border border-white/[0.04]">
                                  <span className="text-brand-dim">Tailwind CSS: </span>
                                  <span className="text-white font-bold">Custom Tokens</span>
                                </div>
                                <div className="p-2.5 rounded bg-white/[0.03] border border-white/[0.04]">
                                  <span className="text-brand-dim">Messaging: </span>
                                  <span className="text-accent font-bold">EmailJS Async</span>
                                </div>
                              </div>
                            </div>
                            <div className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.06] flex items-center justify-between text-[11px] text-brand-muted">
                              <span>Cinematic Parallax & Physics-based Magnetic UI</span>
                              <span className="text-emerald-400 text-[10px]">OPTIMIZED BUNDLE</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Deep-Dive Project Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </section>
  );
}

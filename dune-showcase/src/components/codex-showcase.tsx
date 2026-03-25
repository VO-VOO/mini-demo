"use client";

import { useEffect, useRef } from "react";

const navItems = [
  { label: "能力", href: "#capabilities" },
  { label: "流程", href: "#workflow" },
  { label: "信号", href: "#signals" },
  { label: "评价", href: "#testimonials" },
  { label: "联系", href: "#contact" },
];

const heroStats = [
  { label: "协同层级", value: "4-layer reasoning" },
  { label: "首个补丁时间", value: "< 10 分钟" },
  { label: "接入界面", value: "CLI · Web · API" },
];

const partnerNames = ["OpenAI", "GitHub", "Notion", "Canva", "Playwright"];

const workflowSteps = [
  {
    index: "01",
    title: "先读 codebase",
    copy:
      "Codex 先检查真实项目状态，再开始推理与修改，而不是先套一个通用模板上去。",
  },
  {
    index: "02",
    title: "跨工具推理",
    copy:
      "Terminal 命令、代码补丁、浏览器自动化、MCP apps 和 web 验证会被组合进同一个工作闭环。",
  },
  {
    index: "03",
    title: "带着验证交付",
    copy:
      "它不会停在分析阶段，而是继续编辑、构建、测试，并用明确的文件引用交代最终结果。",
  },
];

const featureStories = [
  {
    eyebrow: "上下文引擎",
    title: "一个从真实状态出发，而不是从想象状态出发的 coding agent。",
    copy:
      "Codex 会先读取 workspace，尊重现有架构，留意脏文件，并在不把 repo 压平成样板代码的前提下完成集成式修改。",
    points: ["先读后写", "保留既有模式", "避免破坏性 git 操作"],
  },
  {
    eyebrow: "执行纪律",
    title: "只有经得住 build 检验的推理，才算真正有用。",
    copy:
      "从生成 patch 到完成验证，Codex 会一直卡住关键路径推进，并在可能的情况下用编译级证据把闭环收住。",
    points: ["运行真实命令", "持续同步进展", "阻塞点直接暴露，不掩盖"],
  },
];

const capabilityCards = [
  {
    title: "理解 codebase",
    copy: "在提出修改前先理解现有文件、命名方式、技术栈约定和本地限制。",
  },
  {
    title: "多工具协同",
    copy: "把 shell、browser、apps、文档检索和结构化编辑整合进一个连贯的工作会话里。",
  },
  {
    title: "验证优先",
    copy: "不是只靠静态推理宣称成功，而是通过 build、lint 或测试来确认结果。",
  },
  {
    title: "可读交付",
    copy: "清楚说明改了什么、为什么改、改动落在 repo 哪些位置，不靠空话和模糊表述填充。",
  },
];

const signalStats = [
  { value: "95%", label: "更少投机式代码返工" },
  { value: "1 loop", label: "从上下文到 patch 再到验证" },
  { value: "0 fluff", label: "状态更新和交付说明不注水" },
  { value: "24/7", label: "随时可进入 repo 迭代" },
];

const testimonials = [
  {
    quote:
      "Codex 处理 repo 的方式很像一个中途加入项目的资深工程师。它先读上下文，只改真正重要的部分，再用真实 build 证明补丁有效。",
    name: "Lin",
    role: "Platform Engineer",
  },
  {
    quote:
      "差异不只是代码更好，而是整体执行纪律更强：更少假设、更清晰的取舍，以及更干净的收尾。",
    name: "Mara",
    role: "Product Lead",
  },
  {
    quote:
      "它不像 autocomplete，更像是在和一个同时尊重 codebase 和交付节奏的人结对开发。",
    name: "Evan",
    role: "Founder",
  },
];

export const CodexShowcase = () => {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) {
      return;
    }

    let pointerFrame = 0;
    const onMove = (event: MouseEvent) => {
      const bounds = root.getBoundingClientRect();
      const x = ((event.clientX - bounds.left) / bounds.width) * 100;
      const y = ((event.clientY - bounds.top) / bounds.height) * 100;

      if (pointerFrame) {
        cancelAnimationFrame(pointerFrame);
      }

      pointerFrame = requestAnimationFrame(() => {
        root.style.setProperty("--pointer-x", `${x.toFixed(2)}%`);
        root.style.setProperty("--pointer-y", `${y.toFixed(2)}%`);
      });
    };

    window.addEventListener("pointermove", onMove);

    return () => {
      window.removeEventListener("pointermove", onMove);
      if (pointerFrame) {
        cancelAnimationFrame(pointerFrame);
      }
    };
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) {
      return;
    }

    let scrollFrame = 0;
    const updateScroll = () => {
      const scrollRange = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollRange > 0 ? window.scrollY / scrollRange : 0;
      root.style.setProperty("--scroll", progress.toFixed(3));
      scrollFrame = 0;
    };

    const onScroll = () => {
      if (!scrollFrame) {
        scrollFrame = requestAnimationFrame(updateScroll);
      }
    };

    updateScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (scrollFrame) {
        cancelAnimationFrame(scrollFrame);
      }
    };
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) {
      return;
    }

    const revealElements = Array.from(root.querySelectorAll<HTMLElement>("[data-reveal]"));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.18 }
    );

    revealElements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="codex-app" ref={rootRef}>
      <div className="codex-noise" aria-hidden="true" />
      <div className="codex-grid" aria-hidden="true" />
      <div className="codex-aurora codex-aurora-left" aria-hidden="true" />
      <div className="codex-aurora codex-aurora-right" aria-hidden="true" />

      <header className="topbar" data-reveal>
        <a className="brand-mark liquid-glass" href="#hero" aria-label="Codex 首页">
          <span className="brand-core">C</span>
          <span className="brand-text">
            <strong>Codex</strong>
            <span>engineering agent</span>
          </span>
        </a>

        <nav className="topbar-nav liquid-glass" aria-label="主导航">
          {navItems.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
          <a className="nav-cta" href="#contact">
            开始构建
          </a>
        </nav>
      </header>

      <main className="page-shell">
        <section className="hero-section" id="hero">
          <div className="hero-copy" data-reveal>
            <span className="section-pill liquid-glass">
              <span className="pill-tag">New</span>
              介绍 Codex engineering workflow
            </span>
            <p className="eyebrow">Agentic software delivery</p>
            <h1 className="hero-title">
              会读、会想、会改、会证明结果的 coding agent。
            </h1>
            <p className="hero-body">
              Codex 面向真实工程工作而设计：检查 repo、理解约束、做精确修改、验证结果，
              最后交回一个可落地的答案，而不是一份带猜测成分的草稿。
            </p>
            <div className="hero-actions">
              <a className="primary-button liquid-glass-strong" href="#workflow">
                查看流程
              </a>
              <a className="secondary-button" href="#capabilities">
                查看能力
              </a>
            </div>
            <div className="hero-stats">
              {heroStats.map((item) => (
                <article key={item.label} className="metric-card liquid-glass">
                  <span>{item.label}</span>
                  <strong>{item.value}</strong>
                </article>
              ))}
            </div>
          </div>

          <div className="hero-panel liquid-glass-strong" data-reveal>
            <div className="panel-orbit" aria-hidden="true">
              <div className="panel-orbit-core" />
            </div>
            <div className="panel-label">当前会话</div>
            <h2>Codex Runtime</h2>
            <p>
              一个面向深度 repo 工作的纪律化闭环，兼顾高上下文推理和工具驱动执行。
            </p>
            <div className="runtime-rail">
              <span>Inspect</span>
              <span>Patch</span>
              <span>Verify</span>
            </div>
            <div className="runtime-list">
              <div>
                <strong>扫描 workspace</strong>
                <span>读取当前文件和周边架构关系</span>
              </div>
              <div>
                <strong>定点修改</strong>
                <span>用对 repo 更安全的方式应用最小 patch</span>
              </div>
              <div>
                <strong>结果校验</strong>
                <span>通过 build 或测试确认 patch 站得住</span>
              </div>
            </div>
          </div>
        </section>

        <section className="partner-section" data-reveal>
          <span className="section-pill liquid-glass">覆盖现代开发者常用工作界面</span>
          <div className="partner-row">
            {partnerNames.map((name) => (
              <span key={name}>{name}</span>
            ))}
          </div>
        </section>

        <section className="section-block" id="workflow">
          <div className="section-heading" data-reveal>
            <span className="section-pill liquid-glass">流程</span>
            <p className="eyebrow">How it works</p>
            <h2>你给目标，Codex 负责把闭环补齐。</h2>
            <p>
              这不只是模型输出，而是一套内建上下文收集、执行和验证能力的真实交付循环。
            </p>
          </div>

          <div className="workflow-grid">
            {workflowSteps.map((step) => (
              <article className="workflow-card liquid-glass" key={step.index} data-reveal>
                <span className="workflow-index">{step.index}</span>
                <h3>{step.title}</h3>
                <p>{step.copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="feature-split" id="capabilities">
          {featureStories.map((story) => (
            <article className="story-card" key={story.title} data-reveal>
              <div className="story-copy">
                <span className="section-pill liquid-glass">{story.eyebrow}</span>
                <h2>{story.title}</h2>
                <p>{story.copy}</p>
                <ul className="story-points">
                  {story.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>
              <div className="story-visual liquid-glass-strong" aria-hidden="true">
                <div className="visual-lines" />
                <div className="visual-orb" />
                <div className="visual-terminal">
                  <span>$ scan workspace</span>
                  <span>$ patch target module</span>
                  <span>$ run build</span>
                </div>
              </div>
            </article>
          ))}
        </section>

        <section className="section-block" id="signals">
          <div className="section-heading" data-reveal>
            <span className="section-pill liquid-glass">信号</span>
            <p className="eyebrow">Why teams use it</p>
            <h2>高能动性执行，不以低纪律副作用为代价。</h2>
            <p>
              只有快还不够。系统还必须在真实交付压力下保持可理解、理解 repo，并且能够被机械性验证。
            </p>
          </div>

          <div className="capability-grid">
            {capabilityCards.map((item) => (
              <article className="capability-card liquid-glass" key={item.title} data-reveal>
                <div className="capability-icon" aria-hidden="true" />
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="stats-band" data-reveal>
          <div className="stats-shell liquid-glass-strong">
            {signalStats.map((item) => (
              <article key={item.label}>
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </article>
            ))}
          </div>
        </section>

        <section className="section-block" id="testimonials">
          <div className="section-heading" data-reveal>
            <span className="section-pill liquid-glass">评价</span>
            <p className="eyebrow">What teams notice</p>
            <h2>少一点表演，多一点工程信号。</h2>
            <p>
              价值不只在 patch 本身，也在 patch 周围的执行姿态：假设更明确、影响面更小、交接更干净。
            </p>
          </div>

          <div className="testimonial-grid">
            {testimonials.map((testimonial) => (
              <article className="testimonial-card liquid-glass" key={testimonial.name} data-reveal>
                <p className="testimonial-quote">“{testimonial.quote}”</p>
                <strong>{testimonial.name}</strong>
                <span>{testimonial.role}</span>
              </article>
            ))}
          </div>
        </section>

        <section className="footer-cta" id="contact" data-reveal>
          <div className="footer-card liquid-glass-strong">
            <span className="section-pill liquid-glass">从这里开始</span>
            <h2>下一次稳定交付，应该从上下文开始，而不是从猜开始。</h2>
            <p>
              当你需要一个像工程师一样工作的 coding agent 时，就用 Codex：立足 repo、
              沟通克制，并对 build 结果负责。
            </p>
            <div className="hero-actions">
              <a className="primary-button liquid-glass-strong" href="#hero">
                预约技术演示
              </a>
              <a className="secondary-button" href="#workflow">
                回看闭环
              </a>
            </div>
            <footer className="site-footer">
              <span>© 2026 Codex</span>
              <div>
                <a href="#capabilities">能力</a>
                <a href="#signals">信号</a>
                <a href="#contact">联系</a>
              </div>
            </footer>
          </div>
        </section>
      </main>
    </div>
  );
};

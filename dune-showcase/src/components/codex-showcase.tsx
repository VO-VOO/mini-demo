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
  { label: "推理层级", value: "四维深度解析" },
  { label: "首次交付", value: "< 10 分钟" },
  { label: "无缝接入", value: "CLI · Web · API" },
];

const partnerNames = ["OpenAI", "GitHub", "Notion", "Canva", "Playwright"];

const workflowSteps = [
  {
    index: "01",
    title: "先洞察，后行动",
    copy:
      "拒绝盲目套用模板。Codex 将深入分析真实项目状态，以此为基石展开推理。",
  },
  {
    index: "02",
    title: "跨工具无缝协作",
    copy:
      "将终端、浏览器自动化与代码环境悉数整合，构建统一稳固的执行闭环。",
  },
  {
    index: "03",
    title: "验证级可靠交付",
    copy:
      "不止于静态推理，更以真实编译与测试为凭，交付每一处确凿无误的代码。",
  },
];

const featureStories = [
  {
    eyebrow: "绝佳全局视野",
    title: "立足真实状态，告别盲目揣测。",
    copy:
      "全局扫描代码库，充分尊重现有架构，在不破坏任何原有效率的前提下完成集成式修补。",
    points: ["思考早于敲击", "全盘保留架构", "杜绝破坏性变更"],
  },
  {
    eyebrow: "严酷执行法则",
    title: "唯有经得起编译的代码，才称得上有用。",
    copy:
      "从修补到验证，Codex 步步为营。用绝对真实的代码编译，硬核自证每个推理环节的坚不可摧。",
    points: ["跑动真实指令", "状态全程透明", "迎面击破阻塞"],
  },
];

const capabilityCards = [
  {
    title: "深层洞悉",
    copy: "动手之前，先透彻理解项目文件、组件命名、技术栈边界与本地限制。",
  },
  {
    title: "全栈通览",
    copy: "将 Shell 终端、浏览器及全系列研发工具链，完美融入一条连贯的协同流。",
  },
  {
    title: "验证为尊",
    copy: "摒弃空谈。以严苛的编译构筑、代码验证机制，检验每一个细微改动。",
  },
  {
    title: "极净交付",
    copy: "直奔主题。删减冗杂，明确每次改动的核心依据，代码交接清晰透明。",
  },
];

const signalStats = [
  { value: "95%", label: "削减无效返工率" },
  { value: "1 loop", label: "交付验收一气呵成" },
  { value: "0 fluff", label: "剔除所有注水言辞" },
  { value: "24/7", label: "随叫随到的代码引擎" },
];

const testimonials = [
  {
    quote:
      "它对待庞大项目的严谨方式，像极了一位身经百战的灵魂工程师。它不仅阅读前因后果，更靠着真实跑通的构建证明结果。",
    name: "Lin",
    role: "Platform Engineer",
  },
  {
    quote:
      "它带给团队的不仅是高能效的代码输出，更是一种惊艳的执行纪律：不越界、不盲猜，收尾干脆利落。",
    name: "Mara",
    role: "Product Lead",
  },
  {
    quote:
      "它不只是个自动补全机器，更是个通宵达旦、敬畏代码并专注交付全流程的强悍搭档。",
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



      <main className="page-shell">
        <section className="hero-section" id="hero">
          <div className="hero-copy" data-reveal>
            <span className="section-pill liquid-glass">
              <span className="pill-tag">New</span>
              全新 Codex 研发范式。
            </span>
            <p className="eyebrow">新一代软件智能交付</p>
            <h1 className="hero-title">
              读懂逻辑，精准重构。<br />每行代码，自带验证。
            </h1>
            <p className="hero-body">
              为应对硬核工程挑战而生。它长驱直入代码深水区，精准捕捉逻辑锚点。
              它交付的绝不只是几行补丁，更是经受严苛编译自证的完美工程闭环。
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
            <div className="panel-label">实时运转。</div>
            <h2>Codex Runtime</h2>
            <p>
              为巨型代码库量身打造的执行引擎。将深度上下文与原生工具链无缝融合，稳健运转。
            </p>
            <div className="runtime-rail">
              <span>Inspect</span>
              <span>Patch</span>
              <span>Verify</span>
            </div>
            <div className="runtime-list">
              <div>
                <strong>全域扫描</strong>
                <span>洞悉当前逻辑与全局依赖，建立全方位的感知。</span>
              </div>
              <div>
                <strong>精准定点</strong>
                <span>以极度克制、安全的手法，完成细粒度的代码更迭。</span>
              </div>
              <div>
                <strong>闭环验证</strong>
                <span>编译、测试多管齐下，确保重构结果稳如磐石。</span>
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
            <span className="section-pill liquid-glass">闭环生态</span>
            <p className="eyebrow">How it works</p>
            <h2>指出目标，其余交给我们。</h2>
            <p>
              远不止于代码补全。这套拥有全局视野与原生编译能力的进化版智能核心，正重新制定交付的标尺。
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
            <span className="section-pill liquid-glass">卓绝表现</span>
            <p className="eyebrow">Why teams use it</p>
            <h2>超凡执行力，毫不妥协的严明纪律。</h2>
            <p>
              唯快不破，更需稳如泰山。在交付的重压下，每一处重构都保持绝对清晰、高度透彻，并完全顺从机器的无情验证。
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
            <span className="section-pill liquid-glass">口碑</span>
            <p className="eyebrow">What teams notice</p>
            <h2>褪去浮华，回归纯粹工程实力。</h2>
            <p>
              真正震撼人心的不是花哨补丁，而是那份冷静：干脆、克制、一击即中。
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
            <h2>你的卓绝表现，理应因洞察而生，绝非全靠猜测。</h2>
            <p>
              当你想要一位对架构抱有敬畏之心、对编译闭环苛求至极的全系搭档，
              Codex 已在此就位。
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

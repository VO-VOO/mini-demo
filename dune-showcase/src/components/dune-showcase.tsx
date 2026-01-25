"use client";

import { useEffect, useRef } from "react";

export const DuneShowcase = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    let rafId = 0;
    const handleMove = (event: MouseEvent) => {
      const bounds = container.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width;
      const y = (event.clientY - bounds.top) / bounds.height;

      if (rafId) {
        cancelAnimationFrame(rafId);
      }

      rafId = requestAnimationFrame(() => {
        container.style.setProperty("--pointer-x", `${Math.round(x * 100)}%`);
        container.style.setProperty("--pointer-y", `${Math.round(y * 100)}%`);
      });
    };

    window.addEventListener("mousemove", handleMove);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
    };
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    let rafId = 0;
    const updateScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
      container.style.setProperty("--scroll", progress.toFixed(3));
    };

    const handleScroll = () => {
      if (rafId) {
        return;
      }
      rafId = requestAnimationFrame(() => {
        updateScroll();
        rafId = 0;
      });
    };

    updateScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
    };
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    const elements = Array.from(container.querySelectorAll<HTMLElement>("[data-reveal]"));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.2 }
    );

    elements.forEach((element) => {
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="dune-app" ref={containerRef}>
      <div className="dune-noise" aria-hidden="true" />
      <div className="dune-lines" aria-hidden="true" />

      <header className="hero" data-reveal>
        <div className="hero-copy">
          <p className="kicker">ARRAKIS · 厄拉科斯行星</p>
          <h1 className="display">沙丘</h1>
          <p className="subtitle">
            香料驱动星际秩序，沙海孕育预言。这里是权力、生态与信仰交织的荒漠史诗。
          </p>
          <div className="actions">
            <a className="btn primary" href="#preview">
              阅读预览
            </a>
            <a className="btn ghost" href="#world">
              世界观图谱
            </a>
          </div>
          <div className="stats">
            <div className="stat">
              <span className="stat-label">关键词</span>
              <span className="stat-value">生态 / 权力 / 预言</span>
            </div>
            <div className="stat">
              <span className="stat-label">核心势力</span>
              <span className="stat-value">厄崔迪 · 哈克南 · 弗雷曼</span>
            </div>
            <div className="stat">
              <span className="stat-label">视觉母题</span>
              <span className="stat-value">沙丘 / 香料 / 沙虫</span>
            </div>
          </div>
        </div>

        <div className="hero-panel">
          <div className="spice-orb" aria-hidden="true">
            <div className="spice-core" />
          </div>
          <div className="panel-content">
            <p className="panel-title">香料流动</p>
            <p className="panel-desc">
              香料既是燃料，也是预知的钥匙。沙海中的每一次波动，都在重写星际秩序。
            </p>
            <div className="meter">
              <span className="meter-fill" />
            </div>
            <div className="panel-tags">
              <span>Spice Index 72</span>
              <span>Storm Risk 0.38</span>
            </div>
          </div>
        </div>
      </header>

      <section id="world" className="section" data-reveal>
        <div className="section-header">
          <p className="section-kicker">世界设定</p>
          <h2>沙海与水的经济学</h2>
          <p>
            厄拉科斯是一颗缺水星球，水既是生存工具，也是社会阶层的尺度。
          </p>
        </div>
        <div className="card-grid">
          <article className="card">
            <h3>沙漠生态</h3>
            <p>沙虫维系香料循环，风暴与迁徙决定一切资源的节奏。</p>
            <div className="card-footer">生态循环 · 沙虫 · 香料</div>
          </article>
          <article className="card">
            <h3>水的价值</h3>
            <p>蒸馏服与风阱保存每一滴水，水成为身份与财富的象征。</p>
            <div className="card-footer">生存策略 · 水货币</div>
          </article>
          <article className="card">
            <h3>气候转化</h3>
            <p>列特·凯恩斯的计划描绘了改造星球的宏愿，却牵动政治角力。</p>
            <div className="card-footer">生态工程 · 长期计划</div>
          </article>
        </div>
      </section>

      <section className="section" data-reveal>
        <div className="section-header">
          <p className="section-kicker">势力结构</p>
          <h2>家族与信条</h2>
          <p>荣耀、掠夺与生存智慧在沙丘交汇，推动一场封建宇宙的权力移交。</p>
        </div>
        <div className="card-grid">
          <article className="card card-highlight">
            <h3>厄崔迪家族</h3>
            <p>以荣誉与责任为信念，试图在荒漠中重建秩序。</p>
            <div className="card-footer">荣誉 · 治理 · 牺牲</div>
          </article>
          <article className="card">
            <h3>哈克南家族</h3>
            <p>工业与贪欲驱动的掠夺者，把厄拉科斯视为资源工厂。</p>
            <div className="card-footer">压迫 · 工业化</div>
          </article>
          <article className="card">
            <h3>弗雷曼</h3>
            <p>深谙沙漠生存法则，怀抱预言与自由的族群。</p>
            <div className="card-footer">生存 · 预言 · 反抗</div>
          </article>
        </div>
      </section>

      <section id="preview" className="section" data-reveal>
        <div className="section-header">
          <p className="section-kicker">阅读路径</p>
          <h2>预言与选择的三段式叙事</h2>
          <p>从家族坠落到沙丘觉醒，每一章都揭示命运的代价。</p>
        </div>
        <div className="timeline">
          <div className="timeline-step">
            <div className="step-index">01</div>
            <div>
              <h3>权力交接</h3>
              <p>厄崔迪接管厄拉科斯，政治陷阱随沙暴而来。</p>
            </div>
          </div>
          <div className="timeline-step">
            <div className="step-index">02</div>
            <div>
              <h3>沙海生存</h3>
              <p>保罗与杰西卡深入沙漠，学会与沙虫共存。</p>
            </div>
          </div>
          <div className="timeline-step">
            <div className="step-index">03</div>
            <div>
              <h3>预言成真</h3>
              <p>香料开启未来视野，也埋下宗教狂热的阴影。</p>
            </div>
          </div>
        </div>
      </section>

      <section className="quote" data-reveal>
        <p className="quote-text">“The spice must flow.”</p>
        <p className="quote-sub">香料必须流动，权力也在其中流动。</p>
      </section>
    </div>
  );
};

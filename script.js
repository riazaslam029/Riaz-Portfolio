/**
 * ============================================================================
 * Riaz Aslam — Software Engineering Portfolio
 * Advanced Interactive Client-Side Engine
 * Features: Interactive Canvas Mesh, Recruiter CLI, Dynamic Project Filter &
 * Architecture Modal, Live GitHub Sync, Theme Engine, Toast Feedback.
 * ============================================================================
 */

(function () {
  'use strict';

  /* --------------------------------------------------------------------------
     1. PROJECT DATA STORE (Curated flagship projects with architectural specs)
     -------------------------------------------------------------------------- */
  const FLAGSHIP_PROJECTS = [
    {
      id: 'acadexa-ai',
      title: 'Acadexa AI — Academic Management Platform',
      category: 'ai',
      badge: 'Flagship Full-Stack',
      isLive: false,
      summary: 'A modern AI-powered academic management platform automating curriculum parsing, student attendance, quiz generation, and grading analytics.',
      challenge: 'Automating academic workflows with sub-second Gemini AI response times and resilient multi-tenant PostgreSQL schema.',
      stack: ['React', 'Next.js', 'FastAPI', 'PostgreSQL', 'Google Gemini AI', 'Python', 'Tailwind CSS'],
      githubUrl: 'https://github.com/riazaslam029/acadexa-ai',
      liveUrl: null,
      architecture: {
        overview: 'Acadexa AI bridges modern educational institutions with generative intelligence. Built with a decoupled architecture featuring a React frontend and an asynchronous FastAPI microservice backed by PostgreSQL.',
        highlights: [
          'Generates tailored quiz questions and assignment rubrics using structured prompts via Google Gemini AI.',
          'Asynchronous background job worker for batch syllabus document analysis and vectorized topic indexing.',
          'Role-based access control (RBAC) supporting Instructors, Students, and Administrators with JWT authentication.',
          'Optimized PostgreSQL query schemas for rapid student performance analytics and attendance tracking.'
        ],
        keyMetrics: 'Reduces test prep time by 75% | Sub-800ms AI generation pipeline'
      }
    },
    {
      id: 'cacheforge',
      title: 'CacheForge — Embedded Storage Engine',
      category: 'systems',
      badge: 'Systems Programming',
      isLive: false,
      summary: 'A zero-dependency embedded high-performance storage engine built in Python with write-ahead logging (WAL), B-Tree indexing, TTL expiration, and crash recovery.',
      challenge: 'Guaranteeing ACID durability and instant crash recovery without external database dependencies or third-party engines.',
      stack: ['Python', 'Data Structures', 'Storage Systems', 'Write-Ahead Log (WAL)', 'ACID'],
      githubUrl: 'https://github.com/riazaslam029/CacheForge',
      liveUrl: null,
      architecture: {
        overview: 'CacheForge was engineered to understand database internals from first principles. It implements an in-memory key-value cache layered on top of an append-only transaction journal for durability.',
        highlights: [
          'Append-only Write-Ahead Log (WAL) ensures complete data restoration upon unexpected crashes.',
          'Active TTL expiration worker with opportunistic lazy eviction to minimize memory footprint.',
          'Segmented indexing using binary search tree indices for range queries and prefix searches.',
          'Thread-safe concurrency control supporting concurrent read operations and sequential writes.'
        ],
        keyMetrics: 'Zero external dependencies | 100% crash-resilient journal recovery'
      }
    },
    {
      id: 'personal-ai-study-coach-kiro',
      title: 'Personal AI Study Coach (Kiro)',
      category: 'live',
      badge: 'Live on Vercel',
      isLive: true,
      summary: 'An intelligent personalized study companion that generates adaptive task roadmaps, monitors focus sessions, and provides context-aware academic coaching.',
      challenge: 'Real-time adaptive task scheduling reacting dynamically to student learning curves and retention rates.',
      stack: ['TypeScript', 'React', 'Next.js', 'Node.js', 'Tailwind CSS', 'Vercel', 'AI APIs'],
      githubUrl: 'https://github.com/riazaslam029/Personal-AI-Study-Coach-Kiro',
      liveUrl: 'https://personal-ai-study-coach-kiro.vercel.app',
      architecture: {
        overview: 'A deployed productivity web application combining cognitive science spacing algorithms with modern LLM conversational prompts to help university students optimize study sprints.',
        highlights: [
          'Full-stack TypeScript architecture deployed globally on Vercel Edge network for instant page loads.',
          'Adaptive spaced-repetition scheduler that readjusts deadlines based on self-reported comprehension scores.',
          'Interactive Pomodoro timer synced with real-time browser session state and persistent local storage.',
          'Custom responsive UI with glassmorphism styling and keyboard shortcuts for rapid task triage.'
        ],
        keyMetrics: 'Live production URL | Deployed on Vercel Edge'
      }
    },
    {
      id: 'rankpilot-ai',
      title: 'RankPilot AI — Search & Recommendation',
      category: 'ai',
      badge: 'ML & Data Engineering',
      isLive: false,
      summary: 'AI-powered Search Intelligence & Content Recommendation Platform built with Machine Learning, XGBoost, FastAPI, Streamlit, and DuckDB.',
      challenge: 'Querying and ranking millions of data entries with sub-millisecond OLAP latency using DuckDB and gradient-boosted trees.',
      stack: ['Python', 'Machine Learning', 'XGBoost', 'DuckDB', 'FastAPI', 'Streamlit', 'Scikit-Learn'],
      githubUrl: 'https://github.com/riazaslam029/RankPilot-AI',
      liveUrl: null,
      architecture: {
        overview: 'RankPilot AI solves ranking and recommendation bottlenecks by combining in-process columnar database storage (DuckDB) with machine learning ranking models (XGBoost).',
        highlights: [
          'Feature engineering pipeline computing click-through rate priors, semantic relevancy, and recency decay.',
          'Fast columnar aggregation leveraging DuckDB vectorized queries directly inside Python memory.',
          'Model inference serving via FastAPI REST endpoints and an interactive Streamlit diagnostic playground.',
          'Evaluated with NDCG@10 and precision-recall curves for continuous ranking validation.'
        ],
        keyMetrics: 'High-throughput vectorized scoring | DuckDB embedded OLAP'
      }
    },
    {
      id: 'smart-inventory',
      title: 'Smart Inventory & Sales Management',
      category: 'live',
      badge: 'Live on Vercel',
      isLive: true,
      summary: 'Full-stack enterprise inventory platform with real-time stock notifications, dynamic sales forecasting, and interactive financial dashboards.',
      challenge: 'Handling real-time inventory decrement concurrency during high-velocity checkout simulations.',
      stack: ['TypeScript', 'React', 'Node.js', 'Tailwind CSS', 'Vercel', 'REST APIs'],
      githubUrl: 'https://github.com/riazaslam029/Smart-Inventory-and-Sales-Management-System',
      liveUrl: 'https://smart-inventory-and-sales-managemen-omega.vercel.app',
      architecture: {
        overview: 'Built for small-to-medium retail businesses needing real-time visibility into product replenishment thresholds, revenue velocity, and supplier orders.',
        highlights: [
          'Real-time low-stock threshold triggers and automatic reorder calculation algorithms.',
          'Interactive sales charts with time-range aggregations (daily, weekly, monthly, annual).',
          'CSV / PDF export engine for instant fiscal report generation.',
          'Clean component architecture with full TypeScript type safety across models and API contracts.'
        ],
        keyMetrics: 'Production deployment | Sub-second state reconciliation'
      }
    },
    {
      id: 'repodoc-ai',
      title: 'RepoDoc AI — GitHub Documentation Assistant',
      category: 'ai',
      badge: 'Cloud & GenAI',
      isLive: false,
      summary: 'AI-powered GitHub Documentation Assistant using Amazon Bedrock foundation models to generate comprehensive architecture docs and READMEs.',
      challenge: 'Parsing complex multi-directory repositories into concise AST representations without exceeding model context limits.',
      stack: ['Python', 'Amazon Bedrock', 'GitHub REST API', 'AST Parsing', 'Markdown', 'LLM'],
      githubUrl: 'https://github.com/riazaslam029/RepoDoc-AI',
      liveUrl: null,
      architecture: {
        overview: 'RepoDoc AI inspects codebases, analyzes language manifests and file dependency graphs, and calls AWS Bedrock foundation models to output production-ready developer docs.',
        highlights: [
          'Recursive GitHub directory crawler with token-budgeting and smart file filtering (.gitignore compliant).',
          'Automated generation of architectural overview diagrams, setup guides, and API endpoint references.',
          'Integrated with Amazon Bedrock API for high-security enterprise LLM invocation.',
          'CLI and web interfaces allowing engineers to document entire repos in one click.'
        ],
        keyMetrics: 'Automates 90% of technical writing | AWS Bedrock integration'
      }
    },
    {
      id: 'dsa-social-platform',
      title: 'C++ DSA Social Platform & Graph Network',
      category: 'systems',
      badge: 'C++ & Algorithms',
      isLive: false,
      summary: 'A 3rd-semester DSA capstone implementing social network algorithms (BFS/DFS graph traversal, custom Hash Tables, and priority queues) in C++ with Qt/SFML.',
      challenge: 'Implementing custom graph data structures and zero-external-library file persistence with high memory efficiency.',
      stack: ['C++', 'Qt', 'SFML', 'Graph Theory', 'Data Structures', 'File I/O'],
      githubUrl: 'https://github.com/riazaslam029/Social-Media-Platform-using-QT-with-Data-Atrucures-concepts-',
      liveUrl: null,
      architecture: {
        overview: 'A deep-dive exploration of computer science fundamentals. This application implements user connections as an undirected weighted graph, friend suggestions via BFS shortest path, and feed ranking via Max-Heaps.',
        highlights: [
          'Custom Graph implementation using Adjacency Lists for friend network mapping and mutual friend detection.',
          'Custom Hash Map with collision handling (chaining) for O(1) average lookup of user profiles.',
          'Priority Queue / Max-Heap for ranking posts by engagement score and timestamp.',
          'Robust binary and formatted file handling for local state persistence without relational databases.'
        ],
        keyMetrics: 'O(V + E) network traversal | Pure C++ algorithmic foundations'
      }
    },
    {
      id: 'ai-disease-diagnosis',
      title: 'AI Disease Prediction & Medication Engine',
      category: 'ai',
      badge: 'Machine Learning',
      isLive: false,
      summary: 'A predictive healthcare diagnosis system using Machine Learning to analyze complex symptom arrays and recommend physician-verified drug protocols.',
      challenge: 'Handling sparse, multi-label symptom matrices while minimizing false-negative diagnostic predictions.',
      stack: ['Python', 'Scikit-Learn', 'Pandas', 'NumPy', 'Healthcare ML'],
      githubUrl: 'https://github.com/riazaslam029/Ai-healthcareSystem-using-symptoms',
      liveUrl: null,
      architecture: {
        overview: 'Engineered as a clinical support prototype that correlates symptoms to potential pathologies using trained classification ensembles, providing preventive guidance.',
        highlights: [
          'Preprocessed high-dimensional symptom datasets with categorical encoding and one-hot matrix transforms.',
          'Trained and benchmarked Decision Trees, Random Forests, and SVMs to maximize diagnostic recall.',
          'Rule-based verification engine cross-referencing contraindications for suggested medications.',
          'Exportable health diagnostic summary reports for healthcare practitioners.'
        ],
        keyMetrics: '95%+ cross-validated classification accuracy on benchmark datasets'
      }
    }
  ];

  /* --------------------------------------------------------------------------
     2. HERO CANVAS PARTICLES MESH (Physics-based constellation network)
     -------------------------------------------------------------------------- */
  class HeroCanvas {
    constructor(canvasId) {
      this.canvas = document.getElementById(canvasId);
      if (!this.canvas) return;
      this.ctx = this.canvas.getContext('2d');
      this.particles = [];
      this.numParticles = window.innerWidth < 640 ? 28 : (window.innerWidth < 768 ? 45 : 85);
      this.maxDistance = window.innerWidth < 640 ? 100 : 140;
      this.mouse = { x: null, y: null, radius: window.innerWidth < 640 ? 110 : 160 };

      this.init();
    }

    init() {
      this.resize();
      window.addEventListener('resize', () => this.resize());

      window.addEventListener('mousemove', (e) => {
        const rect = this.canvas.getBoundingClientRect();
        this.mouse.x = e.clientX - rect.left;
        this.mouse.y = e.clientY - rect.top;
      });

      window.addEventListener('mouseleave', () => {
        this.mouse.x = null;
        this.mouse.y = null;
      });

      window.addEventListener('touchmove', (e) => {
        if (e.touches && e.touches.length > 0) {
          const rect = this.canvas.getBoundingClientRect();
          this.mouse.x = e.touches[0].clientX - rect.left;
          this.mouse.y = e.touches[0].clientY - rect.top;
        }
      }, { passive: true });

      window.addEventListener('touchend', () => {
        this.mouse.x = null;
        this.mouse.y = null;
      }, { passive: true });

      this.createParticles();
      this.animate();
    }

    resize() {
      this.width = this.canvas.width = this.canvas.parentElement.offsetWidth;
      this.height = this.canvas.height = this.canvas.parentElement.offsetHeight;
      this.numParticles = this.width < 640 ? 28 : (this.width < 768 ? 45 : 85);
      this.maxDistance = this.width < 640 ? 100 : 140;
      if (this.particles.length === 0) this.createParticles();
    }

    createParticles() {
      this.particles = [];
      for (let i = 0; i < this.numParticles; i++) {
        this.particles.push({
          x: Math.random() * this.width,
          y: Math.random() * this.height,
          vx: (Math.random() - 0.5) * 0.7,
          vy: (Math.random() - 0.5) * 0.7,
          radius: Math.random() * 2 + 1,
          color: Math.random() > 0.4 ? 'rgba(56, 189, 248, ' : 'rgba(129, 140, 248, '
        });
      }
    }

    animate() {
      this.ctx.clearRect(0, 0, this.width, this.height);

      for (let i = 0; i < this.particles.length; i++) {
        const p = this.particles[i];

        // Move
        p.x += p.vx;
        p.y += p.vy;

        // Bounce off walls
        if (p.x < 0 || p.x > this.width) p.vx *= -1;
        if (p.y < 0 || p.y > this.height) p.vy *= -1;

        // Mouse interaction (gentle repulsion)
        if (this.mouse.x !== null && this.mouse.y !== null) {
          const dx = p.x - this.mouse.x;
          const dy = p.y - this.mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < this.mouse.radius) {
            const force = (this.mouse.radius - dist) / this.mouse.radius;
            p.x += (dx / dist) * force * 3;
            p.y += (dy / dist) * force * 3;
          }
        }

        // Draw particle
        this.ctx.beginPath();
        this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        this.ctx.fillStyle = p.color + '0.7)';
        this.ctx.fill();

        // Connect with nearby particles
        for (let j = i + 1; j < this.particles.length; j++) {
          const p2 = this.particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < this.maxDistance) {
            const alpha = (1 - dist / this.maxDistance) * 0.22;
            this.ctx.beginPath();
            this.ctx.moveTo(p.x, p.y);
            this.ctx.lineTo(p2.x, p2.y);
            this.ctx.strokeStyle = `rgba(56, 189, 248, ${alpha})`;
            this.ctx.lineWidth = 0.8;
            this.ctx.stroke();
          }
        }
      }

      requestAnimationFrame(() => this.animate());
    }
  }

  /* --------------------------------------------------------------------------
     3. THEME MANAGER (Persisted Dark/Light toggle)
     -------------------------------------------------------------------------- */
  class ThemeManager {
    constructor() {
      this.toggleBtn = document.getElementById('themeToggleBtn');
      this.currentTheme = localStorage.getItem('riaz_theme') || 'dark';
      this.init();
    }

    init() {
      document.documentElement.setAttribute('data-theme', this.currentTheme);
      this.updateIcon();

      if (this.toggleBtn) {
        this.toggleBtn.addEventListener('click', () => {
          this.currentTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
          document.documentElement.setAttribute('data-theme', this.currentTheme);
          localStorage.setItem('riaz_theme', this.currentTheme);
          this.updateIcon();
        });
      }
    }

    updateIcon() {
      if (!this.toggleBtn) return;
      if (this.currentTheme === 'light') {
        this.toggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
        this.toggleBtn.setAttribute('aria-label', 'Switch to dark theme');
      } else {
        this.toggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
        this.toggleBtn.setAttribute('aria-label', 'Switch to light theme');
      }
    }
  }

  /* --------------------------------------------------------------------------
     4. PROJECT MANAGER (Filter, Search, and Architecture Deep Dive)
     -------------------------------------------------------------------------- */
  class ProjectManager {
    constructor() {
      this.grid = document.getElementById('projectsGrid');
      this.filterPills = document.querySelectorAll('.filter-pill');
      this.searchInput = document.getElementById('projectSearchInput');
      this.modal = document.getElementById('projectModal');
      this.modalClose = document.getElementById('modalCloseBtn');
      this.modalBackdrop = document.getElementById('projectModalBackdrop');

      this.currentFilter = 'all';
      this.currentQuery = '';

      this.init();
    }

    init() {
      this.render();

      // Filter tabs
      this.filterPills.forEach((pill) => {
        pill.addEventListener('click', () => {
          this.filterPills.forEach((p) => p.classList.remove('active'));
          pill.classList.add('active');
          this.currentFilter = pill.dataset.category;
          this.render();
        });
      });

      // Search input
      if (this.searchInput) {
        this.searchInput.addEventListener('input', (e) => {
          this.currentQuery = e.target.value.trim().toLowerCase();
          this.render();
        });
      }

      // Close modal events
      if (this.modalClose) {
        this.modalClose.addEventListener('click', () => this.closeModal());
      }
      if (this.modalBackdrop) {
        this.modalBackdrop.addEventListener('click', (e) => {
          if (e.target === this.modalBackdrop) this.closeModal();
        });
      }

      window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && this.modalBackdrop && this.modalBackdrop.classList.contains('open')) {
          this.closeModal();
        }
      });
    }

    render() {
      if (!this.grid) return;

      const filtered = FLAGSHIP_PROJECTS.filter((p) => {
        const matchesCategory =
          this.currentFilter === 'all' ||
          (this.currentFilter === 'live' && p.isLive) ||
          p.category === this.currentFilter;

        const matchesQuery =
          this.currentQuery === '' ||
          p.title.toLowerCase().includes(this.currentQuery) ||
          p.summary.toLowerCase().includes(this.currentQuery) ||
          p.stack.some((s) => s.toLowerCase().includes(this.currentQuery));

        return matchesCategory && matchesQuery;
      });

      if (filtered.length === 0) {
        this.grid.innerHTML = `
          <div style="grid-column: 1 / -1; padding: 48px; text-align: center; color: var(--text-muted); background: var(--bg-surface); border-radius: var(--radius-lg); border: 1px dashed var(--border-subtle);">
            <i class="fas fa-folder-open" style="font-size: 2rem; margin-bottom: 12px; display: block; color: var(--accent-cyan);"></i>
            <h4 style="color: var(--text-primary); margin-bottom: 6px;">No matching projects found</h4>
            <p style="font-size: 0.9rem;">Try adjusting your search query or switching to another category filter.</p>
          </div>
        `;
        return;
      }

      this.grid.innerHTML = filtered
        .map((p) => {
          const techBadges = p.stack
            .slice(0, 5)
            .map((t) => `<span class="tech-tag">${t}</span>`)
            .join('');

          return `
            <article class="project-card fade-in-up active" data-id="${p.id}">
              <div>
                <div class="card-badge-row">
                  <span class="project-category-tag">${p.badge}</span>
                  ${
                    p.isLive
                      ? `<span class="project-live-indicator"><span class="pulse-dot"></span> Live Demo</span>`
                      : `<span style="font-size: 0.75rem; color: var(--text-muted);"><i class="fab fa-github"></i> Open Source</span>`
                  }
                </div>

                <h3 class="project-title">${p.title}</h3>
                <p class="project-summary">${p.summary}</p>

                <div class="project-highlight-box">
                  <strong>Engineering Challenge:</strong>
                  ${p.challenge}
                </div>

                <div class="project-tech-tags">
                  ${techBadges}
                  ${p.stack.length > 5 ? `<span class="tech-tag">+${p.stack.length - 5}</span>` : ''}
                </div>
              </div>

              <div class="project-card-actions">
                <button class="btn btn-ghost btn-sm deep-dive-btn" data-id="${p.id}">
                  <i class="fas fa-microchip"></i> Deep Dive
                </button>
                <div style="display: flex; gap: 8px;">
                  <a href="${p.githubUrl}" target="_blank" rel="noopener" class="btn btn-secondary btn-sm" title="View GitHub Source">
                    <i class="fab fa-github"></i> Code
                  </a>
                  ${
                    p.liveUrl
                      ? `<a href="${p.liveUrl}" target="_blank" rel="noopener" class="btn btn-primary btn-sm" title="Open Live Deployment">
                          <i class="fas fa-external-link-alt"></i> Live
                        </a>`
                      : ''
                  }
                </div>
              </div>
            </article>
          `;
        })
        .join('');

      // Wire Deep Dive modal clicks
      this.grid.querySelectorAll('.deep-dive-btn').forEach((btn) => {
        btn.addEventListener('click', () => {
          const id = btn.dataset.id;
          this.openModal(id);
        });
      });
    }

    openModal(projectId) {
      const project = FLAGSHIP_PROJECTS.find((p) => p.id === projectId);
      if (!project) return;

      const titleEl = document.getElementById('modalTitle');
      const badgeEl = document.getElementById('modalBadge');
      const overviewEl = document.getElementById('modalOverview');
      const highlightsEl = document.getElementById('modalHighlights');
      const stackEl = document.getElementById('modalStack');
      const metricsEl = document.getElementById('modalMetrics');
      const codeLinkEl = document.getElementById('modalCodeLink');
      const liveLinkEl = document.getElementById('modalLiveLink');

      if (titleEl) titleEl.textContent = project.title;
      if (badgeEl) badgeEl.textContent = project.badge;
      if (overviewEl) overviewEl.textContent = project.architecture.overview;

      if (highlightsEl) {
        highlightsEl.innerHTML = project.architecture.highlights
          .map(
            (h) => `
            <li class="modal-bullet-item">
              <i class="fas fa-check-circle"></i>
              <span>${h}</span>
            </li>
          `
          )
          .join('');
      }

      if (stackEl) {
        stackEl.innerHTML = project.stack
          .map((t) => `<span class="tech-tag" style="padding: 5px 12px; font-size: 0.8rem;">${t}</span>`)
          .join('');
      }

      if (metricsEl) {
        metricsEl.innerHTML = `
          <div style="background: rgba(56, 189, 248, 0.08); border: 1px solid rgba(56, 189, 248, 0.2); padding: 12px 18px; border-radius: var(--radius-md); color: var(--accent-cyan); font-family: var(--font-mono); font-size: 0.84rem;">
            <i class="fas fa-chart-line" style="margin-right: 8px;"></i> ${project.architecture.keyMetrics}
          </div>
        `;
      }

      if (codeLinkEl) codeLinkEl.href = project.githubUrl;

      if (liveLinkEl) {
        if (project.liveUrl) {
          liveLinkEl.style.display = 'inline-flex';
          liveLinkEl.href = project.liveUrl;
        } else {
          liveLinkEl.style.display = 'none';
        }
      }

      if (this.modalBackdrop) {
        this.modalBackdrop.classList.add('open');
        document.body.style.overflow = 'hidden';
      }
    }

    closeModal() {
      if (this.modalBackdrop) {
        this.modalBackdrop.classList.remove('open');
        document.body.style.overflow = '';
      }
    }
  }

  /* --------------------------------------------------------------------------
     5. INTERACTIVE DEVELOPER CLI / TERMINAL (riaz-cli)
     -------------------------------------------------------------------------- */
  class TerminalCLI {
    constructor() {
      this.dockTrigger = document.getElementById('terminalDockTrigger');
      this.heroTrigger = document.getElementById('heroTerminalBtn');
      this.backdrop = document.getElementById('terminalBackdrop');
      this.closeDot = document.getElementById('terminalCloseDot');
      this.body = document.getElementById('terminalBody');
      this.input = document.getElementById('terminalInput');
      this.historyContainer = document.getElementById('terminalHistory');

      this.commandHistory = [];
      this.historyIndex = -1;

      this.commands = {
        help: () => `
<span class="terminal-line success">Available Commands:</span>
  <span style="color: var(--accent-cyan)">projects</span>   — View flagship engineering projects
  <span style="color: var(--accent-cyan)">skills</span>     — View software engineering tech stack
  <span style="color: var(--accent-cyan)">edu</span>        — COMSATS University & academic record
  <span style="color: var(--accent-cyan)">exp</span>        — Manafa, GDGoC, Loop Lab & Alkhidmat roles
  <span style="color: var(--accent-cyan)">hire</span>       — Why recruiters & tech leads hire Riaz
  <span style="color: var(--accent-cyan)">contact</span>    — Direct email and social links
  <span style="color: var(--accent-cyan)">cat resume</span> — View summary of software engineering resume
  <span style="color: var(--accent-cyan)">theme</span>      — Switch between dark and light modes
  <span style="color: var(--accent-cyan)">clear</span>      — Clear terminal screen
  <span style="color: var(--accent-cyan)">exit</span>       — Close terminal window
        `,

        projects: () => `
<span class="terminal-line success">Flagship Repositories:</span>
1. <span style="color: var(--accent-cyan)">Acadexa AI</span> — AI-powered Academic Management (FastAPI + React + Gemini)
2. <span style="color: var(--accent-cyan)">CacheForge</span> — Embedded Storage Engine (Python, WAL, B-Tree, Crash Recovery)
3. <span style="color: var(--accent-cyan)">Personal AI Study Coach</span> — Live on Vercel (TypeScript, Next.js, React)
4. <span style="color: var(--accent-cyan)">RankPilot AI</span> — Search & Recommendation Engine (XGBoost, DuckDB)
5. <span style="color: var(--accent-cyan)">Smart Inventory System</span> — Live on Vercel (TypeScript, React, Node.js)
6. <span style="color: var(--accent-cyan)">RepoDoc AI</span> — GitHub Documentation Assistant (Amazon Bedrock GenAI)
7. <span style="color: var(--accent-cyan)">C++ DSA Social Network</span> — Custom Graph/Queue implementations (C++, Qt)
<span style="color: var(--text-muted)">Type 'help' for other commands.</span>
        `,

        skills: () => `
<span class="terminal-line success">Technical Competencies:</span>
• <strong style="color: var(--accent-cyan)">Modern Full-Stack:</strong> React, Next.js, Node.js, TypeScript, JavaScript (ES6+), FastAPI, Tailwind CSS, PostgreSQL
• <strong style="color: var(--accent-cyan)">Languages & CS:</strong> Python, C++, Java, SQL, Data Structures & Algorithms (DSA), OOP, Memory Internals
• <strong style="color: var(--accent-cyan)">AI & Machine Learning:</strong> Google Gemini AI API, Amazon Bedrock, Scikit-Learn, XGBoost, DuckDB, Pandas, NumPy
• <strong style="color: var(--accent-cyan)">Systems & Architecture:</strong> Storage Engines (WAL), B-Trees, Graph Theory (BFS/DFS), Microservices, REST APIs
• <strong style="color: var(--accent-cyan)">DevOps & Tooling:</strong> Git, GitHub, Linux, Vercel Edge, Postman, Docker basics
        `,

        edu: () => `
<span class="terminal-line success">Education & Academics:</span>
• <strong>COMSATS University Islamabad (Lahore Campus)</strong>
  BS Software Engineering (2024–2028) | 3rd Year
  Focus: Data Structures, OOP, Software Design, Database Systems
• <strong>KIPS College Lahore</strong>
  Intermediate (FSc Pre-Engineering) | Completed 2023
  Result: 1081 / 1100 Marks (A+ Grade)
        `,

        exp: () => `
<span class="terminal-line success">Leadership & Experience:</span>
• <strong>Campus Ambassador</strong> @ Manafa — 2025–Present
  Leading university outreach, technical advocacy, and student growth programs.
• <strong>Social Co-Lead</strong> @ GDGoC (Google Developer Groups on Campus), COMSATS — Sep 2025–Present
  Spearheading developer community events, technical workshops, and hackathons.
• <strong>Social Media Lead</strong> @ Loop Lab
  Managing technical communication, digital brand storytelling, and developer media.
• <strong>Volunteer Management Intern</strong> @ Alkhidmat Foundation
  Coordinated volunteer operations, social community drives, and logistics.
• <strong>Freelance Technical Storyteller & Video Creator</strong>
        `,

        hire: () => `
<span class="terminal-line success">Why Recruiters Hire Riaz Aslam:</span>
✔ Strong theoretical CS foundations (C++, Data Structures, Storage Internals)
✔ Proven ability to ship production full-stack AI apps (React + Node + FastAPI + Gemini)
✔ Demonstrated campus & community leadership (Manafa Ambassador, GDGoC Co-Lead, Loop Lab Lead)
✔ High academic track record (1081/1100 FSc A+, top tier BSSE)
✔ Ready for Immediate Software Engineering Internships (2026/2027)
        `,

        contact: () => `
<span class="terminal-line success">Direct Channels:</span>
• Email:    <a href="mailto:riazaslam029@gmail.com" style="color: var(--accent-cyan)">riazaslam029@gmail.com</a>
• Phone:    +92 306 7416280
• GitHub:   <a href="https://github.com/riazaslam029" target="_blank" style="color: var(--accent-cyan)">github.com/riazaslam029</a>
• LinkedIn: <a href="https://www.linkedin.com/in/riazaslam/" target="_blank" style="color: var(--accent-cyan)">linkedin.com/in/riazaslam/</a>
        `,

        'cat resume': () => `
<span class="terminal-line success">=== RIAZ ASLAM | SOFTWARE ENGINEERING ===</span>
BSSE @ COMSATS (3rd Year) | Specialization: Full-Stack, AI & Systems Software
Manafa Campus Ambassador | GDGoC Social Co-Lead
Portfolio: https://riazaslam029.github.io/Riaz-Portfolio/
[Resume PDF file is available for instant download in the navigation bar.]
        `,

        theme: () => {
          const html = document.documentElement;
          const cur = html.getAttribute('data-theme') || 'dark';
          const next = cur === 'dark' ? 'light' : 'dark';
          html.setAttribute('data-theme', next);
          localStorage.setItem('riaz_theme', next);
          const tm = new ThemeManager();
          tm.updateIcon();
          return `<span class="terminal-line success">Switched theme to ${next.toUpperCase()} mode.</span>`;
        },

        whoami: () => `<span style="color: var(--accent-emerald)">guest_recruiter@riaz-portfolio:~$</span>`,
        date: () => new Date().toLocaleString(),
        sudo: () => `<span class="terminal-line error">Permission denied: Riaz Aslam already holds root privileges! 😉</span>`,
        clear: () => {
          this.historyContainer.innerHTML = '';
          return null;
        }
      };

      this.init();
    }

    init() {
      if (this.dockTrigger) {
        this.dockTrigger.addEventListener('click', () => this.open());
      }
      if (this.heroTrigger) {
        this.heroTrigger.addEventListener('click', (e) => {
          e.preventDefault();
          this.open();
        });
      }
      if (this.closeDot) {
        this.closeDot.addEventListener('click', () => this.close());
      }
      if (this.backdrop) {
        this.backdrop.addEventListener('click', (e) => {
          if (e.target === this.backdrop) this.close();
        });
      }

      // Quick command chips (one-tap mobile execution)
      document.querySelectorAll('.term-chip').forEach((chip) => {
        chip.addEventListener('click', () => {
          const cmd = chip.dataset.cmd;
          if (cmd) {
            this.handleCommand(cmd);
          }
        });
      });

      if (this.input) {
        this.input.addEventListener('keydown', (e) => {
          if (e.key === 'Enter') {
            this.handleCommand(this.input.value.trim());
          } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (this.commandHistory.length > 0 && this.historyIndex > 0) {
              this.historyIndex--;
              this.input.value = this.commandHistory[this.historyIndex];
            }
          } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (this.historyIndex < this.commandHistory.length - 1) {
              this.historyIndex++;
              this.input.value = this.commandHistory[this.historyIndex];
            } else {
              this.historyIndex = this.commandHistory.length;
              this.input.value = '';
            }
          }
        });
      }
    }

    open() {
      if (this.backdrop) {
        this.backdrop.classList.add('open');
        // On desktop/tablet, autofocus the terminal input; on small phones, avoid jumping the viewport
        if (window.innerWidth >= 768) {
          setTimeout(() => this.input && this.input.focus(), 150);
        }
      }
    }

    close() {
      if (this.backdrop) {
        this.backdrop.classList.remove('open');
      }
    }

    handleCommand(rawCmd) {
      if (!rawCmd) return;
      this.commandHistory.push(rawCmd);
      this.historyIndex = this.commandHistory.length;

      // Echo line
      const echo = document.createElement('div');
      echo.className = 'terminal-line cmd-echo';
      echo.innerHTML = `<span class="terminal-prompt">recruiter@riaz-cli:~$</span> ${escapeHTML(rawCmd)}`;
      this.historyContainer.appendChild(echo);

      this.input.value = '';

      const normalized = rawCmd.toLowerCase();
      if (normalized === 'exit') {
        this.close();
        return;
      }

      let output = null;
      if (this.commands[normalized]) {
        output = this.commands[normalized]();
      } else if (normalized.startsWith('cat resume')) {
        output = this.commands['cat resume']();
      } else {
        output = `<span class="terminal-line error">command not found: '${escapeHTML(rawCmd)}'. Type 'help' for available commands.</span>`;
      }

      if (output !== null) {
        const outDiv = document.createElement('div');
        outDiv.className = 'terminal-line';
        outDiv.innerHTML = output;
        this.historyContainer.appendChild(outDiv);
      }

      if (this.body) {
        this.body.scrollTop = this.body.scrollHeight;
      }
    }
  }

  /* --------------------------------------------------------------------------
     6. GITHUB LIVE SYNC (Excluded specific repos as requested)
     -------------------------------------------------------------------------- */
  const EXCLUDED_REPOS = [
    'fly-rank-ml-assignment1',
    'smart-password-checker',
    'skills-build-applications-w-copilot-agent-mode',
    'badge-repo',
    'first-contributions',
    'login-registration-system',
    'riazaslam029',
    'riaz-portfolio'
  ];

  async function loadGitHubLiveRepos(username = 'riazaslam029') {
    const container = document.getElementById('githubLiveGrid');
    if (!container) return;

    try {
      const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=25`);
      if (!response.ok) throw new Error('Status: ' + response.status);

      const repos = await response.json();
      const validRepos = repos
        .filter((r) => !r.fork && !EXCLUDED_REPOS.includes(r.name.toLowerCase()))
        .slice(0, 6);

      if (validRepos.length === 0) return;

      container.innerHTML = validRepos
        .map((r) => {
          const updatedDate = new Date(r.updated_at).toLocaleDateString('en-US', {
            month: 'short',
            year: 'numeric'
          });

          return `
            <div class="project-card fade-in-up active" style="padding: 22px;">
              <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 10px;">
                <h4 style="font-size: 1.1rem; color: var(--text-primary); font-weight: 700;">
                  <a href="${r.html_url}" target="_blank" rel="noopener" style="color: inherit;">${r.name}</a>
                </h4>
                <span class="project-category-tag">${r.language || 'Code'}</span>
              </div>
              <p style="font-size: 0.86rem; color: var(--text-secondary); line-height: 1.55; margin-bottom: 16px; min-height: 48px;">
                ${r.description || 'Public repository maintained by Riaz Aslam.'}
              </p>
              <div style="display: flex; align-items: center; justify-content: space-between; font-size: 0.78rem; color: var(--text-muted); border-top: 1px solid var(--border-subtle); padding-top: 12px;">
                <span>★ ${r.stargazers_count || 0} stars</span>
                <span>Updated ${updatedDate}</span>
                <a href="${r.html_url}" target="_blank" rel="noopener" style="color: var(--accent-cyan); font-weight: 600;">
                  Inspect &rarr;
                </a>
              </div>
            </div>
          `;
        })
        .join('');
    } catch (e) {
      console.warn('GitHub API sync note:', e.message);
    }
  }

  /* --------------------------------------------------------------------------
     7. CONTACT MANAGER (1-click copy email & Formspree / Mailto pipeline)
     -------------------------------------------------------------------------- */
  class ContactManager {
    constructor() {
      this.copyBtns = document.querySelectorAll('.copy-email-btn');
      this.toast = document.getElementById('toastNotice');
      this.form = document.getElementById('contactForm');
      this.statusMsg = document.getElementById('formStatusMsg');

      this.init();
    }

    init() {
      this.copyBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
          const email = btn.dataset.email || 'riazaslam029@gmail.com';
          navigator.clipboard.writeText(email).then(() => {
            this.showToast('Copied to clipboard: ' + email);
          });
        });
      });

      if (this.form) {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
      }
    }

    showToast(message) {
      if (!this.toast) return;
      this.toast.innerHTML = `<i class="fas fa-check-circle" style="color: var(--accent-emerald)"></i> ${message}`;
      this.toast.classList.add('visible');
      setTimeout(() => {
        this.toast.classList.remove('visible');
      }, 3500);
    }

    handleSubmit(e) {
      e.preventDefault();
      const form = this.form;
      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const message = form.message.value.trim();

      if (!name || !email || !message) {
        this.showFormStatus('Please complete all required fields.', 'error');
        return;
      }

      const endpoint = window.CONTACT_CONFIG?.formspreeEndpoint;

      if (endpoint) {
        this.showFormStatus('Transmitting your message securely...', 'success');
        const formData = new FormData(form);

        fetch(endpoint, {
          method: 'POST',
          headers: { Accept: 'application/json' },
          body: formData
        })
          .then((res) => {
            if (res.ok) {
              this.showFormStatus('Message received! Riaz will respond within 24 hours.', 'success');
              form.reset();
            } else {
              this.fallbackMailto(name, email, message);
            }
          })
          .catch(() => {
            this.fallbackMailto(name, email, message);
          });
      } else {
        this.fallbackMailto(name, email, message);
      }
    }

    fallbackMailto(name, email, message) {
      this.showFormStatus('Launching your email client to send message...', 'success');
      const subject = encodeURIComponent(`Software Engineering Inquiry from ${name}`);
      const body = encodeURIComponent(
        `Hi Riaz,\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}\n\n---\nSent from your portfolio website.`
      );
      setTimeout(() => {
        window.location.href = `mailto:riazaslam029@gmail.com?subject=${subject}&body=${body}`;
        this.form.reset();
      }, 800);
    }

    showFormStatus(text, type) {
      if (!this.statusMsg) return;
      this.statusMsg.textContent = text;
      this.statusMsg.className = `form-status-msg show ${type}`;
    }
  }

  /* --------------------------------------------------------------------------
     8. SCROLL OBSERVER & NAVIGATION
     -------------------------------------------------------------------------- */
  function initScrollAndNav() {
    const reveals = document.querySelectorAll('.fade-in-up');
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((en) => {
            if (en.isIntersecting) {
              en.target.classList.add('active');
            }
          });
        },
        { threshold: 0.12 }
      );
      reveals.forEach((el) => observer.observe(el));
    } else {
      reveals.forEach((el) => el.classList.add('active'));
    }

    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
      let current = '';
      sections.forEach((sec) => {
        const top = sec.offsetTop - 120;
        if (window.scrollY >= top) {
          current = sec.getAttribute('id');
        }
      });

      navLinks.forEach((link) => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
          link.classList.add('active');
        }
      });
    });

    const mobileBtn = document.getElementById('mobileMenuBtn');
    const drawer = document.getElementById('mobileNavDrawer');
    if (mobileBtn && drawer) {
      mobileBtn.addEventListener('click', () => {
        drawer.classList.toggle('open');
      });
      drawer.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
          drawer.classList.remove('open');
        });
      });
    }

    const yearEl = document.getElementById('yearSpan');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
  }

  function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, (tag) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag));
  }

  /* --------------------------------------------------------------------------
     9. ENTRY POINT
     -------------------------------------------------------------------------- */
  document.addEventListener('DOMContentLoaded', () => {
    new HeroCanvas('heroCanvas');
    new ThemeManager();
    new ProjectManager();
    new TerminalCLI();
    new ContactManager();
    initScrollAndNav();
    loadGitHubLiveRepos('riazaslam029');
  });
})();

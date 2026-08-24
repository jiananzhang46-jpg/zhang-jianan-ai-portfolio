const header = document.querySelector("[data-header]");
const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");
const navLinks = [...document.querySelectorAll(".nav a")];
const progress = document.querySelector(".scroll-progress");
const reveals = [...document.querySelectorAll(".reveal")];
const heroButtons = [...document.querySelectorAll("[data-hero-project]")];
const heroImages = [...document.querySelectorAll("[data-hero-image]")];
const heroCaption = document.querySelector("[data-hero-caption]");
const hero = document.querySelector(".hero");
const heroPlay = document.querySelector("[data-hero-play]");
const modal = document.querySelector("[data-video-modal]");
const modalVideo = document.querySelector("[data-modal-video]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalStage = document.querySelector("[data-modal-stage]");
const modalCount = document.querySelector("[data-modal-count]");
const playButtons = [...document.querySelectorAll("[data-play-project]")];
const closeButtons = [...document.querySelectorAll("[data-close-video]")];
const previousVideo = document.querySelector("[data-video-prev]");
const nextVideo = document.querySelector("[data-video-next]");
const filterButtons = [...document.querySelectorAll("[data-project-filter]")];
const projectCards = [...document.querySelectorAll("[data-project-card]")];
const filterStatus = document.querySelector("[data-filter-status]");
const pipelineButtons = [...document.querySelectorAll("[data-pipeline-step]")];
const pipelineFocus = document.querySelector(".pipeline-focus");
const pipelineNumber = document.querySelector("[data-pipeline-number]");
const pipelineTitle = document.querySelector("[data-pipeline-title]");
const pipelineCopy = document.querySelector("[data-pipeline-copy]");
const pipelineOutput = document.querySelector("[data-pipeline-output]");
const pipelineRule = document.querySelector("[data-pipeline-rule]");
const backToTop = document.querySelector("[data-back-to-top]");
const magneticItems = [...document.querySelectorAll("[data-magnetic]")];
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");

const projects = {
  wutong: {
    title: "《错将真心落梧桐》",
    src: "assets/portfolio-series/wutong.mp4",
    poster: "assets/portfolio-series/wutong-poster.jpg",
    portrait: true,
  },
  dragon: {
    title: "《天降龙宝》",
    src: "assets/portfolio-series/dragon.mp4",
    poster: "assets/portfolio-series/dragon-poster.jpg",
    portrait: true,
  },
  heiress: {
    title: "《团宠假千金杀疯京圈》",
    src: "assets/portfolio-series/heiress.mp4",
    poster: "assets/portfolio-series/heiress-poster.jpg",
    portrait: true,
  },
  breakingDoor: {
    title: "《破门》",
    src: "assets/portfolio-series/breaking-door.mp4",
    poster: "assets/portfolio-series/breaking-door-poster.jpg",
    portrait: true,
  },
  undercover: {
    title: "《重回深渊：卧底女王》",
    src: "assets/portfolio-series/undercover.mp4",
    poster: "assets/portfolio-series/undercover-poster.jpg",
    portrait: true,
  },
  game: {
    title: "《高考落榜后，我把游戏物资带回现实》38—40 集高光",
    src: "assets/red-portfolio/game-inventory.mp4",
    poster: "assets/red-portfolio/game-inventory-poster.jpg",
    portrait: false,
  },
};

const heroCaptions = [
  "《错将真心落梧桐》/ 年代情感连续漫剧",
  "《重回深渊：卧底女王》/ 犯罪悬疑女主剧",
  "《游戏物资带回现实》/ 第 38—40 集高光",
];

const heroProjectIds = ["wutong", "undercover", "game"];
const projectOrder = Object.keys(projects);
const pipelineContent = [
  {
    number: "01",
    title: "剧本全量扫描",
    copy: "按集、场、时段、内外景与剧情功能拆开剧本，区分实际入镜地点和台词提及地点，确保没有漏场或重复建设。",
    output: "场次清单 · 人物关系 · 高光节点 · 风险项",
    rule: "每一个实际入镜场次都有明确资产归属",
  },
  {
    number: "02",
    title: "资产分级与复用规划",
    copy: "按剧情关键性、出现频率、表演复杂度和世界观辨识度进行 S／A／B／C 分级，同一地点合并管理，并拆出必要的昼夜与状态变体。",
    output: "资产总表 · 优先级 · 子资产清单 · 复用矩阵",
    rule: "不虚增核心资产，不把不同功能空间错误合并",
  },
  {
    number: "03",
    title: "角色与场景视觉锚定",
    copy: "建立角色多视角设定、服装与道具基准；场景锁定空间结构、真实材质、统一色彩和 3—5 个跨图一致性锚点。",
    output: "Character Sheet · 场景主视角 · 道具资产 · 风格圣经",
    rule: "人物身份、服装、道具尺寸、空间结构与光向可连续复现",
  },
  {
    number: "04",
    title: "分镜设计与空间调度",
    copy: "根据表演区和行动路线安排景别、机位、焦段与人物站位；对话镜头遵守 180° 轴线，正反打共享同一空间逻辑。",
    output: "镜头表 · 站位图 · 正反打背景 · 运镜与节奏方案",
    rule: "门窗、光源、陈设和人物方向不越轴、不跳变",
  },
  {
    number: "05",
    title: "动态生成与版本筛选",
    copy: "围绕表演、动作、镜头运动和首尾帧连续性拆成可执行小段；完整对话尽量留在同段，通过版本对比保留真正服务剧情的结果。",
    output: "分段时长表 · 动态镜头 · 表演版本 · 问题回修单",
    rule: "不截断语义，不变脸、不穿模、不漂移，不使用无动机运镜",
  },
  {
    number: "06",
    title: "剪辑、声音与成片验收",
    copy: "完成节奏重组、对白与音效、字幕和画幅适配，并逐镜复查人物、道具、空间和情绪连续性，形成可发布版本。",
    output: "完整成片 · 字幕版 · 平台适配版 · 项目归档",
    rule: "叙事清楚、声音准确、字幕无误、跨镜头连续",
  },
];

let activeHero = 0;
let heroTimer;
let activeProjectId = projectOrder[0];
let lastVideoTrigger = null;
let heroPointerStart = null;

function setHero(index) {
  activeHero = (index + heroButtons.length) % heroButtons.length;
  heroButtons.forEach((button, buttonIndex) => {
    const active = buttonIndex === activeHero;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", String(active));
  });
  heroImages.forEach((image, imageIndex) => {
    image.classList.toggle("is-active", imageIndex === activeHero);
  });
  if (heroCaption) heroCaption.textContent = heroCaptions[activeHero];
  if (heroPlay) {
    heroPlay.dataset.playProject = heroProjectIds[activeHero];
    heroPlay.setAttribute("aria-label", `播放${heroCaptions[activeHero].split("/")[0]}`);
  }
}

function startHeroTimer() {
  if (reducedMotion.matches || heroButtons.length < 2) return;
  window.clearInterval(heroTimer);
  heroTimer = window.setInterval(() => {
    setHero((activeHero + 1) % heroButtons.length);
  }, 5200);
}

heroButtons.forEach((button, index) => {
  button.setAttribute("aria-pressed", String(index === 0));
  button.addEventListener("click", () => {
    setHero(index);
    startHeroTimer();
  });
});

heroPlay?.addEventListener("click", () => {
  lastVideoTrigger = heroPlay;
  openVideo(heroProjectIds[activeHero]);
});

hero?.addEventListener("pointerenter", () => window.clearInterval(heroTimer));
hero?.addEventListener("pointerleave", () => {
  heroPointerStart = null;
  startHeroTimer();
});

hero?.addEventListener("pointerdown", (event) => {
  if (event.target.closest("button, a")) return;
  heroPointerStart = { x: event.clientX, y: event.clientY };
});

hero?.addEventListener("pointerup", (event) => {
  if (!heroPointerStart || event.target.closest("button, a")) return;
  const deltaX = event.clientX - heroPointerStart.x;
  const deltaY = event.clientY - heroPointerStart.y;
  heroPointerStart = null;
  if (Math.abs(deltaX) < 52 || Math.abs(deltaX) < Math.abs(deltaY)) return;
  setHero(activeHero + (deltaX < 0 ? 1 : -1));
});

function updateScrollState() {
  const y = window.scrollY;
  header?.classList.toggle("is-scrolled", y > 24);
  backToTop?.classList.toggle("is-visible", y > window.innerHeight * 0.8);
  if (progress) {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = `${max > 0 ? (y / max) * 100 : 0}%`;
  }
}

function closeMenu() {
  nav?.classList.remove("is-open");
  menuToggle?.setAttribute("aria-expanded", "false");
}

menuToggle?.addEventListener("click", () => {
  const open = !nav?.classList.contains("is-open");
  nav?.classList.toggle("is-open", open);
  menuToggle.setAttribute("aria-expanded", String(open));
});

navLinks.forEach((link) => link.addEventListener("click", closeMenu));

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  },
  { threshold: 0.12, rootMargin: "0px 0px -7% 0px" },
);

reveals.forEach((item) => {
  if (item.matches(".series-card, .asset-card")) {
    const siblings = [...item.parentElement.children];
    item.style.transitionDelay = `${(siblings.indexOf(item) % 4) * 70}ms`;
  }
  if (reducedMotion.matches) item.classList.add("is-visible");
  else revealObserver.observe(item);
});

const statItems = [...document.querySelectorAll(".manifesto-detail dt")];
const statsPanel = document.querySelector(".manifesto-detail dl");

function animateStats() {
  statItems.forEach((item) => {
    const original = item.textContent.trim();
    const target = Number.parseInt(original, 10);
    if (!Number.isFinite(target)) return;
    const suffix = original.replace(/\d/g, "");
    const pad = original.startsWith("0") ? original.match(/^\d+/)?.[0].length || 0 : 0;
    const duration = 1250;
    const start = performance.now();

    function frame(now) {
      const progressValue = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progressValue, 3);
      const value = Math.round(target * eased);
      item.textContent = `${pad ? String(value).padStart(pad, "0") : value}${suffix}`;
      if (progressValue < 1) requestAnimationFrame(frame);
    }

    requestAnimationFrame(frame);
  });
}

if (statsPanel && !reducedMotion.matches) {
  const statsObserver = new IntersectionObserver(
    (entries, observer) => {
      if (!entries.some((entry) => entry.isIntersecting)) return;
      animateStats();
      observer.disconnect();
    },
    { threshold: 0.45 },
  );
  statsObserver.observe(statsPanel);
}

const observedSections = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

const navObserver = new IntersectionObserver(
  (entries) => {
    const activeEntry = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (!activeEntry) return;
    navLinks.forEach((link) => {
      const active = link.getAttribute("href") === `#${activeEntry.target.id}`;
      link.classList.toggle("is-active", active);
      if (active) link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    });
  },
  { rootMargin: "-28% 0px -58% 0px", threshold: [0, 0.25, 0.6] },
);

observedSections.forEach((section) => navObserver.observe(section));

function applyProjectFilter(filter) {
  let visibleCount = 0;
  projectCards.forEach((card) => {
    const visible = filter === "all" || card.dataset.category === filter;
    card.classList.toggle("is-filtered-out", !visible);
    card.classList.remove("is-filter-enter");
    if (!visible) return;
    visibleCount += 1;
    requestAnimationFrame(() => card.classList.add("is-filter-enter"));
  });
  filterButtons.forEach((button) => {
    const active = button.dataset.projectFilter === filter;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", String(active));
  });
  if (filterStatus) filterStatus.textContent = `正在展示 ${visibleCount} 部作品`;
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => applyProjectFilter(button.dataset.projectFilter));
});

function setPipelineStep(index) {
  const content = pipelineContent[index];
  if (!content) return;
  pipelineButtons.forEach((button, buttonIndex) => {
    const active = buttonIndex === index;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-selected", String(active));
    button.tabIndex = active ? 0 : -1;
  });
  if (!pipelineFocus || !pipelineNumber || !pipelineTitle || !pipelineCopy || !pipelineOutput || !pipelineRule) return;
  pipelineFocus.classList.remove("is-changing");
  void pipelineFocus.offsetWidth;
  pipelineNumber.textContent = content.number;
  pipelineTitle.textContent = content.title;
  pipelineCopy.textContent = content.copy;
  pipelineOutput.textContent = content.output;
  pipelineRule.textContent = content.rule;
  pipelineFocus.classList.add("is-changing");
}

pipelineButtons.forEach((button, index) => {
  button.addEventListener("click", () => setPipelineStep(index));
  button.addEventListener("keydown", (event) => {
    if (!["ArrowLeft", "ArrowRight"].includes(event.key)) return;
    event.preventDefault();
    const direction = event.key === "ArrowRight" ? 1 : -1;
    const nextIndex = (index + direction + pipelineButtons.length) % pipelineButtons.length;
    setPipelineStep(nextIndex);
    pipelineButtons[nextIndex].focus();
  });
});

function openVideo(projectId) {
  const project = projects[projectId];
  if (!project || !modal || !modalVideo) return;

  activeProjectId = projectId;
  const projectIndex = projectOrder.indexOf(projectId);
  modalTitle.textContent = project.title;
  if (modalCount) modalCount.textContent = `${String(projectIndex + 1).padStart(2, "0")} / ${String(projectOrder.length).padStart(2, "0")}`;
  modalStage?.classList.add("is-switching");
  modalVideo.pause();
  modalVideo.src = project.src;
  modalVideo.poster = project.poster;
  modalStage?.classList.toggle("is-portrait", project.portrait);
  modal.hidden = false;
  document.body.classList.add("is-modal-open");
  window.setTimeout(() => modalStage?.classList.remove("is-switching"), 180);
  modal.querySelector("button[data-close-video]")?.focus();

  const playRequest = modalVideo.play();
  if (playRequest) playRequest.catch(() => {});
}

function switchVideo(direction) {
  const currentIndex = projectOrder.indexOf(activeProjectId);
  const nextIndex = (currentIndex + direction + projectOrder.length) % projectOrder.length;
  openVideo(projectOrder[nextIndex]);
}

function closeVideo() {
  if (!modal || !modalVideo) return;
  modalVideo.pause();
  modalVideo.removeAttribute("src");
  modalVideo.load();
  modal.hidden = true;
  document.body.classList.remove("is-modal-open");
  lastVideoTrigger?.focus();
}

playButtons.forEach((button) => {
  button.addEventListener("click", () => {
    lastVideoTrigger = button;
    openVideo(button.dataset.playProject);
  });
});

closeButtons.forEach((button) => button.addEventListener("click", closeVideo));
previousVideo?.addEventListener("click", () => switchVideo(-1));
nextVideo?.addEventListener("click", () => switchVideo(1));
backToTop?.addEventListener("click", () => window.scrollTo({ top: 0, behavior: reducedMotion.matches ? "auto" : "smooth" }));

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    if (!modal?.hidden) closeVideo();
    closeMenu();
  }
  if (!modal?.hidden && event.key === "ArrowLeft") switchVideo(-1);
  if (!modal?.hidden && event.key === "ArrowRight") switchVideo(1);
  if (!modal?.hidden && event.key === "Tab") {
    const focusable = [...modal.querySelectorAll("button, video, [href], [tabindex]:not([tabindex='-1'])")]
      .filter((item) => !item.disabled);
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }
});

if (finePointer.matches && !reducedMotion.matches) {
  document.body.classList.add("has-fine-pointer");
  let pointerFrame = null;
  let latestPointer = { x: window.innerWidth * 0.72, y: window.innerHeight * 0.28 };

  document.addEventListener(
    "pointermove",
    (event) => {
      latestPointer = { x: event.clientX, y: event.clientY };
      if (pointerFrame) return;
      pointerFrame = requestAnimationFrame(() => {
        document.documentElement.style.setProperty("--pointer-x", `${latestPointer.x}px`);
        document.documentElement.style.setProperty("--pointer-y", `${latestPointer.y}px`);
        if (hero) {
          const x = (latestPointer.x / window.innerWidth - 0.5) * 18;
          const y = (latestPointer.y / window.innerHeight - 0.5) * 12;
          hero.style.setProperty("--hero-shift-x", `${x}px`);
          hero.style.setProperty("--hero-shift-y", `${y}px`);
        }
        pointerFrame = null;
      });
    },
    { passive: true },
  );

  projectCards.forEach((card) => {
    const media = card.querySelector(".series-media");
    card.addEventListener("pointermove", (event) => {
      const bounds = card.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width;
      const y = (event.clientY - bounds.top) / bounds.height;
      card.style.setProperty("--card-x", `${x * 100}%`);
      card.style.setProperty("--card-y", `${y * 100}%`);
      media?.style.setProperty("--tilt-x", `${(x - 0.5) * 4}deg`);
      media?.style.setProperty("--tilt-y", `${(0.5 - y) * 4}deg`);
    });
    card.addEventListener("pointerleave", () => {
      media?.style.setProperty("--tilt-x", "0deg");
      media?.style.setProperty("--tilt-y", "0deg");
    });
  });

  magneticItems.forEach((item) => {
    item.addEventListener("pointermove", (event) => {
      const bounds = item.getBoundingClientRect();
      const x = event.clientX - (bounds.left + bounds.width / 2);
      const y = event.clientY - (bounds.top + bounds.height / 2);
      item.style.translate = `${x * 0.12}px ${y * 0.12}px`;
    });
    item.addEventListener("pointerleave", () => {
      item.style.translate = "0 0";
    });
  });
}

window.addEventListener("scroll", updateScrollState, { passive: true });
window.addEventListener("resize", updateScrollState);
document.querySelector("[data-year]").textContent = new Date().getFullYear();

setHero(0);
setPipelineStep(0);
startHeroTimer();
updateScrollState();

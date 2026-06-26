const header = document.querySelector("[data-header]");
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = [...document.querySelectorAll(".nav a")];
const canvas = document.querySelector("[data-motion-canvas]");
const ctx = canvas?.getContext("2d");
const hero = document.querySelector("[data-hero]");
const tiltCard = document.querySelector("[data-tilt-card]");
const heroImage = document.querySelector("[data-hero-image]");
const workVideo = document.querySelector("[data-work-video]");
const posterCards = [...document.querySelectorAll("[data-project-button]")];
const workButtons = [...document.querySelectorAll("[data-work-select]")];
const videoModal = document.querySelector("[data-video-modal]");
const videoPlayer = document.querySelector("[data-video-player]");
const videoTitle = document.querySelector("[data-video-title]");
const galleryModal = document.querySelector("[data-gallery-modal]");
const galleryImage = document.querySelector("[data-gallery-image]");
const galleryTitle = document.querySelector("[data-gallery-title]");
const galleryCaption = document.querySelector("[data-gallery-caption]");
const galleryPosition = document.querySelector("[data-gallery-position]");
const galleryThumbs = document.querySelector("[data-gallery-thumbs]");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");

const projects = [
  {
    title: "《哪吒》动态短片",
    category: "神话 / 角色动态",
    copy: "东方神话角色动态短片，强调角色能量、镜头推进和神话视觉冲击。",
    poster: "assets/poster-project-nezha.jpg",
    video: "assets/videos/project-nezha.mp4",
  },
  {
    title: "《妲己》画面片段",
    category: "水墨 / 幻想叙事",
    copy: "以东方幻想和水墨质感构建妲己角色的神秘、危险与情绪张力。",
    poster: "assets/poster-project-daji.jpg",
    video: "assets/videos/project-daji.mp4",
  },
  {
    title: "《猫狗》剧情片段",
    category: "萌宠 / 生活喜剧",
    copy: "轻喜剧方向的 AI 漫剧片段，侧重节奏、表演和可爱的生活感。",
    poster: "assets/poster-project-pets.jpg",
    video: "assets/videos/project-pets.mp4",
  },
  {
    title: "《椅子》产品短片",
    category: "产品 / 动态广告",
    copy: "把产品展示转化成动态镜头语言，兼顾商品质感和广告节奏。",
    poster: "assets/poster-project-chair.jpg",
    video: "assets/videos/project-chair.mp4",
  },
  {
    title: "《真人短片》剧情片段",
    category: "真人 / 情绪叙事",
    copy: "真人剧情向 AI 影像尝试，突出人物关系、情绪推进和现实质感。",
    poster: "assets/poster-project-liveaction.jpg",
    video: "assets/videos/project-liveaction.mp4",
  },
  {
    title: "《CPS 六轮滚轮仪》产品视频",
    category: "产品 / CPS 展示",
    copy: "以产品实拍与动态展示突出套装结构、使用场景和商品质感。",
    poster: "assets/poster-project-cps-six-wheel.png",
    video: "assets/videos/cps-six-wheel-roller-kit-web.mp4",
  },
  {
    title: "《天降龙宝》剧情片段",
    category: "短剧 / 情绪叙事",
    copy: "竖屏短剧片段，强化人物冲突、情绪推进和移动端观看节奏。",
    poster: "assets/poster-project-dragon-baby.png",
    video: "assets/videos/dragon-baby-1111.mp4",
  },
];

const galleries = {
  golden: {
    title: "《金色》视觉设定",
    items: [
      { src: "assets/settings/golden-character.jpg", alt: "二郎显圣真君角色三视图", caption: "人物设定 / 二郎显圣真君三视图" },
      { src: "assets/settings/golden-world.jpg", alt: "金色项目仙界场景", caption: "场景设定 / 仙界世界观" },
      { src: "assets/settings/golden-prop.jpg", alt: "金色项目神话角色与法器设定", caption: "角色与道具 / 神话体系延展" },
    ],
  },
  monks: {
    title: "《小道士与小和尚》设定",
    items: [
      { src: "assets/settings/monks-scene.jpg", alt: "灯火古镇场景设定", caption: "场景设定 / 灯火古镇" },
      { src: "assets/settings/monks-character.jpg", alt: "小道士人物设定", caption: "人物设定 / 小道士定妆" },
      { src: "assets/settings/monks-prop.jpg", alt: "小道士与小和尚关键道具", caption: "道具设定 / 故事关键物件" },
    ],
  },
  cyber: {
    title: "《赛博废土机能风》设定",
    items: [
      { src: "assets/settings/cyber-scene.jpg", alt: "赛博废土城市场景", caption: "场景设定 / 城市废墟" },
      { src: "assets/settings/cyber-character.jpg", alt: "赛博废土战士人物设定", caption: "人物设定 / 废土战士" },
      { src: "assets/settings/cyber-engineer.jpg", alt: "赛博废土工程师人物设定", caption: "人物设定 / 工程师" },
    ],
  },
  youyou: {
    title: "《悠悠我心》设定",
    items: [
      { src: "assets/settings/youyou-character.jpg", alt: "悠悠我心女主角人物设定", caption: "人物设定 / 宗清漪" },
      { src: "assets/settings/youyou-partner.jpg", alt: "悠悠我心男主角人物设定", caption: "人物设定 / 李白" },
      { src: "assets/settings/youyou-scene.jpg", alt: "悠悠我心故事场景图", caption: "场景设定 / 情绪氛围" },
    ],
  },
  wedding: {
    title: "《结婚》设定",
    items: [
      { src: "assets/settings/wedding-scene.jpg", alt: "结婚项目婚房场景", caption: "场景设定 / 婚礼空间氛围" },
      { src: "assets/settings/wedding-character.jpg", alt: "结婚项目新娘人物设定", caption: "人物设定 / 新娘" },
      { src: "assets/settings/wedding-partner.jpg", alt: "结婚项目男主人物设定", caption: "人物设定 / 男主" },
    ],
  },
  girl: {
    title: "《丫头也好命》设定",
    items: [
      { src: "assets/settings/girl-character.jpg", alt: "丫头也好命女主人物设定", caption: "人物设定 / 女主" },
      { src: "assets/settings/girl-support.jpg", alt: "丫头也好命二丫人物设定", caption: "人物设定 / 二丫" },
      { src: "assets/settings/girl-scene.jpg", alt: "丫头也好命房屋内部场景", caption: "场景设定 / 房屋内部" },
    ],
  },
};

let activeProject = 0;
let activeGallery = null;
let activeGalleryIndex = 0;
let videoTrigger = null;
let galleryTrigger = null;
let autoTimer = null;
let strengthTimer = null;
let critterTimer = null;
let canvasFrame = null;
let lastHeroSrc = projects[0].poster;

document.querySelector("#year").textContent = new Date().getFullYear();

function allowsMotion() {
  return !reducedMotion.matches;
}

function wrapProject(index) {
  return (index + projects.length) % projects.length;
}

function setText(selector, value) {
  const node = document.querySelector(selector);
  if (node) node.textContent = value;
}

function centerPosterCard() {
  const card = posterCards[activeProject];
  const strip = card?.parentElement;
  if (!card || !strip) return;
  const target = card.offsetLeft - (strip.clientWidth - card.clientWidth) / 2;
  strip.scrollTo({ left: Math.max(target, 0), behavior: allowsMotion() ? "smooth" : "auto" });
}

function setActiveProject(index, options = {}) {
  activeProject = wrapProject(index);
  const project = projects[activeProject];

  if (heroImage && project.poster !== lastHeroSrc) {
    heroImage.style.opacity = "0";
    window.setTimeout(() => {
      heroImage.src = project.poster;
      heroImage.alt = `${project.title}海报`;
      heroImage.style.opacity = "1";
      lastHeroSrc = project.poster;
    }, allowsMotion() ? 120 : 0);
  }

  setText("[data-active-index]", `${String(activeProject + 1).padStart(2, "0")} / ${String(projects.length).padStart(2, "0")}`);
  setText("[data-active-title]", project.title);
  setText("[data-active-copy]", project.copy);
  setText("[data-work-category]", project.category);
  setText("[data-work-title]", project.title);
  setText("[data-work-copy]", project.copy);

  if (workVideo) {
    if (workVideo.getAttribute("src") !== project.video) {
      workVideo.poster = project.poster;
      workVideo.src = project.video;
      workVideo.load();
    } else {
      workVideo.poster = project.poster;
    }
    if (allowsMotion()) workVideo.play().catch(() => {});
  }

  posterCards.forEach((card) => {
    const isActive = Number(card.dataset.projectButton) === activeProject;
    card.classList.toggle("is-active", isActive);
    card.setAttribute("aria-pressed", String(isActive));
  });

  workButtons.forEach((button) => {
    const isActive = Number(button.dataset.workSelect) === activeProject;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  if (options.centerPoster) centerPosterCard();
}

function startAutoLoop() {
  window.clearInterval(autoTimer);
  if (!allowsMotion()) return;
  autoTimer = window.setInterval(() => setActiveProject(activeProject + 1), 4600);
}

function openVideo(projectIndex, trigger) {
  const project = projects[wrapProject(projectIndex)];
  videoTrigger = trigger || document.activeElement;
  videoTitle.textContent = project.title;
  videoPlayer.poster = project.poster;
  videoPlayer.src = project.video;
  videoModal.hidden = false;
  document.body.classList.add("modal-open");
  window.requestAnimationFrame(() => videoModal.classList.add("is-open"));
  videoPlayer.load();
  videoPlayer.play().catch(() => {});
  videoModal.querySelector(".close-button").focus();
}

function closeVideo() {
  if (videoModal.hidden) return;
  videoPlayer.pause();
  videoModal.classList.remove("is-open");
  document.body.classList.remove("modal-open");
  window.setTimeout(() => {
    videoPlayer.removeAttribute("src");
    videoPlayer.load();
    videoModal.hidden = true;
    videoTrigger?.focus();
  }, allowsMotion() ? 220 : 0);
}

function renderGallery() {
  if (!activeGallery) return;
  const item = activeGallery.items[activeGalleryIndex];
  galleryTitle.textContent = activeGallery.title;
  galleryImage.src = item.src;
  galleryImage.alt = item.alt;
  galleryCaption.textContent = item.caption;
  galleryPosition.textContent = `${String(activeGalleryIndex + 1).padStart(2, "0")} / ${String(activeGallery.items.length).padStart(2, "0")}`;

  const thumbs = activeGallery.items.map((thumb, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `gallery-thumb${index === activeGalleryIndex ? " is-current" : ""}`;
    button.setAttribute("aria-label", `查看第 ${index + 1} 张：${thumb.caption}`);

    const image = document.createElement("img");
    image.src = thumb.src;
    image.alt = "";
    image.loading = "lazy";
    button.append(image);

    button.addEventListener("click", () => {
      activeGalleryIndex = index;
      renderGallery();
    });

    return button;
  });

  galleryThumbs.replaceChildren(...thumbs);
}

function openGallery(button) {
  activeGallery = galleries[button.dataset.gallery];
  if (!activeGallery) return;
  activeGalleryIndex = 0;
  galleryTrigger = button;
  renderGallery();
  galleryModal.hidden = false;
  document.body.classList.add("modal-open");
  window.requestAnimationFrame(() => galleryModal.classList.add("is-open"));
  galleryModal.querySelector(".close-button").focus();
}

function closeGallery() {
  if (galleryModal.hidden) return;
  galleryModal.classList.remove("is-open");
  document.body.classList.remove("modal-open");
  window.setTimeout(() => {
    galleryImage.removeAttribute("src");
    galleryModal.hidden = true;
    galleryTrigger?.focus();
  }, allowsMotion() ? 220 : 0);
}

function changeGallery(offset) {
  if (!activeGallery) return;
  activeGalleryIndex = (activeGalleryIndex + offset + activeGallery.items.length) % activeGallery.items.length;
  renderGallery();
}

function updateHeader() {
  header.classList.toggle("is-scrolled", window.scrollY > 12);
}

function updateScrollProgress() {
  const maxScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
  document.documentElement.style.setProperty("--scroll-progress", String(window.scrollY / maxScroll));
}

function updateNavigation() {
  const marker = window.scrollY + window.innerHeight * 0.42;
  let activeLink = navLinks[0];

  navLinks.forEach((link) => {
    const section = document.querySelector(link.hash);
    if (section && section.offsetTop <= marker) activeLink = link;
  });

  navLinks.forEach((link) => {
    const isActive = link === activeLink;
    link.classList.toggle("is-current", isActive);
    if (isActive) link.setAttribute("aria-current", "location");
    else link.removeAttribute("aria-current");
  });
}

function setupReveal() {
  const targets = [...document.querySelectorAll(".reveal-item")];
  targets.forEach((target, index) => {
    target.style.setProperty("--delay", `${Math.min(index % 5, 4) * 65}ms`);
  });

  if (!allowsMotion() || !("IntersectionObserver" in window)) {
    targets.forEach((target) => target.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { rootMargin: "0px 0px -10% 0px", threshold: 0.12 },
  );

  targets.forEach((target) => observer.observe(target));
}

function resizeCanvas() {
  if (!canvas || !ctx) return;
  const ratio = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = Math.floor(canvas.clientWidth * ratio);
  canvas.height = Math.floor(canvas.clientHeight * ratio);
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
}

function drawAmbient(time) {
  if (!canvas || !ctx || !allowsMotion()) return;
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  ctx.clearRect(0, 0, width, height);

  for (let i = 0; i < 11; i += 1) {
    const base = height * (0.12 + i * 0.084);
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.strokeStyle = `rgba(186, 255, 31, ${0.13 - i * 0.007})`;
    for (let x = -80; x <= width + 80; x += 40) {
      const y = base + Math.sin(x * 0.008 + time * 0.0007 + i) * 16 + Math.cos(time * 0.00038 + i) * 26;
      if (x === -80) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();
  }

  for (let i = 0; i < 54; i += 1) {
    const x = (i * 131 + time * 0.026) % (width + 140) - 70;
    const y = (Math.sin(i * 2.2 + time * 0.00078) * 0.36 + 0.52) * height;
    ctx.fillStyle = i % 5 === 0 ? "rgba(186, 255, 31, 0.58)" : "rgba(245, 245, 238, 0.18)";
    ctx.fillRect(x, y, i % 5 === 0 ? 3 : 2, i % 5 === 0 ? 3 : 2);
  }

  canvasFrame = window.requestAnimationFrame(drawAmbient);
}

function startCanvas() {
  if (!canvas || !ctx) return;
  window.cancelAnimationFrame(canvasFrame);
  resizeCanvas();
  if (allowsMotion()) canvasFrame = window.requestAnimationFrame(drawAmbient);
}

function setupTilt() {
  if (!hero || !tiltCard) return;

  hero.addEventListener("pointermove", (event) => {
    if (!finePointer.matches || !allowsMotion()) return;
    const rect = tiltCard.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    tiltCard.style.setProperty("--ry", `${x * 8}deg`);
    tiltCard.style.setProperty("--rx", `${y * -8}deg`);
  });

  hero.addEventListener("pointerleave", () => {
    tiltCard.style.setProperty("--ry", "0deg");
    tiltCard.style.setProperty("--rx", "0deg");
  });
}

function setupPointerEffects() {
  if (!finePointer.matches || !allowsMotion()) return;
  const glow = document.querySelector(".cursor-glow");

  window.addEventListener("pointermove", (event) => {
    document.body.style.setProperty("--cursor-x", `${event.clientX}px`);
    document.body.style.setProperty("--cursor-y", `${event.clientY}px`);
    if (glow) glow.style.opacity = "1";

    if (hero) {
      const x = (event.clientX / window.innerWidth - 0.5) * 14;
      const y = (event.clientY / window.innerHeight - 0.5) * 10;
      hero.style.setProperty("--parallax-x", `${x}px`);
      hero.style.setProperty("--parallax-y", `${y}px`);
    }
  }, { passive: true });

  document.addEventListener("pointerleave", () => {
    if (glow) glow.style.opacity = "0";
  });
}

function setupInteractiveSurfaces() {
  const surfaces = [
    ...document.querySelectorAll(".poster-card, .collage-tile, .gallery-card, .strength-card, .work-detail, .portrait-card, .contact-card"),
  ];

  surfaces.forEach((surface) => {
    surface.addEventListener("pointermove", (event) => {
      if (!finePointer.matches || !allowsMotion()) return;
      const rect = surface.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / rect.height) * 100;
      surface.style.setProperty("--spot-x", `${x}%`);
      surface.style.setProperty("--spot-y", `${y}%`);
    }, { passive: true });
  });
}

function setupClickRipples() {
  document.addEventListener("click", (event) => {
    if (!allowsMotion()) return;
    const target = event.target.closest("a, button");
    if (!target) return;
    const ripple = document.createElement("span");
    ripple.className = "fx-ripple";
    ripple.style.left = `${event.clientX}px`;
    ripple.style.top = `${event.clientY}px`;
    document.body.append(ripple);
    ripple.addEventListener("animationend", () => ripple.remove(), { once: true });
  });
}

function setupStrengthLoop() {
  const cards = [...document.querySelectorAll(".strength-card")];
  if (!cards.length || !allowsMotion()) return;
  let index = 0;

  function pulseNext() {
    cards.forEach((card, cardIndex) => card.classList.toggle("is-pulsing", cardIndex === index));
    index = (index + 1) % cards.length;
  }

  window.clearInterval(strengthTimer);
  pulseNext();
  strengthTimer = window.setInterval(pulseNext, 1800);
}

function spawnCritter() {
  if (!allowsMotion()) return;
  const layer = document.querySelector(".critter-layer");
  if (!layer || document.body.classList.contains("modal-open")) return;

  const types = ["cat", "rabbit", "bird", "fox"];
  const type = types[Math.floor(Math.random() * types.length)];
  const side = Math.random() > 0.5 ? "right" : "left";
  const critter = document.createElement("span");
  critter.className = `side-critter ${type} is-${side}`;
  critter.style.setProperty("--critter-top", `${18 + Math.random() * 64}%`);
  critter.innerHTML = '<span class="critter-body"><span class="critter-face"></span><span class="critter-tail"></span></span>';
  layer.append(critter);
  critter.addEventListener("animationend", () => critter.remove(), { once: true });
}

function setupCritters() {
  window.clearInterval(critterTimer);
  document.querySelectorAll(".side-critter").forEach((critter) => critter.remove());
  if (!allowsMotion()) return;
  window.setTimeout(spawnCritter, 900);
  critterTimer = window.setInterval(spawnCritter, 6500);
}

menuToggle.addEventListener("click", () => {
  const isOpen = header.classList.toggle("menu-open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    header.classList.remove("menu-open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

posterCards.forEach((card) => {
  card.addEventListener("click", () => {
    setActiveProject(Number(card.dataset.projectButton), { centerPoster: true });
    startAutoLoop();
  });
});

workButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setActiveProject(Number(button.dataset.workSelect), { centerPoster: true });
    startAutoLoop();
  });
});

document.querySelector("[data-play-current]").addEventListener("click", (event) => openVideo(activeProject, event.currentTarget));
document.querySelector("[data-open-work]").addEventListener("click", (event) => openVideo(activeProject, event.currentTarget));
document.querySelector("[data-open-work-preview]")?.addEventListener("click", (event) => openVideo(activeProject, event.currentTarget));

document.querySelectorAll("[data-gallery]").forEach((button) => {
  button.addEventListener("click", () => openGallery(button));
});

document.querySelectorAll("[data-close-video]").forEach((button) => button.addEventListener("click", closeVideo));
document.querySelectorAll("[data-close-gallery]").forEach((button) => button.addEventListener("click", closeGallery));
document.querySelector("[data-gallery-prev]").addEventListener("click", () => changeGallery(-1));
document.querySelector("[data-gallery-next]").addEventListener("click", () => changeGallery(1));

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    if (!galleryModal.hidden) closeGallery();
    else if (!videoModal.hidden) closeVideo();
  }
  if (!galleryModal.hidden && event.key === "ArrowLeft") changeGallery(-1);
  if (!galleryModal.hidden && event.key === "ArrowRight") changeGallery(1);
});

window.addEventListener("scroll", () => {
  updateHeader();
  updateNavigation();
  updateScrollProgress();
}, { passive: true });

window.addEventListener("resize", resizeCanvas, { passive: true });

reducedMotion.addEventListener("change", () => {
  startCanvas();
  startAutoLoop();
  setupStrengthLoop();
  setupCritters();
});

setActiveProject(0);
setupReveal();
setupTilt();
setupPointerEffects();
setupInteractiveSurfaces();
setupClickRipples();
setupStrengthLoop();
setupCritters();
startCanvas();
startAutoLoop();
updateHeader();
updateNavigation();
updateScrollProgress();

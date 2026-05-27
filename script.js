const header = document.querySelector("[data-header]");
const menuToggle = document.querySelector(".menu-toggle");
const menuLinks = document.querySelectorAll(".site-nav a");
const modal = document.querySelector("[data-video-modal]");
const player = document.querySelector("[data-video-player]");
const videoTitle = document.querySelector("[data-video-title]");
const closeButtons = document.querySelectorAll("[data-close-video]");
const galleryModal = document.querySelector("[data-gallery-modal]");
const galleryImage = document.querySelector("[data-gallery-image]");
const galleryTitle = document.querySelector("[data-gallery-title]");
const galleryCaption = document.querySelector("[data-gallery-caption]");
const galleryPosition = document.querySelector("[data-gallery-position]");
const galleryThumbs = document.querySelector("[data-gallery-thumbs]");
const galleryCloseButtons = document.querySelectorAll("[data-close-gallery]");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
const hero = document.querySelector(".hero");
const magneticActions = document.querySelectorAll(".header-action, .button, .contact-links a");
const galleries = {
  golden: {
    title: "《金色》视觉设定",
    items: [
      { src: "assets/settings/golden-character.jpg", alt: "二郎显圣真君角色三视图", caption: "人物设定 · 二郎显圣真君三视图" },
      { src: "assets/settings/golden-world.jpg", alt: "金色项目仙界场景", caption: "场景设定 · 仙界世界观" },
      { src: "assets/settings/golden-prop.jpg", alt: "金色项目神话角色与法器设定", caption: "角色与道具 · 神话体系延展" },
    ],
  },
  monks: {
    title: "《小道士与小和尚》设定",
    items: [
      { src: "assets/settings/monks-scene.jpg", alt: "灯火古镇的场景设计", caption: "场景设定 · 灯火古镇" },
      { src: "assets/settings/monks-character.jpg", alt: "小道士定妆人物设定", caption: "人物设定 · 小道士定妆" },
      { src: "assets/settings/monks-prop.jpg", alt: "小道士与小和尚关键道具", caption: "道具设定 · 故事关键物件" },
    ],
  },
  cyber: {
    title: "《赛博废土机能风》设定",
    items: [
      { src: "assets/settings/cyber-scene.jpg", alt: "赛博废土城市废墟场景", caption: "场景设定 · 城市废墟" },
      { src: "assets/settings/cyber-character.jpg", alt: "赛博废土战士人物设定", caption: "人物设定 · 废土战士" },
      { src: "assets/settings/cyber-engineer.jpg", alt: "赛博废土工程师人物设定", caption: "人物设定 · 工程师" },
    ],
  },
  youyou: {
    title: "《悠悠我心》设定",
    items: [
      { src: "assets/settings/youyou-character.jpg", alt: "悠悠我心女主角人物设定", caption: "人物设定 · 宗清婉" },
      { src: "assets/settings/youyou-partner.jpg", alt: "悠悠我心男主角人物设定", caption: "人物设定 · 李白" },
      { src: "assets/settings/youyou-scene.jpg", alt: "悠悠我心故事场景图", caption: "场景设定 · 情绪氛围" },
    ],
  },
  wedding: {
    title: "《结婚》设定",
    items: [
      { src: "assets/settings/wedding-character.jpg", alt: "结婚项目新娘人物设定", caption: "人物设定 · 新娘" },
      { src: "assets/settings/wedding-partner.jpg", alt: "结婚项目男主人物设定", caption: "人物设定 · 男主" },
      { src: "assets/settings/wedding-scene.jpg", alt: "结婚项目喜房场景", caption: "场景设定 · 喜房" },
    ],
  },
  girl: {
    title: "《丫头也好命》设定",
    items: [
      { src: "assets/settings/girl-character.jpg", alt: "丫头也好命女主人物设定", caption: "人物设定 · 女主" },
      { src: "assets/settings/girl-support.jpg", alt: "丫头也好命二丫人物设定", caption: "人物设定 · 二丫" },
      { src: "assets/settings/girl-scene.jpg", alt: "丫头也好命房屋内部场景", caption: "场景设定 · 房屋内部" },
    ],
  },
};
let trigger = null;
let closeTimer = null;
let galleryTrigger = null;
let galleryCloseTimer = null;
let activeGallery = null;
let activeGalleryIndex = 0;
let scrollFrame = null;

document.querySelector("#year").textContent = new Date().getFullYear();

function allowsMotion() {
  return !reducedMotion.matches;
}

function syncMotionPreference() {
  document.documentElement.classList.toggle("motion-enabled", allowsMotion());
  if (!allowsMotion()) {
    document.documentElement.style.removeProperty("--hero-offset");
    resetHeroPointerMotion();
    resetMagneticActions();
    document.querySelectorAll(".reveal").forEach((element) => element.classList.add("is-visible"));
  }
}

function updateHeader() {
  header.classList.toggle("is-scrolled", window.scrollY > 24);
}

function updateScrollProgress() {
  const availableScroll = document.documentElement.scrollHeight - window.innerHeight;
  const progress = availableScroll > 0 ? Math.min(window.scrollY / availableScroll, 1) : 0;
  document.documentElement.style.setProperty("--page-progress", progress.toFixed(4));
}

function updateHeroMotion() {
  if (!allowsMotion()) {
    return;
  }
  const offset = Math.min(window.scrollY * 0.055, 34);
  document.documentElement.style.setProperty("--hero-offset", `${offset}px`);
}

function updateNavigation() {
  const marker = window.scrollY + window.innerHeight * 0.42;
  let activeLink = null;
  menuLinks.forEach((link) => {
    const section = document.querySelector(link.hash);
    if (section && section.offsetTop <= marker) {
      activeLink = link;
    }
  });

  menuLinks.forEach((link) => {
    const isActive = link === activeLink;
    link.classList.toggle("is-current", isActive);
    if (isActive) {
      link.setAttribute("aria-current", "location");
    } else {
      link.removeAttribute("aria-current");
    }
  });
}

function onScroll() {
  updateHeader();
  updateNavigation();
  updateScrollProgress();
  if (scrollFrame !== null) {
    return;
  }
  scrollFrame = window.requestAnimationFrame(() => {
    updateHeroMotion();
    scrollFrame = null;
  });
}

function resetHeroPointerMotion() {
  if (!hero) {
    return;
  }
  hero.classList.remove("is-interactive");
  hero.style.removeProperty("--hero-pan-x");
  hero.style.removeProperty("--hero-pan-y");
  hero.style.removeProperty("--spotlight-x");
  hero.style.removeProperty("--spotlight-y");
}

function setupHeroPointerMotion() {
  if (!hero) {
    return;
  }
  hero.addEventListener("pointermove", (event) => {
    if (!finePointer.matches || !allowsMotion()) {
      return;
    }
    const bounds = hero.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width;
    const y = (event.clientY - bounds.top) / bounds.height;
    hero.classList.add("is-interactive");
    hero.style.setProperty("--spotlight-x", `${x * 100}%`);
    hero.style.setProperty("--spotlight-y", `${y * 100}%`);
    hero.style.setProperty("--hero-pan-x", `${(x - 0.5) * -8}px`);
    hero.style.setProperty("--hero-pan-y", `${(y - 0.5) * -5}px`);
  });
  hero.addEventListener("pointerleave", resetHeroPointerMotion);
}

function resetMagneticActions() {
  magneticActions.forEach((element) => {
    element.style.removeProperty("--magnetic-x");
    element.style.removeProperty("--magnetic-y");
  });
}

function setupMagneticActions() {
  magneticActions.forEach((element) => {
    element.addEventListener("pointermove", (event) => {
      if (!finePointer.matches || !allowsMotion()) {
        return;
      }
      const bounds = element.getBoundingClientRect();
      const x = event.clientX - bounds.left - bounds.width / 2;
      const y = event.clientY - bounds.top - bounds.height / 2;
      element.style.setProperty("--magnetic-x", `${x * 0.12}px`);
      element.style.setProperty("--magnetic-y", `${y * 0.16}px`);
    });
    element.addEventListener("pointerleave", () => {
      element.style.removeProperty("--magnetic-x");
      element.style.removeProperty("--magnetic-y");
    });
  });
}

function closeMenu() {
  header.classList.remove("menu-open");
  menuToggle.setAttribute("aria-expanded", "false");
}

function setupRevealAnimations() {
  const groups = [
    ".shortcuts .shortcut",
    ".about-artwork, .about .section-heading, .about-body",
    ".films .section-heading, .film-card",
    ".workflow-artwork, .workflow .section-heading, .method-grid article",
    ".design .section-heading, .design-card",
    ".resume .section-heading, .timeline-item",
    ".contact-panel",
    ".site-footer",
  ];
  const targets = [];

  groups.forEach((selector) => {
    document.querySelectorAll(selector).forEach((element, index) => {
      element.classList.add("reveal");
      element.style.setProperty("--reveal-delay", `${Math.min(index, 5) * 58}ms`);
      targets.push(element);
    });
  });

  if (!allowsMotion() || !("IntersectionObserver" in window)) {
    targets.forEach((element) => element.classList.add("is-visible"));
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
    { rootMargin: "0px 0px -9% 0px", threshold: 0.12 },
  );

  targets.forEach((element) => observer.observe(element));
}

function setupCounterAnimation() {
  const container = document.querySelector(".facts");
  if (!container) {
    return;
  }

  const counters = [...container.querySelectorAll("strong")].flatMap((element) => {
    const match = element.textContent.trim().match(/^(\d+)(.*)$/);
    if (!match) {
      return [];
    }
    return [{ element, target: Number(match[1]), suffix: match[2], width: match[1].length }];
  });

  function animateCounters() {
    if (!allowsMotion()) {
      return;
    }
    counters.forEach(({ element, target, suffix, width }) => {
      if (element.dataset.animated) {
        return;
      }
      element.dataset.animated = "true";
      const start = performance.now();
      const duration = 920;
      const render = (time) => {
        const progress = Math.min((time - start) / duration, 1);
        const eased = 1 - (1 - progress) ** 3;
        const number = Math.round(target * eased).toString().padStart(width, "0");
        element.textContent = `${number}${suffix}`;
        if (progress < 1) {
          window.requestAnimationFrame(render);
        }
      };
      window.requestAnimationFrame(render);
    });
  }

  if (!allowsMotion() || !("IntersectionObserver" in window)) {
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        animateCounters();
        observer.disconnect();
      }
    },
    { threshold: 0.38 },
  );
  observer.observe(container);
}

function setupFilmCardMotion() {
  document.querySelectorAll(".film-card").forEach((card) => {
    card.addEventListener("pointermove", (event) => {
      if (!finePointer.matches || !allowsMotion()) {
        return;
      }
      const bounds = card.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width;
      const y = (event.clientY - bounds.top) / bounds.height;
      card.style.setProperty("--glow-x", `${x * 100}%`);
      card.style.setProperty("--glow-y", `${y * 100}%`);
      card.style.setProperty("--tilt-x", `${(0.5 - y) * 3.2}deg`);
      card.style.setProperty("--tilt-y", `${(x - 0.5) * 3.2}deg`);
    });

    card.addEventListener("pointerleave", () => {
      card.style.removeProperty("--glow-x");
      card.style.removeProperty("--glow-y");
      card.style.removeProperty("--tilt-x");
      card.style.removeProperty("--tilt-y");
    });
  });
}

function openVideo(button) {
  window.clearTimeout(closeTimer);
  trigger = button;
  videoTitle.textContent = button.dataset.title;
  player.poster = button.dataset.poster;
  player.src = button.dataset.video;
  modal.hidden = false;
  document.body.classList.add("modal-open");
  window.requestAnimationFrame(() => modal.classList.add("is-open"));
  player.load();
  player.play().catch(() => {});
  modal.querySelector(".close-button").focus();
}

function finishClosingVideo() {
  player.removeAttribute("src");
  player.load();
  modal.hidden = true;
  trigger?.focus();
}

function closeVideo() {
  if (modal.hidden) {
    return;
  }
  player.pause();
  modal.classList.remove("is-open");
  document.body.classList.remove("modal-open");
  if (!allowsMotion()) {
    finishClosingVideo();
    return;
  }
  closeTimer = window.setTimeout(finishClosingVideo, 240);
}

function renderGallery() {
  const item = activeGallery.items[activeGalleryIndex];
  galleryImage.src = item.src;
  galleryImage.alt = item.alt;
  galleryTitle.textContent = activeGallery.title;
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
  window.clearTimeout(galleryCloseTimer);
  galleryTrigger = button;
  activeGallery = galleries[button.dataset.gallery];
  activeGalleryIndex = 0;
  renderGallery();
  galleryModal.hidden = false;
  document.body.classList.add("modal-open");
  window.requestAnimationFrame(() => galleryModal.classList.add("is-open"));
  galleryModal.querySelector(".close-button").focus();
}

function finishClosingGallery() {
  galleryImage.removeAttribute("src");
  galleryModal.hidden = true;
  galleryTrigger?.focus();
}

function closeGallery() {
  if (galleryModal.hidden) {
    return;
  }
  galleryModal.classList.remove("is-open");
  document.body.classList.remove("modal-open");
  if (!allowsMotion()) {
    finishClosingGallery();
    return;
  }
  galleryCloseTimer = window.setTimeout(finishClosingGallery, 240);
}

function changeGallery(offset) {
  if (!activeGallery) {
    return;
  }
  activeGalleryIndex = (activeGalleryIndex + offset + activeGallery.items.length) % activeGallery.items.length;
  renderGallery();
}

menuToggle.addEventListener("click", () => {
  const isOpen = header.classList.toggle("menu-open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

menuLinks.forEach((link) => link.addEventListener("click", closeMenu));
window.addEventListener("scroll", onScroll, { passive: true });
reducedMotion.addEventListener("change", syncMotionPreference);
window.addEventListener("resize", onScroll, { passive: true });

document.querySelectorAll("[data-video]").forEach((button) => {
  button.addEventListener("click", () => openVideo(button));
});

closeButtons.forEach((button) => button.addEventListener("click", closeVideo));

document.querySelectorAll("[data-gallery]").forEach((button) => {
  button.addEventListener("click", () => openGallery(button));
});

galleryCloseButtons.forEach((button) => button.addEventListener("click", closeGallery));
document.querySelector("[data-gallery-prev]").addEventListener("click", () => changeGallery(-1));
document.querySelector("[data-gallery-next]").addEventListener("click", () => changeGallery(1));

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    if (!galleryModal.hidden) {
      closeGallery();
    } else if (!modal.hidden) {
      closeVideo();
    }
  }
  if (!galleryModal.hidden && event.key === "ArrowLeft") {
    changeGallery(-1);
  }
  if (!galleryModal.hidden && event.key === "ArrowRight") {
    changeGallery(1);
  }
});

syncMotionPreference();
setupRevealAnimations();
setupCounterAnimation();
setupFilmCardMotion();
setupHeroPointerMotion();
setupMagneticActions();
onScroll();

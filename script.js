const header = document.querySelector("[data-header]");
const menuToggle = document.querySelector(".menu-toggle");
const menuLinks = document.querySelectorAll(".site-nav a");
const modal = document.querySelector("[data-video-modal]");
const player = document.querySelector("[data-video-player]");
const videoTitle = document.querySelector("[data-video-title]");
const closeButtons = document.querySelectorAll("[data-close-video]");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
let trigger = null;
let closeTimer = null;
let scrollFrame = null;

document.querySelector("#year").textContent = new Date().getFullYear();

function allowsMotion() {
  return !reducedMotion.matches;
}

function syncMotionPreference() {
  document.documentElement.classList.toggle("motion-enabled", allowsMotion());
  if (!allowsMotion()) {
    document.documentElement.style.removeProperty("--hero-offset");
    document.querySelectorAll(".reveal").forEach((element) => element.classList.add("is-visible"));
  }
}

function updateHeader() {
  header.classList.toggle("is-scrolled", window.scrollY > 24);
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
  if (scrollFrame !== null) {
    return;
  }
  scrollFrame = window.requestAnimationFrame(() => {
    updateHeroMotion();
    scrollFrame = null;
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

menuToggle.addEventListener("click", () => {
  const isOpen = header.classList.toggle("menu-open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

menuLinks.forEach((link) => link.addEventListener("click", closeMenu));
window.addEventListener("scroll", onScroll, { passive: true });
reducedMotion.addEventListener("change", syncMotionPreference);

document.querySelectorAll("[data-video]").forEach((button) => {
  button.addEventListener("click", () => openVideo(button));
});

closeButtons.forEach((button) => button.addEventListener("click", closeVideo));

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !modal.hidden) {
    closeVideo();
  }
});

syncMotionPreference();
setupRevealAnimations();
setupCounterAnimation();
setupFilmCardMotion();
onScroll();

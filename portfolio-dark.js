const header = document.querySelector("[data-header]");
const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");
const navLinks = [...document.querySelectorAll(".nav a")];
const progress = document.querySelector(".scroll-progress");
const reveals = [...document.querySelectorAll(".reveal")];
const heroButtons = [...document.querySelectorAll("[data-hero-project]")];
const heroImages = [...document.querySelectorAll("[data-hero-image]")];
const heroCaption = document.querySelector("[data-hero-caption]");
const modal = document.querySelector("[data-video-modal]");
const modalVideo = document.querySelector("[data-modal-video]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalStage = document.querySelector("[data-modal-stage]");
const playButtons = [...document.querySelectorAll("[data-play-project]")];
const closeButtons = [...document.querySelectorAll("[data-close-video]")];
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

const projects = {
  wealth: {
    title: "《千万家产试真情》",
    src: "assets/red-portfolio/million-estate.mp4",
    poster: "assets/red-portfolio/million-estate-poster.jpg",
    portrait: true,
  },
  game: {
    title: "《高考落榜后，我把游戏物资带回现实》38—40 集高光",
    src: "assets/red-portfolio/game-inventory.mp4",
    poster: "assets/red-portfolio/game-inventory-poster.jpg",
    portrait: false,
  },
  dragon: {
    title: "《分手后，天降龙宝带我制霸四海》概念短片",
    src: "assets/red-portfolio/dragon-baby.mp4",
    poster: "assets/red-portfolio/dragon-baby-poster.jpg",
    portrait: true,
  },
};

const heroCaptions = [
  "《千万家产试真情》/ 44 集现实情感漫剧",
  "《游戏物资带回现实》/ 第 38—40 集高光",
  "《天降龙宝》/ 都市幻想竖屏短片",
];

let activeHero = 0;
let heroTimer;

function setHero(index) {
  activeHero = index;
  heroButtons.forEach((button, buttonIndex) => {
    const active = buttonIndex === index;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", String(active));
  });
  heroImages.forEach((image, imageIndex) => {
    image.classList.toggle("is-active", imageIndex === index);
  });
  if (heroCaption) heroCaption.textContent = heroCaptions[index];
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

function updateScrollState() {
  const y = window.scrollY;
  header?.classList.toggle("is-scrolled", y > 24);
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
  if (reducedMotion.matches) item.classList.add("is-visible");
  else revealObserver.observe(item);
});

function openVideo(projectId) {
  const project = projects[projectId];
  if (!project || !modal || !modalVideo) return;

  modalTitle.textContent = project.title;
  modalVideo.src = project.src;
  modalVideo.poster = project.poster;
  modalStage?.classList.toggle("is-portrait", project.portrait);
  modal.hidden = false;
  document.body.classList.add("is-modal-open");
  modalVideo.focus();

  const playRequest = modalVideo.play();
  if (playRequest) playRequest.catch(() => {});
}

function closeVideo() {
  if (!modal || !modalVideo) return;
  modalVideo.pause();
  modalVideo.removeAttribute("src");
  modalVideo.load();
  modal.hidden = true;
  document.body.classList.remove("is-modal-open");
}

playButtons.forEach((button) => {
  button.addEventListener("click", () => openVideo(button.dataset.playProject));
});

closeButtons.forEach((button) => button.addEventListener("click", closeVideo));

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    if (!modal?.hidden) closeVideo();
    closeMenu();
  }
});

window.addEventListener("scroll", updateScrollState, { passive: true });
window.addEventListener("resize", updateScrollState);
document.querySelector("[data-year]").textContent = new Date().getFullYear();

setHero(0);
startHeroTimer();
updateScrollState();

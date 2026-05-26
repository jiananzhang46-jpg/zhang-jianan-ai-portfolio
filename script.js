const header = document.querySelector("[data-header]");
const menuToggle = document.querySelector(".menu-toggle");
const menuLinks = document.querySelectorAll(".site-nav a");
const modal = document.querySelector("[data-video-modal]");
const player = document.querySelector("[data-video-player]");
const videoTitle = document.querySelector("[data-video-title]");
const closeButtons = document.querySelectorAll("[data-close-video]");
let trigger = null;

document.querySelector("#year").textContent = new Date().getFullYear();

function updateHeader() {
  header.classList.toggle("is-scrolled", window.scrollY > 24);
}

function closeMenu() {
  header.classList.remove("menu-open");
  menuToggle.setAttribute("aria-expanded", "false");
}

menuToggle.addEventListener("click", () => {
  const isOpen = header.classList.toggle("menu-open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

menuLinks.forEach((link) => link.addEventListener("click", closeMenu));
window.addEventListener("scroll", updateHeader, { passive: true });
updateHeader();

function openVideo(button) {
  trigger = button;
  videoTitle.textContent = button.dataset.title;
  player.poster = button.dataset.poster;
  player.src = button.dataset.video;
  modal.hidden = false;
  document.body.classList.add("modal-open");
  player.load();
  player.play().catch(() => {});
  modal.querySelector(".close-button").focus();
}

function closeVideo() {
  player.pause();
  player.removeAttribute("src");
  player.load();
  modal.hidden = true;
  document.body.classList.remove("modal-open");
  trigger?.focus();
}

document.querySelectorAll("[data-video]").forEach((button) => {
  button.addEventListener("click", () => openVideo(button));
});

closeButtons.forEach((button) => button.addEventListener("click", closeVideo));

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !modal.hidden) {
    closeVideo();
  }
});

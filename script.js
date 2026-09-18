const waMessage = "Vim do site e gostaria de saber mais sobre as consultas da Nutri Anna Waleska.";

/* Ajuste 02 — a origem do visitante (UTM) define qual link da Tintim os botões
   de WhatsApp usam. O visual, o texto e a posição dos botões não mudam:
   muda apenas o destino (href). Sem UTM reconhecida, mantém o link padrão. */
const tintimBase = "https://tintim.link/whatsapp/dd13be2e-477f-4631-a830-a0a6e9837a21/";
const waLinks = {
  instagram_bio: tintimBase + "a004cde9-7e33-488c-9e11-f527de87c225",
  meta_ads: tintimBase + "e1b1ae47-2e17-4d43-bfeb-caa40514d977",
  google_ads: tintimBase + "c966b600-39a9-449f-b415-f5b72ebe84c8",
  google_profile: tintimBase + "eb5c2031-7893-491a-870c-a4b4841df48f"
};
const waDefaultLink = waLinks.instagram_bio;

function resolveWhatsAppOrigin(source, medium) {
  source = (source || "").trim().toLowerCase();
  medium = (medium || "").trim().toLowerCase();
  if (source === "instagram" && medium === "organic") return "instagram_bio";
  if (source === "meta" && medium === "paid_social") return "meta_ads";
  if (source === "google" && medium === "cpc") return "google_ads";
  if (source === "google" && medium === "organic") return "google_profile";
  return null;
}

function currentWhatsAppOrigin() {
  const params = new URLSearchParams(location.search);
  const fromUrl = resolveWhatsAppOrigin(params.get("utm_source"), params.get("utm_medium"));
  try {
    if (fromUrl) {
      sessionStorage.setItem("wa_origin", fromUrl);
      return fromUrl;
    }
    const stored = sessionStorage.getItem("wa_origin");
    if (stored && waLinks[stored]) return stored;
  } catch (error) {
    if (fromUrl) return fromUrl;
  }
  return null;
}

const waOrigin = currentWhatsAppOrigin();
const wa = `${waOrigin ? waLinks[waOrigin] : waDefaultLink}?text=${encodeURIComponent(waMessage)}`;
const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

document.querySelectorAll("[data-wa]").forEach(link => {
  link.href = wa;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
});

const progress = document.getElementById("scrollProgress");
const header = document.getElementById("siteHeader");
function updateScrollUI() {
  const max = document.documentElement.scrollHeight - innerHeight;
  progress.style.width = `${max ? scrollY / max * 100 : 0}%`;
  header.classList.toggle("scrolled", scrollY > 10);
}
addEventListener("scroll", updateScrollUI, { passive: true });
updateScrollUI();

const menuToggle = document.getElementById("menuToggle");
const mobileNav = document.getElementById("mobileNav");
const navBackdrop = document.getElementById("navBackdrop");
function setNavOpen(open) {
  mobileNav.classList.toggle("open", open);
  navBackdrop.classList.toggle("open", open);
  menuToggle.setAttribute("aria-expanded", open);
  document.body.classList.toggle("nav-open", open);
}
menuToggle.addEventListener("click", () => setNavOpen(!mobileNav.classList.contains("open")));
navBackdrop.addEventListener("click", () => setNavOpen(false));
mobileNav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => setNavOpen(false)));
addEventListener("keydown", event => { if (event.key === "Escape") setNavOpen(false); });

const reveals = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window && !reduced) {
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  }), { threshold: .08 });
  reveals.forEach(element => observer.observe(element));
} else {
  reveals.forEach(element => element.classList.add("visible"));
}

document.querySelectorAll(".faq-item").forEach(item => {
  const button = item.querySelector("button");
  button.addEventListener("click", () => {
    const wasOpen = item.classList.contains("open");
    document.querySelectorAll(".faq-item").forEach(other => {
      other.classList.remove("open");
      other.querySelector("button").setAttribute("aria-expanded", "false");
    });
    if (!wasOpen) {
      item.classList.add("open");
      button.setAttribute("aria-expanded", "true");
    }
  });
});

const viewport = document.getElementById("resultsViewport");
const track = document.getElementById("resultsTrack");
const resultCards = [...track.children];
const previous = document.querySelector(".carousel .prev");
const next = document.querySelector(".carousel .next");
const counter = document.getElementById("resultsCounter");
const dots = document.getElementById("resultsDots");
let resultIndex = 0;
let touchStart = 0;
let resultTimer;

resultCards.forEach((_, index) => {
  const dot = document.createElement("button");
  dot.ariaLabel = `Ir para o resultado ${index + 1}`;
  dot.addEventListener("click", () => goToResult(index, true));
  dots.appendChild(dot);
});

const visibleResults = () => innerWidth <= 720 ? 1 : innerWidth <= 1000 ? 2 : 3;
function renderResults() {
  const maximum = Math.max(0, resultCards.length - visibleResults());
  resultIndex = Math.min(resultIndex, maximum);
  const cardWidth = resultCards[0].getBoundingClientRect().width;
  track.style.transform = `translate3d(-${resultIndex * (cardWidth + 20)}px,0,0)`;
  counter.textContent = `${resultIndex + 1} / ${resultCards.length}`;
  [...dots.children].forEach((dot, index) => dot.classList.toggle("active", index === resultIndex));
}
function goToResult(index, userAction = false) {
  const maximum = Math.max(0, resultCards.length - visibleResults());
  resultIndex = index > maximum ? 0 : index < 0 ? maximum : index;
  renderResults();
  if (userAction) startResultAutoplay();
}
function startResultAutoplay() {
  clearInterval(resultTimer);
  if (!reduced) resultTimer = setInterval(() => goToResult(resultIndex + 1), 5200);
}
previous.addEventListener("click", () => goToResult(resultIndex - 1, true));
next.addEventListener("click", () => goToResult(resultIndex + 1, true));
viewport.addEventListener("keydown", event => {
  if (event.key === "ArrowRight") goToResult(resultIndex + 1, true);
  if (event.key === "ArrowLeft") goToResult(resultIndex - 1, true);
});
viewport.addEventListener("touchstart", event => touchStart = event.touches[0].clientX, { passive: true });
viewport.addEventListener("touchend", event => {
  const movement = touchStart - event.changedTouches[0].clientX;
  if (Math.abs(movement) > 45) goToResult(resultIndex + (movement > 0 ? 1 : -1), true);
}, { passive: true });
addEventListener("resize", renderResults);
renderResults();
startResultAutoplay();

const lightbox = document.getElementById("lightbox");
const lightboxImage = lightbox.querySelector("img");
document.querySelectorAll("[data-lightbox]").forEach(button => button.addEventListener("click", () => {
  lightboxImage.src = button.dataset.lightbox;
  lightboxImage.alt = button.querySelector("img").alt;
  lightbox.showModal();
}));
lightbox.querySelector(".lightbox-close").addEventListener("click", () => lightbox.close());
lightbox.addEventListener("click", event => { if (event.target === lightbox) lightbox.close(); });

const patientSlides = [...document.querySelectorAll(".patient-slides img")];
const patientDots = [...document.querySelectorAll(".method-gallery .patient-slide-controls button")];
let patientIndex = 0;
let patientTimer;
function showPatientSlide(index) {
  if (!patientSlides.length) return;
  patientIndex = (index + patientSlides.length) % patientSlides.length;
  patientSlides.forEach((slide, i) => slide.classList.toggle("active", i === patientIndex));
  patientDots.forEach((dot, i) => dot.classList.toggle("active", i === patientIndex));
}
function startPatientAutoplay() {
  clearInterval(patientTimer);
  patientTimer = setInterval(() => showPatientSlide(patientIndex + 1), reduced ? 6000 : 4300);
}
patientDots.forEach((dot, index) => dot.addEventListener("click", () => {
  showPatientSlide(index);
  startPatientAutoplay();
}));
startPatientAutoplay();

const clinicSlides = [...document.querySelectorAll(".clinic-slide")];
const clinicDots = [...document.querySelectorAll(".clinic-slide-controls button")];
let clinicIndex = 0;
let clinicTimer;
let clinicUserPaused = false;
function showClinicSlide(index) {
  if (!clinicSlides.length) return;
  clinicIndex = (index + clinicSlides.length) % clinicSlides.length;
  clinicSlides.forEach((slide, i) => slide.classList.toggle("active", i === clinicIndex));
  clinicDots.forEach((dot, i) => dot.classList.toggle("active", i === clinicIndex));
}
function startClinicAutoplay() {
  clearInterval(clinicTimer);
  if (clinicUserPaused) return;
  clinicTimer = setInterval(() => showClinicSlide(clinicIndex + 1), reduced ? 7000 : 5200);
}
function stopClinicAutoplay() {
  clearInterval(clinicTimer);
}
clinicDots.forEach((dot, index) => dot.addEventListener("click", () => {
  clinicUserPaused = false;
  showClinicSlide(index);
  startClinicAutoplay();
}));
const clinicMedia = document.querySelector(".clinic-media");
if (clinicMedia) {
  clinicMedia.addEventListener("mouseenter", stopClinicAutoplay);
  clinicMedia.addEventListener("mouseleave", () => { if (!clinicUserPaused) startClinicAutoplay(); });
  clinicMedia.addEventListener("touchstart", () => { clinicUserPaused = true; stopClinicAutoplay(); }, { passive: true });
}
startClinicAutoplay();

const desktopLinks = [...document.querySelectorAll(".desktop-nav a")];
if ("IntersectionObserver" in window) {
  const navigationObserver = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) desktopLinks.forEach(link => link.classList.toggle("active", link.hash === `#${entry.target.id}`));
  }), { rootMargin: "-42% 0px -50%" });
  desktopLinks.map(link => document.querySelector(link.hash)).filter(Boolean).forEach(section => navigationObserver.observe(section));
}

document.getElementById("year").textContent = new Date().getFullYear();

const statisticNumbers = [...document.querySelectorAll(".hero-stats strong")];
statisticNumbers.forEach(element => {
  element.dataset.target = element.textContent.replace(/\D/g, "");
  element.textContent = "+0";
});

function animateStatistic(element) {
  if (element.dataset.animated) return;
  element.dataset.animated = "true";
  const target = Number(element.dataset.target);
  const formatter = new Intl.NumberFormat("pt-BR");
  const card = element.closest("aside");
  card.classList.add("counting");
  const duration = target > 100 ? 2100 : 1400;
  setTimeout(() => {
    const startTime = performance.now();
    function frame(now) {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      element.textContent = `+${formatter.format(Math.round(target * eased))}`;
      if (progress < 1) requestAnimationFrame(frame);
      else setTimeout(() => card.classList.remove("counting"), 250);
    }
    requestAnimationFrame(frame);
  }, 450);
}

if ("IntersectionObserver" in window) {
  const statisticsObserver = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateStatistic(entry.target);
      statisticsObserver.unobserve(entry.target);
    }
  }), { threshold: .65 });
  statisticNumbers.forEach(number => statisticsObserver.observe(number));
} else {
  statisticNumbers.forEach(animateStatistic);
}

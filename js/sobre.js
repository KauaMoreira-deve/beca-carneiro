const heroSection = document.querySelector(".hero-sobre");
const heroCopy = document.querySelector(".hero-copy");
const frameScene = document.querySelector(".frame-scene");
const initialFrameStage = document.querySelector(".frame-stage");
const sceneGlows = document.querySelectorAll(".scene-glow");
const sceneCards = document.querySelectorAll(".scene-card");
const detailCards = document.querySelectorAll(".detalhes-sobre article");
let modelCarousel = null;
let modelTrack = null;
let frameStages = [];
let modelViewers = [];
let modelNavButtons = [];
const modelName = document.querySelector(".frame-model-name");
const modelCount = document.querySelector(".frame-model-count");
const dotsContainer = document.querySelector(".carousel-dots");

const galleryModels = [
  {
    src: "assets/2fashion dress 3d model.glb",
    alt: "Modelo 3D da coleção",
    name: "Look 01"
  },
  {
    src: "assets/fashion dress 3d model.glb",
    alt: "Modelo 3D fashion dress",
    name: "Look 02"
  },
  {
    src: "assets/Meshy_AI_Burgundy_Draped_Tunic_0516040717_texture.glb",
    alt: "Modelo 3D Burgundy Draped Tunic",
    name: "Look 03"
  },
  {
    src: "assets/Meshy_AI_Costas_Denim_Lace_Up__0516035358_texture.glb",
    alt: "Modelo 3D Denim Lace Up",
    name: "Look 04"
  },
  {
    src: "assets/Meshy_AI_Crimson_Lace_and_Pink_0516042011_texture.glb",
    alt: "Modelo 3D Crimson Lace and Pink",
    name: "Look 05"
  },
  {
    src: "assets/Meshy_AI_Pearl_Trim_Pink_Palaz_0516031343_texture.glb",
    alt: "Modelo 3D Pearl Trim Pink Palazo",
    name: "Look 06"
  },
  {
    src: "assets/Meshy_AI_Navy_Lace_Yoke_Top_wi_0516034803_texture.glb",
    alt: "Modelo 3D Navy Lace Yoke Top",
    name: "Look 07"
  },
  {
    src: "assets/Meshy_AI_Front_View_Outfit_0516035830_texture.glb",
    alt: "Modelo 3D Front View Outfit",
    name: "Look 08"
  },
  {
    src: "assets/Meshy_AI_Crimson_Leather_and_C_0516040229_texture.glb",
    alt: "Modelo 3D Crimson Leather",
    name: "Look 09"
  },
  {
    src: "assets/Meshy_AI_Front_View_Pearl_Embe_0516041201_texture.glb",
    alt: "Modelo 3D Pearl Embellished",
    name: "Look 10"
  }
];

const carouselModels = galleryModels.slice(2).map((model, index) => ({
  ...model,
  name: `Look ${String(index + 1).padStart(2, "0")}`
}));

let currentModelIndex = 0;
let ticking = false;

function createModelSlide(model, index) {
  const slide = document.createElement("article");
  slide.className = "model-slide";
  slide.dataset.modelIndex = String(index);
  slide.setAttribute("aria-label", model.name);

  const stage = document.createElement("div");
  stage.className = "frame-stage";

  const frameInner = document.createElement("div");
  frameInner.className = "frame-inner";

  const frameAmbient = document.createElement("div");
  frameAmbient.className = "frame-ambient";

  const base = document.createElement("div");
  base.className = "exposicao-base";

  const frameImage = document.createElement("img");
  frameImage.className = "frame-image";
  frameImage.src = "assets/moldura.jpeg";
  frameImage.alt = "Moldura decorativa dourada";

  const overlay = document.createElement("div");
  overlay.className = "modelo-overlay";

  const viewer = document.createElement("model-viewer");
  viewer.className = "modelo-3d";
  viewer.dataset.src = model.src;
  viewer.setAttribute("alt", model.alt);
  viewer.setAttribute("auto-rotate", "");
  viewer.setAttribute("camera-controls", "");
  viewer.setAttribute("shadow-intensity", "1.6");
  viewer.setAttribute("exposure", "1.1");
  viewer.setAttribute("interaction-prompt", "none");
  viewer.setAttribute("disable-pan", "");
  viewer.setAttribute("camera-orbit", "0deg 78deg auto");
  viewer.setAttribute("min-camera-orbit", "auto 48deg auto");
  viewer.setAttribute("max-camera-orbit", "auto 98deg auto");
  viewer.setAttribute("disable-zoom", "");
  viewer.setAttribute("field-of-view", "32deg");

  frameInner.append(frameAmbient, base);
  overlay.appendChild(viewer);
  stage.append(frameInner, frameImage, overlay);
  slide.appendChild(stage);

  return slide;
}

function buildModelCarousel() {
  if (!initialFrameStage || carouselModels.length === 0) {
    return;
  }

  modelCarousel = document.createElement("div");
  modelCarousel.className = "model-carousel";
  modelCarousel.setAttribute("aria-label", "Carrossel de modelos 3D");

  modelTrack = document.createElement("div");
  modelTrack.className = "model-track";

  carouselModels.forEach((model, index) => {
    modelTrack.appendChild(createModelSlide(model, index));
  });

  modelCarousel.appendChild(modelTrack);

  initialFrameStage.querySelectorAll(".frame-nav, .carousel-arrow").forEach((button) => {
    modelCarousel.appendChild(button);
  });

  initialFrameStage.replaceWith(modelCarousel);

  frameStages = Array.from(modelCarousel.querySelectorAll(".frame-stage"));
  modelViewers = Array.from(modelCarousel.querySelectorAll(".modelo-3d"));
  modelNavButtons = Array.from(modelCarousel.querySelectorAll(".frame-nav, .carousel-arrow"));
}

function buildDots() {
  if (!dotsContainer) {
    return;
  }

  dotsContainer.innerHTML = "";

  carouselModels.forEach((_, index) => {
    const dot = document.createElement("span");
    dot.className = index === currentModelIndex ? "is-active" : "";
    dotsContainer.appendChild(dot);
  });
}

function updateNavState() {
  const isSingleModel = carouselModels.length <= 1;

  modelNavButtons.forEach((button) => {
    button.disabled = isSingleModel;
  });
}

function shouldLoadModel(index) {
  const previousIndex = (currentModelIndex - 1 + carouselModels.length) % carouselModels.length;
  const nextIndex = (currentModelIndex + 1) % carouselModels.length;

  return index === currentModelIndex || index === previousIndex || index === nextIndex;
}

function updateLoadedModels() {
  modelViewers.forEach((viewer, index) => {
    if (shouldLoadModel(index)) {
      if (!viewer.getAttribute("src")) {
        viewer.setAttribute("src", viewer.dataset.src);
      }

      return;
    }

    viewer.removeAttribute("src");
  });
}

function updateSlideClasses() {
  const previousIndex = (currentModelIndex - 1 + carouselModels.length) % carouselModels.length;
  const nextIndex = (currentModelIndex + 1) % carouselModels.length;

  frameStages.forEach((stage, index) => {
    const slide = stage.closest(".model-slide");

    slide.classList.toggle("is-active", index === currentModelIndex);
    slide.classList.toggle("is-previous", index === previousIndex);
    slide.classList.toggle("is-next", index === nextIndex);
  });
}

function centerActiveSlide() {
  if (!modelCarousel || !modelTrack) {
    return;
  }

  const activeSlide = modelTrack.querySelector(".model-slide.is-active");

  if (!activeSlide) {
    return;
  }

  const carouselCenter = modelCarousel.clientWidth / 2;
  const slideCenter = activeSlide.offsetLeft + activeSlide.offsetWidth / 2;

  modelTrack.style.transform = `translateX(${carouselCenter - slideCenter}px)`;
}

function updateModel(index) {
  if (!modelTrack || carouselModels.length === 0) {
    return;
  }

  currentModelIndex = (index + carouselModels.length) % carouselModels.length;

  const currentModel = carouselModels[currentModelIndex];
  const currentViewer = modelViewers[currentModelIndex];

  if (currentViewer) {
    currentViewer.setAttribute("camera-orbit", "0deg 78deg auto");
    currentViewer.setAttribute("field-of-view", "32deg");
  }

  if (modelName) {
    modelName.textContent = currentModel.name;
  }

  if (modelCount) {
    modelCount.textContent = `${currentModelIndex + 1} / ${carouselModels.length}`;
  }

  updateSlideClasses();
  centerActiveSlide();
  updateLoadedModels();
  buildDots();
  requestScrollUpdate();
}

function getButtonDirection(button) {
  const configuredDirection = Number(button.dataset.modelNav);

  if (!Number.isNaN(configuredDirection) && configuredDirection !== 0) {
    return configuredDirection;
  }

  const buttonText = button.textContent || "";
  const label = (button.getAttribute("aria-label") || "").toLowerCase();

  if (label.includes("proximo") || label.includes("próximo") || buttonText.includes(">") || buttonText.includes("›")) {
    return 1;
  }

  return -1;
}

function bindCarouselControls() {
  modelNavButtons.forEach((button) => {
    button.addEventListener("click", () => {
      updateModel(currentModelIndex + getButtonDirection(button));
    });
  });
}

window.addEventListener("keydown", (event) => {
  if (carouselModels.length <= 1) {
    return;
  }

  if (event.key === "ArrowLeft") {
    updateModel(currentModelIndex - 1);
  }

  if (event.key === "ArrowRight") {
    updateModel(currentModelIndex + 1);
  }
});

buildModelCarousel();
bindCarouselControls();
updateNavState();
updateModel(0);

if (window.gsap) {
  const introTargets = [modelCarousel, ...sceneCards].filter(Boolean);

  if (heroCopy) {
    introTargets.unshift(heroCopy);
  }

  gsap.set(introTargets, {
    opacity: 0,
    y: 32
  });

  gsap.set(sceneGlows, {
    scale: 0.92,
    opacity: 0
  });

  const intro = gsap.timeline({ defaults: { ease: "power3.out" } });

  if (heroCopy) {
    intro.to(heroCopy, {
      opacity: 1,
      y: 0,
      duration: 0.9
    });
  }

  intro
    .to(modelCarousel, {
      opacity: 1,
      y: 0,
      duration: 1,
      rotate: -1.5
    }, heroCopy ? "-=0.45" : 0)
    .to(sceneGlows, {
      opacity: 0.78,
      scale: 1,
      duration: 1,
      stagger: 0.12
    }, "-=0.65")
    .to(sceneCards, {
      opacity: 1,
      y: 0,
      duration: 0.7,
      stagger: 0.12
    }, "-=0.45");

  gsap.to(".scene-glow", {
    scale: 1.08,
    opacity: 0.9,
    duration: 2.8,
    repeat: -1,
    yoyo: true,
    stagger: 0.3,
    ease: "sine.inOut"
  });
}

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) {
      return;
    }

    entry.target.classList.add("is-visible");
    revealObserver.unobserve(entry.target);
  });
}, {
  threshold: 0.28
});

detailCards.forEach((card, index) => {
  card.style.transitionDelay = `${index * 120}ms`;
  revealObserver.observe(card);
});

function updateSceneOnScroll() {
  ticking = false;

  if (!heroSection || !modelCarousel || window.innerWidth <= 720) {
    return;
  }

  const rect = heroSection.getBoundingClientRect();
  const viewportHeight = window.innerHeight || 1;
  const progress = Math.min(Math.max((viewportHeight - rect.top) / (viewportHeight + rect.height), 0), 1);
  const parallaxOffset = (progress - 0.5) * 110;

  modelCarousel.style.transform = `translateY(${parallaxOffset * -0.22}px) scale(${1 + progress * 0.08}) rotate(${(-2 + progress * 3).toFixed(2)}deg)`;

  if (heroCopy) {
    heroCopy.style.transform = `translateY(${parallaxOffset * 0.14}px)`;
    heroCopy.style.opacity = `${0.68 + progress * 0.32}`;
  }

  if (frameScene) {
    frameScene.style.transform = `translateY(${parallaxOffset * -0.08}px)`;
  }

  sceneGlows.forEach((glow, index) => {
    const direction = index === 0 ? -1 : 1;
    glow.style.transform = `translate3d(${direction * progress * 26}px, ${parallaxOffset * 0.22}px, 0) scale(${1 + progress * 0.12})`;
  });

  sceneCards.forEach((card, index) => {
    const direction = index === 0 ? -1 : 1;
    card.style.transform = `translate3d(${direction * progress * 18}px, ${parallaxOffset * 0.18}px, 0)`;
  });

  const activeViewer = modelViewers[currentModelIndex];

  if (activeViewer) {
    const orbit = -18 + progress * 36;
    const height = 78 - progress * 8;
    activeViewer.setAttribute("camera-orbit", `${orbit.toFixed(2)}deg ${height.toFixed(2)}deg auto`);
  }
}

function requestScrollUpdate() {
  if (ticking) {
    return;
  }

  ticking = true;
  window.requestAnimationFrame(updateSceneOnScroll);
}

window.addEventListener("scroll", requestScrollUpdate, { passive: true });
window.addEventListener("resize", () => {
  centerActiveSlide();
  requestScrollUpdate();
});
window.addEventListener("load", requestScrollUpdate);

requestScrollUpdate();

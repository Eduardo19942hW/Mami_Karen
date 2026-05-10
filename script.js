let currentScreen = 0;
let currentPhoto = 1;
const totalPhotos = 18;

const screens = document.querySelectorAll(".screen");
const bgMusic = document.getElementById("bgMusic");
const musicToggle = document.getElementById("musicToggle");
const carouselImage = document.getElementById("carouselImage");
const photoCounter = document.getElementById("photoCounter");
let musicStarted = false;

function showScreen(index) {
  screens.forEach((screen) => screen.classList.remove("active"));
  screens[index].classList.add("active");

  const progressFill = document.getElementById("progressFill");
  const progress = ((index + 1) / screens.length) * 100;

  if (progressFill) {
    progressFill.style.width = `${progress}%`;
  }

  const typeElement = screens[index].querySelector(".type-text");

  if (typeElement) {
    typeWriter(typeElement);
  }
}

function startExperience() {
  nextScreen();
}

function nextScreen() {

  if (currentScreen < screens.length - 1) {

    currentScreen++;

    showScreen(currentScreen);

    /* SI ES LA ÚLTIMA PANTALLA */

    if (currentScreen === screens.length - 1) {
      launchConfetti();
    }

  }
}

function restartExperience() {
  currentScreen = 0;
  currentPhoto = 1;
  updatePhoto();
  showScreen(currentScreen);
}

function updatePhoto() {
  carouselImage.classList.add("fade");

  setTimeout(() => {
    carouselImage.src = `assets/fotos/foto${currentPhoto}.jpg`;
    photoCounter.textContent = `${currentPhoto} / ${totalPhotos}`;
    carouselImage.classList.remove("fade");
  }, 250);
}

function nextPhoto() {
  currentPhoto++;

  if (currentPhoto > totalPhotos) {
    currentPhoto = 1;
  }

  updatePhoto();
}

function prevPhoto() {
  currentPhoto--;

  if (currentPhoto < 1) {
    currentPhoto = totalPhotos;
  }

  updatePhoto();
}

function toggleMusic() {
  if (bgMusic.paused) {
    bgMusic.play();
    musicToggle.textContent = "⏸️";
  } else {
    bgMusic.pause();
    musicToggle.textContent = "🎵";
  }
}

setInterval(() => {
  if (currentScreen === 2) {
    nextPhoto();
  }
}, 3500);

/* LOADER */

window.addEventListener("load", () => {

  setTimeout(() => {

    const loader = document.getElementById("loader");

    loader.style.opacity = "0";

    setTimeout(() => {
      loader.style.display = "none";

      // Iniciar el efecto de escritura en la primera pantalla
      const typeElement = document.querySelector(".screen.active .type-text");
      if (typeElement) {
        typeWriter(typeElement);
      }

    }, 1000);

  }, 2500);

});

/* CORAZONES FLOTANDO */

function createFloatingHeart() {
  const heart = document.createElement("div");
  heart.classList.add("floating-heart");

  const icons = ["💖", "💕", "🌸", "✨", "💗", "🦋"];
  heart.textContent = icons[Math.floor(Math.random() * icons.length)];

  heart.style.left = Math.random() * 100 + "vw";
  heart.style.fontSize = Math.random() * 18 + 18 + "px";

  document.body.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 5000);
}

setInterval(createFloatingHeart, 700);

/* EFECTO EXTRA EN BOTONES */

document.querySelectorAll("button").forEach((button) => {
  button.addEventListener("click", () => {
    for (let i = 0; i < 6; i++) {
      setTimeout(createFloatingHeart, i * 90);
    }
  });
});

/* FOTO FULLSCREEN */

if (carouselImage) {
  carouselImage.addEventListener("click", () => {
    const modal = document.getElementById("photoModal");
    const modalImage = document.getElementById("modalImage");

    if (modal && modalImage) {
      modalImage.src = carouselImage.src;
      modal.classList.add("active");
    }
  });
}

function closePhotoModal() {
  const modal = document.getElementById("photoModal");
  if (modal) {
    modal.classList.remove("active");
  }
}

function typeWriter(element) {
  const text = element.dataset.text || element.textContent || "";

  if (!text.trim()) return;

  element.textContent = "";
  element.classList.add("typing");

  let i = 0;

  const interval = setInterval(() => {
    element.textContent += text.charAt(i);
    i++;

    if (i >= text.length) {
      clearInterval(interval);
      element.classList.remove("typing");
    }
  }, 35);
}

/* CONFETTI FINAL */

function launchConfetti() {

  const colors = [
    "#ff64ad",
    "#a77cff",
    "#ffd166",
    "#7bdff2",
    "#ffffff"
  ];

  for (let i = 0; i < 120; i++) {

    const confetti = document.createElement("div");

    confetti.classList.add("confetti");

    confetti.style.left = Math.random() * 100 + "vw";

    confetti.style.background =
      colors[Math.floor(Math.random() * colors.length)];

    confetti.style.width = Math.random() * 10 + 8 + "px";
    confetti.style.height = confetti.style.width;

    confetti.style.animationDuration =
      Math.random() * 3 + 2 + "s";

    document.body.appendChild(confetti);

    setTimeout(() => {
      confetti.remove();
    }, 5000);
  }
}

/* SWIPE MOBILE */

let touchStartX = 0;
let touchEndX = 0;

document.addEventListener("touchstart", (e) => {

  touchStartX = e.changedTouches[0].screenX;

});

document.addEventListener("touchend", (e) => {

  touchEndX = e.changedTouches[0].screenX;

  handleSwipe();

});

function handleSwipe() {

  const swipeDistance = touchEndX - touchStartX;

  /* DESLIZAR DERECHA */

  if (swipeDistance > 80) {

    if (currentScreen > 0) {

      currentScreen--;

      showScreen(currentScreen);
    }
  }

  /* DESLIZAR IZQUIERDA */

  if (swipeDistance < -80) {

    if (currentScreen < screens.length - 1) {

      currentScreen++;

      showScreen(currentScreen);

      if (currentScreen === screens.length - 1) {
        launchConfetti();
      }
    }
  }
}

/* MAGIC PARTICLES */

function createMagicParticle() {

  const particle = document.createElement("div");

  particle.classList.add("magic-particle");

  const colors = [
    "#ffffff",
    "#ffd6f6",
    "#ffe066",
    "#cdb4ff",
    "#a2f2ff"
  ];

  particle.style.background =
    colors[Math.floor(Math.random() * colors.length)];

  particle.style.left = Math.random() * 100 + "vw";

  const size = Math.random() * 6 + 4;

  particle.style.width = size + "px";
  particle.style.height = size + "px";

  particle.style.animationDuration =
    Math.random() * 5 + 4 + "s";

  document.body.appendChild(particle);

  setTimeout(() => {
    particle.remove();
  }, 9000);
}

setInterval(createMagicParticle, 180);

/* CONTROL AUDIO + VIDEO */

const specialVideo = document.getElementById("specialVideo");
let musicWasPlayingBeforeVideo = false;

if (specialVideo) {
  specialVideo.addEventListener("play", () => {
    musicWasPlayingBeforeVideo = !bgMusic.paused;

    bgMusic.pause(); // pausa donde iba, no reinicia
    musicToggle.textContent = "🎵";
  });

  specialVideo.addEventListener("pause", () => {
    if (musicWasPlayingBeforeVideo && currentScreen === 3) {
      bgMusic.play(); // continúa desde donde quedó
      musicToggle.textContent = "⏸️";
    }
  });

  specialVideo.addEventListener("ended", () => {
    if (musicWasPlayingBeforeVideo) {
      bgMusic.play(); // continúa desde donde quedó
      musicToggle.textContent = "⏸️";
    }
  });
}

/* AUTO START MUSIC */

document.addEventListener("click", () => {

  if (!musicStarted) {

    bgMusic.play();

    musicToggle.textContent = "⏸️";

    musicStarted = true;
  }

}, { once: true });
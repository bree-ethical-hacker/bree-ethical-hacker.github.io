// ✅ Only run Swiper if the element exists
if (document.querySelector('.projects-swiper')) {
  var swiper = new Swiper('.projects-swiper', {
    effect: 'coverflow',
    grabCursor: true,
    centeredSlides: true,
    loop: true,
    slidesPerView: 'auto',
    coverflowEffect: {
      rotate: 0,
      stretch: 0,
      depth: 100,
      modifier: 2.5,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });
}

// 🎧 Sound system
const soundFiles = {
  click: 'click.mp3',
  error: 'error.mp3'
};

function playSound(type) {
  const file = soundFiles[type];
  if (!file) return;
  const sound = new Audio(file);
  sound.currentTime = 0;
  sound.play().catch(() => {});
}

function attachSoundListeners() {
  document.querySelectorAll('[data-sound]').forEach(btn => {
    btn.addEventListener('click', () => {
      playSound(btn.getAttribute('data-sound'));
    });
  });
}

document.addEventListener('DOMContentLoaded', attachSoundListeners);

// If Swiper is present, reattach after it initializes
window.addEventListener('load', () => {
  setTimeout(attachSoundListeners, 300);
});

// Prevent Coming Soon buttons from navigating
document.addEventListener('click', e => {
  const btn = e.target.closest('.btn[data-sound="error"]');
  if (btn) e.preventDefault();
});

// 🔴 Shake animation for selected buttons only
document.querySelectorAll('[data-shake]').forEach(button => {
  button.addEventListener('click', () => {
    button.classList.add('shake');
    setTimeout(() => button.classList.remove('shake'), 400);
  });
});

// NAVIGATION BAR
document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('nav');

  if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => {
      nav.classList.toggle('active');
    });
  }
});


// AI POWERED CONVERSATION
// AI Audio Playback (using .mp3)
const aiAudio = document.getElementById('ai-audio');
const aiPlayBtn = document.getElementById('ai-play-btn');
const aiProgressBar = document.getElementById('ai-progress-bar');
const aiCurrentTime = document.getElementById('ai-current-time');
const aiDuration = document.getElementById('ai-duration');
const aiPlayIcon = aiPlayBtn.querySelector('i');

aiPlayBtn.addEventListener('click', () => {
  if (aiAudio.paused) {
    aiAudio.play();
    aiPlayIcon.classList.remove('fa-play');
    aiPlayIcon.classList.add('fa-pause');
  } else {
    aiAudio.pause();
    aiPlayIcon.classList.remove('fa-pause');
    aiPlayIcon.classList.add('fa-play');
  }
});

aiAudio.addEventListener('timeupdate', () => {
  const progress = (aiAudio.currentTime / aiAudio.duration) * 100;
  aiProgressBar.style.width = `${progress}%`;
  aiCurrentTime.textContent = formatTime(aiAudio.currentTime);
});

aiAudio.addEventListener('loadedmetadata', () => {
  aiDuration.textContent = formatTime(aiAudio.duration);
  aiProgressBar.classList.add('loaded'); // Show the handle
});

aiAudio.addEventListener('ended', () => {
  aiPlayIcon.classList.remove('fa-pause');
  aiPlayIcon.classList.add('fa-play');
  aiProgressBar.style.width = '0%';
  aiCurrentTime.textContent = '0:00';
});

// Allow seeking by clicking on progress container
const progressContainer = document.querySelector('.progress-container');
progressContainer.addEventListener('click', (e) => {
  const containerWidth = progressContainer.offsetWidth;
  const clickX = e.offsetX;
  const duration = aiAudio.duration;
  aiAudio.currentTime = (clickX / containerWidth) * duration;
});

// Add cursor pointer to show it's clickable
progressContainer.style.cursor = 'pointer';

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60).toString().padStart(2, '0');
  return `${minutes}:${secs}`;
}




// ===============================
// HACKER DECODE TEXT EFFECT
// ===============================

// ====== SCRAMBLE TEXT ANIMATION ======
const roles = [
  "Sec Analyst",
  "Ethical Hacker",
  "Threat Hunter",
  "Inc Responder",
  "SOC Analyst"
];

const dynamicText = document.getElementById("dynamic-text");

let currentRole = 0;
let scrambleInterval;
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*:";

function scrambleText(role) {
  let iteration = 0;
  const target = role;
  const total = target.length;

  clearInterval(scrambleInterval);

  scrambleInterval = setInterval(() => {
    dynamicText.innerText = target
      .split("")
      .map((char, idx) => {
        if (idx < iteration) return target[idx];
        return letters[Math.floor(Math.random() * letters.length)];
      })
      .join("");

    iteration += 1 / 2; // smooth speed

    if (iteration >= total) {
      clearInterval(scrambleInterval);
      dynamicText.innerText = target;
      setTimeout(() => rotateRole(), 1500);
    }
  }, 50);
}

function rotateRole() {
  currentRole = (currentRole + 1) % roles.length;
  scrambleText(roles[currentRole]);
}

// Start animation
scrambleText(roles[currentRole]);

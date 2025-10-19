// Swiper for Projects Slider
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

// Reattachable function
function attachSoundListeners() {
  document.querySelectorAll('[data-sound]').forEach(btn => {
    btn.addEventListener('click', e => {
      playSound(btn.getAttribute('data-sound'));
    });
  });
}

// Run when page loads
document.addEventListener('DOMContentLoaded', () => {
  attachSoundListeners();
});

// If Swiper is present, wait for it to finish initializing
window.addEventListener('load', () => {
  // Delay a tiny bit to ensure Swiper clones are ready
  setTimeout(() => {
    attachSoundListeners();
  }, 300);
});

// Prevent Coming Soon buttons from navigating
document.addEventListener('click', e => {
  const btn = e.target.closest('.btn[data-sound="error"]');
  if (btn) e.preventDefault();
});


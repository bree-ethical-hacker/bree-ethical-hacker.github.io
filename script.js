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

// 🎧 Bulletproof sound system — works in Swiper & normal pages
const soundFiles = {
  click: 'click.mp3',
  error: 'error.mp3',
};

function playSound(type) {
  const file = soundFiles[type];
  if (!file) return;

  const sound = new Audio(file);
  sound.currentTime = 0;
  sound.volume = 1.0;
  sound.play().catch(err => {
    console.warn('Sound play error:', err);
  });
}

// Attach listeners
function attachSoundListeners() {
  document.querySelectorAll('[data-sound]').forEach(button => {
    button.addEventListener('click', e => {
      playSound(button.getAttribute('data-sound'));
    });
  });
}

// Run once DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  attachSoundListeners();
});

// Re-attach if Swiper (projects page) modifies DOM
window.addEventListener('load', () => {
  attachSoundListeners();
});

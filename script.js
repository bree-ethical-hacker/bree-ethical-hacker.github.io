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
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('nav');

menuToggle.addEventListener('click', () => {
  nav.classList.toggle('active');
});



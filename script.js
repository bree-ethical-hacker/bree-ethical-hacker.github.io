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

// 🎧 Sound System (reliable across all pages)
const sounds = {
  click: new Audio('click.mp3'),
  denied: new Audio('denied.mp3')
};

// Function to attach sound to tagged elements
function attachSoundListeners() {
  document.querySelectorAll('[data-sound]').forEach(button => {
    button.addEventListener('click', () => {
      const soundType = button.getAttribute('data-sound');
      const baseSound = sounds[soundType];

      if (baseSound) {
        const sound = baseSound.cloneNode(true);
        sound.currentTime = 0;
        sound.play();
      }
    });
  });
}

// Attach listeners once DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  attachSoundListeners();
});

// If Swiper is used on this page, reattach after it initializes
if (typeof Swiper !== 'undefined') {
  window.addEventListener('load', () => {
    attachSoundListeners(); // ensures buttons in Swiper slides get listeners
  });
}





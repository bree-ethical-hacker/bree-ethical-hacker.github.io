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

// 🎧 Sound System (restart-friendly)
const sounds = {
  click: new Audio('click.mp3'),
  denied: new Audio('error.mp3')
};

// Allow rapid replays by cloning the sound each time
document.querySelectorAll('[data-sound]').forEach(button => {
  button.addEventListener('click', () => {
    const soundType = button.getAttribute('data-sound');
    const baseSound = sounds[soundType];

    if (baseSound) {
      const sound = baseSound.cloneNode(true); // clone makes it re-play instantly
      sound.currentTime = 0;                   // ensure it starts from beginning
      sound.play();
    }
  });
});




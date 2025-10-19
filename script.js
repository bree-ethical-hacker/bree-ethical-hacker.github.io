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

// Sound System
const sounds = {
  click: new Audio('click.mp3'),
  error: new Audio('error.mp3')
};

// Add sound effect to specific buttons only
document.querySelectorAll('[data-sound]').forEach(button => {
  button.addEventListener('click', () => {
    const soundType = button.getAttribute('data-sound');
    const sound = sounds[soundType];
    if (sound) {
      sound.currentTime = 0;
      sound.play();
    }
  });
});



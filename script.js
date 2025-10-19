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

// Play pop sound on any button click
const popSound = new Audio('click.mp3'); // replace with your file name

// For all clickable buttons and links
document.querySelectorAll('.btn, .coming-soon-card-btn, .complete-card-btn, nav a').forEach(button => {
  button.addEventListener('click', () => {
    popSound.currentTime = 0; // restart sound if clicked quickly
    popSound.play();
  });
});


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
// AI Conversation Playback
const aiPlayBtn = document.getElementById('ai-play-btn');
const aiProgressBar = document.getElementById('ai-progress-bar');
const aiCurrentTime = document.getElementById('ai-current-time');
const aiDuration = document.getElementById('ai-duration');

const aiConversation = [
  { speaker: 'AI 1', text: 'Hey there, how are you doing today?' },
  { speaker: 'AI 2', text: 'I’m doing great! Just exploring some AI projects lately.' },
  { speaker: 'AI 1', text: 'Oh really? Anything interesting you’ve found so far?' },
  { speaker: 'AI 2', text: 'Yeah! There’s this one that lets two AIs talk in real time — like we’re doing right now.' }
];

let aiIndex = 0;
let aiSpeaking = false;
let aiElapsed = 0;
let aiInterval;
let aiTotalDuration = aiConversation.reduce((sum, line) => sum + line.text.length * 60, 0); // rough estimate

aiDuration.textContent = formatTime(aiTotalDuration / 100);

function speakAIConversation() {
    if (aiSpeaking) {
        window.speechSynthesis.cancel();
        aiSpeaking = false;
        aiPlayBtn.textContent = '▶️';
        clearInterval(aiInterval);
        aiProgressBar.style.width = '0%';
        aiCurrentTime.textContent = '0:00';
        return;
    }

    aiSpeaking = true;
    aiPlayBtn.textContent = '⏸️';
    aiIndex = 0;
    aiElapsed = 0;

    function speakNext() {
        if (aiIndex < aiConversation.length) {
            const line = aiConversation[aiIndex];
            const utter = new SpeechSynthesisUtterance(line.text);
            utter.voice = speechSynthesis.getVoices()[aiIndex % 2 === 0 ? 0 : 1]; // alternate voices
            utter.pitch = aiIndex % 2 === 0 ? 1.0 : 1.2;
            utter.rate = 1.05;

            utter.onend = () => {
                aiIndex++;
                setTimeout(speakNext, 600); // small pause between lines
            };
            speechSynthesis.speak(utter);
        } else {
            aiSpeaking = false;
            aiPlayBtn.textContent = '▶️';
            clearInterval(aiInterval);
        }
    }

    speakNext();

    aiInterval = setInterval(() => {
        aiElapsed += 0.5;
        const progress = Math.min((aiElapsed / (aiTotalDuration / 100)) * 100, 100);
        aiProgressBar.style.width = `${progress}%`;
        aiCurrentTime.textContent = formatTime(aiElapsed);
    }, 500);
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60).toString().padStart(2, '0');
    return `${minutes}:${secs}`;
}

aiPlayBtn.addEventListener('click', speakAIConversation);



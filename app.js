// === Image placeholders ===
// Paste your direct image URLs here (Imgur, Cloudinary, GitHub raw, etc.)
const slide1Bg = "";   // e.g. "https://i.imgur.com/rose.jpg"
const slide3Bg = "";   // stadium image
const slide13Bg = "";  // optional final background

// Apply backgrounds if provided
function applyBackgrounds() {
  if (slide1Bg) {
    const s1 = document.getElementById('s1');
    s1.style.backgroundImage = `url('${slide1Bg}')`;
    s1.style.backgroundSize = 'cover';
    s1.style.backgroundPosition = 'center';
  }
  if (slide3Bg) {
    const s3 = document.getElementById('s3');
    s3.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.25), rgba(0,0,0,0.25)), url('${slide3Bg}')`;
    s3.style.backgroundSize = 'cover';
    s3.style.backgroundPosition = 'center';
  }
  if (slide13Bg) {
    const s13 = document.getElementById('s13');
    s13.style.backgroundImage = `url('${slide13Bg}')`;
    s13.style.backgroundSize = 'cover';
    s13.style.backgroundPosition = 'center';
  }
}

// === Slide control ===
function show(id) {
  document.querySelectorAll('.slide').forEach(s => s.classList.remove('active'));
  const el = document.getElementById(id);
  if (!el) return;
  el.classList.add('active');
  // focus first interactive element for accessibility
  const focusable = el.querySelector('[role="button"], button, .small-square, .square');
  if (focusable) focusable.focus();
}

// Modal helper
const modal = document.getElementById('modal');
let modalTimer = null;
function showModal(text, ms = 1800) {
  modal.textContent = text;
  modal.classList.add('show');
  clearTimeout(modalTimer);
  modalTimer = setTimeout(() => modal.classList.remove('show'), ms);
}

// Confetti helper
function runConfetti() {
  try {
    const myConfetti = confetti.create(document.getElementById('confettiCanvas'), { resize: true, useWorker: true });
    myConfetti({ particleCount: 160, spread: 160, origin: { x: 0.5, y: 0.2 } });
    setTimeout(() => myConfetti({ particleCount: 100, spread: 120, origin: { x: 0.2, y: 0.4 } }), 300);
    setTimeout(() => myConfetti({ particleCount: 100, spread: 120, origin: { x: 0.8, y: 0.4 } }), 600);
  } catch (e) {
    console.warn('confetti error', e);
  }
}

// Initialize interactions
window.addEventListener('DOMContentLoaded', () => {
  applyBackgrounds();
  show('s1');

  // Slide 1
  const qmark = document.getElementById('qmark');
  qmark.addEventListener('click', () => show('s2'));
  qmark.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); qmark.click(); } });

  // Slide 2
  document.getElementById('blueTab').addEventListener('click', () => {
    showModal('choose the right one');
    // stay on s2
  });
  document.getElementById('redTab').addEventListener('click', () => show('s3'));

  // Slide 3
  document.getElementById('letsGo3').addEventListener('click', () => show('s4'));

  // Slide 4
  document.getElementById('yes4').addEventListener('click', () => show('s5'));
  document.getElementById('no4').addEventListener('click', () => showModal('try again'));

  // Slide 5
  document.getElementById('yess5').addEventListener('click', () => show('s6'));
  document.getElementById('no5').addEventListener('click', () => {
    showModal("You're ready Bunda");
    setTimeout(() => show('s6'), 900);
  });

  // Slide 6
  document.getElementById('right6').addEventListener('click', () => show('s7'));
  document.getElementById('left6').addEventListener('click', () => show('s7'));

  // Slide 7: clicking anywhere advances to s8 (keeps flow simple)
  document.getElementById('s7').addEventListener('click', () => show('s8'));

  // Slide 8
  document.getElementById('yesss8').addEventListener('click', () => show('s9'));

  // Slide 9
  document.getElementById('next9').addEventListener('click', () => show('s10'));

  // Slide 10
  document.getElementById('yes10').addEventListener('click', () => {
    show('s11');
    runConfetti();
    // auto-advance to final after 3s
    setTimeout(() => show('s13'), 3000);
  });
  document.getElementById('no10').addEventListener('click', () => show('s12'));

  // Slide 12 back
  document.getElementById('back12').addEventListener('click', () => show('s10'));

  // Make small-square and square keyboard accessible (Enter/Space)
  document.querySelectorAll('.small-square, .square').forEach(el => {
    el.setAttribute('tabindex', el.getAttribute('tabindex') || '0');
    el.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); el.click(); } });
  });
});
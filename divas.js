
const CORES = ['#F9A8D4','#C4B5FD','#FCD34D','#6EE7B7','#FCA5A5','#A5B4FC'];

function lancarConfete(qtd = 60) {
  const c = document.getElementById('confete-container');
  if (!c) return;
  for (let i = 0; i < qtd; i++) {
    const p = document.createElement('div');
    p.className = 'confete-piece';
    p.style.left = Math.random() * 100 + 'vw';
    p.style.backgroundColor = CORES[Math.floor(Math.random() * CORES.length)];
    p.style.animationDuration = (Math.random() * 2 + 1.5) + 's';
    p.style.animationDelay   = (Math.random() * 1.5) + 's';
    const s = (Math.random() * 7 + 5) + 'px';
    p.style.width = s; p.style.height = s;
    p.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
    c.appendChild(p);
  }
  setTimeout(() => { c.innerHTML = ''; }, 5000);
}


function initFadeObserver() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visivel');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.fade-in-up').forEach(el => observer.observe(el));
}


function initNavDots() {
  const sections = document.querySelectorAll('[data-section]');
  const dots     = document.querySelectorAll('.nav-dot');

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const id = e.target.dataset.section;
        dots.forEach(d => d.classList.toggle('ativo', d.dataset.target === id));
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => obs.observe(s));
}


function initHitTags() {
  const reacoes = ['🎵', '🔥', '❤️', '✨', '👑', '💅'];
  document.querySelectorAll('.hit-tag').forEach(tag => {
    tag.addEventListener('click', () => {
      const emoji = reacoes[Math.floor(Math.random() * reacoes.length)];
      const original = tag.textContent;
      tag.textContent = emoji;
      setTimeout(() => { tag.textContent = original; }, 800);
    });
  });
}


document.addEventListener('DOMContentLoaded', () => {
  lancarConfete(50);
  initFadeObserver();
  initNavDots();
  initHitTags();
});

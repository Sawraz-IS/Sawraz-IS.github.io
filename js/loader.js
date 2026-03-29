/* ============================================
   LOADER — Cinematic intro that plays once
   per session (gated by sessionStorage)
   ============================================ */

(function () {
  if (sessionStorage.getItem('loaded')) return;
  sessionStorage.setItem('loaded', '1');

  /* Create overlay */
  const overlay = document.createElement('div');
  overlay.id = 'intro-loader';
  overlay.innerHTML = `
    <div class="loader-name" aria-hidden="true"></div>
    <div class="loader-bar"><div class="loader-fill"></div></div>
    <div class="loader-tagline">Software Engineer &middot; Security Researcher</div>
  `;
  document.body.prepend(overlay);

  /* Prevent scroll during loader */
  document.body.style.overflow = 'hidden';

  /* Animate name letter by letter */
  const name = 'Shehabul Islam Sawraz';
  const nameEl = overlay.querySelector('.loader-name');
  const fill = overlay.querySelector('.loader-fill');
  const tagline = overlay.querySelector('.loader-tagline');

  let i = 0;
  function typeLetter() {
    if (i < name.length) {
      const span = document.createElement('span');
      span.textContent = name[i];
      span.style.animationDelay = (i * 0.04) + 's';
      nameEl.appendChild(span);
      i++;
      setTimeout(typeLetter, 50);
    }
  }

  /* Start sequence */
  requestAnimationFrame(() => {
    typeLetter();
    /* Progress bar fills over 1.5s */
    setTimeout(() => fill.style.width = '100%', 100);
    /* Show tagline */
    setTimeout(() => tagline.classList.add('show'), 800);
    /* Reveal site */
    setTimeout(() => {
      overlay.classList.add('exit');
      document.body.style.overflow = '';
      setTimeout(() => overlay.remove(), 600);
    }, 2200);
  });
})();

/* ============================================
   LOADER — Terminal-style boot sequence
   Plays once per session (gated by sessionStorage)
   ============================================ */

(function () {
  if (sessionStorage.getItem('loaded')) return;
  sessionStorage.setItem('loaded', '1');

  const overlay = document.createElement('div');
  overlay.id = 'intro-loader';
  overlay.innerHTML = `
    <div class="loader-terminal">
      <div class="loader-lines"></div>
      <div class="loader-name-wrap">
        <div class="loader-name" aria-hidden="true"></div>
        <div class="loader-cursor">_</div>
      </div>
      <div class="loader-bar"><div class="loader-fill"></div></div>
      <div class="loader-hint">Press any key to skip</div>
    </div>
  `;
  document.body.prepend(overlay);
  document.body.style.overflow = 'hidden';

  const linesEl = overlay.querySelector('.loader-lines');
  const nameEl = overlay.querySelector('.loader-name');
  const cursorEl = overlay.querySelector('.loader-cursor');
  const fill = overlay.querySelector('.loader-fill');
  const hint = overlay.querySelector('.loader-hint');

  const bootLines = [
    { text: '> initializing portfolio.sys...', delay: 0 },
    { text: '> loading modules: [security, systems, web]', delay: 300 },
    { text: '> verifying credentials... ✓ BUET CSE', delay: 600 },
    { text: '> connecting: iron-software.service... ✓', delay: 900 },
    { text: '> compiling experience: 3+ years... done', delay: 1200 },
    { text: '> identity resolved:', delay: 1500 },
  ];

  let aborted = false;

  /* Type boot lines */
  bootLines.forEach(({ text, delay }) => {
    setTimeout(() => {
      if (aborted) return;
      const line = document.createElement('div');
      line.className = 'loader-line';
      line.textContent = text;
      linesEl.appendChild(line);
    }, delay);
  });

  /* Type name after boot lines */
  const name = 'Shehabul Islam Sawraz';
  let charIdx = 0;

  function typeName() {
    if (aborted || charIdx >= name.length) {
      if (!aborted) afterName();
      return;
    }
    nameEl.textContent += name[charIdx];
    charIdx++;
    setTimeout(typeName, 60);
  }

  setTimeout(() => {
    if (!aborted) typeName();
  }, 1800);

  function afterName() {
    cursorEl.classList.add('blink');
    fill.style.width = '100%';
    setTimeout(() => {
      if (!aborted) reveal();
    }, 800);
  }

  function reveal() {
    overlay.classList.add('exit');
    document.body.style.overflow = '';
    setTimeout(() => overlay.remove(), 700);
  }

  /* Skip on any key or click */
  function skip() {
    if (aborted) return;
    aborted = true;
    reveal();
  }

  document.addEventListener('keydown', skip, { once: true });
  overlay.addEventListener('click', skip, { once: true });

  /* Show skip hint after 1s */
  setTimeout(() => {
    if (!aborted) hint.classList.add('show');
  }, 1000);
})();

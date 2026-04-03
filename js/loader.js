/* ============================================
   LOADER — Compact terminal boot (< 2.5s)
   Plays once per session (sessionStorage gate)
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

  /* 3 lines only — fast and purposeful */
  const bootLines = [
    { text: '> init sawraz.dev ...', delay: 0 },
    { text: '> credentials verified ✓', delay: 400 },
    { text: '> identity resolved:', delay: 800 },
  ];

  let aborted = false;

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
    setTimeout(typeName, 45);
  }

  setTimeout(() => { if (!aborted) typeName(); }, 1000);

  function afterName() {
    cursorEl.classList.add('blink');
    fill.style.width = '100%';
    setTimeout(() => { if (!aborted) reveal(); }, 500);
  }

  function reveal() {
    overlay.classList.add('exit');
    document.body.style.overflow = '';
    setTimeout(() => overlay.remove(), 700);
  }

  function skip() {
    if (aborted) return;
    aborted = true;
    reveal();
  }

  document.addEventListener('keydown', skip, { once: true });
  overlay.addEventListener('click', skip, { once: true });

  /* Skip hint visible immediately */
  hint.classList.add('show');
})();

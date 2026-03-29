/* ============================================
   COMMAND PALETTE — VS Code style (Ctrl+K / ⌘K)
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  const commands = [
    { label: 'Go to About', icon: 'fa-user', action: () => scrollTo('#about') },
    { label: 'Go to Education', icon: 'fa-graduation-cap', action: () => scrollTo('#education') },
    { label: 'Go to Skills', icon: 'fa-wrench', action: () => scrollTo('#skills') },
    { label: 'Go to Experience', icon: 'fa-briefcase', action: () => scrollTo('#experience') },
    { label: 'Go to Projects', icon: 'fa-code', action: () => scrollTo('#projects') },
    { label: 'Go to Research', icon: 'fa-flask', action: () => scrollTo('#research') },
    { label: 'Go to Achievements', icon: 'fa-trophy', action: () => scrollTo('#achievements') },
    { label: 'Go to Contact', icon: 'fa-envelope', action: () => scrollTo('#contact') },
    { label: 'Toggle Dark Mode', icon: 'fa-moon', action: () => document.getElementById('theme-toggle').click() },
    { label: 'Open GitHub', icon: 'fa-brands fa-github', action: () => window.open('https://github.com/Shehabul-Islam-Sawraz', '_blank') },
    { label: 'Open LinkedIn', icon: 'fa-brands fa-linkedin-in', action: () => window.open('https://www.linkedin.com/in/shehabul-islam-sawraz-ba03542ab/', '_blank') },
    { label: 'Send Email', icon: 'fa-paper-plane', action: () => window.location.href = 'mailto:shehabulislamsawraz@gmail.com' },
    { label: 'Download CV', icon: 'fa-download', action: () => {} },
    { label: 'Back to Top', icon: 'fa-arrow-up', action: () => window.scrollTo({ top: 0, behavior: 'smooth' }) },
  ];

  function scrollTo(selector) {
    const el = document.querySelector(selector);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }

  /* Build palette DOM */
  const overlay = document.createElement('div');
  overlay.className = 'palette-overlay';
  overlay.innerHTML = `
    <div class="palette-box">
      <div class="palette-input-wrap">
        <i class="fa-solid fa-magnifying-glass"></i>
        <input type="text" class="palette-input" placeholder="Type a command..." autocomplete="off" spellcheck="false">
        <kbd>ESC</kbd>
      </div>
      <ul class="palette-list"></ul>
    </div>
  `;
  document.body.appendChild(overlay);

  const input = overlay.querySelector('.palette-input');
  const list = overlay.querySelector('.palette-list');
  let selectedIdx = 0;

  function render(filter = '') {
    const filtered = commands.filter(c =>
      c.label.toLowerCase().includes(filter.toLowerCase())
    );
    list.innerHTML = '';
    selectedIdx = 0;

    filtered.forEach((cmd, i) => {
      const li = document.createElement('li');
      li.className = 'palette-item' + (i === 0 ? ' selected' : '');
      li.innerHTML = `<i class="fa-solid ${cmd.icon}"></i><span>${cmd.label}</span>`;
      li.addEventListener('click', () => { execute(cmd); });
      li.addEventListener('mouseenter', () => {
        list.querySelectorAll('.palette-item').forEach(el => el.classList.remove('selected'));
        li.classList.add('selected');
        selectedIdx = i;
      });
      list.appendChild(li);
    });

    return filtered;
  }

  function execute(cmd) {
    close();
    cmd.action();
  }

  function open() {
    overlay.classList.add('active');
    input.value = '';
    render();
    input.focus();
  }

  function close() {
    overlay.classList.remove('active');
    input.value = '';
  }

  /* Keyboard shortcut: Ctrl+K / ⌘K */
  document.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      if (overlay.classList.contains('active')) {
        close();
      } else {
        open();
      }
    }

    if (!overlay.classList.contains('active')) return;

    if (e.key === 'Escape') {
      close();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      navigate(1);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      navigate(-1);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const items = list.querySelectorAll('.palette-item');
      if (items[selectedIdx]) items[selectedIdx].click();
    }
  });

  function navigate(dir) {
    const items = list.querySelectorAll('.palette-item');
    if (!items.length) return;
    items[selectedIdx].classList.remove('selected');
    selectedIdx = (selectedIdx + dir + items.length) % items.length;
    items[selectedIdx].classList.add('selected');
    items[selectedIdx].scrollIntoView({ block: 'nearest' });
  }

  /* Filter on input */
  input.addEventListener('input', () => render(input.value));

  /* Close on overlay click */
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) close();
  });
});

/* ============================================
   THEME — Light/Dark toggle + Palette switcher
   ============================================ */

/* All available palettes */
window.PALETTES = [
  { id: 'ash-crimson',       name: 'Ash & Crimson',       tag: 'Typeset / Ink on void' },
  { id: 'steel-blue',        name: 'Steel Blue',          tag: 'Blueprint / Deep focus' },
  { id: 'amber-gold',        name: 'Amber Gold',          tag: 'Clean workshop / Night lab' },
  { id: 'calibrated-paper',  name: 'Calibrated Paper',    tag: 'Deep substrate' },
  { id: 'graphite-sage',     name: 'Graphite & Sage',     tag: 'Lab bench / Scope trace' },
  { id: 'carbon-teal',       name: 'Carbon & Teal',       tag: 'Whiteboard / Logic analyzer' },
  { id: 'parchment-ochre',   name: 'Parchment & Ochre',   tag: 'Ruled notebook / Amber lamp' },
  { id: 'midnight-phosphor', name: 'Midnight Phosphor',   tag: 'Retro green terminal' },
  { id: 'obsidian-copper',   name: 'Obsidian & Copper',   tag: 'Oxidized metal' },
  { id: 'electric-violet',   name: 'Electric Violet',     tag: 'Neon circuits / Deep ultraviolet' },
];

/* Apply saved palette + theme immediately to prevent flash */
(function init() {
  const savedPalette = localStorage.getItem('palette');
  const defaultPalette = window.DEFAULT_PALETTE || 'ash-crimson';
  document.documentElement.setAttribute('data-palette', savedPalette || defaultPalette);

  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
  } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.documentElement.setAttribute('data-theme', 'dark');
  }
})();

/* Switch palette (used by command palette and terminal) */
window.setPalette = function(id) {
  document.documentElement.setAttribute('data-palette', id);
  localStorage.setItem('palette', id);
};

document.addEventListener('DOMContentLoaded', () => {
  const themeBtn = document.getElementById('theme-toggle');
  if (!themeBtn) return;

  themeBtn.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  });
});

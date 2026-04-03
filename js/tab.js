/* ============================================
   TAB — Dynamic favicon (matches palette accent)
   and playful title change when tab loses focus
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  const originalTitle = document.title;

  /* --- Dynamic SVG favicon from accent color --- */
  function updateFavicon() {
    const accent = getComputedStyle(document.documentElement)
      .getPropertyValue('--accent').trim() || '#9F1239';

    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
      <rect width="32" height="32" rx="8" fill="${accent}"/>
      <text x="16" y="23" text-anchor="middle" font-family="sans-serif"
            font-weight="700" font-size="18" fill="#fff">S</text>
    </svg>`;

    let link = document.querySelector('link[rel="icon"]');
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.head.appendChild(link);
    }
    link.href = 'data:image/svg+xml,' + encodeURIComponent(svg);
  }

  /* Update on load and when palette changes */
  updateFavicon();

  const observer = new MutationObserver((mutations) => {
    for (const m of mutations) {
      if (m.attributeName === 'data-palette' || m.attributeName === 'data-theme') {
        updateFavicon();
        break;
      }
    }
  });
  observer.observe(document.documentElement, { attributes: true });

  /* --- Tab title change on blur --- */
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      document.title = '\u{1F44B} Come back! — Sawraz';
    } else {
      document.title = originalTitle;
    }
  });
});

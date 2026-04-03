/* ============================================
   TAB — Dynamic favicon (matches palette accent)
   and playful title + photo change on tab blur
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  const originalTitle = document.title;
  let activeFaviconHref = '';

  /* --- Dynamic SVG favicon from accent color --- */
  function buildAccentFavicon() {
    const accent = getComputedStyle(document.documentElement)
      .getPropertyValue('--accent').trim() || '#9F1239';

    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
      <rect width="32" height="32" rx="8" fill="${accent}"/>
      <text x="16" y="23" text-anchor="middle" font-family="sans-serif"
            font-weight="700" font-size="18" fill="#fff">S</text>
    </svg>`;

    return 'data:image/svg+xml,' + encodeURIComponent(svg);
  }

  function setFavicon(href) {
    let link = document.querySelector('link[rel="icon"]');
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.head.appendChild(link);
    }
    link.href = href;
  }

  function updateActiveFavicon() {
    activeFaviconHref = buildAccentFavicon();
    if (!document.hidden) setFavicon(activeFaviconHref);
  }

  updateActiveFavicon();

  const observer = new MutationObserver((mutations) => {
    for (const m of mutations) {
      if (m.attributeName === 'data-palette' || m.attributeName === 'data-theme') {
        updateActiveFavicon();
        break;
      }
    }
  });
  observer.observe(document.documentElement, { attributes: true });

  /* --- Tab blur: swap to hero photo + playful title --- */
  const heroPhotoPath = 'assets/images/hero-photo.jpg';

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      document.title = '\u{1F44B} Come back! \u2014 Sawraz';
      setFavicon(heroPhotoPath);
    } else {
      document.title = originalTitle;
      setFavicon(activeFaviconHref);
    }
  });
});

/* ============================================
   TAB — Playful title change when tab loses focus.
   Favicon is set via <link> in <head> to hero-photo.jpg.
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  const originalTitle = document.title;

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      document.title = '\u{1F44B} Come back! \u2014 Sawraz';
    } else {
      document.title = originalTitle;
    }
  });
});

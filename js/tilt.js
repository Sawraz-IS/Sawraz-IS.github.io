/* ============================================
   TILT — 3D perspective tilt on project cards
   using VanillaTilt.js
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return;
  if (typeof VanillaTilt === 'undefined') return;

  VanillaTilt.init(document.querySelectorAll('.project-card'), {
    max: 12,
    speed: 400,
    glare: true,
    'max-glare': 0.15,
    scale: 1.02
  });
});

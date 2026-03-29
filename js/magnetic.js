/* ============================================
   MAGNETIC BUTTONS — Hero CTAs pull toward
   cursor within ~60px radius, spring back
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return;

  const buttons = document.querySelectorAll('.hero-buttons .btn');

  buttons.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const radius = 60;

      if (dist < radius) {
        const strength = 0.35;
        btn.style.transform = `translate(${dx * strength}px, ${dy * strength}px)`;
      }
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
      btn.style.transition = 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
      setTimeout(() => { btn.style.transition = ''; }, 400);
    });
  });
});

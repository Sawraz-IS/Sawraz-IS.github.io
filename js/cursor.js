/* ============================================
   CURSOR — Custom dot + ring cursor with lerp
   Only on non-touch devices
   ============================================ */

(function () {
  /* Skip on touch devices */
  if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return;

  const dot = document.createElement('div');
  const ring = document.createElement('div');
  dot.id = 'cursor-dot';
  ring.id = 'cursor-ring';
  document.body.appendChild(dot);
  document.body.appendChild(ring);

  let mouseX = -100, mouseY = -100;
  let ringX = -100, ringY = -100;
  let isHovering = false;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  /* Expand ring on interactive elements */
  document.addEventListener('mouseover', (e) => {
    if (e.target.closest('a, button, .project-card, input, textarea, .skill-pill')) {
      isHovering = true;
      ring.classList.add('hover');
      dot.classList.add('hover');
    }
  });

  document.addEventListener('mouseout', (e) => {
    if (e.target.closest('a, button, .project-card, input, textarea, .skill-pill')) {
      isHovering = false;
      ring.classList.remove('hover');
      dot.classList.remove('hover');
    }
  });

  /* Lerp animation loop */
  function animate() {
    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;

    dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
    ring.style.transform = `translate(${ringX}px, ${ringY}px)`;

    requestAnimationFrame(animate);
  }

  animate();
})();

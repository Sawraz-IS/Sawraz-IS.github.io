/* ============================================
   SCRAMBLE — Text decode effect on section
   titles when they scroll into view
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$&';
  const duration = 1200; /* ms */
  const fps = 30;

  function scramble(el) {
    const original = el.getAttribute('data-text') || el.textContent;
    el.setAttribute('data-text', original);
    const length = original.length;
    const interval = duration / fps;
    let frame = 0;
    const totalFrames = Math.ceil(duration / interval);

    const timer = setInterval(() => {
      let output = '';
      for (let i = 0; i < length; i++) {
        /* Characters resolve left-to-right over time */
        const resolveAt = (i / length) * totalFrames * 0.7;
        if (frame > resolveAt) {
          output += original[i];
        } else if (original[i] === ' ') {
          output += ' ';
        } else {
          output += chars[Math.floor(Math.random() * chars.length)];
        }
      }
      el.textContent = output;
      frame++;

      if (frame >= totalFrames) {
        clearInterval(timer);
        el.textContent = original;
      }
    }, interval);
  }

  /* Observe section titles */
  const titles = document.querySelectorAll('.section-title');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        scramble(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  titles.forEach(title => observer.observe(title));
});

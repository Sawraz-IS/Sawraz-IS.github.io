/* ============================================
   PARTICLES — Reactive canvas background for
   hero section. ~50 particles, mouse repulsion,
   connected lines. Killed on mobile/touch.
   ============================================ */

(function () {
  if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return;
  if (window.innerWidth < 768) return;

  document.addEventListener('DOMContentLoaded', () => {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    const canvas = document.createElement('canvas');
    canvas.className = 'hero-canvas';
    canvas.style.cssText = 'position:absolute;inset:0;z-index:0;pointer-events:none;';
    hero.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    let width, height;
    let mouseX = -1000, mouseY = -1000;
    let animId;

    const PARTICLE_COUNT = 45;
    const CONNECT_DIST = 120;
    const MOUSE_RADIUS = 150;
    const particles = [];

    function resize() {
      width = canvas.width = hero.offsetWidth;
      height = canvas.height = hero.offsetHeight;
    }

    function init() {
      resize();
      particles.length = 0;
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          r: Math.random() * 2 + 1,
        });
      }
    }

    function getAccentColor() {
      return getComputedStyle(document.documentElement)
        .getPropertyValue('--accent').trim() || '#9F1239';
    }

    function hexToRgb(hex) {
      const c = hex.replace('#', '');
      return {
        r: parseInt(c.substring(0, 2), 16),
        g: parseInt(c.substring(2, 4), 16),
        b: parseInt(c.substring(4, 6), 16),
      };
    }

    function animate() {
      ctx.clearRect(0, 0, width, height);
      const accent = hexToRgb(getAccentColor());

      particles.forEach(p => {
        /* Mouse repulsion */
        const dx = p.x - mouseX;
        const dy = p.y - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MOUSE_RADIUS && dist > 0) {
          const force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS * 0.8;
          p.vx += (dx / dist) * force;
          p.vy += (dy / dist) * force;
        }

        /* Dampen velocity */
        p.vx *= 0.98;
        p.vy *= 0.98;

        /* Move */
        p.x += p.vx;
        p.y += p.vy;

        /* Wrap edges */
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        /* Draw particle */
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${accent.r},${accent.g},${accent.b},0.15)`;
        ctx.fill();
      });

      /* Connect nearby particles */
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECT_DIST) {
            const alpha = (1 - dist / CONNECT_DIST) * 0.08;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(${accent.r},${accent.g},${accent.b},${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(animate);
    }

    /* Track mouse relative to hero */
    hero.addEventListener('mousemove', (e) => {
      const rect = hero.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    });

    hero.addEventListener('mouseleave', () => {
      mouseX = -1000;
      mouseY = -1000;
    });

    window.addEventListener('resize', () => {
      resize();
    });

    /* Pause when not visible */
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        if (!animId) animate();
      } else {
        cancelAnimationFrame(animId);
        animId = null;
      }
    }, { threshold: 0 });

    observer.observe(hero);
    init();
    animate();
  });
})();

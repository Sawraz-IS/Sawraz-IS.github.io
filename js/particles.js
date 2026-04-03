/* ============================================
   PARTICLES — Full-page section-aware canvas
   Different visual per active section.
   Disabled on touch/mobile.
   ============================================ */

(function () {
  if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return;
  if (window.innerWidth < 768) return;

  document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.createElement('canvas');
    canvas.id = 'bg-canvas';
    canvas.style.cssText = 'position:fixed;inset:0;z-index:0;pointer-events:none;';
    document.body.prepend(canvas);

    const ctx = canvas.getContext('2d');
    let W, H;
    let mouseX = -1000, mouseY = -1000;
    let currentSection = 'hero';
    let animId;

    /* --- Particles --- */
    const PARTICLE_COUNT = 80;
    const particles = [];

    /* --- Grid nodes (for projects) --- */
    const GRID_COLS = 12;
    const GRID_ROWS = 8;

    /* --- Flowing lines (for experience) --- */
    const WAVE_COUNT = 5;

    function resize() {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    }

    function initParticles() {
      particles.length = 0;
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push({
          x: Math.random() * W,
          y: Math.random() * H,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          r: Math.random() * 2.5 + 1,
        });
      }
    }

    function getAccent() {
      const hex = getComputedStyle(document.documentElement)
        .getPropertyValue('--accent').trim() || '#9F1239';
      const c = hex.replace('#', '');
      return {
        r: parseInt(c.substring(0, 2), 16),
        g: parseInt(c.substring(2, 4), 16),
        b: parseInt(c.substring(4, 6), 16),
      };
    }

    /* --- Section detection --- */
    const sectionIds = ['hero', 'about', 'education', 'skills', 'experience', 'projects', 'research', 'achievements', 'contact'];
    const sectionEls = {};

    sectionIds.forEach(id => {
      const el = document.getElementById(id);
      if (el) sectionEls[id] = el;
    });

    function detectSection() {
      const scrollY = window.scrollY + H / 3;
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = sectionEls[sectionIds[i]];
        if (el && el.offsetTop <= scrollY) {
          currentSection = sectionIds[i];
          return;
        }
      }
      currentSection = 'hero';
    }

    window.addEventListener('scroll', detectSection, { passive: true });

    /* --- Drawing modes --- */

    function drawParticleNet(accent, opacityMul) {
      const CONNECT = 130;
      const MOUSE_R = 180;

      particles.forEach(p => {
        const dx = p.x - mouseX;
        const dy = p.y - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MOUSE_R && dist > 0) {
          const force = (MOUSE_R - dist) / MOUSE_R * 0.7;
          p.vx += (dx / dist) * force;
          p.vy += (dy / dist) * force;
        }
        p.vx *= 0.98;
        p.vy *= 0.98;
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = W;
        if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H;
        if (p.y > H) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${accent.r},${accent.g},${accent.b},${0.25 * opacityMul})`;
        ctx.fill();
      });

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < CONNECT) {
            const a = (1 - d / CONNECT) * 0.12 * opacityMul;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(${accent.r},${accent.g},${accent.b},${a})`;
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }
      }
    }

    function drawFlowingWaves(accent, time) {
      for (let w = 0; w < WAVE_COUNT; w++) {
        ctx.beginPath();
        const yBase = H * 0.2 + (H * 0.6 / WAVE_COUNT) * w;
        for (let x = 0; x <= W; x += 4) {
          const y = yBase +
            Math.sin((x * 0.003) + time * 0.001 + w * 1.2) * 30 +
            Math.sin((x * 0.007) + time * 0.0015 + w * 0.8) * 15;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = `rgba(${accent.r},${accent.g},${accent.b},${0.06 + w * 0.01})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }
    }

    function drawDotGrid(accent, time) {
      const spacingX = W / GRID_COLS;
      const spacingY = H / GRID_ROWS;

      for (let col = 0; col <= GRID_COLS; col++) {
        for (let row = 0; row <= GRID_ROWS; row++) {
          let x = col * spacingX;
          let y = row * spacingY;

          /* Gentle drift */
          x += Math.sin(time * 0.001 + col * 0.5 + row * 0.3) * 4;
          y += Math.cos(time * 0.0012 + row * 0.5 + col * 0.3) * 4;

          /* Mouse proximity glow */
          const dx = x - mouseX;
          const dy = y - mouseY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const glow = dist < 200 ? (1 - dist / 200) * 0.4 : 0;

          const baseAlpha = 0.08 + glow;
          const radius = 2 + glow * 4;

          ctx.beginPath();
          ctx.arc(x, y, radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${accent.r},${accent.g},${accent.b},${baseAlpha})`;
          ctx.fill();
        }
      }
    }

    function drawFloatingOrbs(accent, time) {
      for (let i = 0; i < 6; i++) {
        const x = W * (0.1 + 0.15 * i) + Math.sin(time * 0.0005 + i * 2) * 80;
        const y = H * 0.5 + Math.cos(time * 0.0007 + i * 1.5) * (H * 0.3);
        const r = 40 + Math.sin(time * 0.001 + i) * 15;

        const gradient = ctx.createRadialGradient(x, y, 0, x, y, r);
        gradient.addColorStop(0, `rgba(${accent.r},${accent.g},${accent.b},0.06)`);
        gradient.addColorStop(1, `rgba(${accent.r},${accent.g},${accent.b},0)`);

        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      }
    }

    /* --- Main loop --- */
    function animate(time) {
      ctx.clearRect(0, 0, W, H);
      const accent = getAccent();

      switch (currentSection) {
        case 'hero':
        case 'about':
          /* Connected particle network — alive, organic */
          drawParticleNet(accent, 1);
          break;

        case 'education':
        case 'achievements':
          /* Floating orbs — calm, ambient */
          drawFloatingOrbs(accent, time);
          break;

        case 'skills':
          /* Dot grid — structured, precise, technical */
          drawDotGrid(accent, time);
          break;

        case 'experience':
          /* Flowing waves — timeline, progression */
          drawFlowingWaves(accent, time);
          break;

        case 'projects':
          /* Particle net (denser) — building, connecting */
          drawParticleNet(accent, 1.2);
          break;

        case 'research':
          /* Dot grid (research = structured) + subtle orbs */
          drawDotGrid(accent, time);
          drawFloatingOrbs(accent, time);
          break;

        case 'contact':
          /* Gentle floating orbs — warm, inviting */
          drawFloatingOrbs(accent, time);
          drawParticleNet(accent, 0.4);
          break;

        default:
          drawParticleNet(accent, 0.6);
      }

      animId = requestAnimationFrame(animate);
    }

    /* --- Events --- */
    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    document.addEventListener('mouseleave', () => {
      mouseX = -1000;
      mouseY = -1000;
    });

    window.addEventListener('resize', () => {
      resize();
      initParticles();
    });

    /* Pause when tab hidden */
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        cancelAnimationFrame(animId);
        animId = null;
      } else {
        if (!animId) animId = requestAnimationFrame(animate);
      }
    });

    resize();
    initParticles();
    detectSection();
    animId = requestAnimationFrame(animate);
  });
})();

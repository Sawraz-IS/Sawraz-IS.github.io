/* ============================================
   PARTICLES — Full-page section-aware canvas
   with smooth crossfade between visual modes.
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
    let animId;

    /* --- Section tracking with crossfade --- */
    let currentSection = 'hero';
    let prevSection = 'hero';
    let blendProgress = 1; /* 0 = showing prev, 1 = showing current */
    const BLEND_SPEED = 0.025; /* ~0.8s at 60fps */

    /* --- Particles --- */
    const PARTICLE_COUNT = 80;
    const particles = [];

    /* --- Grid config --- */
    const GRID_COLS = 12;
    const GRID_ROWS = 8;

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
      let detected = 'hero';
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = sectionEls[sectionIds[i]];
        if (el && el.offsetTop <= scrollY) {
          detected = sectionIds[i];
          break;
        }
      }
      if (detected !== currentSection) {
        prevSection = currentSection;
        currentSection = detected;
        blendProgress = 0;
      }
    }

    window.addEventListener('scroll', detectSection, { passive: true });

    /* --- Map section to visual mode --- */
    function getMode(section) {
      switch (section) {
        case 'hero':
        case 'about':
          return 'particles';
        case 'skills':
          return 'grid';
        case 'experience':
          return 'constellation';
        case 'projects':
          return 'particles-dense';
        case 'research':
          return 'grid-orbs';
        case 'education':
        case 'achievements':
          return 'orbs';
        case 'contact':
          return 'orbs-particles';
        default:
          return 'particles';
      }
    }

    /* ============ Drawing functions ============ */

    function updateParticles() {
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
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
      });
    }

    function drawParticleNet(accent, alpha) {
      if (alpha < 0.01) return;
      const CONNECT = 130;
      particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${accent.r},${accent.g},${accent.b},${0.25 * alpha})`;
        ctx.fill();
      });
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < CONNECT) {
            const a = (1 - d / CONNECT) * 0.12 * alpha;
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

    function drawConstellation(accent, alpha, time) {
      /* Sparse particles with long connecting lines — circuit/schematic feel */
      if (alpha < 0.01) return;
      const CONNECT = 220;
      const count = 25;
      for (let i = 0; i < count; i++) {
        const p = particles[i];
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${accent.r},${accent.g},${accent.b},${0.35 * alpha})`;
        ctx.fill();

        /* Pulsing outer ring */
        const pulse = 1 + Math.sin(time * 0.003 + i) * 0.3;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 5 * pulse, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${accent.r},${accent.g},${accent.b},${0.08 * alpha})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      /* Long connecting lines — circuit traces */
      for (let i = 0; i < count; i++) {
        for (let j = i + 1; j < count; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < CONNECT) {
            const a = (1 - d / CONNECT) * 0.1 * alpha;
            ctx.beginPath();
            ctx.setLineDash([4, 6]);
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(${accent.r},${accent.g},${accent.b},${a})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
            ctx.setLineDash([]);
          }
        }
      }
    }

    function drawDotGrid(accent, alpha, time) {
      if (alpha < 0.01) return;
      const spacingX = W / GRID_COLS;
      const spacingY = H / GRID_ROWS;

      for (let col = 0; col <= GRID_COLS; col++) {
        for (let row = 0; row <= GRID_ROWS; row++) {
          let x = col * spacingX;
          let y = row * spacingY;
          x += Math.sin(time * 0.001 + col * 0.5 + row * 0.3) * 4;
          y += Math.cos(time * 0.0012 + row * 0.5 + col * 0.3) * 4;

          const dx = x - mouseX;
          const dy = y - mouseY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const glow = dist < 200 ? (1 - dist / 200) * 0.4 : 0;

          ctx.beginPath();
          ctx.arc(x, y, 2 + glow * 4, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${accent.r},${accent.g},${accent.b},${(0.08 + glow) * alpha})`;
          ctx.fill();
        }
      }
    }

    function drawFloatingOrbs(accent, alpha, time) {
      if (alpha < 0.01) return;
      for (let i = 0; i < 6; i++) {
        const x = W * (0.1 + 0.15 * i) + Math.sin(time * 0.0005 + i * 2) * 80;
        const y = H * 0.5 + Math.cos(time * 0.0007 + i * 1.5) * (H * 0.3);
        const r = 40 + Math.sin(time * 0.001 + i) * 15;

        const gradient = ctx.createRadialGradient(x, y, 0, x, y, r);
        gradient.addColorStop(0, `rgba(${accent.r},${accent.g},${accent.b},${0.06 * alpha})`);
        gradient.addColorStop(1, `rgba(${accent.r},${accent.g},${accent.b},0)`);

        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      }
    }

    /* --- Render a mode at given alpha --- */
    function renderMode(mode, accent, alpha, time) {
      switch (mode) {
        case 'particles':
          drawParticleNet(accent, alpha);
          break;
        case 'particles-dense':
          drawParticleNet(accent, alpha * 1.2);
          break;
        case 'grid':
          drawDotGrid(accent, alpha, time);
          break;
        case 'constellation':
          drawConstellation(accent, alpha, time);
          break;
        case 'grid-orbs':
          drawDotGrid(accent, alpha * 0.7, time);
          drawFloatingOrbs(accent, alpha * 0.5, time);
          break;
        case 'orbs':
          drawFloatingOrbs(accent, alpha, time);
          break;
        case 'orbs-particles':
          drawFloatingOrbs(accent, alpha, time);
          drawParticleNet(accent, alpha * 0.3);
          break;
      }
    }

    /* --- Main loop --- */
    function animate(time) {
      ctx.clearRect(0, 0, W, H);
      const accent = getAccent();

      /* Always update particle positions */
      updateParticles();

      /* Advance blend */
      if (blendProgress < 1) {
        blendProgress = Math.min(1, blendProgress + BLEND_SPEED);
      }

      const curMode = getMode(currentSection);
      const prevMode = getMode(prevSection);

      if (blendProgress < 1 && prevMode !== curMode) {
        /* Crossfade: fade out previous, fade in current */
        renderMode(prevMode, accent, 1 - blendProgress, time);
        renderMode(curMode, accent, blendProgress, time);
      } else {
        renderMode(curMode, accent, 1, time);
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

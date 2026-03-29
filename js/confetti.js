/* ============================================
   CONFETTI — Easter egg: type "hire" anywhere
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  let buffer = '';

  document.addEventListener('keydown', (e) => {
    if (e.key.length !== 1) return;
    buffer += e.key.toLowerCase();
    if (buffer.length > 4) buffer = buffer.slice(-4);
    if (buffer === 'hire') {
      buffer = '';
      launchConfetti();
    }
  });

  function launchConfetti() {
    let canvas = document.getElementById('confetti-canvas');
    if (!canvas) {
      canvas = document.createElement('canvas');
      canvas.id = 'confetti-canvas';
      canvas.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:99999;';
      document.body.appendChild(canvas);
    }

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.display = 'block';

    const colors = ['#6366F1', '#22D3EE', '#F472B6', '#FBBF24', '#34D399', '#F87171', '#818CF8'];
    const particles = [];

    for (let i = 0; i < 150; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        w: Math.random() * 10 + 5,
        h: Math.random() * 6 + 3,
        color: colors[Math.floor(Math.random() * colors.length)],
        vx: (Math.random() - 0.5) * 4,
        vy: Math.random() * 3 + 2,
        rotation: Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 10
      });
    }

    const startTime = Date.now();
    const DURATION = 3000;

    function animate() {
      const elapsed = Date.now() - startTime;
      if (elapsed > DURATION) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        canvas.style.display = 'none';
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const fadeStart = DURATION * 0.6;
      const alpha = elapsed > fadeStart ? 1 - (elapsed - fadeStart) / (DURATION - fadeStart) : 1;

      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.05;
        p.rotation += p.rotSpeed;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.globalAlpha = alpha;
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();
      });

      requestAnimationFrame(animate);
    }

    animate();
  }
});

/* ============================================
   PORTFOLIO JS — Shehabul Islam Sawraz
   ============================================ */

/* ---------- Theme Toggle ---------- */
(function initTheme() {
  const saved = localStorage.getItem('theme');
  if (saved) {
    document.documentElement.setAttribute('data-theme', saved);
  } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.documentElement.setAttribute('data-theme', 'dark');
  }
})();

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Theme Toggle ---------- */
  const themeBtn = document.getElementById('theme-toggle');
  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
    });
  }

  /* ---------- Navbar Scroll Shadow ---------- */
  const navbar = document.querySelector('.navbar');
  const backToTop = document.querySelector('.back-to-top');

  window.addEventListener('scroll', () => {
    // Navbar shadow
    if (navbar) {
      navbar.classList.toggle('scrolled', window.scrollY > 20);
    }
    // Back to top visibility
    if (backToTop) {
      backToTop.classList.toggle('visible', window.scrollY > 400);
    }
    // Scroll progress
    updateScrollProgress();
  });

  /* ---------- Scroll Progress Bar ---------- */
  const scrollProgressEl = document.getElementById('scroll-progress');
  function updateScrollProgress() {
    if (!scrollProgressEl) return;
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    scrollProgressEl.style.width = progress + '%';
  }

  /* ---------- Back to Top ---------- */
  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---------- Smooth Scroll for Nav Links ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
        // Close mobile drawer if open
        closeMobileNav();
      }
    });
  });

  /* ---------- Mobile Nav ---------- */
  const hamburger = document.querySelector('.hamburger');
  const navDrawer = document.querySelector('.nav-drawer');
  const navOverlay = document.querySelector('.nav-overlay');

  function closeMobileNav() {
    if (hamburger) hamburger.classList.remove('active');
    if (navDrawer) navDrawer.classList.remove('open');
    if (navOverlay) navOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (hamburger) {
    hamburger.addEventListener('click', () => {
      const isOpen = navDrawer.classList.contains('open');
      if (isOpen) {
        closeMobileNav();
      } else {
        hamburger.classList.add('active');
        navDrawer.classList.add('open');
        navOverlay.classList.add('open');
        document.body.style.overflow = 'hidden';
      }
    });
  }

  if (navOverlay) {
    navOverlay.addEventListener('click', closeMobileNav);
  }

  /* ---------- Active Nav Link on Scroll ---------- */
  const sections = document.querySelectorAll('.section[id]');
  const navLinks = document.querySelectorAll('.nav-links a, .nav-drawer a');

  function highlightNav() {
    const scrollPos = window.scrollY + 100;
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + id) {
            link.classList.add('active');
          }
        });
      }
    });
  }
  window.addEventListener('scroll', highlightNav);

  /* ---------- Intersection Observer — Fade Up ---------- */
  const fadeEls = document.querySelectorAll('.fade-up');
  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        fadeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  fadeEls.forEach(el => fadeObserver.observe(el));

  /* ---------- Skill Pills Staggered Pop-in ---------- */
  const skillCategories = document.querySelectorAll('.skill-category');
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const pills = entry.target.querySelectorAll('.skill-pill');
        pills.forEach((pill, i) => {
          setTimeout(() => pill.classList.add('pop-in'), i * 60);
        });
        skillObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  skillCategories.forEach(cat => skillObserver.observe(cat));

  /* ---------- Typewriter Effect ---------- */
  const typewriterEl = document.getElementById('typewriter');
  if (typewriterEl) {
    const roles = [
      'Software Engineer',
      'Full-Stack Developer',
      'Security Researcher',
      'Aspiring PhD Candidate',
      'Open Source Contributor'
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let speed = 80;

    function type() {
      const current = roles[roleIndex];
      if (isDeleting) {
        typewriterEl.textContent = current.substring(0, charIndex - 1);
        charIndex--;
        speed = 40;
      } else {
        typewriterEl.textContent = current.substring(0, charIndex + 1);
        charIndex++;
        speed = 80;
      }

      if (!isDeleting && charIndex === current.length) {
        speed = 2000; // Pause at end
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        speed = 400; // Pause before next word
      }

      setTimeout(type, speed);
    }
    type();
  }

  /* ---------- Contact Form ---------- */
  const contactForm = document.getElementById('contact-form');
  const formSuccess = document.getElementById('form-success');

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const submitBtn = contactForm.querySelector('.btn-submit');
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;

      try {
        const response = await fetch(contactForm.action, {
          method: 'POST',
          body: new FormData(contactForm),
          headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
          contactForm.reset();
          if (formSuccess) formSuccess.classList.add('show');
          setTimeout(() => {
            if (formSuccess) formSuccess.classList.remove('show');
          }, 5000);
        } else {
          alert('Oops! Something went wrong. Please try again.');
        }
      } catch (err) {
        alert('Network error. Please check your connection.');
      }

      submitBtn.textContent = 'Send Message';
      submitBtn.disabled = false;
    });
  }

  /* ---------- Easter Egg: "hire" Confetti ---------- */
  let buffer = '';
  document.addEventListener('keydown', (e) => {
    // Ignore modifier keys and non-character keys
    if (e.key.length !== 1) return;
    buffer += e.key.toLowerCase();
    // Keep only last 4 chars
    if (buffer.length > 4) buffer = buffer.slice(-4);
    if (buffer === 'hire') {
      buffer = '';
      launchConfetti();
    }
  });

  function launchConfetti() {
    const canvas = document.getElementById('confetti-canvas') || createConfettiCanvas();
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.display = 'block';

    const colors = ['#6366F1', '#22D3EE', '#F472B6', '#FBBF24', '#34D399', '#F87171', '#818CF8'];
    const particles = [];
    const PARTICLE_COUNT = 150;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        w: Math.random() * 10 + 5,
        h: Math.random() * 6 + 3,
        color: colors[Math.floor(Math.random() * colors.length)],
        vx: (Math.random() - 0.5) * 4,
        vy: Math.random() * 3 + 2,
        rotation: Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 10,
        opacity: 1
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
      const globalAlpha = elapsed > fadeStart ? 1 - (elapsed - fadeStart) / (DURATION - fadeStart) : 1;

      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.05; // gravity
        p.rotation += p.rotSpeed;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.globalAlpha = globalAlpha * p.opacity;
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();
      });

      requestAnimationFrame(animate);
    }
    animate();
  }

  function createConfettiCanvas() {
    const c = document.createElement('canvas');
    c.id = 'confetti-canvas';
    c.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:99999;display:none;';
    document.body.appendChild(c);
    return c;
  }

}); // end DOMContentLoaded

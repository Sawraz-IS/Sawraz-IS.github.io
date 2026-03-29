/* ============================================
   NAV — Scroll shadow, smooth scroll, mobile
   drawer, active link highlighting
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.querySelector('.navbar');
  const backToTop = document.querySelector('.back-to-top');
  const scrollProgressEl = document.getElementById('scroll-progress');
  const hamburger = document.querySelector('.hamburger');
  const navDrawer = document.querySelector('.nav-drawer');
  const navOverlay = document.querySelector('.nav-overlay');

  /* --- Scroll handlers --- */
  function onScroll() {
    if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 20);
    if (backToTop) backToTop.classList.toggle('visible', window.scrollY > 400);
    updateScrollProgress();
    highlightNav();
  }

  function updateScrollProgress() {
    if (!scrollProgressEl) return;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    scrollProgressEl.style.width = (docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0) + '%';
  }

  window.addEventListener('scroll', onScroll, { passive: true });

  /* --- Back to top --- */
  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* --- Smooth scroll for anchor links --- */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
        closeMobileNav();
      }
    });
  });

  /* --- Mobile nav drawer --- */
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

  /* --- Active nav link highlighting on scroll --- */
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
          link.classList.toggle('active', link.getAttribute('href') === '#' + id);
        });
      }
    });
  }
});

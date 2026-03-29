/* ============================================
   TYPEWRITER — Cycling roles in hero section
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  const el = document.getElementById('typewriter');
  if (!el) return;

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

  function type() {
    const current = roles[roleIndex];
    let speed;

    if (isDeleting) {
      charIndex--;
      speed = 40;
    } else {
      charIndex++;
      speed = 80;
    }

    el.textContent = current.substring(0, charIndex);

    if (!isDeleting && charIndex === current.length) {
      speed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      speed = 400;
    }

    setTimeout(type, speed);
  }

  type();
});

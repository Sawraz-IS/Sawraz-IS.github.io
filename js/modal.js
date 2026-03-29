/* ============================================
   MODAL — Project detail modal on card click
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  const overlay = document.getElementById('project-modal');
  if (!overlay) return;

  const modalTitle = overlay.querySelector('.modal-header h3');
  const modalYear = overlay.querySelector('.modal-year');
  const modalDesc = overlay.querySelector('.modal-desc');
  const modalTech = overlay.querySelector('.modal-tech');
  const modalGithub = overlay.querySelector('.btn-github');
  const closeBtn = overlay.querySelector('.modal-close');

  /* Open modal when any project card is clicked */
  document.querySelectorAll('.project-card[data-project]').forEach(card => {
    card.addEventListener('click', (e) => {
      /* Don't open modal if user clicked the GitHub link directly */
      if (e.target.closest('.project-link')) return;

      const data = JSON.parse(card.getAttribute('data-project'));
      modalTitle.textContent = data.name;
      modalYear.textContent = data.year;
      modalDesc.textContent = data.desc;
      modalGithub.href = data.github;

      /* Build tech chips */
      modalTech.innerHTML = '';
      data.tech.forEach(t => {
        const chip = document.createElement('span');
        chip.className = 'tech-chip';
        chip.textContent = t;
        modalTech.appendChild(chip);
      });

      overlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  /* Close modal */
  function closeModal() {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  closeBtn.addEventListener('click', closeModal);

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('active')) {
      closeModal();
    }
  });
});

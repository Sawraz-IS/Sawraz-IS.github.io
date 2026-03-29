/* ============================================
   CONTACT — Form submission via Formspree
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contact-form');
  const successMsg = document.getElementById('form-success');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = form.querySelector('.btn-submit');
    btn.textContent = 'Sending...';
    btn.disabled = true;

    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      });

      if (res.ok) {
        form.reset();
        if (successMsg) successMsg.classList.add('show');
        setTimeout(() => {
          if (successMsg) successMsg.classList.remove('show');
        }, 5000);
      } else {
        alert('Oops! Something went wrong. Please try again.');
      }
    } catch {
      alert('Network error. Please check your connection.');
    }

    btn.textContent = 'Send Message';
    btn.disabled = false;
  });
});

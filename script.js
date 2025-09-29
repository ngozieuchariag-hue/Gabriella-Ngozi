// Basic interactivity: mobile nav toggle, contact form feedback, skill bar animation, theme toggle

document.addEventListener('DOMContentLoaded', function () {
  // NAV TOGGLE
  const navToggle = document.querySelector('.nav-toggle');
  if (navToggle) {
    navToggle.addEventListener('click', function () {
      const expanded = this.getAttribute('aria-expanded') === 'true' || false;
      this.setAttribute('aria-expanded', !expanded);
      document.body.classList.toggle('nav-open');
    });
  }

  // Close mobile nav when a link is clicked
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      document.body.classList.remove('nav-open');
      const toggle = document.querySelector('.nav-toggle');
      if (toggle) toggle.setAttribute('aria-expanded', 'false');
    });
  });

  // CONTACT FORM - simple client-side feedback
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      showToast('Thanks! Your message was sent (demo).');
      contactForm.reset();
    });
  }

  // SKILL BARS - animate based on data-percent
  const skillBars = document.querySelectorAll('.skill-bar');
  if (skillBars.length) {
    if ('IntersectionObserver' in window) {
      const obs = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const bars = entry.target.querySelectorAll('.skill-bar');
            bars.forEach(bar => {
              const percent = bar.dataset.percent || 0;
              bar.style.width = percent + '%';
            });
            obs.unobserve(entry.target);
          }
        });
      }, { threshold: 0.2 });

      const skillsSection = document.querySelector('.skills-section');
      if (skillsSection) obs.observe(skillsSection);
      else {
        skillBars.forEach(bar => bar.style.width = bar.dataset.percent + '%');
      }
    } else {
      skillBars.forEach(bar => bar.style.width = bar.dataset.percent + '%');
    }
  }

  // THEME TOGGLE
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    // Load saved theme if exists
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
      document.body.classList.add('light');
      themeToggle.textContent = '☀';
    }

    themeToggle.addEventListener('click', () => {
      document.body.classList.toggle('light');
      const isLight = document.body.classList.contains('light');
      themeToggle.textContent = isLight ? '☀' : '🌙';
      localStorage.setItem('theme', isLight ? 'light' : 'dark');
    });
  }

  // small helper toast
  function showToast(msg) {
    const t = document.createElement('div');
    t.className = 'site-toast';
    t.textContent = msg;
    Object.assign(t.style, {
      position: 'fixed',
      right: '1rem',
      bottom: '1rem',
      background: '#0f1724',
      color: '#fff',
      padding: '0.8rem 1rem',
      borderRadius: '10px',
      zIndex: 9999,
      boxShadow: '0 8px 30px rgba(0,0,0,0.25)',
      transition: 'opacity 0.4s ease'
    });
    document.body.appendChild(t);
    setTimeout(() => t.style.opacity = '0', 2400);
    setTimeout(() => t.remove(), 3000);
  }
});
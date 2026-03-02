(function () {
  // --- Mobile menu ---
  const toggle = document.querySelector('[data-nav-toggle]');
  const panel = document.querySelector('[data-mobile-panel]');

  if (toggle && panel) {
    const closeMenu = () => {
      panel.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    };

    toggle.addEventListener('click', () => {
      const isOpen = panel.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(isOpen));
    });

    // Close when clicking a link (mobile)
    panel.addEventListener('click', (e) => {
      const a = e.target.closest('a');
      if (a) closeMenu();
    });

    // Close on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeMenu();
    });

    // Close if resizing back to desktop
    window.addEventListener('resize', () => {
      if (window.innerWidth > 980) closeMenu();
    });
  }

  // --- Active link highlight ---
  const path = window.location.pathname.split('/').pop() || 'index.html';
  const allNavLinks = document.querySelectorAll('a[href]');

  allNavLinks.forEach((a) => {
    const href = a.getAttribute('href');
    if (!href) return;

    // only handle local html links
    if (href.endsWith('.html') && href === path) {
      a.classList.add('active');
      a.setAttribute('aria-current', 'page');
    }
  });

  // --- Footer year (if you use #year span) ---
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();

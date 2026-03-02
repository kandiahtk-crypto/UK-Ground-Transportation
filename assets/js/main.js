// assets/js/main.js
(function () {
  // --- Mobile menu (matches your HTML: #menuBtn + #mobileNav) ---
  const toggle = document.getElementById("menuBtn");
  const panel = document.getElementById("mobileNav");

  if (toggle && panel) {
    const closeMenu = () => {
      panel.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    };

    const openMenu = () => {
      panel.classList.add("open");
      toggle.setAttribute("aria-expanded", "true");
    };

    toggle.addEventListener("click", () => {
      const isOpen = panel.classList.contains("open");
      if (isOpen) closeMenu();
      else openMenu();
    });

    // Close when clicking a link
    panel.addEventListener("click", (e) => {
      const a = e.target.closest("a");
      if (a) closeMenu();
    });

    // Close when clicking outside the menu
    document.addEventListener("click", (e) => {
      if (!panel.classList.contains("open")) return;
      const clickedInsidePanel = panel.contains(e.target);
      const clickedToggle = toggle.contains(e.target);
      if (!clickedInsidePanel && !clickedToggle) closeMenu();
    });

    // Close on Escape
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeMenu();
    });

    // Close when returning to desktop (match CSS breakpoint 900px)
    window.addEventListener("resize", () => {
      if (window.innerWidth > 900) closeMenu();
    });
  }

  // --- Footer year ---
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
})();

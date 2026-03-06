// assets/js/main.js
(function () {
  // Mobile menu (matches your HTML: #menuBtn + #mobileNav)
  const toggle = document.getElementById("menuBtn");
  const panel = document.getElementById("mobileNav");

  if (toggle && panel) {
    const closeMenu = () => {
      panel.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    };

    toggle.addEventListener("click", () => {
      const isOpen = panel.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });

    // Close when clicking a link
    panel.addEventListener("click", (e) => {
      const a = e.target.closest("a");
      if (a) closeMenu();
    });

    // Close on Escape
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeMenu();
    });

    // Close when returning to desktop
    window.addEventListener("resize", () => {
      if (window.innerWidth > 900) closeMenu();
    });
  }

  // Active link highlight
  const path = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll('a[href]').forEach((a) => {
    const href = a.getAttribute("href");
    if (href && href.endsWith(".html") && href === path) {
      a.classList.add("active");
      a.setAttribute("aria-current", "page");
    }
  });

  // Footer year
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
})();
document.addEventListener("DOMContentLoaded", function () {
  const currentPath = window.location.pathname.split("/").pop() || "index.html";

  const navLinks = document.querySelectorAll(".nav-desktop a, .mobile-nav a");

  navLinks.forEach((link) => {
    const href = link.getAttribute("href");

    if (!href) return;

    // Ignore buttons / anchors / external links
    if (
      href.startsWith("#") ||
      href.startsWith("http") ||
      href.startsWith("mailto:") ||
      href.startsWith("tel:")
    ) {
      return;
    }

    // Match homepage correctly
    const normalizedHref = href === "/" ? "index.html" : href;

    if (normalizedHref === currentPath) {
      link.classList.add("active");
      link.setAttribute("aria-current", "page");
    } else {
      link.classList.remove("active");
      link.removeAttribute("aria-current");
    }
  });
});

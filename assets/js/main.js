(function () {
  // Mobile menu
  const btn = document.getElementById("menuBtn");
  const nav = document.getElementById("mobileNav");

  if (btn && nav) {
    btn.addEventListener("click", () => {
      nav.classList.toggle("open");
      const expanded = btn.getAttribute("aria-expanded") === "true";
      btn.setAttribute("aria-expanded", String(!expanded));
      btn.textContent = nav.classList.contains("open") ? "✕ Close" : "☰ Menu";
    });

    nav.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", () => {
        nav.classList.remove("open");
        btn.setAttribute("aria-expanded", "false");
        btn.textContent = "☰ Menu";
      });
    });
  }

  // Footer year
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();

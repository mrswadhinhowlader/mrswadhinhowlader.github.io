(function () {
  // Year
  const yr = document.getElementById("yr");
  if (yr) yr.textContent = new Date().getFullYear();

  // Mobile menu
  const navBtn = document.getElementById("navBtn");
  const nav = document.getElementById("nav");
  if (navBtn && nav) {
    navBtn.addEventListener("click", () => {
      const open = nav.style.display === "flex";
      nav.style.display = open ? "none" : "flex";
      navBtn.setAttribute("aria-expanded", String(!open));
    });

    // Close menu on link click (mobile)
    nav.querySelectorAll("a").forEach(a => {
      a.addEventListener("click", () => {
        if (window.matchMedia("(max-width: 980px)").matches) {
          nav.style.display = "none";
          navBtn.setAttribute("aria-expanded", "false");
        }
      });
    });
  }

  // FAQ accordion
  document.querySelectorAll(".faq__q").forEach((btn) => {
    btn.addEventListener("click", () => {
      const isOpen = btn.getAttribute("aria-expanded") === "true";
      // close all
      document.querySelectorAll(".faq__q").forEach(b => b.setAttribute("aria-expanded", "false"));
      document.querySelectorAll(".faq__a").forEach(a => (a.style.display = "none"));
      document.querySelectorAll(".faq__icon").forEach(i => (i.textContent = "+"));

      // open current
      if (!isOpen) {
        btn.setAttribute("aria-expanded", "true");
        const ans = btn.nextElementSibling;
        if (ans && ans.classList.contains("faq__a")) ans.style.display = "block";
        const icon = btn.querySelector(".faq__icon");
        if (icon) icon.textContent = "–";
      }
    });
  });

  // Spotlight tracking
  const glass = document.querySelectorAll(".glass");
  glass.forEach((card) => {
    card.addEventListener(
      "mousemove",
      (ev) => {
        const r = card.getBoundingClientRect();
        const x = ((ev.clientX - r.left) / r.width) * 100;
        const y = ((ev.clientY - r.top) / r.height) * 100;
        card.style.setProperty("--mx", x + "%");
        card.style.setProperty("--my", y + "%");
      },
      { passive: true }
    );
  });

  // Tiny toast
  const toast = document.getElementById("toast");
  let tmr = null;
  window.SDH = window.SDH || {};
  window.SDH.toast = (msg) => {
    if (!toast) return;
    toast.textContent = msg;
    toast.style.display = "block";
    clearTimeout(tmr);
    tmr = setTimeout(() => (toast.style.display = "none"), 2600);
  };
})();

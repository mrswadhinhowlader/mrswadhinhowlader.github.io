/* Shared interactions for Swadhin Digital Hub pages */
(function () {
  "use strict";

  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- sticky header ---------- */
  var header = document.querySelector("[data-header]");
  if (header) {
    var setStuck = function () {
      header.classList.toggle("is-stuck", window.scrollY > 12);
    };
    setStuck();
    window.addEventListener("scroll", setStuck, { passive: true });
  }

  /* ---------- mobile navigation ---------- */
  var toggle = document.querySelector("[data-nav-toggle]");
  var nav = document.getElementById("site-nav");
  if (toggle && nav) {
    var closeNav = function () {
      document.body.classList.remove("nav-open");
      toggle.setAttribute("aria-expanded", "false");
    };
    toggle.addEventListener("click", function () {
      var open = document.body.classList.toggle("nav-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    nav.addEventListener("click", function (e) {
      if (e.target.tagName === "A") closeNav();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeNav();
    });
  }

  /* ---------- scroll reveal ---------- */
  var revealables = document.querySelectorAll(".reveal");
  if (revealables.length) {
    if (reduce || !("IntersectionObserver" in window)) {
      revealables.forEach(function (el) { el.classList.add("is-in"); });
    } else {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        });
      }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
      revealables.forEach(function (el) { io.observe(el); });
    }
  }

  /* stagger children of a marked group */
  document.querySelectorAll("[data-stagger]").forEach(function (group) {
    Array.prototype.forEach.call(group.children, function (child, i) {
      child.style.setProperty("--d", (i * 70) + "ms");
    });
  });

  /* ---------- subtle 3D tilt on the workflow panel ---------- */
  var tilt = document.querySelector("[data-tilt]");
  if (tilt && !reduce && window.matchMedia("(hover:hover) and (pointer:fine)").matches) {
    var raf = null, targetX = 0, targetY = 0, currentX = 0, currentY = 0;

    var loop = function () {
      currentX += (targetX - currentX) * 0.09;
      currentY += (targetY - currentY) * 0.09;
      tilt.style.transform =
        "perspective(1100px) rotateX(" + currentY.toFixed(2) + "deg) rotateY(" + currentX.toFixed(2) + "deg)";
      if (Math.abs(targetX - currentX) > 0.02 || Math.abs(targetY - currentY) > 0.02) {
        raf = requestAnimationFrame(loop);
      } else {
        raf = null;
      }
    };

    tilt.addEventListener("mousemove", function (e) {
      var r = tilt.getBoundingClientRect();
      var px = (e.clientX - r.left) / r.width - 0.5;
      var py = (e.clientY - r.top) / r.height - 0.5;
      targetX = px * 7;
      targetY = -py * 7;
      if (!raf) raf = requestAnimationFrame(loop);
    });

    tilt.addEventListener("mouseleave", function () {
      targetX = 0;
      targetY = 0;
      if (!raf) raf = requestAnimationFrame(loop);
    });
  }

  /* ---------- graceful image fallback (missing repo photos) ---------- */
  document.querySelectorAll("img[data-initial]").forEach(function (img) {
    img.addEventListener("error", function () { img.remove(); });
  });
})();

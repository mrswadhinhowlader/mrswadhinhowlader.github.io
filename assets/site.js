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

  /* ----------------------------------------------------------------
     Animated backdrop: a drifting field of connected nodes.
     Each node links to its nearest neighbours and small packets travel
     along those links — the visual language of systems talking to each
     other (a channel, n8n, a sheet, an alert).
     Cheap on purpose: one canvas, capped node count, no libraries,
     paused when the tab is hidden, one static frame when the visitor
     asks for reduced motion.
     ---------------------------------------------------------------- */
  (function () {
    var host = document.querySelector(".backdrop");
    if (!host) return;

    var canvas = document.createElement("canvas");
    canvas.className = "bg-field";
    canvas.setAttribute("aria-hidden", "true");
    /* present enough to be seen, faded at the edges so it never competes
       with the copy in the middle of the page */
    canvas.style.opacity = "0.88";
    canvas.style.maskImage = "radial-gradient(125% 95% at 50% 0%, #000 0%, rgba(0,0,0,.78) 58%, rgba(0,0,0,.38) 100%)";
    canvas.style.webkitMaskImage = canvas.style.maskImage;
    host.insertBefore(canvas, host.firstChild);

    /* soft scrim over the field and under the text: brighter nodes never
       sit directly behind a line of copy */
    var scrim = document.createElement("div");
    scrim.setAttribute("aria-hidden", "true");
    scrim.style.cssText = "position:absolute;inset:0;z-index:1;pointer-events:none;" +
      "background:radial-gradient(min(1000px,90vw) 64vh at 50% 40%, rgba(15,14,12,.58), rgba(15,14,12,.26) 56%, transparent 80%)";
    host.appendChild(scrim);

    var ctx = canvas.getContext("2d");
    if (!ctx) { canvas.remove(); return; }

    var INK = "244,235,222";      /* fine rules + small nodes */
    var ACCENT = "207,127,87";    /* copper: hubs and moving packets */

    var w = 0, h = 0, dpr = 1, linkMax = 240;
    var nodes = [], edges = [], packets = [];
    var pointer = { x: -9999, y: -9999, on: false };
    var last = 0, raf = null, running = false;

    function rnd(a, b) { return a + Math.random() * (b - a); }

    function build() {
      var rect = host.getBoundingClientRect();
      w = Math.max(320, Math.round(rect.width));
      h = Math.max(320, Math.round(rect.height));
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      linkMax = Math.max(190, Math.min(300, Math.round(Math.min(w, h) * 0.42)));

      /* density scales with the viewport, capped for older phones */
      var count = Math.max(20, Math.min(82, Math.round((w * h) / 23500)));

      nodes = [];
      for (var i = 0; i < count; i++) {
        nodes.push({
          x: rnd(0, w),
          y: rnd(0, h),
          vx: rnd(-0.14, 0.14),
          vy: rnd(-0.11, 0.11),
          r: rnd(1.0, 1.7),
          hub: false,
          phase: rnd(0, Math.PI * 2)
        });
      }

      /* a handful of hubs act as the centre of a workflow */
      var hubs = Math.max(2, Math.round(count / 14));
      for (var k = 0; k < hubs; k++) {
        var idx = Math.floor((k + 0.5) * (nodes.length / hubs)) % nodes.length;
        nodes[idx].hub = true;
        nodes[idx].r = rnd(2.4, 3.2);
      }

      /* link every node to its two nearest neighbours, once */
      edges = [];
      var seen = Object.create(null);
      for (var a = 0; a < nodes.length; a++) {
        var near = [];
        for (var b = 0; b < nodes.length; b++) {
          if (a === b) continue;
          var dx = nodes[a].x - nodes[b].x;
          var dy = nodes[a].y - nodes[b].y;
          near.push({ i: b, d: dx * dx + dy * dy });
        }
        near.sort(function (p, q) { return p.d - q.d; });
        for (var n = 0; n < 2 && n < near.length; n++) {
          var j = near[n].i;
          var key = a < j ? a + ":" + j : j + ":" + a;
          if (seen[key]) continue;
          seen[key] = 1;
          edges.push({ a: a, b: j, speed: rnd(0.00016, 0.00042), next: rnd(600, 2600) });
        }
      }

      packets = [];
    }

    function step(dt) {
      var i, n, e, p;

      /* drift, wrapping gently at the edges */
      for (i = 0; i < nodes.length; i++) {
        n = nodes[i];
        n.x += n.vx * dt * 0.06;
        n.y += n.vy * dt * 0.06;
        if (n.x < -40) n.x = w + 40;
        if (n.x > w + 40) n.x = -40;
        if (n.y < -40) n.y = h + 40;
        if (n.y > h + 40) n.y = -40;
      }

      /* let links occasionally release a packet */
      for (i = 0; i < edges.length; i++) {
        e = edges[i];
        e.next -= dt;
        if (e.next > 0) continue;
        e.next = rnd(1800, 5200);
        if (packets.length > 20) continue;
        packets.push({ e: i, t: 0, speed: e.speed });
      }

      for (i = packets.length - 1; i >= 0; i--) {
        p = packets[i];
        p.t += p.speed * dt;
        if (p.t >= 1) packets.splice(i, 1);
      }
    }

    function paint(now) {
      ctx.clearRect(0, 0, w, h);
      var i, e, n, a, b, dx, dy, dist, alpha;

      /* 1px links, brighter the shorter they are */
      ctx.lineWidth = 1;
      for (i = 0; i < edges.length; i++) {
        e = edges[i];
        a = nodes[e.a];
        b = nodes[e.b];
        dx = a.x - b.x;
        dy = a.y - b.y;
        dist = Math.sqrt(dx * dx + dy * dy);
        if (dist > linkMax * 1.5) continue;
        alpha = Math.max(0, 1 - dist / (linkMax * 1.5)) * 0.28;
        ctx.strokeStyle = "rgba(" + INK + "," + alpha.toFixed(3) + ")";
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }

      /* small nodes; hubs breathe */
      for (i = 0; i < nodes.length; i++) {
        n = nodes[i];
        if (n.hub) {
          var pulse = (Math.sin(now * 0.0012 + n.phase) + 1) / 2;
          ctx.beginPath();
          ctx.strokeStyle = "rgba(" + ACCENT + "," + (0.42 - pulse * 0.26).toFixed(3) + ")";
          ctx.arc(n.x, n.y, 3.5 + pulse * 11, 0, Math.PI * 2);
          ctx.stroke();
          ctx.beginPath();
          ctx.fillStyle = "rgba(" + ACCENT + ",0.95)";
          ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.beginPath();
          ctx.fillStyle = "rgba(" + INK + ",0.58)";
          ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      /* packets travelling along a link */
      for (i = 0; i < packets.length; i++) {
        var pk = packets[i];
        var pe = edges[pk.e];
        if (!pe) continue;
        var p1 = nodes[pe.a], p2 = nodes[pe.b];
        var t = pk.t;
        var x = p1.x + (p2.x - p1.x) * t;
        var y = p1.y + (p2.y - p1.y) * t;
        var fade = Math.sin(Math.PI * t);
        ctx.beginPath();
        ctx.fillStyle = "rgba(" + ACCENT + "," + (0.9 * fade).toFixed(3) + ")";
        ctx.arc(x, y, 2.4, 0, Math.PI * 2);
        ctx.fill();
      }

      /* a couple of nodes lean toward the cursor */
      if (pointer.on && !reduce) {
        for (i = 0; i < nodes.length; i++) {
          n = nodes[i];
          dx = n.x - pointer.x;
          dy = n.y - pointer.y;
          dist = Math.sqrt(dx * dx + dy * dy);
          if (dist > 170 || dist < 1) continue;
          ctx.beginPath();
          ctx.strokeStyle = "rgba(" + ACCENT + "," + ((1 - dist / 170) * 0.28).toFixed(3) + ")";
          ctx.moveTo(n.x, n.y);
          ctx.lineTo(pointer.x, pointer.y);
          ctx.stroke();
        }
      }
    }

    function frame(now) {
      if (!running) return;
      raf = requestAnimationFrame(frame);
      if (!last) last = now;
      var dt = Math.min(now - last, 48);
      last = now;
      step(dt);
      paint(now);
    }

    function start() {
      if (running || reduce) return;
      running = true;
      last = 0;
      raf = requestAnimationFrame(frame);
    }

    function stop() {
      running = false;
      if (raf) cancelAnimationFrame(raf);
      raf = null;
    }

    build();

    if (reduce) {
      /* static snapshot: the texture stays, the motion does not */
      for (var warm = 0; warm < 40; warm++) step(16);
      paint(0);
    } else {
      start();
      if (typeof IntersectionObserver === "function") {
        new IntersectionObserver(function (entries) {
          if (entries[0].isIntersecting) start(); else stop();
        }, { threshold: 0 }).observe(canvas);
      }
    }

    document.addEventListener("visibilitychange", function () {
      if (document.hidden) stop(); else start();
    });

    window.addEventListener("pointermove", function (e) {
      if (reduce) return;
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      pointer.on = e.pointerType !== "touch";
    }, { passive: true });

    window.addEventListener("pointerleave", function () { pointer.on = false; });

    var resizeTimer = null;
    window.addEventListener("resize", function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () {
        build();
        if (reduce) paint(0);
      }, 220);
    });
  })();
})();

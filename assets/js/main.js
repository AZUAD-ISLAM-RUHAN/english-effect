/* =========================================================
   English Effect — main.js (shared by every page)
   ---------------------------------------------------------
   1. SITE SETTINGS: number, link sob EKHANE bodlao.
      Puro website e automatic boshe jabe.
   ========================================================= */
var SITE = {
  whatsappGroup: "https://chat.whatsapp.com/",          // TODO: Friday class er WhatsApp group invite link
  whatsappNumber: "8801734370414",                      // 880 diye shuru, + chara
  whatsappText: "+880 1734-370414",                      // dekhanor jonno number
  bkash: "01734-370414",
  nagad: "01647-637157",
  bankName: "Trust Bank PLC",                            // bidesh theke payment (enroll page)
  bankType: "Mudaraba Savings Account",
  bankAccName: "ALI JAKER NIROB",
  bankAccNo: "7028-0311016589",
  bankAccNoAlt: "728-0311016589",
  bankBranch: "Mirpur Branch",
  bankRouting: "240262987",
  whatsappHello: "হ্যালো, আমি English Effect এর কোর্স সম্পর্কে জানতে চাই।",  // floating button er pre-filled message
  email: "englisheffectbd@gmail.com",
  facebook: "https://www.facebook.com/EnglishEffectBD",
  youtube: "https://www.youtube.com/@englisheffectbd",
  domain: "englisheffectbd.com"
};

(function () {
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var page = document.body.dataset.page || "";
  var arrow = '<svg viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';

  /* ---------- 2. Header (shob page e same) ---------- */
  var header = document.getElementById("site-header");
  if (header) {
    header.outerHTML =
      '<div class="progress" id="progress"></div>' +
      '<header class="nav" id="nav"><div class="wrap nav-inner">' +
        '<a href="index.html" class="logo" aria-label="English Effect home"><img src="assets/images/logo.png" alt="English Effect" width="600" height="281" loading="eager"></a>' +
        '<div class="lang-bar" data-lang-switch></div>' +  // phone e switch ta menu er baire, burger er pashe
        '<button class="burger" id="burger" aria-label="Open menu" aria-expanded="false" aria-controls="menu"><span></span><span></span></button>' +
        '<nav class="menu" id="menu">' +
          '<a href="index.html" data-nav="home">Home</a>' +
          '<div class="drop" data-nav="courses"><button type="button" aria-expanded="false">Courses <svg viewBox="0 0 24 24"><path d="M6 9l6 6 6-6"/></svg></button>' +
            '<div class="drop-panel">' +
              '<a href="pte.html"><span class="chip c-pte">PTE</span><span><b>PTE Academic</b><small>Score 10–90, computer-based</small></span></a>' +
              '<a href="ielts.html"><span class="chip c-ielts">IELTS</span><span><b>IELTS</b><small>Academic &amp; General Training</small></span></a>' +
              '<a href="spoken.html"><span class="chip c-spoken">SPK</span><span><b>Spoken English</b><small>Daily talk, interview</small></span></a>' +
              '<a href="kids.html"><span class="chip c-kids">ABC</span><span><b>Kids English</b><small>Stories, phonics</small></span></a>' +
              '<a href="courses.html" style="grid-column:1/-1;justify-content:center;font-weight:700;color:var(--green-dk)">See all courses</a>' +
            '</div></div>' +
          '<a href="mock-test.html" data-nav="mock">Mock Test</a>' +
          '<div class="drop drop-sm" data-nav="tools"><button type="button" aria-expanded="false">Free Tools <span class="free-chip">FREE</span> <svg viewBox="0 0 24 24"><path d="M6 9l6 6 6-6"/></svg></button>' +
            '<div class="drop-panel">' +
              '<a href="level-test.html"><span class="chip c-spoken">TEST</span><span><b>Free Level Test <span class="new-chip">NEW</span></b><small>20 questions, about 10 min</small></span></a>' +
              '<a href="ielts-calculator.html"><span class="chip c-ielts">7.0</span><span><b>IELTS Band Calculator</b><small>Overall band from 4 scores</small></span></a>' +
              '<a href="pte-calculator.html"><span class="chip c-pte">PTE</span><span><b>PTE Score Checker</b><small>Your score vs your target</small></span></a>' +
              '<a href="games.html"><span class="chip c-kids">PLAY</span><span><b>Practice Games</b><small>Typing test, spelling game</small></span></a>' +
              '<a href="daily-word.html"><span class="chip c-plain"><svg viewBox="0 0 24 24"><path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2zM4 21V5M9 7h6M9 11h4"/></svg></span><span><b>Word of the Day</b><small>One useful word a day</small></span></a>' +
              '<a href="study-plan.html"><span class="chip c-plain"><svg viewBox="0 0 24 24"><path d="M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zM4 10h16M8 2v4M16 2v4"/></svg></span><span><b>Study Plan Maker</b><small>Week-by-week IELTS or PTE plan</small></span></a>' +
            '</div></div>' +
          '<a href="free-class.html" data-nav="free">Free Class</a>' +
          '<div class="drop drop-sm" data-nav="about"><button type="button" aria-expanded="false">About <svg viewBox="0 0 24 24"><path d="M6 9l6 6 6-6"/></svg></button>' +
            '<div class="drop-panel">' +
              '<a href="instructor.html"><span class="chip c-plain"><svg viewBox="0 0 24 24"><path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4 21a8 8 0 0 1 16 0"/></svg></span><span><b>Instructor</b><small>Ali Jaker Nirob</small></span></a>' +
              '<a href="faq.html"><span class="chip c-plain"><svg viewBox="0 0 24 24"><path d="M9.5 9a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .9-1 1.7v.5M12 17h.01M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z"/></svg></span><span><b>FAQ</b><small>Classes, payment, exams</small></span></a>' +
              '<a href="contact.html"><span class="chip c-plain"><svg viewBox="0 0 24 24"><path d="M20 12a8 8 0 0 1-11.8 7L4 20l1-4.2A8 8 0 1 1 20 12z"/></svg></span><span><b>Contact</b><small>WhatsApp, email</small></span></a>' +
            '</div></div>' +
          '<button type="button" class="btn btn-ghost btn-sm" data-install-app>Install app</button>' +  // install.js dekhay/lukay
          '<div class="lang-menu" data-lang-switch></div>' +  // lang.js EN / বাং switch boshay (desktop)
          '<a href="enroll.html" class="btn btn-green btn-sm">Enroll now</a>' +
        '</nav>' +
      '</div></header>';
  }

  /* ---------- 3. Footer (shob page e same) ---------- */
  var footer = document.getElementById("site-footer");
  if (footer) {
    footer.outerHTML =
      '<footer class="footer"><div class="wrap">' +
        '<div class="footer-grid">' +
          '<div><a href="index.html" class="logo logo-light"><img src="assets/images/logo-light.png" alt="English Effect" width="600" height="281" loading="lazy"></a>' +
            '<p class="tagline">Your English Can Take You Further</p>' +
            '<p class="small bn">দেশে ও প্রবাসে বাংলাভাষী student দের জন্য PTE, IELTS আর Spoken English।</p></div>' +
          '<div><h4>Courses</h4><a href="pte.html">PTE Academic</a><a href="ielts.html">IELTS</a><a href="spoken.html">Spoken English</a><a href="kids.html">Kids English</a></div>' +
          '<div><h4>Learn</h4><a href="free-class.html">Free live class</a><a href="games.html">Practice games</a><a href="ielts-calculator.html">IELTS calculator</a><a href="pte-calculator.html">PTE calculator</a><a href="instructor.html">Instructor</a><a href="enroll.html">How to enroll</a><a href="faq.html">FAQ</a></div>' +
          '<div><h4>Connect</h4><a href="' + SITE.youtube + '" target="_blank" rel="noopener">YouTube</a><a href="' + SITE.facebook + '" target="_blank" rel="noopener">Facebook</a><a href="' + SITE.whatsappGroup + '" target="_blank" rel="noopener">WhatsApp group</a><a href="contact.html">Contact</a></div>' +
        '</div>' +
        '<p class="copy"><span>© ' + new Date().getFullYear() + ' English Effect</span><span>' + SITE.domain + '</span></p>' +
      '</div></footer>' +
      '<button class="to-top" id="toTop" aria-label="Back to top"><svg viewBox="0 0 24 24"><path d="M12 19V5M6 11l6-6 6 6"/></svg></button>' +
      // floating WhatsApp button (shob page e)
      '<a class="wa-float" id="waFloat" href="https://wa.me/' + SITE.whatsappNumber + '?text=' + encodeURIComponent(SITE.whatsappHello) + '"' +
        ' target="_blank" rel="noopener" aria-label="Chat with English Effect on WhatsApp">' +
        '<span class="wa-label" aria-hidden="true">Chat on WhatsApp</span>' +
        '<span class="wa-icon"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.39-1.47-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.21 3.07.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.7.63.71.22 1.36.19 1.87.12.57-.09 1.76-.72 2-1.41.25-.7.25-1.29.18-1.41-.08-.13-.27-.2-.57-.35m-5.42 7.4h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.44-9.88 9.89-9.88 2.64 0 5.12 1.03 6.99 2.9a9.83 9.83 0 0 1 2.89 6.99c0 5.45-4.44 9.88-9.88 9.88m8.41-18.3A11.82 11.82 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.89c0 2.1.55 4.14 1.59 5.95L.06 24l6.3-1.65a11.88 11.88 0 0 0 5.68 1.45h.01c6.55 0 11.89-5.34 11.89-11.89 0-3.18-1.24-6.17-3.48-8.41z"/></svg></span>' +
      '</a>';
  }

  /* ---------- 4. Fill settings into the page ---------- */
  document.querySelectorAll("[data-site]").forEach(function (el) {
    var v = SITE[el.dataset.site]; if (!v) return;
    if (el.tagName === "A") el.href = v; else el.textContent = v;
  });
  document.querySelectorAll("[data-wa]").forEach(function (a) { a.href = "https://wa.me/" + SITE.whatsappNumber; });

  /* ---------- 5. Active menu item ---------- */
  var map = { home: "home", courses: "courses", pte: "courses", ielts: "courses", spoken: "courses", kids: "courses", free: "free", instructor: "about", faq: "about", contact: "about", games: "tools", typing: "tools", kids_game: "tools", tools: "tools", mock: "mock", module: "courses" };
  var act = document.querySelector('[data-nav="' + map[page] + '"]');
  if (act) act.classList.add("active");

  /* ---------- 6. Mobile menu + dropdown ---------- */
  var burger = document.getElementById("burger"), menu = document.getElementById("menu");
  if (burger) burger.addEventListener("click", function () {
    var open = menu.classList.toggle("open");
    burger.setAttribute("aria-expanded", open);
  });
  document.querySelectorAll(".drop > button").forEach(function (b) {
    b.addEventListener("click", function () {
      var d = b.parentNode, open = d.classList.toggle("open");
      b.setAttribute("aria-expanded", open);
      // ekta khulle onno dropdown bondho
      if (open) document.querySelectorAll(".drop.open").forEach(function (o) { if (o !== d) { o.classList.remove("open"); o.querySelector("button").setAttribute("aria-expanded", "false"); } });
    });
  });
  document.addEventListener("click", function (e) {
    document.querySelectorAll(".drop.open").forEach(function (d) { if (!d.contains(e.target) && window.innerWidth > 860) d.classList.remove("open"); });
  });

  /* ---------- 7. Navbar shadow, progress bar, back-to-top ---------- */
  var nav = document.getElementById("nav"), bar = document.getElementById("progress"), top = document.getElementById("toTop");
  function onScroll() {
    var y = window.scrollY, max = document.documentElement.scrollHeight - window.innerHeight;
    if (nav) nav.classList.toggle("scrolled", y > 8);
    if (bar) bar.style.transform = "scaleX(" + (max > 0 ? y / max : 0) + ")";
    if (top) top.classList.toggle("show", y > 600);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
  if (top) top.addEventListener("click", function () { window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" }); });

  /* ---------- 7b. Floating WhatsApp button ----------
     3 second por ekbar bounce (reduced-motion e na).
     Phone e form er input e type korar shomoy ba Enroll er submit button screen e thakle
     button ta shore jay, jate kichu dheke na fele. */
  var wa = document.getElementById("waFloat");
  if (wa) {
    if (!reduce) setTimeout(function () { wa.classList.add("bounce"); }, 3000);
    var phone = window.matchMedia("(max-width: 640px)"), hideFor = {};
    var setHide = function (why, on) {
      hideFor[why] = on;
      var tuck = phone.matches && (hideFor.typing || hideFor.submit);
      wa.classList.toggle("tucked", tuck);
      if (top) top.classList.toggle("tucked", tuck);   // back-to-top o shore jay
    };
    document.addEventListener("focusin", function (e) { if (e.target.matches("input, textarea, select")) setHide("typing", true); });
    document.addEventListener("focusout", function () { setHide("typing", false); });
    var submit = document.querySelector('.form button[type="submit"]');
    if (submit && "IntersectionObserver" in window) new IntersectionObserver(function (es) { setHide("submit", es[0].isIntersecting); }).observe(submit);
  }

  /* ---------- 8. Scroll reveal ----------
     [data-reveal] element gulo scroll korle niche theke uthe ashe.
     Screen e already thakle kono effect nai (page kokhono khali dekhay na). */
  var groups = new Map();
  var revealEls = document.querySelectorAll("[data-reveal]");
  revealEls.forEach(function (el) {
    var p = el.parentNode, i = groups.get(p) || 0;
    el.style.setProperty("--d", (i * 90) + "ms");
    groups.set(p, i + 1);
  });
  var inView = function (el) { var r = el.getBoundingClientRect(); return r.top < window.innerHeight * 0.92; };
  var onceTargets = document.querySelectorAll(".timeline, .meter");

  if ("IntersectionObserver" in window && !reduce) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.remove("pre");
        e.target.classList.add("in");
        io.unobserve(e.target);
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -6% 0px" });
    revealEls.forEach(function (el) { if (!inView(el)) { el.classList.add("pre"); io.observe(el); } });
    onceTargets.forEach(function (el) { io.observe(el); });
  } else {
    onceTargets.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---------- 9. Hero headline: word by word ---------- */
  var h1 = document.querySelector(".hero h1[data-split]");
  if (h1 && !reduce) {
    var words = h1.textContent.trim().split(/\s+/), hl = (h1.dataset.split || "").split(",");
    h1.innerHTML = words.map(function (w, i) {
      return '<span class="w' + (hl.indexOf(w) > -1 ? " hl" : "") + '" style="--i:' + i + '">' + w + "</span>";
    }).join(" ");
  }

  /* ---------- 10. Countdown to Friday 9:00 PM Bangladesh time (UTC+6) ---------- */
  var cds = document.querySelectorAll("[data-countdown]");
  if (cds.length) {
    var CLASS_MIN = 90; // class koto minute choley (live-now dekhanor jonno)
    function nextClass() {
      var now = Date.now(), off = 6 * 3600e3;
      var bd = new Date(now + off);                    // Bangladesh clock (UTC fields)
      var t = Date.UTC(bd.getUTCFullYear(), bd.getUTCMonth(), bd.getUTCDate(), 21, 0, 0) - off;
      var add = (5 - bd.getUTCDay() + 7) % 7;          // 5 = Friday
      t += add * 864e5;
      if (t + CLASS_MIN * 6e4 < now) t += 7 * 864e5;
      return t;
    }
    var pad = function (n) { return (n < 10 ? "0" : "") + n; };
    var last = {};
    function tick() {
      var t = nextClass(), diff = t - Date.now();
      cds.forEach(function (cd, k) {
        var live = cd.parentNode.querySelector(".live-now");
        if (diff <= 0) { cd.hidden = true; if (live) live.hidden = false; return; }
        cd.hidden = false; if (live) live.hidden = true;
        var v = { d: Math.floor(diff / 864e5), h: Math.floor(diff / 36e5) % 24, m: Math.floor(diff / 6e4) % 60, s: Math.floor(diff / 1e3) % 60 };
        ["d", "h", "m", "s"].forEach(function (u) {
          var b = cd.querySelector('[data-u="' + u + '"]'), txt = pad(v[u]);
          if (b && b.textContent !== txt) {
            b.textContent = txt;
            if (!reduce && last[k + u] !== undefined) { b.classList.remove("tick"); void b.offsetWidth; b.classList.add("tick"); }
            last[k + u] = txt;
          }
        });
      });
    }
    tick(); setInterval(tick, 1000);
    // free-class page: next class in the viewer's own time zone
    document.querySelectorAll("[data-localtime]").forEach(function (el) {
      try {
        el.textContent = new Date(nextClass()).toLocaleString(undefined, { weekday: "long", hour: "numeric", minute: "2-digit", timeZoneName: "short" });
      } catch (e) { el.textContent = "Friday 9:00 PM (Bangladesh)"; }
    });
  }

  /* ---------- 11. Course finder (courses page) ---------- */
  var finder = document.querySelector(".finder");
  if (finder) {
    var grid = document.querySelector(".courses"), msg = document.querySelector(".finder-msg");
    finder.querySelectorAll("button").forEach(function (b) {
      b.addEventListener("click", function () {
        var on = b.getAttribute("aria-pressed") !== "true";
        finder.querySelectorAll("button").forEach(function (x) { x.setAttribute("aria-pressed", "false"); });
        grid.querySelectorAll(".course").forEach(function (c) { c.classList.remove("match"); });
        if (!on) { grid.classList.remove("filtering"); msg.textContent = ""; return; }
        b.setAttribute("aria-pressed", "true");
        grid.classList.add("filtering");
        b.dataset.match.split(",").forEach(function (id) { var c = document.getElementById(id); if (c) c.classList.add("match"); });
        msg.textContent = b.dataset.msg || "";
      });
    });
  }

  /* ---------- 12. Enroll page: course pre-select (enroll.html#pte) + copy number ---------- */
  var sel = document.getElementById("f-course");
  if (sel) {
    var names = { pte: "PTE Academic", ielts: "IELTS", spoken: "Spoken English", kids: "Kids English", "mock-ielts": "IELTS Mock Test Pass (30 days)", "mock-pte": "PTE Mock Test Pass (30 days)" };
    var h = location.hash.replace("#", "");
    if (names[h]) sel.value = names[h];
    // package option gula (packages.js banay): enroll.html#pte-writing
    var byId = h && sel.querySelector('option[data-id="' + h.replace(/[^a-z0-9-]/gi, "") + '"]');
    if (byId) sel.value = byId.value;
  }
  document.querySelectorAll(".copy-btn").forEach(function (b) {
    b.addEventListener("click", function () {
      var txt = b.parentNode.querySelector("b").textContent.replace(/-/g, "");
      var done = function () { b.textContent = "Copied"; setTimeout(function () { b.textContent = "Copy"; }, 1600); };
      if (navigator.clipboard) navigator.clipboard.writeText(txt).then(done, function () {});
    });
  });

  /* ---------- 13. Enroll form ----------
     Netlify te (ba asol domain e) form ta Netlify Forms e jabe.
     Local test (Live Server) ba preview te shudhu thanks page dekhabe. */
  var form = document.getElementById("enrollForm");
  if (form) {
    var hostOk = /netlify\.app$/.test(location.hostname) || location.hostname.indexOf(SITE.domain) > -1;
    if (!hostOk) form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (form.checkValidity()) location.href = "thanks.html";
    });
  }

  /* ---------- 14. Home hero flight ---------- */
  var hero = document.getElementById("hero"), route = document.getElementById("route");
  if (hero && route) {
    var destinations = [["LHR", "London"], ["YYZ", "Toronto"], ["SYD", "Sydney"], ["DUB", "Dublin"], ["MEL", "Melbourne"], ["AKL", "Auckland"]];
    var sky = document.getElementById("sky"), trail = document.getElementById("trail"), plane = document.getElementById("plane"),
        origin = document.getElementById("origin"), dest = document.querySelector(".pass-dest"),
        destCode = document.getElementById("destCode"), destCity = document.getElementById("destCity");
    var len = 0, wide = true, di = 0;

    function layout() {
      var w = hero.clientWidth, hh = hero.clientHeight, x0, y0, d;
      wide = w > 960;
      sky.setAttribute("viewBox", "0 0 " + w + " " + hh);
      if (wide) {
        x0 = Math.max(40, (w - 1200) / 2 + 30); y0 = hh - 52;
        d = "M" + x0 + " " + y0 + " C" + (w * .38) + " " + (hh - 40) + " " + (w * .52) + " " + (hh - 70) + " " + (w * .6) + " " + (hh - 120) +
            " S" + (w * .78) + " " + (hh * .02) + " " + (w + 120) + " " + (-110);
      } else {
        x0 = 28; y0 = hh - 50;
        d = "M" + x0 + " " + y0 + " C" + (w * .35) + " " + (hh - 46) + " " + (w * .62) + " " + (hh - 64) + " " + (w + 90) + " " + (hh - 150);
      }
      route.setAttribute("d", d); trail.setAttribute("d", d);
      origin.setAttribute("transform", "translate(" + x0 + " " + y0 + ")");
      len = route.getTotalLength();
      trail.style.strokeDasharray = len; trail.style.strokeDashoffset = len;
    }
    function place(t) {
      var dist = t * len, p = route.getPointAtLength(dist), q = route.getPointAtLength(Math.min(len, dist + 1));
      var ang = Math.atan2(q.y - p.y, q.x - p.x) * 180 / Math.PI, s = wide ? .75 + t * .7 : .6 + t * .35;
      plane.setAttribute("transform", "translate(" + p.x + " " + p.y + ") rotate(" + ang + ") scale(" + s + ")");
      trail.style.strokeDashoffset = len - dist;
    }
    function nextDest() {
      di = (di + 1) % destinations.length; dest.classList.add("swap");
      setTimeout(function () { destCode.textContent = destinations[di][0]; destCity.textContent = destinations[di][1]; dest.classList.remove("swap"); }, 350);
    }
    layout(); window.addEventListener("resize", layout);
    if (reduce) { plane.style.opacity = 1; place(.55); }
    else {
      var FLY = 4200, REST = 3800, start = null, swapped = false;
      var ease = function (t) { return t < .5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2; };
      var frame = function (ts) {
        if (start === null) start = ts;
        var e = ts - start;
        if (e <= FLY) { plane.style.opacity = 1; trail.style.opacity = .75; place(ease(e / FLY)); }
        else if (e <= FLY + REST) { plane.style.opacity = 0; trail.style.opacity = Math.max(0, .75 * (1 - (e - FLY) / 1400)); if (!swapped) { nextDest(); swapped = true; } }
        else { start = ts; swapped = false; trail.style.strokeDashoffset = len; }
        requestAnimationFrame(frame);
      };
      setTimeout(function () { requestAnimationFrame(frame); }, 900);
    }
  }
})();

/* Service worker (installable app + offline page). Shudhu https e, localhost/file e na. */
if ("serviceWorker" in navigator && location.protocol === "https:") navigator.serviceWorker.register("/sw.js");

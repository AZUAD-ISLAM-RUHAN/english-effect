/* =========================================================
   English Effect — main.js (shared by every page)
   ---------------------------------------------------------
   1. SITE SETTINGS: number, link sob EKHANE bodlao.
      Puro website e automatic boshe jabe.
   ========================================================= */
var SITE = {
  whatsappGroup: "https://chat.whatsapp.com/",          // TODO: Friday class er WhatsApp group invite link
  whatsappNumber: "8801XXXXXXXXX",                       // TODO: 880 diye shuru, + chara
  whatsappText: "01XXX-XXXXXX",                          // TODO: dekhanor jonno number
  bkash: "01XXX-XXXXXX",                                 // TODO
  nagad: "01XXX-XXXXXX",                                 // TODO
  email: "ajnirob66@gmail.com",                          // TODO: confirm koro
  facebook: "https://facebook.com/",                     // TODO
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
        '<a href="index.html" class="logo" aria-label="English Effect home"><img src="assets/images/logo.png" alt="English Effect" width="600" height="281"></a>' +
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
          '<a href="free-class.html" data-nav="free">Free Class</a>' +
          '<a href="instructor.html" data-nav="instructor">Instructor</a>' +
          '<a href="games.html" data-nav="games">Games</a>' +
          '<a href="faq.html" data-nav="faq">FAQ</a>' +
          '<a href="contact.html" data-nav="contact">Contact</a>' +
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
          '<div><a href="index.html" class="logo logo-light"><img src="assets/images/logo-light.png" alt="English Effect" width="600" height="281"></a>' +
            '<p class="tagline">Your English Can Take You Further</p>' +
            '<p class="small bn">দেশে ও প্রবাসে বাংলাভাষী student দের জন্য PTE, IELTS আর Spoken English।</p></div>' +
          '<div><h4>Courses</h4><a href="pte.html">PTE Academic</a><a href="ielts.html">IELTS</a><a href="spoken.html">Spoken English</a><a href="kids.html">Kids English</a></div>' +
          '<div><h4>Learn</h4><a href="free-class.html">Free live class</a><a href="games.html">Practice games</a><a href="instructor.html">Instructor</a><a href="enroll.html">How to enroll</a><a href="faq.html">FAQ</a></div>' +
          '<div><h4>Connect</h4><a href="' + SITE.youtube + '" target="_blank" rel="noopener">YouTube</a><a href="' + SITE.facebook + '" target="_blank" rel="noopener">Facebook</a><a href="' + SITE.whatsappGroup + '" target="_blank" rel="noopener">WhatsApp group</a><a href="contact.html">Contact</a></div>' +
        '</div>' +
        '<p class="copy"><span>© ' + new Date().getFullYear() + ' English Effect</span><span>' + SITE.domain + '</span></p>' +
      '</div></footer>' +
      '<button class="to-top" id="toTop" aria-label="Back to top"><svg viewBox="0 0 24 24"><path d="M12 19V5M6 11l6-6 6 6"/></svg></button>';
  }

  /* ---------- 4. Fill settings into the page ---------- */
  document.querySelectorAll("[data-site]").forEach(function (el) {
    var v = SITE[el.dataset.site]; if (!v) return;
    if (el.tagName === "A") el.href = v; else el.textContent = v;
  });
  document.querySelectorAll("[data-wa]").forEach(function (a) { a.href = "https://wa.me/" + SITE.whatsappNumber; });

  /* ---------- 5. Active menu item ---------- */
  var map = { home: "home", courses: "courses", pte: "courses", ielts: "courses", spoken: "courses", kids: "courses", free: "free", instructor: "instructor", faq: "faq", contact: "contact", games: "games", typing: "games", kids_game: "games" };
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
    var names = { pte: "PTE Academic", ielts: "IELTS", spoken: "Spoken English", kids: "Kids English" };
    var h = location.hash.replace("#", "");
    if (names[h]) sel.value = names[h];
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

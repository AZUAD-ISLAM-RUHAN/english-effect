/* =========================================================
   English Effect — packages.js
   ---------------------------------------------------------
   Data: assets/js/courses-data.js (PACKAGES). Ei file e dam ba tottho nai.
   Load order: courses-data.js -> packages.js -> main.js
   - [data-packages="pte"]   -> pte.html / ielts.html er package card
   - [data-package-page]     -> module.html?exam=pte&module=writing
   - #f-course               -> enroll dropdown (optgroup shoho)
   - [data-pkg-from="pte"]   -> "From ৳3,000"
   ========================================================= */
(function () {
  if (typeof PACKAGES === "undefined") return;
  var P = PACKAGES, EX = P.exams;
  var ARROW = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
  var BN = "০১২৩৪৫৬৭৮৯";
  var esc = function (s) {
    return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; });
  };
  var money = function (n) { return P.currency + Number(n).toLocaleString("en-US"); };
  var bnNum = function (n) { return String(n).replace(/\d/g, function (d) { return BN[d]; }); };
  var id = function (examKey, p) { return examKey + "-" + p.module; };
  var label = function (examKey, p) { return EX[examKey].short + " " + p.name; };
  var detailUrl = function (examKey, p) { return "module.html?exam=" + examKey + "&module=" + p.module; };
  var enrollUrl = function (examKey, p) { return "enroll.html#" + id(examKey, p); };
  var minFee = function (e) { return Math.min.apply(null, e.packages.map(function (p) { return p.fee; })); };

  /* ---------- 1. Package cards (pte.html, ielts.html) ---------- */
  document.querySelectorAll("[data-packages]").forEach(function (box) {
    var key = box.dataset.packages, e = EX[key];
    if (!e) return;
    var mods = e.packages.filter(function (p) { return p.kind === "module"; });
    var full = e.packages.filter(function (p) { return p.kind === "full"; })[0];
    var sum = mods.reduce(function (a, p) { return a + p.fee; }, 0);
    // "৪টা মডিউল আলাদা নিলে ৳12,000, Full Course এ ৳9,000" (data theke hishab)
    var compare = full && mods.length ? bnNum(mods.length) + "টা মডিউল আলাদা নিলে " + money(sum) + ", Full Course এ " + money(full.fee) : "";

    box.innerHTML = e.packages.map(function (p) {
      var isMod = p.kind === "module";
      return '<article class="pkg pkg-' + p.kind + '">' +
        (p.kind === "full" ? '<span class="pkg-chip">Recommended</span>' : "") +
        '<h3>' + esc(p.name) + '</h3>' +
        '<p class="bn pkg-desc">' + esc(p.desc) + '</p>' +
        (isMod && e.moduleNote ? '<p class="bn pkg-note">' + esc(e.moduleNote) + '</p>' : "") +
        '<div class="pkg-fee"><b>' + money(p.fee) + '</b></div>' +
        (isMod && compare ? '<p class="bn pkg-compare">' + esc(compare) + '</p>' : "") +
        '<div class="pkg-actions">' +
          '<a class="btn btn-ghost btn-sm" href="' + detailUrl(key, p) + '">View details<span class="sr-only">: ' + esc(label(key, p)) + '</span></a>' +
          '<a class="btn btn-green btn-sm" href="' + enrollUrl(key, p) + '">Enroll<span class="sr-only"> in ' + esc(label(key, p)) + '</span></a>' +
        '</div></article>';
    }).join("");
  });

  /* ---------- 2. "From ৳3,000" ---------- */
  document.querySelectorAll("[data-pkg-from]").forEach(function (el) {
    var e = EX[el.dataset.pkgFrom];
    if (e) el.textContent = "From " + money(minFee(e));
  });

  /* ---------- 3. Module page (module.html?exam=pte&module=writing) ---------- */
  var page = document.querySelector("[data-package-page]");
  if (page) {
    var q = new URLSearchParams(location.search), key = q.get("exam"), e = EX[key], p = null;
    if (e) p = e.packages.filter(function (x) { return x.module === q.get("module"); })[0];
    if (!p) {
      page.innerHTML =
        '<section class="page-hero"><div class="wrap">' +
          '<nav class="crumbs" aria-label="Breadcrumb"><a href="index.html">Home</a><span><a href="courses.html">Courses</a></span><span>Not found</span></nav>' +
          '<h1>Course not found</h1><p class="bn">এই কোর্স বা মডিউলটা খুঁজে পাওয়া যায়নি।</p>' +
          '<div class="hero-cta"><a href="courses.html" class="btn btn-green">See all courses ' + ARROW + '</a></div>' +
        '</div></section>';
      document.title = "Course not found | English Effect";
    } else {
      var name = label(key, p);
      document.title = name + " | English Effect";
      var md = document.querySelector('meta[name="description"]');
      if (md) md.setAttribute("content", name + " at English Effect: " + p.practise.map(function (g) { return e.groups[g].title; }).join(", ") + ".");
      var tasks = p.practise.map(function (g) {
        var G = e.groups[g];
        return '<div class="task"><h3><i></i>' + esc(G.title) + '</h3><p class="bn">' + esc(G.desc) + '</p>' +
          (G.items.length ? '<ul>' + G.items.map(function (t) { return '<li>' + esc(t) + '</li>'; }).join("") + '</ul>' : "") + '</div>';
      }).join("");
      page.innerHTML =
        '<section class="page-hero ph-' + key + '">' +
          '<span class="ghost" aria-hidden="true">' + esc(e.short) + '</span>' +
          '<div class="wrap">' +
            '<nav class="crumbs" aria-label="Breadcrumb"><a href="index.html">Home</a><span><a href="courses.html">Courses</a></span>' +
              '<span><a href="' + e.page + '">' + esc(e.short) + '</a></span><span>' + esc(p.name) + '</span></nav>' +
            '<h1>' + esc(name) + '</h1>' +
            '<p class="bn">' + esc(p.desc) + '</p>' +
          '</div>' +
        '</section>' +
        '<section class="section"><div class="wrap detail">' +
          '<div class="detail-main"><div>' +
            '<span class="kicker">Course content</span>' +
            '<h2 class="h2">What you\'ll practise</h2>' +
            (p.kind === "module" && e.moduleNote ? '<p class="bn pkg-note pkg-note-lg">' + esc(e.moduleNote) + '</p>' : "") +
            '<div class="tasks">' + tasks + '</div>' +
            '<p class="pkg-back"><a class="link" href="' + e.page + '#packages">See all ' + esc(e.short) + ' packages</a></p>' +
          '</div></div>' +
          '<aside class="side">' +
            '<h3>' + esc(name) + '</h3>' +
            '<dl>' +
              '<div><dt>Duration</dt><dd>' + esc(p.duration) + '</dd></div>' +
              '<div><dt>Classes</dt><dd>' + esc(p.classes) + '</dd></div>' +
              '<div><dt>Mode</dt><dd>Online live</dd></div>' +
              '<div><dt>Fee</dt><dd>' + money(p.fee) + '</dd></div>' +
            '</dl>' +
            '<a href="' + enrollUrl(key, p) + '" class="btn btn-green btn-block">Enroll in this course</a>' +
            '<a href="#" data-wa class="btn btn-ghost btn-block" target="_blank" rel="noopener">Ask on WhatsApp</a>' +
            '<small class="bn">ভর্তির আগে একবার ফ্রি শুক্রবারের লাইভ ক্লাসে বসে দেখতে পারেন।</small>' +
          '</aside>' +
        '</div></section>';
    }
  }

  /* ---------- 4. Enroll dropdown ---------- */
  var sel = document.getElementById("f-course");
  if (sel) {
    var opt = function (oid, text) { return '<option value="' + esc(text) + '" data-id="' + esc(oid) + '">' + esc(text) + '</option>'; };
    var html = '<option value="">Select a course</option>';
    Object.keys(EX).forEach(function (key) {
      html += '<optgroup label="' + esc(EX[key].name) + '">' +
        EX[key].packages.map(function (p) { return opt(id(key, p), label(key, p)); }).join("") +
        '</optgroup>';
    });
    if (P.otherCourses && P.otherCourses.length) {
      html += '<optgroup label="Other courses">' + P.otherCourses.map(function (c) { return opt(c.id, c.name); }).join("") + '</optgroup>';
    }
    sel.innerHTML = html;
  }
})();

/* =========================================================
   English Effect — Study plan maker (study-plan.html)
   Exam date, ekhoner score, target, din e koto shomoy, durbol part
   diye shoptaho-wise plan banay. Eta shudhu ekta suggestion.
   Task list bodlate TASKS edit koro.
   ========================================================= */
(function () {
  var app = document.getElementById("sp-app");
  if (!app) return;
  var WA = (window.SITE && SITE.whatsappNumber) || "";
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  function $(id) { return document.getElementById(id); }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }

  var SKILLS = {
    ielts: ["Listening", "Reading", "Writing", "Speaking"],
    pte: ["Speaking", "Writing", "Reading", "Listening"]
  };
  var TASKS = {
    ielts: {
      Listening: ["Form and note completion practice", "Map and plan labelling", "Multiple choice with distractors", "Spelling of names and numbers"],
      Reading: ["Skimming and scanning drills", "True / False / Not Given", "Matching headings", "Timed passage (20 minutes)"],
      Writing: ["Task 1: describe a chart or letter", "Task 2: plan an essay in 5 minutes", "Task 2: full essay in 40 minutes", "Linking words and paragraphing"],
      Speaking: ["Part 1 short answers", "Part 2 cue card, 2 minutes", "Part 3 discussion answers", "Record yourself and check fluency"]
    },
    pte: {
      Speaking: ["Read Aloud practice", "Repeat Sentence", "Describe Image templates", "Re-tell Lecture"],
      Writing: ["Summarize Written Text", "Write Essay in 20 minutes", "Grammar and spelling check", "Essay structure practice"],
      Reading: ["Reading Fill in the Blanks", "Re-order Paragraphs", "Multiple choice practice", "Collocations and word forms"],
      Listening: ["Write from Dictation", "Summarize Spoken Text", "Highlight Incorrect Words", "Fill in the Blanks (listening)"]
    }
  };
  var PHASES = [
    { key: "foundation", name: "Foundation", bn: "ফরম্যাট বোঝা আর ভিত শক্ত করা" },
    { key: "skills", name: "Skill building", bn: "প্রতিটা প্রশ্নের ধরন ধরে ধরে প্র্যাকটিস" },
    { key: "mocks", name: "Exam practice", bn: "সময় ধরে মক টেস্ট আর ভুল ঠিক করা" }
  ];

  var state = { exam: "ielts", weak: [] };
  var last = null;   // shesh banano plan, PDF er jonno

  function defaultDate() { var d = new Date(Date.now() + 56 * 864e5); return d.toISOString().slice(0, 10); }

  function form() {
    var isI = state.exam === "ielts", sk = SKILLS[state.exam];
    $("sp-form").innerHTML =
      '<div class="sp-field"><span class="sp-label">Exam</span><div class="seg" role="group" aria-label="Exam">' +
        '<button type="button" data-exam="ielts" aria-pressed="' + isI + '">IELTS</button><button type="button" data-exam="pte" aria-pressed="' + !isI + '">PTE</button></div></div>' +
      '<div class="sp-field"><label class="sp-label" for="sp-date">Exam date</label><input type="date" id="sp-date" class="sp-input" value="' + ($("sp-date") ? $("sp-date").value : defaultDate()) + '"></div>' +
      '<div class="sp-row">' +
        '<div class="sp-field"><label class="sp-label" for="sp-now">' + (isI ? "Current band (or guess)" : "Current score (or guess)") + '</label><input type="number" id="sp-now" class="sp-input" ' + (isI ? 'min="1" max="9" step="0.5" value="5.5"' : 'min="10" max="90" step="1" value="50"') + "></div>" +
        '<div class="sp-field"><label class="sp-label" for="sp-target">Target</label><input type="number" id="sp-target" class="sp-input" ' + (isI ? 'min="1" max="9" step="0.5" value="7"' : 'min="10" max="90" step="1" value="65"') + "></div>" +
      "</div>" +
      '<div class="sp-field"><label class="sp-label" for="sp-hours">Study time per day: <b id="sp-hours-v">2 hours</b></label><input type="range" id="sp-hours" min="0.5" max="6" step="0.5" value="2"></div>' +
      '<div class="sp-field"><span class="sp-label">Weak areas <small>(choose any)</small></span><div class="sp-chips">' +
        sk.map(function (s) { return '<button type="button" aria-pressed="' + (state.weak.indexOf(s) > -1) + '" data-weak="' + s + '">' + s + "</button>"; }).join("") + "</div></div>" +
      '<button type="button" class="btn btn-green btn-block" id="sp-make">Make my study plan</button>';

    app.querySelectorAll("[data-exam]").forEach(function (b) { b.onclick = function () { state.exam = b.dataset.exam; state.weak = []; form(); }; });
    app.querySelectorAll("[data-weak]").forEach(function (b) {
      b.onclick = function () {
        var s = b.dataset.weak, i = state.weak.indexOf(s);
        if (i > -1) state.weak.splice(i, 1); else state.weak.push(s);
        b.setAttribute("aria-pressed", i < 0);
      };
    });
    var h = $("sp-hours");
    h.oninput = function () { $("sp-hours-v").textContent = h.value + (h.value === "1" ? " hour" : " hours"); };
    $("sp-make").onclick = make;
  }

  function make() {
    var exam = state.exam, isI = exam === "ielts", sk = SKILLS[exam];
    var date = $("sp-date").value, now = parseFloat($("sp-now").value), target = parseFloat($("sp-target").value), hrs = parseFloat($("sp-hours").value);
    var out = $("sp-out");
    if (!date || isNaN(now) || isNaN(target)) { out.innerHTML = '<div class="sp-msg">Please fill in the exam date, your current score and your target.</div>'; return; }
    var bd = new Date(Date.now() + 6 * 3600e3), todayStr = bd.toISOString().slice(0, 10);
    var days = Math.round((Date.parse(date) - Date.parse(todayStr)) / 864e5);
    if (days < 1) { out.innerHTML = '<div class="sp-msg bn">পরীক্ষার তারিখ আজকের পরে হতে হবে।</div>'; return; }
    var weeks = Math.max(1, Math.ceil(days / 7));
    var gap = Math.max(0, target - now), gapUnits = isI ? gap * 2 : gap / 5; // half bands vs 5-point steps
    var weak = state.weak.length ? state.weak : [];

    // warnings (plain guidance, no promises)
    var warn = "";
    if (target <= now) warn = "আপনার টার্গেট আপনার এখনকার স্কোরের সমান বা কম। এই প্ল্যানটা স্কোর ধরে রাখা আর মক টেস্টে জোর দেবে।";
    else if (weeks <= 2) warn = "পরীক্ষার আগে সময় খুব কম। নতুন কিছু শেখার চেয়ে ফরম্যাট, সময় ভাগ আর মক টেস্টে জোর দিন।";
    else if (gapUnits / weeks > 1 && hrs < 2) warn = "টার্গেটের তুলনায় সময় কম মনে হচ্ছে। প্রতিদিনের সময় বাড়ানো বা পরীক্ষার তারিখ একটু পিছানো ভেবে দেখতে পারেন।";

    // phase lengths
    var ph;
    if (weeks <= 2) ph = [0, weeks === 2 ? 1 : 0, 1];
    else if (weeks <= 4) ph = [1, weeks - 2, 1];
    else { var f = Math.max(1, Math.round(weeks * .25)), m = Math.max(1, Math.round(weeks * .3)); ph = [f, weeks - f - m, m]; }

    // daily minutes split: weak skills count double
    var mins = Math.round(hrs * 60), wsum = sk.reduce(function (a, s) { return a + (weak.indexOf(s) > -1 ? 2 : 1); }, 0);
    var split = sk.map(function (s) { return [s, Math.round(mins * (weak.indexOf(s) > -1 ? 2 : 1) / wsum / 5) * 5]; });

    // weeks
    var cards = [], w = 0;
    PHASES.forEach(function (P, pi) {
      for (var k = 0; k < ph[pi]; k++) {
        w++;
        var focus = weak.length ? [weak[(w - 1) % weak.length], sk[(w - 1) % sk.length]] : [sk[(w - 1) % sk.length], sk[w % sk.length]];
        focus = focus.filter(function (x, i) { return focus.indexOf(x) === i; });
        var tasks = [];
        focus.forEach(function (s) { var list = TASKS[exam][s]; tasks.push(s + ": " + list[(w + k) % list.length]); if (P.key !== "foundation") tasks.push(s + ": " + list[(w + k + 1) % list.length]); });
        if (P.key === "foundation") tasks.unshift("Learn the full " + (isI ? "IELTS" : "PTE") + " format and timing for every part");
        if (P.key === "mocks") tasks.push(w === weeks ? "1 full mock test early in the week, then light revision and rest before the exam" : "1 full timed mock test, then review every mistake in the error log");
        if (P.key === "skills" && k % 2 === 1) tasks.push("1 sectional test on your weakest part");
        cards.push({ n: w, phase: P, focus: focus, tasks: tasks });
      }
    });

    var exDate = new Date(date + "T00:00:00").toLocaleDateString(undefined, { day: "numeric", month: "long", year: "numeric" });
    last = { isI: isI, exDate: exDate, now: now, target: target, weeks: weeks, days: days, hrs: hrs, mins: mins, weak: weak.slice(), warn: warn, ph: ph, split: split, cards: cards };
    var summary = (isI ? "IELTS" : "PTE") + " · " + exDate + " · " + weeks + " week" + (weeks > 1 ? "s" : "") + " · " + now + " → " + target;
    var waText = "হ্যালো, আমি English Effect এর study plan maker দিয়ে একটা প্ল্যান বানিয়েছি: " + summary + ", প্রতিদিন " + hrs + " ঘণ্টা" + (weak.length ? ", দুর্বল: " + weak.join(", ") : "") + "। এই প্ল্যান অনুযায়ী কোন কোর্স ভালো হবে?";

    out.innerHTML =
      '<div class="sp-result">' +
        '<div class="sp-sum"><div><small>Your plan</small><h2>' + esc(summary) + '</h2></div>' +
          '<div class="sp-big"><b>' + days + '</b><span>days left</span></div></div>' +
        (warn ? '<p class="sp-warn bn">' + warn + "</p>" : "") +
        '<div class="sp-phases">' + PHASES.map(function (P, i) { return ph[i] ? '<div style="flex:' + ph[i] + '" class="p' + i + '"><b>' + P.name + "</b><span>" + ph[i] + " wk</span></div>" : ""; }).join("") + "</div>" +
        '<div class="sp-day"><small>A typical day (' + mins + ' min)</small><div class="sp-split">' + split.map(function (x) { return '<div style="flex:' + Math.max(x[1], 5) + '" class="' + (weak.indexOf(x[0]) > -1 ? "weak" : "") + '"><b>' + x[0] + "</b><span>" + x[1] + " min</span></div>"; }).join("") + "</div></div>" +
        '<ol class="sp-weeks">' + cards.map(function (c, i) {
          return '<li style="--i:' + i + '"><div class="sp-wk-head"><span class="sp-wk-n">Week ' + c.n + '</span><span class="sp-wk-ph p' + PHASES.indexOf(c.phase) + '">' + c.phase.name + "</span></div>" +
            '<p class="sp-wk-bn bn">' + c.phase.bn + "</p><ul>" + c.tasks.map(function (t) { return "<li>" + esc(t) + "</li>"; }).join("") + "</ul></li>";
        }).join("") + "</ol>" +
        '<div class="btn-row"><a class="btn btn-green" target="_blank" rel="noopener" href="https://wa.me/' + WA + "?text=" + encodeURIComponent(waText) + '">Send my plan on WhatsApp</a>' +
        '<button type="button" class="btn btn-dark" id="sp-pdf">Download PDF</button>' +
        '<a class="btn btn-ghost" href="' + (isI ? "ielts" : "pte") + '.html">' + (isI ? "IELTS" : "PTE") + ' packages</a><a class="btn btn-ghost" href="mock-test.html">Free mock test</a></div>' +
        '<p class="sp-note bn">এটা একটা সাধারণ পরামর্শ, কোনো স্কোরের গ্যারান্টি না। শিক্ষকের সাথে কথা বলে আপনার জন্য প্ল্যানটা আরও ঠিক করে নিতে পারেন।</p>' +
      "</div>";
    out.querySelector(".sp-result").classList.add("in");
    $("sp-pdf").onclick = function () { savePdf(this); };
    out.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  }

  /* ---------- PDF download ----------
     Plan ta ekta alada sada A4 layout e banai (.pdf-doc, animation chara), Hind Siliguri ar
     Montserrat load howar por html2pdf.js diye PDF. Week card 2 ta kore ek row te, row page er
     majhe kate na. html2pdf load na hole (ba fail korle) window.print(), study-plan.css er print CSS. */
  function score(isI, v) { return isI ? v.toFixed(1) : String(Math.round(v)); }

  function pdfDoc(P) {
    var site = window.SITE || {}, exam = P.isI ? "IELTS" : "PTE";
    var fact = function (k, v) { return "<div><small>" + k + "</small><b>" + esc(v) + "</b></div>"; };
    var card = function (c) {
      var pi = PHASES.indexOf(c.phase);
      return '<div class="pdf-wk p' + pi + '"><div class="pdf-wk-head"><b>Week ' + c.n + '</b><span class="p' + pi + '">' + c.phase.name + "</span></div>" +
        '<p class="bn">' + c.phase.bn + "</p><ul>" + c.tasks.map(function (t) { return "<li>" + esc(t) + "</li>"; }).join("") + "</ul></div>";
    };
    var rows = [];
    for (var i = 0; i < P.cards.length; i += 2) {
      rows.push('<div class="pdf-row pdf-keep">' + card(P.cards[i]) + (P.cards[i + 1] ? card(P.cards[i + 1]) : '<div class="pdf-wk pdf-blank"></div>') + "</div>");
    }
    var d = document.createElement("div");
    d.className = "pdf-doc";
    d.innerHTML =
      '<div class="pdf-head pdf-keep"><img src="assets/images/logo.png" alt="English Effect" width="600" height="281"><div><small>Study plan maker</small><h1>Your study plan</h1></div></div>' +
      '<div class="pdf-facts pdf-keep">' +
        fact("Exam", exam) + fact("Exam date", P.exDate) + fact("Current → target", score(P.isI, P.now) + " → " + score(P.isI, P.target)) +
        fact("Weeks", P.weeks + " week" + (P.weeks > 1 ? "s" : "") + " (" + P.days + " days)") + fact("Study time", P.hrs + (P.hrs === 1 ? " hour" : " hours") + " a day") +
        fact("Weak areas", P.weak.length ? P.weak.join(", ") : "None chosen") +
      "</div>" +
      (P.warn ? '<p class="pdf-warn bn pdf-keep">' + P.warn + "</p>" : "") +
      '<div class="pdf-sec pdf-keep"><h2>Phases</h2><div class="pdf-bar">' + PHASES.map(function (Ph, i) {
        return P.ph[i] ? '<div style="flex:' + P.ph[i] + '" class="p' + i + '"><b>' + Ph.name + "</b><span>" + P.ph[i] + " wk</span></div>" : "";
      }).join("") + "</div></div>" +
      '<div class="pdf-sec pdf-keep"><h2>A typical day (' + P.mins + ' min)</h2><div class="pdf-bar">' + P.split.map(function (x) {
        return '<div style="flex:' + Math.max(x[1], 5) + '" class="s' + (P.weak.indexOf(x[0]) > -1 ? " weak" : "") + '"><b>' + x[0] + "</b><span>" + x[1] + " min</span></div>";
      }).join("") + "</div></div>" +
      '<div class="pdf-sec pdf-keep"><h2>Week by week</h2>' + (rows.shift() || "") + "</div>" + rows.join("") +
      '<div class="pdf-sec pdf-keep"><p class="pdf-note bn">এটা একটা সাধারণ পরামর্শ, কোনো স্কোরের গ্যারান্টি না। শিক্ষকের সাথে কথা বলে আপনার জন্য প্ল্যানটা আরও ঠিক করে নিতে পারেন।</p>' +
      '<div class="pdf-strip pdf-keep"><b>Free live class every Friday 9 PM</b> · WhatsApp ' + esc(site.whatsappText || "+880 1734-370414") + " · " + esc(site.domain || "englisheffectbd.com") + "</div></div>";
    return d;
  }

  // Bangla (Hind Siliguri) ar Montserrat load howar por PDF; net slow hole 4 second por egiye jay
  function fontsReady() {
    if (!document.fonts || !document.fonts.load) return Promise.resolve();
    var want = ['400 12px "Hind Siliguri"', '600 12px "Hind Siliguri"', '600 12px Montserrat', '800 12px Montserrat', '900 12px Montserrat'];
    var all = Promise.all(want.map(function (f) { return document.fonts.load(f, "অআকখ্য Aa"); })).then(function () { return document.fonts.ready; });
    return Promise.race([all, new Promise(function (r) { setTimeout(r, 4000); })]);
  }

  function printPlan() {
    if (!last) return;
    var old = document.querySelector(".pdf-print");
    if (old) old.remove();
    var box = document.createElement("div");
    box.className = "pdf-print";
    box.appendChild(pdfDoc(last));
    document.body.appendChild(box);
    document.body.classList.add("sp-printing");
    var end = function () { document.body.classList.remove("sp-printing"); box.remove(); window.removeEventListener("afterprint", end); };
    window.addEventListener("afterprint", end);
    fontsReady().then(function () { window.print(); });
  }

  function savePdf(btn) {
    if (!last) return;
    if (!window.html2pdf) { printPlan(); return; }
    var name = "EnglishEffect-StudyPlan-" + (last.isI ? "IELTS" : "PTE") + "-" + score(last.isI, last.target) + ".pdf";
    var label = btn.textContent;
    btn.disabled = true; btn.textContent = "Making PDF...";
    var holder = document.createElement("div"), doc = pdfDoc(last), img = doc.querySelector("img");
    holder.className = "pdf-holder";
    holder.appendChild(doc);
    document.body.appendChild(holder);
    var done = function () { holder.remove(); btn.disabled = false; btn.textContent = label; };
    fontsReady()
      .then(function () { return img.decode ? img.decode().catch(function () {}) : null; })
      .then(function () {
        // phone e canvas khub boro hole fanka ashe, tai lomba plan e scale kom
        var w = doc.offsetWidth, h = doc.offsetHeight;
        var scale = Math.max(1, Math.min(2, Math.sqrt(14e6 / (w * h)), 30000 / h));
        return html2pdf().set({
          margin: [10, 10, 12, 10],
          filename: name,
          image: { type: "jpeg", quality: 0.95 },
          // html2canvas page ta copy kore; copy te body er fade-in animation abar shuru hoy (opacity 0),
          // tai copy te animation bondho, ar scroll jekhanei thakuk upor theke dhore
          html2canvas: {
            scale: scale, backgroundColor: "#ffffff", useCORS: true, logging: false, scrollX: 0, scrollY: 0,
            onclone: function (d) { var st = d.createElement("style"); st.textContent = "*,*::before,*::after{animation:none!important;transition:none!important}"; d.head.appendChild(st); }
          },
          jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
          pagebreak: { mode: ["css"], avoid: ".pdf-keep" }
        }).from(doc).save();
      })
      .then(done, function () { done(); printPlan(); });
  }

  app.innerHTML = '<div class="sp-grid"><div class="sp-card" id="sp-form"></div><div id="sp-out"><div class="sp-empty"><b>Your weekly plan will appear here</b><p class="bn">বাম পাশে পরীক্ষার তারিখ, এখনকার স্কোর আর টার্গেট দিয়ে "Make my study plan" চাপুন।</p></div></div></div>';
  form();
})();

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
        '<a class="btn btn-ghost" href="' + (isI ? "ielts" : "pte") + '.html">' + (isI ? "IELTS" : "PTE") + ' packages</a><a class="btn btn-ghost" href="mock-test.html">Free mock test</a></div>' +
        '<p class="sp-note bn">এটা একটা সাধারণ পরামর্শ, কোনো স্কোরের গ্যারান্টি না। শিক্ষকের সাথে কথা বলে আপনার জন্য প্ল্যানটা আরও ঠিক করে নিতে পারেন।</p>' +
      "</div>";
    out.querySelector(".sp-result").classList.add("in");
    out.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  }

  app.innerHTML = '<div class="sp-grid"><div class="sp-card" id="sp-form"></div><div id="sp-out"><div class="sp-empty"><b>Your weekly plan will appear here</b><p class="bn">বাম পাশে পরীক্ষার তারিখ, এখনকার স্কোর আর টার্গেট দিয়ে "Make my study plan" চাপুন।</p></div></div></div>';
  form();
})();

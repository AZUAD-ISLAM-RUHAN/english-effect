/* =========================================================
   English Effect — Free level test (level-test.html)
   20 ta prosno, sohoj theke kothin. Prosno English Effect er nijer lekha.
   Prosno bodlate / add korte QUESTIONS list edit koro.
   ========================================================= */
(function () {
  var app = document.getElementById("lt-app");
  if (!app) return;
  var WA = (window.SITE && SITE.whatsappNumber) || "";

  var PASSAGE = "Many students believe that studying for long hours the night before an exam is the best strategy. However, research on memory suggests that spreading study over several days leads to better long-term recall.";
  var QUESTIONS = [
    { s: "Grammar", q: "She ___ a teacher.", o: ["is", "are", "am", "be"], a: 0 },
    { s: "Grammar", q: "I ___ to school every day.", o: ["goes", "go", "going", "gone"], a: 1 },
    { s: "Grammar", q: "There are three ___ on the table.", o: ["book", "a book", "books", "bookes"], a: 2 },
    { s: "Vocabulary", q: "Choose the opposite of \"hot\".", o: ["warm", "big", "fast", "cold"], a: 3 },
    { s: "Grammar", q: "___ you like tea?", o: ["Do", "Does", "Are", "Is"], a: 0 },
    { s: "Grammar", q: "Yesterday we ___ a film.", o: ["watch", "watching", "watched", "watches"], a: 2 },
    { s: "Grammar", q: "If it rains tomorrow, we ___ at home.", o: ["stayed", "will stay", "would stayed", "staying"], a: 1 },
    { s: "Grammar", q: "I have lived here ___ 2019.", o: ["for", "from", "since", "at"], a: 2 },
    { s: "Grammar", q: "She is interested ___ learning French.", o: ["in", "on", "at", "for"], a: 0 },
    { s: "Grammar", q: "This is the ___ book I have ever read.", o: ["more interesting", "most interesting", "interestingest", "most interested"], a: 1 },
    { s: "Vocabulary", q: "\"Postpone\" means:", o: ["to cancel", "to finish", "to delay", "to repeat"], a: 2 },
    { s: "Grammar", q: "He asked me where I ___.", o: ["do live", "lived", "am living", "does live"], a: 1 },
    { s: "Grammar", q: "By the time we arrived, the film ___.", o: ["already started", "has already started", "had already started", "was already start"], a: 2 },
    { s: "Grammar", q: "The report ___ by the manager last week.", o: ["was written", "wrote", "has written", "is writing"], a: 0 },
    { s: "Grammar", q: "Despite ___ tired, she finished the essay.", o: ["she was", "being", "to be", "be"], a: 1 },
    { s: "Vocabulary", q: "Which word is closest in meaning to \"significant\"?", o: ["sudden", "simple", "small", "important"], a: 3 },
    { s: "Reading", passage: true, q: "What does the writer suggest?", o: ["Studying late at night is the best method.", "Studying across several days works better.", "Memory research is not reliable.", "Students should avoid exams."], a: 1 },
    { s: "Grammar", q: "Hardly ___ the room when the phone rang.", o: ["she had entered", "had she entered", "did she entered", "she entered"], a: 1 },
    { s: "Vocabulary", q: "The new policy is likely to ___ problems for small businesses.", o: ["pose", "raise up", "make out", "put on"], a: 0 },
    { s: "Vocabulary", q: "The results were ___, so the researchers repeated the experiment.", o: ["conclusive", "inclusive", "inconclusive", "concluding"], a: 2 }
  ];
  var LEVELS = [
    { min: 0,  name: "Beginner", tag: "A1–A2 (approx.)", text: "ইংরেজির ভিত এখনো তৈরি হচ্ছে। আগে বেসিক grammar আর প্রতিদিনের কথা বলার অভ্যাস করলে দ্রুত উন্নতি হবে।", course: ["spoken.html", "Spoken English"] },
    { min: 6,  name: "Elementary", tag: "A2 (approx.)", text: "বেসিক জিনিস জানেন, কিন্তু tense আর বাক্য গঠনে আরও অভ্যাস দরকার। IELTS/PTE এর আগে ভিত শক্ত করা ভালো।", course: ["spoken.html", "Spoken English"] },
    { min: 10, name: "Intermediate", tag: "B1 (approx.)", text: "ভালো ভিত আছে। নিয়মিত প্র্যাকটিস করলে IELTS/PTE প্রস্তুতি শুরু করা যায়।", course: ["courses.html", "IELTS or PTE Full Course"] },
    { min: 14, name: "Upper-intermediate", tag: "B2 (approx.)", text: "আপনার ইংরেজি বেশ ভালো। এখন পরীক্ষার ফরম্যাট আর কৌশল শিখলে টার্গেট স্কোরের দিকে এগোতে পারবেন।", course: ["courses.html", "IELTS or PTE"] },
    { min: 18, name: "Advanced", tag: "C1 (approx.)", text: "চমৎকার! পরীক্ষার কৌশল আর মক টেস্টে মনোযোগ দিন, আর যে অংশে নম্বর কম সেটা আলাদা করে প্র্যাকটিস করুন।", course: ["mock-test.html", "a mock test"] }
  ];

  var answers = [], i = 0, name = "", goal = "";
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }

  function intro() {
    app.innerHTML =
      '<div class="lt-card lt-intro">' +
        '<div class="lt-badges"><span>20 questions</span><span>About 10 minutes</span><span>Free</span></div>' +
        '<h2>Before you start</h2>' +
        '<label for="lt-name">Your first name <small>(optional)</small></label><input id="lt-name" class="lt-input" autocomplete="given-name" placeholder="e.g. Rahim">' +
        '<label>Why are you learning English?</label>' +
        '<div class="lt-goals" role="group" aria-label="Goal">' +
          ["Study abroad", "Migration or visa", "Job or career", "Just to improve"].map(function (g) { return '<button type="button" aria-pressed="false">' + g + "</button>"; }).join("") +
        "</div>" +
        '<button type="button" class="btn btn-green btn-block" id="lt-start">Start the test</button>' +
        '<p class="lt-small bn">প্রশ্ন সহজ থেকে কঠিন হবে। না জানলে আন্দাজ না করে "I don\'t know" চাপুন, তাতে ফলাফল বেশি সঠিক হবে।</p>' +
      "</div>";
    app.querySelectorAll(".lt-goals button").forEach(function (b) {
      b.onclick = function () { app.querySelectorAll(".lt-goals button").forEach(function (x) { x.setAttribute("aria-pressed", x === b); }); goal = b.textContent; };
    });
    document.getElementById("lt-start").onclick = function () { name = document.getElementById("lt-name").value.trim(); i = 0; answers = []; ask(); };
  }

  function ask() {
    var Q = QUESTIONS[i];
    app.innerHTML =
      '<div class="lt-card lt-q">' +
        '<div class="lt-top"><span class="lt-count">Question <b>' + (i + 1) + "</b> of " + QUESTIONS.length + '</span><span class="lt-skill">' + Q.s + "</span></div>" +
        '<div class="lt-prog"><i style="transform:scaleX(' + (i / QUESTIONS.length) + ')"></i></div>' +
        (Q.passage ? '<blockquote class="lt-passage">' + esc(PASSAGE) + "</blockquote>" : "") +
        '<h2 class="lt-question">' + esc(Q.q).replace("___", '<span class="lt-blank">______</span>') + "</h2>" +
        '<div class="lt-opts">' + Q.o.map(function (o, k) { return '<button type="button" class="lt-opt" data-k="' + k + '" style="--i:' + k + '"><span>' + "ABCD"[k] + "</span>" + esc(o) + "</button>"; }).join("") + "</div>" +
        '<div class="lt-foot"><button type="button" class="lt-skip" id="lt-idk">I don\'t know</button>' + (i > 0 ? '<button type="button" class="lt-skip" id="lt-back">Back</button>' : "") + "</div>" +
      "</div>";
    app.querySelectorAll(".lt-opt").forEach(function (b) { b.onclick = function () { choose(+b.dataset.k, b); }; });
    document.getElementById("lt-idk").onclick = function () { choose(-1); };
    var back = document.getElementById("lt-back"); if (back) back.onclick = function () { i--; answers.pop(); ask(); };
    var first = app.querySelector(".lt-opt"); if (first) first.focus({ preventScroll: true });
  }

  function choose(k, btn) {
    answers[i] = k;
    if (btn) btn.classList.add("picked");
    setTimeout(function () { i++; if (i < QUESTIONS.length) ask(); else result(); }, reduce ? 0 : 260);
  }
  document.addEventListener("keydown", function (e) {
    if (!app.querySelector(".lt-q")) return;
    var n = "1234".indexOf(e.key); if (n < 0) n = "abcd".indexOf((e.key || "").toLowerCase());
    if (n > -1) { var b = app.querySelectorAll(".lt-opt")[n]; if (b) b.click(); }
  });

  function result() {
    var score = 0, by = {};
    QUESTIONS.forEach(function (Q, k) { var ok = answers[k] === Q.a; if (ok) score++; by[Q.s] = by[Q.s] || [0, 0]; by[Q.s][1]++; if (ok) by[Q.s][0]++; });
    var L = LEVELS[0]; LEVELS.forEach(function (x) { if (score >= x.min) L = x; });
    var idx = LEVELS.indexOf(L);
    var msg = "হ্যালো, আমি English Effect এর ফ্রি লেভেল টেস্ট দিয়েছি।" + (name ? " আমার নাম " + name + "।" : "") + " স্কোর: " + score + "/20, লেভেল: " + L.name + "।" + (goal ? " লক্ষ্য: " + goal + "।" : "") + " আমার জন্য কোন কোর্স ভালো হবে?";
    app.innerHTML =
      '<div class="lt-result">' +
        '<div class="lt-res-top"><div><small>' + (name ? esc(name) + ", your level is" : "Your level") + '</small><h2>' + L.name + '</h2><span class="lt-tag">' + L.tag + "</span></div>" +
        '<div class="lt-score"><b id="lt-num">0</b><span>/ 20</span></div></div>' +
        '<div class="lt-ladder">' + LEVELS.map(function (x, k) { return '<div class="' + (k < idx ? "past" : k === idx ? "now" : "") + '" style="--i:' + k + '"><i></i><span>' + x.name + "</span></div>"; }).join("") + "</div>" +
        '<p class="lt-text bn">' + L.text + "</p>" +
        '<div class="lt-skills">' + Object.keys(by).map(function (s) { var p = by[s][0] / by[s][1]; return '<div><span>' + s + '</span><div class="lt-bar"><i style="--w:' + Math.round(p * 100) + '%"></i></div><b>' + by[s][0] + "/" + by[s][1] + "</b></div>"; }).join("") + "</div>" +
        '<div class="lt-next"><small>Suggested next step</small><a class="lt-course" href="' + L.course[0] + '">' + L.course[1] + " →</a></div>" +
        '<div class="btn-row"><a class="btn btn-green" target="_blank" rel="noopener" href="https://wa.me/' + WA + "?text=" + encodeURIComponent(msg) + '">Send my result on WhatsApp</a>' +
        '<button type="button" class="btn btn-ghost" id="lt-review">See answers</button><button type="button" class="btn btn-ghost" id="lt-again">Retake</button></div>' +
        '<p class="lt-small bn">এটা একটা ছোট আনুমানিক লেভেল টেস্ট, কোনো অফিশিয়াল সার্টিফিকেট না। শিক্ষকের সাথে কথা বললে আরও সঠিকভাবে বলা যাবে।</p>' +
        '<ol class="lt-review" id="lt-rev" hidden>' + QUESTIONS.map(function (Q, k) {
          var a = answers[k], ok = a === Q.a;
          return '<li class="' + (ok ? "ok" : "bad") + '"><b>' + esc(Q.q) + "</b><span>Your answer: " + (a === -1 ? "I don't know" : esc(Q.o[a])) + (ok ? "" : " · Correct: " + esc(Q.o[Q.a])) + "</span></li>";
        }).join("") + "</ol>" +
      "</div>";
    // count up
    var el = document.getElementById("lt-num"), t0 = performance.now();
    (function f(t) { var p = Math.min(1, (t - t0) / (reduce ? 1 : 900)); el.textContent = Math.round(score * (1 - Math.pow(1 - p, 3))); if (p < 1) requestAnimationFrame(f); })(t0);
    requestAnimationFrame(function () { app.querySelector(".lt-result").classList.add("in"); });
    document.getElementById("lt-again").onclick = intro;
    document.getElementById("lt-review").onclick = function () { var r = document.getElementById("lt-rev"); r.hidden = !r.hidden; this.textContent = r.hidden ? "See answers" : "Hide answers"; };
    app.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  }

  intro();
})();

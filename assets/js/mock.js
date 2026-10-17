/* =========================================================
   English Effect — Mock test engine (DEMO)
   mock.html#ielts-sample  -> test cholbe
   mock.html#result-XXXX   -> result + error log
   mock-test.html          -> list + ager result er history
   Result gula ekhon browser e (localStorage) save hoy.
   Paid version e eta Supabase database e jabe.
   ========================================================= */
(function () {
  var KEY = "ee-mock-attempts";
  var memory = [];
  function loadAll() { try { return JSON.parse(localStorage.getItem(KEY) || "[]"); } catch (e) { return memory; } }
  function saveAll(list) { memory = list; try { localStorage.setItem(KEY, JSON.stringify(list.slice(-30))); } catch (e) {} }
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function norm(s) { return String(s || "").toLowerCase().replace(/[^a-z0-9.:\s-]/g, "").replace(/\s+/g, " ").trim(); }
  function words(s) { return String(s || "").toLowerCase().replace(/[^a-z0-9'\s]/g, " ").split(/\s+/).filter(Boolean); }
  function fmtDate(t) { try { return new Date(t).toLocaleString(undefined, { day: "numeric", month: "short", hour: "numeric", minute: "2-digit" }); } catch (e) { return ""; } }
  var canSpeak = "speechSynthesis" in window;
  var ARROW = '<svg viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';

  /* ---------- band / score estimates (rough, not official) ---------- */
  function ieltsBand(p) {
    var t = [[.975, 9], [.925, 8.5], [.875, 8], [.8, 7.5], [.75, 7], [.675, 6.5], [.575, 6], [.475, 5.5], [.375, 5], [.3, 4.5], [.225, 4]];
    for (var i = 0; i < t.length; i++) if (p >= t[i][0]) return t[i][1];
    return 3.5;
  }
  function pteScore(p) { return Math.round(10 + 80 * p); }

  /* ---------- speech (browser reads listening audio) ---------- */
  function speakLines(lines, onEnd) {
    if (!canSpeak) { onEnd && onEnd(); return; }
    speechSynthesis.cancel();
    var voices = speechSynthesis.getVoices().filter(function (v) { return /^en/i.test(v.lang); });
    var vA = voices[0], vB = voices[1] || voices[0];
    lines.forEach(function (ln, i) {
      var u = new SpeechSynthesisUtterance(ln[1]);
      u.lang = "en-GB"; u.rate = 0.92; u.pitch = ln[0] === "Man" ? 0.85 : 1.1;
      if (ln[0] === "Man" ? vB : vA) u.voice = ln[0] === "Man" ? vB : vA;
      if (i === lines.length - 1) u.onend = function () { onEnd && onEnd(); };
      speechSynthesis.speak(u);
    });
  }

  /* =======================================================
     MOCK-TEST LANDING: history list
     ======================================================= */
  var hist = document.getElementById("mock-history");
  if (hist) {
    var list = loadAll().slice().reverse();
    if (!list.length) {
      hist.innerHTML = '<div class="mk-empty"><b>No results yet</b><p class="bn">একটা ফ্রি স্যাম্পল টেস্ট দিন। শেষ হলে আপনার স্কোর আর ভুলের তালিকা এখানে জমা থাকবে।</p></div>';
    } else {
      hist.innerHTML = list.map(function (a) {
        return '<a class="mk-hist" href="mock.html#result-' + a.id + '"><span class="mk-hist-exam ' + a.exam + '">' + a.exam.toUpperCase() + '</span>' +
          '<span class="mk-hist-main"><b>' + esc(a.title) + '</b><small>' + fmtDate(a.at) + '</small></span>' +
          '<span class="mk-hist-score">' + esc(a.headline) + '</span><i>' + ARROW + '</i></a>';
      }).join("");
    }
  }

  /* =======================================================
     MOCK.HTML: router
     ======================================================= */
  var app = document.getElementById("mock-app");
  if (!app) return;

  function route() {
    var h = location.hash.replace("#", "");
    if (h.indexOf("result-") === 0) return showResult(h.slice(7));
    if (MOCK_TESTS[h]) return runTest(h);
    app.innerHTML = '<div class="wrap mk-msg"><h1>Test not found</h1><p class="bn">এই টেস্টটা পাওয়া যায়নি।</p><a class="btn btn-green" href="mock-test.html">See mock tests</a></div>';
  }
  window.addEventListener("hashchange", route);

  /* =======================================================
     RUNNER
     ======================================================= */
  var timerId = null;
  function runTest(testId) {
    clearInterval(timerId);
    var T = MOCK_TESTS[testId], answers = {}, played = {}, sec = 0, startAt = Date.now(), endAt = startAt + T.minutes * 60000;
    var qnum = {}, n = 0;
    T.sections.forEach(function (s) { (s.questions || []).forEach(function (q) { qnum[q.id] = ++n; }); });
    var total = n;

    app.innerHTML =
      '<div class="mk-bar"><div class="wrap mk-bar-in">' +
        '<div class="mk-title"><span class="mk-exam ' + T.exam + '">' + T.exam.toUpperCase() + '</span><h1>' + esc(T.title) + '</h1></div>' +
        '<nav class="mk-tabs" id="mk-tabs"></nav>' +
        '<div class="mk-right"><span class="mk-timer" id="mk-timer" aria-live="off">--:--</span><button class="btn btn-green btn-sm" id="mk-submit" type="button">Submit test</button></div>' +
      '</div><div class="mk-progress"><i id="mk-prog"></i></div></div>' +
      '<div class="wrap mk-body" id="mk-body"></div>' +
      '<div class="mk-modal" id="mk-modal" hidden><div class="mk-modal-box" role="dialog" aria-modal="true" aria-labelledby="mk-m-title">' +
        '<h2 id="mk-m-title">Submit your test?</h2><p id="mk-m-text"></p>' +
        '<div class="btn-row"><button class="btn btn-green" id="mk-m-yes" type="button">Submit now</button><button class="btn btn-ghost" id="mk-m-no" type="button">Keep working</button></div>' +
      '</div></div>';

    var body = document.getElementById("mk-body"), tabs = document.getElementById("mk-tabs");

    function answeredCount() {
      var c = 0;
      T.sections.forEach(function (s) { (s.questions || []).forEach(function (q) { var a = answers[q.id]; if (a !== undefined && a !== "" && a !== null) c++; }); });
      return c;
    }
    function updateProgress() {
      document.getElementById("mk-prog").style.transform = "scaleX(" + (total ? answeredCount() / total : 0) + ")";
      document.querySelectorAll(".mk-pal button").forEach(function (b) {
        var a = answers[b.dataset.q]; b.classList.toggle("done", a !== undefined && a !== "" && a !== null);
      });
    }
    function renderTabs() {
      tabs.innerHTML = T.sections.map(function (s, i) {
        return '<button type="button" class="' + (i === sec ? "on" : "") + '" data-i="' + i + '">' + esc(s.title) + '</button>';
      }).join("");
      tabs.querySelectorAll("button").forEach(function (b) { b.onclick = function () { sec = +b.dataset.i; renderSection(); }; });
    }

    function qHTML(q) {
      var num = qnum[q.id], a = answers[q.id], h = '<div class="mk-q" id="q-' + q.id + '"><div class="mk-q-head"><span class="mk-qn">' + num + '</span><span class="mk-qtype">' + esc(q.skill) + '</span></div>';
      if (q.type === "tfng") {
        h += '<p class="mk-prompt">' + esc(q.prompt) + '</p><div class="mk-opts row">' + ["TRUE", "FALSE", "NOT GIVEN"].map(function (o) {
          return '<label class="mk-opt"><input type="radio" name="' + q.id + '" value="' + o + '"' + (a === o ? " checked" : "") + '><span>' + o + '</span></label>';
        }).join("") + "</div>";
      } else if (q.type === "mcq") {
        h += '<p class="mk-prompt">' + esc(q.prompt) + '</p><div class="mk-opts">' + q.options.map(function (o, i) {
          return '<label class="mk-opt"><input type="radio" name="' + q.id + '" value="' + i + '"' + (a === String(i) ? " checked" : "") + '><span><b>' + "ABCD"[i] + '</b> ' + esc(o) + '</span></label>';
        }).join("") + "</div>";
      } else if (q.type === "gap") {
        h += '<label class="mk-prompt" for="in-' + q.id + '">' + esc(q.prompt) + '</label><input class="mk-input" id="in-' + q.id + '" data-q="' + q.id + '" autocomplete="off" spellcheck="false" value="' + esc(a || "") + '">';
      } else if (q.type === "select") {
        h += '<label class="mk-prompt" for="in-' + q.id + '">' + esc(q.prompt) + '</label><select class="mk-input" id="in-' + q.id + '" data-q="' + q.id + '"><option value="">Choose…</option>' +
          q.options.map(function (o, i) { return '<option value="' + i + '"' + (a === String(i) ? " selected" : "") + '>' + esc(o) + "</option>"; }).join("") + "</select>";
      } else if (q.type === "dictation") {
        h += '<div class="mk-dict"><button type="button" class="btn btn-dark btn-sm mk-play1" data-q="' + q.id + '"' + (played[q.id] ? " disabled" : "") + '>' + (played[q.id] ? "Played" : "Play sentence") + '</button>' +
          '<input class="mk-input" id="in-' + q.id + '" data-q="' + q.id + '" autocomplete="off" spellcheck="false" placeholder="Type what you hear" value="' + esc(a || "") + '"></div>';
      }
      return h + "</div>";
    }

    function renderSection() {
      renderTabs();
      var s = T.sections[sec], h = "";
      var pal = '<div class="mk-pal" aria-label="Questions">' + T.sections.map(function (ss) {
        return (ss.questions || []).map(function (q) { return '<button type="button" data-q="' + q.id + '" data-s="' + T.sections.indexOf(ss) + '">' + qnum[q.id] + "</button>"; }).join("");
      }).join("") + "</div>";

      if (s.kind === "reading") {
        h = '<div class="mk-split"><article class="mk-passage"><p class="mk-intro bn">' + esc(s.intro) + '</p><h2>' + esc(s.passageTitle) + '</h2>' +
          s.passage.map(function (p, i) { return '<p><span class="mk-para">' + "ABCDEFG"[i] + "</span>" + esc(p) + "</p>"; }).join("") +
          '</article><div class="mk-qs">' + pal + s.questions.map(qHTML).join("") + "</div></div>";
      } else if (s.kind === "listening") {
        var player = s.dictation ? "" :
          '<div class="mk-player"><button type="button" class="mk-playbtn" id="mk-play"' + (played[s.id] ? " disabled" : "") + ' aria-label="Play recording"><svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg></button>' +
          '<div><b id="mk-play-status">' + (played[s.id] ? "Recording played" : "Press play when you are ready") + '</b><small class="bn">রেকর্ডিং একবারই চলবে, আসল পরীক্ষার মতো।</small>' +
          '<div class="mk-wave" id="mk-wave" aria-hidden="true">' + new Array(28).join("<i></i>") + "</div></div></div>";
        if (!canSpeak) player = '<div class="mk-player"><div><b>Audio is not available in this browser.</b><small class="bn">Chrome বা Edge এ খুলুন।</small></div></div>';
        h = '<div class="mk-single"><p class="mk-intro bn">' + esc(s.intro) + "</p>" + player + pal + s.questions.map(qHTML).join("") + "</div>";
      } else if (s.kind === "writing") {
        var txt = answers["w-" + s.id] || "";
        h = '<div class="mk-single"><p class="mk-intro bn">' + esc(s.intro) + '</p><div class="mk-task">' + esc(s.task) + '</div>' +
          '<label class="mk-prompt" for="mk-essay">Your answer</label><textarea id="mk-essay" class="mk-essay" spellcheck="false" placeholder="Start writing here…">' + esc(txt) + '</textarea>' +
          '<div class="mk-wc"><span>Words: <b id="mk-wc">0</b> / ' + s.minWords + '</span><span class="mk-wc-bar"><i id="mk-wc-bar"></i></span></div></div>';
      }
      var nav = '<div class="mk-nav">' + (sec > 0 ? '<button type="button" class="btn btn-ghost" id="mk-prev">Previous section</button>' : "<span></span>") +
        (sec < T.sections.length - 1 ? '<button type="button" class="btn btn-dark" id="mk-next">Next section ' + ARROW + "</button>" : '<button type="button" class="btn btn-green" id="mk-finish">Finish and submit</button>') + "</div>";
      body.innerHTML = h + nav;
      body.classList.remove("in"); void body.offsetWidth; body.classList.add("in");
      bind(s);
      updateProgress();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    function bind(s) {
      body.querySelectorAll("input[type=radio]").forEach(function (r) { r.onchange = function () { answers[r.name] = r.value; updateProgress(); }; });
      body.querySelectorAll(".mk-input").forEach(function (inp) { inp.oninput = inp.onchange = function () { answers[inp.dataset.q] = inp.value; updateProgress(); }; });
      body.querySelectorAll(".mk-pal button").forEach(function (b) {
        b.onclick = function () {
          var si = +b.dataset.s;
          if (si !== sec) { sec = si; renderSection(); }
          var el = document.getElementById("q-" + b.dataset.q); if (el) { el.scrollIntoView({ behavior: "smooth", block: "center" }); el.classList.add("flash"); setTimeout(function () { el.classList.remove("flash"); }, 900); }
        };
      });
      var play = document.getElementById("mk-play");
      if (play) play.onclick = function () {
        played[s.id] = true; play.disabled = true;
        var st = document.getElementById("mk-play-status"), wave = document.getElementById("mk-wave");
        st.textContent = "Playing…"; wave.classList.add("on");
        speakLines(s.script, function () { st.textContent = "Recording played"; wave.classList.remove("on"); });
      };
      body.querySelectorAll(".mk-play1").forEach(function (b) {
        b.onclick = function () {
          var q = s.questions.filter(function (x) { return x.id === b.dataset.q; })[0];
          played[q.id] = true; b.disabled = true; b.textContent = "Playing…";
          speakLines([["Woman", q.answer]], function () { b.textContent = "Played"; });
          var inp = document.getElementById("in-" + q.id); if (inp) inp.focus();
        };
      });
      var essay = document.getElementById("mk-essay");
      if (essay) {
        var wc = function () { var c = words(essay.value).length; document.getElementById("mk-wc").textContent = c; document.getElementById("mk-wc-bar").style.transform = "scaleX(" + Math.min(1, c / s.minWords) + ")"; document.getElementById("mk-wc-bar").classList.toggle("ok", c >= s.minWords); };
        essay.oninput = function () { answers["w-" + s.id] = essay.value; wc(); };
        wc();
      }
      var prev = document.getElementById("mk-prev"), next = document.getElementById("mk-next"), fin = document.getElementById("mk-finish");
      if (prev) prev.onclick = function () { sec--; renderSection(); };
      if (next) next.onclick = function () { sec++; renderSection(); };
      if (fin) fin.onclick = askSubmit;
    }

    // timer
    var timerEl = document.getElementById("mk-timer");
    function tick() {
      var left = Math.max(0, endAt - Date.now()), m = Math.floor(left / 60000), s = Math.floor(left / 1000) % 60;
      timerEl.textContent = (m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s;
      timerEl.classList.toggle("low", left < 5 * 60000);
      if (left <= 0) { clearInterval(timerId); submit(true); }
    }
    tick(); timerId = setInterval(tick, 1000);

    // submit
    var modal = document.getElementById("mk-modal");
    function askSubmit() {
      var left = total - answeredCount();
      document.getElementById("mk-m-text").textContent = left ? left + " question" + (left > 1 ? "s are" : " is") + " still unanswered. You cannot change answers after submitting." : "All questions answered. You cannot change answers after submitting.";
      modal.hidden = false; document.getElementById("mk-m-yes").focus();
    }
    document.getElementById("mk-submit").onclick = askSubmit;
    document.getElementById("mk-m-no").onclick = function () { modal.hidden = true; };
    modal.onclick = function (e) { if (e.target === modal) modal.hidden = true; };
    document.getElementById("mk-m-yes").onclick = function () { submit(false); };

    function submit(timeUp) {
      clearInterval(timerId); if (canSpeak) speechSynthesis.cancel();
      var attempt = grade(testId, T, answers, Date.now() - startAt, timeUp);
      var all = loadAll(); all.push(attempt); saveAll(all);
      location.hash = "result-" + attempt.id;
    }

    renderSection();
  }

  /* =======================================================
     GRADING
     ======================================================= */
  function grade(testId, T, answers, ms, timeUp) {
    var items = [], sections = [];
    T.sections.forEach(function (s) {
      if (s.kind === "writing") {
        var text = answers["w-" + s.id] || "", wc = words(text).length, paras = text.split(/\n\s*\n|\n/).filter(function (p) { return p.trim().length > 20; }).length;
        sections.push({ id: s.id, title: s.title, kind: "writing", task: s.task, text: text, wc: wc, paras: paras, minWords: s.minWords });
        return;
      }
      var got = 0, max = 0;
      s.questions.forEach(function (q) {
        var a = answers[q.id], ok = false, yours = "", correct = "", pts = 1, earned = 0, missed = [];
        if (q.type === "tfng") { yours = a || ""; correct = q.answer; ok = yours === q.answer; }
        else if (q.type === "mcq" || q.type === "select") { yours = a !== undefined && a !== "" ? q.options[+a] : ""; correct = q.options[q.answer]; ok = a !== undefined && a !== "" && +a === q.answer; }
        else if (q.type === "gap") { yours = a || ""; correct = q.answer[0]; ok = q.answer.some(function (x) { return norm(x) === norm(yours); }); }
        else if (q.type === "dictation") {
          yours = a || ""; correct = q.answer;
          var target = words(q.answer), typed = words(yours), pool = typed.slice();
          pts = target.length;
          target.forEach(function (w) { var i = pool.indexOf(w); if (i > -1) { earned++; pool.splice(i, 1); } else missed.push(w); });
          ok = earned === pts;
        }
        if (q.type !== "dictation") earned = ok ? 1 : 0;
        got += earned; max += pts;
        items.push({ n: items.length + 1, section: s.title, skill: q.skill, prompt: q.prompt || "Dictation sentence", yours: yours, correct: correct, ok: ok, earned: earned, pts: pts, missed: missed, explain: q.explain, blank: !yours });
      });
      var pct = max ? got / max : 0;
      sections.push({ id: s.id, title: s.title, kind: s.kind, got: got, max: max, pct: pct, score: T.exam === "ielts" ? ieltsBand(pct) : pteScore(pct), script: s.script || null });
    });
    var scored = sections.filter(function (s) { return s.kind !== "writing"; });
    var headline = T.exam === "ielts"
      ? scored.map(function (s) { return s.title.charAt(0) + " " + s.score; }).join(" · ")
      : "≈ " + Math.round(scored.reduce(function (a, s) { return a + s.score; }, 0) / (scored.length || 1));
    return { id: Date.now().toString(36), testId: testId, exam: T.exam, title: T.title, at: Date.now(), ms: ms, timeUp: timeUp, sections: sections, items: items, headline: headline };
  }

  /* =======================================================
     RESULT + ERROR LOG
     ======================================================= */
  function showResult(id) {
    clearInterval(timerId);
    var A = loadAll().filter(function (a) { return a.id === id; })[0];
    if (!A) { app.innerHTML = '<div class="wrap mk-msg"><h1>Result not found</h1><p class="bn">এই রেজাল্টটা এই ব্রাউজারে নেই।</p><a class="btn btn-green" href="mock-test.html">See mock tests</a></div>'; return; }
    var isI = A.exam === "ielts", scored = A.sections.filter(function (s) { return s.kind !== "writing"; });
    var wrong = A.items.filter(function (i) { return !i.ok; }).length;
    var mins = Math.max(1, Math.round(A.ms / 60000));

    // skill breakdown
    var bySkill = {};
    A.items.forEach(function (i) { var k = i.skill; bySkill[k] = bySkill[k] || { got: 0, max: 0 }; bySkill[k].got += i.earned; bySkill[k].max += i.pts; });
    var weakest = Object.keys(bySkill).sort(function (a, b) { return bySkill[a].got / bySkill[a].max - bySkill[b].got / bySkill[b].max; })[0];

    var scoreCards = scored.map(function (s, i) {
      return '<div class="mk-score" style="--i:' + i + '"><small>' + esc(s.title) + '</small><b data-count="' + s.score + '" data-dec="' + (isI ? 1 : 0) + '">0</b><span>' + (isI ? "band (est.)" : "/ 90 (est.)") + '</span>' +
        '<div class="mk-meter"><i style="--w:' + Math.round(s.pct * 100) + '%"></i></div><em>' + s.got + " / " + s.max + (isI ? " correct" : " points") + "</em></div>";
    }).join("");
    var writing = A.sections.filter(function (s) { return s.kind === "writing"; })[0];
    if (writing) scoreCards += '<div class="mk-score pending" style="--i:' + scored.length + '"><small>Writing</small><b>—</b><span>awaiting review</span><div class="mk-meter"><i style="--w:0%"></i></div><em>' + writing.wc + " words</em></div>";

    var skills = Object.keys(bySkill).map(function (k, i) {
      var p = bySkill[k].got / bySkill[k].max;
      return '<div class="mk-skill"><span>' + esc(k) + '</span><div class="mk-meter"><i class="' + (p >= .75 ? "good" : p >= .5 ? "mid" : "low") + '" style="--w:' + Math.round(p * 100) + '%;--d:' + i * 120 + 'ms"></i></div><b>' + Math.round(p * 100) + "%</b></div>";
    }).join("");

    var log = A.items.map(function (it) {
      var yours = it.blank ? '<em class="mk-none">No answer</em>' : esc(it.yours);
      var dict = it.missed && it.missed.length ? '<p class="mk-missed">Missed words: ' + it.missed.map(function (w) { return "<mark>" + esc(w) + "</mark>"; }).join(" ") + "</p>" : "";
      var pts = it.pts > 1 ? '<span class="mk-pts">' + it.earned + " / " + it.pts + "</span>" : "";
      return '<li class="mk-log ' + (it.ok ? "ok" : "bad") + '" data-ok="' + (it.ok ? 1 : 0) + '" data-skill="' + esc(it.skill) + '">' +
        '<div class="mk-log-head"><span class="mk-qn">' + it.n + '</span><span class="mk-qtype">' + esc(it.section) + " · " + esc(it.skill) + '</span>' + pts + '<span class="mk-badge">' + (it.ok ? "Correct" : it.blank ? "Skipped" : "Wrong") + "</span></div>" +
        '<p class="mk-log-q">' + esc(it.prompt) + "</p>" +
        '<div class="mk-ans"><div><small>Your answer</small><p>' + yours + '</p></div><div><small>Correct answer</small><p>' + esc(it.correct) + "</p></div></div>" + dict +
        '<p class="mk-explain bn">' + esc(it.explain) + "</p></li>";
    }).join("");

    var transcript = A.sections.filter(function (s) { return s.script; }).map(function (s) {
      return '<details class="mk-trans"><summary>Listening transcript</summary>' + s.script.map(function (l) { return "<p><b>" + esc(l[0]) + ":</b> " + esc(l[1]) + "</p>"; }).join("") + "</details>";
    }).join("");

    var writingBlock = "";
    if (writing) {
      var checks = [
        [writing.wc >= writing.minWords, "At least " + writing.minWords + " words (" + writing.wc + " written)"],
        [writing.paras >= 4, "Clear paragraphs (" + writing.paras + " found; intro, 2 body, conclusion is a good plan)"],
        [writing.wc > 0, "Answer submitted"]
      ];
      writingBlock = '<section class="mk-card"><h2>Writing</h2><div class="mk-task small">' + esc(writing.task) + '</div>' +
        '<ul class="mk-checks">' + checks.map(function (c) { return '<li class="' + (c[0] ? "y" : "n") + '">' + esc(c[1]) + "</li>"; }).join("") + "</ul>" +
        '<div class="mk-review"><b>Awaiting instructor review</b><p class="bn">পেইড ভার্সনে Nirob আপনার লেখা পড়ে band score আর লিখিত ফিডব্যাক দেবেন। এই ডেমোতে শুধু স্বয়ংক্রিয় চেকগুলো দেখানো হচ্ছে।</p></div>' +
        (writing.text ? '<details class="mk-trans"><summary>Your essay</summary><p class="mk-essay-view">' + esc(writing.text) + "</p></details>" : "") + "</section>";
    }

    app.innerHTML =
      '<section class="mk-res-hero"><div class="wrap">' +
        '<nav class="crumbs"><a href="index.html">Home</a><span><a href="mock-test.html">Mock tests</a></span><span>Result</span></nav>' +
        '<div class="mk-res-top"><div><span class="mk-exam ' + A.exam + '">' + A.exam.toUpperCase() + '</span><h1>' + esc(A.title) + '</h1>' +
        '<p>' + fmtDate(A.at) + " · " + mins + " min" + (A.timeUp ? " · time ran out" : "") + '</p></div>' +
        '<div class="btn-row"><a class="btn btn-green" href="mock.html#' + A.testId + '">Retake test</a><a class="btn btn-outline" href="mock-test.html">All mock tests</a></div></div>' +
        '<div class="mk-scores">' + scoreCards + "</div>" +
        '<p class="mk-disclaimer bn">এই স্কোর একটা আনুমানিক হিসাব (estimate), অফিশিয়াল ' + (isI ? "IELTS band" : "PTE score") + ' না।</p>' +
      "</div></section>" +
      '<div class="wrap mk-res-body">' +
        '<aside class="mk-side"><section class="mk-card"><h2>By question type</h2>' + skills +
        (weakest ? '<div class="mk-focus"><small>Focus next on</small><b>' + esc(weakest) + "</b></div>" : "") + "</section>" +
        '<section class="mk-card mk-upsell"><h2>Want full tests?</h2><p class="bn">৳১,৫০০ তে ৩০ দিন সব মক টেস্ট, প্রতিটার স্কোর আর error log।</p><a class="btn btn-green btn-block" href="mock-test.html#pass">Get the 30-day pass</a></section></aside>' +
        '<div class="mk-main"><section class="mk-card"><div class="mk-log-top"><h2>Error log</h2><span class="mk-count">' + wrong + " to review</span></div>" +
          '<div class="seg" role="group" aria-label="Filter"><button type="button" aria-pressed="false" data-f="all">All</button><button type="button" aria-pressed="true" data-f="bad">Mistakes</button><button type="button" aria-pressed="false" data-f="ok">Correct</button></div>' +
          '<ol class="mk-logs" id="mk-logs">' + log + "</ol>" + transcript + "</section>" + writingBlock + "</div>" +
      "</div>";

    // filter
    var logs = document.getElementById("mk-logs");
    function filt(f) { logs.querySelectorAll(".mk-log").forEach(function (li) { li.hidden = f === "all" ? false : f === "bad" ? li.dataset.ok === "1" : li.dataset.ok === "0"; }); }
    app.querySelectorAll("[data-f]").forEach(function (b) { b.onclick = function () { app.querySelectorAll("[data-f]").forEach(function (x) { x.setAttribute("aria-pressed", x === b); }); filt(b.dataset.f); }; });
    filt(wrong ? "bad" : "all");
    if (!wrong) app.querySelectorAll("[data-f]").forEach(function (x) { x.setAttribute("aria-pressed", x.dataset.f === "all"); });

    // count-up + meters
    var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    app.querySelectorAll("[data-count]").forEach(function (el) {
      var to = +el.dataset.count, dec = +el.dataset.dec, t0 = performance.now(), dur = reduce ? 1 : 1100;
      (function f(t) { var p = Math.min(1, (t - t0) / dur), v = to * (1 - Math.pow(1 - p, 3)); el.textContent = dec ? (Math.round(v * 2) / 2).toFixed(1) : Math.round(v); if (p < 1) requestAnimationFrame(f); })(t0);
    });
    requestAnimationFrame(function () { app.classList.add("mk-ready"); });
    window.scrollTo(0, 0);
  }

  route();
})();

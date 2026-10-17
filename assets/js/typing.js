/* =========================================================
   English Effect — Typing Speed Test (typing.html)
   Notun text ba word add korte chaile nicher TEXTS e add koro.
   ========================================================= */
(function () {
  var TEXTS = {
    words: ("the and you that was for are with his they this have from one had word what all were when your can said there use each which she how their will other about out many then them these some her would make like him into time has look two more write see number way could people than first water been call who now find long down day did get come made may part over new sound take only little work know place year live me back give most very after thing our just name good sentence man think say great where help through much before line right too mean old any same tell boy follow came want show also around form three small set put end does another well large must big even such because turn here why ask went men read need land different home us move try kind hand picture again change off play spell air away animal house point page letter mother answer found study still learn should world high every near add food between own below country plant last school father keep tree never start city earth eye light thought head under story saw left few while along might close something seem next hard open example begin life always those both paper together got group often run important until children side feet car mile night walk white sea began grow took river four carry state once book hear stop without second later miss idea enough eat face watch far really almost let above girl sometimes mountain cut young talk soon list song being leave family").split(" "),
    sentences: [
      "Learning a new language takes patience and daily practice.",
      "Read a short English article every morning and note new words.",
      "Speak slowly and clearly when you answer a question.",
      "A good essay has a clear opening, strong body paragraphs and a short conclusion.",
      "Listen to the full sentence before you choose your answer.",
      "Practise speaking with a friend for ten minutes each day.",
      "Mistakes are normal, so learn from them and keep going.",
      "Plan your time carefully during the exam and check your work.",
      "Write down useful phrases you hear in videos and films.",
      "Confidence grows when you use English in real situations.",
      "Every Friday night we meet online for a free live class.",
      "Your English can take you further than you think."
    ],
    academic: ("analyse approach area assess assume authority available benefit concept consist constitute context contract create data define derive distribute economy environment establish estimate evidence export factor finance formula function identify income indicate individual interpret involve issue labour legal legislate major method occur percent period policy principle proceed process require research respond role section sector significant similar source specific structure theory vary achieve acquire administrate affect appropriate aspect assist category chapter commission community complex compute conclude conduct consequent construct consume credit culture design distinct element equate evaluate feature final focus impact injure institute invest item journal maintain normal obtain participate perceive positive potential previous primary purchase range region regulate relevant reside resource restrict secure seek select site strategy survey text tradition transfer").split(" ")
  };

  var box = document.getElementById("tt-text"), input = document.getElementById("tt-input"),
      wpmEl = document.getElementById("tt-wpm"), accEl = document.getElementById("tt-acc"),
      timeEl = document.getElementById("tt-time"), ring = document.getElementById("tt-ring"),
      result = document.getElementById("tt-result"), hint = document.getElementById("tt-hint"),
      bestEl = document.getElementById("tt-best");
  if (!box) return;

  var mode = "words", duration = 60, text = "", typed = "", started = false, done = false,
      startAt = 0, timer = null, keys = 0, correctKeys = 0, RING = 2 * Math.PI * 42;
  ring.style.strokeDasharray = RING;

  function shuffle(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  function makeText() {
    if (mode === "sentences") return shuffle(TEXTS.sentences).concat(shuffle(TEXTS.sentences)).join(" ");
    var src = TEXTS[mode], out = [];
    while (out.length < 120) out = out.concat(shuffle(src));
    return out.slice(0, 120).join(" ");
  }
  function bestKey() { return "ee-typing-best-" + mode + "-" + duration; }
  function getBest() { try { return +localStorage.getItem(bestKey()) || 0; } catch (e) { return 0; } }
  function setBest(v) { try { localStorage.setItem(bestKey(), v); } catch (e) {} }
  function showBest() { var b = getBest(); bestEl.textContent = b ? b + " WPM" : "—"; }

  function render() {
    var html = "", n = typed.length;
    for (var i = 0; i < text.length; i++) {
      var ch = text[i], cls = "";
      if (i < n) cls = typed[i] === ch ? "ok" : (ch === " " ? "bad space" : "bad");
      if (i === n) cls += " cur";
      html += '<span class="' + cls + '">' + (ch === " " ? " " : ch) + "</span>";
    }
    box.innerHTML = html;
    var cur = box.querySelector(".cur");
    if (cur) { var lh = cur.offsetHeight; box.scrollTop = Math.max(0, cur.offsetTop - box.offsetTop - lh); }
  }
  function stats() {
    var mins = Math.max((Date.now() - startAt) / 60000, 1 / 60);
    var correct = 0; for (var i = 0; i < typed.length; i++) if (typed[i] === text[i]) correct++;
    return { wpm: started ? Math.round((correct / 5) / mins) : 0, acc: keys ? Math.round(correctKeys / keys * 100) : 100 };
  }
  function tick() {
    var left = Math.max(0, duration - (Date.now() - startAt) / 1000);
    timeEl.textContent = Math.ceil(left);
    ring.style.strokeDashoffset = RING * (1 - left / duration);
    var s = stats(); wpmEl.textContent = s.wpm; accEl.textContent = s.acc + "%";
    if (left <= 0) finish();
  }
  function reset(first) {
    clearInterval(timer); started = false; done = false; typed = ""; keys = 0; correctKeys = 0;
    input.value = ""; input.disabled = false; text = makeText(); render();
    timeEl.textContent = duration; ring.style.strokeDashoffset = 0;
    wpmEl.textContent = "0"; accEl.textContent = "100%";
    result.hidden = true; hint.hidden = false; box.parentNode.classList.remove("running");
    showBest(); if (first !== true) input.focus({ preventScroll: true });
  }
  function countUp(el, to, suffix) {
    var t0 = performance.now();
    (function f(t) { var p = Math.min(1, (t - t0) / 900); el.textContent = Math.round(to * (1 - Math.pow(1 - p, 3))) + (suffix || ""); if (p < 1) requestAnimationFrame(f); })(t0);
  }
  function finish() {
    if (done) return; done = true; clearInterval(timer); input.disabled = true;
    box.parentNode.classList.remove("running");
    var s = stats(), best = getBest(), isBest = s.wpm > best;
    if (isBest) setBest(s.wpm);
    countUp(document.getElementById("tr-wpm"), s.wpm);
    countUp(document.getElementById("tr-acc"), s.acc, "%");
    document.getElementById("tr-words").textContent = typed.trim() ? typed.trim().split(/\s+/).length : 0;
    document.getElementById("tr-badge").hidden = !isBest;
    var lvl = s.wpm >= 60 ? "দারুণ! আপনি খুব দ্রুত টাইপ করেন।" : s.wpm >= 40 ? "ভালো গতি। নির্ভুলতা ধরে রেখে আরেকটু বাড়ান।" : s.wpm >= 25 ? "ঠিক পথে আছেন। প্রতিদিন ৫ মিনিট প্র্যাকটিস করুন।" : "শুরুটা হলো। আগে নির্ভুল, তারপর দ্রুত।";
    document.getElementById("tr-note").textContent = lvl;
    result.hidden = false; showBest();
  }

  input.addEventListener("input", function () {
    if (done) return;
    var v = input.value;
    if (!started && v.length) { started = true; startAt = Date.now(); timer = setInterval(tick, 200); hint.hidden = true; box.parentNode.classList.add("running"); }
    if (v.length > typed.length) {
      for (var i = typed.length; i < v.length; i++) { keys++; if (v[i] === text[i]) correctKeys++; }
    }
    typed = v.slice(0, text.length);
    render();
    if (typed.length >= text.length) finish();
  });
  box.parentNode.addEventListener("click", function () { if (!done) input.focus(); });
  document.getElementById("tt-restart").addEventListener("click", function () { reset(); });
  document.getElementById("tr-again").addEventListener("click", function () { reset(); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") reset(); });

  document.querySelectorAll("[data-mode]").forEach(function (b) {
    b.addEventListener("click", function () {
      document.querySelectorAll("[data-mode]").forEach(function (x) { x.setAttribute("aria-pressed", x === b); });
      mode = b.dataset.mode; reset();
    });
  });
  document.querySelectorAll("[data-dur]").forEach(function (b) {
    b.addEventListener("click", function () {
      document.querySelectorAll("[data-dur]").forEach(function (x) { x.setAttribute("aria-pressed", x === b); });
      duration = +b.dataset.dur; reset();
    });
  });
  reset(true);
})();

/* =========================================================
   English Effect — Kids "Spell It!" game (kids-game.html)
   Chhobi dekhe letter tile tap kore English word banano.
   Notun word add korte chaile WORDS e [word, chhobi, bangla] add koro.
   (Client er niyom: kono face/manush/prani er chhobi na, music na.)
   ========================================================= */
(function () {
  var WORDS = {
    easy: [["SUN", "☀️", "সূর্য"], ["CAR", "🚗", "গাড়ি"], ["BUS", "🚌", "বাস"], ["CUP", "☕", "কাপ"], ["HAT", "🎩", "টুপি"], ["PEN", "🖊️", "কলম"], ["BOX", "📦", "বাক্স"], ["KEY", "🔑", "চাবি"], ["EGG", "🥚", "ডিম"], ["BED", "🛏️", "বিছানা"], ["BAG", "👜", "ব্যাগ"], ["MAP", "🗺️", "মানচিত্র"]],
    medium: [["BOOK", "📖", "বই"], ["BALL", "⚽", "বল"], ["TREE", "🌳", "গাছ"], ["MOON", "🌙", "চাঁদ"], ["STAR", "⭐", "তারা"], ["CAKE", "🎂", "কেক"], ["BOAT", "⛵", "নৌকা"], ["DOOR", "🚪", "দরজা"], ["MILK", "🥛", "দুধ"], ["KITE", "🪁", "ঘুড়ি"], ["SHIP", "🚢", "জাহাজ"], ["RAIN", "🌧️", "বৃষ্টি"]],
    hard: [["APPLE", "🍎", "আপেল"], ["HOUSE", "🏠", "বাড়ি"], ["TRAIN", "🚆", "ট্রেন"], ["CLOCK", "🕒", "ঘড়ি"], ["BREAD", "🍞", "রুটি"], ["CHAIR", "🪑", "চেয়ার"], ["WATCH", "⌚", "হাতঘড়ি"], ["PLANE", "✈️", "বিমান"], ["GRAPE", "🍇", "আঙুর"], ["LEMON", "🍋", "লেবু"], ["PENCIL", "✏️", "পেনসিল"], ["BANANA", "🍌", "কলা"]]
  };
  var ROUNDS = 8;

  var $ = function (id) { return document.getElementById(id); };
  var pic = $("kg-pic"), bn = $("kg-bn"), slots = $("kg-slots"), tiles = $("kg-tiles"),
      roundEl = $("kg-round"), starsEl = $("kg-stars"), bar = $("kg-bar"), end = $("kg-end"),
      stage = $("kg-stage"), sayBtn = $("kg-say"), hintBtn = $("kg-hint"), burst = $("kg-burst");
  if (!pic) return;

  var level = "easy", list = [], round = 0, word = "", pos = 0, mistakes = 0, hinted = false, stars = 0, busy = false;
  var canSpeak = "speechSynthesis" in window;
  if (!canSpeak) sayBtn.hidden = true;

  function shuffle(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  function speak(w) {
    if (!canSpeak) return;
    try { speechSynthesis.cancel(); var u = new SpeechSynthesisUtterance(w.toLowerCase()); u.lang = "en-GB"; u.rate = .8; speechSynthesis.speak(u); } catch (e) {}
  }

  function start() {
    list = shuffle(WORDS[level]).slice(0, ROUNDS); round = 0; stars = 0;
    end.hidden = true; stage.hidden = false; next();
  }
  function next() {
    if (round >= list.length) return finish();
    var w = list[round]; word = w[0]; pos = 0; mistakes = 0; hinted = false; busy = false;
    pic.textContent = w[1]; bn.textContent = w[2];
    pic.classList.remove("pop"); void pic.offsetWidth; pic.classList.add("pop");
    roundEl.textContent = (round + 1) + " / " + list.length;
    bar.style.transform = "scaleX(" + (round / list.length) + ")";
    starsEl.textContent = stars;
    slots.innerHTML = word.split("").map(function () { return '<span class="slot"></span>'; }).join("");
    var letters = shuffle(word.split(""));
    if (letters.join("") === word && word.length > 1) letters.reverse();
    tiles.innerHTML = letters.map(function (l, i) {
      return '<button type="button" class="tile" style="--i:' + i + '" data-l="' + l + '">' + l + "</button>";
    }).join("");
  }
  function pick(btn) {
    if (busy || !btn || btn.disabled) return;
    var l = btn.dataset.l;
    if (l === word[pos]) {
      var slot = slots.children[pos];
      slot.textContent = l; slot.classList.add("filled");
      btn.disabled = true; btn.classList.add("used");
      pos++;
      tiles.querySelectorAll(".tile.hint").forEach(function (t) { t.classList.remove("hint"); });
      if (pos === word.length) win();
    } else {
      mistakes++;
      btn.classList.remove("shake"); void btn.offsetWidth; btn.classList.add("shake");
    }
  }
  function win() {
    busy = true;
    var earned = hinted ? 1 : mistakes === 0 ? 3 : mistakes <= 2 ? 2 : 1;
    stars += earned; starsEl.textContent = stars;
    slots.classList.add("win");
    speak(word);
    celebrate(earned);
    setTimeout(function () { slots.classList.remove("win"); round++; next(); }, 1700);
  }
  function celebrate(n) {
    var colors = ["#3BA62F", "#8DC63F", "#FFD43B", "#0F2A33"];
    burst.innerHTML = "";
    for (var i = 0; i < 26; i++) {
      var s = document.createElement("i");
      var a = Math.random() * Math.PI * 2, d = 80 + Math.random() * 120;
      s.style.setProperty("--x", Math.cos(a) * d + "px");
      s.style.setProperty("--y", Math.sin(a) * d - 40 + "px");
      s.style.setProperty("--r", (Math.random() * 540 - 270) + "deg");
      s.style.background = colors[i % colors.length];
      burst.appendChild(s);
    }
    var lab = document.createElement("b");
    lab.textContent = n === 3 ? "Excellent!" : n === 2 ? "Well done!" : "Good try!";
    lab.innerHTML += "<span>" + "★".repeat(n) + "</span>";
    burst.appendChild(lab);
    burst.classList.remove("go"); void burst.offsetWidth; burst.classList.add("go");
  }
  function finish() {
    stage.hidden = true; end.hidden = false;
    bar.style.transform = "scaleX(1)";
    var max = list.length * 3;
    $("kg-final").textContent = stars + " / " + max;
    var row = $("kg-final-stars"), full = Math.round(stars / max * 5);
    row.innerHTML = "";
    for (var i = 0; i < 5; i++) { var s = document.createElement("span"); s.textContent = "★"; s.style.setProperty("--i", i); if (i < full) s.className = "on"; row.appendChild(s); }
    $("kg-msg").textContent = full >= 5 ? "অসাধারণ! সব শব্দ একদম ঠিক।" : full >= 3 ? "খুব ভালো! আরেকবার খেললে আরও তারা পাবে।" : "চলো আবার চেষ্টা করি!";
  }

  tiles.addEventListener("click", function (e) { pick(e.target.closest(".tile")); });
  document.addEventListener("keydown", function (e) {
    if (stage.hidden || e.ctrlKey || e.metaKey) return;
    var k = (e.key || "").toUpperCase();
    if (k.length === 1 && k >= "A" && k <= "Z") {
      var b = tiles.querySelector('.tile[data-l="' + k + '"]:not(:disabled)');
      if (b) pick(b);
    }
  });
  sayBtn.addEventListener("click", function () { speak(word); });
  hintBtn.addEventListener("click", function () {
    if (busy) return; hinted = true;
    var b = tiles.querySelector('.tile[data-l="' + word[pos] + '"]:not(:disabled)');
    if (b) b.classList.add("hint");
  });
  $("kg-again").addEventListener("click", start);
  document.querySelectorAll("[data-level]").forEach(function (b) {
    b.addEventListener("click", function () {
      document.querySelectorAll("[data-level]").forEach(function (x) { x.setAttribute("aria-pressed", x === b); });
      level = b.dataset.level; start();
    });
  });
  start();
})();

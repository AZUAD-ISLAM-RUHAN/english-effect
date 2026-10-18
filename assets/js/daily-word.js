/* =========================================================
   English Effect — Daily word (daily-word.html + home widget)
   Protidin ekta IELTS/PTE shobdo. Shobai eki din eki shobdo pay.
   Notun shobdo add korte WORDS list e [word, part of speech, Bangla, example] add koro.
   ========================================================= */
var EE_WORDS = [
  ["abundant", "adjective", "প্রচুর", "Fresh fruit is abundant in summer."],
  ["accurate", "adjective", "নির্ভুল", "Please give accurate information on the form."],
  ["acquire", "verb", "অর্জন করা", "It takes time to acquire a new language."],
  ["adapt", "verb", "মানিয়ে নেওয়া", "Students adapt quickly to online classes."],
  ["adequate", "adjective", "যথেষ্ট", "Make sure you get adequate sleep before the exam."],
  ["advocate", "verb", "পক্ষে কথা বলা, সমর্থন করা", "Many teachers advocate reading every day."],
  ["alternative", "noun", "বিকল্প", "Cycling is a cheap alternative to driving."],
  ["anticipate", "verb", "আগে থেকে আশা বা ধারণা করা", "We anticipate a lot of questions after the class."],
  ["apparent", "adjective", "স্পষ্ট", "It was apparent that she had practised a lot."],
  ["approach", "noun", "পদ্ধতি", "This approach makes grammar easier to learn."],
  ["assess", "verb", "মূল্যায়ন করা", "The examiner will assess your speaking."],
  ["beneficial", "adjective", "উপকারী", "Regular exercise is beneficial for health."],
  ["capable", "adjective", "সক্ষম", "She is capable of scoring very well."],
  ["consequence", "noun", "পরিণাম", "Missing classes can have serious consequences."],
  ["considerable", "adjective", "উল্লেখযোগ্য, অনেক", "He made considerable progress in one month."],
  ["contribute", "verb", "অবদান রাখা", "Everyone can contribute to the discussion."],
  ["crucial", "adjective", "অত্যন্ত গুরুত্বপূর্ণ", "Time management is crucial in the exam."],
  ["decline", "verb", "কমে যাওয়া", "The number of visitors declined last year."],
  ["demonstrate", "verb", "দেখানো, প্রমাণ করা", "The graph demonstrates a clear trend."],
  ["diverse", "adjective", "বৈচিত্র্যময়", "The city has a diverse population."],
  ["efficient", "adjective", "দক্ষ, কম খরচে বেশি কাজ করে এমন", "Public transport can be more efficient than private cars."],
  ["eliminate", "verb", "দূর করা", "Practice helps eliminate common mistakes."],
  ["emphasise", "verb", "জোর দেওয়া", "The teacher emphasised the importance of planning."],
  ["essential", "adjective", "অপরিহার্য", "Vocabulary is essential for good writing."],
  ["evident", "adjective", "স্পষ্ট", "Her confidence was evident in the interview."],
  ["expand", "verb", "বাড়ানো, প্রসারিত করা", "Reading helps you expand your vocabulary."],
  ["fluctuate", "verb", "ওঠানামা করা", "Prices fluctuate throughout the year."],
  ["fundamental", "adjective", "মৌলিক", "Grammar is a fundamental part of language."],
  ["generate", "verb", "তৈরি করা, উৎপন্ন করা", "Solar panels generate electricity."],
  ["hinder", "verb", "বাধা দেওয়া", "Fear can hinder your speaking."],
  ["impact", "noun", "প্রভাব", "Technology has a big impact on education."],
  ["inevitable", "adjective", "অনিবার্য", "Some mistakes are inevitable when you learn."],
  ["maintain", "verb", "বজায় রাখা", "Try to maintain eye contact while speaking."],
  ["obtain", "verb", "পাওয়া, অর্জন করা", "She obtained a scholarship to study abroad."],
  ["overcome", "verb", "কাটিয়ে ওঠা", "You can overcome nervousness with practice."],
  ["perspective", "noun", "দৃষ্টিভঙ্গি", "Travel gives you a new perspective."],
  ["predominantly", "adverb", "প্রধানত", "The audience was predominantly young."],
  ["relevant", "adjective", "প্রাসঙ্গিক", "Give relevant examples in your essay."],
  ["significant", "adjective", "উল্লেখযোগ্য", "There was a significant rise in prices."],
  ["sufficient", "adjective", "যথেষ্ট", "Two weeks is not sufficient to prepare."],
  ["sustainable", "adjective", "টেকসই", "We need sustainable ways to use water."],
  ["tendency", "noun", "প্রবণতা", "Many learners have a tendency to speak too fast."],
  ["thorough", "adjective", "পুঙ্খানুপুঙ্খ, খুঁটিনাটি সহ", "Do a thorough check of your answers."],
  ["ultimately", "adverb", "শেষ পর্যন্ত", "Ultimately, practice makes the difference."],
  ["vital", "adjective", "অত্যাবশ্যক", "Listening practice is vital for PTE."]
];

/* Bangladesh date (UTC+6) -> word index, same for every visitor */
function eeDayNumber(offsetDays) {
  var d = new Date(Date.now() + 6 * 3600e3);
  return Math.floor(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()) / 864e5) - (offsetDays || 0);
}
function eeWordFor(day) { return EE_WORDS[((day % EE_WORDS.length) + EE_WORDS.length) % EE_WORDS.length]; }

(function () {
  var canSpeak = "speechSynthesis" in window;
  function speak(t) { if (!canSpeak) return; try { speechSynthesis.cancel(); var u = new SpeechSynthesisUtterance(t); u.lang = "en-GB"; u.rate = .85; speechSynthesis.speak(u); } catch (e) {} }
  function store(k, v) { try { if (v === undefined) return JSON.parse(localStorage.getItem(k) || "null"); localStorage.setItem(k, JSON.stringify(v)); } catch (e) { return null; } }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }

  /* ---------- home widget: <div id="word-of-day"></div> ---------- */
  var mini = document.getElementById("word-of-day");
  if (mini) {
    var w0 = eeWordFor(eeDayNumber());
    mini.innerHTML = '<a class="dw-mini" href="daily-word.html"><small>Word of the day</small><b>' + esc(w0[0]) + '</b><span class="bn">' + esc(w0[2]) + '</span><em>Practise today\'s word →</em></a>';
  }

  /* ---------- full page ---------- */
  var page = document.getElementById("dw-app");
  if (!page) return;
  var today = eeDayNumber(), view = 0;

  // streak
  var st = store("ee-dw-streak") || { last: 0, n: 0 };
  if (st.last !== today) { st.n = st.last === today - 1 ? st.n + 1 : 1; st.last = today; store("ee-dw-streak", st); }
  var learned = store("ee-dw-learned") || {};

  function render() {
    var day = today - view, W = eeWordFor(day), id = W[0];
    // distractors: other words whose Bangla meaning is clearly different
    var parts = function (m) { return m.split(",").map(function (p) { return p.trim(); }); };
    var clash = function (a, b) { var pb = parts(b); return parts(a).some(function (p) { return pb.indexOf(p) > -1; }); };
    var others = EE_WORDS.filter(function (x) { return x[0] !== id && !clash(x[2], W[2]); });
    var d1 = others[(day * 7) % others.length];
    var rest = others.filter(function (x) { return !clash(x[2], d1[2]); });
    var d2 = rest[(day * 13 + 5) % rest.length];
    var opts = [W[2], d1[2], d2[2]];
    var order = [0, 1, 2].sort(function (a, b) { return ((day + a * 31) % 7) - ((day + b * 31) % 7); });
    var label = view === 0 ? "Today" : view === 1 ? "Yesterday" : view + " days ago";

    page.innerHTML =
      '<div class="dw-grid">' +
        '<article class="dw-card" id="dw-card">' +
          '<div class="dw-nav"><button type="button" id="dw-prev" aria-label="Previous word">‹</button><span>' + label + '</span><button type="button" id="dw-next" aria-label="Next word"' + (view === 0 ? " disabled" : "") + ">›</button></div>" +
          '<p class="dw-pos">' + W[1] + "</p>" +
          '<h2 class="dw-word">' + esc(W[0]).split("").map(function (c, k) { return '<span style="--i:' + k + '">' + c + "</span>"; }).join("") + "</h2>" +
          (canSpeak ? '<button type="button" class="dw-say" id="dw-say"><svg viewBox="0 0 24 24"><path d="M4 9v6h4l5 4V5L8 9H4z"/><path d="M16 9a4 4 0 0 1 0 6M18.5 6.5a8 8 0 0 1 0 11"/></svg>Hear it</button>' : "") +
          '<div class="dw-meaning"><small>Bangla</small><p class="bn">' + esc(W[2]) + "</p></div>" +
          '<div class="dw-example"><small>Example</small><p>' + esc(W[3]).replace(new RegExp("\\b(" + id.slice(0, Math.max(4, id.length - 2)) + "\\w*)", "i"), "<mark>$1</mark>") + "</p></div>" +
          '<button type="button" class="btn ' + (learned[id] ? "btn-ghost" : "btn-green") + ' btn-block" id="dw-learn">' + (learned[id] ? "✓ Learned" : "Mark as learned") + "</button>" +
        "</article>" +
        '<aside class="dw-side">' +
          '<div class="dw-quiz"><small>Quick check</small><h3>What does <b>' + esc(id) + "</b> mean?</h3>" +
            '<div class="dw-qopts">' + order.map(function (k) { return '<button type="button" class="bn" data-ok="' + (k === 0 ? 1 : 0) + '">' + esc(opts[k]) + "</button>"; }).join("") + "</div>" +
            '<p class="dw-qmsg" id="dw-qmsg" aria-live="polite"></p></div>' +
          '<div class="dw-stats"><div><b>' + st.n + '</b><span>day streak</span></div><div><b>' + Object.keys(learned).length + '</b><span>words learned</span></div></div>' +
          '<div class="dw-week"><small>This week</small>' + [6, 5, 4, 3, 2, 1, 0].map(function (o) {
            var w = eeWordFor(today - o);
            return '<button type="button" data-v="' + o + '" class="' + (o === view ? "on " : "") + (learned[w[0]] ? "done" : "") + '"><span>' + esc(w[0]) + "</span>" + (learned[w[0]] ? "<i>✓</i>" : "") + "</button>";
          }).join("") + "</div>" +
        "</aside>" +
      "</div>";

    document.getElementById("dw-prev").onclick = function () { view++; render(); };
    document.getElementById("dw-next").onclick = function () { if (view > 0) { view--; render(); } };
    var say = document.getElementById("dw-say"); if (say) say.onclick = function () { speak(W[0] + ". " + W[3]); };
    document.getElementById("dw-learn").onclick = function () {
      if (learned[id]) delete learned[id]; else learned[id] = today;
      store("ee-dw-learned", learned); render();
      if (learned[id]) document.getElementById("dw-card").classList.add("celebrate");
    };
    page.querySelectorAll(".dw-qopts button").forEach(function (b) {
      b.onclick = function () {
        var ok = b.dataset.ok === "1";
        page.querySelectorAll(".dw-qopts button").forEach(function (x) { x.disabled = true; if (x.dataset.ok === "1") x.classList.add("right"); });
        if (!ok) b.classList.add("wrong");
        document.getElementById("dw-qmsg").textContent = ok ? "Correct! দারুণ।" : "Not quite. সঠিক অর্থটা সবুজ করে দেখানো হলো।";
      };
    });
    page.querySelectorAll(".dw-week button").forEach(function (b) { b.onclick = function () { view = +b.dataset.v; render(); }; });
  }
  render();
})();

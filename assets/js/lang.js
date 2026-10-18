/* =========================================================
   English Effect — Language switch (EN / বাং)
   ---------------------------------------------------------
   Default: website jemon ache (English heading + Bangla text, "mixed").
   EN chaple: shob lekha English. বাং chaple: shob lekha Bangla.
   Active button abar chaple default (mixed) e fire jay.

   Kivabe lekha translate korte hoy:
   - English lekhar element e  data-bn="বাংলা অনুবাদ"  dao
   - Bangla lekhar element e   data-en="English translation"  dao
   - Lekhar bhitore link/bold thakle HTML shoho dao, eta innerHTML hishebe boshe.
   Header e  <div data-lang-switch></div>  rakhle switch ta oikhane boshbe.
   ========================================================= */
(function () {
  var KEY = "ee-lang";
  var mode = "mix";
  try { mode = localStorage.getItem(KEY) || "mix"; } catch (e) {}

  var css = document.createElement("style");
  css.textContent =
    ".lang-sw{display:inline-flex;padding:3px;border-radius:10px;background:var(--soft,#F3F8F1);border:1px solid var(--line,#E1E9E4)}" +
    ".lang-sw button{font:700 .78rem Montserrat,'Hind Siliguri',system-ui,sans-serif;min-width:38px;padding:.4rem .55rem;border:0;border-radius:7px;background:transparent;color:var(--muted,#5B6F75);cursor:pointer;transition:background .2s,color .2s}" +
    ".lang-sw button[aria-pressed=true]{background:var(--dark,#0F2A33);color:#fff}" +
    ".lang-swap{animation:langIn .35s ease}" +
    "@keyframes langIn{from{opacity:.2}to{opacity:1}}" +
    "@media (prefers-reduced-motion:reduce){.lang-swap{animation:none}}";
  document.head.appendChild(css);

  function apply(root, animate) {
    var scope = root && root.querySelectorAll ? root : document;
    var els = scope.querySelectorAll("[data-en],[data-bn]");
    if (root && root.matches && root.matches("[data-en],[data-bn]")) els = [root].concat([].slice.call(els));
    [].forEach.call(els, function (el) {
      if (el.dataset.orig === undefined) { el.dataset.orig = el.innerHTML; el.dataset.origBn = el.classList.contains("bn") ? "1" : "0"; }
      var next = el.dataset.orig, font = el.dataset.origBn === "1";
      if (mode === "en" && el.dataset.en !== undefined) { next = el.dataset.en; font = false; }
      if (mode === "bn" && el.dataset.bn !== undefined) { next = el.dataset.bn; font = true; }
      if (el.innerHTML !== next) {
        el.innerHTML = next;
        if (animate) { el.classList.remove("lang-swap"); void el.offsetWidth; el.classList.add("lang-swap"); }
      }
      el.classList.toggle("bn", font);
    });
    document.documentElement.lang = mode === "bn" ? "bn" : "en";
    document.querySelectorAll(".lang-sw button").forEach(function (b) { b.setAttribute("aria-pressed", b.dataset.l === mode); });
  }

  function mountSwitch(root) {
    (root || document).querySelectorAll("[data-lang-switch]").forEach(function (box) {
      if (box.dataset.ready) return; box.dataset.ready = "1";
      box.innerHTML = '<div class="lang-sw" role="group" aria-label="Language"><button type="button" data-l="en" title="Show everything in English">EN</button><button type="button" data-l="bn" title="সব লেখা বাংলায় দেখুন">বাং</button></div>';
      box.querySelectorAll("button").forEach(function (b) {
        b.onclick = function () {
          mode = mode === b.dataset.l ? "mix" : b.dataset.l;
          try { localStorage.setItem(KEY, mode); } catch (e) {}
          apply(document, true);
        };
      });
    });
  }

  function init() { mountSwitch(); apply(document, false); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();

  // header/footer/game content added later by JS also gets translated
  new MutationObserver(function (list) {
    list.forEach(function (m) {
      [].forEach.call(m.addedNodes, function (n) { if (n.nodeType === 1) { mountSwitch(n.parentNode || n); apply(n, false); } });
    });
  }).observe(document.documentElement, { childList: true, subtree: true });
})();

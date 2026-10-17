/* =========================================================
   English Effect — "Install app" button
   - Chrome / Edge / Android: button chaplei browser er install box ashe
   - iPhone / iPad (Safari): instruction dekhay (Apple shorashori install dey na)
   - Already installed ba app theke khola hole kichu dekhay na
   Header e  <button data-install-app>Install app</button>  rakhle oita kaj korbe.
   Phone e niche ekta chhoto banner o ashe (ekbar bondho korle 14 din ar ashbe na).
   ========================================================= */
(function () {
  var standalone = window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone === true;
  if (standalone) return;

  var ua = navigator.userAgent || "";
  var isIOS = /iphone|ipad|ipod/i.test(ua) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
  var isMobile = /android|iphone|ipad|ipod/i.test(ua) || isIOS;
  var deferred = null;
  var KEY = "ee-install-dismissed";

  /* ---------- styles ---------- */
  var css = document.createElement("style");
  css.textContent =
    "[data-install-app]{display:none}" +
    ".ee-can-install [data-install-app]{display:inline-flex}" +
    ".ee-install-bar{position:fixed;left:max(12px,env(safe-area-inset-left,0px));right:max(12px,env(safe-area-inset-right,0px));bottom:calc(12px + env(safe-area-inset-bottom,0px));z-index:70;display:flex;align-items:center;gap:.8rem;padding:.8rem .9rem;border-radius:16px;background:#0F2A33;color:#fff;box-shadow:0 20px 40px -16px rgba(0,0,0,.55);transform:translateY(140%);transition:transform .5s cubic-bezier(.22,.8,.24,1)}" +
    ".ee-install-bar.show{transform:none}" +
    ".ee-install-bar img{width:44px;height:44px;border-radius:12px;flex:none}" +
    ".ee-install-bar div{flex:1;min-width:0;line-height:1.3}" +
    ".ee-install-bar b{display:block;font-size:.95rem}" +
    ".ee-install-bar small{color:rgba(255,255,255,.7);font-size:.8rem}" +
    ".ee-install-bar .ee-i-go{flex:none;border:0;border-radius:10px;padding:.65rem .9rem;font:700 .88rem Montserrat,system-ui,sans-serif;background:#3BA62F;color:#fff;cursor:pointer}" +
    ".ee-install-bar .ee-i-x{flex:none;width:32px;height:32px;border:0;border-radius:8px;background:rgba(255,255,255,.1);color:#fff;font-size:1.1rem;cursor:pointer}" +
    ".ee-ios{position:fixed;inset:0;z-index:90;display:grid;place-items:end center;padding:16px;background:rgba(15,42,51,.6)}" +
    ".ee-ios[hidden]{display:none}" +
    ".ee-ios-box{width:min(420px,100%);padding:1.4rem;border-radius:20px;background:#fff;color:#12262D;font-family:'Hind Siliguri',Montserrat,system-ui,sans-serif;margin-bottom:env(safe-area-inset-bottom,0px)}" +
    ".ee-ios-box h3{margin:0 0 .8rem;font:800 1.15rem Montserrat,system-ui,sans-serif}" +
    ".ee-ios-box ol{margin:0 0 1.1rem;padding-left:1.2rem;display:grid;gap:.6rem;line-height:1.5}" +
    ".ee-ios-box svg{width:18px;height:18px;vertical-align:-3px;fill:none;stroke:#2E8A24;stroke-width:2.2;stroke-linecap:round;stroke-linejoin:round}" +
    ".ee-ios-box button{width:100%;border:0;border-radius:12px;padding:.85rem;font:700 .95rem Montserrat,system-ui,sans-serif;background:#0F2A33;color:#fff;cursor:pointer}" +
    "@media (prefers-reduced-motion:reduce){.ee-install-bar{transition:none}}";
  document.head.appendChild(css);

  /* ---------- iPhone instructions ---------- */
  var shareIcon = '<svg viewBox="0 0 24 24"><path d="M12 15V3M8 7l4-4 4 4"/><path d="M5 11v9h14v-9"/></svg>';
  var iosBox = document.createElement("div");
  iosBox.className = "ee-ios"; iosBox.hidden = true;
  iosBox.innerHTML = '<div class="ee-ios-box" role="dialog" aria-modal="true" aria-labelledby="ee-ios-t"><h3 id="ee-ios-t">Install English Effect</h3><ol>' +
    "<li>Safari er niche <b>Share</b> " + shareIcon + " button chapun।</li>" +
    "<li>List theke <b>Add to Home Screen</b> chapun, tarpor <b>Add</b>।</li></ol>" +
    '<button type="button">Got it</button></div>';
  document.body.appendChild(iosBox);
  iosBox.addEventListener("click", function (e) { if (e.target === iosBox || e.target.tagName === "BUTTON") iosBox.hidden = true; });

  /* ---------- install action ---------- */
  function install() {
    if (deferred) {
      deferred.prompt();
      deferred.userChoice.then(function (r) { if (r.outcome === "accepted") done(); deferred = null; });
    } else if (isIOS) {
      iosBox.hidden = false;
    }
  }
  function done() { document.documentElement.classList.remove("ee-can-install"); hideBar(); }
  function hideBar() { if (bar) bar.classList.remove("show"); document.documentElement.classList.remove("ee-bar-open"); }

  // any button/link with data-install-app (header, footer, etc.)
  document.addEventListener("click", function (e) {
    var t = e.target.closest("[data-install-app]");
    if (t) { e.preventDefault(); install(); }
  });

  /* ---------- phone banner ---------- */
  var bar = null;
  function dismissedRecently() { try { var t = +localStorage.getItem(KEY); return t && Date.now() - t < 14 * 864e5; } catch (e) { return false; } }
  function showBar() {
    if (!isMobile || dismissedRecently() || bar) return;
    bar = document.createElement("div");
    bar.className = "ee-install-bar"; bar.setAttribute("role", "region"); bar.setAttribute("aria-label", "Install app");
    bar.innerHTML = '<img src="/assets/images/icons/icon-192.png" alt=""><div><b>English Effect app</b><small>Home screen e rakhun, ek tap e khulun</small></div>' +
      '<button type="button" class="ee-i-go">Install</button><button type="button" class="ee-i-x" aria-label="Close">×</button>';
    document.body.appendChild(bar);
    bar.querySelector(".ee-i-go").onclick = install;
    bar.querySelector(".ee-i-x").onclick = function () { hideBar(); try { localStorage.setItem(KEY, Date.now()); } catch (e) {} };
    setTimeout(function () { bar.classList.add("show"); document.documentElement.classList.add("ee-bar-open"); }, 4000);
  }

  window.addEventListener("beforeinstallprompt", function (e) {
    e.preventDefault(); deferred = e;
    document.documentElement.classList.add("ee-can-install");
    showBar();
  });
  window.addEventListener("appinstalled", done);

  if (isIOS && /safari/i.test(ua) && !/crios|fxios|edgios/i.test(ua)) {
    document.documentElement.classList.add("ee-can-install");
    showBar();
  }
})();

/* =========================================================
   English Effect — Score calculators
   ielts-calculator.html : overall band + raw score to band
   pte-calculator.html   : target gap checker + rough average
   ========================================================= */
(function () {
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  function $(id) { return document.getElementById(id); }
  function countTo(el, to, dec) {
    var from = parseFloat(el.dataset.v || 0), t0 = performance.now(), dur = reduce ? 1 : 500;
    el.dataset.v = to;
    (function f(t) {
      var p = Math.min(1, (t - t0) / dur), v = from + (to - from) * (1 - Math.pow(1 - p, 3));
      el.textContent = dec ? (Math.round(v * 2) / 2).toFixed(1) : Math.round(v);
      if (p < 1) requestAnimationFrame(f); else el.textContent = dec ? to.toFixed(1) : to;
    })(t0);
  }
  function pop(el) { if (reduce) return; el.classList.remove("pop"); void el.offsetWidth; el.classList.add("pop"); }

  /* =====================================================
     IELTS
     ===================================================== */
  if ($("ielts-calc")) {
    // Official rounding: .25 -> up to .5, .75 -> up to next whole
    function overall(avg) {
      var base = Math.floor(avg), f = avg - base;
      if (f < 0.25) return base;
      if (f < 0.75) return base + 0.5;
      return base + 1;
    }
    // Approximate raw score -> band tables (marks needed can vary slightly between tests)
    var TABLES = {
      listening: [[39, 9], [37, 8.5], [35, 8], [32, 7.5], [30, 7], [26, 6.5], [23, 6], [18, 5.5], [16, 5], [13, 4.5], [10, 4], [8, 3.5], [6, 3], [4, 2.5]],
      academic:  [[39, 9], [37, 8.5], [35, 8], [33, 7.5], [30, 7], [27, 6.5], [23, 6], [19, 5.5], [15, 5], [13, 4.5], [10, 4], [8, 3.5], [6, 3], [4, 2.5]],
      general:   [[40, 9], [39, 8.5], [37, 8], [36, 7.5], [34, 7], [32, 6.5], [30, 6], [27, 5.5], [23, 5], [19, 4.5], [15, 4], [12, 3.5], [9, 3], [6, 2.5]]
    };
    function rawToBand(raw, table) {
      for (var i = 0; i < table.length; i++) if (raw >= table[i][0]) return table[i][1];
      return raw > 0 ? 2 : 0;
    }

    // tabs
    document.querySelectorAll("[data-tab]").forEach(function (b) {
      b.addEventListener("click", function () {
        document.querySelectorAll("[data-tab]").forEach(function (x) { x.setAttribute("aria-selected", x === b); });
        document.querySelectorAll("[data-panel]").forEach(function (p) { p.hidden = p.dataset.panel !== b.dataset.tab; });
      });
    });

    // overall
    var skills = ["l", "r", "w", "s"];
    function calcOverall() {
      var vals = skills.map(function (k) { return parseFloat($("ov-" + k).value); });
      var sum = vals.reduce(function (a, b) { return a + b; }, 0), avg = sum / 4, band = overall(avg);
      countTo($("ov-band"), band, true); pop($("ov-band"));
      var f = avg - Math.floor(avg), rule = f === 0 || f === 0.5 ? "no rounding needed" : f < 0.25 ? "rounded down" : f < 0.5 ? "rounded up to the next half band" : f < 0.75 ? "rounded down to the half band" : "rounded up to the next whole band";
      $("ov-math").innerHTML = "(" + vals.join(" + ") + ") ÷ 4 = <b>" + (Math.round(avg * 1000) / 1000) + "</b> → " + rule;
      skills.forEach(function (k, i) {
        $("ov-bar-" + k).style.transform = "scaleX(" + vals[i] / 9 + ")";
        $("ov-val-" + k).textContent = vals[i].toFixed(1);
      });
      var lowest = Math.min.apply(null, vals), names = { l: "Listening", r: "Reading", w: "Writing", s: "Speaking" };
      var weak = skills.filter(function (k, i) { return vals[i] === lowest; }).map(function (k) { return names[k]; });
      $("ov-tip").textContent = band >= 9 ? "" : "Overall বাড়াতে সবচেয়ে কম স্কোরের অংশে জোর দিন: " + weak.join(", ") + ".";
    }
    skills.forEach(function (k) {
      var sel = $("ov-" + k);
      for (var b = 0; b <= 9; b += 0.5) { var o = document.createElement("option"); o.value = b; o.textContent = b.toFixed(1); sel.appendChild(o); }
      sel.value = "6.5";
      sel.addEventListener("change", calcOverall);
      // +/- steppers
      document.querySelectorAll('[data-step="' + k + '"]').forEach(function (btn) {
        btn.addEventListener("click", function () {
          var v = Math.min(9, Math.max(0, parseFloat(sel.value) + parseFloat(btn.dataset.d)));
          sel.value = String(v); calcOverall();
        });
      });
    });
    $("ov-r").value = "6"; $("ov-w").value = "6"; $("ov-s").value = "7";
    calcOverall();

    // raw score
    var type = "academic";
    document.querySelectorAll("[data-type]").forEach(function (b) {
      b.addEventListener("click", function () {
        document.querySelectorAll("[data-type]").forEach(function (x) { x.setAttribute("aria-pressed", x === b); });
        type = b.dataset.type; calcRaw();
      });
    });
    function sync(rangeId, numId) {
      var r = $(rangeId), n = $(numId);
      r.addEventListener("input", function () { n.value = r.value; calcRaw(); });
      n.addEventListener("input", function () { var v = Math.max(0, Math.min(40, parseInt(n.value || 0, 10))); r.value = v; calcRaw(); });
    }
    sync("raw-l", "raw-l-n"); sync("raw-r", "raw-r-n");
    function calcRaw() {
      var l = +$("raw-l").value, r = +$("raw-r").value;
      var bl = rawToBand(l, TABLES.listening), br = rawToBand(r, TABLES[type]);
      countTo($("raw-l-band"), bl, true); countTo($("raw-r-band"), br, true);
      $("raw-r-label").textContent = type === "academic" ? "Academic Reading" : "General Training Reading";
      ["l", "r"].forEach(function (k) { var el = $("raw-" + k); el.style.setProperty("--p", (el.value / 40 * 100) + "%"); });
    }
    calcRaw();
    $("raw-use").addEventListener("click", function () {
      $("ov-l").value = String(parseFloat($("raw-l-band").dataset.v));
      $("ov-r").value = String(parseFloat($("raw-r-band").dataset.v));
      document.querySelector('[data-tab="overall"]').click();
      calcOverall();
      $("ielts-calc").scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    });
  }

  /* =====================================================
     PTE
     ===================================================== */
  if ($("pte-calc")) {
    var P = ["listening", "reading", "speaking", "writing"];
    var same = true;
    function clamp(v) { v = parseInt(v || 0, 10); return Math.max(10, Math.min(90, isNaN(v) ? 10 : v)); }

    function bindPair(a, b) {
      var r = $(a), n = $(b);
      r.addEventListener("input", function () { n.value = r.value; update(); });
      n.addEventListener("change", function () { n.value = clamp(n.value); r.value = n.value; update(); });
      n.addEventListener("input", function () { if (n.value.length >= 2) { r.value = clamp(n.value); update(); } });
    }
    P.forEach(function (k) { bindPair("ps-" + k, "ps-" + k + "-n"); bindPair("pt-" + k, "pt-" + k + "-n"); });
    bindPair("pt-all", "pt-all-n");

    $("pt-same").addEventListener("change", function () {
      same = this.checked;
      $("pt-one").hidden = !same; $("pt-each").hidden = same; update();
    });
    document.querySelectorAll("[data-preset]").forEach(function (b) {
      b.addEventListener("click", function () {
        var v = b.dataset.preset; $("pt-all").value = v; $("pt-all-n").value = v;
        P.forEach(function (k) { $("pt-" + k).value = v; $("pt-" + k + "-n").value = v; });
        update();
      });
    });

    function update() {
      var met = 0, totalGap = 0, sum = 0, worst = null, worstGap = 0;
      P.forEach(function (k) {
        var s = +$("ps-" + k).value, t = same ? +$("pt-all").value : +$("pt-" + k).value, gap = t - s;
        sum += s;
        var row = $("pr-" + k);
        row.querySelector(".pr-fill").style.transform = "scaleX(" + (s - 10) / 80 + ")";
        row.querySelector(".pr-target").style.left = ((t - 10) / 80 * 100) + "%";
        row.querySelector(".pr-score").textContent = s;
        var st = row.querySelector(".pr-status");
        if (gap <= 0) { met++; st.textContent = "Target met"; st.className = "pr-status ok"; row.classList.remove("short"); }
        else { totalGap += gap; st.textContent = "+" + gap + " needed"; st.className = "pr-status need"; row.classList.add("short"); if (gap > worstGap) { worstGap = gap; worst = k; } }
      });
      countTo($("pr-met"), met, false);
      $("pr-summary").textContent = met === 4 ? "সব অংশে আপনার টার্গেট পূরণ হয়েছে।" : (4 - met) + " টা অংশে আরও স্কোর দরকার। সবচেয়ে বেশি দরকার " + worst.charAt(0).toUpperCase() + worst.slice(1) + " এ (+" + worstGap + ")।";
      $("pr-ring").style.setProperty("--p", met / 4);
      $("pr-avg").textContent = Math.round(sum / 4);
    }
    update();
  }
})();

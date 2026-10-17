/* =========================================================
   English Effect — credentials.js
   ---------------------------------------------------------
   1. CREDENTIALS: shob certificate EKHANE.
      Notun certificate add korte: image + -thumb.jpg
      assets/images/credentials/ e rakho, tarpor nicher array te
      ekta entry add koro. Instructor page ar home page nijei update hobe.
      - title: certificate e jemon lekha, hubohu (kono notun claim na)
      - date: certificate e na thakle ""
      - type: "certificate" ba "photo"
      - w/h: full image er size, tw/th: thumb er size (pixel)
   ========================================================= */
var CREDENTIALS = [
  {
    id: "idp-ielts-writing",
    issuer: "IDP",
    title: "IELTS Teacher Training Program — IELTS Writing: Understanding the Assessment Criteria",
    date: "23 June 2026",
    type: "certificate",
    image: "assets/images/credentials/idp-ielts-writing-certificate.jpg", w: 864, h: 865,
    thumb: "assets/images/credentials/idp-ielts-writing-certificate-thumb.jpg", tw: 599, th: 600,
    alt: "IDP IELTS Teacher Training certificate issued to Ali Jaker"
  },
  {
    id: "pearson-pte-teachers",
    issuer: "Pearson",
    title: "PTE Academic for Teachers: Introduction to PTE Academic & Scoring",
    date: "",
    type: "certificate",
    image: "assets/images/credentials/pearson-pte-teachers-certificate.jpg", w: 936, h: 841,
    thumb: "assets/images/credentials/pearson-pte-teachers-certificate-thumb.jpg", tw: 600, th: 539,
    alt: "Pearson PTE Academic for Teachers certificate issued to Ali Jaker"
  },
  {
    id: "bup-appreciation",
    issuer: "BUP",
    title: "Certificate of Appreciation — Department of English, Bangladesh University of Professionals",
    date: "",
    type: "photo",
    image: "assets/images/credentials/bup-appreciation.jpg", w: 920, h: 960,
    thumb: "assets/images/credentials/bup-appreciation-thumb.jpg", tw: 575, th: 600,
    alt: "Ali Jaker receiving a Certificate of Appreciation from Bangladesh University of Professionals"
  }
];

(function () {
  var esc = function (s) {
    return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; });
  };
  var view = function (c) { return c.type === "photo" ? "View photo" : "View certificate"; };

  /* ---------- 2. Cards (instructor page) ---------- */
  document.querySelectorAll('[data-credentials="full"]').forEach(function (box) {
    box.innerHTML = CREDENTIALS.map(function (c, i) {
      return '<article class="cred">' +
        '<a class="cred-img is-' + c.type + '" href="' + c.image + '" data-lb="' + i + '" tabindex="-1">' +
          '<img src="' + c.thumb + '" alt="' + esc(c.alt) + '" width="' + c.tw + '" height="' + c.th + '" loading="lazy"></a>' +
        '<div class="cred-body">' +
          '<span class="cred-issuer">' + esc(c.issuer) + '</span>' +
          '<h3>' + esc(c.title) + '</h3>' +
          (c.date ? '<p class="cred-date">Issued ' + esc(c.date) + '</p>' : '') +
          '<a class="cred-view" href="' + c.image + '" data-lb="' + i + '">' + view(c) +
            '<span class="sr-only">: ' + esc(c.alt) + '</span>' +
            ' <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg></a>' +
        '</div></article>';
    }).join("");
  });

  /* ---------- 3. Mini row (home page) ---------- */
  document.querySelectorAll('[data-credentials="mini"]').forEach(function (box) {
    // "See all credentials" link ta HTML ei thake; thumbnail gulo tar age boshe
    box.insertAdjacentHTML("afterbegin", CREDENTIALS.slice(0, 3).map(function (c) {
      return '<a class="cred-thumb" href="instructor.html#credentials" title="' + esc(c.issuer + ": " + c.title) + '">' +
        '<img src="' + c.thumb + '" alt="' + esc(c.alt) + '" width="' + c.tw + '" height="' + c.th + '" loading="lazy"></a>';
    }).join(""));
  });

  /* ---------- 4. Lightbox ----------
     <dialog> nijei Esc, focus ar top layer samlay.
     Arrow key / button diye ager-porer, background click e bondho. */
  var links = document.querySelectorAll("[data-lb]");
  if (!links.length || typeof HTMLDialogElement !== "function") return;

  var lb = document.createElement("dialog");
  lb.className = "lightbox";
  lb.setAttribute("aria-label", "Credential viewer");
  lb.innerHTML =
    '<figure class="lb-figure"><figcaption><b class="lb-issuer"></b><span class="lb-title"></span><small class="lb-count"></small></figcaption></figure>' +
    '<button type="button" class="lb-btn lb-close" aria-label="Close"><svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18"/></svg></button>' +
    '<button type="button" class="lb-btn lb-prev" aria-label="Previous"><svg viewBox="0 0 24 24"><path d="M15 6l-6 6 6 6"/></svg></button>' +
    '<button type="button" class="lb-btn lb-next" aria-label="Next"><svg viewBox="0 0 24 24"><path d="M9 6l6 6-6 6"/></svg></button>';
  document.body.appendChild(lb);

  var img = null, cur = 0, opener = null;
  function show(i) {
    cur = (i + CREDENTIALS.length) % CREDENTIALS.length;
    var c = CREDENTIALS[cur];
    if (!img) { img = document.createElement("img"); lb.querySelector(".lb-figure").prepend(img); }
    img.src = c.image; img.alt = c.alt; img.width = c.w; img.height = c.h;
    lb.querySelector(".lb-issuer").textContent = c.issuer;
    lb.querySelector(".lb-title").textContent = c.title + (c.date ? " · " + c.date : "");
    lb.querySelector(".lb-count").textContent = (cur + 1) + " / " + CREDENTIALS.length;
  }
  function close() { lb.close(); }

  links.forEach(function (a) {
    a.addEventListener("click", function (e) {
      e.preventDefault();
      opener = a.classList.contains("cred-img") ? a.parentNode.querySelector(".cred-view") : a;
      show(+a.dataset.lb);
      lb.showModal();
      document.documentElement.classList.add("lb-open");
    });
  });
  lb.addEventListener("close", function () {
    document.documentElement.classList.remove("lb-open");
    if (opener) opener.focus();
  });
  lb.querySelector(".lb-close").addEventListener("click", close);
  lb.querySelector(".lb-prev").addEventListener("click", function () { show(cur - 1); });
  lb.querySelector(".lb-next").addEventListener("click", function () { show(cur + 1); });
  lb.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") { e.preventDefault(); show(cur - 1); }
    if (e.key === "ArrowRight") { e.preventDefault(); show(cur + 1); }
  });
  // background (image/caption/button er baire) click korle bondho
  lb.addEventListener("click", function (e) {
    if (e.target === lb || e.target.classList.contains("lb-figure")) close();
  });
})();

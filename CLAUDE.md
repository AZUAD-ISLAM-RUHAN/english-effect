# English Effect website

Static website (plain HTML, CSS, JS, no framework, no build step) for English Effect,
an online English course business run by Ali Jaker Nirob (Pearson PTE Academic for Teachers,
IDP IELTS Teacher Training). Courses: PTE Academic, IELTS, Spoken English, Kids English.
Audience: Bangla speakers in Bangladesh and abroad. Domain: englisheffectbd.com. Hosting: Netlify.

## Structure
- One HTML file per page in the root: index, courses, pte, ielts, spoken, kids, free-class,
  instructor, games, typing, kids-game, mock-test, mock, module, enroll, faq, contact, thanks.
- `module.html`: ONE template for every PTE/IELTS package (`module.html?exam=pte&module=writing`).
  Its content comes from `assets/js/courses-data.js` through `assets/js/packages.js`.
- `assets/css/style.css`: all styles, shared by every page. Brand tokens are in `:root`.
- `assets/js/main.js`: shared header, footer, menu, animations, countdown.
  - The header and footer HTML live ONLY in main.js. Every page has
    `<div id="site-header"></div>` and `<div id="site-footer"></div>` placeholders.
  - The `SITE` object at the top of main.js holds every phone number and link
    (bKash, Nagad, bank account, WhatsApp, Facebook, YouTube, email). Change them there only.
  - Each page sets `<body data-page="...">` so the right menu item is highlighted.
- `assets/js/credentials.js`: the `CREDENTIALS` array (every certificate) plus the code that builds
  the cards on instructor.html (`data-credentials="full"`), the 3 thumbnails on index.html
  (`data-credentials="mini"`) and the lightbox. Load it BEFORE main.js.
- `assets/js/courses-data.js`: `PACKAGES`, the PTE and IELTS packages (One-to-One, Full Course,
  4 modules): name, Bangla description, practise list, duration, classes, fee.
  `assets/js/packages.js` builds the package cards on pte.html/ielts.html (`data-packages`),
  module.html (`data-package-page`), the enroll dropdown (`#f-course`) and "From ৳…"
  (`data-pkg-from`). Load order: courses-data.js, packages.js, main.js.
- `assets/js/typing.js`: typing speed test. `assets/js/kids-game.js`: kids spelling game.
- `assets/images/`: logo.png (for light backgrounds), logo-light.png (for dark), favicon.png,
  nirob.jpg (instructor photo). `assets/images/credentials/`: certificate images + `-thumb.jpg`.

## Brand
- Colors: green #3BA62F, lime #8DC63F, dark #0F2A33, yellow #FFD43B.
- Fonts: Montserrat (English), Hind Siliguri (Bangla). Bangla text gets `class="bn"`.
- Tagline: "Your English Can Take You Further".
- Free live class every Friday 9:00 PM Bangladesh time (UTC+6) in a WhatsApp group.

## Rules
- Never invent facts: no fake student counts, scores, reviews, prices or testimonials.
  Leave a `[placeholder]` and a `TODO` comment instead.
- Never show student names, photos or IDs.
- The client is Islamic: kids content uses no human or animal faces and no music.
- Keep animations purposeful and respect `prefers-reduced-motion`.
- Every page must work at phone width (about 390px) with no horizontal scroll.
- Credential titles: write them exactly as printed on the certificate. Do not call him
  "Certified Instructor"; the certificates are teacher-training completions.
- Images: always set width, height and a meaningful alt. `loading="lazy"` except the header
  logo and the photo at the top of instructor.html.
- Cards use the shared tokens in `:root` (`--card-pad`, `--card-lift`, `--card-shadow`, `--card-move`).
- New page: copy an existing page (e.g. faq.html), change `<title>`, `data-page`
  and the content, then add it to the menu/footer in main.js.
- Every page's `<head>` has a meta description, `theme-color` and the Open Graph / Twitter
  share tags. On a new page copy that whole block and change `og:title` (= the `<title>`),
  `og:description` (= the meta description, English, under 150 characters, no new claims)
  and `og:url` (`https://englisheffectbd.com/<file>.html`; index is just the domain).
  The share image is `assets/images/og-image.png` (1200x630) for every page.
- The floating WhatsApp button and back-to-top button are injected by main.js on every page
  (message text: `SITE.whatsappHello`). Do not add them by hand.

## Mock tests (demo)
- `mock-test.html`: landing page. Free sample cards, the 30-day pass, and "Past attempts"
  (results saved in this browser only).
- `mock.html`: the test runner. `mock.html#ielts-sample` / `#pte-sample` runs a test,
  `mock.html#result-<id>` shows the score and error log.
- `assets/js/mock-data.js`: the `MOCK_TESTS` object (all questions and answers).
- `assets/js/mock.js`: the engine (timer, answers, estimated score, error log, history in
  `localStorage` key `ee-mock-attempts`). Listening audio is read by the browser (speechSynthesis).
- `assets/css/mock.css`: mock test styles. Both mock pages load it after style.css.
- Scores are rough estimates, not official. Only write our OWN questions; never copy
  Pearson, IDP or Cambridge material.

### How to add a question (mock-data.js)
1. Find the test (e.g. `"ielts-sample"`) and the section (`reading`, `listening`, `writing`).
2. Add an object to that section's `questions` array with a unique `id`, a `type`, a `skill`
   label (used for the error log), `prompt`, `answer` and `explain` (why it is right):
   - `tfng`: `answer` is `"TRUE"`, `"FALSE"` or `"NOT GIVEN"`
   - `mcq` / `select`: `options` array, `answer` is the index of the right option (0 = first)
   - `gap`: `answer` is an array of accepted answers (case and extra spaces are ignored)
   - `dictation`: `answer` is the full sentence (no `prompt`)
3. For reading, the answer must be findable in `passage`; for IELTS listening, in `script`.
4. A whole new test: add a new key to `MOCK_TESTS` (same shape) and link to `mock.html#<key>`.

## How to change a package price
1. Open `assets/js/courses-data.js` and find the exam (`pte` or `ielts`) and the package
   (`module: "full"`, `"writing"` ...).
2. Change `fee` to the new number, without commas or ৳ (e.g. `fee: 9500`).
3. Nothing else. The package cards, module.html, the "From ৳…" text (side card and the
   courses.html table), the "৪টা মডিউল আলাদা নিলে …" line and the enroll dropdown all update.
   (The "From ৳3,000" written in the HTML is only a fallback for when JS is off; update it too
   if the cheapest price changes.)
- Duration and classes per week are in the same entry (`duration`, `classes`).
- Practise lists use `groups`; only use task names that are on pte.html / ielts.html.

## How to add a new certificate
1. Put the full image and a smaller copy named `<name>-thumb.jpg` (about 600px wide) in
   `assets/images/credentials/`.
2. Open `assets/js/credentials.js` and add one entry to `CREDENTIALS`: `id`, `issuer`,
   `title` (exactly as printed), `date` (`""` if the certificate has none), `type`
   (`"certificate"` or `"photo"`), `image`/`w`/`h`, `thumb`/`tw`/`th` (pixel sizes), `alt`.
3. Nothing else. The instructor page cards, the lightbox and the home row update by themselves
   (the home row shows the first 3 entries, so put the most important first).

## Still to fill in (search the project for "TODO")
Course prices and durations (Kids duration is done), WhatsApp group link,
two FAQ answers (verify time, exam registration).

## Run and deploy
- Local: open the folder in VS Code, right-click index.html, "Open with Live Server".
- The enrollment form uses Netlify Forms (`data-netlify="true"`). It only really submits
  on Netlify or the real domain; locally it just goes to thanks.html.
- Deploy: push to GitHub; Netlify auto-deploys from the main branch.

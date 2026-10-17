# English Effect website

Static website (plain HTML, CSS, JS, no framework, no build step) for English Effect,
an online English course business run by Ali Jaker Nirob (Pearson Certified PTE Instructor,
IDP Certified IELTS Instructor). Courses: PTE Academic, IELTS, Spoken English, Kids English.
Audience: Bangla speakers in Bangladesh and abroad. Domain: englisheffectbd.com. Hosting: Netlify.

## Structure
- One HTML file per page in the root: index, courses, pte, ielts, spoken, kids, free-class,
  instructor, games, typing, kids-game, enroll, faq, contact, thanks.
- `assets/css/style.css`: all styles, shared by every page. Brand tokens are in `:root`.
- `assets/js/main.js`: shared header, footer, menu, animations, countdown.
  - The header and footer HTML live ONLY in main.js. Every page has
    `<div id="site-header"></div>` and `<div id="site-footer"></div>` placeholders.
  - The `SITE` object at the top of main.js holds every phone number and link
    (bKash, Nagad, bank account, WhatsApp, Facebook, YouTube, email). Change them there only.
  - Each page sets `<body data-page="...">` so the right menu item is highlighted.
- `assets/js/typing.js`: typing speed test. `assets/js/kids-game.js`: kids spelling game.
- `assets/images/`: logo.png (for light backgrounds), logo-light.png (for dark), favicon.png.

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
- New page: copy an existing page (e.g. faq.html), change `<title>`, `data-page`
  and the content, then add it to the menu/footer in main.js.

## Still to fill in (search the project for "TODO")
Course prices and durations (Kids duration is done), WhatsApp group link,
two FAQ answers (verify time, exam registration).

## Run and deploy
- Local: open the folder in VS Code, right-click index.html, "Open with Live Server".
- The enrollment form uses Netlify Forms (`data-netlify="true"`). It only really submits
  on Netlify or the real domain; locally it just goes to thanks.html.
- Deploy: push to GitHub; Netlify auto-deploys from the main branch.

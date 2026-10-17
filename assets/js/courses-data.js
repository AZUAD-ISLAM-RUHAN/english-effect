/* =========================================================
   English Effect — PTE ar IELTS packages (DATA ONLY)
   ---------------------------------------------------------
   DAM BODLATE: nicher package er `fee` number bodlao (comma chara, jemon 9000).
   PTE/IELTS page er card, module.html, "From ৳…", "৪টা মডিউল…" line ar
   enroll dropdown shob nijei update hobe. Code (packages.js) e hat dite hobe na.

   - groups: ki ki practise hoy. Task er nam pte.html / ielts.html e jemon, hubohu.
     Notun task banaba na.
   - package.practise: kon group gula ei package e ache (groups er key).
   - package.module: URL e jay -> module.html?exam=pte&module=writing
     enroll hash hobe exam-module -> enroll.html#pte-writing
   - duration / classes: asol tottho pele ekhane boshao.
   ========================================================= */
var PACKAGES = {
  currency: "৳",
  exams: {

    pte: {
      name: "PTE Academic", short: "PTE", page: "pte.html",
      moduleNote: "PTE পরীক্ষায় Speaking আর Writing একসাথে একটা অংশে হয়।",
      groups: {
        speaking:  { title: "Speaking", desc: "মাইক্রোফোনে কথা বলার task।",
                     items: ["Read Aloud", "Repeat Sentence", "Describe Image", "Re-tell Lecture", "Answer Short Question"] },
        writing:   { title: "Writing", desc: "টাইপ করে লেখার task।",
                     items: ["Summarize Written Text", "Write Essay"] },
        reading:   { title: "Reading", desc: "স্ক্রিনে পড়া, শব্দ বসানো আর প্যারাগ্রাফ সাজানো।",
                     items: ["Fill in the Blanks", "Multiple Choice", "Re-order Paragraphs"] },
        listening: { title: "Listening", desc: "অডিও শুনে লেখা, বেছে নেওয়া আর ভুল শব্দ ধরা।",
                     items: ["Summarize Spoken Text", "Write from Dictation", "Highlight Incorrect Words", "Select Missing Word"] },
        mock:      { title: "Mock tests & feedback", desc: "পুরো পরীক্ষার মতো করে প্র্যাকটিস, তারপর কোথায় নম্বর কমছে সেটা ধরে ধরে ঠিক করা।",
                     items: [] }
      },
      packages: [
        { module: "one-to-one", name: "One-to-One", kind: "private",
          desc: "পুরো PTE কোর্স, প্রাইভেট ক্লাসে শুধু আপনার জন্য।",
          practise: ["speaking", "writing", "reading", "listening", "mock"],
          duration: "Ask on WhatsApp", classes: "Ask on WhatsApp", fee: 16000 },
        { module: "full", name: "Full Course", kind: "full",
          desc: "পুরো PTE কোর্স, গ্রুপ লাইভ ক্লাসে। প্রতিটা task এর নিয়ম, টেমপ্লেট আর সময় ভাগ করা শিখে আসল ফরম্যাটে প্র্যাকটিস।",
          practise: ["speaking", "writing", "reading", "listening", "mock"],
          duration: "Ask on WhatsApp", classes: "Ask on WhatsApp", fee: 9000 },
        { module: "speaking", name: "Speaking", kind: "module",
          desc: "মাইক্রোফোনে কথা বলার task।", practise: ["speaking"],
          duration: "Ask on WhatsApp", classes: "Ask on WhatsApp", fee: 3000 },
        { module: "writing", name: "Writing", kind: "module",
          desc: "টাইপ করে লেখার task।", practise: ["writing"],
          duration: "Ask on WhatsApp", classes: "Ask on WhatsApp", fee: 3000 },
        { module: "reading", name: "Reading", kind: "module",
          desc: "স্ক্রিনে পড়া, শব্দ বসানো আর প্যারাগ্রাফ সাজানো।", practise: ["reading"],
          duration: "Ask on WhatsApp", classes: "Ask on WhatsApp", fee: 3000 },
        { module: "listening", name: "Listening", kind: "module",
          desc: "অডিও শুনে লেখা, বেছে নেওয়া আর ভুল শব্দ ধরা।", practise: ["listening"],
          duration: "Ask on WhatsApp", classes: "Ask on WhatsApp", fee: 3000 }
      ]
    },

    ielts: {
      name: "IELTS", short: "IELTS", page: "ielts.html",
      moduleNote: "",
      groups: {
        listening: { title: "Listening", desc: "চার অংশে ৪০টি প্রশ্ন। কথোপকথন আর লেকচার শুনে উত্তর।",
                     items: ["Form completion", "Maps", "Multiple choice"] },
        reading:   { title: "Reading", desc: "তিনটি passage এ ৪০টি প্রশ্ন। Academic আর General Training এর লেখা আলাদা।",
                     items: ["True / False / Not Given", "Matching headings", "Summary completion"] },
        writing:   { title: "Writing", desc: "Task 1 এ Academic হলে graph বা chart, General হলে চিঠি। Task 2 তে essay।",
                     items: ["Task 1", "Task 2 essay", "Band descriptors"] },
        speaking:  { title: "Speaking", desc: "পরীক্ষকের সাথে মুখোমুখি তিন অংশের কথোপকথন।",
                     items: ["Part 1 intro", "Part 2 cue card", "Part 3 discussion"] }
      },
      packages: [
        { module: "one-to-one", name: "One-to-One", kind: "private",
          desc: "পুরো IELTS কোর্স, প্রাইভেট ক্লাসে শুধু আপনার জন্য।",
          practise: ["listening", "reading", "writing", "speaking"],
          duration: "Ask on WhatsApp", classes: "Ask on WhatsApp", fee: 16000 },
        { module: "full", name: "Full Course", kind: "full",
          desc: "পুরো IELTS কোর্স, গ্রুপ লাইভ ক্লাসে। চার মডিউলের কৌশল বাংলায় বুঝে প্র্যাকটিস।",
          practise: ["listening", "reading", "writing", "speaking"],
          duration: "Ask on WhatsApp", classes: "Ask on WhatsApp", fee: 9000 },
        { module: "listening", name: "Listening", kind: "module",
          desc: "চার অংশে ৪০টি প্রশ্ন। কথোপকথন আর লেকচার শুনে উত্তর।", practise: ["listening"],
          duration: "Ask on WhatsApp", classes: "Ask on WhatsApp", fee: 3000 },
        { module: "reading", name: "Reading", kind: "module",
          desc: "তিনটি passage এ ৪০টি প্রশ্ন। Academic আর General Training এর লেখা আলাদা।", practise: ["reading"],
          duration: "Ask on WhatsApp", classes: "Ask on WhatsApp", fee: 3000 },
        { module: "writing", name: "Writing", kind: "module",
          desc: "Task 1 এ Academic হলে graph বা chart, General হলে চিঠি। Task 2 তে essay।", practise: ["writing"],
          duration: "Ask on WhatsApp", classes: "Ask on WhatsApp", fee: 3000 },
        { module: "speaking", name: "Speaking", kind: "module",
          desc: "পরীক্ষকের সাথে মুখোমুখি তিন অংশের কথোপকথন।", practise: ["speaking"],
          duration: "Ask on WhatsApp", classes: "Ask on WhatsApp", fee: 3000 }
      ]
    }
  },

  // enroll dropdown e PTE/IELTS er pore ei option gula thake (hash -> option)
  otherCourses: [
    { id: "spoken", name: "Spoken English" },
    { id: "kids", name: "Kids English" },
    { id: "mock-ielts", name: "IELTS Mock Test Pass (30 days)" },
    { id: "mock-pte", name: "PTE Mock Test Pass (30 days)" }
  ]
};

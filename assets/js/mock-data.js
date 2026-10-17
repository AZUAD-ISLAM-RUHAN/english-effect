/* =========================================================
   English Effect — Mock test data (DEMO)
   ---------------------------------------------------------
   Ei file e shudhu SAMPLE prosno ache, English Effect er nijer lekha.
   Official Pearson / IDP / Cambridge er prosno copy korba na.
   Asol paid version e prosno ar answer key server (Supabase) e thakbe,
   browser e na.

   Question types:
   - tfng      : TRUE / FALSE / NOT GIVEN
   - mcq       : ekta option thik
   - gap       : lekha uttor (answer = array of accepted answers)
   - select    : dropdown blank (PTE Reading fill in the blanks)
   - dictation : audio shune puro sentence likhte hobe (PTE Write from Dictation)
   ========================================================= */
var MOCK_TESTS = {

  /* ======================= IELTS SAMPLE ======================= */
  "ielts-sample": {
    exam: "ielts",
    title: "IELTS Academic · Sample Test",
    note: "Short sample: 1 reading passage, 1 listening part, 1 writing task.",
    minutes: 40,
    sections: [
      {
        id: "reading", title: "Reading", kind: "reading",
        intro: "Read the passage and answer questions 1–8.",
        passageTitle: "Gardens Above the City",
        passage: [
          "In many crowded cities, flat rooftops are among the largest unused spaces. Over the past few decades, architects and residents have started to turn some of these roofs into gardens. The idea is not new: people have grown plants on buildings for centuries. What has changed is the reason. Today, rooftop gardens are often planned as part of a wider effort to make cities cooler and healthier.",
          "A roof covered in soil and plants behaves very differently from a bare concrete one. Concrete absorbs heat during the day and releases it slowly at night, which keeps the surrounding air warm. Plants, by contrast, release water vapour through their leaves, and this process cools the air around them. The soil layer also acts as insulation, so the rooms directly below the roof may need less cooling in summer.",
          "Rooftop gardens also help with rainwater. On a normal roof, rain runs straight into drains, and during heavy storms the drains can overflow. A green roof holds part of the water in its soil and releases the rest more slowly. Supporters argue that, if enough buildings took part, this could reduce flooding in low-lying streets.",
          "However, the gardens are not simple to build. Wet soil is heavy, so engineers must first check that a building can carry the extra weight. A waterproof layer is needed to protect the structure, and someone has to look after the plants. For these reasons, the cost of a green roof is usually higher at the start, even if it saves money on cooling later.",
          "Some of the most successful projects are run by the people who live in the building. Residents grow vegetables, share the harvest and use the space to meet their neighbours. In these cases, the social benefits can be just as important as the environmental ones."
        ],
        questions: [
          { id: "r1", type: "tfng", skill: "True / False / Not Given",
            prompt: "Growing plants on buildings is a recent invention.",
            answer: "FALSE",
            explain: "Paragraph 1: \"people have grown plants on buildings for centuries\". So the idea is old, not recent." },
          { id: "r2", type: "tfng", skill: "True / False / Not Given",
            prompt: "Concrete roofs help to keep the air warm at night.",
            answer: "TRUE",
            explain: "Paragraph 2: concrete \"releases it slowly at night, which keeps the surrounding air warm\"." },
          { id: "r3", type: "tfng", skill: "True / False / Not Given",
            prompt: "Most new buildings in large cities are now required to have a green roof.",
            answer: "NOT GIVEN",
            explain: "The passage never mentions any rule or requirement for new buildings." },
          { id: "r4", type: "mcq", skill: "Multiple choice",
            prompt: "According to the passage, plants cool the air because they",
            options: ["block sunlight from reaching the roof", "release water vapour through their leaves", "absorb heat and store it in the soil", "reduce the amount of rain on the roof"],
            answer: 1,
            explain: "Paragraph 2: \"Plants ... release water vapour through their leaves, and this process cools the air\"." },
          { id: "r5", type: "mcq", skill: "Multiple choice",
            prompt: "Why do engineers need to check a building before adding a green roof?",
            options: ["Wet soil adds a lot of weight.", "Plants damage the waterproof layer.", "Residents may not agree to the project.", "The roof must be completely flat."],
            answer: 0,
            explain: "Paragraph 4: \"Wet soil is heavy, so engineers must first check that a building can carry the extra weight.\"" },
          { id: "r6", type: "gap", skill: "Sentence completion",
            prompt: "The soil layer works as ________, keeping rooms below cooler. (ONE WORD)",
            answer: ["insulation"],
            explain: "Paragraph 2: \"The soil layer also acts as insulation\"." },
          { id: "r7", type: "gap", skill: "Sentence completion",
            prompt: "During heavy storms, normal roof drains may ________. (ONE WORD)",
            answer: ["overflow"],
            explain: "Paragraph 3: \"during heavy storms the drains can overflow\"." },
          { id: "r8", type: "gap", skill: "Sentence completion",
            prompt: "In resident-run projects, people grow and share ________. (ONE WORD)",
            answer: ["vegetables"],
            explain: "Paragraph 5: \"Residents grow vegetables, share the harvest\". IELTS e banan bhul hole number kate." }
        ]
      },
      {
        id: "listening", title: "Listening", kind: "listening",
        intro: "You will hear a phone call about a course. Complete the form. Write ONE WORD AND/OR A NUMBER for each answer. You can play the recording only once.",
        script: [
          ["Woman", "Good afternoon, City Language Centre. How can I help?"],
          ["Man", "Hi. I'd like to join the evening speaking class."],
          ["Woman", "Of course. Can I have your family name, please?"],
          ["Man", "Yes, it's Rahman. R, A, H, M, A, N."],
          ["Woman", "Thank you. The evening class meets every Tuesday."],
          ["Man", "What time does it start?"],
          ["Woman", "It starts at seven thirty and finishes at nine."],
          ["Man", "And how much is the course?"],
          ["Woman", "It's forty-five pounds for the whole month."],
          ["Man", "Great. Do I need to bring anything?"],
          ["Woman", "Just a notebook. We provide all the other materials."]
        ],
        questions: [
          { id: "l1", type: "gap", skill: "Form completion", prompt: "Family name: ________", answer: ["rahman"], explain: "The man spells it: R-A-H-M-A-N. Banan thik na hole IELTS e number pawa jay na." },
          { id: "l2", type: "gap", skill: "Form completion", prompt: "Day of class: ________", answer: ["tuesday", "tuesdays"], explain: "\"The evening class meets every Tuesday.\"" },
          { id: "l3", type: "gap", skill: "Form completion", prompt: "Start time: ________ pm", answer: ["7.30", "7:30", "seven thirty", "730"], explain: "\"It starts at seven thirty\". 9 holo shesh howar shomoy, shuru na. Eta ekta common trap." },
          { id: "l4", type: "gap", skill: "Form completion", prompt: "Cost for one month: £________", answer: ["45", "forty-five", "forty five"], explain: "\"It's forty-five pounds for the whole month.\"" },
          { id: "l5", type: "gap", skill: "Form completion", prompt: "Bring a ________", answer: ["notebook", "note book"], explain: "\"Just a notebook. We provide all the other materials.\"" }
        ]
      },
      {
        id: "writing", title: "Writing", kind: "writing",
        intro: "Writing Task 2. Spend about 40 minutes. Write at least 250 words.",
        task: "Some people believe that cities should use rooftops for gardens, while others think the space is better used for solar panels. Discuss both views and give your own opinion.",
        minWords: 250
      }
    ]
  },

  /* ======================= PTE SAMPLE ======================= */
  "pte-sample": {
    exam: "pte",
    title: "PTE Academic · Sample Test",
    note: "Short sample: reading multiple choice, reading fill in the blanks, listening write from dictation.",
    minutes: 15,
    sections: [
      {
        id: "reading", title: "Reading", kind: "reading",
        intro: "Read the text and answer the questions.",
        passageTitle: "Learning a second language",
        passage: [
          "Many adults believe they are too old to learn a new language well. Research on language learning suggests a more balanced picture. Children often develop a more native-like accent, but adults can learn grammar and vocabulary quickly because they are able to study in an organised way and connect new words to what they already know.",
          "What matters most for adults is regular practice. Short daily sessions tend to work better than long sessions once a week, because the brain has more chances to recall and reuse what it has learned."
        ],
        questions: [
          { id: "p1", type: "mcq", skill: "Multiple choice (single)",
            prompt: "What is the main point of the text?",
            options: ["Adults cannot learn languages as well as children.", "Adults have different strengths when learning a language.", "Accent is the most important part of a language.", "Weekly study is the best way to learn grammar."],
            answer: 1,
            explain: "The text says children often have a better accent, but adults learn grammar and vocabulary quickly. So adults have different strengths." },
          { id: "p2", type: "mcq", skill: "Multiple choice (single)",
            prompt: "According to the text, why are short daily sessions effective?",
            options: ["They are easier to fit into a busy day.", "They reduce the stress of learning.", "They give more chances to recall and reuse learning.", "They focus mainly on accent."],
            answer: 2,
            explain: "\"the brain has more chances to recall and reuse what it has learned\"." },
          { id: "p3", type: "select", skill: "Reading fill in the blanks",
            prompt: "Good learners do not wait for perfect conditions. They ___ a little every day,",
            options: ["practise", "practising", "to practise", "practised"], answer: 0,
            explain: "Habit bojhate present simple lage: \"They practise a little every day\". \"every day\" holo clue." },
          { id: "p4", type: "select", skill: "Reading fill in the blanks",
            prompt: "... and they are not ___ of making mistakes.",
            options: ["afraid", "fear", "scary", "frighten"], answer: 0,
            explain: "Collocation: \"afraid of\". \"be ___ of\" er moddhe adjective lage, tai \"afraid\"." },
          { id: "p5", type: "select", skill: "Reading fill in the blanks",
            prompt: "Over time, these small steps ___ to real progress.",
            options: ["add up", "turn up", "make up", "give up"], answer: 0,
            explain: "\"add up to\" mane shob mile kono boro kichu howa. Choto choto step mile progress hoy." }
        ]
      },
      {
        id: "listening", title: "Listening", kind: "listening", dictation: true,
        intro: "Write from Dictation. Listen to each sentence and type it exactly. You can play each sentence once.",
        questions: [
          { id: "d1", type: "dictation", skill: "Write from dictation", answer: "Students must submit their assignments before the end of the week.", explain: "Protiti thik word e number pawa jay. Choto shobdo (their, the, of) miss korle o number kate." },
          { id: "d2", type: "dictation", skill: "Write from dictation", answer: "The library will be closed during the public holiday.", explain: "\"during\" ar \"public\" er banan kheyal korun." },
          { id: "d3", type: "dictation", skill: "Write from dictation", answer: "Regular practice is the key to improving your speaking skills.", explain: "\"practice\" ekhane noun, tai -ce diye banan." }
        ]
      }
    ]
  }
};

// ============================================================
// FRACTION ISLAND — CAPTAIN BLACKBEARD'S MYSTERY QUESTION BANK
//
// The Story:
// Captain Blackbeard hid the legendary Fraction Treasure on a
// mysterious island. He split his map into fraction-coded
// clues to keep it safe. You, a young explorer, must solve
// each fraction challenge to follow the trail, restore the
// bridge, and defeat the volcano guardian to claim the treasure!
//
// LEVEL 1 — Beach Landing (Identify Fractions from visuals)
// LEVEL 2 — Jungle Bridge  (Equivalent Fractions)
// LEVEL 3 — Volcano Battle  (Comparing Fractions)
// ============================================================

// ---- Utility: Fisher–Yates shuffle ----
export function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * Pick `count` random items from an array (no repeats).
 */
export function pickRandom(pool, count) {
  return shuffleArray(pool).slice(0, count);
}

// ============================================================
// LEVEL 1 — BEACH LANDING
//
// Story Context: Captain Blackbeard's ship crashed on Half Hill
// Beach. His treasure map washed ashore torn into pieces, each
// piece coded with a fraction. You must decode each fragment
// to reassemble the map!
// ============================================================
export const level1Questions = [
  // ---------- halves ----------
  {
    question: 'नक्शे टुकड़ा २ समान भागों में फटा हुआ है। छिपे हुए स्थान ते चिह्नित करेबा ब्लैकबियर्ड HALF (आधे) ते घेरेबा। कौन सा चित्र ½ रंगीन दिखाएबा?',
    hint: 'आधे का अर्थ है २ समान भागों में ते १ — केवल मिया (one) तरफ चिह्नित किया जाना चाहिए!',
    options: [
      { id: 'a', visual: 'pie-1-2', label: '½ पाई', correct: true },
      { id: 'b', visual: 'pie-1-4', label: '¼ पाई', correct: false },
      { id: 'c', visual: 'pie-3-4', label: '¾ पाई', correct: false },
    ],
  },
  {
    question: "ब्लैकबियर्ड लॉगबुक में २ भागों में विभाजित मिया पट्टी दिखाई देबा। उसने समुद्र तट रास्ते आधा भाग रंगेबा। कौन सी पट्टी ½ छायांकित दिखाएबा?",
    hint: 'रंगीन भाग और कुल भाग गिनेबा!',
    options: [
      { id: 'a', visual: 'bar-1-2', label: '½ पट्टी', correct: true },
      { id: 'b', visual: 'bar-3-4', label: '¾ पट्टी', correct: false },
      { id: 'c', visual: 'bar-1-4', label: '¼ पट्टी', correct: false },
    ],
  },
  {
    question: "मिया बूढ़े नाविक ते २ में विभाजित मिया नक्शा चक्र नेल (find)। वह कहेबा कि ब्लैकबियर्ड ने यह दिखाएबा ठीक आधा रंग दिया कि लंगर कहाँ गिराया गया था। कौन सा वृत्त ठीक ½ नीला दिखाएबा?",
    hint: 'आधा = आकार ते २ समान टुकड़ों में विभाजित किया गया है जिसमें १ भरा हुआ है।',
    options: [
      { id: 'a', visual: 'pie-3-4', label: '¾ वृत्त', correct: false },
      { id: 'b', visual: 'pie-1-2', label: '½ वृत्त', correct: true },
      { id: 'c', visual: 'pie-1-4', label: '¼ वृत्त', correct: false },
    ],
  },
  {
    question: "रसोइए जहाज आखिरी बिस्किट ते २ समान टुकड़ों में बांटेबा। ब्लैकबियर्ड १ टुकड़ा जोम (eat)। ब्लैकबियर्ड बिस्किट कितना भाग जोम (eat)?",
    hint: 'खाया गया टुकड़ा ÷ कुल टुकड़े = भाग (fraction)।',
    options: [
      { id: 'a', visual: 'pie-1-4', label: '¼', correct: false },
      { id: 'b', visual: 'pie-1-2', label: '½', correct: true },
      { id: 'c', visual: 'bar-3-4', label: '¾', correct: false },
    ],
  },
  // ---------- quarters ----------
  {
    question: "मिया नक्शा स्क्रॉल ४ समान वर्गों में विभाजित है। केवल मिया अनुभाग X चिह्न दिखाएबा। कौन सी पट्टी ¼ छायांकित दिखाएबा — X स्थान?",
    hint: 'मिया चौथाई का मतलब ४ समान भागों में ते १ है।',
    options: [
      { id: 'a', visual: 'bar-1-4', label: '¼ पट्टी', correct: true },
      { id: 'b', visual: 'bar-1-2', label: '½ पट्टी', correct: false },
      { id: 'c', visual: 'bar-3-4', label: '¾ पट्टी', correct: false },
    ],
  },
  {
    question: "ब्लैकबियर्ड मिया कंपास गुलाब ते ४ समान तिमाहियों में विभाजित करेबा और मिया ते खजाने दिशा के रूप में चिह्नित करेबा। कौन सा पाई चार्ट ¼ रंगीन दिखाएबा?",
    hint: 'चौथाई = ४ में ते १ टुकड़ा — केवल मिया छोटा सा टुकड़ा!',
    options: [
      { id: 'a', visual: 'pie-1-2', label: '½ पाई', correct: false },
      { id: 'b', visual: 'pie-1-4', label: '¼ पाई', correct: true },
      { id: 'c', visual: 'pie-3-4', label: '¾ पाई', correct: false },
    ],
  },
  {
    question: "चालक दल ते ब्लैकबियर्ड पुराने जखीरे ते ४ सोना डबलोन नेल (find)। उन्होंने बंदरगाह टोल चुकाने के लिए १ इस्तेमाल करेबा। कोयड़ी (coins) कितना भाग इस्तेमाल किया गया?",
    hint: 'इस्तेमाल किए गए कोयड़ी (coins) ÷ कुल कोयड़ी = भाग (fraction)।',
    options: [
      { id: 'a', visual: 'pie-1-4', label: '¼', correct: true },
      { id: 'b', visual: 'pie-1-2', label: '½', correct: false },
      { id: 'c', visual: 'pie-3-4', label: '¾', correct: false },
    ],
  },
  // ---------- three-quarters ----------
  {
    question: "खजाने नक्शा ४ क्षेत्रों में विभाजित है। उनमें ते अफई (three) ते खतरनाक के रूप में चिह्नित किया गया है। कौन सी पट्टी ¾ छायांकित दिखाएबा — खतरा क्षेत्र?",
    hint: 'तीन-चौथाई = ४ में ते ३ भाग भरे हुए हैं।',
    options: [
      { id: 'a', visual: 'bar-1-2', label: '½ पट्टी', correct: false },
      { id: 'b', visual: 'bar-1-4', label: '¼ पट्टी', correct: false },
      { id: 'c', visual: 'bar-3-4', label: '¾ पट्टी', correct: true },
    ],
  },
  {
    question: "मिया समुद्री डाकू झंडा ४ समान टुकड़ों में फटा हुआ था। अफई (three) टुकड़ों में खोपड़ी प्रतीक है। किस वृत्त में ¾ भरा हुआ है — झंडे खोपड़ी क्षेत्र दिखाएबा?",
    hint: '४ में ते ३ भाग रंगीन होने चाहिए।',
    options: [
      { id: 'a', visual: 'pie-3-4', label: '¾ वृत्त', correct: true },
      { id: 'b', visual: 'pie-1-2', label: '½ वृत्त', correct: false },
      { id: 'c', visual: 'pie-1-4', label: '¼ वृत्त', correct: false },
    ],
  },
  {
    question: "ब्लैकबियर्ड खजाने संदूक में ४ समान डिब्बे हैं। ३ डिब्बे सोने ते भरे हुए हैं। संदूक कितना भाग भरा हुआ है?",
    hint: 'भरे हुए डिब्बे ÷ कुल डिब्बे।',
    options: [
      { id: 'a', visual: 'bar-1-2', label: '½', correct: false },
      { id: 'b', visual: 'bar-3-4', label: '¾', correct: true },
      { id: 'c', visual: 'bar-1-4', label: '¼', correct: false },
    ],
  },
  // ---------- thirds ----------
  {
    question: "मिया गुप्त संदेश ३ समान भागों में विभाजित स्क्रॉल पर लिखा गया है। केवल मिया भाग में अगले सुराग कोड है। कौन सा आकार ⅓ छायांकित दिखाएबा?",
    hint: 'मिया-तिहाई का मतलब ३ समान भागों में ते १ है।',
    options: [
      { id: 'a', visual: 'bar-1-3', label: '⅓ पट्टी', correct: true },
      { id: 'b', visual: 'bar-1-2', label: '½ पट्टी', correct: false },
      { id: 'c', visual: 'bar-1-4', label: '¼ पट्टी', correct: false },
    ],
  },
  {
    question: "समुद्री डाकू झंडे में ३ समान धारियां हैं। केवल १ धारी लाल है — ब्लैकबियर्ड गुप्त संकेत। झंडे कितना भाग लाल है?",
    hint: 'लाल धारी ÷ सभी धारियां = ?',
    options: [
      { id: 'a', visual: 'bar-1-3', label: '⅓', correct: true },
      { id: 'b', visual: 'pie-1-2', label: '½', correct: false },
      { id: 'c', visual: 'pie-1-4', label: '¼', correct: false },
    ],
  },
  {
    question: "ब्लैकबियर्ड छिपी हुई गुफा ते ३ सुरंगों में विभाजित किया गया था। बारी (two) सुरंगें खजाने कक्ष की ओर ले जाएबा। कौन सी पट्टी ⅔ छायांकित दिखाएबा — सुरक्षित सुरंगें?",
    hint: '३ में ते २ भाग भरे होने चाहिए।',
    options: [
      { id: 'a', visual: 'bar-2-3', label: '⅔ पट्टी', correct: true },
      { id: 'b', visual: 'bar-3-4', label: '¾ पट्टी', correct: false },
      { id: 'c', visual: 'bar-1-2', label: '½ पट्टी', correct: false },
    ],
  },
  // ---------- whole and empty ----------
  {
    question: "प्राचीन कोयड़ी (coin) सभी ३ खंडों में खजाने निशान हैं। ब्लैकबियर्ड हर हिस्से ते रंगेबा! कितना भाग रंगीन है?",
    hint: 'यदि सभी भाग रंगीन हैं, तो यह पूरा (WHOLE) है — ३ में ते सभी ३!',
    options: [
      { id: 'a', visual: 'pie-whole', label: '3/3 = 1 पूरा', correct: true },
      { id: 'b', visual: 'pie-3-4', label: '¾', correct: false },
      { id: 'c', visual: 'pie-1-2', label: '½', correct: false },
    ],
  },
  {
    question: "टापू में ४ समुद्री मार्ग हैं। ब्लैकबियर्ड किसी ते भी सुरक्षित रूप में चिह्नित नहीं करेबा — वे सभी समुद्री राक्षस द्वारा अवरुद्ध हैं! कौन सा चित्र 0/4 (कुछ नहीं) रंगीन दिखाएबा?",
    hint: 'शून्य भाग रंगीन होने का मतलब है कि सब कुछ खाली है!',
    options: [
      { id: 'a', visual: 'bar-0-4', label: '0/4 पट्टी', correct: true },
      { id: 'b', visual: 'bar-1-4', label: '¼ पट्टी', correct: false },
      { id: 'c', visual: 'bar-3-4', label: '¾ पट्टी', correct: false },
    ],
  },
  {
    question: "ब्लैकबियर्ड चॉकलेट मैप ४ टुकड़ों में टूट गया है। वह मिया सुराग के रूप में आमते (you) २ टुकड़े देबा। आमते कितना भाग नेल (find)?",
    hint: 'प्राप्त टुकड़े ÷ कुल टुकड़े।',
    options: [
      { id: 'a', visual: 'bar-1-4', label: '¼', correct: false },
      { id: 'b', visual: 'bar-1-2', label: '½', correct: true },
      { id: 'c', visual: 'bar-3-4', label: '¾', correct: false },
    ],
  },
  {
    question: "जहाज तोप पाउडर ४ समान खंडों ते भरी हुई थी। २ खंड जले हुए हैं। कौन सा चित्र ²⁄₄ छायांकित दिखाएबा — जला हुआ पाउडर?",
    hint: '²⁄₄ ½ के समान है! चार में ते दो।',
    options: [
      { id: 'a', visual: 'bar-2-4', label: '2/4 पट्टी', correct: true },
      { id: 'b', visual: 'bar-1-4', label: '1/4 पट्टी', correct: false },
      { id: 'c', visual: 'bar-3-4', label: '3/4 पट्टी', correct: false },
    ],
  },
  {
    question: "ब्लैकबियर्ड सुनहरे लॉकेट दोनों हिस्सों में खजाने नक्शे मिया टुकड़ा है। सैंडविच आकार लॉकेट में २ भाग हैं — दोनों में सुराग हैं! कितने भाग में सुराग हैं?",
    hint: 'दोनों भाग = २ में ते २ = पूरी बात।',
    options: [
      { id: 'a', visual: 'pie-whole', label: '2/2 = पूरा', correct: true },
      { id: 'b', visual: 'pie-1-2', label: '½', correct: false },
      { id: 'c', visual: 'pie-1-4', label: '¼', correct: false },
    ],
  },
  {
    question: "आमते ब्लैकबियर्ड फटे हुए नक्शे सभी ३ टुकड़े नेल (find) — हर मिया! कौन सा आकार दिखाएबा कि पूरा (³⁄₃) नेल (find)?",
    hint: '३ में ते ३ = सब कुछ — पूरी तस्वीर!',
    options: [
      { id: 'a', visual: 'bar-1-3', label: '⅓', correct: false },
      { id: 'b', visual: 'pie-whole', label: '3/3', correct: true },
      { id: 'c', visual: 'bar-2-3', label: '⅔', correct: false },
    ],
  },
  {
    question: "ब्लैकबियर्ड मिया नारियल के अंदर ४ माणिक छुपाएबा। आमते उनमें ते ३ नेल (find) — वे खजाने नक्शे पर चमकेबा! आमते माणिक कितना भाग नेल (find)?",
    hint: 'मिले हुए माणिक ÷ कुल माणिक।',
    options: [
      { id: 'a', visual: 'pie-3-4', label: '¾', correct: true },
      { id: 'b', visual: 'pie-1-4', label: '¼', correct: false },
      { id: 'c', visual: 'pie-1-2', label: '½', correct: false },
    ],
  },
];

// ============================================================
// LEVEL 2 — JUNGLE BRIDGE BUILDER
//
// Story Context: The map leads deep into the jungle, but
// Captain Blackbeard's ancient rope bridge has rotted away!
// To cross the roaring river, you must find the MATCHING
// stone slabs — fraction stones that are equivalent — to
// rebuild the bridge and press on toward the volcano.
// ============================================================
export const level2Questions = [
  {
    target: '1/2',
    instruction: "पहला पुल गोटा (stone) इस भाग (fraction) ते उकेरा गया है — इसे जगह पर लॉक करेबा मिया समान (EQUIVALENT) गोटा खोजेबा:",
    options: ['2/4', '1/3', '3/8', '4/8'],
    correctAnswers: ['2/4', '4/8'],
  },
  {
    target: '1/3',
    instruction: "मिया चमकता हुआ जंगल गोटा (stone) यह भाग दिखाएबा। पुल बनाएबा दाʔ (river) ते मेल खाने वाला गोटा चुनेबा:",
    options: ['2/6', '3/4', '3/9', '4/10'],
    correctAnswers: ['2/6', '3/9'],
  },
  {
    target: '2/4',
    instruction: "चट्टान पर ब्लैकबियर्ड नक्काशी इस भाग ते पढ़ेबा। ढेर में ते कौन सा गोटा इसके बराबर है?",
    options: ['1/2', '3/4', '2/8', '4/8'],
    correctAnswers: ['1/2', '4/8'],
  },
  {
    target: '3/6',
    instruction: "ब्लैकबियर्ड मिया प्राचीन शिलालेख कहेबा: 'केवल समान गोटा ही पार करेबा।' इस अंतर ते पार करेबा समान भाग खोजेबा:",
    options: ['1/2', '2/3', '6/12', '3/4'],
    correctAnswers: ['1/2', '6/12'],
  },
  {
    target: '2/3',
    instruction: "इस तख्ते रखवाली करेबा जंगल आत्मा मिया समान गोटा मांग करेबा। कौन सा भाग रास्ता खोलेबा?",
    options: ['4/6', '3/4', '6/9', '2/5'],
    correctAnswers: ['4/6', '6/9'],
  },
  {
    target: '3/4',
    instruction: "मिया नक्काशीदार बंदर मूर्ति पास इस भाग ते चिह्नित मिया गोटा है। मूर्ति ते खुश करेबा और तख्ता प्राप्त करेबा मिया समान भाग (fraction) देबा:",
    options: ['6/8', '4/5', '9/12', '3/5'],
    correctAnswers: ['6/8', '9/12'],
  },
  {
    target: '1/4',
    instruction: "पुल अगले हिस्से ते बेलों ने रोक दिया है! ब्लैकबियर्ड सुराग: 'गलत गोटा ते काट दो — केवल समान भाग ही गुजरेबा।' कौन सा समान है?",
    options: ['2/8', '1/3', '3/12', '2/6'],
    correctAnswers: ['2/8', '3/12'],
  },
  {
    target: '2/5',
    instruction: "दाʔ (river) मगरमच्छ आमते तभी पार करेबा जब आम सही मेल खाने वाला गोटा रखेबा। समान भाग खोजेबा:",
    options: ['4/10', '3/5', '6/15', '2/3'],
    correctAnswers: ['4/10', '6/15'],
  },
  {
    target: '4/8',
    instruction: "झरने में ब्लैकबियर्ड नोट के साथ मिया गुप्त स्थान छिपा है: 'समान भाग गोटा दरवाजे ते खोलेबा।' कौन सा भाग 4/8 के बराबर है?",
    options: ['1/2', '2/4', '3/6', '3/4'],
    correctAnswers: ['1/2', '2/4', '3/6'],
  },
  {
    target: '5/10',
    instruction: "जंगल गहराई में, मिया बंद संदूक पर यह भाग उकेरा गया है। गोटा पटिया पर मिया समान भाग इसे खोलेबा! यह कौन सा है?",
    options: ['1/2', '2/5', '3/6', '10/20'],
    correctAnswers: ['1/2', '3/6', '10/20'],
  },
  {
    target: '2/6',
    instruction: "मिया बात करेबा तोता (ब्लैकबियर्ड पुराना पालतू!) चिल्लाएबा: 'समान गोटा! समान गोटा!' वह गोटा चुनेबा जो इस भाग के बराबर हो:",
    options: ['1/3', '2/4', '3/9', '1/2'],
    correctAnswers: ['1/3', '3/9'],
  },
  {
    target: '6/8',
    instruction: "पुल अंतिम तख्ता गायब है! मिया गोटा बेड़ा दिखाई देबा, लेकिन पार ले जाने के लिए केवल समान भाग गोटा ही हल्का है। यह कौन सा है?",
    options: ['3/4', '2/3', '9/12', '6/10'],
    correctAnswers: ['3/4', '9/12'],
  },
  {
    target: '4/6',
    instruction: "ब्लैकबियर्ड ने पेड़ तने पर मिया पहेली उकेरेबा: 'इंज (I) 4/6 हूँ — इंज जुड़वां ते खोजेबा और इंज आगे रास्ता दिखाएबा!'",
    options: ['2/3', '4/8', '6/9', '3/4'],
    correctAnswers: ['2/3', '6/9'],
  },
  {
    target: '3/9',
    instruction: "दाʔ (river) में मिया रहस्यमयी चमकते गोटा पर 3/9 लिखा है। पुल हिस्से ते पूरा करेबा कौन सा समान भाग गोटा मेल खाएबा?",
    options: ['1/3', '2/6', '3/4', '1/2'],
    correctAnswers: ['1/3', '2/6'],
  },
  {
    target: '2/8',
    instruction: "दाʔ (river) तेजी ते बढ़ रही है! ब्लैकबियर्ड भूत दिखाई देबा: 'इस भाग ते मिलान करेबा, युवा खोजकर्ता, या बह जाएं!' इसके समान खोजेबा:",
    options: ['1/4', '2/6', '3/12', '1/2'],
    correctAnswers: ['1/4', '3/12'],
  },
  {
    target: '6/12',
    instruction: "पुल अंतिम अंतर सबसे चौड़ा है। किनारे पर 6/12 वाला मिया विशाल गोटा है। कौन सा समान भाग गायब आधारशिला है?",
    options: ['1/2', '2/4', '3/4', '3/6'],
    correctAnswers: ['1/2', '2/4', '3/6'],
  },
  {
    target: '4/12',
    instruction: "ब्लैकबियर्ड खजाने संदूक में मिया संयोजन ताला है: केवल मिया समान भाग ही इसे खोलेबा। कौन सा भाग 4/12 के बराबर है?",
    options: ['1/3', '2/6', '4/8', '3/9'],
    correctAnswers: ['1/3', '2/6', '3/9'],
  },
  {
    target: '10/20',
    instruction: "मिया प्राचीन समुद्री डाकू स्क्रॉल ते पता चलेबा: 'पुल गोटा 10/20 जंगल में कई जुड़वाँ बच्चे छिपे हुए हैं।' आगे बढ़ेबा मिया समान भाग खोजेबा:",
    options: ['1/2', '5/10', '2/4', '3/4'],
    correctAnswers: ['1/2', '5/10', '2/4'],
  },
  {
    target: '9/12',
    instruction: "आम 9/12 अंकित पुल आधारशिला रक्षा करेबा मिया जंगल सांप ते नेल (see)। सांप ते मिया समान भाग देबा और यह मिया तरफ हट जाएबा!",
    options: ['3/4', '6/8', '2/3', '1/2'],
    correctAnswers: ['3/4', '6/8'],
  },
  {
    target: '8/12',
    instruction: "ब्लैकबियर्ड अंतिम पुल सुराग मिया गोटा पर उकेरा गया है: '8/12 ज्वालामुखी पथ प्रवेश द्वार रक्षा करेबा।' इसे मिया समान भाग के साथ हल करेबा!",
    options: ['2/3', '4/6', '3/4', '6/8'],
    correctAnswers: ['2/3', '4/6'],
  },
];

// ============================================================
// LEVEL 3 — VOLCANO BATTLE
//
// Story Context: You reach the volcano where Blackbeard hid
// the treasure. But the volcano is guarded by MAGMUS — the
// fearsome Fraction Monster that Blackbeard summoned using
// dark fraction magic! To defeat Magmus, you must choose the
// GREATER fraction as your weapon. The bigger the fraction,
// the more damage your spell deals. One wrong answer and
// Magmus dodges! Defeat him to claim the treasure!
// ============================================================
export const level3Questions = [
  { f1: '1/2', f2: '1/4', correct: '>', hint: 'आमा (your) ½ जादू मैग्मस ¼ ढाल ते बड़ा है। हमला करेबा!' },
  { f1: '2/3', f2: '3/4', correct: '<', hint: 'मैग्मस ¾ आमा ⅔ ते बड़ा है। छोटे हमले प्रतीक उपयोग करेबा!' },
  { f1: '4/8', f2: '1/2', correct: '=', hint: 'आमा जादू और मैग्मस ढाल बराबर हैं — वे कट जाएबा! ⁴⁄₈ = ½' },
  { f1: '1/3', f2: '1/2', correct: '<', hint: '⅓, ½ ते कमजोर है। यहाँ मैग्मस शक्ति अधिक है!' },
  { f1: '3/4', f2: '2/4', correct: '>', hint: '¾, ²⁄₄ (½) ते अधिक मजबूत जादू है। प्रहार करेबा!' },
  { f1: '2/5', f2: '3/5', correct: '<', hint: 'समान आधार संख्या — बड़ा अंश जीतेबा! मैग्मस पास ३ है, आमा पास २ है।' },
  { f1: '5/6', f2: '4/6', correct: '>', hint: '५ छठा भाग ४ छठे भाग ते हराएबा — आमा शक्ति दिखाएबा!' },
  { f1: '1/4', f2: '1/3', correct: '<', hint: '¼, ⅓ ते छोटा है। अधिक समान टुकड़ों अर्थ है कि प्रत्येक टुकड़ा छोटा है!' },
  { f1: '3/6', f2: '2/4', correct: '=', hint: 'दोनों ते ½ रूप में सरल किया जा सकता है — मिया सही टाई! जमीन हिलेबा!' },
  { f1: '2/3', f2: '2/5', correct: '>', hint: 'समान अंश, छोटा आधार = बड़ा भाग! आमा ⅔ जादू ⅖ पर हावी हो जाएबा!' },
  { f1: '7/8', f2: '3/4', correct: '>', hint: '⅞ मिया पूरे ¾ ते अधिक करीब है। आम जोर ते प्रहार करेबा!' },
  { f1: '1/2', f2: '2/4', correct: '=', hint: '½ और ²⁄₄ बराबर हैं — आमा जादू समान बल ते टकराएबा!' },
  { f1: '3/8', f2: '1/2', correct: '<', hint: '⅜, ½ (जो कि ⁴⁄₈ है) ते कम है। मैग्मस ढाल टिक जाएबा!' },
  { f1: '5/10', f2: '3/6', correct: '=', hint: 'दोनों ½ के बराबर हैं — ज्वालामुखी किनारे मिया जादुई गतिरोध!' },
  { f1: '2/6', f2: '1/4', correct: '>', hint: '²⁄₆ = ⅓ जो कि ¼ ते बड़ा है। आमा जादू ढाल तोड़ देबा!' },
  { f1: '4/5', f2: '3/5', correct: '>', hint: 'समान आधार — ४, ३ ते हराएबा! मैग्मस दर्द ते दहाड़ेबा!' },
  { f1: '1/6', f2: '1/3', correct: '<', hint: '⅙ बहुत छोटा है! मैग्मस ⅓ अधिक शक्तिशाली है। बचेबा और फिर ते प्रयास करेबा!' },
  { f1: '3/4', f2: '6/8', correct: '=', hint: '¾ और ⁶⁄₈ बराबर हैं! किसी ते भी बढ़त नहीं मिलेबा!' },
  { f1: '5/8', f2: '3/4', correct: '<', hint: '⅝, ¾ (जो कि ⁶⁄₈ है) ते कम है। मैग्मस आगे बढ़ेबा!' },
  { f1: '2/3', f2: '4/6', correct: '=', hint: '⅔ और ⁴⁄₆ बराबर हैं — आमा भाग (fraction) शक्तियां समान हैं!' },
  { f1: '7/10', f2: '1/2', correct: '>', hint: '⁷⁄₁₀, ⁵⁄₁₀ (½) ते बड़ा है। ज्वालामुखी कांपेबा!' },
  { f1: '1/5', f2: '1/4', correct: '<', hint: '⅕, ¼ ते छोटा है। अधिक टुकड़ों अर्थ है कि प्रत्येक छोटा है!' },
  { f1: '3/5', f2: '2/3', correct: '<', hint: '⅗ = 0.6 लेकिन ⅔ ≈ 0.67। मैग्मस थोड़ा अधिक मजबूत है!' },
  { f1: '4/4', f2: '1/1', correct: '=', hint: 'दोनों १ पूरे के बराबर हैं — अधिकतम शक्ति! ज्वालामुखी फटेबा!' },
  { f1: '6/10', f2: '3/5', correct: '=', hint: '⁶⁄₁₀ ते ³⁄₅ रूप में सरल किया जा सकता है — मिया सही ड्रा!' },
  { f1: '2/8', f2: '1/4', correct: '=', hint: '²⁄₈ ते ¼ रूप में सरल किया जा सकता है — आमा शक्तियां समान हैं!' },
  { f1: '5/6', f2: '7/8', correct: '<', hint: '⅞, ⅚ तुलना में १ पूरे अधिक करीब है। मैग्मस ते बढ़त है!' },
  { f1: '3/3', f2: '2/2', correct: '=', hint: 'दोनों १ पूरे के बराबर हैं! मिया शानदार टाई ज्वालामुखी ते हिला देबा!' },
  { f1: '1/8', f2: '1/4', correct: '<', hint: '⅛ बहुत छोटा है! ¼ बड़ा है। मैग्मस आमा कमजोर हमले ते रोकेबा!' },
  { f1: '4/6', f2: '3/4', correct: '<', hint: '⁴⁄₆ = ⅔ जो ¾ ते कम है। मैग्मस आमा जादू मुकाबला करेबा!' },
];

// ============================================================
// Image mappings per level for thematic images
// ============================================================
export const levelImages = {
  level1: {
    theme: 'half-hill',
    secondary: 'quarter-beach',
  },
  level2: {
    theme: 'fraction-bridge',
    secondary: 'third-treehouse',
  },
  level3: {
    theme: 'understand-fractions',
    secondary: 'collect-coins',
  },
  victory: 'mission-complete',
  cover: 'fraction-island-cover',
};

// ============================================================
// Configuration: how many questions per level session
// ============================================================
export const LEVEL_CONFIG = {
  level1: { questionsPerSession: 5, coinsPerAnswer: 10, xpPerAnswer: 25 },
  level2: { questionsPerSession: 5, coinsPerAnswer: 15, xpPerAnswer: 30 },
  level3: { questionsPerSession: 5, coinsPerAnswer: 20, xpPerAnswer: 40 },
};

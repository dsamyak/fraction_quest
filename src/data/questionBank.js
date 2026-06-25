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
    question: 'नक्शे का टुकड़ा 2 समान भागों में फटा हुआ है। छिपे हुए स्थान को चिह्नित करने के लिए ब्लैकबियर्ड ने HALF (आधे) को घेरा। कौन सा चित्र ½ रंगीन दिखाता है?',
    hint: 'आधे का अर्थ है 2 समान भागों में से 1 — केवल एक तरफ चिह्नित किया जाना चाहिए!',
    options: [
      { id: 'a', visual: 'pie-1-2', label: '½ पाई', correct: true },
      { id: 'b', visual: 'pie-1-4', label: '¼ पाई', correct: false },
      { id: 'c', visual: 'pie-3-4', label: '¾ पाई', correct: false },
    ],
  },
  {
    question: "ब्लैकबियर्ड की लॉगबुक में 2 भागों में विभाजित एक पट्टी दिखाई देती है। उसने समुद्र तट के रास्ते का आधा भाग रंगा। कौन सी पट्टी ½ छायांकित दिखाती है?",
    hint: 'रंगीन भागों और कुल भागों को गिनें!',
    options: [
      { id: 'a', visual: 'bar-1-2', label: '½ पट्टी', correct: true },
      { id: 'b', visual: 'bar-3-4', label: '¾ पट्टी', correct: false },
      { id: 'c', visual: 'bar-1-4', label: '¼ पट्टी', correct: false },
    ],
  },
  {
    question: "एक बूढ़े नाविक को 2 में विभाजित एक नक्शा चक्र मिला। वह कहता है कि ब्लैकबियर्ड ने यह दिखाने के लिए ठीक आधा रंग दिया कि लंगर कहाँ गिराया गया था। कौन सा वृत्त ठीक ½ नीला दिखाता है?",
    hint: 'आधा = आकार को 2 समान टुकड़ों में विभाजित किया गया है जिसमें 1 भरा हुआ है।',
    options: [
      { id: 'a', visual: 'pie-3-4', label: '¾ वृत्त', correct: false },
      { id: 'b', visual: 'pie-1-2', label: '½ वृत्त', correct: true },
      { id: 'c', visual: 'pie-1-4', label: '¼ वृत्त', correct: false },
    ],
  },
  {
    question: "रसोइए ने जहाज के आखिरी बिस्किट को 2 समान टुकड़ों में बांट दिया। ब्लैकबियर्ड ने 1 टुकड़ा खा लिया। ब्लैकबियर्ड ने बिस्किट का कितना भाग खाया?",
    hint: 'खाया गया टुकड़ा ÷ कुल टुकड़े = भाग (fraction)।',
    options: [
      { id: 'a', visual: 'pie-1-4', label: '¼', correct: false },
      { id: 'b', visual: 'pie-1-2', label: '½', correct: true },
      { id: 'c', visual: 'bar-3-4', label: '¾', correct: false },
    ],
  },
  // ---------- quarters ----------
  {
    question: "एक नक्शा स्क्रॉल 4 समान वर्गों में विभाजित है। केवल एक अनुभाग X चिह्न दिखाता है। कौन सी पट्टी ¼ छायांकित दिखाती है — X का स्थान?",
    hint: 'एक चौथाई का मतलब 4 समान भागों में से 1 है।',
    options: [
      { id: 'a', visual: 'bar-1-4', label: '¼ पट्टी', correct: true },
      { id: 'b', visual: 'bar-1-2', label: '½ पट्टी', correct: false },
      { id: 'c', visual: 'bar-3-4', label: '¾ पट्टी', correct: false },
    ],
  },
  {
    question: "ब्लैकबियर्ड ने एक कंपास गुलाब को 4 समान तिमाहियों में विभाजित किया और एक को खजाने की दिशा के रूप में चिह्नित किया। कौन सा पाई चार्ट ¼ रंगीन दिखाता है?",
    hint: 'चौथाई = 4 में से 1 टुकड़ा — केवल एक छोटा सा टुकड़ा!',
    options: [
      { id: 'a', visual: 'pie-1-2', label: '½ पाई', correct: false },
      { id: 'b', visual: 'pie-1-4', label: '¼ पाई', correct: true },
      { id: 'c', visual: 'pie-3-4', label: '¾ पाई', correct: false },
    ],
  },
  {
    question: "चालक दल को ब्लैकबियर्ड के पुराने जखीरे से 4 सोने के डबलोन मिले। उन्होंने बंदरगाह का टोल चुकाने के लिए 1 का इस्तेमाल किया। सिक्कों का कितना भाग इस्तेमाल किया गया?",
    hint: 'इस्तेमाल किए गए सिक्के ÷ कुल सिक्के = भाग (fraction)।',
    options: [
      { id: 'a', visual: 'pie-1-4', label: '¼', correct: true },
      { id: 'b', visual: 'pie-1-2', label: '½', correct: false },
      { id: 'c', visual: 'pie-3-4', label: '¾', correct: false },
    ],
  },
  // ---------- three-quarters ----------
  {
    question: "खजाने का नक्शा 4 क्षेत्रों में विभाजित है। उनमें से तीन को खतरनाक के रूप में चिह्नित किया गया है। कौन सी पट्टी ¾ छायांकित दिखाती है — खतरा क्षेत्र?",
    hint: 'तीन-चौथाई = 4 में से 3 भाग भरे हुए हैं।',
    options: [
      { id: 'a', visual: 'bar-1-2', label: '½ पट्टी', correct: false },
      { id: 'b', visual: 'bar-1-4', label: '¼ पट्टी', correct: false },
      { id: 'c', visual: 'bar-3-4', label: '¾ पट्टी', correct: true },
    ],
  },
  {
    question: "एक समुद्री डाकू झंडा 4 समान टुकड़ों में फटा हुआ था। तीन टुकड़ों में खोपड़ी का प्रतीक है। किस वृत्त में ¾ भरा हुआ है — झंडे का खोपड़ी क्षेत्र दिखा रहा है?",
    hint: '4 में से 3 भाग रंगीन होने चाहिए।',
    options: [
      { id: 'a', visual: 'pie-3-4', label: '¾ वृत्त', correct: true },
      { id: 'b', visual: 'pie-1-2', label: '½ वृत्त', correct: false },
      { id: 'c', visual: 'pie-1-4', label: '¼ वृत्त', correct: false },
    ],
  },
  {
    question: "ब्लैकबियर्ड के खजाने के संदूक में 4 समान डिब्बे हैं। 3 डिब्बे सोने से भरे हुए हैं। छाती का कितना भाग भरा हुआ है?",
    hint: 'भरे हुए डिब्बे ÷ कुल डिब्बे।',
    options: [
      { id: 'a', visual: 'bar-1-2', label: '½', correct: false },
      { id: 'b', visual: 'bar-3-4', label: '¾', correct: true },
      { id: 'c', visual: 'bar-1-4', label: '¼', correct: false },
    ],
  },
  // ---------- thirds ----------
  {
    question: "एक गुप्त संदेश 3 समान भागों में विभाजित स्क्रॉल पर लिखा गया है। केवल एक भाग में अगले सुराग का कोड है। कौन सा आकार ⅓ छायांकित दिखाता है?",
    hint: 'एक-तिहाई का मतलब 3 समान भागों में से 1 है।',
    options: [
      { id: 'a', visual: 'bar-1-3', label: '⅓ पट्टी', correct: true },
      { id: 'b', visual: 'bar-1-2', label: '½ पट्टी', correct: false },
      { id: 'c', visual: 'bar-1-4', label: '¼ पट्टी', correct: false },
    ],
  },
  {
    question: "समुद्री डाकू के झंडे में 3 समान धारियां हैं। केवल 1 धारी लाल है — ब्लैकबियर्ड का गुप्त संकेत। झंडे का कितना भाग लाल है?",
    hint: 'लाल धारी ÷ सभी धारियां = ?',
    options: [
      { id: 'a', visual: 'bar-1-3', label: '⅓', correct: true },
      { id: 'b', visual: 'pie-1-2', label: '½', correct: false },
      { id: 'c', visual: 'pie-1-4', label: '¼', correct: false },
    ],
  },
  {
    question: "ब्लैकबियर्ड की छिपी हुई गुफा को 3 सुरंगों में विभाजित किया गया था। दो सुरंगें खजाने के कक्ष की ओर ले जाती हैं। कौन सी पट्टी ⅔ छायांकित दिखाती है — सुरक्षित सुरंगें?",
    hint: 'तीन में से दो भाग भरे होने चाहिए।',
    options: [
      { id: 'a', visual: 'bar-2-3', label: '⅔ पट्टी', correct: true },
      { id: 'b', visual: 'bar-3-4', label: '¾ पट्टी', correct: false },
      { id: 'c', visual: 'bar-1-2', label: '½ पट्टी', correct: false },
    ],
  },
  // ---------- whole and empty ----------
  {
    question: "प्राचीन सिक्के के सभी 3 खंडों में खजाने के निशान हैं। ब्लैकबियर्ड ने हर हिस्से को रंग दिया! कितना भाग रंगीन है?",
    hint: 'यदि सभी भाग रंगीन हैं, तो यह पूरा (WHOLE) है — 3 में से सभी 3!',
    options: [
      { id: 'a', visual: 'pie-whole', label: '3/3 = 1 पूरा', correct: true },
      { id: 'b', visual: 'pie-3-4', label: '¾', correct: false },
      { id: 'c', visual: 'pie-1-2', label: '½', correct: false },
    ],
  },
  {
    question: "द्वीप में 4 समुद्री मार्ग हैं। ब्लैकबियर्ड ने किसी को भी सुरक्षित के रूप में चिह्नित नहीं किया — वे सभी समुद्री राक्षसों द्वारा अवरुद्ध हैं! कौन सा चित्र 0/4 (कुछ नहीं) रंगीन दिखाता है?",
    hint: 'शून्य भागों के रंगीन होने का मतलब है कि सब कुछ खाली है!',
    options: [
      { id: 'a', visual: 'bar-0-4', label: '0/4 पट्टी', correct: true },
      { id: 'b', visual: 'bar-1-4', label: '¼ पट्टी', correct: false },
      { id: 'c', visual: 'bar-3-4', label: '¾ पट्टी', correct: false },
    ],
  },
  {
    question: "ब्लैकबियर्ड का चॉकलेट मैप 4 टुकड़ों में टूट गया है। वह एक सुराग के रूप में आपको 2 टुकड़े देता है। आपको कितना भाग मिला?",
    hint: 'प्राप्त टुकड़े ÷ कुल टुकड़े।',
    options: [
      { id: 'a', visual: 'bar-1-4', label: '¼', correct: false },
      { id: 'b', visual: 'bar-1-2', label: '½', correct: true },
      { id: 'c', visual: 'bar-3-4', label: '¾', correct: false },
    ],
  },
  {
    question: "जहाज की तोप पाउडर के 4 समान खंडों से भरी हुई थी। 2 खंड जले हुए हैं। कौन सा चित्र ²⁄₄ छायांकित दिखाता है — जला हुआ पाउडर?",
    hint: '²⁄₄ ½ के समान है! चार में से दो।',
    options: [
      { id: 'a', visual: 'bar-2-4', label: '2/4 पट्टी', correct: true },
      { id: 'b', visual: 'bar-1-4', label: '1/4 पट्टी', correct: false },
      { id: 'c', visual: 'bar-3-4', label: '3/4 पट्टी', correct: false },
    ],
  },
  {
    question: "ब्लैकबियर्ड के सुनहरे लॉकेट के दोनों हिस्सों में खजाने के नक्शे का एक टुकड़ा है। सैंडविच के आकार के लॉकेट में 2 भाग हैं — दोनों में सुराग हैं! कितने भाग में सुराग हैं?",
    hint: 'दोनों भाग = 2 में से 2 = पूरी बात।',
    options: [
      { id: 'a', visual: 'pie-whole', label: '2/2 = पूरा', correct: true },
      { id: 'b', visual: 'pie-1-2', label: '½', correct: false },
      { id: 'c', visual: 'pie-1-4', label: '¼', correct: false },
    ],
  },
  {
    question: "आपको ब्लैकबियर्ड के फटे हुए नक्शे के सभी 3 टुकड़े मिल गए — हर एक! कौन सा आकार दिखाता है कि पूरा (³⁄₃) मिल गया है?",
    hint: '3 में से 3 = सब कुछ — पूरी तस्वीर!',
    options: [
      { id: 'a', visual: 'bar-1-3', label: '⅓', correct: false },
      { id: 'b', visual: 'pie-whole', label: '3/3', correct: true },
      { id: 'c', visual: 'bar-2-3', label: '⅔', correct: false },
    ],
  },
  {
    question: "ब्लैकबियर्ड ने एक नारियल के अंदर 4 माणिक छुपाए थे। आपको उनमें से 3 मिलते हैं — वे खजाने के नक्शे पर चमकते हैं! आपको माणिक का कितना भाग मिला?",
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
    instruction: "पहला पुल का पत्थर इस भाग (fraction) से उकेरा गया है — इसे जगह पर लॉक करने के लिए एक समान (EQUIVALENT) पत्थर खोजें:",
    options: ['2/4', '1/3', '3/8', '4/8'],
    correctAnswers: ['2/4', '4/8'],
  },
  {
    target: '1/3',
    instruction: "एक चमकता हुआ जंगल का पत्थर यह भाग दिखाता है। पुल बनाने के लिए नदी से मेल खाने वाला पत्थर चुनें:",
    options: ['2/6', '3/4', '3/9', '4/10'],
    correctAnswers: ['2/6', '3/9'],
  },
  {
    target: '2/4',
    instruction: "चट्टान पर ब्लैकबियर्ड की नक्काशी इस भाग को पढ़ती है। ढेर में से कौन सा पत्थर इसके बराबर है?",
    options: ['1/2', '3/4', '2/8', '4/8'],
    correctAnswers: ['1/2', '4/8'],
  },
  {
    target: '3/6',
    instruction: "ब्लैकबियर्ड का एक प्राचीन शिलालेख कहता है: 'केवल समान पत्थर ही पार कर सकता है।' इस अंतर को पार करने के लिए समान भाग खोजें:",
    options: ['1/2', '2/3', '6/12', '3/4'],
    correctAnswers: ['1/2', '6/12'],
  },
  {
    target: '2/3',
    instruction: "इस तख्ते की रखवाली करने वाली जंगल की आत्मा एक समान पत्थर की मांग करती है। कौन सा भाग रास्ता खोलता है?",
    options: ['4/6', '3/4', '6/9', '2/5'],
    correctAnswers: ['4/6', '6/9'],
  },
  {
    target: '3/4',
    instruction: "एक नक्काशीदार बंदर की मूर्ति के पास इस भाग से चिह्नित एक पत्थर है। मूर्ति को खुश करने और तख्ता प्राप्त करने के लिए एक समान भाग (fraction) दें:",
    options: ['6/8', '4/5', '9/12', '3/5'],
    correctAnswers: ['6/8', '9/12'],
  },
  {
    target: '1/4',
    instruction: "पुल के अगले हिस्से को बेलों ने रोक दिया है! ब्लैकबियर्ड का सुराग: 'गलत पत्थरों को काट दो — केवल समान भाग ही गुजरता है।' कौन सा समान है?",
    options: ['2/8', '1/3', '3/12', '2/6'],
    correctAnswers: ['2/8', '3/12'],
  },
  {
    target: '2/5',
    instruction: "नदी का मगरमच्छ आपको तभी पार करने देगा जब आप सही मेल खाने वाला पत्थर रखेंगे। समान भाग खोजें:",
    options: ['4/10', '3/5', '6/15', '2/3'],
    correctAnswers: ['4/10', '6/15'],
  },
  {
    target: '4/8',
    instruction: "झरने में ब्लैकबियर्ड के नोट के साथ एक गुप्त स्थान छिपा है: 'समान भाग पत्थर के दरवाजे को खोलता है।' कौन सा भाग 4/8 के बराबर है?",
    options: ['1/2', '2/4', '3/6', '3/4'],
    correctAnswers: ['1/2', '2/4', '3/6'],
  },
  {
    target: '5/10',
    instruction: "जंगल में गहराई में, एक बंद संदूक पर यह भाग उकेरा गया है। पत्थर की पटिया पर एक समान भाग इसे खोल देगा! यह कौन सा है?",
    options: ['1/2', '2/5', '3/6', '10/20'],
    correctAnswers: ['1/2', '3/6', '10/20'],
  },
  {
    target: '2/6',
    instruction: "एक बात करने वाला तोता (ब्लैकबियर्ड का पुराना पालतू!) चिल्लाता है: 'समान पत्थर! समान पत्थर!' वह पत्थर चुनें जो इस भाग के बराबर हो:",
    options: ['1/3', '2/4', '3/9', '1/2'],
    correctAnswers: ['1/3', '3/9'],
  },
  {
    target: '6/8',
    instruction: "पुल का अंतिम तख्ता गायब है! एक पत्थर की बेड़ा दिखाई देती है, लेकिन पार ले जाने के लिए केवल समान भाग पत्थर ही हल्का है। यह कौन सा है?",
    options: ['3/4', '2/3', '9/12', '6/10'],
    correctAnswers: ['3/4', '9/12'],
  },
  {
    target: '4/6',
    instruction: "ब्लैकबियर्ड ने पेड़ के तने पर एक पहेली उकेरी है: 'मैं 4/6 हूँ — मेरे जुड़वां को खोजें और मैं आगे का रास्ता दिखाऊंगा!'",
    options: ['2/3', '4/8', '6/9', '3/4'],
    correctAnswers: ['2/3', '6/9'],
  },
  {
    target: '3/9',
    instruction: "नदी में एक रहस्यमयी चमकते पत्थर पर 3/9 लिखा है। पुल के हिस्से को पूरा करने के लिए कौन सा समान भाग पत्थर मेल खाता है?",
    options: ['1/3', '2/6', '3/4', '1/2'],
    correctAnswers: ['1/3', '2/6'],
  },
  {
    target: '2/8',
    instruction: "नदी तेजी से बढ़ रही है! ब्लैकबियर्ड का भूत दिखाई देता है: 'इस भाग से मिलान करें, युवा खोजकर्ता, या बह जाएं!' इसके समान खोजें:",
    options: ['1/4', '2/6', '3/12', '1/2'],
    correctAnswers: ['1/4', '3/12'],
  },
  {
    target: '6/12',
    instruction: "पुल का अंतिम अंतर सबसे चौड़ा है। किनारे पर 6/12 वाला एक विशाल पत्थर करघा है। कौन सा समान भाग गायब आधारशिला है?",
    options: ['1/2', '2/4', '3/4', '3/6'],
    correctAnswers: ['1/2', '2/4', '3/6'],
  },
  {
    target: '4/12',
    instruction: "ब्लैकबियर्ड के खजाने के संदूक में एक संयोजन ताला है: केवल एक समान भाग ही इसे खोलेगा। कौन सा भाग 4/12 के बराबर है?",
    options: ['1/3', '2/6', '4/8', '3/9'],
    correctAnswers: ['1/3', '2/6', '3/9'],
  },
  {
    target: '10/20',
    instruction: "एक प्राचीन समुद्री डाकू स्क्रॉल से पता चलता है: 'पुल पत्थर 10/20 के जंगल में कई जुड़वाँ बच्चे छिपे हुए हैं।' आगे बढ़ने के लिए एक समान भाग खोजें:",
    options: ['1/2', '5/10', '2/4', '3/4'],
    correctAnswers: ['1/2', '5/10', '2/4'],
  },
  {
    target: '9/12',
    instruction: "आप 9/12 अंकित पुल आधारशिला की रक्षा करते हुए एक जंगल के सांप को देखते हैं। सांप को एक समान भाग दें और यह एक तरफ हट जाएगा!",
    options: ['3/4', '6/8', '2/3', '1/2'],
    correctAnswers: ['3/4', '6/8'],
  },
  {
    target: '8/12',
    instruction: "ब्लैकबियर्ड का अंतिम पुल का सुराग एक बोल्डर पर उकेरा गया है: '8/12 ज्वालामुखी पथ के प्रवेश द्वार की रक्षा करता है।' इसे एक समान भाग के साथ हल करें!",
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
  { f1: '1/2', f2: '1/4', correct: '>', hint: 'आपका ½ जादू मैग्मस की ¼ ढाल से बड़ा है। हमला करें!' },
  { f1: '2/3', f2: '3/4', correct: '<', hint: 'मैग्मस का ¾ आपके ⅔ से बड़ा है। छोटे हमले के प्रतीक का उपयोग करें!' },
  { f1: '4/8', f2: '1/2', correct: '=', hint: 'आपका जादू और मैग्मस की ढाल बराबर हैं — वे कट जाते हैं! ⁴⁄₈ = ½' },
  { f1: '1/3', f2: '1/2', correct: '<', hint: '⅓, ½ से कमजोर है। यहाँ मैग्मस की शक्ति अधिक है!' },
  { f1: '3/4', f2: '2/4', correct: '>', hint: '¾, ²⁄₄ (½) से अधिक मजबूत जादू है। प्रहार करें!' },
  { f1: '2/5', f2: '3/5', correct: '<', hint: 'समान आधार संख्या — बड़ा अंश जीतता है! मैग्मस के पास 3 है, आपके पास 2 है।' },
  { f1: '5/6', f2: '4/6', correct: '>', hint: '5 छठा भाग 4 छठे भाग को हराता है — अपनी शक्ति दिखाएं!' },
  { f1: '1/4', f2: '1/3', correct: '<', hint: '¼, ⅓ से छोटा है। अधिक समान टुकड़ों का अर्थ है कि प्रत्येक टुकड़ा छोटा है!' },
  { f1: '3/6', f2: '2/4', correct: '=', hint: 'दोनों को ½ के रूप में सरल किया जा सकता है — एक सही टाई! जमीन हिलती है!' },
  { f1: '2/3', f2: '2/5', correct: '>', hint: 'समान अंश, छोटा आधार = बड़ा भाग! आपका ⅔ जादू ⅖ पर हावी हो जाता है!' },
  { f1: '7/8', f2: '3/4', correct: '>', hint: '⅞ एक पूरे के ¾ से अधिक करीब है। आप जोर से प्रहार करते हैं!' },
  { f1: '1/2', f2: '2/4', correct: '=', hint: '½ और ²⁄₄ बराबर हैं — आपके जादू समान बल से टकराते हैं!' },
  { f1: '3/8', f2: '1/2', correct: '<', hint: '⅜, ½ (जो कि ⁴⁄₈ है) से कम है। मैग्मस की ढाल टिक जाती है!' },
  { f1: '5/10', f2: '3/6', correct: '=', hint: 'दोनों ½ के बराबर हैं — ज्वालामुखी के किनारे एक जादुई गतिरोध!' },
  { f1: '2/6', f2: '1/4', correct: '>', hint: '²⁄₆ = ⅓ जो कि ¼ से बड़ा है। आपका जादू ढाल तोड़ देता है!' },
  { f1: '4/5', f2: '3/5', correct: '>', hint: 'समान आधार — 4, 3 को हराता है! मैग्मस दर्द से दहाड़ता है!' },
  { f1: '1/6', f2: '1/3', correct: '<', hint: '⅙ बहुत छोटा है! मैग्मस का ⅓ अधिक शक्तिशाली है। बचें और फिर से प्रयास करें!' },
  { f1: '3/4', f2: '6/8', correct: '=', hint: '¾ और ⁶⁄₈ बराबर हैं! किसी को भी बढ़त नहीं मिलती!' },
  { f1: '5/8', f2: '3/4', correct: '<', hint: '⅝, ¾ (जो कि ⁶⁄₈ है) से कम है। मैग्मस आगे बढ़ता है!' },
  { f1: '2/3', f2: '4/6', correct: '=', hint: '⅔ और ⁴⁄₆ बराबर हैं — आपके भाग (fraction) की शक्तियां समान हैं!' },
  { f1: '7/10', f2: '1/2', correct: '>', hint: '⁷⁄₁₀, ⁵⁄₁₀ (½) से बड़ा है। ज्वालामुखी कांपता है!' },
  { f1: '1/5', f2: '1/4', correct: '<', hint: '⅕, ¼ से छोटा है। अधिक टुकड़ों का अर्थ है कि प्रत्येक छोटा है!' },
  { f1: '3/5', f2: '2/3', correct: '<', hint: '⅗ = 0.6 लेकिन ⅔ ≈ 0.67। मैग्मस थोड़ा अधिक मजबूत है!' },
  { f1: '4/4', f2: '1/1', correct: '=', hint: 'दोनों 1 पूरे के बराबर हैं — अधिकतम शक्ति! ज्वालामुखी फटता है!' },
  { f1: '6/10', f2: '3/5', correct: '=', hint: '⁶⁄₁₀ को ³⁄₅ के रूप में सरल किया जा सकता है — एक सही ड्रा!' },
  { f1: '2/8', f2: '1/4', correct: '=', hint: '²⁄₈ को ¼ के रूप में सरल किया जा सकता है — आपकी शक्तियां समान हैं!' },
  { f1: '5/6', f2: '7/8', correct: '<', hint: '⅞, ⅚ की तुलना में 1 पूरे के अधिक करीब है। मैग्मस को बढ़त है!' },
  { f1: '3/3', f2: '2/2', correct: '=', hint: 'दोनों 1 पूरे के बराबर हैं! एक शानदार टाई ज्वालामुखी को हिला देती है!' },
  { f1: '1/8', f2: '1/4', correct: '<', hint: '⅛ बहुत छोटा है! ¼ बड़ा है। मैग्मस आपके कमजोर हमले को रोकता है!' },
  { f1: '4/6', f2: '3/4', correct: '<', hint: '⁴⁄₆ = ⅔ जो ¾ से कम है। मैग्मस आपके जादू का मुकाबला करता है!' },
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

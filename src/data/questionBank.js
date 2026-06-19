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
    question: 'The map fragment is torn in 2 equal pieces. Blackbeard circled HALF to mark the hidden cove. Which picture shows ½ colored?',
    hint: 'Half means 1 out of 2 equal parts — only one side should be marked!',
    options: [
      { id: 'a', visual: 'pie-1-2', label: '½ pie', correct: true },
      { id: 'b', visual: 'pie-1-4', label: '¼ pie', correct: false },
      { id: 'c', visual: 'pie-3-4', label: '¾ pie', correct: false },
    ],
  },
  {
    question: "Blackbeard's logbook shows a bar divided into 2 sections. He colored HALF the route to the beach. Which bar shows ½ shaded?",
    hint: 'Count the colored parts vs. total parts!',
    options: [
      { id: 'a', visual: 'bar-1-2', label: '½ bar', correct: true },
      { id: 'b', visual: 'bar-3-4', label: '¾ bar', correct: false },
      { id: 'c', visual: 'bar-1-4', label: '¼ bar', correct: false },
    ],
  },
  {
    question: "An old sailor found a map circle split into 2. He says Blackbeard colored exactly HALF to show where the anchor was dropped. Which circle shows exactly ½ blue?",
    hint: 'Half = the shape split into 2 equal pieces with 1 filled.',
    options: [
      { id: 'a', visual: 'pie-3-4', label: '¾ circle', correct: false },
      { id: 'b', visual: 'pie-1-2', label: '½ circle', correct: true },
      { id: 'c', visual: 'pie-1-4', label: '¼ circle', correct: false },
    ],
  },
  {
    question: "The cook divided the last ship's biscuit into 2 equal pieces. Blackbeard ate 1 piece. What fraction of the biscuit did Blackbeard eat?",
    hint: 'Piece eaten ÷ total pieces = the fraction.',
    options: [
      { id: 'a', visual: 'pie-1-4', label: '¼', correct: false },
      { id: 'b', visual: 'pie-1-2', label: '½', correct: true },
      { id: 'c', visual: 'bar-3-4', label: '¾', correct: false },
    ],
  },
  // ---------- quarters ----------
  {
    question: "A map scroll is divided into 4 equal sections. Only ONE section shows the X mark. Which bar shows ¼ shaded — the location of the X?",
    hint: 'A quarter means 1 out of 4 equal parts.',
    options: [
      { id: 'a', visual: 'bar-1-4', label: '¼ bar', correct: true },
      { id: 'b', visual: 'bar-1-2', label: '½ bar', correct: false },
      { id: 'c', visual: 'bar-3-4', label: '¾ bar', correct: false },
    ],
  },
  {
    question: "Blackbeard split a compass rose into 4 equal quarters and marked ONE as the direction to the treasure. Which pie chart shows ¼ colored?",
    hint: 'Quarter = 1 piece out of 4 — only one small slice!',
    options: [
      { id: 'a', visual: 'pie-1-2', label: '½ pie', correct: false },
      { id: 'b', visual: 'pie-1-4', label: '¼ pie', correct: true },
      { id: 'c', visual: 'pie-3-4', label: '¾ pie', correct: false },
    ],
  },
  {
    question: "The crew found 4 gold doubloons from Blackbeard's old stash. They used 1 to pay the harbor toll. What fraction of the coins was used?",
    hint: 'Used coins ÷ total coins = the fraction.',
    options: [
      { id: 'a', visual: 'pie-1-4', label: '¼', correct: true },
      { id: 'b', visual: 'pie-1-2', label: '½', correct: false },
      { id: 'c', visual: 'pie-3-4', label: '¾', correct: false },
    ],
  },
  // ---------- three-quarters ----------
  {
    question: "The treasure map is divided into 4 regions. THREE of them are marked as dangerous. Which bar shows ¾ shaded — the danger zone?",
    hint: 'Three-quarters = 3 out of 4 parts filled.',
    options: [
      { id: 'a', visual: 'bar-1-2', label: '½ bar', correct: false },
      { id: 'b', visual: 'bar-1-4', label: '¼ bar', correct: false },
      { id: 'c', visual: 'bar-3-4', label: '¾ bar', correct: true },
    ],
  },
  {
    question: "A pirate flag was torn into 4 equal pieces. THREE pieces have the skull symbol. Which circle has ¾ filled in — showing the flag's skull area?",
    hint: '3 out of 4 parts should be colored.',
    options: [
      { id: 'a', visual: 'pie-3-4', label: '¾ circle', correct: true },
      { id: 'b', visual: 'pie-1-2', label: '½ circle', correct: false },
      { id: 'c', visual: 'pie-1-4', label: '¼ circle', correct: false },
    ],
  },
  {
    question: "Blackbeard's treasure chest has 4 equal compartments. 3 compartments are filled with gold. What fraction of the chest is full?",
    hint: 'Filled compartments ÷ total compartments.',
    options: [
      { id: 'a', visual: 'bar-1-2', label: '½', correct: false },
      { id: 'b', visual: 'bar-3-4', label: '¾', correct: true },
      { id: 'c', visual: 'bar-1-4', label: '¼', correct: false },
    ],
  },
  // ---------- thirds ----------
  {
    question: "A secret message is written on a scroll split into 3 equal parts. Only ONE part has the code for the next clue. Which shape shows ⅓ shaded?",
    hint: 'One-third means 1 out of 3 equal parts.',
    options: [
      { id: 'a', visual: 'bar-1-3', label: '⅓ bar', correct: true },
      { id: 'b', visual: 'bar-1-2', label: '½ bar', correct: false },
      { id: 'c', visual: 'bar-1-4', label: '¼ bar', correct: false },
    ],
  },
  {
    question: "The pirate flag has 3 equal stripes. Only 1 stripe is red — Blackbeard's secret signal. What fraction of the flag is red?",
    hint: 'Red stripe ÷ all stripes = ?',
    options: [
      { id: 'a', visual: 'bar-1-3', label: '⅓', correct: true },
      { id: 'b', visual: 'pie-1-2', label: '½', correct: false },
      { id: 'c', visual: 'pie-1-4', label: '¼', correct: false },
    ],
  },
  {
    question: "Blackbeard's hidden cave was divided into 3 tunnels. TWO tunnels lead to the treasure chamber. Which bar shows ⅔ shaded — the safe tunnels?",
    hint: 'Two out of three parts should be filled.',
    options: [
      { id: 'a', visual: 'bar-2-3', label: '⅔ bar', correct: true },
      { id: 'b', visual: 'bar-3-4', label: '¾ bar', correct: false },
      { id: 'c', visual: 'bar-1-2', label: '½ bar', correct: false },
    ],
  },
  // ---------- whole and empty ----------
  {
    question: "ALL 3 sections of the ancient coin have treasure markings. Blackbeard colored every part! What fraction is colored?",
    hint: 'If all parts are colored, it is the WHOLE — all 3 out of 3!',
    options: [
      { id: 'a', visual: 'pie-whole', label: '3/3 = 1 whole', correct: true },
      { id: 'b', visual: 'pie-3-4', label: '¾', correct: false },
      { id: 'c', visual: 'pie-1-2', label: '½', correct: false },
    ],
  },
  {
    question: "The island has 4 sea routes. Blackbeard marked NONE as safe — they are all blocked by sea monsters! Which picture shows 0/4 (nothing) colored?",
    hint: 'Zero parts colored means everything is empty!',
    options: [
      { id: 'a', visual: 'bar-0-4', label: '0/4 bar', correct: true },
      { id: 'b', visual: 'bar-1-4', label: '¼ bar', correct: false },
      { id: 'c', visual: 'bar-3-4', label: '¾ bar', correct: false },
    ],
  },
  {
    question: "Blackbeard's chocolate map is broken into 4 pieces. He gives 2 pieces to you as a clue. What fraction did you receive?",
    hint: 'Pieces received ÷ total pieces.',
    options: [
      { id: 'a', visual: 'bar-1-4', label: '¼', correct: false },
      { id: 'b', visual: 'bar-1-2', label: '½', correct: true },
      { id: 'c', visual: 'bar-3-4', label: '¾', correct: false },
    ],
  },
  {
    question: "The ship's cannon was loaded with 4 equal sections of powder. 2 sections are lit. Which picture shows ²⁄₄ shaded — the lit powder?",
    hint: '²⁄₄ is the same as ½! Two out of four.',
    options: [
      { id: 'a', visual: 'bar-2-4', label: '2/4 bar', correct: true },
      { id: 'b', visual: 'bar-1-4', label: '1/4 bar', correct: false },
      { id: 'c', visual: 'bar-3-4', label: '3/4 bar', correct: false },
    ],
  },
  {
    question: "Both halves of Blackbeard's golden locket contain a piece of the treasure map. The sandwich-shaped locket has 2 parts — both have clues! What fraction has clues?",
    hint: 'Both parts = 2 out of 2 = the whole thing.',
    options: [
      { id: 'a', visual: 'pie-whole', label: '2/2 = whole', correct: true },
      { id: 'b', visual: 'pie-1-2', label: '½', correct: false },
      { id: 'c', visual: 'pie-1-4', label: '¼', correct: false },
    ],
  },
  {
    question: "You discover ALL 3 pieces of Blackbeard's torn map — every single one! Which shape shows that the whole (³⁄₃) is found?",
    hint: '3 out of 3 = everything — the complete picture!',
    options: [
      { id: 'a', visual: 'bar-1-3', label: '⅓', correct: false },
      { id: 'b', visual: 'pie-whole', label: '3/3', correct: true },
      { id: 'c', visual: 'bar-2-3', label: '⅔', correct: false },
    ],
  },
  {
    question: "Blackbeard hid 4 rubies inside a coconut. You find 3 of them — they glow on the treasure map! What fraction of the rubies did you find?",
    hint: 'Found rubies ÷ total rubies.',
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
    instruction: "The first bridge stone is carved with the fraction — find an EQUIVALENT stone to lock it in place:",
    options: ['2/4', '1/3', '3/8', '4/8'],
    correctAnswers: ['2/4', '4/8'],
  },
  {
    target: '1/3',
    instruction: "A glowing jungle stone shows this fraction. Pick the MATCHING stone from the river to build the bridge:",
    options: ['2/6', '3/4', '3/9', '4/10'],
    correctAnswers: ['2/6', '3/9'],
  },
  {
    target: '2/4',
    instruction: "Blackbeard's etching on the cliff reads this fraction. Which stone from the pile EQUALS it?",
    options: ['1/2', '3/4', '2/8', '4/8'],
    correctAnswers: ['1/2', '4/8'],
  },
  {
    target: '3/6',
    instruction: "An ancient inscription from Blackbeard says: 'Only the equal stone may cross.' Find the equivalent fraction to cross this gap:",
    options: ['1/2', '2/3', '6/12', '3/4'],
    correctAnswers: ['1/2', '6/12'],
  },
  {
    target: '2/3',
    instruction: "The jungle spirit guarding this plank demands an equivalent stone. Which fraction unlocks the path?",
    options: ['4/6', '3/4', '6/9', '2/5'],
    correctAnswers: ['4/6', '6/9'],
  },
  {
    target: '3/4',
    instruction: "A carved monkey idol holds a stone marked with this fraction. Offer an EQUAL fraction to appease the idol and receive the plank:",
    options: ['6/8', '4/5', '9/12', '3/5'],
    correctAnswers: ['6/8', '9/12'],
  },
  {
    target: '1/4',
    instruction: "Vines block the next section of the bridge! Blackbeard's clue: 'Cut away the wrong stones — only the equivalent passes.' Which is equivalent?",
    options: ['2/8', '1/3', '3/12', '2/6'],
    correctAnswers: ['2/8', '3/12'],
  },
  {
    target: '2/5',
    instruction: "A river crocodile will only let you pass if you place the CORRECT matching stone. Find the equivalent fraction:",
    options: ['4/10', '3/5', '6/15', '2/3'],
    correctAnswers: ['4/10', '6/15'],
  },
  {
    target: '4/8',
    instruction: "The waterfall hides a secret alcove with Blackbeard's note: 'The equal fraction unlocks the stone door.' Which fraction equals 4/8?",
    options: ['1/2', '2/4', '3/6', '3/4'],
    correctAnswers: ['1/2', '2/4', '3/6'],
  },
  {
    target: '5/10',
    instruction: "Deep in the jungle, a locked chest has this fraction engraved. An equivalent fraction on a stone slab will spring it open! Which is it?",
    options: ['1/2', '2/5', '3/6', '10/20'],
    correctAnswers: ['1/2', '3/6', '10/20'],
  },
  {
    target: '2/6',
    instruction: "A talking parrot (Blackbeard's old pet!) squawks: 'Equivalent stone! Equivalent stone!' Pick the stone that equals this fraction:",
    options: ['1/3', '2/4', '3/9', '1/2'],
    correctAnswers: ['1/3', '3/9'],
  },
  {
    target: '6/8',
    instruction: "The final plank of the bridge is missing! A stone raft appears, but only the EQUIVALENT fraction stone is light enough to carry across. Which is it?",
    options: ['3/4', '2/3', '9/12', '6/10'],
    correctAnswers: ['3/4', '9/12'],
  },
  {
    target: '4/6',
    instruction: "Blackbeard left a riddle carved in a tree trunk: 'I am 4/6 — find my twin and I shall reveal the path forward!'",
    options: ['2/3', '4/8', '6/9', '3/4'],
    correctAnswers: ['2/3', '6/9'],
  },
  {
    target: '3/9',
    instruction: "A mysterious glowing stone in the river is labeled 3/9. Which equivalent fraction stone matches to complete the bridge span?",
    options: ['1/3', '2/6', '3/4', '1/2'],
    correctAnswers: ['1/3', '2/6'],
  },
  {
    target: '2/8',
    instruction: "The river is rising fast! Blackbeard's ghost appears: 'Match this fraction, young explorer, or be swept away!' Find its equivalent:",
    options: ['1/4', '2/6', '3/12', '1/2'],
    correctAnswers: ['1/4', '3/12'],
  },
  {
    target: '6/12',
    instruction: "The final bridge gap is the widest. A massive stone with 6/12 looms at the edge. Which equivalent fraction is the missing keystone?",
    options: ['1/2', '2/4', '3/4', '3/6'],
    correctAnswers: ['1/2', '2/4', '3/6'],
  },
  {
    target: '4/12',
    instruction: "Blackbeard's treasure chest has a combination lock: only an equivalent fraction will open it. Which fraction equals 4/12?",
    options: ['1/3', '2/6', '4/8', '3/9'],
    correctAnswers: ['1/3', '2/6', '3/9'],
  },
  {
    target: '10/20',
    instruction: "An ancient pirate scroll reveals: 'The bridge stone 10/20 has many twins hidden in the jungle.' Find an equivalent fraction to proceed:",
    options: ['1/2', '5/10', '2/4', '3/4'],
    correctAnswers: ['1/2', '5/10', '2/4'],
  },
  {
    target: '9/12',
    instruction: "You spot a jungle snake guarding the bridge keystone marked 9/12. Offer the snake an equivalent fraction and it will stand aside!",
    options: ['3/4', '6/8', '2/3', '1/2'],
    correctAnswers: ['3/4', '6/8'],
  },
  {
    target: '8/12',
    instruction: "Blackbeard's final bridge clue is engraved on a boulder: '8/12 guards the entrance to the volcano path.' Solve it with an equivalent fraction!",
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
  { f1: '1/2', f2: '1/4', correct: '>', hint: 'Your ½ spell is BIGGER than Magmus\'s ¼ shield. Attack!' },
  { f1: '2/3', f2: '3/4', correct: '<', hint: 'Magmus\'s ¾ is larger than your ⅔. Use the smaller attack symbol!' },
  { f1: '4/8', f2: '1/2', correct: '=', hint: 'Your spell and Magmus\'s shield are equal — they cancel out! ⁴⁄₈ = ½' },
  { f1: '1/3', f2: '1/2', correct: '<', hint: '⅓ is weaker than ½. Magmus\'s power is greater here!' },
  { f1: '3/4', f2: '2/4', correct: '>', hint: '¾ is a stronger spell than ²⁄₄ (½). Strike!' },
  { f1: '2/5', f2: '3/5', correct: '<', hint: 'Same bottom number — bigger top wins! Magmus has 3, you have 2.' },
  { f1: '5/6', f2: '4/6', correct: '>', hint: '5 sixths beats 4 sixths — unleash your power!' },
  { f1: '1/4', f2: '1/3', correct: '<', hint: '¼ is smaller than ⅓. More equal pieces means each piece is smaller!' },
  { f1: '3/6', f2: '2/4', correct: '=', hint: 'Both simplify to ½ — a perfect tie! The ground shakes!' },
  { f1: '2/3', f2: '2/5', correct: '>', hint: 'Same top, smaller bottom = bigger fraction! Your ⅔ spell overpowers ⅖!' },
  { f1: '7/8', f2: '3/4', correct: '>', hint: '⅞ is closer to a whole than ¾. You strike hard!' },
  { f1: '1/2', f2: '2/4', correct: '=', hint: '½ and ²⁄₄ are equivalent — your spells collide with equal force!' },
  { f1: '3/8', f2: '1/2', correct: '<', hint: '⅜ is less than ½ (which is ⁴⁄₈). Magmus\'s shield holds!' },
  { f1: '5/10', f2: '3/6', correct: '=', hint: 'Both equal ½ — a magical stalemate at the volcano\'s edge!' },
  { f1: '2/6', f2: '1/4', correct: '>', hint: '²⁄₆ = ⅓ which is bigger than ¼. Your spell breaks through!' },
  { f1: '4/5', f2: '3/5', correct: '>', hint: 'Same bottom — 4 beats 3! Magmus roars in pain!' },
  { f1: '1/6', f2: '1/3', correct: '<', hint: '⅙ is tiny! Magmus\'s ⅓ is mightier. Dodge and regroup!' },
  { f1: '3/4', f2: '6/8', correct: '=', hint: '¾ and ⁶⁄₈ are equivalent! Neither gains the upper hand!' },
  { f1: '5/8', f2: '3/4', correct: '<', hint: '⅝ is less than ¾ (which is ⁶⁄₈). Magmus advances!' },
  { f1: '2/3', f2: '4/6', correct: '=', hint: '⅔ and ⁴⁄₆ are equivalent — your fraction powers are matched!' },
  { f1: '7/10', f2: '1/2', correct: '>', hint: '⁷⁄₁₀ is bigger than ⁵⁄₁₀ (½). The volcano trembles!' },
  { f1: '1/5', f2: '1/4', correct: '<', hint: '⅕ is smaller than ¼. More slices means each is smaller!' },
  { f1: '3/5', f2: '2/3', correct: '<', hint: '⅗ = 0.6 but ⅔ ≈ 0.67. Magmus is narrowly stronger!' },
  { f1: '4/4', f2: '1/1', correct: '=', hint: 'Both equal 1 whole — MAXIMUM POWER! The volcano erupts!' },
  { f1: '6/10', f2: '3/5', correct: '=', hint: '⁶⁄₁₀ simplifies to ³⁄₅ — a perfect draw!' },
  { f1: '2/8', f2: '1/4', correct: '=', hint: '²⁄₈ simplifies to ¼ — your powers are equal!' },
  { f1: '5/6', f2: '7/8', correct: '<', hint: '⅞ is closer to 1 whole than ⅚. Magmus has the edge!' },
  { f1: '3/3', f2: '2/2', correct: '=', hint: 'Both equal 1 whole! A spectacular tie shakes the volcano!' },
  { f1: '1/8', f2: '1/4', correct: '<', hint: '⅛ is tiny! ¼ is bigger. Magmus blocks your weak shot!' },
  { f1: '4/6', f2: '3/4', correct: '<', hint: '⁴⁄₆ = ⅔ which is less than ¾. Magmus counters your spell!' },
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

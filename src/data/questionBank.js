// ============================================================
// FRACTION ISLAND — MASTER QUESTION BANK
// Each world (level) has a large pool of questions.
// The game randomly picks a subset each time to keep it fresh.
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
// Theme: Identify fractions from visual shapes
// Each question shows shapes; student picks the one matching
// the given fraction.
// ============================================================
export const level1Questions = [
  // ---------- halves ----------
  {
    question: 'Which picture shows ½ of the shape colored?',
    hint: 'Half means 1 out of 2 equal parts!',
    options: [
      { id: 'a', visual: 'pie-1-2', label: '½ pie', correct: true },
      { id: 'b', visual: 'pie-1-4', label: '¼ pie', correct: false },
      { id: 'c', visual: 'pie-3-4', label: '¾ pie', correct: false },
    ],
  },
  {
    question: 'Which bar shows ½ shaded?',
    hint: 'Count the colored parts vs. total parts!',
    options: [
      { id: 'a', visual: 'bar-1-2', label: '½ bar', correct: true },
      { id: 'b', visual: 'bar-3-4', label: '¾ bar', correct: false },
      { id: 'c', visual: 'bar-1-4', label: '¼ bar', correct: false },
    ],
  },
  {
    question: 'Pick the circle where exactly half is colored blue.',
    hint: 'Half means the shape is split into 2 equal pieces and 1 is filled.',
    options: [
      { id: 'a', visual: 'pie-3-4', label: '¾ circle', correct: false },
      { id: 'b', visual: 'pie-1-2', label: '½ circle', correct: true },
      { id: 'c', visual: 'pie-1-4', label: '¼ circle', correct: false },
    ],
  },
  {
    question: 'A pizza is cut into 2 equal slices. 1 slice has pepperoni. What fraction has pepperoni?',
    hint: 'Pepperoni slice ÷ total slices = ?',
    options: [
      { id: 'a', visual: 'pie-1-4', label: '¼', correct: false },
      { id: 'b', visual: 'pie-1-2', label: '½', correct: true },
      { id: 'c', visual: 'bar-3-4', label: '¾', correct: false },
    ],
  },
  // ---------- quarters ----------
  {
    question: 'Which bar shows ¼ shaded?',
    hint: 'A quarter means 1 out of 4 equal parts.',
    options: [
      { id: 'a', visual: 'bar-1-4', label: '¼ bar', correct: true },
      { id: 'b', visual: 'bar-1-2', label: '½ bar', correct: false },
      { id: 'c', visual: 'bar-3-4', label: '¾ bar', correct: false },
    ],
  },
  {
    question: 'Which pie chart shows ¼ colored?',
    hint: 'Quarter = 1 piece out of 4.',
    options: [
      { id: 'a', visual: 'pie-1-2', label: '½ pie', correct: false },
      { id: 'b', visual: 'pie-1-4', label: '¼ pie', correct: true },
      { id: 'c', visual: 'pie-3-4', label: '¾ pie', correct: false },
    ],
  },
  {
    question: 'You have 4 cookies. You eat 1. What fraction did you eat?',
    hint: 'Eaten ÷ total = the fraction.',
    options: [
      { id: 'a', visual: 'pie-1-4', label: '¼', correct: true },
      { id: 'b', visual: 'pie-1-2', label: '½', correct: false },
      { id: 'c', visual: 'pie-3-4', label: '¾', correct: false },
    ],
  },
  // ---------- three-quarters ----------
  {
    question: 'Which bar shows ¾ shaded?',
    hint: 'Three-quarters = 3 out of 4.',
    options: [
      { id: 'a', visual: 'bar-1-2', label: '½ bar', correct: false },
      { id: 'b', visual: 'bar-1-4', label: '¼ bar', correct: false },
      { id: 'c', visual: 'bar-3-4', label: '¾ bar', correct: true },
    ],
  },
  {
    question: 'Which circle has ¾ filled in?',
    hint: '3 out of 4 parts should be colored.',
    options: [
      { id: 'a', visual: 'pie-3-4', label: '¾ circle', correct: true },
      { id: 'b', visual: 'pie-1-2', label: '½ circle', correct: false },
      { id: 'c', visual: 'pie-1-4', label: '¼ circle', correct: false },
    ],
  },
  {
    question: 'A square is divided into 4 equal parts. 3 parts are green. What fraction is green?',
    hint: 'Green parts ÷ total parts.',
    options: [
      { id: 'a', visual: 'bar-1-2', label: '½', correct: false },
      { id: 'b', visual: 'bar-3-4', label: '¾', correct: true },
      { id: 'c', visual: 'bar-1-4', label: '¼', correct: false },
    ],
  },
  // ---------- mixed identification ----------
  {
    question: 'Which shape shows ⅓ shaded?',
    hint: 'One-third means 1 out of 3 equal parts.',
    options: [
      { id: 'a', visual: 'bar-1-3', label: '⅓ bar', correct: true },
      { id: 'b', visual: 'bar-1-2', label: '½ bar', correct: false },
      { id: 'c', visual: 'bar-1-4', label: '¼ bar', correct: false },
    ],
  },
  {
    question: 'A flag has 3 equal stripes. 1 stripe is red. What fraction is red?',
    hint: 'Red stripe ÷ all stripes.',
    options: [
      { id: 'a', visual: 'bar-1-3', label: '⅓', correct: true },
      { id: 'b', visual: 'pie-1-2', label: '½', correct: false },
      { id: 'c', visual: 'pie-1-4', label: '¼', correct: false },
    ],
  },
  {
    question: 'Which bar shows ⅔ shaded?',
    hint: 'Two out of three parts should be filled.',
    options: [
      { id: 'a', visual: 'bar-2-3', label: '⅔ bar', correct: true },
      { id: 'b', visual: 'bar-3-4', label: '¾ bar', correct: false },
      { id: 'c', visual: 'bar-1-2', label: '½ bar', correct: false },
    ],
  },
  {
    question: '3 out of 3 parts of a pie are colored. What fraction is colored?',
    hint: 'If all parts are colored, it is the whole!',
    options: [
      { id: 'a', visual: 'pie-whole', label: '3/3 = 1 whole', correct: true },
      { id: 'b', visual: 'pie-3-4', label: '¾', correct: false },
      { id: 'c', visual: 'pie-1-2', label: '½', correct: false },
    ],
  },
  {
    question: 'Which picture shows a shape with NO parts colored (0/4)?',
    hint: 'Zero parts colored means empty!',
    options: [
      { id: 'a', visual: 'bar-0-4', label: '0/4 bar', correct: true },
      { id: 'b', visual: 'bar-1-4', label: '¼ bar', correct: false },
      { id: 'c', visual: 'bar-3-4', label: '¾ bar', correct: false },
    ],
  },
  {
    question: 'A chocolate bar has 4 pieces. You give 2 away. What fraction did you give?',
    hint: 'Given away ÷ total pieces.',
    options: [
      { id: 'a', visual: 'bar-1-4', label: '¼', correct: false },
      { id: 'b', visual: 'bar-1-2', label: '½', correct: true },
      { id: 'c', visual: 'bar-3-4', label: '¾', correct: false },
    ],
  },
  {
    question: 'Which picture shows ²⁄₄ of a shape colored?',
    hint: '²⁄₄ is the same as ½!',
    options: [
      { id: 'a', visual: 'bar-2-4', label: '2/4 bar', correct: true },
      { id: 'b', visual: 'bar-1-4', label: '1/4 bar', correct: false },
      { id: 'c', visual: 'bar-3-4', label: '3/4 bar', correct: false },
    ],
  },
  {
    question: 'A sandwich is cut into 2 pieces. Both pieces have cheese. What fraction has cheese?',
    hint: 'Both parts = 2 out of 2.',
    options: [
      { id: 'a', visual: 'pie-whole', label: '2/2 = whole', correct: true },
      { id: 'b', visual: 'pie-1-2', label: '½', correct: false },
      { id: 'c', visual: 'pie-1-4', label: '¼', correct: false },
    ],
  },
  {
    question: 'Which shape has ³⁄₃ colored (the whole thing)?',
    hint: '3 out of 3 = everything!',
    options: [
      { id: 'a', visual: 'bar-1-3', label: '⅓', correct: false },
      { id: 'b', visual: 'pie-whole', label: '3/3', correct: true },
      { id: 'c', visual: 'bar-2-3', label: '⅔', correct: false },
    ],
  },
  {
    question: 'You have 4 marbles. 3 are blue. What fraction is blue?',
    hint: 'Blue marbles ÷ total marbles.',
    options: [
      { id: 'a', visual: 'pie-3-4', label: '¾', correct: true },
      { id: 'b', visual: 'pie-1-4', label: '¼', correct: false },
      { id: 'c', visual: 'pie-1-2', label: '½', correct: false },
    ],
  },
];

// ============================================================
// LEVEL 2 — BRIDGE BUILDER
// Theme: Equivalent fractions
// Given a target fraction, pick which fraction(s) are equal.
// ============================================================
export const level2Questions = [
  {
    target: '1/2',
    instruction: 'Find a fraction equivalent to',
    options: ['2/4', '1/3', '3/8', '4/8'],
    correctAnswers: ['2/4', '4/8'],
  },
  {
    target: '1/3',
    instruction: 'Find a fraction equivalent to',
    options: ['2/6', '3/4', '3/9', '4/10'],
    correctAnswers: ['2/6', '3/9'],
  },
  {
    target: '2/4',
    instruction: 'Which fraction equals',
    options: ['1/2', '3/4', '2/8', '4/8'],
    correctAnswers: ['1/2', '4/8'],
  },
  {
    target: '3/6',
    instruction: 'Find an equivalent fraction for',
    options: ['1/2', '2/3', '6/12', '3/4'],
    correctAnswers: ['1/2', '6/12'],
  },
  {
    target: '2/3',
    instruction: 'Which fraction is the same as',
    options: ['4/6', '3/4', '6/9', '2/5'],
    correctAnswers: ['4/6', '6/9'],
  },
  {
    target: '3/4',
    instruction: 'Find a fraction that equals',
    options: ['6/8', '4/5', '9/12', '3/5'],
    correctAnswers: ['6/8', '9/12'],
  },
  {
    target: '1/4',
    instruction: 'Which fraction is equivalent to',
    options: ['2/8', '1/3', '3/12', '2/6'],
    correctAnswers: ['2/8', '3/12'],
  },
  {
    target: '2/5',
    instruction: 'Find an equivalent fraction for',
    options: ['4/10', '3/5', '6/15', '2/3'],
    correctAnswers: ['4/10', '6/15'],
  },
  {
    target: '4/8',
    instruction: 'Which fraction equals',
    options: ['1/2', '2/4', '3/6', '3/4'],
    correctAnswers: ['1/2', '2/4', '3/6'],
  },
  {
    target: '5/10',
    instruction: 'Find a fraction equivalent to',
    options: ['1/2', '2/5', '3/6', '10/20'],
    correctAnswers: ['1/2', '3/6', '10/20'],
  },
  {
    target: '2/6',
    instruction: 'Which fraction is the same as',
    options: ['1/3', '2/4', '3/9', '1/2'],
    correctAnswers: ['1/3', '3/9'],
  },
  {
    target: '6/8',
    instruction: 'Find an equivalent fraction for',
    options: ['3/4', '2/3', '9/12', '6/10'],
    correctAnswers: ['3/4', '9/12'],
  },
  {
    target: '4/6',
    instruction: 'Which fraction equals',
    options: ['2/3', '4/8', '6/9', '3/4'],
    correctAnswers: ['2/3', '6/9'],
  },
  {
    target: '3/9',
    instruction: 'Find a fraction equivalent to',
    options: ['1/3', '2/6', '3/4', '1/2'],
    correctAnswers: ['1/3', '2/6'],
  },
  {
    target: '2/8',
    instruction: 'Which fraction is the same as',
    options: ['1/4', '2/6', '3/12', '1/2'],
    correctAnswers: ['1/4', '3/12'],
  },
  {
    target: '6/12',
    instruction: 'Find an equivalent fraction for',
    options: ['1/2', '2/4', '3/4', '3/6'],
    correctAnswers: ['1/2', '2/4', '3/6'],
  },
  {
    target: '4/12',
    instruction: 'Which fraction equals',
    options: ['1/3', '2/6', '4/8', '3/9'],
    correctAnswers: ['1/3', '2/6', '3/9'],
  },
  {
    target: '10/20',
    instruction: 'Find a fraction equivalent to',
    options: ['1/2', '5/10', '2/4', '3/4'],
    correctAnswers: ['1/2', '5/10', '2/4'],
  },
  {
    target: '9/12',
    instruction: 'Which fraction is the same as',
    options: ['3/4', '6/8', '2/3', '1/2'],
    correctAnswers: ['3/4', '6/8'],
  },
  {
    target: '8/12',
    instruction: 'Find an equivalent fraction for',
    options: ['2/3', '4/6', '3/4', '6/8'],
    correctAnswers: ['2/3', '4/6'],
  },
];

// ============================================================
// LEVEL 3 — VOLCANO BATTLE
// Theme: Comparing fractions (>, <, =)
// ============================================================
export const level3Questions = [
  { f1: '1/2', f2: '1/4', correct: '>', hint: '½ is bigger than ¼. Think of pizza slices!' },
  { f1: '2/3', f2: '3/4', correct: '<', hint: '¾ is larger. 3 out of 4 beats 2 out of 3.' },
  { f1: '4/8', f2: '1/2', correct: '=', hint: '4/8 simplifies to ½. They are equal!' },
  { f1: '1/3', f2: '1/2', correct: '<', hint: '⅓ is less than ½. Half is bigger.' },
  { f1: '3/4', f2: '2/4', correct: '>', hint: '¾ is more than ²⁄₄ (½).' },
  { f1: '2/5', f2: '3/5', correct: '<', hint: 'Same bottom number – bigger top wins!' },
  { f1: '5/6', f2: '4/6', correct: '>', hint: '5 sixths beats 4 sixths.' },
  { f1: '1/4', f2: '1/3', correct: '<', hint: '¼ is smaller than ⅓. More pieces = smaller pieces!' },
  { f1: '3/6', f2: '2/4', correct: '=', hint: 'Both simplify to ½.' },
  { f1: '2/3', f2: '2/5', correct: '>', hint: 'Same top, smaller bottom = bigger fraction!' },
  { f1: '7/8', f2: '3/4', correct: '>', hint: '⅞ is more than ¾.' },
  { f1: '1/2', f2: '2/4', correct: '=', hint: '½ and ²⁄₄ are equivalent fractions.' },
  { f1: '3/8', f2: '1/2', correct: '<', hint: '⅜ is less than ½ (which is ⁴⁄₈).' },
  { f1: '5/10', f2: '3/6', correct: '=', hint: 'Both equal ½!' },
  { f1: '2/6', f2: '1/4', correct: '>', hint: '²⁄₆ = ⅓ which is bigger than ¼.' },
  { f1: '4/5', f2: '3/5', correct: '>', hint: 'Same bottom – 4 beats 3!' },
  { f1: '1/6', f2: '1/3', correct: '<', hint: '⅙ is smaller than ⅓.' },
  { f1: '3/4', f2: '6/8', correct: '=', hint: '¾ and ⁶⁄₈ are equivalent!' },
  { f1: '5/8', f2: '3/4', correct: '<', hint: '⅝ is less than ¾ (which is ⁶⁄₈).' },
  { f1: '2/3', f2: '4/6', correct: '=', hint: '⅔ and ⁴⁄₆ are equivalent fractions.' },
  { f1: '7/10', f2: '1/2', correct: '>', hint: '⁷⁄₁₀ is bigger than ⁵⁄₁₀ (½).' },
  { f1: '1/5', f2: '1/4', correct: '<', hint: '⅕ is smaller than ¼.' },
  { f1: '3/5', f2: '2/3', correct: '<', hint: '⅗ = 0.6 and ⅔ ≈ 0.67.' },
  { f1: '4/4', f2: '1/1', correct: '=', hint: 'Both equal 1 whole!' },
  { f1: '6/10', f2: '3/5', correct: '=', hint: '⁶⁄₁₀ simplifies to ³⁄₅.' },
  { f1: '2/8', f2: '1/4', correct: '=', hint: '²⁄₈ simplifies to ¼.' },
  { f1: '5/6', f2: '7/8', correct: '<', hint: '⅞ is closer to 1 whole than ⅚.' },
  { f1: '3/3', f2: '2/2', correct: '=', hint: 'Both equal 1 whole!' },
  { f1: '1/8', f2: '1/4', correct: '<', hint: '⅛ is tiny! ¼ is bigger.' },
  { f1: '4/6', f2: '3/4', correct: '<', hint: '⁴⁄₆ = ⅔ which is less than ¾.' },
];

// ============================================================
// Image mappings per level for thematic images
// ============================================================
export const levelImages = {
  level1: {
    theme: 'half-hill',       // Half Hill — Beach Landing
    secondary: 'quarter-beach', // Quarter Beach
  },
  level2: {
    theme: 'fraction-bridge', // Fraction Bridge
    secondary: 'third-treehouse', // Third Treehouse
  },
  level3: {
    theme: 'understand-fractions', // Understand Fractions
    secondary: 'collect-coins', // Collect Coins
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

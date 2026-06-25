// ============================================================
// FRACTION ISLAND — STORY SCENES DATA
//
// Each scene corresponds to one of the provided story images.
// Hotspots define clickable interactive areas positioned over
// elements in the images (as percentages for responsiveness).
// ============================================================

import fractionIslandCover from '../assets/fraction-island-cover.jpeg';
import understandFractions from '../assets/understand-fractions.jpeg';
import halfHill from '../assets/half-hill.jpeg';
import thirdTreehouse from '../assets/third-treehouse.jpeg';
import quarterBeach from '../assets/quarter-beach.jpeg';
import collectCoins from '../assets/collect-coins.jpeg';
import fractionBridge from '../assets/fraction-bridge.jpeg';
import missionComplete from '../assets/mission-complete.jpeg';

/**
 * Hotspot effect types:
 *  - 'pop'      → scales up, bursts into particles, disappears
 *  - 'collect'  → coin flies to HUD counter
 *  - 'bounce'   → character bounces and shows speech bubble
 *  - 'glow'     → golden glow pulse
 *  - 'shake'    → wiggles side to side
 *  - 'splash'   → ripple effect
 *  - 'flip'     → 3D flip reveal
 *  - 'open'     → treasure chest opening
 *  - 'firework' → sparkle burst
 */

export const storyScenes = [
  // ============================
  // SCENE 0: Fraction Island Cover (Intro)
  // ============================
  {
    id: 'cover',
    image: fractionIslandCover,
    title: 'The Adventures on Fraction Island!',
    narration: [
      { character: '📖', name: 'Narrator', text: 'Welcome to Fraction Island! A mysterious land where fractions hold the key to treasure!' },
      { character: '🏴‍☠️', name: 'Captain Blackbeard', text: '"Arrr! I\'ve hidden me treasure somewhere on this island. Only a true fraction explorer can find it!"' },
      { character: '📖', name: 'Narrator', text: 'Explore the island, make monster friends, and collect fraction coins. Tap on everything you see!' },
    ],
    hotspots: [
      {
        id: 'cover-compass',
        x: 5, y: 3, width: 10, height: 10,
        emoji: '🧭',
        effect: 'glow',
        dialogue: 'A magical compass! It points toward the treasure...',
        particles: ['✨', '⭐', '💫'],
        reward: { type: 'xp', amount: 5 },
      },
      {
        id: 'cover-treasure',
        x: 72, y: 72, width: 16, height: 20,
        emoji: '💰',
        effect: 'glow',
        dialogue: 'The legendary treasure chest! But it\'s locked... you\'ll need all the fraction coins!',
        particles: ['🪙', '✨', '💎'],
        reward: { type: 'coins', amount: 5 },
      },
      {
        id: 'cover-blue-monster',
        x: 38, y: 48, width: 12, height: 18,
        emoji: '💙',
        effect: 'bounce',
        dialogue: 'Hi! I\'m Thirdy! I love ⅓ fractions! Let\'s be friends!',
        particles: ['💙', '⅓', '✨'],
        reward: { type: 'friend', name: 'Thirdy' },
      },
      {
        id: 'cover-purple-monster',
        x: 60, y: 28, width: 14, height: 22,
        emoji: '💜',
        effect: 'bounce',
        dialogue: 'Halves Help! I\'m Halvey — I know everything about ½!',
        particles: ['💜', '½', '✨'],
        reward: { type: 'friend', name: 'Halvey' },
      },
      {
        id: 'cover-orange-monster',
        x: 52, y: 52, width: 12, height: 16,
        emoji: '🧡',
        effect: 'bounce',
        dialogue: 'Thirds are terrific! I\'m Tango!',
        particles: ['🧡', '⅓', '✨'],
        reward: { type: 'friend', name: 'Tango' },
      },
      {
        id: 'cover-green-monster',
        x: 68, y: 55, width: 10, height: 14,
        emoji: '💚',
        effect: 'bounce',
        dialogue: 'Quarters rock! I\'m Quarty! ¼ is my favorite!',
        particles: ['💚', '¼', '✨'],
        reward: { type: 'friend', name: 'Quarty' },
      },
      {
        id: 'cover-map',
        x: 25, y: 62, width: 22, height: 25,
        emoji: '🗺️',
        effect: 'flip',
        dialogue: 'The treasure map! It shows: Equivalent Cove → Half Hill → Third Treehouse → Quarter Beach → Whole Valley!',
        particles: ['🗺️', '✨', '⭐'],
        reward: { type: 'map', amount: 1 },
      },
    ],
    requiredHotspots: ['cover-map'],
    challenge: null,
  },

  // ============================
  // SCENE 1: Understand Fractions (Learning)
  // ============================
  {
    id: 'understand',
    image: understandFractions,
    title: 'Understanding Fractions',
    narration: [
      { character: '📖', name: 'Narrator', text: 'Before you explore, you need to understand fractions — equal parts of a whole!' },
      { character: '🍕', name: 'Pizza Guide', text: '"Look at these pizzas! A WHOLE pizza, then cut into halves, thirds, and quarters!"' },
      { character: '📖', name: 'Narrator', text: 'Tap each pizza to see how fractions work! Then solve the fraction challenge.' },
    ],
    hotspots: [
      {
        id: 'understand-whole',
        x: 18, y: 75, width: 12, height: 14,
        emoji: '🍕',
        effect: 'pop',
        dialogue: '1 WHOLE pizza! Not cut at all. That\'s 1/1!',
        particles: ['🍕', '1️⃣', '✨'],
        reward: { type: 'xp', amount: 5 },
      },
      {
        id: 'understand-half',
        x: 33, y: 75, width: 12, height: 14,
        emoji: '🍕',
        effect: 'pop',
        dialogue: 'Cut into 2 EQUAL pieces = ½! Each piece is one half!',
        particles: ['½', '🍕', '✨'],
        reward: { type: 'xp', amount: 5 },
      },
      {
        id: 'understand-third',
        x: 48, y: 75, width: 12, height: 14,
        emoji: '🍕',
        effect: 'pop',
        dialogue: 'Cut into 3 EQUAL pieces = ⅓! Each piece is one third!',
        particles: ['⅓', '🍕', '✨'],
        reward: { type: 'xp', amount: 5 },
      },
      {
        id: 'understand-quarter',
        x: 63, y: 75, width: 12, height: 14,
        emoji: '🍕',
        effect: 'pop',
        dialogue: 'Cut into 4 EQUAL pieces = ¼! Each piece is one quarter!',
        particles: ['¼', '🍕', '✨'],
        reward: { type: 'xp', amount: 5 },
      },
      {
        id: 'understand-tango',
        x: 38, y: 35, width: 12, height: 18,
        emoji: '🧡',
        effect: 'bounce',
        dialogue: 'I\'m the ⅓ monster! Thirds are TERRIFIC!',
        particles: ['⅓', '🧡', '✨'],
        reward: { type: 'friend', name: 'Tango' },
      },
      {
        id: 'understand-halvey',
        x: 76, y: 15, width: 12, height: 16,
        emoji: '💜',
        effect: 'bounce',
        dialogue: 'I already taught you about halves! ½ = 1 out of 2 equal parts!',
        particles: ['½', '💜', '✨'],
        reward: { type: 'friend', name: 'Halvey' },
      },
    ],
    requiredHotspots: ['understand-whole', 'understand-half', 'understand-third', 'understand-quarter'],
    challenge: {
      type: 'level1',
      questionCount: 2,
      intro: 'Now that you understand fractions, let\'s test your knowledge!',
    },
  },

  // ============================
  // SCENE 2: Half Hill
  // ============================
  {
    id: 'half-hill',
    image: halfHill,
    title: 'Welcome to Half Hill!',
    narration: [
      { character: '📖', name: 'Narrator', text: 'You\'ve reached Half Hill! The ½ coin glows at the top of the hill!' },
      { character: '💜', name: 'Halvey', text: '"Find the half! You\'re halfway there! Climb the hill and grab the ½ coin!"' },
      { character: '📖', name: 'Narrator', text: 'Tap on the glowing coin, the map, and meet Halvey the monster!' },
    ],
    hotspots: [
      {
        id: 'half-coin',
        x: 55, y: 5, width: 14, height: 14,
        emoji: '🪙',
        effect: 'collect',
        dialogue: 'You found the ½ coin! Half means 1 out of 2 equal parts!',
        particles: ['🪙', '½', '✨', '⭐'],
        reward: { type: 'coins', amount: 10 },
      },
      {
        id: 'half-monster',
        x: 68, y: 30, width: 20, height: 35,
        emoji: '💜',
        effect: 'bounce',
        dialogue: 'Halvey says: "You found Half Hill! ½ is my favorite number! Halves help!"',
        particles: ['💜', '½', '❤️'],
        reward: { type: 'friend', name: 'Halvey' },
      },
      {
        id: 'half-map',
        x: 18, y: 55, width: 22, height: 28,
        emoji: '🗺️',
        effect: 'flip',
        dialogue: 'The map shows Half Hill marked with an X! One map piece found!',
        particles: ['🗺️', '✨', '⭐'],
        reward: { type: 'map', amount: 1 },
      },
      {
        id: 'half-waterfall',
        x: 42, y: 40, width: 12, height: 20,
        emoji: '💧',
        effect: 'splash',
        dialogue: 'Splash! The waterfall hides a secret passage...',
        particles: ['💧', '🌊', '💦'],
        reward: { type: 'xp', amount: 5 },
      },
      {
        id: 'half-sign',
        x: 72, y: 65, width: 16, height: 12,
        emoji: '🪧',
        effect: 'shake',
        dialogue: '"You found HALF HILL!" — the sign reads.',
        particles: ['✨', '½', '⭐'],
        reward: { type: 'xp', amount: 3 },
      },
    ],
    requiredHotspots: ['half-coin', 'half-map'],
    challenge: {
      type: 'level1',
      questionCount: 2,
      intro: 'Halvey challenges you! Can you identify these fractions?',
    },
  },

  // ============================
  // SCENE 3: Third Treehouse
  // ============================
  {
    id: 'third-treehouse',
    image: thirdTreehouse,
    title: 'Welcome to Third Treehouse!',
    narration: [
      { character: '📖', name: 'Narrator', text: 'Deep in the jungle, the ⅓ coins dangle from the magical treehouses!' },
      { character: '🧡', name: 'Tango', text: '"Find the thirds! You\'re one third of the way there! Thirds are TERRIFIC!"' },
      { character: '📖', name: 'Narrator', text: 'Click the coins, explore the treehouses, and befriend Tango!' },
    ],
    hotspots: [
      {
        id: 'third-coin-1',
        x: 42, y: 15, width: 12, height: 12,
        emoji: '🪙',
        effect: 'collect',
        dialogue: 'A ⅓ coin! One third means 1 out of 3 equal parts!',
        particles: ['🪙', '⅓', '✨'],
        reward: { type: 'coins', amount: 10 },
      },
      {
        id: 'third-coin-2',
        x: 68, y: 18, width: 10, height: 10,
        emoji: '🪙',
        effect: 'collect',
        dialogue: 'Another ⅓ coin! You\'re collecting thirds!',
        particles: ['🪙', '⅓', '⭐'],
        reward: { type: 'coins', amount: 10 },
      },
      {
        id: 'third-tango',
        x: 63, y: 48, width: 20, height: 30,
        emoji: '🧡',
        effect: 'bounce',
        dialogue: 'Tango roars with joy: "THIRDS ARE TERRIFIC! You found my treehouse!"',
        particles: ['🧡', '⅓', '💪'],
        reward: { type: 'friend', name: 'Tango' },
      },
      {
        id: 'third-treehouse-top',
        x: 35, y: 8, width: 25, height: 22,
        emoji: '🏡',
        effect: 'glow',
        dialogue: 'The magical treehouse glows! Blackbeard once used this as his lookout tower!',
        particles: ['✨', '🏠', '⭐'],
        reward: { type: 'xp', amount: 8 },
      },
      {
        id: 'third-parrot',
        x: 8, y: 22, width: 10, height: 12,
        emoji: '🦜',
        effect: 'shake',
        dialogue: 'SQUAWK! "⅓ means one out of three equal parts!" SQUAWK!',
        particles: ['🦜', '⅓', '✨'],
        reward: { type: 'xp', amount: 5 },
      },
      {
        id: 'third-map',
        x: 15, y: 60, width: 18, height: 22,
        emoji: '🗺️',
        effect: 'flip',
        dialogue: 'Another map fragment! It shows the path from Third Treehouse to Quarter Beach!',
        particles: ['🗺️', '✨', '⭐'],
        reward: { type: 'map', amount: 1 },
      },
    ],
    requiredHotspots: ['third-coin-1', 'third-coin-2', 'third-map'],
    challenge: {
      type: 'level1',
      questionCount: 2,
      intro: 'Tango has a challenge! Prove you understand thirds!',
    },
  },

  // ============================
  // SCENE 4: Quarter Beach
  // ============================
  {
    id: 'quarter-beach',
    image: quarterBeach,
    title: 'Welcome to Quarter Beach!',
    narration: [
      { character: '📖', name: 'Narrator', text: 'The golden sands of Quarter Beach shimmer with hidden ¼ coins!' },
      { character: '💜', name: 'Quarty', text: '"Find the quarters! You\'re one quarter of the way to the treasure! Quarters ROCK!"' },
      { character: '📖', name: 'Narrator', text: 'Dig in the sand, open shells, and explore the beach!' },
    ],
    hotspots: [
      {
        id: 'quarter-coin-1',
        x: 43, y: 5, width: 11, height: 11,
        emoji: '🪙',
        effect: 'collect',
        dialogue: 'A ¼ coin from the sky! Quarter means 1 out of 4 equal parts!',
        particles: ['🪙', '¼', '✨'],
        reward: { type: 'coins', amount: 10 },
      },
      {
        id: 'quarter-shell-coin',
        x: 15, y: 75, width: 14, height: 14,
        emoji: '🐚',
        effect: 'pop',
        dialogue: 'POP! A ¼ coin was hiding inside the shell!',
        particles: ['🐚', '🪙', '¼', '✨'],
        reward: { type: 'coins', amount: 10 },
      },
      {
        id: 'quarter-treasure',
        x: 42, y: 60, width: 16, height: 16,
        emoji: '💎',
        effect: 'glow',
        dialogue: 'A mini treasure chest full of ¼ coins!',
        particles: ['💎', '🪙', '✨', '⭐'],
        reward: { type: 'coins', amount: 15 },
      },
      {
        id: 'quarter-quarty',
        x: 66, y: 32, width: 22, height: 38,
        emoji: '💜',
        effect: 'bounce',
        dialogue: 'Quarty cheers: "Quarters ROCK! ¼ is one of the most useful fractions!"',
        particles: ['💜', '¼', '🎉'],
        reward: { type: 'friend', name: 'Quarty' },
      },
      {
        id: 'quarter-lighthouse',
        x: 62, y: 2, width: 12, height: 22,
        emoji: '🗼',
        effect: 'glow',
        dialogue: 'The lighthouse shines its beam toward the Fraction Bridge!',
        particles: ['✨', '💡', '⭐'],
        reward: { type: 'xp', amount: 5 },
      },
      {
        id: 'quarter-starfish',
        x: 52, y: 82, width: 8, height: 8,
        emoji: '⭐',
        effect: 'pop',
        dialogue: 'POP! A starfish! It has exactly 5 arms — that\'s ⅕ per arm!',
        particles: ['⭐', '✨', '🌟'],
        reward: { type: 'xp', amount: 3 },
      },
    ],
    requiredHotspots: ['quarter-coin-1', 'quarter-shell-coin', 'quarter-treasure'],
    challenge: {
      type: 'level1',
      questionCount: 2,
      intro: 'Quarty challenges you with quarter fractions!',
    },
  },

  // ============================
  // SCENE 5: Collect the Fraction Coins
  // ============================
  {
    id: 'collect-coins',
    image: collectCoins,
    title: 'Mission: Collect the Fraction Coins!',
    narration: [
      { character: '📖', name: 'Narrator', text: 'The monster friends have scattered fraction coins along the island path!' },
      { character: '💚', name: 'Green Monster', text: '"Look! A coin! Work together to find them all and build your collection!"' },
      { character: '📖', name: 'Narrator', text: 'Tap every coin on the path! Each one teaches you a different fraction.' },
    ],
    hotspots: [
      {
        id: 'collect-quarter-coin',
        x: 42, y: 68, width: 10, height: 10,
        emoji: '🪙',
        effect: 'collect',
        dialogue: '¼ coin collected! One quarter!',
        particles: ['🪙', '¼', '✨'],
        reward: { type: 'coins', amount: 10 },
      },
      {
        id: 'collect-twothirds-coin',
        x: 55, y: 72, width: 10, height: 10,
        emoji: '🪙',
        effect: 'collect',
        dialogue: '⅔ coin! Two out of three parts!',
        particles: ['🪙', '⅔', '✨'],
        reward: { type: 'coins', amount: 10 },
      },
      {
        id: 'collect-half-coin',
        x: 62, y: 48, width: 10, height: 10,
        emoji: '🪙',
        effect: 'collect',
        dialogue: '½ coin! That\'s one half!',
        particles: ['🪙', '½', '✨'],
        reward: { type: 'coins', amount: 10 },
      },
      {
        id: 'collect-threequarter-coin',
        x: 45, y: 35, width: 10, height: 10,
        emoji: '🪙',
        effect: 'collect',
        dialogue: '¾ coin found! Three quarters!',
        particles: ['🪙', '¾', '⭐'],
        reward: { type: 'coins', amount: 10 },
      },
      {
        id: 'collect-twofifths-coin',
        x: 58, y: 18, width: 10, height: 10,
        emoji: '🪙',
        effect: 'collect',
        dialogue: '⅖ coin! Two out of five!',
        particles: ['🪙', '⅖', '✨'],
        reward: { type: 'coins', amount: 10 },
      },
      {
        id: 'collect-blue-monster',
        x: 8, y: 42, width: 16, height: 25,
        emoji: '💙',
        effect: 'bounce',
        dialogue: 'Blue Monster says: "Great find! Keep going!"',
        particles: ['💙', '✨', '🎉'],
        reward: { type: 'friend', name: 'Thirdy' },
      },
      {
        id: 'collect-pink-monster',
        x: 65, y: 55, width: 14, height: 20,
        emoji: '💗',
        effect: 'bounce',
        dialogue: 'Pink Monster says: "Nice! That\'s one half!"',
        particles: ['💗', '½', '✨'],
        reward: { type: 'friend', name: 'Pinky' },
      },
      {
        id: 'collect-purple-monster',
        x: 40, y: 18, width: 12, height: 18,
        emoji: '💜',
        effect: 'bounce',
        dialogue: 'Purple Monster says: "Great find! Keep going!"',
        particles: ['💜', '✨', '🎉'],
        reward: { type: 'friend', name: 'Halvey' },
      },
    ],
    requiredHotspots: ['collect-quarter-coin', 'collect-twothirds-coin', 'collect-half-coin', 'collect-threequarter-coin', 'collect-twofifths-coin'],
    challenge: {
      type: 'level2',
      questionCount: 2,
      intro: 'Can you find the EQUIVALENT fractions? Match the fraction twins!',
    },
  },

  // ============================
  // SCENE 6: Across the Fraction Bridge
  // ============================
  {
    id: 'fraction-bridge',
    image: fractionBridge,
    title: 'Across the Fraction Bridge!',
    narration: [
      { character: '📖', name: 'Narrator', text: 'The Fraction Bridge stretches across a mighty waterfall! Each stone has a fraction!' },
      { character: '🧡', name: 'Tango', text: '"Use what you know to cross the bridge and find the treasure! Match equivalent fractions!"' },
      { character: '📖', name: 'Narrator', text: 'Tap the bridge stones, collect the floating coins, and cross to the other side!' },
    ],
    hotspots: [
      {
        id: 'bridge-stone-1',
        x: 20, y: 65, width: 14, height: 12,
        emoji: '🪨',
        effect: 'glow',
        dialogue: 'Bridge stone shows ²⁄₁! Step carefully!',
        particles: ['🪨', '✨', '⭐'],
        reward: { type: 'xp', amount: 5 },
      },
      {
        id: 'bridge-stone-2',
        x: 33, y: 58, width: 14, height: 12,
        emoji: '🪨',
        effect: 'glow',
        dialogue: 'This stone shows ³⁄₁! The bridge holds!',
        particles: ['🪨', '✨', '⭐'],
        reward: { type: 'xp', amount: 5 },
      },
      {
        id: 'bridge-coin-half',
        x: 32, y: 12, width: 10, height: 10,
        emoji: '🪙',
        effect: 'collect',
        dialogue: 'A ½ coin floating above the bridge!',
        particles: ['🪙', '½', '✨'],
        reward: { type: 'coins', amount: 15 },
      },
      {
        id: 'bridge-coin-third',
        x: 22, y: 8, width: 10, height: 10,
        emoji: '🪙',
        effect: 'collect',
        dialogue: 'A ⅓ coin sparkles in the mist!',
        particles: ['🪙', '⅓', '✨'],
        reward: { type: 'coins', amount: 15 },
      },
      {
        id: 'bridge-coin-quarter',
        x: 72, y: 8, width: 10, height: 10,
        emoji: '🪙',
        effect: 'collect',
        dialogue: 'A ¼ coin near the treasure side!',
        particles: ['🪙', '¼', '✨'],
        reward: { type: 'coins', amount: 15 },
      },
      {
        id: 'bridge-tango',
        x: 42, y: 35, width: 18, height: 25,
        emoji: '🧡',
        effect: 'bounce',
        dialogue: 'Tango shouts: "You\'re crossing the bridge! Keep learning!"',
        particles: ['🧡', '✨', '🌉'],
        reward: { type: 'friend', name: 'Tango' },
      },
      {
        id: 'bridge-green',
        x: 55, y: 40, width: 12, height: 18,
        emoji: '💚',
        effect: 'bounce',
        dialogue: 'Green monster: "Almost there! The treasure awaits!"',
        particles: ['💚', '✨', '💎'],
        reward: { type: 'friend', name: 'Quarty' },
      },
      {
        id: 'bridge-treasure-glow',
        x: 80, y: 15, width: 12, height: 15,
        emoji: '💎',
        effect: 'glow',
        dialogue: 'The treasure chest glows on the other side of the bridge!',
        particles: ['💎', '✨', '🪙', '⭐'],
        reward: { type: 'map', amount: 1 },
      },
    ],
    requiredHotspots: ['bridge-coin-half', 'bridge-coin-third', 'bridge-coin-quarter', 'bridge-treasure-glow'],
    challenge: {
      type: 'level2',
      questionCount: 3,
      intro: 'Build the bridge with equivalent fractions! Match each stone to its twin!',
    },
  },

  // ============================
  // SCENE 7: Mission Complete!
  // ============================
  {
    id: 'mission-complete',
    image: missionComplete,
    title: 'Mission Complete!',
    narration: [
      { character: '📖', name: 'Narrator', text: 'YOU DID IT! You found every fraction, solved every clue, and reached 1 WHOLE!' },
      { character: '🏴‍☠️', name: 'Captain Blackbeard', text: '"Incredible, explorer! You solved every fraction mystery! The treasure is YOURS!"' },
      { character: '📖', name: 'Narrator', text: 'Tap the treasure chest to claim your reward! Fraction Explorers Forever!' },
    ],
    hotspots: [
      {
        id: 'mission-treasure',
        x: 32, y: 45, width: 25, height: 30,
        emoji: '💎',
        effect: 'open',
        dialogue: 'THE TREASURE IS YOURS! You\'re a true Fraction Master!',
        particles: ['💎', '🪙', '✨', '⭐', '🌟', '💰', '👑'],
        reward: { type: 'coins', amount: 50 },
      },
      {
        id: 'mission-whole-coin',
        x: 40, y: 5, width: 16, height: 16,
        emoji: '🪙',
        effect: 'collect',
        dialogue: '1 WHOLE! All fractions combined equal ONE! ½ + ⅓ + ¼ = The treasure!',
        particles: ['🪙', '1️⃣', '✨', '⭐', '🌟'],
        reward: { type: 'coins', amount: 25 },
      },
      {
        id: 'mission-orange',
        x: 10, y: 40, width: 15, height: 25,
        emoji: '🧡',
        effect: 'bounce',
        dialogue: 'The ½ monster celebrates with you! "TEAMWORK makes the dream work!"',
        particles: ['🧡', '½', '🎉', '✨'],
        reward: { type: 'friend', name: 'Halvey Jr' },
      },
      {
        id: 'mission-green',
        x: 72, y: 40, width: 14, height: 22,
        emoji: '💚',
        effect: 'bounce',
        dialogue: 'The ⅓ monster dances! "Fractions make everything WHOLE!"',
        particles: ['💚', '⅓', '🎉', '✨'],
        reward: { type: 'friend', name: 'Treecko' },
      },
      {
        id: 'mission-purple',
        x: 82, y: 50, width: 12, height: 18,
        emoji: '💜',
        effect: 'bounce',
        dialogue: 'The ¼ monster cheers! "You did it! Fraction Explorers Forever!"',
        particles: ['💜', '¼', '🎉', '✨'],
        reward: { type: 'friend', name: 'Quarty' },
      },
      {
        id: 'mission-banner',
        x: 60, y: 5, width: 28, height: 18,
        emoji: '🏆',
        effect: 'firework',
        dialogue: 'YOU DID IT! FRACTION EXPLORERS FOREVER!',
        particles: ['🎆', '🎇', '✨', '⭐', '🌟', '🎉'],
        reward: { type: 'xp', amount: 50 },
      },
      {
        id: 'mission-fireworks',
        x: 52, y: 2, width: 8, height: 8,
        emoji: '🎆',
        effect: 'firework',
        dialogue: 'BOOM! Fireworks light up the sky!',
        particles: ['🎆', '🎇', '✨', '⭐'],
        reward: { type: 'xp', amount: 10 },
      },
    ],
    requiredHotspots: ['mission-treasure', 'mission-whole-coin'],
    challenge: {
      type: 'level3',
      questionCount: 3,
      intro: 'One final challenge! Compare fractions to prove you\'re a true Fraction Master!',
    },
  },
];

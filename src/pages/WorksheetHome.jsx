import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import intelliaLogo from '../assets/intellia-logo.jpeg';

/* ─── tiny helpers ─────────────────────────────────────────── */
const px = (n) => `${n}px`;
const GREEN = '#2D6A4F';
const GOLD  = '#E9C46A';
const CORAL = '#E76F51';
const OCEAN = '#219EBC';
const PURPLE = '#7B2D8E';

/* ─── Section header shared component ──────────────────────── */
function SectionHeader({ num, emoji, title, score, maxScore }) {
  return (
    <div style={{
      borderBottom: `4px solid ${GREEN}`,
      paddingBottom: '0.6rem',
      marginBottom: '1.4rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
    }}>
      <h2 style={{
        fontFamily: 'var(--font-heading)',
        fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)',
        color: '#1B4332',
      }}>
        {num}. {emoji} {title}
      </h2>
      <div style={{
        fontSize: '0.85rem',
        fontWeight: 700,
        border: `2px solid ${GREEN}`,
        padding: '0.3rem 0.7rem',
        borderRadius: 6,
        minWidth: 90,
        textAlign: 'center',
        background: '#F0F9FF',
      }}>
        Score: {score}/{maxScore}
      </div>
    </div>
  );
}

/* ─── Page wrapper shared component ────────────────────────── */
function Page({ children, style = {} }) {
  return (
    <div className="print-page" style={{
      padding: '2.5rem 3rem',
      minHeight: '10.5in',
      position: 'relative',
      background: 'white',
      borderTop: '1px solid #e5e7eb',
      ...style,
    }}>
      {children}
      <PageFooter />
    </div>
  );
}

function PageFooter() {
  return (
    <div style={{
      position: 'absolute',
      bottom: 16, left: 0, width: '100%',
      textAlign: 'center',
      fontSize: '0.75rem',
      fontWeight: 700,
      color: '#9CA3AF',
      fontFamily: 'var(--font-fun)',
    }}>
      ⛵ Powered by Intellia 360 – "Every Fraction Unlocks a New Treasure!" 🏴‍☠️
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   CLICKABLE FRACTION SHAPE — pie circle
═══════════════════════════════════════════════════════════════ */
function ClickablePie({ parts, filledCount, filled, onToggle, size = 140 }) {
  const svgSize = size;
  const cx = svgSize / 2, cy = svgSize / 2, r = svgSize / 2 - 4;

  const slices = [];
  for (let i = 0; i < parts; i++) {
    const startAngle = (i / parts) * 2 * Math.PI - Math.PI / 2;
    const endAngle   = ((i + 1) / parts) * 2 * Math.PI - Math.PI / 2;
    const x1 = cx + r * Math.cos(startAngle);
    const y1 = cy + r * Math.sin(startAngle);
    const x2 = cx + r * Math.cos(endAngle);
    const y2 = cy + r * Math.sin(endAngle);
    const largeArc = parts === 1 ? 1 : 0;
    const d = `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2} Z`;
    slices.push({ d, i });
  }

  return (
    <svg width={svgSize} height={svgSize} style={{ display: 'block', cursor: 'pointer' }}>
      <circle cx={cx} cy={cy} r={r} fill="white" stroke={GREEN} strokeWidth={3} />
      {slices.map(({ d, i }) => (
        <path
          key={i}
          d={d}
          fill={filled[i] ? OCEAN : 'white'}
          stroke={GREEN}
          strokeWidth={2}
          onClick={() => onToggle(i)}
          style={{ cursor: 'pointer', transition: 'fill 0.2s' }}
        />
      ))}
    </svg>
  );
}

/* ─── Clickable Bar ──────────────────────────────────────────── */
function ClickableBar({ parts, filled, onToggle, width = 200, height = 55 }) {
  const cellW = width / parts;
  return (
    <svg width={width} height={height} style={{ display: 'block', cursor: 'pointer' }}>
      <rect x={0} y={0} width={width} height={height} fill="white" stroke={GREEN} strokeWidth={3} rx={6} />
      {Array.from({ length: parts }).map((_, i) => (
        <rect
          key={i}
          x={i * cellW + 1.5}
          y={1.5}
          width={cellW - 3}
          height={height - 3}
          rx={i === 0 ? 5 : (i === parts - 1 ? 5 : 0)}
          fill={filled[i] ? OCEAN : 'white'}
          stroke={GREEN}
          strokeWidth={1}
          onClick={() => onToggle(i)}
          style={{ cursor: 'pointer', transition: 'fill 0.2s' }}
        />
      ))}
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════════════════════════ */
function WorksheetHome() {
  // ── Profile ──────────────────────────────────────────────────
  const [name, setName] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  // ── Section 1 (Page 2) — Fraction Map Challenge ───────────────
  // 4 shapes: (a) color ½ pie [2 parts], (b) color ¾ square [4 parts],
  //           (c) identify bar 2/4, (d) identify square 1/3
  const [s1a, setS1a] = useState(Array(2).fill(false));
  const [s1b, setS1b] = useState(Array(4).fill(false));
  const [s1c, setS1c] = useState('');
  const [s1d, setS1d] = useState('');
  const [s1Checked, setS1Checked] = useState(false);

  const s1Score = (() => {
    let sc = 0;
    if (s1a.filter(Boolean).length === 1) sc++;
    if (s1b.filter(Boolean).length === 3) sc++;
    if (s1c.replace(/\s/g, '') === '2/4' || s1c.replace(/\s/g, '') === '1/2') sc++;
    if (s1d.replace(/\s/g, '') === '1/3') sc++;
    return sc;
  })();

  // ── Section 2 (Page 3) — Treasure Hunt matching ──────────────
  const matchLeft  = ['1/3', '4/5', '5/8', '1/4'];
  const matchRight = [
    { id: 'A', text: '4 out of 5 gems are red 💎' },
    { id: 'B', text: '1 out of 4 coins is gold 🪙' },
    { id: 'C', text: '1 out of 3 swords is silver ⚔️' },
    { id: 'D', text: '5 out of 8 pearls are black 🖤' },
  ];
  const correctMatch = { '1/3': 'C', '4/5': 'A', '5/8': 'D', '1/4': 'B' };
  const [matchAnswers, setMatchAnswers] = useState({ '1/3': '', '4/5': '', '5/8': '', '1/4': '' });
  const [s2Checked, setS2Checked] = useState(false);
  const s2Score = matchLeft.filter(f => matchAnswers[f] === correctMatch[f]).length;

  // ── Section 3 (Page 4) — Numerator vs Denominator Battle ────
  const numDenQ = [
    { frac: '3/5',  numAns: '3', denAns: '5'  },
    { frac: '7/8',  numAns: '7', denAns: '8'  },
    { frac: '2/9',  numAns: '2', denAns: '9'  },
    { frac: '5/12', numAns: '5', denAns: '12' },
    { frac: '11/4', numAns: '11', denAns: '4' },
  ];
  const [s3Inputs, setS3Inputs] = useState(numDenQ.map(() => ({ num: '', den: '' })));
  const [s3Checked, setS3Checked] = useState(false);
  const s3Score = s3Inputs.reduce((acc, inp, i) => {
    let pts = 0;
    if (inp.num.trim() === numDenQ[i].numAns) pts++;
    if (inp.den.trim() === numDenQ[i].denAns) pts++;
    return acc + pts;
  }, 0);

  // ── Section 4 (Page 5) — Fraction Monster Maze ──────────────
  const mazeQ = [
    { q: 'What fraction of the circle is shaded?', img: '2-parts, 1 filled', opts: ['1/4', '1/2', '3/4', '1/3'], ans: 1 },
    { q: 'A pizza has 8 slices. Sam ate 3. What fraction did Sam eat?', opts: ['3/5', '5/8', '3/8', '1/3'], ans: 2 },
    { q: 'Which fraction is bigger: ½ or ¼?', opts: ['1/4', '1/2', 'Equal', 'Cannot tell'], ans: 1 },
    { q: 'What is ²⁄₄ simplified?', opts: ['2/4', '1/2', '1/4', '3/4'], ans: 1 },
    { q: 'There are 5 balloons. 2 are red. What fraction is red?', opts: ['3/5', '2/3', '2/5', '5/2'], ans: 2 },
    { q: 'Which of these equals ⅓?', opts: ['2/9', '2/6', '3/9', '4/12'], ans: 1 },
  ];
  const [s4Answers, setS4Answers] = useState(Array(mazeQ.length).fill(null));
  const [s4Checked, setS4Checked] = useState(false);
  const s4Score = s4Answers.reduce((acc, a, i) => acc + (a === mazeQ[i].ans ? 1 : 0), 0);

  // ── Section 5 (Page 6) — Pizza Kingdom ──────────────────────
  const [pizza1, setPizza1] = useState(Array(8).fill(false));
  const [pizza2, setPizza2] = useState(Array(6).fill(false));
  const [pizza3, setPizza3] = useState(Array(4).fill(false));
  const [pizzaAns, setPizzaAns] = useState(['', '', '']);
  const [s5Checked, setS5Checked] = useState(false);
  const pizzaGoals = [
    { parts: 8, goal: 3, label: 'Color 3/8 of the pizza 🍕' },
    { parts: 6, goal: 4, label: 'Color 4/6 of the pizza 🍕' },
    { parts: 4, goal: 1, label: 'Color 1/4 of the pizza 🍕' },
  ];
  const pizzaStates = [pizza1, pizza2, pizza3];
  const pizzaSetters = [setPizza1, setPizza2, setPizza3];
  const s5Score = (() => {
    let sc = 0;
    [pizza1, pizza2, pizza3].forEach((p, i) => { if (p.filter(Boolean).length === pizzaGoals[i].goal) sc++; });
    if (pizzaAns[0].replace(/\s/g,'') === '3/8') sc++;
    if (pizzaAns[1].replace(/\s/g,'') === '4/6' || pizzaAns[1].replace(/\s/g,'') === '2/3') sc++;
    if (pizzaAns[2].replace(/\s/g,'') === '1/4') sc++;
    return sc;
  })();

  // ── Section 6 (Page 7) — Equivalent Fraction Bridge ─────────
  const equivQ = [
    { given: '1/2 = __/4', template: '1/2 = ?/4', ans: '2' },
    { given: '2/3 = __/9', template: '2/3 = ?/9', ans: '6' },
    { given: '3/4 = 9/__', template: '3/4 = 9/?', ans: '12' },
    { given: '1/5 = 2/__', template: '1/5 = 2/?', ans: '10' },
    { given: '4/6 = __/3', template: '4/6 = ?/3', ans: '2' },
    { given: '3/8 = 6/__', template: '3/8 = 6/?', ans: '16' },
    { given: '2/5 = __/15', template: '2/5 = ?/15', ans: '6' },
    { given: '5/10 = 1/__', template: '5/10 = 1/?', ans: '2' },
  ];
  const [s6Inputs, setS6Inputs] = useState(equivQ.map(() => ''));
  const [s6Checked, setS6Checked] = useState(false);
  const s6Score = s6Inputs.reduce((acc, v, i) => acc + (v.trim() === equivQ[i].ans ? 1 : 0), 0);

  // ── Section 7 (Page 8) — Fraction Comparison Mountain ───────
  const compQ = [
    { f1: '1/2', f2: '1/4', ans: '>' },
    { f1: '2/3', f2: '3/4', ans: '<' },
    { f1: '3/6', f2: '1/2', ans: '=' },
    { f1: '5/8', f2: '3/4', ans: '<' },
    { f1: '4/5', f2: '3/5', ans: '>' },
    { f1: '2/4', f2: '4/8', ans: '=' },
    { f1: '1/3', f2: '1/4', ans: '>' },
    { f1: '7/8', f2: '7/10', ans: '>' },
  ];
  const [s7Answers, setS7Answers] = useState(Array(compQ.length).fill(''));
  const [s7Checked, setS7Checked] = useState(false);
  const s7Score = s7Answers.reduce((acc, a, i) => acc + (a === compQ[i].ans ? 1 : 0), 0);

  // ── Section 8 (Page 9) — Fraction Coding Puzzle ─────────────
  const codeKey = { '🍕': 1, '🌟': 2, '🐚': 3, '🦋': 4, '🌊': 5, '🪙': 6, '🌴': 7, '⭐': 8 };
  const codeQ = [
    { puzzle: '🍕 / 🌟', ans: '1/2' },
    { puzzle: '🐚 / 🌴', ans: '3/7' },
    { puzzle: '🦋 / ⭐', ans: '4/8' },
    { puzzle: '🌊 / 🪙', ans: '5/6' },
    { puzzle: '🍕 / 🐚', ans: '1/3' },
    { puzzle: '🌟 / 🦋', ans: '2/4' },
  ];
  const [s8Inputs, setS8Inputs] = useState(Array(codeQ.length).fill(''));
  const [s8Checked, setS8Checked] = useState(false);
  const s8Score = s8Inputs.reduce((acc, v, i) => {
    const clean = v.replace(/\s/g, '');
    // also accept simplified
    if (clean === codeQ[i].ans) return acc + 1;
    if (codeQ[i].ans === '4/8' && clean === '1/2') return acc + 1;
    if (codeQ[i].ans === '2/4' && clean === '1/2') return acc + 1;
    return acc;
  }, 0);

  // ── Section 9 (Page 10) — Real-Life Quest ───────────────────
  const rlQ = [
    { q: 'Maya has 12 marbles. 4 are blue. What fraction are blue?', ans: '1/3', hint: '4/12 = ?' },
    { q: 'A rope is cut into 5 equal parts. 2 parts are used. What fraction is left?', ans: '3/5', hint: 'Left = total − used' },
    { q: 'In a class of 30, 10 students wear glasses. What fraction wears glasses?', ans: '1/3', hint: '10/30 = ?' },
    { q: 'A jug holds 8 cups. 6 cups are filled with juice. What fraction is juice?', ans: '3/4', hint: '6/8 = ?' },
    { q: 'A garden has 9 flowers. 6 are yellow. What fraction is NOT yellow?', ans: '1/3', hint: 'Not yellow = 9 − 6 = 3' },
  ];
  const [s9Inputs, setS9Inputs] = useState(Array(rlQ.length).fill(''));
  const [s9Checked, setS9Checked] = useState(false);
  const s9Score = s9Inputs.reduce((acc, v, i) => acc + (v.replace(/\s/g,'') === rlQ[i].ans ? 1 : 0), 0);

  // ── Section 10 (Page 11) — Fraction Spin Challenge ──────────
  const spinSlices = ['1/2','1/4','3/4','1/3','2/3','3/8','5/8','1/8'];
  const spinColors = ['#E76F51','#219EBC','#E9C46A','#7B2D8E','#52B788','#E63946','#F4A261','#06D6A0'];
  const [spinResult, setSpinResult] = useState(null);
  const [spinAngle, setSpinAngle] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [spinQ, setSpinQ] = useState(null);
  const [spinInput, setSpinInput] = useState('');
  const [spinFeedback, setSpinFeedback] = useState(null);
  const [spinScore, setSpinScore] = useState(0);
  const [spinAttempts, setSpinAttempts] = useState(0);
  const spinRef = useRef(null);

  const doSpin = () => {
    if (spinning) return;
    setSpinning(true);
    setSpinFeedback(null);
    setSpinInput('');
    setSpinQ(null);
    const extra = 1440 + Math.floor(Math.random() * 360);
    const newAngle = spinAngle + extra;
    setSpinAngle(newAngle);
    if (spinRef.current) {
      spinRef.current.style.transition = 'transform 3s cubic-bezier(.2,.8,.4,1)';
      spinRef.current.style.transform = `rotate(${newAngle}deg)`;
    }
    setTimeout(() => {
      setSpinning(false);
      const idx = Math.floor(((newAngle % 360) / (360 / spinSlices.length)));
      const landed = spinSlices[(spinSlices.length - 1 - idx + spinSlices.length) % spinSlices.length];
      setSpinResult(landed);
      const spinQs = {
        '1/2': { q: 'What is equivalent to 1/2?', ans: '2/4', opts: ['2/4','1/3','3/8'] },
        '1/4': { q: 'Is 1/4 bigger or smaller than 1/2?', ans: 'smaller', opts: ['bigger','smaller','equal'] },
        '3/4': { q: 'How many quarters make 3/4?', ans: '3', opts: ['2','3','4'] },
        '1/3': { q: 'What is equivalent to 1/3?', ans: '2/6', opts: ['2/6','3/8','2/5'] },
        '2/3': { q: '2/3 + 1/3 = ?', ans: '1', opts: ['3/6','1','2/3'] },
        '3/8': { q: 'Is 3/8 more or less than 1/2?', ans: 'less', opts: ['more','less','equal'] },
        '5/8': { q: 'Is 5/8 more or less than 1/2?', ans: 'more', opts: ['more','less','equal'] },
        '1/8': { q: 'How many eighths make a whole?', ans: '8', opts: ['4','6','8'] },
      };
      setSpinQ(spinQs[landed] || null);
    }, 3100);
  };

  const checkSpinAnswer = (choice) => {
    if (!spinQ || spinFeedback) return;
    setSpinAttempts(a => a + 1);
    if (choice === spinQ.ans) {
      setSpinFeedback('correct');
      setSpinScore(s => s + 1);
    } else {
      setSpinFeedback('incorrect');
    }
  };

  // ── Section 11 (Page 12) — Fraction Escape Cave ─────────────
  const escapeSteps = [
    { q: 'Put these in order from smallest to largest: 1/2, 1/4, 3/4', ans: '1/4, 1/2, 3/4', type: 'text' },
    { q: 'What fraction of the number line between 0 and 1 is halfway?', ans: '1/2', type: 'text' },
    { q: 'Write an equivalent fraction for 2/3', ans: '4/6', type: 'text', altAns: ['6/9','8/12','10/15'] },
    { q: 'Circle the larger fraction: 5/6 or 7/8', ans: '7/8', type: 'text' },
    { q: 'A bat ate 3 out of 9 bugs. What fraction did it eat? Simplify!', ans: '1/3', type: 'text' },
  ];
  const [s11Inputs, setS11Inputs] = useState(Array(escapeSteps.length).fill(''));
  const [s11Checked, setS11Checked] = useState(false);
  const s11Score = s11Inputs.reduce((acc, v, i) => {
    const clean = v.replace(/\s/g,'');
    if (clean === escapeSteps[i].ans) return acc + 1;
    if (escapeSteps[i].altAns && escapeSteps[i].altAns.includes(clean)) return acc + 1;
    return acc;
  }, 0);

  // ── Section 12 (Page 13) — Fraction Boss Battle ─────────────
  const bossQ = [
    { q: 'Which is greatest?', opts: ['1/2','3/4','1/3','2/5'], ans: 1 },
    { q: '6/8 simplified is...', opts: ['3/4','2/3','1/2','4/6'], ans: 0 },
    { q: 'Which fraction equals 50%?', opts: ['1/4','3/4','1/2','2/3'], ans: 2 },
    { q: '¼ + ¼ = ?', opts: ['1/4','2/8','1/2','3/4'], ans: 2 },
    { q: 'What is 1 whole written as fourths?', opts: ['2/4','3/4','4/4','5/4'], ans: 2 },
    { q: 'Sara drank ⅝ of her juice. How much is left?', opts: ['5/8','3/8','2/8','4/8'], ans: 1 },
    { q: 'Which pair are equivalent?', opts: ['1/2 and 2/5', '3/4 and 6/8', '1/3 and 1/4', '2/3 and 3/4'], ans: 1 },
    { q: '3 out of 12 apples are red. What fraction simplified?', opts: ['3/12','1/4','1/3','2/6'], ans: 1 },
    { q: 'On a number line, which is closest to 1?', opts: ['1/4','1/2','3/4','4/5'], ans: 3 },
    { q: 'A half of a half is...', opts: ['1/4','1/3','1/2','2/4'], ans: 0 },
  ];
  const [s12Answers, setS12Answers] = useState(Array(bossQ.length).fill(null));
  const [s12Checked, setS12Checked] = useState(false);
  const s12Score = s12Answers.reduce((acc, a, i) => acc + (a === bossQ[i].ans ? 1 : 0), 0);

  // ── Total score ───────────────────────────────────────────────
  const totalScore = s1Score + s2Score + s3Score + s4Score + s5Score +
                     s6Score + s7Score + s8Score + s9Score + spinScore +
                     s11Score + s12Score;
  const totalMax = 4 + 4 + 10 + 6 + 6 + 8 + 8 + 6 + 5 + 8 + 5 + 10;

  // ── Shared input style ────────────────────────────────────────
  const inputStyle = (checked, correct) => ({
    border: `2px solid ${checked ? (correct ? '#06D6A0' : '#E63946') : '#9CA3AF'}`,
    borderRadius: 6,
    padding: '0.35rem 0.6rem',
    fontFamily: 'var(--font-fun)',
    fontSize: '1rem',
    background: checked ? (correct ? '#F0FDF4' : '#FFF1F2') : 'white',
    outline: 'none',
    width: 90,
    textAlign: 'center',
    transition: 'border-color 0.2s',
  });

  // ── Answer key ────────────────────────────────────────────────
  const allAnswers = {
    'Section 1': ['Color 1 of 2 parts', 'Color 3 of 4 parts', '2/4 (or 1/2)', '1/3'],
    'Section 2': ['1/3 → C', '4/5 → A', '5/8 → D', '1/4 → B'],
    'Section 3': numDenQ.map(q => `${q.frac}: numerator=${q.numAns}, denominator=${q.denAns}`),
    'Section 4': mazeQ.map((q, i) => `Q${i+1}: ${q.opts[q.ans]}`),
    'Section 5': ['Color 3 slices of 8', 'Color 4 slices of 6', 'Color 1 slice of 4'],
    'Section 6': equivQ.map(q => `${q.given.replace('__', q.ans)}`),
    'Section 7': compQ.map(q => `${q.f1} ${q.ans} ${q.f2}`),
    'Section 8': codeQ.map(q => `${q.puzzle} = ${q.ans}`),
    'Section 9': rlQ.map(q => q.ans),
    'Section 11': escapeSteps.map(q => q.ans),
    'Section 12': bossQ.map((q, i) => `${q.opts[q.ans]}`),
  };

  return (
    <div style={{ background: '#F0EDE8', minHeight: '100vh' }}>

      {/* ── TOP TOOLBAR ───────────────────────────────────────── */}
      <div className="no-print wood-header" style={{
        padding: '0.7rem 1.5rem',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        position: 'sticky', top: 0, zIndex: 50, gap: '0.5rem', flexWrap: 'wrap',
      }}>
        <Link to="/" className="btn btn-secondary" style={{ fontSize: '0.8rem', padding: '0.4rem 0.8rem' }}>
          🏝️ Back to Harbor
        </Link>
        <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', textShadow: '2px 2px 0 rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <img src={intelliaLogo} alt="Intellia 360" style={{ height: 30, width: 30, borderRadius: '50%', objectFit: 'cover', border: '2px solid rgba(255,255,255,0.5)' }} />
          🗺️ Fractions Adventure Worksheet
        </div>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <div style={{
            background: 'rgba(255,255,255,0.2)', borderRadius: 8,
            padding: '0.4rem 0.8rem',
            fontFamily: 'var(--font-fun)', fontWeight: 700, fontSize: '0.9rem', color: 'white',
          }}>
            🏆 Total: {totalScore}/{totalMax}
          </div>
          <button className="btn btn-treasure" style={{ fontSize: '0.85rem', padding: '0.5rem 1.2rem' }}
            onClick={() => window.print()}>
            🖨️ Print
          </button>
        </div>
      </div>

      {/* ── WORKSHEET CONTAINER ────────────────────────────────── */}
      <div style={{
        maxWidth: '8.5in', margin: '1.5rem auto',
        background: 'white',
        boxShadow: '0 10px 40px rgba(0,0,0,0.15)',
        fontFamily: 'var(--font-body)',
      }} className="worksheet-container">

        {/* ═══════════════════════════════════════════════════════
            PAGE 1 — COVER + EXPLORER PROFILE
        ═══════════════════════════════════════════════════════ */}
        <Page style={{ border: '8px double var(--accent)' }}>
          {/* Corner decorations */}
          {['⚓','🧭','🐚','⭐'].map((e, i) => (
            <span key={i} style={{
              position: 'absolute',
              top: [12,12,null,null][i], bottom: [null,null,12,12][i],
              left: [12,null,12,null][i], right: [null,12,null,12][i],
              fontSize: '1.2rem',
            }}>{e}</span>
          ))}

          {/* Title */}
          <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
            <div style={{ fontFamily: 'var(--font-fun)', fontSize: '0.85rem', color: CORAL, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
              ⭐ Math Adventures ⭐
            </div>
            <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.8rem', color: GREEN, marginBottom: '0.3rem' }}>
              Fractions Adventure
            </h1>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.7rem', color: '#D68C3A' }}>
              The Lost Treasure of Fraction Island 🏴‍☠️
            </h2>
          </div>

          {/* Story */}
          <div style={{ background: '#FDF6E3', padding: '1.5rem', border: '3px solid #8B6914', borderRadius: 16, marginBottom: '1.5rem', position: 'relative' }}>
            {[{top:8,left:8},{top:8,right:8},{bottom:8,left:8},{bottom:8,right:8}].map((pos,i) => (
              <div key={i} style={{ position:'absolute', ...pos, width:13, height:13, borderRadius:'50%', background:'linear-gradient(145deg,#B8860B,#8B6914)', border:'1px solid #6B4F1D' }}/>
            ))}
            <p style={{ fontSize: '1.05rem', lineHeight: 1.7, color: '#5C3D0F', fontWeight: 600, marginBottom: '0.75rem' }}>
              🏴‍☠️ Ahoy, young explorer! Welcome to <strong>Fraction Island</strong>. A legendary treasure is hidden here, but the path is guarded by the math-loving Fraction Monsters!
            </p>
            <p style={{ fontSize: '1.05rem', lineHeight: 1.7, color: '#5C3D0F', fontWeight: 600 }}>
              ⚔️ To find the treasure, you must solve fraction challenges to unlock secret paths, collect gold coins, and prove your math skills. <strong>Are you ready for the adventure?</strong>
            </p>
          </div>

          {/* Explorer Profile — INTERACTIVE */}
          <div style={{ border: `3px solid ${GREEN}`, borderRadius: 16, padding: '1.5rem', background: 'linear-gradient(145deg, #E0F2FE, #F0F9FF)' }}>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', color: GREEN, marginBottom: '1rem' }}>
              🗺️ Explorer Profile
            </h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
              <span style={{ fontWeight: 700, fontSize: '1.05rem', minWidth: 50 }}>Name:</span>
              <input
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Enter your explorer name…"
                style={{ flex: 1, minWidth: 180, border: `2px solid ${GREEN}`, borderRadius: 8, padding: '0.4rem 0.8rem', fontFamily: 'var(--font-fun)', fontSize: '1rem', background: 'white', outline: 'none' }}
              />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.2rem', flexWrap: 'wrap' }}>
              <span style={{ fontWeight: 700, fontSize: '1.05rem', minWidth: 50 }}>Date:</span>
              <input type="date" value={date} onChange={e => setDate(e.target.value)}
                style={{ border: `2px solid ${GREEN}`, borderRadius: 8, padding: '0.4rem 0.8rem', fontFamily: 'var(--font-fun)', fontSize: '1rem', background: 'white', outline: 'none' }}
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <div style={{ width: 130, height: 130, border: '3px dashed #9CA3AF', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9CA3AF', textAlign: 'center', padding: '0.5rem', background: 'white', fontSize: '0.82rem' }}>
                Draw Your Avatar Here 🎨
              </div>
            </div>
          </div>
        </Page>

        {/* ═══════════════════════════════════════════════════════
            PAGE 2 — SECTION 1: Fraction Map Challenge
        ═══════════════════════════════════════════════════════ */}
        <Page>
          <SectionHeader num={1} emoji="🗺️" title="Fraction Map Challenge" score={s1Score} maxScore={4} />
          <p style={{ marginBottom: '1.5rem', lineHeight: 1.6, fontSize: '1rem' }}>
            The pirate map has been torn! Restore it by <strong>clicking the shapes</strong> to color the correct fraction, or typing the fraction shown.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            {/* a) Color 1/2 */}
            <div style={{ border: '2px solid #D1D5DB', padding: '1.2rem', borderRadius: 12, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
              <h4 style={{ fontFamily: 'var(--font-fun)', fontWeight: 700, color: GREEN, fontSize: '1.05rem' }}>
                a) Click to color <strong>1/2</strong> of the circle
              </h4>
              <ClickablePie parts={2} filled={s1a}
                onToggle={i => setS1a(p => { const n=[...p]; n[i]=!n[i]; return n; })} />
              <div style={{ fontSize: '0.8rem', color: '#6B7280' }}>
                {s1a.filter(Boolean).length}/2 parts colored
                {s1Checked && (s1a.filter(Boolean).length===1 ? ' ✅' : ' ❌ (need exactly 1)')}
              </div>
            </div>

            {/* b) Color 3/4 */}
            <div style={{ border: '2px solid #D1D5DB', padding: '1.2rem', borderRadius: 12, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
              <h4 style={{ fontFamily: 'var(--font-fun)', fontWeight: 700, color: GREEN, fontSize: '1.05rem' }}>
                b) Click to color <strong>3/4</strong> of the square
              </h4>
              <ClickableBar parts={4} filled={s1b}
                onToggle={i => setS1b(p => { const n=[...p]; n[i]=!n[i]; return n; })}
                width={200} height={60} />
              <div style={{ fontSize: '0.8rem', color: '#6B7280' }}>
                {s1b.filter(Boolean).length}/4 parts colored
                {s1Checked && (s1b.filter(Boolean).length===3 ? ' ✅' : ' ❌ (need exactly 3)')}
              </div>
            </div>

            {/* c) What fraction is shaded? (pre-drawn bar 2/4) */}
            <div style={{ border: '2px solid #D1D5DB', padding: '1.2rem', borderRadius: 12, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
              <h4 style={{ fontFamily: 'var(--font-fun)', fontWeight: 700, color: GREEN, fontSize: '1.05rem' }}>
                c) What fraction is shaded?
              </h4>
              <svg width={200} height={55}>
                {[0,1,2,3].map(i => (
                  <rect key={i} x={i*50+1.5} y={1.5} width={47} height={52} rx={i===0?5:(i===3?5:0)} fill={i<2?OCEAN:'white'} stroke={GREEN} strokeWidth={2}/>
                ))}
              </svg>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontWeight: 600 }}>Answer:</span>
                <input value={s1c} onChange={e => setS1c(e.target.value)} placeholder="e.g. 2/4"
                  style={inputStyle(s1Checked, s1c.replace(/\s/g,'') === '2/4' || s1c.replace(/\s/g,'') === '1/2')} />
                {s1Checked && <span>{(s1c.replace(/\s/g,'') === '2/4' || s1c.replace(/\s/g,'') === '1/2') ? '✅' : '❌ (2/4)'}</span>}
              </div>
            </div>

            {/* d) What fraction is shaded? (pre-drawn bar 1/3) */}
            <div style={{ border: '2px solid #D1D5DB', padding: '1.2rem', borderRadius: 12, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
              <h4 style={{ fontFamily: 'var(--font-fun)', fontWeight: 700, color: GREEN, fontSize: '1.05rem' }}>
                d) What fraction is shaded?
              </h4>
              <svg width={180} height={55}>
                {[0,1,2].map(i => (
                  <rect key={i} x={i*60+1.5} y={1.5} width={57} height={52} rx={i===0?5:(i===2?5:0)} fill={i===0?OCEAN:'white'} stroke={GREEN} strokeWidth={2}/>
                ))}
              </svg>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontWeight: 600 }}>Answer:</span>
                <input value={s1d} onChange={e => setS1d(e.target.value)} placeholder="e.g. 1/3"
                  style={inputStyle(s1Checked, s1d.replace(/\s/g,'') === '1/3')} />
                {s1Checked && <span>{s1d.replace(/\s/g,'') === '1/3' ? '✅' : '❌ (1/3)'}</span>}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1.5rem' }}>
            <button className="btn btn-primary" onClick={() => setS1Checked(true)} style={{ fontSize: '0.95rem' }}>
              ✅ Check My Answers
            </button>
          </div>
        </Page>

        {/* ═══════════════════════════════════════════════════════
            PAGE 3 — SECTION 2: Fraction Treasure Hunt (matching)
        ═══════════════════════════════════════════════════════ */}
        <Page>
          <SectionHeader num={2} emoji="💎" title="Fraction Treasure Hunt" score={s2Score} maxScore={4} />
          <p style={{ marginBottom: '1.5rem', lineHeight: 1.6, fontSize: '1rem' }}>
            You found the treasure chests! Use the dropdown next to each fraction to match it to the correct treasure chest.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: 520, margin: '0 auto' }}>
            {matchLeft.map(frac => (
              <div key={frac} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem 1.5rem', background: '#F0F9FF', border: `3px solid ${OCEAN}`, borderRadius: 12 }}>
                <span style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', color: '#1B4332', minWidth: 70 }}>{frac}</span>
                <span style={{ fontWeight: 700, fontSize: '1.2rem' }}>→</span>
                <select
                  value={matchAnswers[frac]}
                  onChange={e => setMatchAnswers(p => ({ ...p, [frac]: e.target.value }))}
                  style={{
                    flex: 1, border: `2px solid ${s2Checked ? (matchAnswers[frac] === correctMatch[frac] ? '#06D6A0' : '#E63946') : '#9CA3AF'}`,
                    borderRadius: 8, padding: '0.4rem 0.6rem',
                    fontFamily: 'var(--font-fun)', fontSize: '0.95rem', background: 'white', outline: 'none',
                  }}
                >
                  <option value="">-- Choose a chest --</option>
                  {matchRight.map(r => <option key={r.id} value={r.id}>{r.id}: {r.text}</option>)}
                </select>
                {s2Checked && (matchAnswers[frac] === correctMatch[frac] ? <span style={{ color: '#06D6A0', fontSize: '1.3rem' }}>✅</span> : <span style={{ color: '#E63946', fontSize: '1.3rem' }}>❌</span>)}
              </div>
            ))}
          </div>

          {/* Treasure chests legend */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginTop: '1.5rem', padding: '1rem 1.5rem', background: '#FDF6E3', border: '2px solid #8B6914', borderRadius: 12 }}>
            <h4 style={{ gridColumn: '1/-1', fontFamily: 'var(--font-fun)', fontWeight: 700, fontSize: '1rem', color: '#8B6914', marginBottom: '0.25rem' }}>📦 Treasure Chests:</h4>
            {matchRight.map(r => (
              <div key={r.id} style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', fontSize: '0.9rem' }}>
                <strong style={{ color: CORAL }}>{r.id}:</strong> {r.text}
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1.5rem' }}>
            <button className="btn btn-primary" onClick={() => setS2Checked(true)} style={{ fontSize: '0.95rem' }}>
              ✅ Check Matches
            </button>
          </div>
        </Page>

        {/* ═══════════════════════════════════════════════════════
            PAGE 4 — SECTION 3: Numerator vs Denominator Battle
        ═══════════════════════════════════════════════════════ */}
        <Page>
          <SectionHeader num={3} emoji="⚔️" title="Numerator vs Denominator Battle" score={s3Score} maxScore={10} />
          <p style={{ marginBottom: '1.5rem', lineHeight: 1.6, fontSize: '1rem' }}>
            For each fraction, identify the <strong style={{ color: CORAL }}>numerator</strong> (top number) and <strong style={{ color: OCEAN }}>denominator</strong> (bottom number). Fill in your answers!
          </p>

          <div style={{ background: '#FFF9C4', border: '2px solid #F4A261', borderRadius: 12, padding: '1rem 1.5rem', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
            💡 <strong>Remember:</strong> Numerator = top (how many parts you have) | Denominator = bottom (total parts)
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {numDenQ.map((q, i) => {
              const numOk = s3Inputs[i].num.trim() === q.numAns;
              const denOk = s3Inputs[i].den.trim() === q.denAns;
              return (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem 1.5rem', background: '#F9FAFB', border: '2px solid #E5E7EB', borderRadius: 12, flexWrap: 'wrap' }}>
                  {/* Fraction display */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 60, border: `2px solid ${GREEN}`, borderRadius: 8, padding: '0.4rem 0.8rem', background: 'white' }}>
                    <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', color: CORAL }}>{q.frac.split('/')[0]}</span>
                    <div style={{ width: '100%', height: 2, background: GREEN, margin: '2px 0' }}/>
                    <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', color: OCEAN }}>{q.frac.split('/')[1]}</span>
                  </div>
                  <div style={{ flex: 1, display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <span style={{ fontWeight: 700, color: CORAL }}>Numerator:</span>
                      <input value={s3Inputs[i].num}
                        onChange={e => setS3Inputs(p => { const n=[...p]; n[i]={...n[i], num: e.target.value}; return n; })}
                        style={inputStyle(s3Checked, numOk)} placeholder="?" />
                      {s3Checked && <span>{numOk ? '✅' : `❌ (${q.numAns})`}</span>}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <span style={{ fontWeight: 700, color: OCEAN }}>Denominator:</span>
                      <input value={s3Inputs[i].den}
                        onChange={e => setS3Inputs(p => { const n=[...p]; n[i]={...n[i], den: e.target.value}; return n; })}
                        style={inputStyle(s3Checked, denOk)} placeholder="?" />
                      {s3Checked && <span>{denOk ? '✅' : `❌ (${q.denAns})`}</span>}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1.5rem' }}>
            <button className="btn btn-primary" onClick={() => setS3Checked(true)} style={{ fontSize: '0.95rem' }}>
              ✅ Check Answers
            </button>
          </div>
        </Page>

        {/* ═══════════════════════════════════════════════════════
            PAGE 5 — SECTION 4: Fraction Monster Maze
        ═══════════════════════════════════════════════════════ */}
        <Page>
          <SectionHeader num={4} emoji="🧩" title="Fraction Monster Maze" score={s4Score} maxScore={6} />
          <p style={{ marginBottom: '1.5rem', lineHeight: 1.6, fontSize: '1rem' }}>
            The Fraction Monster is blocking your path! Answer each question correctly to escape the maze. Click the right answer! 🧟
          </p>

          {/* Maze visual progress */}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.25rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '1.5rem' }}>🏁</span>
            {mazeQ.map((_, i) => (
              <React.Fragment key={i}>
                <div style={{
                  width: 36, height: 36, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: s4Answers[i] === mazeQ[i].ans ? '#06D6A0' : (s4Answers[i] !== null ? '#E63946' : '#E5E7EB'),
                  border: '2px solid',
                  borderColor: s4Answers[i] === mazeQ[i].ans ? '#047857' : (s4Answers[i] !== null ? '#991B1B' : '#9CA3AF'),
                  fontFamily: 'var(--font-heading)', fontSize: '0.85rem', color: s4Answers[i] !== null ? 'white' : '#6B7280',
                  transition: 'background 0.3s',
                }}>
                  {s4Answers[i] === mazeQ[i].ans ? '✓' : (s4Answers[i] !== null ? '✗' : i+1)}
                </div>
                {i < mazeQ.length-1 && <div style={{ width: 20, height: 3, background: s4Answers[i] === mazeQ[i].ans ? '#06D6A0' : '#E5E7EB', borderRadius: 2 }}/>}
              </React.Fragment>
            ))}
            <span style={{ fontSize: '1.5rem' }}>🏆</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {mazeQ.map((q, i) => (
              <div key={i} style={{ padding: '1rem 1.2rem', background: '#F9FAFB', border: `2px solid ${s4Answers[i] === q.ans ? '#06D6A0' : (s4Answers[i] !== null ? '#E63946' : '#E5E7EB')}`, borderRadius: 12 }}>
                <div style={{ fontWeight: 700, marginBottom: '0.6rem', fontSize: '0.98rem' }}>
                  Q{i+1}. {q.q}
                </div>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {q.opts.map((opt, j) => (
                    <button key={j} onClick={() => {
                      if (s4Answers[i] !== null) return;
                      setS4Answers(p => { const n=[...p]; n[i]=j; return n; });
                    }} style={{
                      padding: '0.4rem 1rem',
                      border: `2px solid ${s4Answers[i] === j ? (j === q.ans ? '#06D6A0' : '#E63946') : '#9CA3AF'}`,
                      borderRadius: 8,
                      background: s4Answers[i] === j ? (j === q.ans ? '#F0FDF4' : '#FFF1F2') : 'white',
                      cursor: s4Answers[i] !== null ? 'default' : 'pointer',
                      fontFamily: 'var(--font-fun)', fontSize: '0.95rem',
                      transition: 'all 0.2s',
                    }}>
                      {opt}
                    </button>
                  ))}
                  {s4Answers[i] !== null && s4Answers[i] !== q.ans && (
                    <span style={{ color: '#065F46', fontWeight: 700, alignSelf: 'center', fontSize: '0.85rem' }}>
                      ✓ Correct: {q.opts[q.ans]}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Page>

        {/* ═══════════════════════════════════════════════════════
            PAGE 6 — SECTION 5: Pizza Kingdom Fractions
        ═══════════════════════════════════════════════════════ */}
        <Page>
          <SectionHeader num={5} emoji="🍕" title="Pizza Kingdom Fractions" score={s5Score} maxScore={6} />
          <p style={{ marginBottom: '1.5rem', lineHeight: 1.6, fontSize: '1rem' }}>
            The Pizza King needs your help! <strong>Click the pizza slices</strong> to color the correct fraction, then write the fraction in the box.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
            {pizzaGoals.map((goal, gi) => (
              <div key={gi} style={{ border: '2px solid #D1D5DB', borderRadius: 12, padding: '1.2rem', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.8rem' }}>
                <h4 style={{ fontFamily: 'var(--font-fun)', fontWeight: 700, color: CORAL, fontSize: '1rem' }}>
                  {goal.label}
                </h4>
                <ClickablePie parts={goal.parts} filled={pizzaStates[gi]}
                  onToggle={i => pizzaSetters[gi](p => { const n=[...p]; n[i]=!n[i]; return n; })}
                  size={150} />
                <div style={{ fontSize: '0.8rem', color: '#6B7280' }}>
                  {pizzaStates[gi].filter(Boolean).length}/{goal.parts} slices
                  {s5Checked && (pizzaStates[gi].filter(Boolean).length === goal.goal ? ' ✅' : ` ❌ (need ${goal.goal})`)}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>Fraction:</span>
                  <input value={pizzaAns[gi]}
                    onChange={e => setPizzaAns(p => { const n=[...p]; n[gi]=e.target.value; return n; })}
                    placeholder={`${goal.goal}/${goal.parts}`}
                    style={inputStyle(s5Checked, pizzaAns[gi].replace(/\s/g,'') === `${goal.goal}/${goal.parts}` || (gi===1 && pizzaAns[gi].replace(/\s/g,'') === '2/3'))} />
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1.5rem' }}>
            <button className="btn btn-primary" onClick={() => setS5Checked(true)} style={{ fontSize: '0.95rem' }}>
              ✅ Check Pizza Fractions
            </button>
          </div>
        </Page>

        {/* ═══════════════════════════════════════════════════════
            PAGE 7 — SECTION 6: Equivalent Fraction Bridge
        ═══════════════════════════════════════════════════════ */}
        <Page>
          <SectionHeader num={6} emoji="🌉" title="Equivalent Fraction Bridge" score={s6Score} maxScore={8} />
          <p style={{ marginBottom: '1.2rem', lineHeight: 1.6, fontSize: '1rem' }}>
            Fill in the missing number to make each pair of fractions equivalent. Each correct plank builds the bridge!
          </p>
          <div style={{ background: '#FFF9C4', border: '2px solid #F4A261', borderRadius: 12, padding: '0.8rem 1.2rem', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
            💡 <strong>Tip:</strong> Multiply or divide both the top and bottom number by the same value!
          </div>

          {/* Bridge visual */}
          <div style={{ position: 'relative', height: 60, marginBottom: '1.2rem', background: 'linear-gradient(180deg,#87CEEB,#B5E3F5)', borderRadius: 12, overflow: 'hidden', border: `2px solid ${OCEAN}` }}>
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 16, background: '#8B6914', display: 'flex' }}>
              {equivQ.map((_, i) => (
                <div key={i} style={{ flex: 1, background: s6Inputs[i].trim() === equivQ[i].ans ? '#52B788' : '#A0782C', borderRight: '2px solid #6B4F1D', transition: 'background 0.3s' }}/>
              ))}
            </div>
            <div style={{ position: 'absolute', bottom: 20, left: '50%', transform: 'translateX(-50%)', fontFamily: 'var(--font-fun)', fontSize: '0.75rem', color: '#023047', fontWeight: 700 }}>
              Bridge Planks: {s6Inputs.filter((v,i) => v.trim()===equivQ[i].ans).length}/8
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            {equivQ.map((q, i) => {
              const ok = s6Inputs[i].trim() === q.ans;
              return (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.8rem 1rem', background: '#F9FAFB', border: `2px solid ${s6Checked ? (ok ? '#06D6A0' : '#E63946') : '#E5E7EB'}`, borderRadius: 10 }}>
                  <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', color: GREEN, whiteSpace: 'nowrap' }}>
                    {q.given.split('__')[0]}
                  </span>
                  <input value={s6Inputs[i]} onChange={e => setS6Inputs(p => { const n=[...p]; n[i]=e.target.value; return n; })}
                    style={{ ...inputStyle(s6Checked, ok), width: 64 }} placeholder="?" />
                  <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', color: GREEN, whiteSpace: 'nowrap' }}>
                    {q.given.split('__')[1]}
                  </span>
                  {s6Checked && <span style={{ color: ok ? '#06D6A0' : '#E63946', fontSize: '1.1rem' }}>{ok ? '✅' : `❌(${q.ans})`}</span>}
                </div>
              );
            })}
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1.5rem' }}>
            <button className="btn btn-primary" onClick={() => setS6Checked(true)} style={{ fontSize: '0.95rem' }}>
              ✅ Build the Bridge!
            </button>
          </div>
        </Page>

        {/* ═══════════════════════════════════════════════════════
            PAGE 8 — SECTION 7: Fraction Comparison Mountain
        ═══════════════════════════════════════════════════════ */}
        <Page>
          <SectionHeader num={7} emoji="⛰️" title="Fraction Comparison Mountain" score={s7Score} maxScore={8} />
          <p style={{ marginBottom: '1.2rem', lineHeight: 1.6, fontSize: '1rem' }}>
            Click <strong>&gt;</strong>, <strong>=</strong>, or <strong>&lt;</strong> to compare each pair of fractions and climb the mountain! ⛰️
          </p>
          <div style={{ background: '#FFF9C4', border: '2px solid #F4A261', borderRadius: 12, padding: '0.8rem 1.2rem', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
            💡 <strong>Tip:</strong> Convert to the same denominator, or think about which piece of pizza is bigger!
          </div>

          {/* Mountain progress */}
          <div style={{ textAlign: 'center', marginBottom: '1rem', fontFamily: 'var(--font-heading)', fontSize: '1.3rem', color: '#5C3D0F' }}>
            ⛰️ Mountain Level: {s7Score}/8 {s7Score === 8 ? '🏆 SUMMIT REACHED!' : ''}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            {compQ.map((q, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.6rem', padding: '0.9rem 1rem', background: '#F9FAFB', border: `2px solid ${s7Checked ? (s7Answers[i]===q.ans ? '#06D6A0' : '#E63946') : '#E5E7EB'}`, borderRadius: 10 }}>
                <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', color: OCEAN, minWidth: 42, textAlign: 'right' }}>{q.f1}</span>
                {['>', '=', '<'].map(sym => (
                  <button key={sym} onClick={() => setS7Answers(p => { const n=[...p]; n[i]=sym; return n; })}
                    style={{
                      width: 38, height: 38, borderRadius: '50%', border: `2px solid ${s7Answers[i]===sym ? CORAL : '#9CA3AF'}`,
                      background: s7Answers[i]===sym ? CORAL : 'white', color: s7Answers[i]===sym ? 'white' : '#374151',
                      fontFamily: 'var(--font-heading)', fontSize: '1.2rem', cursor: 'pointer',
                      transition: 'all 0.2s',
                    }}>
                    {sym}
                  </button>
                ))}
                <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', color: PURPLE, minWidth: 42 }}>{q.f2}</span>
                {s7Checked && <span style={{ color: s7Answers[i]===q.ans ? '#06D6A0' : '#E63946' }}>{s7Answers[i]===q.ans ? '✅' : `(${q.ans})`}</span>}
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1.5rem' }}>
            <button className="btn btn-primary" onClick={() => setS7Checked(true)} style={{ fontSize: '0.95rem' }}>
              ✅ Check Comparisons
            </button>
          </div>
        </Page>

        {/* ═══════════════════════════════════════════════════════
            PAGE 9 — SECTION 8: Fraction Coding Puzzle
        ═══════════════════════════════════════════════════════ */}
        <Page>
          <SectionHeader num={8} emoji="💻" title="Fraction Coding Puzzle" score={s8Score} maxScore={6} />
          <p style={{ marginBottom: '1rem', lineHeight: 1.6, fontSize: '1rem' }}>
            The pirate wrote fractions using a secret emoji code! Use the key below to decode each fraction.
          </p>

          {/* Emoji Key */}
          <div style={{ background: '#1B4332', color: 'white', borderRadius: 12, padding: '1rem 1.5rem', marginBottom: '1.5rem' }}>
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', marginBottom: '0.5rem', color: GOLD }}>🔑 Secret Code Key:</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
              {Object.entries(codeKey).map(([emoji, num]) => (
                <div key={emoji} style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', background: 'rgba(255,255,255,0.15)', borderRadius: 8, padding: '0.3rem 0.6rem', fontFamily: 'var(--font-fun)', fontSize: '1rem' }}>
                  {emoji} = <strong>{num}</strong>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            {codeQ.map((q, i) => {
              const ok = s8Inputs[i].replace(/\s/g,'') === q.ans || (q.ans==='4/8' && s8Inputs[i].replace(/\s/g,'') === '1/2') || (q.ans==='2/4' && s8Inputs[i].replace(/\s/g,'') === '1/2');
              return (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.9rem 1rem', background: '#F9FAFB', border: `2px solid ${s8Checked ? (ok?'#06D6A0':'#E63946') : '#E5E7EB'}`, borderRadius: 10 }}>
                  <span style={{ fontSize: '1.8rem', minWidth: 70, textAlign: 'center', fontFamily: 'var(--font-body)' }}>{q.puzzle}</span>
                  <span style={{ fontWeight: 700, fontSize: '1.3rem' }}>=</span>
                  <input value={s8Inputs[i]} onChange={e => setS8Inputs(p => { const n=[...p]; n[i]=e.target.value; return n; })}
                    placeholder="?"
                    style={inputStyle(s8Checked, ok)} />
                  {s8Checked && <span style={{ color: ok?'#06D6A0':'#E63946', fontSize: '0.85rem' }}>{ok ? '✅' : `❌(${q.ans})`}</span>}
                </div>
              );
            })}
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1.5rem' }}>
            <button className="btn btn-primary" onClick={() => setS8Checked(true)} style={{ fontSize: '0.95rem' }}>
              ✅ Decode Answers
            </button>
          </div>
        </Page>

        {/* ═══════════════════════════════════════════════════════
            PAGE 10 — SECTION 9: Real-Life Fraction Quest
        ═══════════════════════════════════════════════════════ */}
        <Page>
          <SectionHeader num={9} emoji="🌍" title="Real-Life Fraction Quest" score={s9Score} maxScore={5} />
          <p style={{ marginBottom: '1.5rem', lineHeight: 1.6, fontSize: '1rem' }}>
            Fractions appear everywhere in real life! Solve each word problem and write your answer as a simplified fraction.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            {rlQ.map((q, i) => {
              const ok = s9Inputs[i].replace(/\s/g,'') === q.ans;
              return (
                <div key={i} style={{ padding: '1rem 1.2rem', background: '#F9FAFB', border: `2px solid ${s9Checked ? (ok?'#06D6A0':'#E63946') : '#E5E7EB'}`, borderRadius: 12 }}>
                  <div style={{ fontWeight: 700, marginBottom: '0.5rem', fontSize: '0.98rem' }}>
                    Q{i+1}. {q.q}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                    <div style={{ background: '#FFF9C4', border: '1px solid #F4A261', borderRadius: 8, padding: '0.3rem 0.6rem', fontSize: '0.82rem', color: '#8B6914' }}>
                      💡 Hint: {q.hint}
                    </div>
                    <span style={{ fontWeight: 600 }}>Answer:</span>
                    <input value={s9Inputs[i]} onChange={e => setS9Inputs(p => { const n=[...p]; n[i]=e.target.value; return n; })}
                      placeholder="fraction"
                      style={inputStyle(s9Checked, ok)} />
                    {s9Checked && <span style={{ color: ok?'#06D6A0':'#E63946' }}>{ok ? '✅' : `❌ (${q.ans})`}</span>}
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1.5rem' }}>
            <button className="btn btn-primary" onClick={() => setS9Checked(true)} style={{ fontSize: '0.95rem' }}>
              ✅ Check Quest Answers
            </button>
          </div>
        </Page>

        {/* ═══════════════════════════════════════════════════════
            PAGE 11 — SECTION 10: Fraction Spin Challenge
        ═══════════════════════════════════════════════════════ */}
        <Page>
          <SectionHeader num={10} emoji="🎯" title="Fraction Spin Challenge" score={spinScore} maxScore={8} />
          <p style={{ marginBottom: '1.5rem', lineHeight: 1.6, fontSize: '1rem' }}>
            Spin the wheel to get a random fraction, then answer the question! Spin up to 8 times to earn full marks.
          </p>

          <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'flex-start' }}>
            {/* Spinner */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
              <div style={{ position: 'relative', width: 220, height: 220 }}>
                {/* Arrow */}
                <div style={{
                  position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)',
                  width: 0, height: 0,
                  borderLeft: '10px solid transparent', borderRight: '10px solid transparent',
                  borderTop: '22px solid #E63946', zIndex: 10,
                }} />
                {/* Wheel */}
                <svg ref={spinRef} width={220} height={220} style={{ display: 'block' }}>
                  {spinSlices.map((slice, i) => {
                    const angle = (2 * Math.PI) / spinSlices.length;
                    const startA = i * angle - Math.PI / 2;
                    const endA   = (i+1) * angle - Math.PI / 2;
                    const cx = 110, cy = 110, r = 105;
                    const x1 = cx + r * Math.cos(startA), y1 = cy + r * Math.sin(startA);
                    const x2 = cx + r * Math.cos(endA),   y2 = cy + r * Math.sin(endA);
                    const midA = startA + angle/2;
                    const tx = cx + (r*0.65) * Math.cos(midA);
                    const ty = cy + (r*0.65) * Math.sin(midA);
                    return (
                      <g key={i}>
                        <path d={`M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 0 1 ${x2} ${y2} Z`}
                          fill={spinColors[i]} stroke="white" strokeWidth={2} />
                        <text x={tx} y={ty} textAnchor="middle" dominantBaseline="central"
                          fontSize={12} fontWeight={700} fill="white"
                          transform={`rotate(${(midA * 180/Math.PI)+90}, ${tx}, ${ty})`}>
                          {slice}
                        </text>
                      </g>
                    );
                  })}
                  <circle cx={110} cy={110} r={14} fill="white" stroke="#8B6914" strokeWidth={3} />
                </svg>
              </div>
              <button className="btn btn-treasure" onClick={doSpin} disabled={spinning} style={{ fontSize: '1rem', padding: '0.6rem 2rem' }}>
                {spinning ? '⏳ Spinning…' : '🎯 Spin!'}
              </button>
              <div style={{ fontFamily: 'var(--font-fun)', fontWeight: 700, fontSize: '0.9rem', color: '#6B7280' }}>
                Spins: {spinAttempts} | Score: {spinScore}/{spinAttempts || '?'}
              </div>
            </div>

            {/* Question area */}
            <div style={{ flex: 1, minWidth: 240 }}>
              {spinResult && (
                <div style={{ padding: '1.2rem', background: '#F0F9FF', border: `3px solid ${OCEAN}`, borderRadius: 12, marginBottom: '1rem' }}>
                  <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', color: OCEAN, marginBottom: '0.5rem' }}>
                    🎯 Landed on: <strong>{spinResult}</strong>
                  </div>
                </div>
              )}
              {spinQ && !spinFeedback && (
                <div style={{ padding: '1.2rem', background: '#FDF6E3', border: '2px solid #8B6914', borderRadius: 12 }}>
                  <div style={{ fontWeight: 700, marginBottom: '0.75rem', fontSize: '1rem' }}>{spinQ.q}</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {spinQ.opts.map(opt => (
                      <button key={opt} onClick={() => checkSpinAnswer(opt)}
                        style={{ padding: '0.5rem 1rem', border: '2px solid #8B6914', borderRadius: 8, background: 'white', cursor: 'pointer', fontFamily: 'var(--font-fun)', fontSize: '0.95rem', textAlign: 'left', transition: 'all 0.2s' }}
                        onMouseEnter={e => { e.currentTarget.style.background = '#FFF9C4'; e.currentTarget.style.borderColor = CORAL; }}
                        onMouseLeave={e => { e.currentTarget.style.background = 'white'; e.currentTarget.style.borderColor = '#8B6914'; }}>
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              {spinFeedback && (
                <div className="animate-popIn" style={{
                  padding: '1.5rem', textAlign: 'center', borderRadius: 12,
                  background: spinFeedback === 'correct' ? '#F0FDF4' : '#FFF1F2',
                  border: `3px solid ${spinFeedback === 'correct' ? '#06D6A0' : '#E63946'}`,
                }}>
                  <div style={{ fontSize: '2.5rem' }}>{spinFeedback === 'correct' ? '🎉' : '😅'}</div>
                  <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', color: spinFeedback === 'correct' ? '#065F46' : '#991B1B' }}>
                    {spinFeedback === 'correct' ? 'Correct! +1 point!' : `Not quite! Answer: ${spinQ?.ans}`}
                  </div>
                  <button onClick={() => { setSpinFeedback(null); setSpinResult(null); setSpinQ(null); }} className="btn btn-primary" style={{ marginTop: '0.75rem', fontSize: '0.9rem' }}>
                    🎯 Spin Again
                  </button>
                </div>
              )}
              {!spinResult && !spinFeedback && (
                <div style={{ padding: '2rem', textAlign: 'center', border: '2px dashed #D1D5DB', borderRadius: 12, color: '#9CA3AF' }}>
                  <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🎡</div>
                  <div style={{ fontFamily: 'var(--font-fun)' }}>Spin the wheel to get a fraction question!</div>
                </div>
              )}
            </div>
          </div>
        </Page>

        {/* ═══════════════════════════════════════════════════════
            PAGE 12 — SECTION 11: Fraction Escape Cave
        ═══════════════════════════════════════════════════════ */}
        <Page>
          <SectionHeader num={11} emoji="🦇" title="Fraction Escape Cave" score={s11Score} maxScore={5} />
          <p style={{ marginBottom: '1.5rem', lineHeight: 1.6, fontSize: '1rem' }}>
            You're trapped in the cave! Solve each fraction challenge to light up a torch and find your way out. 🔦
          </p>

          {/* Cave visual */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
            {escapeSteps.map((_, i) => (
              <div key={i} style={{
                width: 40, height: 40, borderRadius: 8,
                background: s11Inputs[i].trim() ? '#F59E0B' : '#374151',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1.3rem', border: `2px solid ${s11Inputs[i].trim() ? '#D97706' : '#1F2937'}`,
                transition: 'background 0.3s',
              }}>
                {s11Inputs[i].trim() ? '🔦' : '🌑'}
              </div>
            ))}
            <div style={{ fontSize: '1.5rem' }}>🚪</div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {escapeSteps.map((step, i) => {
              const ok = s11Inputs[i].trim() === step.ans || (step.altAns && step.altAns.includes(s11Inputs[i].trim()));
              return (
                <div key={i} style={{ padding: '1rem 1.2rem', background: '#F9FAFB', border: `2px solid ${s11Checked ? (ok?'#06D6A0':'#E63946') : '#E5E7EB'}`, borderRadius: 12 }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                    <span style={{ fontSize: '1.2rem', minWidth: 28 }}>{s11Inputs[i].trim() ? '🔦' : '🦇'}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 700, marginBottom: '0.5rem', fontSize: '0.98rem' }}>
                        Torch {i+1}: {step.q}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
                        <span style={{ fontWeight: 600 }}>Answer:</span>
                        <input value={s11Inputs[i]} onChange={e => setS11Inputs(p => { const n=[...p]; n[i]=e.target.value; return n; })}
                          placeholder="your answer…"
                          style={{ border: `2px solid ${s11Checked ? (ok?'#06D6A0':'#E63946') : '#9CA3AF'}`, borderRadius: 6, padding: '0.35rem 0.6rem', fontFamily: 'var(--font-fun)', fontSize: '1rem', background: s11Checked?(ok?'#F0FDF4':'#FFF1F2'):'white', outline: 'none', width: 180 }} />
                        {s11Checked && <span style={{ color: ok?'#06D6A0':'#E63946' }}>{ok ? '✅ Torch Lit!' : `❌ (${step.ans})`}</span>}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1.5rem' }}>
            <button className="btn btn-primary" onClick={() => setS11Checked(true)} style={{ fontSize: '0.95rem' }}>
              ✅ Light the Torches!
            </button>
          </div>
        </Page>

        {/* ═══════════════════════════════════════════════════════
            PAGE 13 — SECTION 12: Fraction Boss Battle
        ═══════════════════════════════════════════════════════ */}
        <Page>
          <SectionHeader num={12} emoji="👾" title="Fraction Boss Battle" score={s12Score} maxScore={10} />
          <p style={{ marginBottom: '1rem', lineHeight: 1.6, fontSize: '1rem' }}>
            The final boss! Answer all 10 questions correctly to unlock the treasure chest. Every correct answer deals damage! ⚔️
          </p>

          {/* Boss HP bar */}
          <div style={{ marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem', fontFamily: 'var(--font-fun)', fontWeight: 700, fontSize: '0.9rem' }}>
              <span>👾 Fraction Boss</span>
              <span>{Math.max(0, 100 - s12Score * 10)}% HP</span>
            </div>
            <div className="hp-bar">
              <div className="hp-bar-fill" style={{ width: `${Math.max(0, 100 - s12Score * 10)}%` }}/>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.9rem' }}>
            {bossQ.map((q, i) => (
              <div key={i} style={{ padding: '0.9rem', background: '#F9FAFB', border: `2px solid ${s12Checked ? (s12Answers[i]===q.ans?'#06D6A0':'#E63946') : '#E5E7EB'}`, borderRadius: 10 }}>
                <div style={{ fontWeight: 700, marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                  Q{i+1}. {q.q}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                  {q.opts.map((opt, j) => (
                    <button key={j} onClick={() => setS12Answers(p => { const n=[...p]; n[i]=j; return n; })}
                      style={{
                        padding: '0.3rem 0.7rem', textAlign: 'left',
                        border: `2px solid ${s12Answers[i]===j ? (s12Checked?(j===q.ans?'#06D6A0':'#E63946'):CORAL) : '#E5E7EB'}`,
                        borderRadius: 6,
                        background: s12Answers[i]===j ? (s12Checked?(j===q.ans?'#F0FDF4':'#FFF1F2'):'#FFF9C4') : 'white',
                        cursor: 'pointer', fontFamily: 'var(--font-fun)', fontSize: '0.88rem',
                        transition: 'all 0.15s',
                      }}>
                      {String.fromCharCode(65+j)}. {opt}
                      {s12Checked && j===q.ans && <span style={{ color: '#06D6A0', marginLeft: 4 }}>✓</span>}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1.5rem' }}>
            <button className="btn btn-primary" onClick={() => setS12Checked(true)} style={{ fontSize: '0.95rem' }}>
              ⚔️ Strike the Boss!
            </button>
          </div>
        </Page>

        {/* ═══════════════════════════════════════════════════════
            PAGE 14 — TREASURE CERTIFICATE
        ═══════════════════════════════════════════════════════ */}
        <Page style={{ background: 'linear-gradient(145deg, #FDF6E3, #FFF9C4)' }}>
          <div style={{
            border: '8px double #B8860B', borderRadius: 20,
            padding: '3rem 2.5rem', textAlign: 'center',
            minHeight: '80vh', display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center', gap: '1rem',
            position: 'relative',
          }}>
            {['⚓','🧭','🐚','⭐','🌴','🏴‍☠️'].map((e, i) => (
              <span key={i} style={{
                position: 'absolute', fontSize: '2rem',
                top: [20,20,null,null,null,null][i],
                bottom: [null,null,20,20,null,null][i],
                left: [20,null,20,null,null,null][i],
                right: [null,20,null,20,null,null][i],
                opacity: 0.4,
              }}>{e}</span>
            ))}

            <div style={{ fontSize: '4rem', animation: 'float 3s ease-in-out infinite' }}>🏆</div>
            <div style={{ fontFamily: 'var(--font-fun)', fontSize: '0.9rem', color: CORAL, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase' }}>
              Certificate of Achievement
            </div>
            <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem,5vw,3rem)', color: GREEN }}>
              Fraction Island Explorer
            </h1>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '1.1rem', color: '#5C3D0F', maxWidth: 480 }}>
              This certifies that
            </p>
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.5rem,4vw,2.5rem)', color: CORAL, borderBottom: `3px solid ${CORAL}`, padding: '0 2rem 0.25rem', minWidth: 250 }}>
              {name || '______________________'}
            </div>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '1.1rem', color: '#5C3D0F', maxWidth: 480, lineHeight: 1.6 }}>
              has bravely completed the <strong>Fractions Adventure Worksheet</strong> and proven their mastery of fractions on Fraction Island!
            </p>

            {/* Score badge */}
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center', marginTop: '0.5rem' }}>
              <div style={{ background: 'linear-gradient(145deg, #FFF3C4, #FFE066)', border: '3px solid #D4A017', borderRadius: 16, padding: '0.75rem 2rem', fontFamily: 'var(--font-heading)', fontSize: '1.5rem', color: '#6B4F1D' }}>
                🏆 Score: {totalScore}/{totalMax}
              </div>
              <div style={{ background: 'linear-gradient(145deg, #D1FAE5, #A7F3D0)', border: '3px solid #047857', borderRadius: 16, padding: '0.75rem 2rem', fontFamily: 'var(--font-heading)', fontSize: '1.5rem', color: '#065F46' }}>
                {totalScore >= totalMax * 0.9 ? '⭐⭐⭐ MASTER!' : totalScore >= totalMax * 0.7 ? '⭐⭐ EXPLORER!' : '⭐ ADVENTURER!'}
              </div>
            </div>

            <div style={{ marginTop: '1rem', fontFamily: 'var(--font-fun)', color: '#9CA3AF', fontSize: '0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
              <span>Date: {date} &nbsp;|&nbsp; Powered by </span>
              <img src={intelliaLogo} alt="Intellia 360" style={{ height: 20, width: 20, borderRadius: '50%', objectFit: 'cover' }} />
              <span><strong>Intellia 360</strong></span>
            </div>

            <button className="btn btn-treasure no-print" onClick={() => window.print()} style={{ marginTop: '0.5rem', fontSize: '1rem' }}>
              🖨️ Print Certificate
            </button>
          </div>
        </Page>

        {/* ═══════════════════════════════════════════════════════
            PAGE 15 — COMPLETE ANSWER KEY
        ═══════════════════════════════════════════════════════ */}
        <Page>
          <div style={{ borderBottom: `4px solid ${GREEN}`, paddingBottom: '0.6rem', marginBottom: '1.4rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.9rem', color: '#1B4332' }}>
              📝 Complete Answer Key
            </h2>
            <div style={{ fontFamily: 'var(--font-fun)', color: '#9CA3AF', fontSize: '0.85rem' }}>
              (Teacher Reference)
            </div>
          </div>

          <div style={{ background: '#FFF9C4', border: '2px solid #F4A261', borderRadius: 12, padding: '0.8rem 1.2rem', marginBottom: '1.5rem', fontSize: '0.9rem', color: '#8B6914' }}>
            ⚠️ This page is for teacher/parent reference only. The interactive worksheet auto-grades when students click "Check Answers."
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            {Object.entries(allAnswers).map(([section, answers]) => (
              <div key={section} style={{ background: '#F9FAFB', border: '2px solid #E5E7EB', borderRadius: 12, padding: '1rem' }}>
                <h4 style={{ fontFamily: 'var(--font-fun)', fontWeight: 700, color: GREEN, marginBottom: '0.5rem', fontSize: '0.95rem' }}>
                  {section}
                </h4>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                  {answers.map((a, i) => (
                    <li key={i} style={{ fontSize: '0.82rem', color: '#374151', fontFamily: 'var(--font-fun)', display: 'flex', gap: '0.4rem' }}>
                      <span style={{ color: CORAL, fontWeight: 700 }}>{i+1}.</span> {a}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Final score summary */}
          <div style={{ marginTop: '1.5rem', background: '#1B4332', color: 'white', borderRadius: 12, padding: '1.2rem 1.5rem' }}>
            <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', marginBottom: '0.75rem', color: GOLD }}>
              📊 Score Breakdown
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '0.5rem', fontFamily: 'var(--font-fun)', fontSize: '0.85rem' }}>
              {[
                ['Section 1 – Map Challenge', s1Score, 4],
                ['Section 2 – Treasure Hunt', s2Score, 4],
                ['Section 3 – Numerator/Denom', s3Score, 10],
                ['Section 4 – Monster Maze', s4Score, 6],
                ['Section 5 – Pizza Kingdom', s5Score, 6],
                ['Section 6 – Equiv Bridge', s6Score, 8],
                ['Section 7 – Comparison Mt', s7Score, 8],
                ['Section 8 – Coding Puzzle', s8Score, 6],
                ['Section 9 – Real-Life Quest', s9Score, 5],
                ['Section 10 – Spin Challenge', spinScore, 8],
                ['Section 11 – Escape Cave', s11Score, 5],
                ['Section 12 – Boss Battle', s12Score, 10],
              ].map(([label, sc, max]) => (
                <div key={label} style={{ display: 'flex', justifyContent: 'space-between', background: 'rgba(255,255,255,0.1)', borderRadius: 6, padding: '0.3rem 0.6rem' }}>
                  <span style={{ opacity: 0.8 }}>{label}</span>
                  <strong style={{ color: GOLD }}>{sc}/{max}</strong>
                </div>
              ))}
              <div style={{ display: 'flex', justifyContent: 'space-between', background: GOLD, borderRadius: 6, padding: '0.3rem 0.6rem', color: '#4A3000' }}>
                <strong>TOTAL</strong>
                <strong>{totalScore}/{totalMax}</strong>
              </div>
            </div>
          </div>
        </Page>

      </div>
    </div>
  );
}

export default WorksheetHome;

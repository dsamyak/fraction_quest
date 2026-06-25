import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import intelliaLogo from '../assets/intellia-logo.jpeg';

/* ─── tiny helpers ─────────────────────────────────────────── */
const GREEN  = '#2D6A4F';
const GOLD   = '#E9C46A';
const CORAL  = '#E76F51';
const OCEAN  = '#219EBC';
const PURPLE = '#7B2D8E';

/* ─────────────────────────────────────────────────────────────
   STORY DATA — one story beat per section
   ───────────────────────────────────────────────────────────── */
const storySteps = [
  {
    step: 0,
    emoji: '🏴‍☠️',
    world: 'बंदरगाह',
    title: 'स्वागत है, खोजकर्ता!',
    blackbeardSays: "अर्रर! तो तुम मेरे खजाने को खोजना चाहते हो? तो तुम्हें अपने भाग (fraction) कौशल को साबित करना होगा! लॉगबुक में अपना नाम साइन करो और जीवन भर के रोमांच के लिए तैयार हो जाओ!",
    narrator: 'आप भाग (Fraction) द्वीप पर पहुंचते हैं। एक भूतिया समुद्री डाकू जहाज बंदरगाह में तैरता है, और कप्तान ब्लैकबियर्ड का भूत खुद आपको बुलाता है…',
    color: GREEN,
    bgGradient: 'linear-gradient(145deg, #E0F2FE, #F0F9FF)',
    borderColor: GREEN,
  },
  {
    step: 1,
    emoji: '🗺️',
    world: 'हाफ हिल बीच',
    title: 'फटा हुआ नक्शा',
    blackbeardSays: "तूफान में मेरा खजाने का नक्शा टूट गया था! प्रत्येक टुकड़ा एक भाग (fraction) आकार के साथ कोडित है। सही हिस्से को रंगें और इसे फिर से जोड़ने के लिए भागों की पहचान करें!",
    narrator: "हाफ हिल बीच पर लहरें टकराती हैं। चमकते हुए नक्शे के टुकड़े किनारे पर आ जाते हैं, प्रत्येक भाग (fraction) जादू के साथ धड़कता है…",
    color: '#0369A1',
    bgGradient: 'linear-gradient(145deg, #E0F2FE, #BFDBFE)',
    borderColor: OCEAN,
  },
  {
    step: 2,
    emoji: '💎',
    world: 'खजाना गुफा',
    title: 'खजाने की खोज',
    blackbeardSays: "गुफा में मेरे खजाने के संदूक दबे हुए हैं — लेकिन हर एक पर एक भाग (fraction) लिखा है! अपने जहाज को सही बंदरगाह पर ले जाकर प्रत्येक भाग को सही संदूक से मिलाएं!",
    narrator: "आप खजाने के संदूकों से जगमगाती एक छिपी हुई गुफा की खोज करते हैं। हर एक पर एक भाग (fraction) है — ब्लैकबियर्ड की सूची प्रणाली!",
    color: '#B45309',
    bgGradient: 'linear-gradient(145deg, #FDF6E3, #FEF3C7)',
    borderColor: GOLD,
  },
  {
    step: 3,
    emoji: '⚔️',
    world: 'समुद्री डाकू अकादमी',
    title: 'अंश बनाम हर (Numerator vs. Denominator)',
    blackbeardSays: "मेरे दल का हर समुद्री डाकू जानता है: अंश (numerator) शीर्ष संख्या है, हर (denominator) निचली संख्या है! मेरे गुप्त संदेशों को समझने से पहले तुम्हें दोनों को पहचानना सीखना होगा!",
    narrator: "आपको ब्लैकबियर्ड की पुरानी समुद्री डाकू अकादमी मिलती है, जिसे चट्टान में उकेरा गया है। हर दीवार पर भाग (fraction) के पाठ उकेरे गए हैं!",
    color: CORAL,
    bgGradient: 'linear-gradient(145deg, #FFF1F2, #FFE4E6)',
    borderColor: CORAL,
  },
  {
    step: 4,
    emoji: '🧟',
    world: 'प्रेतवाधित भूलभुलैया',
    title: 'भाग (Fraction) राक्षस भूलभुलैया',
    blackbeardSays: "मेरी पुरानी भूलभुलैया में छिपे भाग राक्षसों से सावधान रहें! उनके चंगुल से बचने और आगे का रास्ता खोजने के लिए प्रत्येक प्रश्न का सही उत्तर दें!",
    narrator: "नक्शा एक अंधेरी भूलभुलैया की ओर ले जाता है। चमकते हुए भाग राक्षस हर गलत मोड़ को रोकते हैं। केवल सही उत्तर ही आगे का मार्ग प्रशस्त करते हैं!",
    color: PURPLE,
    bgGradient: 'linear-gradient(145deg, #F5F3FF, #EDE9FE)',
    borderColor: PURPLE,
  },
  {
    step: 5,
    emoji: '🍕',
    world: 'पिज़्ज़ा साम्राज्य',
    title: "पिज़्ज़ा किंग की चुनौती",
    blackbeardSays: "आह, पिज़्ज़ा किंग! वह तुम्हें तभी जाने देगा जब तुम उसके पिज़्ज़ा के सटीक हिस्से को रंगोगे जो वह मांगता है — और भाग लिखोगे! एक उग्र राजा, लेकिन उसका द्वीप मेरे ज्वालामुखी के रास्ते पर है!",
    narrator: "आप उदार लेकिन विशेष पिज़्ज़ा किंग द्वारा शासित एक साम्राज्य में प्रवेश करते हैं। वह एक संदिग्ध मुस्कान के साथ टेबल पर पिज़्ज़ा का ढेर सरका देता है…",
    color: '#C2410C',
    bgGradient: 'linear-gradient(145deg, #FFF7ED, #FFEDD5)',
    borderColor: '#C2410C',
  },
  {
    step: 6,
    emoji: '🌉',
    world: 'जंगल नदी',
    title: 'समान भाग (Equivalent Fraction) पुल',
    blackbeardSays: "इस जंगल की नदी पर पुल समान भाग वाले पत्थरों से बनाया गया था — भागों के जोड़े जो मूल्य में समान (EQUAL) हैं! पुल को फिर से बनाने के लिए प्रत्येक जोड़ी में गायब संख्या खोजें!",
    narrator: "प्राचीन रस्सी पुल गिर गया है! भाग समीकरणों वाले पत्थर के स्लैब हर जगह बिखरे हुए हैं। आपको नदी के पार तख्ते बिछाने के लिए प्रत्येक समीकरण को पूरा करना होगा…",
    color: GREEN,
    bgGradient: 'linear-gradient(145deg, #ECFDF5, #D1FAE5)',
    borderColor: GREEN,
  },
  {
    step: 7,
    emoji: '⛰️',
    world: 'तुलना चोटियाँ',
    title: 'तुलना पर्वत',
    blackbeardSays: "ज्वालामुखी तक पहुँचने के लिए तुम्हें तुलना चोटियों पर चढ़ना होगा! प्रत्येक कगार पर दो भाग हैं — उनकी तुलना करने के लिए >, < या = का उपयोग करें। सही चुनें और तुम्हें ऊपर चढ़ने देने के लिए कगार उठेगी!",
    narrator: "एक विशाल पर्वत श्रृंखला ज्वालामुखी के रास्ते को अवरुद्ध करती है। ऊपर जाने का एकमात्र तरीका प्रत्येक कगार में उकेरी गई भाग तुलना चुनौतियों की एक श्रृंखला के माध्यम से है…",
    color: '#6B7280',
    bgGradient: 'linear-gradient(145deg, #F9FAFB, #F3F4F6)',
    borderColor: '#6B7280',
  },
  {
    step: 8,
    emoji: '🔐',
    world: "ब्लैकबियर्ड का गुप्त कक्ष",
    title: "इमोजी कोड पहेली",
    blackbeardSays: "हा! मेरी सबसे चालाक रक्षा — मैंने EMOJIS का उपयोग करके भागों को एन्कोड किया! कक्ष के दरवाजे से गुजरने के लिए तुम्हें मेरे गुप्त कोड को क्रैक करना होगा। मेरे द्वारा छोड़ी गई कुंजी का उपयोग करें!",
    narrator: "आप एक इमोजी-कोडित ताले के साथ सील किए गए एक छिपे हुए कक्ष की खोज करते हैं। दीवार पर एक फीका नोट ब्लैकबियर्ड की गुप्त कोड कुंजी को प्रकट करता है…",
    color: '#4F46E5',
    bgGradient: 'linear-gradient(145deg, #EEF2FF, #E0E7FF)',
    borderColor: '#4F46E5',
  },
  {
    step: 9,
    emoji: '🌍',
    world: 'द्वीप गांव',
    title: 'वास्तविक जीवन की खोज',
    blackbeardSays: "यहाँ के ग्रामीण आपको ज्वालामुखी दिखा सकते हैं — लेकिन तभी जब आप उनके दैनिक भाग (fraction) समस्याओं को हल करने में उनकी मदद कर सकें! उन्हें अपना गणित कौशल दिखाएं और वे आपको दिशा-निर्देश देंगे!",
    narrator: "आप एक अनुकूल द्वीप गांव में पहुंचते हैं। ग्रामीणों के दैनिक जीवन में भाग की समस्याएं हैं — ज्वालामुखी का मार्ग साझा करने से पहले उन्हें आपकी सहायता की आवश्यकता है!",
    color: '#0369A1',
    bgGradient: 'linear-gradient(145deg, #F0F9FF, #E0F2FE)',
    borderColor: OCEAN,
  },
  {
    step: 10,
    emoji: '🎡',
    world: 'समुद्री डाकू कार्निवल',
    title: 'स्पिन चैलेंज',
    blackbeardSays: "ज्वालामुखी के लगभग पास! लेकिन पहले — मेरा पुराना कार्निवल! भाग का पहिया घुमाएं, प्रश्न का उत्तर दें, और ज्वालामुखी के रास्ते में प्रवेश करने के लिए अपना भाग्यशाली टोकन अर्जित करें!",
    narrator: "एक हंसमुख कार्निवल प्रकट होता है, जो कहीं से भी नहीं आता है। केंद्र में एक विशाल भाग का पहिया घूमता है। ब्लैकबियर्ड का भूत शरारत से मुस्कुराता है जब वह उसकी ओर इशारा करता है…",
    color: '#B91C1C',
    bgGradient: 'linear-gradient(145deg, #FFF1F2, #FFE4E6)',
    borderColor: '#B91C1C',
  },
  {
    step: 11,
    emoji: '🦇',
    world: 'अंधेरी गुफा',
    title: 'भागने की गुफा',
    blackbeardSays: "मेरी खजाने की तिजोरी का प्रवेश द्वार इस अंधेरी गुफा से होकर जाता है! एक मशाल जलाने के लिए प्रत्येक चुनौती को हल करें और अपना रास्ता खोजें — अंधेरे में फंसें और आप खजाने तक कभी नहीं पहुंचेंगे!",
    narrator: "आपके सामने एक अंधेरी गुफा फैली हुई है। एकमात्र प्रकाश जादुई मशालों से आता है जो तब सक्रिय होते हैं जब भाग की चुनौतियाँ सही ढंग से हल हो जाती हैं…",
    color: '#374151',
    bgGradient: 'linear-gradient(145deg, #F9FAFB, #F3F4F6)',
    borderColor: '#374151',
  },
  {
    step: 12,
    emoji: '👾',
    world: 'ज्वालामुखी शिखर',
    title: 'अंतिम बॉस बैटल',
    blackbeardSays: "तुमने कर दिखाया! लेकिन खजाना तुम्हारा होने से पहले — तुम्हें मेरी सबसे बड़ी रचना का सामना करना होगा: भाग (FRACTION) बॉस! पर्याप्त नुकसान पहुंचाने और अपने पुरस्कार का दावा करने के लिए सभी 10 सवालों के सही जवाब दें!",
    narrator: "आप ज्वालामुखी शिखर पर चढ़ते हैं। जमीन हिलती है। लावा से ऊपर उठ रहा है भाग (Fraction) बॉस — खजाने का ब्लैकबियर्ड का परम रक्षक!",
    color: '#991B1B',
    bgGradient: 'linear-gradient(145deg, #FFF1F2, #FFE4E6)',
    borderColor: '#991B1B',
  },
  {
    step: 13,
    emoji: '🏆',
    world: 'खजाना तिजोरी',
    title: 'विजय! खजाना तुम्हारा है!',
    blackbeardSays: "अद्भुत! तुमने हर चुनौती पर विजय प्राप्त की है, हर राक्षस को हराया है, और हर भाग की पहेली को सुलझाया है! ब्लैकबियर्ड के द्वीप का खजाना तुम्हारा है, खोजकर्ता! बहुत बढ़िया!",
    narrator: "ज्वालामुखी एक चमकते हुए खजाने की तिजोरी को प्रकट करने के लिए खुलता है। सोने के सिक्कों, रत्नों और स्क्रॉल के पहाड़ कमरे को भर देते हैं — और आपका उपलब्धि का प्रमाण पत्र प्रतीक्षा कर रहा है!",
    color: '#B45309',
    bgGradient: 'linear-gradient(145deg, #FEF9C3, #FEF3C7)',
    borderColor: GOLD,
  },
];

const TOTAL_STEPS = storySteps.length; // 14 steps (0–13)

/* ─────────────────────────────────────────────────────────────
   ClickablePie — SVG pie chart
   ───────────────────────────────────────────────────────────── */
function ClickablePie({ parts, filled, onToggle, size = 140 }) {
  const cx = size / 2, cy = size / 2, r = size / 2 - 4;
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
    <svg width={size} height={size} style={{ display: 'block', cursor: 'pointer' }}>
      <circle cx={cx} cy={cy} r={r} fill="white" stroke={GREEN} strokeWidth={3} />
      {slices.map(({ d, i }) => (
        <path key={i} d={d} fill={filled[i] ? OCEAN : 'white'}
          stroke={GREEN} strokeWidth={2} onClick={() => onToggle(i)}
          style={{ cursor: 'pointer', transition: 'fill 0.2s' }} />
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
        <rect key={i} x={i * cellW + 1.5} y={1.5}
          width={cellW - 3} height={height - 3}
          rx={i === 0 ? 5 : (i === parts - 1 ? 5 : 0)}
          fill={filled[i] ? OCEAN : 'white'}
          stroke={GREEN} strokeWidth={1}
          onClick={() => onToggle(i)}
          style={{ cursor: 'pointer', transition: 'fill 0.2s' }} />
      ))}
    </svg>
  );
}

/* ─── Shared input style ─────────────────────────────────────── */
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

/* ─── Story header for each step ─────────────────────────────── */
function StoryHeader({ step }) {
  const s = storySteps[step];
  return (
    <div style={{
      background: s.bgGradient,
      border: `3px solid ${s.borderColor}`,
      borderRadius: 20,
      padding: '1.5rem',
      marginBottom: '1.5rem',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* World label */}
      <div style={{
        display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
        background: s.color, color: 'white',
        borderRadius: 'var(--radius-full)', padding: '0.2rem 0.8rem',
        fontSize: '0.75rem', fontFamily: 'var(--font-fun)',
        fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase',
        marginBottom: '0.75rem',
      }}>
        📍 {s.world}
      </div>

      <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
        <span style={{ fontSize: '3rem', flexShrink: 0 }}>{s.emoji}</span>
        <div style={{ flex: 1 }}>
          <h2 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(1.3rem, 2.5vw, 1.8rem)',
            color: '#1B4332',
            marginBottom: '0.5rem',
          }}>
            {s.title}
          </h2>
          <div style={{
            background: 'rgba(255,255,255,0.7)',
            border: `2px solid ${s.borderColor}`,
            borderRadius: 12,
            padding: '1rem',
            marginBottom: '0.5rem',
          }}>
            <div style={{
              fontFamily: 'var(--font-heading)', fontSize: '0.75rem',
              color: s.color, marginBottom: '0.3rem',
              letterSpacing: '0.05em', textTransform: 'uppercase',
            }}>
              🏴‍☠️ Captain Blackbeard says:
            </div>
            <p style={{
              fontFamily: 'var(--font-fun)', fontSize: '0.95rem',
              color: '#374151', lineHeight: 1.6,
              fontStyle: 'italic', margin: 0,
            }}>
              "{s.blackbeardSays}"
            </p>
          </div>
          <div style={{
            fontFamily: 'var(--font-fun)', fontSize: '0.82rem',
            color: '#6B7280', lineHeight: 1.5,
          }}>
            📖 {s.narrator}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   MAIN COMPONENT
   ───────────────────────────────────────────────────────────── */
function WorksheetHome() {
  const [currentStep, setCurrentStep] = useState(0);

  // ── Profile ──────────────────────────────────────────────────
  const [name, setName] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  // ── Section 1 — Fraction Map Challenge ───────────────────────
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

  // ── Section 2 — Treasure Hunt matching ───────────────────────
  const matchLeft  = ['1/3', '4/5', '5/8', '1/4'];
  const matchRight = [
    { id: 'A', text: '5 में से 4 रत्न लाल हैं 💎' },
    { id: 'B', text: '4 में से 1 सिक्का सोना है 🪙' },
    { id: 'C', text: '3 में से 1 तलवार चांदी की है ⚔️' },
    { id: 'D', text: '8 में से 5 मोती काले हैं 🖤' },
  ];
  const correctMatch = { '1/3': 'C', '4/5': 'A', '5/8': 'D', '1/4': 'B' };
  const [matchAnswers, setMatchAnswers] = useState({ '1/3': '', '4/5': '', '5/8': '', '1/4': '' });
  const [s2Checked, setS2Checked] = useState(false);
  const s2Score = matchLeft.filter(f => matchAnswers[f] === correctMatch[f]).length;

  // ── Section 3 — Numerator vs Denominator ─────────────────────
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

  // ── Section 4 — Monster Maze MCQ ─────────────────────────────
  const mazeQ = [
    { q: "ब्लैकबियर्ड ने एक सोने के सिक्के को 2 में बांट दिया। उसने 1 टुकड़ा रखा। उसने कितना भाग (fraction) रखा?", opts: ['1/4', '1/2', '3/4', '1/3'], ans: 1 },
    { q: 'एक जहाज में 8 तोपें हैं। 3 दागी जाती हैं। तोपों का कितना भाग दागा गया?', opts: ['3/5', '5/8', '3/8', '1/3'], ans: 2 },
    { q: 'नक्शा ½ बन चुका है। कंपास ¼ दिखाता है। कौन अधिक आगे है?', opts: ['1/4', '1/2', 'बराबर', 'कह नहीं सकते'], ans: 1 },
    { q: 'ब्लैकबियर्ड को खजाने का ²⁄₄ मिला। इसका सरल रूप क्या है?', opts: ['2/4', '1/2', '1/4', '3/4'], ans: 1 },
    { q: 'यहाँ 5 खजाने के संदूक हैं। 2 में सोना है। कितने भाग में सोना है?', opts: ['3/5', '2/3', '2/5', '5/2'], ans: 2 },
    { q: 'इनमें से कौन ⅓ (एक समान भाग) के बराबर है?', opts: ['2/9', '2/6', '3/9', '4/12'], ans: 1 },
  ];
  const [s4Answers, setS4Answers] = useState(Array(mazeQ.length).fill(null));
  const [s4Checked, setS4Checked] = useState(false);
  const s4Score = s4Answers.reduce((acc, a, i) => acc + (a === mazeQ[i].ans ? 1 : 0), 0);

  // ── Section 5 — Pizza Kingdom ─────────────────────────────────
  const [pizza1, setPizza1] = useState(Array(8).fill(false));
  const [pizza2, setPizza2] = useState(Array(6).fill(false));
  const [pizza3, setPizza3] = useState(Array(4).fill(false));
  const [pizzaAns, setPizzaAns] = useState(['', '', '']);
  const [s5Checked, setS5Checked] = useState(false);
  const pizzaGoals = [
    { parts: 8, goal: 3, label: 'पिज़्ज़ा का 3/8 भाग रंगें 🍕' },
    { parts: 6, goal: 4, label: 'पिज़्ज़ा का 4/6 भाग रंगें 🍕' },
    { parts: 4, goal: 1, label: 'पिज़्ज़ा का 1/4 भाग रंगें 🍕' },
  ];
  const pizzaStates  = [pizza1, pizza2, pizza3];
  const pizzaSetters = [setPizza1, setPizza2, setPizza3];
  const s5Score = (() => {
    let sc = 0;
    [pizza1, pizza2, pizza3].forEach((p, i) => { if (p.filter(Boolean).length === pizzaGoals[i].goal) sc++; });
    if (pizzaAns[0].replace(/\s/g,'') === '3/8') sc++;
    if (pizzaAns[1].replace(/\s/g,'') === '4/6' || pizzaAns[1].replace(/\s/g,'') === '2/3') sc++;
    if (pizzaAns[2].replace(/\s/g,'') === '1/4') sc++;
    return sc;
  })();

  // ── Section 6 — Equivalent Fraction Bridge ───────────────────
  const equivQ = [
    { given: '1/2 = __/4',  ans: '2'  },
    { given: '2/3 = __/9',  ans: '6'  },
    { given: '3/4 = 9/__',  ans: '12' },
    { given: '1/5 = 2/__',  ans: '10' },
    { given: '4/6 = __/3',  ans: '2'  },
    { given: '3/8 = 6/__',  ans: '16' },
    { given: '2/5 = __/15', ans: '6'  },
    { given: '5/10 = 1/__', ans: '2'  },
  ];
  const [s6Inputs, setS6Inputs] = useState(equivQ.map(() => ''));
  const [s6Checked, setS6Checked] = useState(false);
  const s6Score = s6Inputs.reduce((acc, v, i) => acc + (v.trim() === equivQ[i].ans ? 1 : 0), 0);

  // ── Section 7 — Comparison Mountain ──────────────────────────
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

  // ── Section 8 — Fraction Coding Puzzle ───────────────────────
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
    if (clean === codeQ[i].ans) return acc + 1;
    if (codeQ[i].ans === '4/8' && clean === '1/2') return acc + 1;
    if (codeQ[i].ans === '2/4' && clean === '1/2') return acc + 1;
    return acc;
  }, 0);

  // ── Section 9 — Real-Life Quest ───────────────────────────────
  const rlQ = [
    { q: "ब्लैकबियर्ड के पास 12 सोने के सिक्के हैं। 4 शापित हैं। कितना भाग शापित है?", ans: '1/3', hint: '4/12 = ?' },
    { q: "एक रस्सी को 5 समान भागों में काटा गया है। 2 भाग लंगर को पकड़ते हैं। कितना भाग बचा (LEFT) है?", ans: '3/5', hint: 'बचा हुआ = कुल − उपयोग किया गया' },
    { q: "डेक पर 30 समुद्री डाकू। 10 सो रहे हैं। कितना भाग सो रहा है?", ans: '1/3', hint: '10/30 = ?' },
    { q: "एक पानी के बैरल में 8 कप आते हैं। 6 कप ताजा पानी है। कितना भाग ताजा है?", ans: '3/4', hint: '6/8 = ?' },
    { q: "9 खजाने के रत्न मिले। 6 हीरे हैं। कौन सा भाग हीरा नहीं है?", ans: '1/3', hint: 'हीरा नहीं = 9 − 6 = 3' },
  ];
  const [s9Inputs, setS9Inputs] = useState(Array(rlQ.length).fill(''));
  const [s9Checked, setS9Checked] = useState(false);
  const s9Score = s9Inputs.reduce((acc, v, i) => acc + (v.replace(/\s/g,'') === rlQ[i].ans ? 1 : 0), 0);

  // ── Section 10 — Fraction Spin Challenge ──────────────────────
  const spinSlices = ['1/2','1/4','3/4','1/3','2/3','3/8','5/8','1/8'];
  const spinColors = ['#E76F51','#219EBC','#E9C46A','#7B2D8E','#52B788','#E63946','#F4A261','#06D6A0'];
  const [spinResult, setSpinResult]   = useState(null);
  const [spinAngle, setSpinAngle]     = useState(0);
  const [spinning, setSpinning]       = useState(false);
  const [spinQ, setSpinQ]             = useState(null);
  const [spinInput, setSpinInput]     = useState('');
  const [spinFeedback, setSpinFeedback] = useState(null);
  const [spinScore, setSpinScore]     = useState(0);
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
        '1/2': { q: "ब्लैकबियर्ड ने एक केक को आधा काट दिया। कौन सा भाग 1/2 के बराबर है?", ans: '2/4', opts: ['2/4','1/3','3/8'] },
        '1/4': { q: "क्या 1/4, 1/2 से बड़ा है या छोटा?", ans: 'छोटा', opts: ['bigger','छोटा','equal'] },
        '3/4': { q: "कितने चौथाई-सिक्के मिलकर एक सिक्के का 3/4 बनाते हैं?", ans: '3', opts: ['2','3','4'] },
        '1/3': { q: "कौन सा भाग 1/3 के बराबर है?", ans: '2/6', opts: ['2/6','3/8','2/5'] },
        '2/3': { q: "2/3 + 1/3 = ?", ans: '1', opts: ['3/6','1','2/3'] },
        '3/8': { q: "क्या 3/8, 1/2 से अधिक (more) है या कम (less)?", ans: 'कम', opts: ['अधिक','कम','equal'] },
        '5/8': { q: "क्या 5/8, 1/2 से अधिक (more) है या कम (less)?", ans: 'अधिक', opts: ['अधिक','कम','equal'] },
        '1/8': { q: "एक पूरा खजाना बनाने के लिए कितने आठवें भाग लगते हैं?", ans: '8', opts: ['4','6','8'] },
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

  // ── Section 11 — Escape Cave ──────────────────────────────────
  const escapeSteps = [
    { q: "छोटे से बड़े के क्रम में लगाएं: 1/2, 1/4, 3/4", ans: '1/4, 1/2, 3/4', type: 'text' },
    { q: "0 और 1 के बीच संख्या रेखा का कौन सा भाग आधा है?", ans: '1/2', type: 'text' },
    { q: "2/3 के लिए एक समान भाग (fraction) लिखें", ans: '4/6', type: 'text', altAns: ['6/9','8/12','10/15'] },
    { q: "कौन बड़ा है: 5/6 या 7/8? बड़ा वाला लिखें।", ans: '7/8', type: 'text' },
    { q: "ब्लैकबियर्ड ने 9 में से 3 बिस्कुट खाए। यह कौन सा भाग है? सरल करें!", ans: '1/3', type: 'text' },
  ];
  const [s11Inputs, setS11Inputs] = useState(Array(escapeSteps.length).fill(''));
  const [s11Checked, setS11Checked] = useState(false);
  const s11Score = s11Inputs.reduce((acc, v, i) => {
    const clean = v.replace(/\s/g,'');
    if (clean === escapeSteps[i].ans) return acc + 1;
    if (escapeSteps[i].altAns && escapeSteps[i].altAns.includes(clean)) return acc + 1;
    return acc;
  }, 0);

  // ── Section 12 — Boss Battle ──────────────────────────────────
  const bossQ = [
    { q: 'सबसे बड़ा (GREATEST) भाग कौन सा है?', opts: ['1/2','3/4','1/3','2/5'], ans: 1 },
    { q: '6/8 का सरल रूप है...', opts: ['3/4','2/3','1/2','4/6'], ans: 0 },
    { q: 'कौन सा भाग 50% के बराबर है?', opts: ['1/4','3/4','1/2','2/3'], ans: 2 },
    { q: '¼ + ¼ = ?', opts: ['1/4','2/8','1/2','3/4'], ans: 2 },
    { q: '1 पूरे को चौथाई के रूप में कैसे लिखा जाएगा?', opts: ['2/4','3/4','4/4','5/4'], ans: 2 },
    { q: "ब्लैकबियर्ड ने अपने जूस का ⅝ पी लिया। कितना बचा (LEFT) है?", opts: ['5/8','3/8','2/8','4/8'], ans: 1 },
    { q: 'कौन सा जोड़ा समान भाग है?', opts: ['1/2 और 2/5','3/4 और 6/8','1/3 और 1/4','2/3 और 3/4'], ans: 1 },
    { q: '12 रत्नों में से 3 नीले हैं। सरल रूप में कौन सा भाग है?', opts: ['3/12','1/4','1/3','2/6'], ans: 1 },
    { q: 'संख्या रेखा पर कौन सा भाग 1 के सबसे करीब है?', opts: ['1/4','1/2','3/4','4/5'], ans: 3 },
    { q: 'आधे का आधा होता है...', opts: ['1/4','1/3','1/2','2/4'], ans: 0 },
  ];
  const [s12Answers, setS12Answers] = useState(Array(bossQ.length).fill(null));
  const [s12Checked, setS12Checked] = useState(false);
  const s12Score = s12Answers.reduce((acc, a, i) => acc + (a === bossQ[i].ans ? 1 : 0), 0);

  // ── Total score ───────────────────────────────────────────────
  const totalScore = s1Score + s2Score + s3Score + s4Score + s5Score +
                     s6Score + s7Score + s8Score + s9Score + spinScore +
                     s11Score + s12Score;
  const totalMax = 4 + 4 + 10 + 6 + 6 + 8 + 8 + 6 + 5 + 8 + 5 + 10;

  // ── Navigation ────────────────────────────────────────────────
  const goNext = () => { if (currentStep < TOTAL_STEPS - 1) { setCurrentStep(s => s + 1); window.scrollTo(0,0); }};
  const goPrev = () => { if (currentStep > 0) { setCurrentStep(s => s - 1); window.scrollTo(0,0); }};

  // ── Answer key ────────────────────────────────────────────────
  const allAnswers = {
    'Section 1': ['2 में से 1 भाग को रंगें', '4 में से 3 भाग को रंगें', '2/4 (or 1/2)', '1/3'],
    'Section 2': ['1/3 → C', '4/5 → A', '5/8 → D', '1/4 → B'],
    'Section 3': numDenQ.map(q => `${q.frac}: अंश=${q.numAns}, हर=${q.denAns}`),
    'Section 4': mazeQ.map((q, i) => `Q${i+1}: ${q.opts[q.ans]}`),
    'Section 5': ['8 में से 3 स्लाइस को रंगें', '6 में से 4 स्लाइस को रंगें', '4 में से 1 स्लाइस को रंगें'],
    'Section 6': equivQ.map(q => `${q.given.replace('__', q.ans)}`),
    'Section 7': compQ.map(q => `${q.f1} ${q.ans} ${q.f2}`),
    'Section 8': codeQ.map(q => `${q.puzzle} = ${q.ans}`),
    'Section 9': rlQ.map(q => q.ans),
    'Section 11': escapeSteps.map(q => q.ans),
    'Section 12': bossQ.map(q => `${q.opts[q.ans]}`),
  };

  const progress = ((currentStep) / (TOTAL_STEPS - 1)) * 100;
  const story = storySteps[currentStep];

  // ══════════════════════════════════════════════════════════════
  // RENDER
  // ══════════════════════════════════════════════════════════════
  return (
    <div style={{ background: '#F0EDE8', minHeight: '100vh' }}>

      {/* Print styles */}
      <style>{`
        @media print {
          .no-print { display: none !important; }
          .print-only { display: block !important; }
          body { background: white !important; }
          .print-page { page-break-after: always; border: none !important; box-shadow: none !important; }
        }
        @media screen { .print-only { display: none; } }
        @keyframes stepIn {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .step-animate { animation: stepIn 0.4s ease-out forwards; }
      `}</style>

      {/* ── TOP TOOLBAR ─────────────────────────────────────────── */}
      <div className="no-print wood-header" style={{
        padding: '0.7rem 1.5rem',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        position: 'sticky', top: 0, zIndex: 50, gap: '0.5rem', flexWrap: 'wrap',
      }}>
        <Link to="/" className="btn btn-secondary" style={{ fontSize: '0.8rem', padding: '0.4rem 0.8rem' }}>
          🏝️ Back to Harbor
        </Link>

        <div style={{
          fontFamily: 'var(--font-heading)', fontSize: '1.1rem',
          textShadow: '2px 2px 0 rgba(0,0,0,0.3)',
          display: 'flex', alignItems: 'center', gap: '0.5rem',
        }}>
          <img src={intelliaLogo} alt="Intellia 360" style={{
            height: 28, width: 28, borderRadius: '50%', objectFit: 'cover',
            border: '2px solid rgba(255,255,255,0.5)',
          }} />
          🏴‍☠️ Captain Blackbeard's Fraction Quest
        </div>

        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{
            background: 'rgba(255,255,255,0.2)', borderRadius: 8,
            padding: '0.4rem 0.8rem',
            fontFamily: 'var(--font-fun)', fontWeight: 700, fontSize: '0.85rem', color: 'white',
          }}>
            🏆 {totalScore}/{totalMax}
          </div>
          <button className="btn btn-treasure" style={{ fontSize: '0.82rem', padding: '0.45rem 1rem' }}
            onClick={() => window.print()}>
            🖨️ Print All
          </button>
        </div>
      </div>

      {/* ── PROGRESS BAR ─────────────────────────────────────────── */}
      <div className="no-print" style={{
        width: '100%', height: 6,
        background: 'rgba(0,0,0,0.1)', position: 'sticky', top: '3.8rem', zIndex: 49,
      }}>
        <div style={{
          height: '100%', width: `${progress}%`,
          background: `linear-gradient(90deg, ${story.color}, ${GOLD})`,
          transition: 'width 0.5s ease',
          boxShadow: `0 0 8px ${story.color}80`,
        }} />
      </div>

      {/* ── STEP INDICATOR ───────────────────────────────────────── */}
      <div className="no-print" style={{
        display: 'flex', justifyContent: 'center', alignItems: 'center',
        gap: '0.4rem', padding: '0.75rem 1rem', background: 'rgba(0,0,0,0.04)',
        flexWrap: 'wrap',
      }}>
        {storySteps.map((s, i) => (
          <button
            key={i}
            onClick={() => { setCurrentStep(i); window.scrollTo(0,0); }}
            title={s.title}
            style={{
              width: i === currentStep ? 28 : 18,
              height: 10,
              borderRadius: 5,
              border: 'none',
              background: i < currentStep ? GREEN : i === currentStep ? story.color : '#D1D5DB',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              boxShadow: i === currentStep ? `0 0 6px ${story.color}` : 'none',
            }}
          />
        ))}
        <span style={{
          fontFamily: 'var(--font-fun)', fontSize: '0.8rem', color: '#6B7280',
          marginLeft: '0.5rem',
        }}>
          {currentStep + 1} / {TOTAL_STEPS}
        </span>
      </div>

      {/* ── MAIN CONTENT WRAPPER ─────────────────────────────────── */}
      <div style={{
        maxWidth: '8.5in', margin: '1rem auto 2rem',
        padding: '0 1rem',
        fontFamily: 'var(--font-body)',
      }}>

        {/* ══════════════════════════════════════════════════════════
            STEP 0 — COVER + PROFILE
        ══════════════════════════════════════════════════════════ */}
        {currentStep === 0 && (
          <div className="step-animate">
            {/* PRINT: full worksheet (hidden on screen) */}
            <div className="print-only" style={{ display: 'none' }}>
              <AllPrintablePages
                name={name} date={date}
                s1a={s1a} s1b={s1b} s1c={s1c} s1d={s1d} s1Score={s1Score}
                matchLeft={matchLeft} matchRight={matchRight} matchAnswers={matchAnswers} s2Score={s2Score}
                numDenQ={numDenQ} s3Inputs={s3Inputs} s3Score={s3Score}
                mazeQ={mazeQ} s4Answers={s4Answers} s4Score={s4Score}
                pizzaGoals={pizzaGoals} pizzaStates={pizzaStates} pizzaAns={pizzaAns} s5Score={s5Score}
                equivQ={equivQ} s6Inputs={s6Inputs} s6Score={s6Score}
                compQ={compQ} s7Answers={s7Answers} s7Score={s7Score}
                codeKey={codeKey} codeQ={codeQ} s8Inputs={s8Inputs} s8Score={s8Score}
                rlQ={rlQ} s9Inputs={s9Inputs} s9Score={s9Score}
                spinScore={spinScore} spinAttempts={spinAttempts}
                escapeSteps={escapeSteps} s11Inputs={s11Inputs} s11Score={s11Score}
                bossQ={bossQ} s12Answers={s12Answers} s12Score={s12Score}
                totalScore={totalScore} totalMax={totalMax}
                allAnswers={allAnswers} intelliaLogo={intelliaLogo}
              />
            </div>

            <StoryHeader step={0} />

            <div style={{
              background: 'white', border: `3px solid ${GREEN}`,
              borderRadius: 20, padding: '2rem',
              boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
            }}>
              {/* Title */}
              <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <div style={{
                  fontFamily: 'var(--font-fun)', fontSize: '0.8rem', color: CORAL,
                  fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase',
                  marginBottom: '0.5rem',
                }}>
                  ⭐ Captain Blackbeard's ⭐
                </div>
                <h1 style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(2rem, 4vw, 3rem)', color: GREEN, marginBottom: '0.2rem',
                }}>
                  Fractions Adventure
                </h1>
                <h2 style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)', color: '#D68C3A',
                }}>
                  The Lost Treasure of Fraction Island 🏴‍☠️
                </h2>
              </div>

              {/* Story intro */}
              <div style={{
                background: '#FDF6E3', padding: '1.5rem',
                border: '3px solid #8B6914', borderRadius: 16, marginBottom: '1.5rem',
              }}>
                <p style={{ fontSize: '1rem', lineHeight: 1.7, color: '#5C3D0F', fontWeight: 600, marginBottom: '0.5rem' }}>
                  🏴‍☠️ <strong>Ahoy, young explorer!</strong> The legendary Captain Blackbeard hid his greatest treasure on Fraction Island!
                  He scrambled his clues using fraction puzzles so only the smartest mathematicians could find it.
                </p>
                <p style={{ fontSize: '1rem', lineHeight: 1.7, color: '#5C3D0F', fontWeight: 600 }}>
                  ⚔️ You must journey through 12 fraction challenges — each one guarded by a different creature or mystery.
                  Solve them all and the treasure shall be yours! <strong>Are you ready for the adventure?</strong>
                </p>
              </div>

              {/* Explorer Profile */}
              <div style={{
                border: `3px solid ${GREEN}`, borderRadius: 16, padding: '1.5rem',
                background: 'linear-gradient(145deg, #E0F2FE, #F0F9FF)',
              }}>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', color: GREEN, marginBottom: '1rem' }}>
                  🗺️ Explorer Profile
                </h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
                  <span style={{ fontWeight: 700, fontSize: '1rem', minWidth: 50 }}>Name:</span>
                  <input
                    value={name} onChange={e => setName(e.target.value)}
                    placeholder="Enter your explorer name…"
                    style={{
                      flex: 1, minWidth: 180, border: `2px solid ${GREEN}`,
                      borderRadius: 8, padding: '0.4rem 0.8rem',
                      fontFamily: 'var(--font-fun)', fontSize: '1rem', background: 'white', outline: 'none',
                    }}
                  />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.2rem', flexWrap: 'wrap' }}>
                  <span style={{ fontWeight: 700, fontSize: '1rem', minWidth: 50 }}>Date:</span>
                  <input type="date" value={date} onChange={e => setDate(e.target.value)}
                    style={{
                      border: `2px solid ${GREEN}`, borderRadius: 8, padding: '0.4rem 0.8rem',
                      fontFamily: 'var(--font-fun)', fontSize: '1rem', background: 'white', outline: 'none',
                    }}
                  />
                </div>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <div style={{
                    width: 120, height: 120, border: '3px dashed #9CA3AF',
                    borderRadius: '50%', display: 'flex', alignItems: 'center',
                    justifyContent: 'center', color: '#9CA3AF', textAlign: 'center',
                    padding: '0.5rem', background: 'white', fontSize: '0.8rem',
                  }}>
                    Draw Your Avatar Here 🎨
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════
            STEP 1 — SECTION 1: Fraction Map Challenge
        ══════════════════════════════════════════════════════════ */}
        {currentStep === 1 && (
          <div className="step-animate">
            <StoryHeader step={1} />
            <div style={{ background: 'white', borderRadius: 20, padding: '2rem', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', border: `3px solid ${OCEAN}` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: `4px solid ${GREEN}`, paddingBottom: '0.6rem', marginBottom: '1.4rem' }}>
                <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.3rem,2.5vw,1.8rem)', color: '#1B4332' }}>
                  🗺️ Challenge 1: The Torn Map
                </h2>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, border: `2px solid ${GREEN}`, padding: '0.3rem 0.7rem', borderRadius: 6, background: '#F0F9FF' }}>
                  स्कोर: {s1Score}/4
                </div>
              </div>
              <p style={{ marginBottom: '1.5rem', lineHeight: 1.6 }}>
                The pirate map is torn! <strong>Click the shapes</strong> to color the correct fraction, or type the fraction shown.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                {/* a) Color 1/2 */}
                <div style={{ border: '2px solid #D1D5DB', padding: '1.2rem', borderRadius: 12, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
                  <h4 style={{ fontFamily: 'var(--font-fun)', fontWeight: 700, color: GREEN, fontSize: '1rem' }}>
                    a) Color <strong>1/2</strong> of the circle
                  </h4>
                  <ClickablePie parts={2} filled={s1a} onToggle={i => setS1a(p => { const n=[...p]; n[i]=!n[i]; return n; })} />
                  <div style={{ fontSize: '0.8rem', color: '#6B7280' }}>
                    {s1a.filter(Boolean).length}/2 colored
                    {s1Checked && (s1a.filter(Boolean).length===1 ? ' ✅' : ' ❌ (need exactly 1)')}
                  </div>
                </div>

                {/* b) Color 3/4 */}
                <div style={{ border: '2px solid #D1D5DB', padding: '1.2rem', borderRadius: 12, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
                  <h4 style={{ fontFamily: 'var(--font-fun)', fontWeight: 700, color: GREEN, fontSize: '1rem' }}>
                    b) Color <strong>3/4</strong> of the bar
                  </h4>
                  <ClickableBar parts={4} filled={s1b} onToggle={i => setS1b(p => { const n=[...p]; n[i]=!n[i]; return n; })} width={200} height={60} />
                  <div style={{ fontSize: '0.8rem', color: '#6B7280' }}>
                    {s1b.filter(Boolean).length}/4 colored
                    {s1Checked && (s1b.filter(Boolean).length===3 ? ' ✅' : ' ❌ (need exactly 3)')}
                  </div>
                </div>

                {/* c) What fraction is shaded? (2/4) */}
                <div style={{ border: '2px solid #D1D5DB', padding: '1.2rem', borderRadius: 12, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
                  <h4 style={{ fontFamily: 'var(--font-fun)', fontWeight: 700, color: GREEN, fontSize: '1rem' }}>
                    c) What fraction is shaded?
                  </h4>
                  <svg width={200} height={55}>
                    {[0,1,2,3].map(i => (
                      <rect key={i} x={i*50+1.5} y={1.5} width={47} height={52}
                        rx={i===0?5:(i===3?5:0)} fill={i<2?OCEAN:'white'} stroke={GREEN} strokeWidth={2}/>
                    ))}
                  </svg>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontWeight: 600 }}>Answer:</span>
                    <input value={s1c} onChange={e => setS1c(e.target.value)} placeholder="e.g. 2/4"
                      style={inputStyle(s1Checked, s1c.replace(/\s/g,'') === '2/4' || s1c.replace(/\s/g,'') === '1/2')} />
                    {s1Checked && <span>{(s1c.replace(/\s/g,'') === '2/4' || s1c.replace(/\s/g,'') === '1/2') ? '✅' : '❌ (2/4)'}</span>}
                  </div>
                </div>

                {/* d) What fraction is shaded? (1/3) */}
                <div style={{ border: '2px solid #D1D5DB', padding: '1.2rem', borderRadius: 12, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
                  <h4 style={{ fontFamily: 'var(--font-fun)', fontWeight: 700, color: GREEN, fontSize: '1rem' }}>
                    d) What fraction is shaded?
                  </h4>
                  <svg width={180} height={55}>
                    {[0,1,2].map(i => (
                      <rect key={i} x={i*60+1.5} y={1.5} width={57} height={52}
                        rx={i===0?5:(i===2?5:0)} fill={i===0?OCEAN:'white'} stroke={GREEN} strokeWidth={2}/>
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
                <button className="btn btn-primary" onClick={() => setS1Checked(true)}>✅ Check My Answers</button>
              </div>
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════
            STEP 2 — SECTION 2: Treasure Hunt Matching
        ══════════════════════════════════════════════════════════ */}
        {currentStep === 2 && (
          <div className="step-animate">
            <StoryHeader step={2} />
            <div style={{ background: 'white', borderRadius: 20, padding: '2rem', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', border: `3px solid ${GOLD}` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: `4px solid ${GREEN}`, paddingBottom: '0.6rem', marginBottom: '1.4rem' }}>
                <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.3rem,2.5vw,1.8rem)', color: '#1B4332' }}>
                  💎 Challenge 2: The Treasure Hunt
                </h2>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, border: `2px solid ${GREEN}`, padding: '0.3rem 0.7rem', borderRadius: 6, background: '#F0F9FF' }}>
                  स्कोर: {s2Score}/4
                </div>
              </div>
              <p style={{ marginBottom: '1.5rem', lineHeight: 1.6 }}>
                Match each fraction to the treasure chest it describes. Use the dropdown to select the correct chest.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: 540, margin: '0 auto' }}>
                {matchLeft.map(frac => (
                  <div key={frac} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem 1.5rem', background: '#F0F9FF', border: `3px solid ${OCEAN}`, borderRadius: 12 }}>
                    <span style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', color: '#1B4332', minWidth: 70 }}>{frac}</span>
                    <span style={{ fontWeight: 700, fontSize: '1.2rem' }}>→</span>
                    <select value={matchAnswers[frac]}
                      onChange={e => setMatchAnswers(p => ({ ...p, [frac]: e.target.value }))}
                      style={{
                        flex: 1, border: `2px solid ${s2Checked ? (matchAnswers[frac] === correctMatch[frac] ? '#06D6A0' : '#E63946') : '#9CA3AF'}`,
                        borderRadius: 8, padding: '0.4rem 0.6rem',
                        fontFamily: 'var(--font-fun)', fontSize: '0.95rem', background: 'white', outline: 'none',
                      }}>
                      <option value="">-- Choose a chest --</option>
                      {matchRight.map(r => <option key={r.id} value={r.id}>{r.id}: {r.text}</option>)}
                    </select>
                    {s2Checked && (matchAnswers[frac] === correctMatch[frac]
                      ? <span style={{ color: '#06D6A0', fontSize: '1.3rem' }}>✅</span>
                      : <span style={{ color: '#E63946', fontSize: '1.3rem' }}>❌</span>
                    )}
                  </div>
                ))}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginTop: '1.5rem', padding: '1rem 1.5rem', background: '#FDF6E3', border: '2px solid #8B6914', borderRadius: 12 }}>
                <h4 style={{ gridColumn: '1/-1', fontFamily: 'var(--font-fun)', fontWeight: 700, fontSize: '1rem', color: '#8B6914', marginBottom: '0.25rem' }}>📦 Treasure Chests:</h4>
                {matchRight.map(r => (
                  <div key={r.id} style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', fontSize: '0.9rem' }}>
                    <strong style={{ color: CORAL }}>{r.id}:</strong> {r.text}
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1.5rem' }}>
                <button className="btn btn-primary" onClick={() => setS2Checked(true)}>✅ Check Matches</button>
              </div>
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════
            STEP 3 — SECTION 3: Numerator vs Denominator
        ══════════════════════════════════════════════════════════ */}
        {currentStep === 3 && (
          <div className="step-animate">
            <StoryHeader step={3} />
            <div style={{ background: 'white', borderRadius: 20, padding: '2rem', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', border: `3px solid ${CORAL}` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: `4px solid ${GREEN}`, paddingBottom: '0.6rem', marginBottom: '1.4rem' }}>
                <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.3rem,2.5vw,1.8rem)', color: '#1B4332' }}>
                  ⚔️ Challenge 3: Numerator vs. Denominator
                </h2>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, border: `2px solid ${GREEN}`, padding: '0.3rem 0.7rem', borderRadius: 6, background: '#F0F9FF' }}>
                  स्कोर: {s3Score}/10
                </div>
              </div>
              <p style={{ marginBottom: '1rem', lineHeight: 1.6 }}>
                For each fraction, identify the <strong style={{ color: CORAL }}>numerator</strong> (top) and <strong style={{ color: OCEAN }}>denominator</strong> (bottom).
              </p>
              <div style={{ background: '#FFF9C4', border: '2px solid #F4A261', borderRadius: 12, padding: '0.9rem 1.2rem', marginBottom: '1.5rem', fontSize: '0.92rem' }}>
                💡 <strong>Blackbeard's Tip:</strong> Numerator = top number (how many ye have) | Denominator = bottom number (total parts)
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {numDenQ.map((q, i) => {
                  const numOk = s3Inputs[i].num.trim() === q.numAns;
                  const denOk = s3Inputs[i].den.trim() === q.denAns;
                  return (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem 1.5rem', background: '#F9FAFB', border: '2px solid #E5E7EB', borderRadius: 12, flexWrap: 'wrap' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 60, border: `2px solid ${GREEN}`, borderRadius: 8, padding: '0.4rem 0.8rem', background: 'white' }}>
                        <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', color: CORAL }}>{q.frac.split('/')[0]}</span>
                        <div style={{ width: '100%', height: 2, background: GREEN, margin: '2px 0' }}/>
                        <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', color: OCEAN }}>{q.frac.split('/')[1]}</span>
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
                <button className="btn btn-primary" onClick={() => setS3Checked(true)}>✅ उत्तर जांचें</button>
              </div>
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════
            STEP 4 — SECTION 4: Fraction Monster Maze
        ══════════════════════════════════════════════════════════ */}
        {currentStep === 4 && (
          <div className="step-animate">
            <StoryHeader step={4} />
            <div style={{ background: 'white', borderRadius: 20, padding: '2rem', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', border: `3px solid ${PURPLE}` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: `4px solid ${GREEN}`, paddingBottom: '0.6rem', marginBottom: '1.4rem' }}>
                <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.3rem,2.5vw,1.8rem)', color: '#1B4332' }}>
                  🧟 Challenge 4: The Fraction Monster Maze
                </h2>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, border: `2px solid ${GREEN}`, padding: '0.3rem 0.7rem', borderRadius: 6, background: '#F0F9FF' }}>
                  स्कोर: {s4Score}/6
                </div>
              </div>

              {/* Maze progress */}
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.3rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '1.4rem' }}>🏁</span>
                {mazeQ.map((_, i) => (
                  <React.Fragment key={i}>
                    <div style={{
                      width: 34, height: 34, borderRadius: '50%',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      background: s4Answers[i] === mazeQ[i].ans ? '#06D6A0' : (s4Answers[i] !== null ? '#E63946' : '#E5E7EB'),
                      border: '2px solid',
                      borderColor: s4Answers[i] === mazeQ[i].ans ? '#047857' : (s4Answers[i] !== null ? '#991B1B' : '#9CA3AF'),
                      fontFamily: 'var(--font-heading)', fontSize: '0.82rem',
                      color: s4Answers[i] !== null ? 'white' : '#6B7280',
                    }}>
                      {s4Answers[i] === mazeQ[i].ans ? '✓' : (s4Answers[i] !== null ? '✗' : i+1)}
                    </div>
                    {i < mazeQ.length-1 && <div style={{ width: 18, height: 3, background: s4Answers[i] === mazeQ[i].ans ? '#06D6A0' : '#E5E7EB', borderRadius: 2 }}/>}
                  </React.Fragment>
                ))}
                <span style={{ fontSize: '1.4rem' }}>🏆</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {mazeQ.map((q, i) => (
                  <div key={i} style={{ padding: '1rem 1.2rem', background: '#F9FAFB', border: `2px solid ${s4Answers[i] === q.ans ? '#06D6A0' : (s4Answers[i] !== null ? '#E63946' : '#E5E7EB')}`, borderRadius: 12 }}>
                    <div style={{ fontWeight: 700, marginBottom: '0.6rem', fontSize: '0.97rem' }}>Q{i+1}. {q.q}</div>
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                      {q.opts.map((opt, j) => (
                        <button key={j}
                          onClick={() => { if (s4Answers[i] !== null) return; setS4Answers(p => { const n=[...p]; n[i]=j; return n; }); }}
                          style={{
                            padding: '0.4rem 1rem',
                            border: `2px solid ${s4Answers[i] === j ? (j === q.ans ? '#06D6A0' : '#E63946') : '#9CA3AF'}`,
                            borderRadius: 8,
                            background: s4Answers[i] === j ? (j === q.ans ? '#F0FDF4' : '#FFF1F2') : 'white',
                            cursor: s4Answers[i] !== null ? 'default' : 'pointer',
                            fontFamily: 'var(--font-fun)', fontSize: '0.93rem', transition: 'all 0.2s',
                          }}>
                          {opt}
                        </button>
                      ))}
                      {s4Answers[i] !== null && s4Answers[i] !== q.ans && (
                        <span style={{ color: '#065F46', fontWeight: 700, alignSelf: 'center', fontSize: '0.83rem' }}>
                          ✓ {q.opts[q.ans]}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════
            STEP 5 — SECTION 5: Pizza Kingdom
        ══════════════════════════════════════════════════════════ */}
        {currentStep === 5 && (
          <div className="step-animate">
            <StoryHeader step={5} />
            <div style={{ background: 'white', borderRadius: 20, padding: '2rem', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', border: '3px solid #C2410C' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: `4px solid ${GREEN}`, paddingBottom: '0.6rem', marginBottom: '1.4rem' }}>
                <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.3rem,2.5vw,1.8rem)', color: '#1B4332' }}>
                  🍕 Challenge 5: The Pizza King's Challenge
                </h2>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, border: `2px solid ${GREEN}`, padding: '0.3rem 0.7rem', borderRadius: 6, background: '#F0F9FF' }}>
                  स्कोर: {s5Score}/6
                </div>
              </div>
              <p style={{ marginBottom: '1.5rem', lineHeight: 1.6 }}>
                <strong>Click the pizza slices</strong> to color the correct fraction, then write the fraction in the box.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                {pizzaGoals.map((goal, gi) => (
                  <div key={gi} style={{ border: '2px solid #D1D5DB', borderRadius: 12, padding: '1.2rem', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
                    <h4 style={{ fontFamily: 'var(--font-fun)', fontWeight: 700, color: CORAL, fontSize: '0.95rem' }}>{goal.label}</h4>
                    <ClickablePie parts={goal.parts} filled={pizzaStates[gi]}
                      onToggle={i => pizzaSetters[gi](p => { const n=[...p]; n[i]=!n[i]; return n; })}
                      size={140} />
                    <div style={{ fontSize: '0.8rem', color: '#6B7280' }}>
                      {pizzaStates[gi].filter(Boolean).length}/{goal.parts} slices colored
                      {s5Checked && (pizzaStates[gi].filter(Boolean).length===goal.goal ? ' ✅' : ` ❌ (need ${goal.goal})`)}
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
                <button className="btn btn-primary" onClick={() => setS5Checked(true)}>✅ Check Pizza Fractions</button>
              </div>
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════
            STEP 6 — SECTION 6: Equivalent Fraction Bridge
        ══════════════════════════════════════════════════════════ */}
        {currentStep === 6 && (
          <div className="step-animate">
            <StoryHeader step={6} />
            <div style={{ background: 'white', borderRadius: 20, padding: '2rem', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', border: `3px solid ${GREEN}` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: `4px solid ${GREEN}`, paddingBottom: '0.6rem', marginBottom: '1.4rem' }}>
                <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.3rem,2.5vw,1.8rem)', color: '#1B4332' }}>
                  🌉 Challenge 6: The Equivalent Bridge
                </h2>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, border: `2px solid ${GREEN}`, padding: '0.3rem 0.7rem', borderRadius: 6, background: '#F0F9FF' }}>
                  स्कोर: {s6Score}/8
                </div>
              </div>

              {/* Bridge visual */}
              <div style={{ position: 'relative', height: 55, marginBottom: '1.2rem', background: 'linear-gradient(180deg,#87CEEB,#B5E3F5)', borderRadius: 12, overflow: 'hidden', border: `2px solid ${OCEAN}` }}>
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 14, background: '#8B6914', display: 'flex' }}>
                  {equivQ.map((_, i) => (
                    <div key={i} style={{ flex: 1, background: s6Inputs[i].trim() === equivQ[i].ans ? '#52B788' : '#A0782C', borderRight: '2px solid #6B4F1D', transition: 'background 0.3s' }}/>
                  ))}
                </div>
                <div style={{ position: 'absolute', bottom: 18, left: '50%', transform: 'translateX(-50%)', fontFamily: 'var(--font-fun)', fontSize: '0.72rem', color: '#023047', fontWeight: 700 }}>
                  Bridge Planks: {s6Inputs.filter((v,i) => v.trim()===equivQ[i].ans).length}/8
                </div>
              </div>

              <div style={{ background: '#FFF9C4', border: '2px solid #F4A261', borderRadius: 12, padding: '0.8rem 1.2rem', marginBottom: '1.2rem', fontSize: '0.92rem' }}>
                💡 <strong>Blackbeard's Tip:</strong> Multiply or divide BOTH top and bottom by the same number!
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                {equivQ.map((q, i) => {
                  const ok = s6Inputs[i].trim() === q.ans;
                  return (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.8rem 1rem', background: '#F9FAFB', border: `2px solid ${s6Checked ? (ok ? '#06D6A0' : '#E63946') : '#E5E7EB'}`, borderRadius: 10 }}>
                      <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', color: GREEN, whiteSpace: 'nowrap' }}>
                        {q.given.split('__')[0]}
                      </span>
                      <input value={s6Inputs[i]} onChange={e => setS6Inputs(p => { const n=[...p]; n[i]=e.target.value; return n; })}
                        style={{ ...inputStyle(s6Checked, ok), width: 60 }} placeholder="?" />
                      <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', color: GREEN, whiteSpace: 'nowrap' }}>
                        {q.given.split('__')[1]}
                      </span>
                      {s6Checked && <span style={{ color: ok ? '#06D6A0' : '#E63946', fontSize: '1rem' }}>{ok ? '✅' : `❌(${q.ans})`}</span>}
                    </div>
                  );
                })}
              </div>

              <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1.5rem' }}>
                <button className="btn btn-primary" onClick={() => setS6Checked(true)}>🌉 Build the Bridge!</button>
              </div>
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════
            STEP 7 — SECTION 7: Comparison Mountain
        ══════════════════════════════════════════════════════════ */}
        {currentStep === 7 && (
          <div className="step-animate">
            <StoryHeader step={7} />
            <div style={{ background: 'white', borderRadius: 20, padding: '2rem', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', border: '3px solid #6B7280' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: `4px solid ${GREEN}`, paddingBottom: '0.6rem', marginBottom: '1.4rem' }}>
                <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.3rem,2.5vw,1.8rem)', color: '#1B4332' }}>
                  ⛰️ Challenge 7: The Comparison Mountain
                </h2>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, border: `2px solid ${GREEN}`, padding: '0.3rem 0.7rem', borderRadius: 6, background: '#F0F9FF' }}>
                  स्कोर: {s7Score}/8
                </div>
              </div>

              <div style={{ textAlign: 'center', marginBottom: '1rem', fontFamily: 'var(--font-heading)', fontSize: '1.2rem', color: '#5C3D0F' }}>
                ⛰️ Mountain Level: {s7Score}/8 {s7Score === 8 ? '🏆 SUMMIT REACHED!' : ''}
              </div>

              <div style={{ background: '#FFF9C4', border: '2px solid #F4A261', borderRadius: 12, padding: '0.8rem 1.2rem', marginBottom: '1.2rem', fontSize: '0.92rem' }}>
                💡 Click <strong>&gt;</strong>, <strong>=</strong>, or <strong>&lt;</strong> to compare each pair of fractions and climb the mountain!
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                {compQ.map((q, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', padding: '0.9rem 1rem', background: '#F9FAFB', border: `2px solid ${s7Checked ? (s7Answers[i]===q.ans ? '#06D6A0' : '#E63946') : '#E5E7EB'}`, borderRadius: 10 }}>
                    <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', color: OCEAN, minWidth: 40, textAlign: 'right' }}>{q.f1}</span>
                    {['>', '=', '<'].map(sym => (
                      <button key={sym}
                        onClick={() => setS7Answers(p => { const n=[...p]; n[i]=sym; return n; })}
                        style={{
                          width: 36, height: 36, borderRadius: '50%',
                          border: `2px solid ${s7Answers[i]===sym ? CORAL : '#9CA3AF'}`,
                          background: s7Answers[i]===sym ? CORAL : 'white',
                          color: s7Answers[i]===sym ? 'white' : '#374151',
                          fontFamily: 'var(--font-heading)', fontSize: '1.1rem', cursor: 'pointer', transition: 'all 0.2s',
                        }}>
                        {sym}
                      </button>
                    ))}
                    <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', color: PURPLE, minWidth: 40 }}>{q.f2}</span>
                    {s7Checked && <span style={{ color: s7Answers[i]===q.ans ? '#06D6A0' : '#E63946', fontSize: '0.85rem' }}>{s7Answers[i]===q.ans ? '✅' : `(${q.ans})`}</span>}
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1.5rem' }}>
                <button className="btn btn-primary" onClick={() => setS7Checked(true)}>⛰️ Check Comparisons</button>
              </div>
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════
            STEP 8 — SECTION 8: Emoji Code Puzzle
        ══════════════════════════════════════════════════════════ */}
        {currentStep === 8 && (
          <div className="step-animate">
            <StoryHeader step={8} />
            <div style={{ background: 'white', borderRadius: 20, padding: '2rem', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', border: '3px solid #4F46E5' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: `4px solid ${GREEN}`, paddingBottom: '0.6rem', marginBottom: '1.4rem' }}>
                <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.3rem,2.5vw,1.8rem)', color: '#1B4332' }}>
                  🔐 Challenge 8: Blackbeard's Emoji Code
                </h2>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, border: `2px solid ${GREEN}`, padding: '0.3rem 0.7rem', borderRadius: 6, background: '#F0F9FF' }}>
                  स्कोर: {s8Score}/6
                </div>
              </div>

              <div style={{ background: '#1B4332', color: 'white', borderRadius: 12, padding: '1rem 1.5rem', marginBottom: '1.5rem' }}>
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.05rem', marginBottom: '0.5rem', color: GOLD }}>🔑 Blackbeard's Secret Code Key:</div>
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
                      <span style={{ fontSize: '1.7rem', minWidth: 65, textAlign: 'center' }}>{q.puzzle}</span>
                      <span style={{ fontWeight: 700, fontSize: '1.2rem' }}>=</span>
                      <input value={s8Inputs[i]} onChange={e => setS8Inputs(p => { const n=[...p]; n[i]=e.target.value; return n; })}
                        placeholder="?" style={inputStyle(s8Checked, ok)} />
                      {s8Checked && <span style={{ color: ok?'#06D6A0':'#E63946', fontSize: '0.82rem' }}>{ok ? '✅' : `❌(${q.ans})`}</span>}
                    </div>
                  );
                })}
              </div>

              <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1.5rem' }}>
                <button className="btn btn-primary" onClick={() => setS8Checked(true)}>🔓 Decode Answers</button>
              </div>
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════
            STEP 9 — SECTION 9: Real-Life Quest
        ══════════════════════════════════════════════════════════ */}
        {currentStep === 9 && (
          <div className="step-animate">
            <StoryHeader step={9} />
            <div style={{ background: 'white', borderRadius: 20, padding: '2rem', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', border: `3px solid ${OCEAN}` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: `4px solid ${GREEN}`, paddingBottom: '0.6rem', marginBottom: '1.4rem' }}>
                <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.3rem,2.5vw,1.8rem)', color: '#1B4332' }}>
                  🌍 Challenge 9: The Real-Life Quest
                </h2>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, border: `2px solid ${GREEN}`, padding: '0.3rem 0.7rem', borderRadius: 6, background: '#F0F9FF' }}>
                  स्कोर: {s9Score}/5
                </div>
              </div>
              <p style={{ marginBottom: '1.5rem', lineHeight: 1.6 }}>
                Solve each pirate word problem. Write your answer as a <strong>simplified fraction</strong>.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                {rlQ.map((q, i) => {
                  const ok = s9Inputs[i].replace(/\s/g,'') === q.ans;
                  return (
                    <div key={i} style={{ padding: '1rem 1.2rem', background: '#F9FAFB', border: `2px solid ${s9Checked ? (ok?'#06D6A0':'#E63946') : '#E5E7EB'}`, borderRadius: 12 }}>
                      <div style={{ fontWeight: 700, marginBottom: '0.5rem', fontSize: '0.97rem' }}>Q{i+1}. {q.q}</div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                        <div style={{ background: '#FFF9C4', border: '1px solid #F4A261', borderRadius: 8, padding: '0.3rem 0.6rem', fontSize: '0.82rem', color: '#8B6914' }}>
                          💡 {q.hint}
                        </div>
                        <span style={{ fontWeight: 600 }}>Answer:</span>
                        <input value={s9Inputs[i]} onChange={e => setS9Inputs(p => { const n=[...p]; n[i]=e.target.value; return n; })}
                          placeholder="fraction" style={inputStyle(s9Checked, ok)} />
                        {s9Checked && <span style={{ color: ok?'#06D6A0':'#E63946' }}>{ok ? '✅' : `❌ (${q.ans})`}</span>}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1.5rem' }}>
                <button className="btn btn-primary" onClick={() => setS9Checked(true)}>✅ Check Quest Answers</button>
              </div>
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════
            STEP 10 — SECTION 10: Spin Challenge
        ══════════════════════════════════════════════════════════ */}
        {currentStep === 10 && (
          <div className="step-animate">
            <StoryHeader step={10} />
            <div style={{ background: 'white', borderRadius: 20, padding: '2rem', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', border: '3px solid #B91C1C' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: `4px solid ${GREEN}`, paddingBottom: '0.6rem', marginBottom: '1.4rem' }}>
                <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.3rem,2.5vw,1.8rem)', color: '#1B4332' }}>
                  🎡 Challenge 10: The Fraction Spin!
                </h2>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, border: `2px solid ${GREEN}`, padding: '0.3rem 0.7rem', borderRadius: 6, background: '#F0F9FF' }}>
                  स्कोर: {spinScore}/{Math.max(spinAttempts, 1)}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'flex-start' }}>
                {/* Spinner */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ position: 'relative', width: 220, height: 220 }}>
                    <div style={{ position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)', width: 0, height: 0, borderLeft: '10px solid transparent', borderRight: '10px solid transparent', borderTop: '22px solid #E63946', zIndex: 10 }} />
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
                    Spins: {spinAttempts} | स्कोर: {spinScore}
                  </div>
                </div>

                {/* Question area */}
                <div style={{ flex: 1, minWidth: 240 }}>
                  {spinResult && (
                    <div style={{ padding: '1.2rem', background: '#F0F9FF', border: `3px solid ${OCEAN}`, borderRadius: 12, marginBottom: '1rem' }}>
                      <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', color: OCEAN }}>
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
                            style={{ padding: '0.5rem 1rem', border: '2px solid #8B6914', borderRadius: 8, background: 'white', cursor: 'pointer', fontFamily: 'var(--font-fun)', fontSize: '0.93rem', textAlign: 'left', transition: 'all 0.2s' }}
                            onMouseEnter={e => { e.currentTarget.style.background = '#FFF9C4'; e.currentTarget.style.borderColor = CORAL; }}
                            onMouseLeave={e => { e.currentTarget.style.background = 'white'; e.currentTarget.style.borderColor = '#8B6914'; }}>
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                  {spinFeedback && (
                    <div className="animate-popIn" style={{ padding: '1.5rem', textAlign: 'center', borderRadius: 12, background: spinFeedback === 'correct' ? '#F0FDF4' : '#FFF1F2', border: `3px solid ${spinFeedback === 'correct' ? '#06D6A0' : '#E63946'}` }}>
                      <div style={{ fontSize: '2.5rem' }}>{spinFeedback === 'correct' ? '🎉' : '😅'}</div>
                      <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', color: spinFeedback === 'correct' ? '#065F46' : '#991B1B' }}>
                        {spinFeedback === 'correct' ? 'Correct! +1 point!' : `Answer: ${spinQ?.ans}`}
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
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════
            STEP 11 — SECTION 11: Escape Cave
        ══════════════════════════════════════════════════════════ */}
        {currentStep === 11 && (
          <div className="step-animate">
            <StoryHeader step={11} />
            <div style={{ background: 'white', borderRadius: 20, padding: '2rem', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', border: '3px solid #374151' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: `4px solid ${GREEN}`, paddingBottom: '0.6rem', marginBottom: '1.4rem' }}>
                <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.3rem,2.5vw,1.8rem)', color: '#1B4332' }}>
                  🦇 Challenge 11: The Escape Cave
                </h2>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, border: `2px solid ${GREEN}`, padding: '0.3rem 0.7rem', borderRadius: 6, background: '#F0F9FF' }}>
                  स्कोर: {s11Score}/5
                </div>
              </div>

              {/* Torch progress */}
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
                          <div style={{ fontWeight: 700, marginBottom: '0.5rem', fontSize: '0.97rem' }}>Torch {i+1}: {step.q}</div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
                            <span style={{ fontWeight: 600 }}>Answer:</span>
                            <input value={s11Inputs[i]} onChange={e => setS11Inputs(p => { const n=[...p]; n[i]=e.target.value; return n; })}
                              placeholder="your answer…"
                              style={{ border: `2px solid ${s11Checked ? (ok?'#06D6A0':'#E63946') : '#9CA3AF'}`, borderRadius: 6, padding: '0.35rem 0.6rem', fontFamily: 'var(--font-fun)', fontSize: '1rem', background: s11Checked?(ok?'#F0FDF4':'#FFF1F2'):'white', outline: 'none', width: 180 }} />
                            {s11Checked && <span style={{ color: ok?'#06D6A0':'#E63946' }}>{ok ? '✅ Lit!' : `❌ (${step.ans})`}</span>}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1.5rem' }}>
                <button className="btn btn-primary" onClick={() => setS11Checked(true)}>🔦 Light the Torches!</button>
              </div>
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════
            STEP 12 — SECTION 12: Boss Battle
        ══════════════════════════════════════════════════════════ */}
        {currentStep === 12 && (
          <div className="step-animate">
            <StoryHeader step={12} />
            <div style={{ background: 'white', borderRadius: 20, padding: '2rem', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', border: '3px solid #991B1B' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: `4px solid ${GREEN}`, paddingBottom: '0.6rem', marginBottom: '1.4rem' }}>
                <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.3rem,2.5vw,1.8rem)', color: '#1B4332' }}>
                  👾 Challenge 12: The Final Boss Battle!
                </h2>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, border: `2px solid ${GREEN}`, padding: '0.3rem 0.7rem', borderRadius: 6, background: '#F0F9FF' }}>
                  स्कोर: {s12Score}/10
                </div>
              </div>

              {/* Boss HP */}
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
                    <div style={{ fontWeight: 700, marginBottom: '0.5rem', fontSize: '0.88rem' }}>Q{i+1}. {q.q}</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                      {q.opts.map((opt, j) => (
                        <button key={j}
                          onClick={() => setS12Answers(p => { const n=[...p]; n[i]=j; return n; })}
                          style={{
                            padding: '0.3rem 0.7rem', textAlign: 'left',
                            border: `2px solid ${s12Answers[i]===j ? (s12Checked?(j===q.ans?'#06D6A0':'#E63946'):CORAL) : '#E5E7EB'}`,
                            borderRadius: 6,
                            background: s12Answers[i]===j ? (s12Checked?(j===q.ans?'#F0FDF4':'#FFF1F2'):'#FFF9C4') : 'white',
                            cursor: 'pointer', fontFamily: 'var(--font-fun)', fontSize: '0.85rem', transition: 'all 0.15s',
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
                <button className="btn btn-primary" style={{ background: 'linear-gradient(145deg, #EF4444, #B91C1C)', border: '3px solid #991B1B' }}
                  onClick={() => setS12Checked(true)}>⚔️ Strike the Boss!</button>
              </div>
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════
            STEP 13 — CERTIFICATE + ANSWER KEY
        ══════════════════════════════════════════════════════════ */}
        {currentStep === 13 && (
          <div className="step-animate">
            <StoryHeader step={13} />

            {/* Certificate */}
            <div style={{
              background: 'linear-gradient(145deg, #FDF6E3, #FFF9C4)',
              border: '8px double #B8860B', borderRadius: 20,
              padding: '3rem 2.5rem', textAlign: 'center',
              marginBottom: '2rem',
              position: 'relative',
            }}>
              {['⚓','🧭','🐚','⭐','🌴','🏴‍☠️'].map((e, i) => (
                <span key={i} style={{ position: 'absolute', fontSize: '1.8rem', top: [16,16,null,null,null,null][i], bottom: [null,null,16,16,null,null][i], left: [16,null,16,null,null,null][i], right: [null,16,null,16,null,null][i], opacity: 0.4 }}>{e}</span>
              ))}

              <div style={{ fontSize: '4rem', animation: 'float 3s ease-in-out infinite' }}>🏆</div>
              <div style={{ fontFamily: 'var(--font-fun)', fontSize: '0.85rem', color: CORAL, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                Certificate of Achievement
              </div>
              <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.8rem,4vw,2.8rem)', color: GREEN, marginBottom: '0.25rem' }}>
                Fraction Island Master Explorer
              </h1>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', color: '#5C3D0F' }}>
                This certifies that
              </p>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.4rem,3.5vw,2.2rem)', color: CORAL, borderBottom: `3px solid ${CORAL}`, padding: '0 2rem 0.25rem', minWidth: 250, display: 'inline-block', marginBottom: '0.75rem' }}>
                {name || '______________________'}
              </div>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', color: '#5C3D0F', lineHeight: 1.6, maxWidth: 480, margin: '0 auto 1.5rem' }}>
                has bravely solved all of <strong>Captain Blackbeard's Fraction Challenges</strong>,
                assembled the torn map, crossed the jungle bridge, defeated MAGMUS, and claimed the legendary Fraction Treasure!
              </p>

              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '1.5rem' }}>
                <div style={{ background: 'linear-gradient(145deg, #FFF3C4, #FFE066)', border: '3px solid #D4A017', borderRadius: 16, padding: '0.75rem 2rem', fontFamily: 'var(--font-heading)', fontSize: '1.4rem', color: '#6B4F1D' }}>
                  🏆 स्कोर: {totalScore}/{totalMax}
                </div>
                <div style={{ background: 'linear-gradient(145deg, #D1FAE5, #A7F3D0)', border: '3px solid #047857', borderRadius: 16, padding: '0.75rem 2rem', fontFamily: 'var(--font-heading)', fontSize: '1.4rem', color: '#065F46' }}>
                  {totalScore >= totalMax * 0.9 ? '⭐⭐⭐ MASTER!' : totalScore >= totalMax * 0.7 ? '⭐⭐ EXPLORER!' : '⭐ ADVENTURER!'}
                </div>
              </div>

              <div style={{ fontFamily: 'var(--font-fun)', color: '#9CA3AF', fontSize: '0.85rem', marginBottom: '1rem' }}>
                Date: {date} &nbsp;|&nbsp; Powered by <strong>Intellia 360</strong>
              </div>
              <button className="btn btn-treasure" onClick={() => window.print()} style={{ fontSize: '1rem' }}>
                🖨️ Print Certificate & Worksheet
              </button>
            </div>

            {/* Answer Key */}
            <div style={{ background: 'white', borderRadius: 20, padding: '2rem', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', border: `3px solid ${GREEN}` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: `4px solid ${GREEN}`, paddingBottom: '0.6rem', marginBottom: '1.4rem' }}>
                <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', color: '#1B4332' }}>📝 Complete Answer Key</h2>
                <div style={{ fontFamily: 'var(--font-fun)', color: '#9CA3AF', fontSize: '0.83rem' }}>(Teacher Reference)</div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                {Object.entries(allAnswers).map(([section, answers]) => (
                  <div key={section} style={{ background: '#F9FAFB', border: '2px solid #E5E7EB', borderRadius: 12, padding: '1rem' }}>
                    <h4 style={{ fontFamily: 'var(--font-fun)', fontWeight: 700, color: GREEN, marginBottom: '0.5rem', fontSize: '0.93rem' }}>{section}</h4>
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
            </div>
          </div>
        )}

        {/* ── NAVIGATION BUTTONS ───────────────────────────────────── */}
        <div className="no-print" style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          marginTop: '2rem', gap: '1rem', flexWrap: 'wrap',
        }}>
          <button
            onClick={goPrev}
            disabled={currentStep === 0}
            style={{
              display: 'flex', alignItems: 'center', gap: '0.5rem',
              padding: '0.85rem 1.75rem',
              background: currentStep === 0 ? '#E5E7EB' : 'white',
              color: currentStep === 0 ? '#9CA3AF' : GREEN,
              border: `3px solid ${currentStep === 0 ? '#E5E7EB' : GREEN}`,
              borderRadius: 'var(--radius-full)',
              fontFamily: 'var(--font-heading)', fontSize: '1rem',
              cursor: currentStep === 0 ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: currentStep > 0 ? '0 2px 8px rgba(0,0,0,0.1)' : 'none',
            }}
            onMouseEnter={e => { if (currentStep > 0) e.currentTarget.style.transform = 'translateX(-3px)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateX(0)'; }}
          >
            ← Previous Challenge
          </button>

          {/* Step label */}
          <div style={{ textAlign: 'center', flex: 1 }}>
            <div style={{ fontFamily: 'var(--font-fun)', fontSize: '0.85rem', color: '#9CA3AF' }}>
              Challenge {currentStep + 1} of {TOTAL_STEPS}
            </div>
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1rem', color: story.color }}>
              {story.emoji} {story.world}
            </div>
          </div>

          <button
            onClick={goNext}
            disabled={currentStep === TOTAL_STEPS - 1}
            style={{
              display: 'flex', alignItems: 'center', gap: '0.5rem',
              padding: '0.85rem 1.75rem',
              background: currentStep === TOTAL_STEPS - 1 ? '#E5E7EB' : `linear-gradient(145deg, ${story.color}, ${story.color}DD)`,
              color: 'white',
              border: `3px solid ${currentStep === TOTAL_STEPS - 1 ? '#E5E7EB' : story.color}`,
              borderRadius: 'var(--radius-full)',
              fontFamily: 'var(--font-heading)', fontSize: '1rem',
              cursor: currentStep === TOTAL_STEPS - 1 ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: currentStep < TOTAL_STEPS - 1 ? `0 4px 15px ${story.color}50` : 'none',
            }}
            onMouseEnter={e => { if (currentStep < TOTAL_STEPS - 1) { e.currentTarget.style.transform = 'translateX(3px)'; e.currentTarget.style.boxShadow = `0 8px 25px ${story.color}70`; }}}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateX(0)'; e.currentTarget.style.boxShadow = currentStep < TOTAL_STEPS - 1 ? `0 4px 15px ${story.color}50` : 'none'; }}
          >
            Next Challenge →
          </button>
        </div>

      </div>
    </div>
  );
}

/* ── Placeholder for print-all (hidden on screen) ────────────── */
function AllPrintablePages() {
  return (
    <div style={{ display: 'none' }}>
      {/* Print content handled by browser print of the entire page */}
    </div>
  );
}

export default WorksheetHome;

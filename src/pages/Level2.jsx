import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useGame } from '../context/GameContext';
import confetti from 'canvas-confetti';
import levelBridge from '../assets/level-bridge.png';
import fractionBridgeImg from '../assets/fraction-bridge.jpeg';
import thirdTreehouseImg from '../assets/third-treehouse.jpeg';
import { level2Questions, pickRandom, shuffleArray, LEVEL_CONFIG } from '../data/questionBank';

const CONFIG = LEVEL_CONFIG.level2;

/* ─── Story beats per bridge stone ─── */
const storyBeats = [
  {
    narrator: "The map leads deep into the humid jungle. You reach the crumbling bridge — the only crossing over a roaring river.",
    character: '🌿',
    characterName: 'The Jungle Spirit',
    characterSays: "Stranger! Blackbeard built this bridge using fraction stones. Only an EQUIVALENT stone will lock into place. Choose wisely!",
  },
  {
    narrator: "A vine-covered stone slab needs a matching fraction to bridge the next gap.",
    character: '🦜',
    characterName: "Blackbeard's Parrot",
    characterSays: "Squawk! Cap'n Blackbeard always said: 'Equivalent fractions are twins in disguise!' Squawk!",
  },
  {
    narrator: "The river below churns angrily. One wrong stone and the bridge collapses!",
    character: '🐊',
    characterName: 'River Crocodile',
    characterSays: "Heh heh… place the wrong stone, little explorer, and you'll join me for lunch! Choose the EQUAL fraction!",
  },
  {
    narrator: "A glowing inscription from Blackbeard illuminates the stone:",
    character: '🏴‍☠️',
    characterName: 'Captain Blackbeard',
    characterSays: "Arrr! I built each span with two stones of EQUAL value — fraction twins! Find mine twin and the bridge holds!",
  },
  {
    narrator: "You're almost across! The final stone is the heaviest — and the most important.",
    character: '🌉',
    characterName: 'The Ancient Bridge',
    characterSays: "Many have tried and failed. Only the true fraction master can complete me. Place your equivalent stone and cross!",
  },
];

/* ─── End-of-level transition modal ─── */
function TransitionModal({ onContinue }) {
  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 200,
      background: 'radial-gradient(ellipse at center, rgba(45,27,105,0.97) 0%, rgba(15,5,40,0.99) 100%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      backdropFilter: 'blur(8px)',
    }}>
      {/* Firefly particles */}
      {[...Array(14)].map((_, i) => (
        <div key={i} style={{
          position: 'absolute',
          top: `${10 + Math.random() * 80}%`, left: `${5 + Math.random() * 90}%`,
          width: 5, height: 5, borderRadius: '50%',
          background: i % 3 === 0 ? '#E9C46A' : i % 3 === 1 ? '#52B788' : '#86efac',
          animation: `fireflyFloat ${2.5 + i * 0.4}s ease-in-out infinite`,
          animationDelay: `${i * 0.25}s`, opacity: 0.8,
          pointerEvents: 'none',
          boxShadow: '0 0 6px currentColor',
        }} />
      ))}
      <style>{`
        @keyframes fireflyFloat {
          0%, 100% { transform: translateY(0) translateX(0) scale(1); opacity: 0.8; }
          50% { transform: translateY(-20px) translateX(8px) scale(1.3); opacity: 0.3; }
        }
        @keyframes bridgeModalIn {
          from { transform: translateY(50px) scale(0.9); opacity: 0; }
          to { transform: translateY(0) scale(1); opacity: 1; }
        }
      `}</style>

      <div style={{
        maxWidth: 580, width: '90%',
        background: 'linear-gradient(145deg, rgba(243,229,192,0.98), rgba(245,230,200,0.99))',
        border: '5px solid #52B788',
        borderRadius: 24,
        padding: '2.5rem',
        textAlign: 'center',
        animation: 'bridgeModalIn 0.5s cubic-bezier(0.34,1.56,0.64,1) forwards',
        boxShadow: '0 0 60px rgba(82,183,136,0.4)',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ fontSize: '4rem', marginBottom: '0.5rem' }}>🌉</div>

        <h2 style={{
          fontFamily: 'var(--font-heading)',
          fontSize: 'clamp(1.6rem, 4vw, 2.2rem)',
          color: 'var(--primary-dark)',
          marginBottom: '0.5rem',
        }}>
          🎉 Bridge Restored!
        </h2>

        <div style={{
          background: 'linear-gradient(145deg, rgba(45,106,79,0.08), rgba(45,106,79,0.04))',
          border: '3px solid #52B788',
          borderRadius: 16,
          padding: '1.5rem',
          margin: '1rem 0 1.5rem',
        }}>
          <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>🏴‍☠️</div>
          <p style={{
            fontFamily: 'var(--font-fun)',
            fontSize: '1.05rem',
            color: 'var(--text-parchment)',
            lineHeight: 1.7,
            fontStyle: 'italic',
            marginBottom: '0.5rem',
          }}>
            "HA-HAAR! You matched every equivalent fraction stone perfectly! The bridge holds! Now cross the river and follow the path to the volcano — that's where I hid the treasure… but beware the guardian I left behind!"
          </p>
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: '0.9rem', color: 'var(--primary)' }}>
            — Captain Blackbeard's Ghost
          </div>
        </div>

        <div style={{
          background: 'linear-gradient(145deg, #FFF9C4, #FFF3A0)',
          border: '2px dashed #D97706',
          borderRadius: 12,
          padding: '1rem',
          marginBottom: '1.5rem',
          fontSize: '0.95rem',
          fontFamily: 'var(--font-fun)',
          color: '#92400E',
          lineHeight: 1.6,
        }}>
          🌋 <strong>You cross the bridge</strong> and discover a <strong>glowing cave</strong> leading toward the volcano. The air grows hot and smoky. Deep rumbling echoes suggest something <strong>ancient and powerful</strong> is guarding what lies within…
        </div>

        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          gap: '1rem', marginBottom: '1.5rem', fontSize: '1.4rem',
        }}>
          🏖️ <span style={{ fontFamily: 'var(--font-fun)', fontSize: '0.85rem', color: '#9CA3AF' }}>Beach ✓</span>
          →
          🌿 <span style={{ fontFamily: 'var(--font-fun)', fontSize: '0.85rem', color: '#9CA3AF' }}>Jungle ✓</span>
          →
          🌋 <span style={{ fontFamily: 'var(--font-fun)', fontSize: '0.9rem', color: '#EF4444', fontWeight: 700 }}>VOLCANO!</span>
        </div>

        <button
          onClick={onContinue}
          style={{
            background: 'linear-gradient(145deg, #EF4444, #B91C1C)',
            color: 'white',
            border: '3px solid #991B1B',
            borderRadius: 'var(--radius-full)',
            padding: '1rem 3rem',
            fontFamily: 'var(--font-heading)',
            fontSize: '1.2rem',
            cursor: 'pointer',
            boxShadow: '0 4px 20px rgba(239,68,68,0.4)',
            transition: 'all 0.3s cubic-bezier(0.34,1.56,0.64,1)',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.transform = 'scale(1.05)';
            e.currentTarget.style.boxShadow = '0 8px 30px rgba(239,68,68,0.6)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = '0 4px 20px rgba(239,68,68,0.4)';
          }}
        >
          🌋 Face the Volcano Guardian →
        </button>
      </div>
    </div>
  );
}

function Level2() {
  const { addCoins, addXp, unlockLevel } = useGame();
  const navigate = useNavigate();
  const [currentStage, setCurrentStage] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [showIntro, setShowIntro] = useState(true);
  const [showTransition, setShowTransition] = useState(false);

  const stages = useMemo(() => {
    const picked = pickRandom(level2Questions, CONFIG.questionsPerSession);
    return picked.map(q => ({
      ...q,
      options: shuffleArray(q.options),
    }));
  }, []);

  const handleAnswer = (answer) => {
    const isCorrect = stages[currentStage].correctAnswers.includes(answer);

    if (isCorrect) {
      setFeedback('correct');
      addCoins(CONFIG.coinsPerAnswer);
      addXp(CONFIG.xpPerAnswer);
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#E9C46A', '#2D6A4F', '#8B6914', '#52B788'],
      });

      setTimeout(() => {
        if (currentStage < stages.length - 1) {
          setCurrentStage(c => c + 1);
          setFeedback(null);
        } else {
          unlockLevel('level3');
          setFeedback(null);
          setShowTransition(true);
        }
      }, 2000);
    } else {
      setFeedback('incorrect');
      setTimeout(() => setFeedback(null), 1200);
    }
  };

  const stage = stages[currentStage];
  const progress = ((currentStage + 1) / stages.length) * 100;
  const beat = storyBeats[currentStage % storyBeats.length];

  // ======== INTRO SCREEN ========
  if (showIntro) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #87CEEB 0%, #C5E8D5 40%, #52B788 100%)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'fixed', bottom: 0, left: 0, right: 0, height: '50%',
          backgroundImage: `url(${levelBridge})`,
          backgroundSize: 'cover', backgroundPosition: 'center top',
          opacity: 0.12, filter: 'blur(3px)', zIndex: 0,
        }} />

        <div className="animate-popIn" style={{
          position: 'relative', zIndex: 5,
          maxWidth: 620, width: '90%',
          background: 'linear-gradient(145deg, rgba(243, 229, 192, 0.97), rgba(245, 230, 200, 0.99))',
          border: '5px solid #8B6914',
          borderRadius: 'var(--radius-xl)',
          boxShadow: '0 20px 50px rgba(27, 67, 50, 0.3)',
          overflow: 'hidden',
        }}>
          <img
            src={fractionBridgeImg}
            alt="The Fraction Bridge"
            style={{ width: '100%', maxHeight: 220, objectFit: 'cover', display: 'block' }}
          />

          <div style={{ padding: '2rem', textAlign: 'center' }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
              background: 'linear-gradient(145deg, #8B6914, #6B4F1D)',
              color: '#FFF9C4', borderRadius: 'var(--radius-full)',
              padding: '0.3rem 1rem', fontSize: '0.8rem',
              fontFamily: 'var(--font-fun)', fontWeight: 700,
              letterSpacing: '0.05em', textTransform: 'uppercase',
              marginBottom: '1rem',
            }}>
              📖 Chapter 2 of 3
            </div>

            <h2 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(1.6rem, 4vw, 2.3rem)',
              color: 'var(--primary-dark)',
              marginBottom: '0.25rem',
            }}>
              🌉 Jungle Bridge Builder
            </h2>
            <h3 style={{
              fontFamily: 'var(--font-fun)',
              fontSize: '1rem',
              color: '#0369A1',
              fontWeight: 700,
              marginBottom: '1.25rem',
            }}>
              The Equivalent Stone Mystery
            </h3>

            <div style={{
              background: 'rgba(255,255,255,0.6)',
              border: '2px solid #52B788',
              borderRadius: 12,
              padding: '1.25rem',
              marginBottom: '1.25rem',
              textAlign: 'left',
            }}>
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                <span style={{ fontSize: '2.5rem', flexShrink: 0 }}>🏴‍☠️</span>
                <div>
                  <div style={{ fontFamily: 'var(--font-heading)', fontSize: '0.85rem', color: 'var(--primary)', marginBottom: '0.3rem' }}>
                    Captain Blackbeard's Ghost
                  </div>
                  <p style={{
                    fontFamily: 'var(--font-fun)', fontSize: '0.95rem',
                    color: 'var(--text-parchment)', lineHeight: 1.6,
                    fontStyle: 'italic',
                  }}>
                    "Excellent work on the beach, explorer! But now ye face the ancient jungle bridge — it collapsed long ago!
                    I built it with EQUIVALENT fraction stones — each pair of equal fractions forms one span.
                    Find the matching stones to rebuild the bridge and cross the river!"
                  </p>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
              <div className="badge-coin" style={{ fontSize: '0.9rem' }}>🪙 {CONFIG.coinsPerAnswer} coins per stone</div>
              <div className="badge-xp" style={{ fontSize: '0.9rem' }}>⭐ {CONFIG.xpPerAnswer} XP per stone</div>
              <div style={{
                background: 'rgba(82,183,136,0.15)', border: '2px solid #52B788',
                borderRadius: 'var(--radius-full)', padding: '0.3rem 0.8rem',
                fontFamily: 'var(--font-fun)', fontWeight: 700, fontSize: '0.9rem',
                color: '#065F46',
              }}>
                🌉 {CONFIG.questionsPerSession} bridge spans
              </div>
            </div>

            <button
              className="btn btn-primary"
              onClick={() => setShowIntro(false)}
              style={{ fontSize: '1.15rem', padding: '1rem 3rem' }}
            >
              🌿 Enter the Jungle!
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #87CEEB 0%, #C5E8D5 40%, #52B788 100%)',
      position: 'relative', overflow: 'hidden',
    }}>
      {showTransition && <TransitionModal onContinue={() => navigate('/simulation')} />}

      {/* Jungle background */}
      <div style={{
        position: 'fixed', bottom: 0, left: 0, right: 0, height: '50%',
        backgroundImage: `url(${levelBridge})`,
        backgroundSize: 'cover', backgroundPosition: 'center top',
        opacity: 0.15, filter: 'blur(3px)', zIndex: 0,
      }} />

      {/* Decorative jungle vines */}
      <div style={{ position: 'absolute', top: 0, left: 20, fontSize: '2rem', opacity: 0.2, animation: 'sway 5s ease-in-out infinite', zIndex: 1 }}>🌿</div>
      <div style={{ position: 'absolute', top: 0, right: 30, fontSize: '2.5rem', opacity: 0.15, animation: 'sway 6s ease-in-out infinite', animationDelay: '1s', zIndex: 1 }}>🌿</div>

      {/* ======== WOOD HEADER ======== */}
      <header className="wood-header" style={{
        padding: '0.75rem 1.5rem',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        position: 'sticky', top: 0, zIndex: 50,
      }}>
        <Link to="/simulation" className="btn btn-secondary" style={{ fontSize: '0.8rem', padding: '0.4rem 0.8rem' }}>
          🏝️ Back to Map
        </Link>
        <div style={{
          fontFamily: 'var(--font-heading)', fontSize: '1.2rem',
          textShadow: '2px 2px 0 rgba(0,0,0,0.3)',
          display: 'flex', alignItems: 'center', gap: '0.5rem',
        }}>
          🌉 Jungle Bridge — The Equivalent Stones
        </div>
        <div style={{
          fontFamily: 'var(--font-fun)', fontWeight: 700, fontSize: '0.9rem',
          display: 'flex', alignItems: 'center', gap: '0.5rem',
        }}>
          🪨 Stone {currentStage + 1} / {stages.length}
        </div>
      </header>

      {/* ======== PROGRESS BAR ======== */}
      <div style={{ width: '100%', height: 8, background: '#1B4332', position: 'relative', zIndex: 40 }}>
        <div style={{
          height: '100%', width: `${progress}%`,
          background: 'linear-gradient(90deg, var(--primary-light), var(--treasure))',
          transition: 'width 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
          boxShadow: '0 0 10px rgba(82, 183, 136, 0.5)',
        }} />
      </div>

      <main style={{
        maxWidth: '60rem', margin: '1.5rem auto 2rem',
        padding: '0 1.5rem', position: 'relative', zIndex: 5,
      }}>

        {/* ── STORY NARRATOR BOX ── */}
        <div style={{
          background: 'linear-gradient(145deg, rgba(27,67,50,0.92), rgba(11,50,30,0.95))',
          border: '3px solid #52B788',
          borderRadius: 'var(--radius-xl)',
          padding: '1.25rem 1.5rem',
          marginBottom: '1rem',
          display: 'flex', alignItems: 'flex-start', gap: '1rem',
          boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
        }}>
          <span style={{ fontSize: '2.8rem', flexShrink: 0 }}>{beat.character}</span>
          <div style={{ flex: 1 }}>
            <div style={{
              fontFamily: 'var(--font-heading)', fontSize: '0.8rem',
              color: '#86efac', marginBottom: '0.4rem',
              letterSpacing: '0.05em', textTransform: 'uppercase',
            }}>
              {beat.characterName} says:
            </div>
            <p style={{
              fontFamily: 'var(--font-fun)', fontSize: '0.95rem',
              color: 'rgba(255,255,255,0.88)', lineHeight: 1.6,
              fontStyle: 'italic', margin: 0,
            }}>
              "{beat.characterSays}"
            </p>
            <div style={{
              marginTop: '0.5rem', fontSize: '0.82rem',
              color: 'rgba(255,255,255,0.45)', fontFamily: 'var(--font-fun)',
            }}>
              📖 {beat.narrator}
            </div>
          </div>
        </div>

        {/* ── QUESTION CARD ── */}
        <div className="card-parchment" style={{
          padding: '2rem', textAlign: 'center',
          position: 'relative', overflow: 'hidden',
        }}>
          <span style={{ position: 'absolute', top: 12, right: 18, fontSize: '1.3rem', opacity: 0.3 }}>🦜</span>
          <span style={{ position: 'absolute', bottom: 12, left: 18, fontSize: '1.2rem', opacity: 0.25 }}>🦋</span>

          {/* Stone counter badge */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.3rem',
            background: 'linear-gradient(145deg, #2D6A4F, #1B4332)',
            color: '#86efac', padding: '0.25rem 0.75rem',
            borderRadius: 'var(--radius-full)', fontSize: '0.75rem',
            fontFamily: 'var(--font-fun)', fontWeight: 700,
            marginBottom: '1rem',
          }}>
            🪨 Bridge Span {currentStage + 1}
          </div>

          <h3 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)',
            color: 'var(--primary-dark)',
            marginBottom: '0.75rem',
            lineHeight: 1.4,
          }}>
            {stage.instruction}
          </h3>

          {/* Target fraction display */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            background: 'linear-gradient(145deg, #E0F2FE, #BAE6FD)',
            border: '4px solid var(--ocean)',
            borderRadius: 'var(--radius-xl)',
            padding: '1rem 2.5rem',
            marginBottom: '1.75rem',
            boxShadow: '0 4px 15px rgba(33,158,188,0.25)',
          }}>
            <span style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
              color: 'var(--ocean-dark)',
            }}>
              {stage.target}
            </span>
          </div>

          {/* ======== BRIDGE VISUAL ======== */}
          <div style={{
            position: 'relative', height: 180, marginBottom: '1.75rem',
            background: 'linear-gradient(180deg, #87CEEB 0%, #B5E3F5 40%, #219EBC 70%, #126782 100%)',
            borderRadius: 'var(--radius-xl)',
            border: '3px solid var(--ocean-dark)',
            display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
            padding: '0 2rem', overflow: 'hidden',
          }}>
            <div style={{
              position: 'absolute', bottom: 0, left: 0, right: 0, height: 35,
              background: 'rgba(2, 48, 71, 0.3)',
              borderRadius: '0 0 var(--radius-xl) var(--radius-xl)',
            }} />

            {/* Left cliff */}
            <div style={{
              width: 90, height: '80%',
              background: 'linear-gradient(180deg, var(--primary), var(--primary-dark))',
              borderRadius: '16px 16px 0 0',
              position: 'relative', border: '3px solid var(--primary-dark)', zIndex: 2,
            }}>
              <div style={{
                position: 'absolute', top: 15, left: '50%', transform: 'translateX(-50%)',
                color: 'white', fontFamily: 'var(--font-heading)',
                fontSize: '1.6rem', textShadow: '2px 2px 0 rgba(0,0,0,0.3)',
              }}>
                {stage.target}
              </div>
              <span style={{ position: 'absolute', top: -20, left: 8, fontSize: '1.4rem' }}>🌴</span>
            </div>

            {/* Bridge (appears on correct answer) */}
            {feedback === 'correct' && (
              <div className="animate-popIn" style={{
                position: 'absolute', left: '50%', top: '20%',
                transform: 'translateX(-50%)',
                width: '50%', height: 14,
                background: 'linear-gradient(180deg, #A0782C, #8B6914, #6B4F1D)',
                border: '3px solid #4A3000',
                boxShadow: 'var(--shadow-lg)', zIndex: 5, borderRadius: 4,
              }} />
            )}

            {/* Right cliff */}
            <div style={{
              width: 90, height: '80%',
              background: 'linear-gradient(180deg, var(--primary), var(--primary-dark))',
              borderRadius: '16px 16px 0 0',
              position: 'relative', border: '3px solid var(--primary-dark)', zIndex: 2,
            }}>
              <div style={{
                position: 'absolute', top: 15, left: '50%', transform: 'translateX(-50%)',
                color: 'white', fontFamily: 'var(--font-heading)',
                fontSize: '2.2rem', textShadow: '2px 2px 0 rgba(0,0,0,0.3)',
              }}>
                ?
              </div>
              <span style={{ position: 'absolute', top: -18, right: 5, fontSize: '1.3rem' }}>🌴</span>
            </div>
          </div>

          {/* ======== ANSWER OPTIONS ======== */}
          <div style={{
            display: 'flex', justifyContent: 'center',
            gap: '1rem', flexWrap: 'wrap',
          }}>
            {stage.options.map((opt, idx) => (
              <div
                key={idx}
                onClick={() => !feedback && handleAnswer(opt)}
                style={{
                  cursor: feedback ? 'default' : 'pointer',
                  width: 90, height: 90,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.5rem', fontWeight: 700,
                  background: feedback === 'correct' && stages[currentStage].correctAnswers.includes(opt)
                    ? 'linear-gradient(145deg, #D1FAE5, #A7F3D0)'
                    : 'var(--bg-parchment)',
                  border: feedback === 'correct' && stages[currentStage].correctAnswers.includes(opt)
                    ? '4px solid var(--success)'
                    : '4px solid #B8860B',
                  borderRadius: 'var(--radius-lg)',
                  boxShadow: 'var(--shadow-md)',
                  transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                  color: 'var(--primary-dark)',
                  position: 'relative',
                }}
                onMouseEnter={(e) => {
                  if (!feedback) {
                    e.currentTarget.style.transform = 'translateY(-6px) scale(1.08)';
                    e.currentTarget.style.boxShadow = 'var(--shadow-lg), var(--shadow-glow)';
                    e.currentTarget.style.borderColor = 'var(--treasure)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!feedback) {
                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                    e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                    e.currentTarget.style.borderColor = '#B8860B';
                  }
                }}
              >
                <span style={{ fontSize: '0.6rem', position: 'absolute', top: 4, left: 6, opacity: 0.4 }}>🪨</span>
                {opt}
              </div>
            ))}
          </div>

          {/* ======== FEEDBACK OVERLAYS ======== */}
          {feedback === 'correct' && (
            <div style={{
              position: 'absolute', inset: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              pointerEvents: 'none', zIndex: 30,
            }}>
              <div className="animate-popIn" style={{
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', gap: '0.5rem',
                background: 'rgba(255,255,255,0.92)',
                padding: '1.5rem 2.5rem',
                borderRadius: 'var(--radius-xl)',
                boxShadow: 'var(--shadow-xl)',
                border: '4px solid var(--success)',
              }}>
                <span style={{ fontSize: '3rem' }}>🌉</span>
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', color: 'var(--primary-dark)' }}>
                  Span Complete!
                </div>
                <div style={{ fontFamily: 'var(--font-fun)', fontSize: '0.9rem', color: '#6B7280', fontStyle: 'italic' }}>
                  "The equivalent stone locks in perfectly!" — Blackbeard
                </div>
                <div className="badge-coin" style={{ fontSize: '1rem' }}>
                  🪙 +{CONFIG.coinsPerAnswer} Coins!
                </div>
              </div>
            </div>
          )}

          {feedback === 'incorrect' && (
            <div style={{
              position: 'absolute', inset: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              pointerEvents: 'none', zIndex: 30,
            }}>
              <div className="animate-popIn" style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.7rem', color: 'var(--danger)',
                background: 'rgba(255,255,255,0.95)',
                padding: '1rem 2rem',
                borderRadius: 'var(--radius-xl)',
                border: '3px solid var(--danger)',
                boxShadow: 'var(--shadow-lg)',
                textAlign: 'center',
              }}>
                🌊 Splash! Wrong Stone!
                <div style={{ fontSize: '0.95rem', marginTop: '0.3rem', color: '#9CA3AF' }}>
                  That fraction isn't equivalent!
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Hint */}
        <div style={{
          textAlign: 'center', marginTop: '1rem',
          fontFamily: 'var(--font-fun)',
          color: 'var(--text-muted)', fontSize: '0.9rem',
        }}>
          💡 <em>Tip: Multiply or divide both the top and bottom by the same number to find equivalent fractions!</em>
        </div>

        {/* Image strip */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '1.25rem' }}>
          <img src={fractionBridgeImg} alt="Fraction Bridge" style={{
            width: '48%', maxHeight: 70, objectFit: 'cover',
            borderRadius: 'var(--radius-lg)', border: '3px solid #B8860B',
            boxShadow: 'var(--shadow-sm)', opacity: 0.8,
          }} />
          <img src={thirdTreehouseImg} alt="Third Treehouse" style={{
            width: '48%', maxHeight: 70, objectFit: 'cover',
            borderRadius: 'var(--radius-lg)', border: '3px solid #B8860B',
            boxShadow: 'var(--shadow-sm)', opacity: 0.8,
          }} />
        </div>
      </main>
    </div>
  );
}

export default Level2;

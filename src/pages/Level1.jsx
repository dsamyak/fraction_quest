import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useGame } from '../context/GameContext';
import confetti from 'canvas-confetti';
import levelBeach from '../assets/level-beach.png';
import halfHillImg from '../assets/half-hill.jpeg';
import quarterBeachImg from '../assets/quarter-beach.jpeg';
import { level1Questions, pickRandom, LEVEL_CONFIG } from '../data/questionBank';

const CONFIG = LEVEL_CONFIG.level1;

/* ─── Story beats for each question (cycling) ─── */
const storyBeats = [
  {
    narrator: "Captain Blackbeard's ship crashed on Half Hill Beach! The treasure map washed ashore torn into fraction-coded pieces.",
    character: '🏴‍☠️',
    characterName: 'Captain Blackbeard',
    characterSays: "Arrr! That cursed storm! Me map is shattered… only a true fraction explorer can piece it back together!",
  },
  {
    narrator: "You wade through the surf and find the first glowing map fragment humming with fraction magic.",
    character: '🗺️',
    characterName: 'Map Fragment',
    characterSays: "Decode my fraction and I shall reveal the next clue on the treasure trail!",
  },
  {
    narrator: "A friendly sea turtle surfaces with another fragment clutched in its flippers.",
    character: '🐢',
    characterName: 'Old Shellsworth',
    characterSays: "Blackbeard gave me this piece for safekeeping. Solve its fraction to earn it, young explorer!",
  },
  {
    narrator: "The tide recedes, revealing a carved stone with a fraction etched by Blackbeard himself.",
    character: '🪨',
    characterName: 'Ancient Stone',
    characterSays: "Only the one who understands fractions may read my secret… can you?",
  },
  {
    narrator: "The final beach fragment floats in a bottle sealed with a black wax skull — Blackbeard's personal seal!",
    character: '🍶',
    characterName: 'Message in a Bottle',
    characterSays: "If ye be reading this, the treasure map is almost whole again! One last fraction stands between you and the jungle path…",
  },
];

/* ─── End-of-level transition story ─── */
function TransitionModal({ onContinue }) {
  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 200,
      background: 'radial-gradient(ellipse at center, rgba(27,67,50,0.97) 0%, rgba(11,30,20,0.99) 100%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      backdropFilter: 'blur(8px)',
    }}>
      {/* Animated particles */}
      {[...Array(12)].map((_, i) => (
        <div key={i} style={{
          position: 'absolute',
          top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%`,
          width: 6, height: 6, borderRadius: '50%',
          background: i % 2 === 0 ? '#E9C46A' : '#52B788',
          animation: `lavaRise ${2 + i * 0.3}s ease-in-out infinite`,
          animationDelay: `${i * 0.2}s`, opacity: 0.7,
          pointerEvents: 'none',
        }} />
      ))}
      <style>{`
        @keyframes lavaRise {
          0% { transform: translateY(0) scale(1); opacity: 0.7; }
          100% { transform: translateY(-80px) scale(0); opacity: 0; }
        }
        @keyframes modalSlideIn {
          from { transform: translateY(40px) scale(0.95); opacity: 0; }
          to { transform: translateY(0) scale(1); opacity: 1; }
        }
        @keyframes glowPulse {
          0%, 100% { box-shadow: 0 0 20px rgba(233,196,106,0.3); }
          50% { box-shadow: 0 0 50px rgba(233,196,106,0.7), 0 0 80px rgba(82,183,136,0.3); }
        }
      `}</style>

      <div style={{
        maxWidth: 560, width: '90%',
        background: 'linear-gradient(145deg, rgba(243,229,192,0.98), rgba(245,230,200,0.99))',
        border: '5px solid #B8860B',
        borderRadius: 24,
        padding: '2.5rem',
        textAlign: 'center',
        animation: 'modalSlideIn 0.5s cubic-bezier(0.34,1.56,0.64,1) forwards, glowPulse 3s ease-in-out infinite',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Corner stars */}
        {['⭐','✨','🌟','💫'].map((s, i) => (
          <span key={i} style={{
            position: 'absolute',
            top: i < 2 ? 12 : null, bottom: i >= 2 ? 12 : null,
            left: i % 2 === 0 ? 12 : null, right: i % 2 !== 0 ? 12 : null,
            fontSize: '1.1rem', opacity: 0.5,
          }}>{s}</span>
        ))}

        <div style={{ fontSize: '4rem', marginBottom: '0.5rem' }}>🗺️</div>

        <h2 style={{
          fontFamily: 'var(--font-heading)',
          fontSize: 'clamp(1.6rem, 4vw, 2.2rem)',
          color: 'var(--primary-dark)',
          marginBottom: '0.5rem',
        }}>
          🎉 Map Assembled!
        </h2>

        <div style={{
          background: 'linear-gradient(145deg, rgba(27,67,50,0.08), rgba(27,67,50,0.04))',
          border: '3px solid #B8860B',
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
            "Extraordinary work, young explorer! You've decoded all my fraction clues and reassembled the map! See there — it points to the ancient Jungle Bridge…"
          </p>
          <div style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '0.9rem',
            color: 'var(--primary)',
          }}>— Captain Blackbeard's Ghost</div>
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
          🌿 <strong>The map glows!</strong> It reveals a <strong>jungle path</strong> leading to a crumbling bridge over a roaring river. But the bridge is <strong>broken</strong> — scattered stones with mysterious fraction engravings are the only way to rebuild it…
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '1rem',
          marginBottom: '1.5rem',
          fontSize: '1.5rem',
        }}>
          🏖️ <span style={{ fontFamily: 'var(--font-fun)', fontSize: '0.9rem', color: '#6B7280' }}>Beach Complete</span>
          →
          🌿 <span style={{ fontFamily: 'var(--font-fun)', fontSize: '0.9rem', color: 'var(--primary)', fontWeight: 700 }}>Jungle Bridge</span>
          →
          🌋 <span style={{ fontFamily: 'var(--font-fun)', fontSize: '0.9rem', color: '#9CA3AF' }}>Volcano</span>
        </div>

        <button
          onClick={onContinue}
          style={{
            background: 'linear-gradient(145deg, var(--primary), var(--primary-dark))',
            color: 'white',
            border: '3px solid #1B4332',
            borderRadius: 'var(--radius-full)',
            padding: '1rem 3rem',
            fontFamily: 'var(--font-heading)',
            fontSize: '1.2rem',
            cursor: 'pointer',
            boxShadow: 'var(--shadow-lg)',
            transition: 'all 0.3s cubic-bezier(0.34,1.56,0.64,1)',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.transform = 'scale(1.05)';
            e.currentTarget.style.boxShadow = 'var(--shadow-xl), 0 0 20px rgba(45,106,79,0.4)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
          }}
        >
          🌿 Head to the Jungle Bridge →
        </button>
      </div>
    </div>
  );
}

function Level1() {
  const { addCoins, addXp, unlockLevel } = useGame();
  const navigate = useNavigate();
  const [currentStage, setCurrentStage] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [showIntro, setShowIntro] = useState(true);
  const [showTransition, setShowTransition] = useState(false);

  // Pick random questions once per mount
  const stages = useMemo(
    () => pickRandom(level1Questions, CONFIG.questionsPerSession),
    []
  );

  const handleAnswer = (correct) => {
    if (correct) {
      setFeedback('correct');
      addCoins(CONFIG.coinsPerAnswer);
      addXp(CONFIG.xpPerAnswer);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#E9C46A', '#2D6A4F', '#E76F51', '#F4A261'],
      });

      setTimeout(() => {
        if (currentStage < stages.length - 1) {
          setCurrentStage(c => c + 1);
          setFeedback(null);
        } else {
          unlockLevel('level2');
          setFeedback(null);
          setShowTransition(true);
        }
      }, 2000);
    } else {
      setFeedback('incorrect');
      setTimeout(() => setFeedback(null), 1200);
    }
  };

  const handleTransitionContinue = () => {
    navigate('/simulation');
  };

  const stage = stages[currentStage];
  const progress = ((currentStage + 1) / stages.length) * 100;
  const beat = storyBeats[currentStage % storyBeats.length];

  // ======== INTRO SCREEN ========
  if (showIntro) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'var(--bg-sky)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Background */}
        <div style={{
          position: 'fixed', bottom: 0, left: 0, right: 0, height: '50%',
          backgroundImage: `url(${levelBeach})`,
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
          {/* Hero image */}
          <img
            src={halfHillImg}
            alt="Half Hill Beach"
            style={{ width: '100%', maxHeight: 220, objectFit: 'cover', display: 'block' }}
          />

          <div style={{ padding: '2rem', textAlign: 'center' }}>
            {/* Chapter badge */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
              background: 'linear-gradient(145deg, #8B6914, #6B4F1D)',
              color: '#FFF9C4', borderRadius: 'var(--radius-full)',
              padding: '0.3rem 1rem', fontSize: '0.8rem',
              fontFamily: 'var(--font-fun)', fontWeight: 700,
              letterSpacing: '0.05em', textTransform: 'uppercase',
              marginBottom: '1rem',
            }}>
              📖 Chapter 1 of 3
            </div>

            <h2 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(1.6rem, 4vw, 2.3rem)',
              color: 'var(--primary-dark)',
              marginBottom: '0.25rem',
            }}>
              🏖️ Beach Landing
            </h2>
            <h3 style={{
              fontFamily: 'var(--font-fun)',
              fontSize: '1rem',
              color: '#D97706',
              fontWeight: 700,
              marginBottom: '1.25rem',
            }}>
              The Mystery of the Torn Map
            </h3>

            {/* Story text */}
            <div style={{
              background: 'rgba(255,255,255,0.6)',
              border: '2px solid #B8860B',
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
                    "Arrr! Me ship crashed on this very beach and the map was torn to pieces by the storm!
                    Each fragment is coded with a fraction — decode them all to reassemble the map
                    and discover where I hid the legendary Fraction Treasure!"
                  </p>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
              <div className="badge-coin" style={{ fontSize: '0.9rem' }}>
                🪙 {CONFIG.coinsPerAnswer} coins per clue
              </div>
              <div className="badge-xp" style={{ fontSize: '0.9rem' }}>
                ⭐ {CONFIG.xpPerAnswer} XP per clue
              </div>
              <div style={{
                background: 'rgba(233,196,106,0.2)', border: '2px solid #E9C46A',
                borderRadius: 'var(--radius-full)', padding: '0.3rem 0.8rem',
                fontFamily: 'var(--font-fun)', fontWeight: 700, fontSize: '0.9rem',
                color: '#92400E',
              }}>
                📜 {CONFIG.questionsPerSession} map fragments
              </div>
            </div>

            <button
              className="btn btn-primary"
              onClick={() => setShowIntro(false)}
              style={{ fontSize: '1.15rem', padding: '1rem 3rem' }}
            >
              ⚓ Set Sail for the Treasure!
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--bg-sky)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Transition modal */}
      {showTransition && <TransitionModal onContinue={handleTransitionContinue} />}

      {/* Beach background */}
      <div style={{
        position: 'fixed', bottom: 0, left: 0, right: 0, height: '40%',
        backgroundImage: `url(${levelBeach})`,
        backgroundSize: 'cover', backgroundPosition: 'center top',
        opacity: 0.15, filter: 'blur(3px)', zIndex: 0,
      }} />

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
          🏖️ Beach Landing — The Torn Map
        </div>
        <div style={{
          fontFamily: 'var(--font-fun)', fontWeight: 700, fontSize: '0.9rem',
          display: 'flex', alignItems: 'center', gap: '0.5rem',
        }}>
          🗺️ Fragment {currentStage + 1} / {stages.length}
        </div>
      </header>

      {/* ======== PROGRESS BAR ======== */}
      <div style={{ width: '100%', height: 8, background: '#1B4332', position: 'relative', zIndex: 40 }}>
        <div style={{
          height: '100%', width: `${progress}%`,
          background: 'linear-gradient(90deg, var(--success), var(--treasure))',
          transition: 'width 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
          boxShadow: '0 0 10px rgba(6, 214, 160, 0.5)',
        }} />
      </div>

      {/* ======== MAIN CONTENT ======== */}
      <main style={{
        maxWidth: '56rem', margin: '1.5rem auto 2rem',
        padding: '0 1.5rem', position: 'relative', zIndex: 5,
      }}>

        {/* ── STORY NARRATOR BOX ── */}
        <div style={{
          background: 'linear-gradient(145deg, rgba(27,67,50,0.9), rgba(11,30,20,0.95))',
          border: '3px solid #B8860B',
          borderRadius: 'var(--radius-xl)',
          padding: '1.25rem 1.5rem',
          marginBottom: '1rem',
          display: 'flex', alignItems: 'flex-start', gap: '1rem',
          boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
          position: 'relative', overflow: 'hidden',
        }}>
          {/* Subtle shimmer */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(90deg, transparent, rgba(233,196,106,0.04), transparent)',
            pointerEvents: 'none',
          }} />

          <span style={{ fontSize: '2.8rem', flexShrink: 0, filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))' }}>
            {beat.character}
          </span>
          <div style={{ flex: 1 }}>
            <div style={{
              fontFamily: 'var(--font-heading)', fontSize: '0.8rem',
              color: '#E9C46A', marginBottom: '0.4rem',
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
          padding: '2rem 2rem 2rem', textAlign: 'center',
          position: 'relative', overflow: 'hidden',
        }}>
          {/* Decorative sea elements */}
          <span style={{ position: 'absolute', top: 10, right: 15, fontSize: '1.5rem', opacity: 0.3, animation: 'sway 4s ease-in-out infinite' }}>🌊</span>
          <span style={{ position: 'absolute', bottom: 10, left: 15, fontSize: '1.2rem', opacity: 0.3 }}>🐚</span>
          <span style={{ position: 'absolute', bottom: 10, right: 40, fontSize: '1rem', opacity: 0.25 }}>⭐</span>

          {/* Fragment counter badge */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.3rem',
            background: 'linear-gradient(145deg, #8B6914, #6B4F1D)',
            color: '#FFF9C4', padding: '0.25rem 0.75rem',
            borderRadius: 'var(--radius-full)', fontSize: '0.75rem',
            fontFamily: 'var(--font-fun)', fontWeight: 700,
            marginBottom: '1rem',
          }}>
            🗺️ Map Fragment {currentStage + 1}
          </div>

          {/* Question */}
          <h3 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)',
            color: 'var(--primary-dark)',
            marginBottom: '2rem',
            lineHeight: 1.4,
          }}>
            {stage.question}
          </h3>

          {/* Options */}
          <div style={{
            display: 'flex', justifyContent: 'center',
            gap: '1.5rem', flexWrap: 'wrap',
          }}>
            {stage.options.map((opt) => (
              <div
                key={opt.id}
                onClick={() => !feedback && handleAnswer(opt.correct)}
                style={{
                  cursor: feedback ? 'default' : 'pointer',
                  padding: '1.5rem',
                  border: feedback === 'correct' && opt.correct
                    ? '4px solid var(--success)'
                    : feedback === 'incorrect' && !opt.correct
                    ? '4px solid var(--danger)'
                    : '4px solid #B8860B',
                  borderRadius: 'var(--radius-xl)',
                  background: feedback === 'correct' && opt.correct
                    ? 'linear-gradient(145deg, #D1FAE5, #A7F3D0)'
                    : 'var(--bg-parchment)',
                  transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                  boxShadow: 'var(--shadow-md)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '0.5rem',
                }}
                onMouseEnter={(e) => {
                  if (!feedback) {
                    e.currentTarget.style.transform = 'translateY(-6px) scale(1.05)';
                    e.currentTarget.style.boxShadow = 'var(--shadow-lg), var(--shadow-glow)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!feedback) {
                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                    e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                  }
                }}
              >
                <VisualFraction type={opt.visual} />
                <span style={{
                  fontFamily: 'var(--font-fun)',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  color: 'var(--text-parchment)',
                  opacity: 0.8,
                }}>
                  {opt.label}
                </span>
              </div>
            ))}
          </div>

          {/* ======== FEEDBACK OVERLAYS ======== */}
          {feedback === 'correct' && (
            <div style={{
              position: 'absolute', inset: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: 'rgba(255,255,255,0.88)',
              backdropFilter: 'blur(4px)', zIndex: 10,
            }}>
              <div className="animate-popIn" style={{
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', gap: '0.5rem',
              }}>
                <span style={{ fontSize: '4rem' }}>🗺️</span>
                <div style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '2rem', color: 'var(--success)',
                  textShadow: '2px 2px 0 rgba(6, 214, 160, 0.2)',
                }}>
                  Map Fragment Found!
                </div>
                <div style={{ fontFamily: 'var(--font-fun)', fontSize: '0.95rem', color: 'var(--text-parchment)', fontStyle: 'italic' }}>
                  "Magnificent, young explorer!" — Blackbeard
                </div>
                <div className="badge-coin" style={{ fontSize: '1.1rem', padding: '0.4rem 1.2rem' }}>
                  🪙 +{CONFIG.coinsPerAnswer} Coins!
                </div>
              </div>
            </div>
          )}

          {feedback === 'incorrect' && (
            <div style={{
              position: 'absolute', inset: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              pointerEvents: 'none', zIndex: 10,
            }}>
              <div className="animate-popIn" style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.8rem', color: 'var(--danger)',
                background: 'rgba(255,255,255,0.95)',
                padding: '1rem 2rem',
                borderRadius: 'var(--radius-xl)',
                border: '3px solid var(--danger)',
                boxShadow: 'var(--shadow-lg)',
                textAlign: 'center',
              }}>
                🌊 Wrong Fragment!
                <div style={{ fontSize: '1rem', marginTop: '0.3rem', color: '#9CA3AF' }}>
                  Try again, explorer!
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Hint area */}
        <div style={{
          textAlign: 'center', marginTop: '1rem',
          fontFamily: 'var(--font-fun)',
          color: 'var(--text-muted)', fontSize: '0.9rem',
        }}>
          💡 <em>{stage.hint || 'Tip: Count the colored parts vs. total parts!'}</em>
        </div>

        {/* Image strip */}
        <div style={{
          display: 'flex', justifyContent: 'center', gap: '1rem',
          marginTop: '1.5rem',
        }}>
          <img src={halfHillImg} alt="Half Hill" style={{
            width: '48%', maxHeight: 80, objectFit: 'cover',
            borderRadius: 'var(--radius-lg)', border: '3px solid #B8860B',
            boxShadow: 'var(--shadow-sm)', opacity: 0.8,
          }} />
          <img src={quarterBeachImg} alt="Quarter Beach" style={{
            width: '48%', maxHeight: 80, objectFit: 'cover',
            borderRadius: 'var(--radius-lg)', border: '3px solid #B8860B',
            boxShadow: 'var(--shadow-sm)', opacity: 0.8,
          }} />
        </div>
      </main>
    </div>
  );
}

/* ============================
   Visual Fraction Shapes
   ============================ */
function VisualFraction({ type }) {
  const shapeSize = 120;
  const filledColor = 'var(--ocean)';
  const emptyColor = '#FFF8E7';
  const borderColor = '#6B4F1D';

  if (type === 'pie-1-2') {
    return (
      <div style={{ width: shapeSize, height: shapeSize, borderRadius: '50%', border: `4px solid ${borderColor}`, overflow: 'hidden', display: 'flex', boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.1)' }}>
        <div style={{ width: '50%', height: '100%', background: filledColor }} />
        <div style={{ width: '50%', height: '100%', background: emptyColor }} />
      </div>
    );
  }
  if (type === 'pie-1-4') {
    return (
      <div style={{ width: shapeSize, height: shapeSize, borderRadius: '50%', border: `4px solid ${borderColor}`, overflow: 'hidden', position: 'relative', background: emptyColor, boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.1)' }}>
        <div style={{ position: 'absolute', top: 0, right: 0, width: '50%', height: '50%', background: filledColor, borderLeft: `2px solid ${borderColor}`, borderBottom: `2px solid ${borderColor}` }} />
        <div style={{ position: 'absolute', top: 0, left: 0, width: '50%', height: '100%', borderRight: `2px solid ${borderColor}` }} />
        <div style={{ position: 'absolute', bottom: 0, right: 0, width: '50%', height: '50%', borderTop: `2px solid ${borderColor}` }} />
      </div>
    );
  }
  if (type === 'pie-3-4') {
    return (
      <div style={{ width: shapeSize, height: shapeSize, borderRadius: '50%', border: `4px solid ${borderColor}`, overflow: 'hidden', position: 'relative', background: filledColor, boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.1)' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, width: '50%', height: '50%', background: emptyColor, borderRight: `2px solid ${borderColor}`, borderBottom: `2px solid ${borderColor}` }} />
        <div style={{ position: 'absolute', top: 0, right: 0, width: '50%', height: '100%', borderLeft: `2px solid ${borderColor}` }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, width: '50%', height: '50%', borderTop: `2px solid ${borderColor}` }} />
      </div>
    );
  }
  if (type === 'pie-whole') {
    return (
      <div style={{ width: shapeSize, height: shapeSize, borderRadius: '50%', border: `4px solid ${borderColor}`, background: filledColor, boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ fontFamily: 'var(--font-heading)', color: 'white', fontSize: '1.1rem', textShadow: '1px 1px 0 rgba(0,0,0,0.3)' }}>WHOLE</span>
      </div>
    );
  }
  if (type === 'bar-0-4') {
    return (
      <div style={{ width: 160, height: 60, border: `4px solid ${borderColor}`, display: 'flex', borderRadius: 8, overflow: 'hidden', boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.1)' }}>
        {[...Array(4)].map((_, i) => (
          <div key={i} style={{ flex: 1, background: emptyColor, borderRight: i < 3 ? `3px solid ${borderColor}` : 'none' }} />
        ))}
      </div>
    );
  }
  if (type === 'bar-1-2') {
    return (
      <div style={{ width: 160, height: 60, border: `4px solid ${borderColor}`, display: 'flex', borderRadius: 8, overflow: 'hidden', boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.1)' }}>
        <div style={{ flex: 1, background: 'var(--accent)', borderRight: `3px solid ${borderColor}` }} />
        <div style={{ flex: 1, background: emptyColor }} />
      </div>
    );
  }
  if (type === 'bar-1-3') {
    return (
      <div style={{ width: 160, height: 60, border: `4px solid ${borderColor}`, display: 'flex', borderRadius: 8, overflow: 'hidden', boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.1)' }}>
        <div style={{ flex: 1, background: 'var(--accent)', borderRight: `3px solid ${borderColor}` }} />
        <div style={{ flex: 1, background: emptyColor, borderRight: `3px solid ${borderColor}` }} />
        <div style={{ flex: 1, background: emptyColor }} />
      </div>
    );
  }
  if (type === 'bar-2-3') {
    return (
      <div style={{ width: 160, height: 60, border: `4px solid ${borderColor}`, display: 'flex', borderRadius: 8, overflow: 'hidden', boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.1)' }}>
        <div style={{ flex: 1, background: 'var(--accent)', borderRight: `3px solid ${borderColor}` }} />
        <div style={{ flex: 1, background: 'var(--accent)', borderRight: `3px solid ${borderColor}` }} />
        <div style={{ flex: 1, background: emptyColor }} />
      </div>
    );
  }
  if (type === 'bar-1-4') {
    return (
      <div style={{ width: 160, height: 60, border: `4px solid ${borderColor}`, display: 'flex', borderRadius: 8, overflow: 'hidden', boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.1)' }}>
        <div style={{ flex: 1, background: 'var(--accent)', borderRight: `3px solid ${borderColor}` }} />
        <div style={{ flex: 1, background: emptyColor, borderRight: `3px solid ${borderColor}` }} />
        <div style={{ flex: 1, background: emptyColor, borderRight: `3px solid ${borderColor}` }} />
        <div style={{ flex: 1, background: emptyColor }} />
      </div>
    );
  }
  if (type === 'bar-2-4') {
    return (
      <div style={{ width: 160, height: 60, border: `4px solid ${borderColor}`, display: 'flex', borderRadius: 8, overflow: 'hidden', boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.1)' }}>
        <div style={{ flex: 1, background: 'var(--accent)', borderRight: `3px solid ${borderColor}` }} />
        <div style={{ flex: 1, background: 'var(--accent)', borderRight: `3px solid ${borderColor}` }} />
        <div style={{ flex: 1, background: emptyColor, borderRight: `3px solid ${borderColor}` }} />
        <div style={{ flex: 1, background: emptyColor }} />
      </div>
    );
  }
  if (type === 'bar-3-4') {
    return (
      <div style={{ width: 160, height: 60, border: `4px solid ${borderColor}`, display: 'flex', borderRadius: 8, overflow: 'hidden', boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.1)' }}>
        <div style={{ flex: 1, background: 'var(--accent)', borderRight: `3px solid ${borderColor}` }} />
        <div style={{ flex: 1, background: 'var(--accent)', borderRight: `3px solid ${borderColor}` }} />
        <div style={{ flex: 1, background: 'var(--accent)', borderRight: `3px solid ${borderColor}` }} />
        <div style={{ flex: 1, background: emptyColor }} />
      </div>
    );
  }

  return (
    <div style={{
      width: shapeSize, height: shapeSize,
      background: '#f3f4f6', borderRadius: '50%',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: '0.75rem', color: '#9CA3AF',
    }}>
      {type}
    </div>
  );
}

export default Level1;

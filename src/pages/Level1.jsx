import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useGame } from '../context/GameContext';
import confetti from 'canvas-confetti';
import levelBeach from '../assets/level-beach.png';
import halfHillImg from '../assets/half-hill.jpeg';
import quarterBeachImg from '../assets/quarter-beach.jpeg';
import { level1Questions, pickRandom, LEVEL_CONFIG } from '../data/questionBank';

const CONFIG = LEVEL_CONFIG.level1;

function Level1() {
  const { addCoins, addXp, unlockLevel } = useGame();
  const navigate = useNavigate();
  const [currentStage, setCurrentStage] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [showIntro, setShowIntro] = useState(true);

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
          navigate('/simulation');
        }
      }, 2000);
    } else {
      setFeedback('incorrect');
      setTimeout(() => setFeedback(null), 1200);
    }
  };

  const stage = stages[currentStage];
  const progress = ((currentStage + 1) / stages.length) * 100;

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
          maxWidth: 600, width: '90%',
          background: 'linear-gradient(145deg, rgba(243, 229, 192, 0.97), rgba(245, 230, 200, 0.99))',
          border: '5px solid #8B6914',
          borderRadius: 'var(--radius-xl)',
          boxShadow: '0 20px 50px rgba(27, 67, 50, 0.3)',
          padding: '2rem',
          textAlign: 'center',
        }}>
          <img
            src={halfHillImg}
            alt="Welcome to Half Hill!"
            style={{
              width: '100%', maxHeight: 280, objectFit: 'cover',
              borderRadius: 'var(--radius-lg)',
              border: '3px solid #B8860B',
              marginBottom: '1.5rem',
              boxShadow: 'var(--shadow-md)',
            }}
          />
          <h2 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
            color: 'var(--primary-dark)',
            marginBottom: '0.5rem',
          }}>
            🏖️ Level 1: Beach Landing
          </h2>
          <p style={{
            fontFamily: 'var(--font-fun)',
            fontSize: '1.1rem',
            color: 'var(--text-parchment)',
            marginBottom: '1.5rem',
            lineHeight: 1.6,
          }}>
            Welcome to <strong>Half Hill</strong>! Match fractions to pictures on the sandy shores.
            You'll face <strong>{CONFIG.questionsPerSession} random challenges</strong> each time you play!
          </p>
          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '1rem' }}>
            <div className="badge-coin" style={{ fontSize: '0.95rem' }}>
              🪙 {CONFIG.coinsPerAnswer} coins per answer
            </div>
            <div className="badge-xp" style={{ fontSize: '0.95rem' }}>
              ⭐ {CONFIG.xpPerAnswer} XP per answer
            </div>
          </div>
          <button
            className="btn btn-primary"
            onClick={() => setShowIntro(false)}
            style={{ fontSize: '1.2rem', padding: '1rem 3rem' }}
          >
            ⚔️ Start Adventure!
          </button>
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
          🏖️ Level 1: Beach Landing
        </div>
        <div style={{
          fontFamily: 'var(--font-fun)', fontWeight: 700, fontSize: '0.9rem',
          display: 'flex', alignItems: 'center', gap: '0.5rem',
        }}>
          🐚 Stage {currentStage + 1} / {stages.length}
        </div>
      </header>

      {/* ======== PROGRESS BAR ======== */}
      <div style={{
        width: '100%', height: 8,
        background: '#1B4332', position: 'relative', zIndex: 40,
      }}>
        <div style={{
          height: '100%', width: `${progress}%`,
          background: 'linear-gradient(90deg, var(--success), var(--treasure))',
          transition: 'width 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
          boxShadow: '0 0 10px rgba(6, 214, 160, 0.5)',
        }} />
      </div>

      {/* ======== THEMATIC IMAGE BANNER ======== */}
      <div style={{
        display: 'flex', justifyContent: 'center', gap: '1rem',
        padding: '1rem 1.5rem 0', position: 'relative', zIndex: 5,
        maxWidth: '52rem', margin: '0 auto',
      }}>
        <img src={halfHillImg} alt="Half Hill" style={{
          width: '48%', maxHeight: 100, objectFit: 'cover',
          borderRadius: 'var(--radius-lg)',
          border: '3px solid #B8860B',
          boxShadow: 'var(--shadow-sm)',
          opacity: 0.85,
        }} />
        <img src={quarterBeachImg} alt="Quarter Beach" style={{
          width: '48%', maxHeight: 100, objectFit: 'cover',
          borderRadius: 'var(--radius-lg)',
          border: '3px solid #B8860B',
          boxShadow: 'var(--shadow-sm)',
          opacity: 0.85,
        }} />
      </div>

      {/* ======== MAIN CONTENT ======== */}
      <main style={{
        maxWidth: '52rem', margin: '1rem auto 2rem',
        padding: '0 1.5rem', position: 'relative', zIndex: 5,
      }}>
        <div className="card-parchment" style={{
          padding: '2.5rem', textAlign: 'center',
          position: 'relative', overflow: 'hidden',
        }}>
          {/* Decorative sea elements */}
          <span style={{ position: 'absolute', top: 10, right: 15, fontSize: '1.5rem', opacity: 0.3, animation: 'sway 4s ease-in-out infinite' }}>🌊</span>
          <span style={{ position: 'absolute', bottom: 10, left: 15, fontSize: '1.2rem', opacity: 0.3 }}>🐚</span>
          <span style={{ position: 'absolute', bottom: 10, right: 40, fontSize: '1rem', opacity: 0.25 }}>⭐</span>

          {/* Question */}
          <h3 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(1.3rem, 3vw, 1.8rem)',
            color: 'var(--primary-dark)',
            marginBottom: '2rem',
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
              background: 'rgba(255,255,255,0.85)',
              backdropFilter: 'blur(4px)', zIndex: 10,
            }}>
              <div className="animate-popIn" style={{
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', gap: '0.5rem',
              }}>
                <span style={{ fontSize: '4rem' }}>🎉</span>
                <div style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '2.5rem', color: 'var(--success)',
                  textShadow: '2px 2px 0 rgba(6, 214, 160, 0.2)',
                }}>
                  Great Find!
                </div>
                <div className="badge-coin" style={{ fontSize: '1.2rem', padding: '0.5rem 1.5rem' }}>
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
                fontSize: '2rem', color: 'var(--danger)',
                background: 'rgba(255,255,255,0.95)',
                padding: '1rem 2rem',
                borderRadius: 'var(--radius-xl)',
                border: '3px solid var(--danger)',
                boxShadow: 'var(--shadow-lg)',
              }}>
                🌊 Oops! Try Again, Explorer!
              </div>
            </div>
          )}
        </div>

        {/* Hint area */}
        <div style={{
          textAlign: 'center', marginTop: '1.5rem',
          fontFamily: 'var(--font-fun)',
          color: 'var(--text-muted)', fontSize: '0.95rem',
        }}>
          💡 <em>{stage.hint || 'Tip: Count the colored parts vs. total parts!'}</em>
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

  // PIE CHARTS
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
        <span style={{ fontFamily: 'var(--font-heading)', color: 'white', fontSize: '1.2rem', textShadow: '1px 1px 0 rgba(0,0,0,0.3)' }}>WHOLE</span>
      </div>
    );
  }

  // BAR CHARTS
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

  // Fallback
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

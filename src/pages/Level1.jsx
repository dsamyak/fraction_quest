import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useGame } from '../context/GameContext';
import confetti from 'canvas-confetti';
import levelBeach from '../assets/level-beach.png';

function Level1() {
  const { addCoins, addXp, unlockLevel } = useGame();
  const navigate = useNavigate();
  const [currentStage, setCurrentStage] = useState(0);
  const [feedback, setFeedback] = useState(null);

  const stages = [
    {
      question: 'Which picture shows ½ of the shape colored?',
      options: [
        { id: 'a', visual: 'pie-1-2', correct: true },
        { id: 'b', visual: 'pie-1-4', correct: false },
        { id: 'c', visual: 'pie-3-4', correct: false },
      ]
    },
    {
      question: 'Which bar shows ¾ shaded?',
      options: [
        { id: 'a', visual: 'bar-1-2', correct: false },
        { id: 'b', visual: 'bar-3-4', correct: true },
        { id: 'c', visual: 'bar-1-4', correct: false },
      ]
    }
  ];

  const handleAnswer = (correct) => {
    if (correct) {
      setFeedback('correct');
      addCoins(10);
      addXp(25);
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
      setTimeout(() => setFeedback(null), 1000);
    }
  };

  const stage = stages[currentStage];
  const progress = ((currentStage + 1) / stages.length) * 100;

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--bg-sky)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Beach background */}
      <div style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        height: '40%',
        backgroundImage: `url(${levelBeach})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center top',
        opacity: 0.15,
        filter: 'blur(3px)',
        zIndex: 0,
      }} />

      {/* ======== WOOD HEADER ======== */}
      <header className="wood-header" style={{
        padding: '0.75rem 1.5rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'sticky',
        top: 0,
        zIndex: 50,
      }}>
        <Link to="/simulation" className="btn btn-secondary" style={{ fontSize: '0.8rem', padding: '0.4rem 0.8rem' }}>
          🏝️ Back to Map
        </Link>
        <div style={{
          fontFamily: 'var(--font-heading)',
          fontSize: '1.2rem',
          textShadow: '2px 2px 0 rgba(0,0,0,0.3)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
        }}>
          🏖️ Level 1: Beach Landing
        </div>
        <div style={{
          fontFamily: 'var(--font-fun)',
          fontWeight: 700,
          fontSize: '0.9rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
        }}>
          🐚 Stage {currentStage + 1} / {stages.length}
        </div>
      </header>

      {/* ======== PROGRESS BAR ======== */}
      <div style={{
        width: '100%',
        height: 8,
        background: '#1B4332',
        position: 'relative',
        zIndex: 40,
      }}>
        <div style={{
          height: '100%',
          width: `${progress}%`,
          background: 'linear-gradient(90deg, var(--success), var(--treasure))',
          transition: 'width 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
          boxShadow: '0 0 10px rgba(6, 214, 160, 0.5)',
        }} />
      </div>

      {/* ======== MAIN CONTENT ======== */}
      <main style={{
        maxWidth: '52rem',
        margin: '2rem auto',
        padding: '0 1.5rem',
        position: 'relative',
        zIndex: 5,
      }}>
        <div className="card-parchment" style={{
          padding: '2.5rem',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}>
          {/* Decorative sea elements */}
          <span style={{ position: 'absolute', top: 10, right: 15, fontSize: '1.5rem', opacity: 0.3, animation: 'sway 4s ease-in-out infinite' }}>🌊</span>
          <span style={{ position: 'absolute', bottom: 10, left: 15, fontSize: '1.2rem', opacity: 0.3 }}>🐚</span>
          <span style={{ position: 'absolute', bottom: 10, right: 40, fontSize: '1rem', opacity: 0.25 }}>⭐</span>

          {/* Question */}
          <h3 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(1.5rem, 3vw, 2rem)',
            color: 'var(--primary-dark)',
            marginBottom: '2rem',
          }}>
            {stage.question}
          </h3>

          {/* Options */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '1.5rem',
            flexWrap: 'wrap',
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
              </div>
            ))}
          </div>

          {/* ======== FEEDBACK OVERLAYS ======== */}
          {feedback === 'correct' && (
            <div style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(255,255,255,0.85)',
              backdropFilter: 'blur(4px)',
              zIndex: 10,
            }}>
              <div className="animate-popIn" style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.5rem',
              }}>
                <span style={{ fontSize: '4rem' }}>🎉</span>
                <div style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '2.5rem',
                  color: 'var(--success)',
                  textShadow: '2px 2px 0 rgba(6, 214, 160, 0.2)',
                }}>
                  Great Find!
                </div>
                <div className="badge-coin" style={{ fontSize: '1.2rem', padding: '0.5rem 1.5rem' }}>
                  🪙 +10 Coins!
                </div>
              </div>
            </div>
          )}

          {feedback === 'incorrect' && (
            <div style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              pointerEvents: 'none',
              zIndex: 10,
            }}>
              <div className="animate-popIn" style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '2rem',
                color: 'var(--danger)',
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
          textAlign: 'center',
          marginTop: '1.5rem',
          fontFamily: 'var(--font-fun)',
          color: 'var(--text-muted)',
          fontSize: '0.95rem',
        }}>
          💡 <em>Tip: Count the colored parts vs. total parts!</em>
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
      <div style={{
        width: shapeSize,
        height: shapeSize,
        borderRadius: '50%',
        border: `4px solid ${borderColor}`,
        overflow: 'hidden',
        display: 'flex',
        boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.1)',
      }}>
        <div style={{ width: '50%', height: '100%', background: filledColor }} />
        <div style={{ width: '50%', height: '100%', background: emptyColor }} />
      </div>
    );
  }
  if (type === 'pie-1-4') {
    return (
      <div style={{
        width: shapeSize,
        height: shapeSize,
        borderRadius: '50%',
        border: `4px solid ${borderColor}`,
        overflow: 'hidden',
        position: 'relative',
        background: emptyColor,
        boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.1)',
      }}>
        <div style={{ position: 'absolute', top: 0, right: 0, width: '50%', height: '50%', background: filledColor, borderLeft: `2px solid ${borderColor}`, borderBottom: `2px solid ${borderColor}` }} />
        <div style={{ position: 'absolute', top: 0, left: 0, width: '50%', height: '100%', borderRight: `2px solid ${borderColor}` }} />
        <div style={{ position: 'absolute', bottom: 0, right: 0, width: '50%', height: '50%', borderTop: `2px solid ${borderColor}` }} />
      </div>
    );
  }
  if (type === 'pie-3-4') {
    return (
      <div style={{
        width: shapeSize,
        height: shapeSize,
        borderRadius: '50%',
        border: `4px solid ${borderColor}`,
        overflow: 'hidden',
        position: 'relative',
        background: filledColor,
        boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.1)',
      }}>
        <div style={{ position: 'absolute', top: 0, left: 0, width: '50%', height: '50%', background: emptyColor, borderRight: `2px solid ${borderColor}`, borderBottom: `2px solid ${borderColor}` }} />
        <div style={{ position: 'absolute', top: 0, right: 0, width: '50%', height: '100%', borderLeft: `2px solid ${borderColor}` }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, width: '50%', height: '50%', borderTop: `2px solid ${borderColor}` }} />
      </div>
    );
  }
  if (type === 'bar-1-2') {
    return (
      <div style={{
        width: 160,
        height: 60,
        border: `4px solid ${borderColor}`,
        display: 'flex',
        borderRadius: 8,
        overflow: 'hidden',
        boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.1)',
      }}>
        <div style={{ flex: 1, background: 'var(--accent)', borderRight: `3px solid ${borderColor}` }} />
        <div style={{ flex: 1, background: emptyColor }} />
      </div>
    );
  }
  if (type === 'bar-3-4') {
    return (
      <div style={{
        width: 160,
        height: 60,
        border: `4px solid ${borderColor}`,
        display: 'flex',
        borderRadius: 8,
        overflow: 'hidden',
        boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.1)',
      }}>
        <div style={{ flex: 1, background: 'var(--accent)', borderRight: `3px solid ${borderColor}` }} />
        <div style={{ flex: 1, background: 'var(--accent)', borderRight: `3px solid ${borderColor}` }} />
        <div style={{ flex: 1, background: 'var(--accent)', borderRight: `3px solid ${borderColor}` }} />
        <div style={{ flex: 1, background: emptyColor }} />
      </div>
    );
  }
  if (type === 'bar-1-4') {
    return (
      <div style={{
        width: 160,
        height: 60,
        border: `4px solid ${borderColor}`,
        display: 'flex',
        borderRadius: 8,
        overflow: 'hidden',
        boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.1)',
      }}>
        <div style={{ flex: 1, background: 'var(--accent)', borderRight: `3px solid ${borderColor}` }} />
        <div style={{ flex: 1, background: emptyColor, borderRight: `3px solid ${borderColor}` }} />
        <div style={{ flex: 1, background: emptyColor, borderRight: `3px solid ${borderColor}` }} />
        <div style={{ flex: 1, background: emptyColor }} />
      </div>
    );
  }

  return (
    <div style={{
      width: shapeSize,
      height: shapeSize,
      background: '#f3f4f6',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '0.75rem',
      color: '#9CA3AF',
    }}>
      Unknown
    </div>
  );
}

export default Level1;

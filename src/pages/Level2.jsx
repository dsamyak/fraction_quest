import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useGame } from '../context/GameContext';
import confetti from 'canvas-confetti';
import levelBridge from '../assets/level-bridge.png';

function Level2() {
  const { addCoins, addXp, unlockLevel } = useGame();
  const navigate = useNavigate();
  const [currentStage, setCurrentStage] = useState(0);
  const [feedback, setFeedback] = useState(null);

  const stages = [
    {
      target: '1/2',
      options: ['2/4', '1/3', '3/8', '4/8'],
      correctAnswers: ['2/4', '4/8']
    },
    {
      target: '1/3',
      options: ['2/6', '3/4', '3/9', '4/10'],
      correctAnswers: ['2/6', '3/9']
    }
  ];

  const handleAnswer = (answer) => {
    const isCorrect = stages[currentStage].correctAnswers.includes(answer);

    if (isCorrect) {
      setFeedback('correct');
      addCoins(15);
      addXp(30);
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
      background: 'linear-gradient(180deg, #87CEEB 0%, #C5E8D5 40%, #52B788 100%)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Jungle background */}
      <div style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        height: '50%',
        backgroundImage: `url(${levelBridge})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center top',
        opacity: 0.15,
        filter: 'blur(3px)',
        zIndex: 0,
      }} />

      {/* Decorative jungle vines */}
      <div style={{ position: 'absolute', top: 0, left: 20, fontSize: '2rem', opacity: 0.2, animation: 'sway 5s ease-in-out infinite', zIndex: 1 }}>🌿</div>
      <div style={{ position: 'absolute', top: 0, right: 30, fontSize: '2.5rem', opacity: 0.15, animation: 'sway 6s ease-in-out infinite', animationDelay: '1s', zIndex: 1 }}>🌿</div>

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
          🌉 Level 2: Bridge Builder
        </div>
        <div style={{
          fontFamily: 'var(--font-fun)',
          fontWeight: 700,
          fontSize: '0.9rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
        }}>
          🌿 Bridge {currentStage + 1} / {stages.length}
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
          background: 'linear-gradient(90deg, var(--primary-light), var(--treasure))',
          transition: 'width 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
          boxShadow: '0 0 10px rgba(82, 183, 136, 0.5)',
        }} />
      </div>

      {/* ======== MAIN CONTENT ======== */}
      <main style={{
        maxWidth: '56rem',
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
          {/* Decorative elements */}
          <span style={{ position: 'absolute', top: 12, right: 18, fontSize: '1.3rem', opacity: 0.3 }}>🦜</span>
          <span style={{ position: 'absolute', bottom: 12, left: 18, fontSize: '1.2rem', opacity: 0.25 }}>🦋</span>

          <h3 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(1.3rem, 3vw, 1.8rem)',
            color: 'var(--primary-dark)',
            marginBottom: '0.5rem',
          }}>
            Build the Equivalent Fraction Bridge!
          </h3>
          <p style={{
            fontFamily: 'var(--font-fun)',
            fontSize: '1.1rem',
            color: 'var(--text-parchment)',
            marginBottom: '2rem',
          }}>
            Find a fraction equivalent to{' '}
            <span style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '1.8rem',
              color: 'var(--secondary)',
              textShadow: '1px 1px 0 rgba(231, 111, 81, 0.2)',
            }}>
              {stage.target}
            </span>
          </p>

          {/* ======== BRIDGE VISUAL ======== */}
          <div style={{
            position: 'relative',
            height: 220,
            marginBottom: '2rem',
            background: 'linear-gradient(180deg, #87CEEB 0%, #B5E3F5 40%, #219EBC 70%, #126782 100%)',
            borderRadius: 'var(--radius-xl)',
            border: '3px solid var(--ocean-dark)',
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            padding: '0 2rem',
            overflow: 'hidden',
          }}>
            {/* Water ripples */}
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: 40,
              background: 'rgba(2, 48, 71, 0.3)',
              borderRadius: '0 0 var(--radius-xl) var(--radius-xl)',
            }} />

            {/* Left cliff */}
            <div style={{
              width: 100,
              height: '85%',
              background: 'linear-gradient(180deg, var(--primary), var(--primary-dark))',
              borderRadius: '16px 16px 0 0',
              position: 'relative',
              border: '3px solid var(--primary-dark)',
              zIndex: 2,
            }}>
              <div style={{
                position: 'absolute',
                top: 20,
                left: '50%',
                transform: 'translateX(-50%)',
                color: 'white',
                fontFamily: 'var(--font-heading)',
                fontSize: '2rem',
                textShadow: '2px 2px 0 rgba(0,0,0,0.3)',
              }}>
                {stage.target}
              </div>
              {/* Trees on cliff */}
              <span style={{ position: 'absolute', top: -20, left: 10, fontSize: '1.5rem' }}>🌴</span>
              <span style={{ position: 'absolute', top: -15, right: 8, fontSize: '1.2rem' }}>🌳</span>
            </div>

            {/* Bridge (appears on correct answer) */}
            {feedback === 'correct' && (
              <div className="animate-popIn" style={{
                position: 'absolute',
                left: '50%',
                top: '25%',
                transform: 'translateX(-50%)',
                width: '55%',
                height: 16,
                background: 'linear-gradient(180deg, #A0782C, #8B6914, #6B4F1D)',
                border: '3px solid #4A3000',
                boxShadow: 'var(--shadow-lg)',
                zIndex: 5,
                borderRadius: 4,
              }}>
                {/* Rope details */}
                <div style={{
                  position: 'absolute',
                  top: -8,
                  left: '10%',
                  right: '10%',
                  height: 3,
                  background: '#8B6914',
                  borderRadius: 2,
                }} />
              </div>
            )}

            {/* Right cliff */}
            <div style={{
              width: 100,
              height: '85%',
              background: 'linear-gradient(180deg, var(--primary), var(--primary-dark))',
              borderRadius: '16px 16px 0 0',
              position: 'relative',
              border: '3px solid var(--primary-dark)',
              zIndex: 2,
            }}>
              <div style={{
                position: 'absolute',
                top: 20,
                left: '50%',
                transform: 'translateX(-50%)',
                color: 'white',
                fontFamily: 'var(--font-heading)',
                fontSize: '2.5rem',
                textShadow: '2px 2px 0 rgba(0,0,0,0.3)',
              }}>
                ?
              </div>
              <span style={{ position: 'absolute', top: -18, left: 5, fontSize: '1.3rem' }}>🌴</span>
            </div>
          </div>

          {/* ======== ANSWER OPTIONS ======== */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '1rem',
            flexWrap: 'wrap',
          }}>
            {stage.options.map((opt, idx) => (
              <div
                key={idx}
                onClick={() => !feedback && handleAnswer(opt)}
                style={{
                  cursor: feedback ? 'default' : 'pointer',
                  width: 90,
                  height: 90,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.6rem',
                  fontWeight: 700,
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
                {opt}
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
              pointerEvents: 'none',
              zIndex: 30,
            }}>
              <div className="animate-popIn" style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.5rem',
                background: 'rgba(255,255,255,0.9)',
                padding: '2rem 3rem',
                borderRadius: 'var(--radius-xl)',
                boxShadow: 'var(--shadow-xl)',
                border: '4px solid var(--success)',
              }}>
                <span style={{ fontSize: '3rem' }}>🌉</span>
                <div style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '2.2rem',
                  color: 'var(--primary-dark)',
                }}>
                  Bridge Built!
                </div>
                <div className="badge-coin" style={{ fontSize: '1.1rem' }}>
                  🪙 +15 Coins!
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
              zIndex: 30,
            }}>
              <div className="animate-popIn" style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.8rem',
                color: 'var(--danger)',
                background: 'rgba(255,255,255,0.95)',
                padding: '1rem 2rem',
                borderRadius: 'var(--radius-xl)',
                border: '3px solid var(--danger)',
                boxShadow: 'var(--shadow-lg)',
              }}>
                🌊 Splash! That piece doesn't fit!
              </div>
            </div>
          )}
        </div>

        {/* Hint */}
        <div style={{
          textAlign: 'center',
          marginTop: '1.5rem',
          fontFamily: 'var(--font-fun)',
          color: 'var(--text-muted)',
          fontSize: '0.95rem',
        }}>
          💡 <em>Tip: Multiply or divide both the top and bottom by the same number!</em>
        </div>
      </main>
    </div>
  );
}

export default Level2;

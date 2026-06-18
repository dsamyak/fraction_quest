import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useGame } from '../context/GameContext';
import confetti from 'canvas-confetti';
import levelVolcano from '../assets/level-volcano.png';
import understandFractionsImg from '../assets/understand-fractions.jpeg';
import collectCoinsImg from '../assets/collect-coins.jpeg';
import missionCompleteImg from '../assets/mission-complete.jpeg';
import { level3Questions, pickRandom, LEVEL_CONFIG } from '../data/questionBank';

const CONFIG = LEVEL_CONFIG.level3;

function Level3() {
  const { addCoins, addXp } = useGame();
  const navigate = useNavigate();
  const [currentStage, setCurrentStage] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [monsterHp, setMonsterHp] = useState(100);
  const [showIntro, setShowIntro] = useState(true);

  // Pick random questions once per mount
  const stages = useMemo(
    () => pickRandom(level3Questions, CONFIG.questionsPerSession),
    []
  );

  const hpPerHit = Math.ceil(100 / stages.length);

  const handleAnswer = (answer) => {
    const isCorrect = stages[currentStage].correct === answer;

    if (isCorrect) {
      setFeedback('correct');
      addCoins(CONFIG.coinsPerAnswer);
      addXp(CONFIG.xpPerAnswer);
      setMonsterHp(prev => Math.max(0, prev - hpPerHit));

      confetti({
        particleCount: 200,
        spread: 100,
        origin: { y: 0.6 },
        colors: ['#E9C46A', '#E76F51', '#EF4444', '#F59E0B'],
      });

      setTimeout(() => {
        if (currentStage < stages.length - 1) {
          setCurrentStage(c => c + 1);
          setFeedback(null);
        } else {
          setMonsterHp(0);
          setTimeout(() => navigate('/simulation'), 3500);
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
        background: 'linear-gradient(180deg, #1a0a2e 0%, #2d1b69 30%, #5b2c6f 60%, #e74c3c 100%)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'fixed', bottom: 0, left: 0, right: 0, height: '60%',
          backgroundImage: `url(${levelVolcano})`,
          backgroundSize: 'cover', backgroundPosition: 'center top',
          opacity: 0.15, filter: 'blur(3px)', zIndex: 0,
        }} />

        {/* Lava particles in intro */}
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 1 }}>
          {[...Array(6)].map((_, i) => (
            <div key={i} style={{
              position: 'absolute', bottom: '-20px',
              left: `${15 + i * 14}%`,
              width: 6, height: 6, borderRadius: '50%',
              background: i % 2 === 0 ? '#F59E0B' : '#EF4444',
              animation: `lavaRise ${3 + i * 0.5}s ease-in-out infinite`,
              animationDelay: `${i * 0.4}s`, opacity: 0.6,
            }} />
          ))}
          <style>{`
            @keyframes lavaRise {
              0% { transform: translateY(0) scale(1); opacity: 0.6; }
              50% { opacity: 0.9; }
              100% { transform: translateY(-100vh) scale(0); opacity: 0; }
            }
          `}</style>
        </div>

        <div className="animate-popIn" style={{
          position: 'relative', zIndex: 5,
          maxWidth: 600, width: '90%',
          background: 'linear-gradient(145deg, rgba(243, 229, 192, 0.97), rgba(245, 230, 200, 0.99))',
          border: '5px solid #8B6914',
          borderRadius: 'var(--radius-xl)',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5)',
          padding: '2rem',
          textAlign: 'center',
        }}>
          <img
            src={understandFractionsImg}
            alt="Understand Fractions — Volcano Battle"
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
            🌋 Level 3: Volcano Battle
          </h2>
          <p style={{
            fontFamily: 'var(--font-fun)',
            fontSize: '1.1rem',
            color: 'var(--text-parchment)',
            marginBottom: '1.5rem',
            lineHeight: 1.6,
          }}>
            The <strong>Fraction Monster</strong> guards the volcano! Compare fractions to deal damage.
            Face <strong>{CONFIG.questionsPerSession} random battles</strong> to defeat it!
          </p>
          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '1rem' }}>
            <div className="badge-coin" style={{ fontSize: '0.95rem' }}>
              🪙 {CONFIG.coinsPerAnswer} coins per hit
            </div>
            <div className="badge-xp" style={{ fontSize: '0.95rem' }}>
              ⭐ {CONFIG.xpPerAnswer} XP per hit
            </div>
          </div>
          <button
            className="btn btn-primary"
            onClick={() => setShowIntro(false)}
            style={{
              fontSize: '1.2rem', padding: '1rem 3rem',
              background: 'linear-gradient(145deg, #EF4444, #B91C1C)',
              border: '3px solid #991B1B',
            }}
          >
            ⚔️ Battle the Monster!
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #1a0a2e 0%, #2d1b69 30%, #5b2c6f 60%, #e74c3c 100%)',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Volcano background */}
      <div style={{
        position: 'fixed', bottom: 0, left: 0, right: 0, height: '60%',
        backgroundImage: `url(${levelVolcano})`,
        backgroundSize: 'cover', backgroundPosition: 'center top',
        opacity: 0.2, filter: 'blur(3px)', zIndex: 0,
      }} />

      {/* Lava particles */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 1 }}>
        {[...Array(8)].map((_, i) => (
          <div key={i} style={{
            position: 'absolute', bottom: '-20px',
            left: `${10 + i * 12}%`,
            width: 6, height: 6, borderRadius: '50%',
            background: i % 2 === 0 ? '#F59E0B' : '#EF4444',
            animation: `lavaRise ${3 + i * 0.5}s ease-in-out infinite`,
            animationDelay: `${i * 0.4}s`, opacity: 0.6,
          }} />
        ))}
        <style>{`
          @keyframes lavaRise {
            0% { transform: translateY(0) scale(1); opacity: 0.6; }
            50% { opacity: 0.9; }
            100% { transform: translateY(-100vh) scale(0); opacity: 0; }
          }
        `}</style>
      </div>

      {/* ======== WOOD HEADER ======== */}
      <header className="wood-header" style={{
        padding: '0.75rem 1.5rem',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        position: 'sticky', top: 0, zIndex: 50,
        background: 'linear-gradient(180deg, #4A0E0E 0%, #6B1515 30%, #8B1A1A 70%, #5A0E0E 100%)',
        borderBottom: '4px solid #3B0000',
      }}>
        <Link to="/simulation" className="btn btn-secondary" style={{ fontSize: '0.8rem', padding: '0.4rem 0.8rem' }}>
          🏃 Retreat!
        </Link>
        <div style={{
          fontFamily: 'var(--font-heading)', fontSize: '1.2rem',
          textShadow: '2px 2px 0 rgba(0,0,0,0.5)',
          display: 'flex', alignItems: 'center', gap: '0.5rem',
          color: '#FCD34D',
        }}>
          🌋 Level 3: Volcano Battle
        </div>
        <div style={{
          fontFamily: 'var(--font-fun)', fontWeight: 700, fontSize: '0.9rem',
          color: '#FCA5A5',
        }}>
          ⚔️ Battle {currentStage + 1} / {stages.length}
        </div>
      </header>

      {/* ======== PROGRESS BAR ======== */}
      <div style={{
        width: '100%', height: 8,
        background: '#1a0a2e', position: 'relative', zIndex: 40,
      }}>
        <div style={{
          height: '100%', width: `${progress}%`,
          background: 'linear-gradient(90deg, #EF4444, #F59E0B, #E9C46A)',
          transition: 'width 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
          boxShadow: '0 0 15px rgba(239, 68, 68, 0.6)',
        }} />
      </div>

      {/* ======== THEMATIC IMAGE BANNER ======== */}
      <div style={{
        display: 'flex', justifyContent: 'center', gap: '1rem',
        padding: '1rem 1.5rem 0', position: 'relative', zIndex: 5,
        maxWidth: '52rem', margin: '0 auto',
      }}>
        <img src={understandFractionsImg} alt="Understand Fractions" style={{
          width: '48%', maxHeight: 80, objectFit: 'cover',
          borderRadius: 'var(--radius-lg)',
          border: '3px solid #8B1A1A',
          boxShadow: '0 0 15px rgba(239, 68, 68, 0.3)',
          opacity: 0.85,
        }} />
        <img src={collectCoinsImg} alt="Collect Fraction Coins" style={{
          width: '48%', maxHeight: 80, objectFit: 'cover',
          borderRadius: 'var(--radius-lg)',
          border: '3px solid #8B1A1A',
          boxShadow: '0 0 15px rgba(239, 68, 68, 0.3)',
          opacity: 0.85,
        }} />
      </div>

      {/* ======== MAIN CONTENT ======== */}
      <main style={{
        maxWidth: '52rem', margin: '1rem auto 1.5rem',
        padding: '0 1.5rem', position: 'relative', zIndex: 5,
      }}>
        {/* ======== MONSTER AREA ======== */}
        <div style={{
          background: 'linear-gradient(145deg, rgba(26, 10, 46, 0.9), rgba(45, 27, 105, 0.9))',
          borderRadius: 'var(--radius-xl)', padding: '2rem',
          marginBottom: '1.5rem',
          border: '3px solid #5b2c6f',
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          position: 'relative',
          boxShadow: '0 0 30px rgba(91, 44, 111, 0.4), inset 0 0 20px rgba(0,0,0,0.3)',
          overflow: 'hidden',
        }}>
          {/* Glowing effect behind monster */}
          <div style={{
            position: 'absolute', top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 200, height: 200, borderRadius: '50%',
            background: monsterHp > 0
              ? 'radial-gradient(circle, rgba(239, 68, 68, 0.3), transparent)'
              : 'radial-gradient(circle, rgba(233, 196, 106, 0.3), transparent)',
            animation: 'pulse 2s ease-in-out infinite',
          }} />

          {/* Monster */}
          <div style={{
            fontSize: '5rem', marginBottom: '1rem',
            animation: monsterHp > 0 ? 'monsterIdle 2s ease-in-out infinite' : 'monsterDefeat 1s ease-in forwards',
            filter: monsterHp <= 0 ? 'grayscale(1) opacity(0.4)' : 'none',
            position: 'relative', zIndex: 2,
          }}>
            👾
          </div>

          {/* HP Bar */}
          <div style={{ width: '70%', maxWidth: 300, marginBottom: '0.5rem' }}>
            <div className="hp-bar">
              <div className="hp-bar-fill" style={{ width: `${monsterHp}%` }} />
            </div>
          </div>
          <div style={{
            fontFamily: 'var(--font-fun)',
            color: monsterHp > 50 ? '#FCA5A5' : monsterHp > 0 ? '#F59E0B' : '#9CA3AF',
            fontWeight: 700, fontSize: '0.85rem',
          }}>
            {monsterHp > 0 ? `Fraction Monster — ${monsterHp}% HP` : '💀 DEFEATED'}
          </div>

          <style>{`
            @keyframes monsterIdle {
              0%, 100% { transform: translateY(0) scale(1); }
              50% { transform: translateY(-8px) scale(1.05); }
            }
            @keyframes monsterDefeat {
              0% { transform: scale(1) rotate(0deg); opacity: 1; }
              50% { transform: scale(1.2) rotate(10deg); opacity: 0.5; }
              100% { transform: scale(0.3) rotate(-30deg); opacity: 0; }
            }
          `}</style>
        </div>

        {/* ======== BATTLE CARD ======== */}
        <div style={{
          background: 'linear-gradient(145deg, rgba(243, 229, 192, 0.95), rgba(245, 230, 200, 0.98))',
          border: '4px solid #8B6914',
          borderRadius: 'var(--radius-xl)', padding: '2rem',
          textAlign: 'center', position: 'relative', overflow: 'hidden',
          boxShadow: 'var(--shadow-xl)',
        }}>
          {/* Decorative fire elements */}
          <span style={{ position: 'absolute', top: 8, left: 12, fontSize: '1.2rem', opacity: 0.3, animation: 'float 2s ease-in-out infinite' }}>🔥</span>
          <span style={{ position: 'absolute', top: 8, right: 12, fontSize: '1.2rem', opacity: 0.3, animation: 'float 2.5s ease-in-out infinite' }}>🔥</span>

          <h3 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(1.3rem, 3vw, 1.7rem)',
            color: 'var(--primary-dark)', marginBottom: '1.5rem',
          }}>
            ⚔️ Compare the fractions to deal damage!
          </h3>

          {/* Fraction comparison area */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            gap: 'clamp(1rem, 3vw, 2.5rem)', marginBottom: '2rem', flexWrap: 'wrap',
          }}>
            {/* Left fraction */}
            <div style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
              color: 'var(--ocean-dark)',
              background: 'linear-gradient(145deg, #E0F2FE, #BAE6FD)',
              padding: '1.5rem 2rem', borderRadius: 'var(--radius-xl)',
              border: '4px solid var(--ocean)',
              boxShadow: 'var(--shadow-md), 0 0 15px rgba(33, 158, 188, 0.2)',
              minWidth: 100,
            }}>
              {stage.f1}
            </div>

            {/* Comparison buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {['>', '=', '<'].map((symbol) => (
                <button
                  key={symbol}
                  onClick={() => !feedback && handleAnswer(symbol)}
                  style={{
                    width: 64, height: 64,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: 'var(--font-heading)',
                    fontSize: '2rem', fontWeight: 700,
                    background: 'linear-gradient(145deg, var(--secondary), var(--secondary-dark))',
                    color: 'white',
                    border: '3px solid var(--secondary-dark)',
                    borderRadius: 'var(--radius-lg)',
                    cursor: feedback ? 'default' : 'pointer',
                    boxShadow: 'var(--shadow-md)',
                    transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                    textShadow: '1px 1px 0 rgba(0,0,0,0.2)',
                  }}
                  onMouseEnter={(e) => {
                    if (!feedback) {
                      e.currentTarget.style.transform = 'scale(1.15)';
                      e.currentTarget.style.boxShadow = 'var(--shadow-lg), 0 0 20px rgba(231, 111, 81, 0.4)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!feedback) {
                      e.currentTarget.style.transform = 'scale(1)';
                      e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                    }
                  }}
                >
                  {symbol}
                </button>
              ))}
            </div>

            {/* Right fraction */}
            <div style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
              color: 'var(--purple)',
              background: 'linear-gradient(145deg, #F3E8FF, #DDD6FE)',
              padding: '1.5rem 2rem', borderRadius: 'var(--radius-xl)',
              border: '4px solid var(--purple)',
              boxShadow: 'var(--shadow-md), 0 0 15px rgba(123, 45, 142, 0.2)',
              minWidth: 100,
            }}>
              {stage.f2}
            </div>
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
                background: 'rgba(255,255,255,0.95)',
                padding: '1.5rem 2.5rem', borderRadius: 'var(--radius-xl)',
                boxShadow: 'var(--shadow-xl), 0 0 30px rgba(239, 68, 68, 0.3)',
                border: '4px solid var(--danger)',
              }}>
                <span style={{ fontSize: '3rem' }}>💥</span>
                <div style={{
                  fontFamily: 'var(--font-heading)', fontSize: '2.2rem',
                  background: 'linear-gradient(90deg, #EF4444, #F59E0B)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                }}>
                  CRITICAL HIT!
                </div>
                <div className="badge-coin" style={{ fontSize: '1.1rem' }}>
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
                fontSize: '1.8rem', color: 'white',
                background: 'rgba(185, 28, 28, 0.95)',
                padding: '1rem 2rem', borderRadius: 'var(--radius-xl)',
                border: '3px solid #991B1B',
                boxShadow: 'var(--shadow-lg)',
              }}>
                💨 Missed! The monster dodged!
              </div>
            </div>
          )}

          {/* Victory screen */}
          {monsterHp <= 0 && (
            <div style={{
              position: 'fixed', inset: 0,
              background: 'radial-gradient(circle at center, rgba(26, 10, 46, 0.85), rgba(26, 10, 46, 0.98))',
              zIndex: 100,
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              backdropFilter: 'blur(8px)',
            }}>
              <div className="animate-popIn" style={{
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', gap: '1rem',
                maxWidth: 500, width: '90%',
              }}>
                {/* Mission Complete Image */}
                <img
                  src={missionCompleteImg}
                  alt="Mission Complete!"
                  style={{
                    width: '100%', maxHeight: 300, objectFit: 'cover',
                    borderRadius: 'var(--radius-xl)',
                    border: '4px solid #E9C46A',
                    boxShadow: '0 0 30px rgba(233, 196, 106, 0.4)',
                    marginBottom: '0.5rem',
                  }}
                />
                <h2 style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '3rem',
                  background: 'linear-gradient(90deg, #E9C46A, #F59E0B, #E9C46A)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                  textShadow: 'none',
                }}>
                  🏆 VICTORY!
                </h2>
                <p style={{
                  fontFamily: 'var(--font-fun)',
                  fontSize: '1.3rem', color: 'rgba(255,255,255,0.8)',
                }}>
                  You defeated the Fraction Monster! 🎉
                </p>
                <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                  <div className="badge-coin" style={{ fontSize: '1.2rem', padding: '0.6rem 1.5rem' }}>
                    🪙 +{CONFIG.coinsPerAnswer * CONFIG.questionsPerSession} Total Coins
                  </div>
                  <div className="badge-xp" style={{ fontSize: '1.2rem', padding: '0.6rem 1.5rem' }}>
                    ⭐ +{CONFIG.xpPerAnswer * CONFIG.questionsPerSession} XP
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Hint */}
        <div style={{
          textAlign: 'center', marginTop: '1.5rem',
          fontFamily: 'var(--font-fun)',
          color: 'rgba(255,255,255,0.5)', fontSize: '0.95rem',
        }}>
          💡 <em>{stage.hint || 'Tip: Think about which fraction is a bigger piece of the whole!'}</em>
        </div>
      </main>
    </div>
  );
}

export default Level3;

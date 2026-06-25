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

/* ─── Story beats per battle ─── */
const storyBeats = [
  {
    narrator: "You enter the smoking volcano and come face-to-face with MAGMUS — the Fraction Monster Blackbeard summoned!",
    character: '🌋',
    characterName: 'The Volcano',
    characterSays: "MAGMUS awakes! He was created from dark fraction magic — only the GREATER fraction can hurt him! Choose your weapon carefully!",
  },
  {
    narrator: "Magmus launches a fraction at you! You must counter with the correct comparison symbol.",
    character: '🏴‍☠️',
    characterName: "Blackbeard's Ghost",
    characterSays: "Arrr! Use >, < or = to compare the fractions! The bigger fraction deals the damage! Don't get it backwards, matey!",
  },
  {
    narrator: "The volcano shakes as your spell clashes with Magmus's shield!",
    character: '⚗️',
    characterName: 'Your Spell Book',
    characterSays: "Remember: same denominator? Bigger numerator wins! Same numerator? Smaller denominator wins!",
  },
  {
    narrator: "Magmus roars and summons lava! You must concentrate on the fraction comparison!",
    character: '👾',
    characterName: 'MAGMUS',
    characterSays: "GRRR… You think your fractions can stop ME?! Compare correctly or I'll send you back to the beach!",
  },
  {
    narrator: "Almost there! One final fraction battle stands between you and the legendary treasure!",
    character: '💎',
    characterName: 'The Hidden Treasure',
    characterSays: "I can feel you getting closer… defeat Magmus and claim the reward Blackbeard hid for a true fraction master!",
  },
];

/* ─── Victory / end-of-story modal ─── */
function VictoryModal({ onContinue, t }) {
  return (
    <div style={{
      position: 'fixed', inset: 0,
      background: 'radial-gradient(circle at center, rgba(26, 10, 46, 0.85), rgba(26, 10, 46, 0.98))',
      zIndex: 100,
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      backdropFilter: 'blur(8px)',
    }}>
      {/* Gold particle explosion */}
      {[...Array(20)].map((_, i) => (
        <div key={i} style={{
          position: 'absolute',
          top: `${30 + Math.random() * 40}%`, left: `${10 + Math.random() * 80}%`,
          width: 8, height: 8, borderRadius: '50%',
          background: i % 3 === 0 ? '#E9C46A' : i % 3 === 1 ? '#F59E0B' : '#FCD34D',
          animation: `goldBurst ${1.5 + i * 0.15}s ease-out infinite`,
          animationDelay: `${i * 0.1}s`, opacity: 0.9,
          pointerEvents: 'none',
          boxShadow: '0 0 6px rgba(233,196,106,0.8)',
        }} />
      ))}
      <style>{`
        @keyframes goldBurst {
          0% { transform: translateY(0) scale(1); opacity: 0.9; }
          100% { transform: translateY(-120px) scale(0); opacity: 0; }
        }
        @keyframes victoryEntrance {
          from { transform: scale(0.7) rotate(-5deg); opacity: 0; }
          to { transform: scale(1) rotate(0deg); opacity: 1; }
        }
        @keyframes trophySpin {
          0%, 100% { transform: rotate(-8deg) scale(1); }
          50% { transform: rotate(8deg) scale(1.1); }
        }
      `}</style>

      <div className="animate-popIn" style={{
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', gap: '1rem',
        maxWidth: 540, width: '90%',
        animation: 'victoryEntrance 0.6s cubic-bezier(0.34,1.56,0.64,1) forwards',
      }}>
        {/* Mission Complete Image */}
        <img
          src={missionCompleteImg}
          alt="Mission Complete!"
          style={{
            width: '100%', maxHeight: 280, objectFit: 'cover',
            borderRadius: 'var(--radius-xl)',
            border: '5px solid #E9C46A',
            boxShadow: '0 0 40px rgba(233, 196, 106, 0.6)',
          }}
        />

        <div style={{ animation: 'trophySpin 3s ease-in-out infinite', fontSize: '5rem' }}>🏆</div>

        <h2 style={{
          fontFamily: 'var(--font-heading)',
          fontSize: 'clamp(2rem, 5vw, 3.5rem)',
          background: 'linear-gradient(90deg, #E9C46A, #F59E0B, #E9C46A)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          textShadow: 'none',
          textAlign: 'center',
          marginBottom: 0,
        }}>
          {t("MAGMUS DEFEATED!")}
        </h2>

        <div style={{
          background: 'linear-gradient(145deg, rgba(243,229,192,0.12), rgba(233,196,106,0.08))',
          border: '3px solid rgba(233,196,106,0.4)',
          borderRadius: 16,
          padding: '1.5rem',
          textAlign: 'center',
          maxWidth: 480,
        }}>
          <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🏴‍☠️</div>
          <p style={{
            fontFamily: 'var(--font-fun)',
            fontSize: '1.05rem', color: 'rgba(255,255,255,0.9)',
            lineHeight: 1.7, fontStyle: 'italic',
          }}>
            {t("\"HA-HAAR! Incredible, young explorer! You've defeated my guardian and solved every fraction mystery on the island! The treasure is YOURS — and with it, the title of Fraction Master of the Seven Seas! Blackbeard is proud of ye!\"")}
          </p>
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: '0.9rem', color: '#E9C46A', marginTop: '0.5rem' }}>
            — {t("Captain Blackbeard's Ghost")}
          </div>
        </div>

        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <div className="badge-coin" style={{ fontSize: '1.2rem', padding: '0.6rem 1.5rem' }}>
            🪙 +{CONFIG.coinsPerAnswer * CONFIG.questionsPerSession} {t("Total Coins")}
          </div>
          <div className="badge-xp" style={{ fontSize: '1.2rem', padding: '0.6rem 1.5rem' }}>
            ⭐ +{CONFIG.xpPerAnswer * CONFIG.questionsPerSession} XP
          </div>
        </div>

        <p style={{
          fontFamily: 'var(--font-fun)', color: 'rgba(255,255,255,0.5)',
          fontSize: '0.85rem', textAlign: 'center',
        }}>
          {t("Returning to the island map in a moment…")}
        </p>
      </div>
    </div>
  );
}

function Level3() {
  const { addCoins, addXp, t } = useGame();
  const navigate = useNavigate();
  const [currentStage, setCurrentStage] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [monsterHp, setMonsterHp] = useState(100);
  const [showIntro, setShowIntro] = useState(true);
  const [showVictory, setShowVictory] = useState(false);

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
          setTimeout(() => {
            setShowVictory(true);
            setTimeout(() => navigate('/simulation'), 8000);
          }, 1000);
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

        {/* Lava particles */}
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 1 }}>
          {[...Array(8)].map((_, i) => (
            <div key={i} style={{
              position: 'absolute', bottom: '-20px',
              left: `${15 + i * 10}%`,
              width: 7, height: 7, borderRadius: '50%',
              background: i % 2 === 0 ? '#F59E0B' : '#EF4444',
              animation: `lavaRise ${3 + i * 0.5}s ease-in-out infinite`,
              animationDelay: `${i * 0.4}s`, opacity: 0.7,
            }} />
          ))}
          <style>{`
            @keyframes lavaRise {
              0% { transform: translateY(0) scale(1); opacity: 0.7; }
              50% { opacity: 1; }
              100% { transform: translateY(-100vh) scale(0); opacity: 0; }
            }
          `}</style>
        </div>

        <div className="animate-popIn" style={{
          position: 'relative', zIndex: 5,
          maxWidth: 620, width: '90%',
          background: 'linear-gradient(145deg, rgba(243, 229, 192, 0.97), rgba(245, 230, 200, 0.99))',
          border: '5px solid #8B6914',
          borderRadius: 'var(--radius-xl)',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.6)',
          overflow: 'hidden',
        }}>
          <img
            src={understandFractionsImg}
            alt="The Volcano Battle"
            style={{ width: '100%', maxHeight: 220, objectFit: 'cover', display: 'block' }}
          />

          <div style={{ padding: '2rem', textAlign: 'center' }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
              background: 'linear-gradient(145deg, #991B1B, #7F1D1D)',
              color: '#FCA5A5', borderRadius: 'var(--radius-full)',
              padding: '0.3rem 1rem', fontSize: '0.8rem',
              fontFamily: 'var(--font-fun)', fontWeight: 700,
              letterSpacing: '0.05em', textTransform: 'uppercase',
              marginBottom: '1rem',
            }}>
              {t("Chapter 3 of 3 — Final Battle")}
            </div>

            <h2 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(1.6rem, 4vw, 2.3rem)',
              color: 'var(--primary-dark)',
              marginBottom: '0.25rem',
            }}>
              {t("🌋 Volcano Battle")}
            </h2>
            <h3 style={{
              fontFamily: 'var(--font-fun)',
              fontSize: '1rem',
              color: '#DC2626',
              fontWeight: 700,
              marginBottom: '1.25rem',
            }}>
              {t("Defeat MAGMUS — The Fraction Monster!")}
            </h3>

            <div style={{
              background: 'rgba(255,255,255,0.6)',
              border: '2px solid #EF4444',
              borderRadius: 12,
              padding: '1.25rem',
              marginBottom: '1.25rem',
              textAlign: 'left',
            }}>
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                <span style={{ fontSize: '2.5rem', flexShrink: 0 }}>🏴‍☠️</span>
                <div>
                  <div style={{ fontFamily: 'var(--font-heading)', fontSize: '0.85rem', color: '#DC2626', marginBottom: '0.3rem' }}>
                    {t("Captain Blackbeard's Ghost")}
                  </div>
                  <p style={{
                    fontFamily: 'var(--font-fun)', fontSize: '0.95rem',
                    color: 'var(--text-parchment)', lineHeight: 1.6,
                    fontStyle: 'italic',
                  }}>
                    {t("\"You've made it to me volcano hideout! But to reach the treasure, ye must defeat MAGMUS — the Fraction Monster I summoned using dark math magic! Compare the two fractions with >, < or = to deal damage. Get it right and the monster weakens! Get it wrong and Magmus dodges. Now FIGHT!\"")}
                  </p>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
              <div className="badge-coin" style={{ fontSize: '0.9rem' }}>🪙 {CONFIG.coinsPerAnswer} {t("coins per hit")}</div>
              <div className="badge-xp" style={{ fontSize: '0.9rem' }}>⭐ {CONFIG.xpPerAnswer} {t("XP per hit")}</div>
              <div style={{
                background: 'rgba(239,68,68,0.12)', border: '2px solid #EF4444',
                borderRadius: 'var(--radius-full)', padding: '0.3rem 0.8rem',
                fontFamily: 'var(--font-fun)', fontWeight: 700, fontSize: '0.9rem',
                color: '#991B1B',
              }}>
                ⚔️ {CONFIG.questionsPerSession} {t("battle rounds")}
              </div>
            </div>

            <button
              className="btn btn-primary"
              onClick={() => setShowIntro(false)}
              style={{
                fontSize: '1.15rem', padding: '1rem 3rem',
                background: 'linear-gradient(145deg, #EF4444, #B91C1C)',
                border: '3px solid #991B1B',
              }}
            >
              {t("⚔️ Face MAGMUS!")}
            </button>
          </div>
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
      {/* Victory modal */}
      {showVictory && <VictoryModal onContinue={() => navigate('/simulation')} t={t} />}

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

      {/* ======== HEADER ======== */}
      <header className="wood-header" style={{
        padding: '0.75rem 1.5rem',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        position: 'sticky', top: 0, zIndex: 50,
        background: 'linear-gradient(180deg, #4A0E0E 0%, #6B1515 30%, #8B1A1A 70%, #5A0E0E 100%)',
        borderBottom: '4px solid #3B0000',
      }}>
        <Link to="/simulation" className="btn btn-secondary" style={{ fontSize: '0.8rem', padding: '0.4rem 0.8rem' }}>
          {t("🏃 Retreat!")}
        </Link>
        <div style={{
          fontFamily: 'var(--font-heading)', fontSize: '1.1rem',
          textShadow: '2px 2px 0 rgba(0,0,0,0.5)',
          display: 'flex', alignItems: 'center', gap: '0.5rem',
          color: '#FCD34D',
        }}>
          {t("🌋 Volcano Battle — vs MAGMUS")}
        </div>
        <div style={{ fontFamily: 'var(--font-fun)', fontWeight: 700, fontSize: '0.9rem', color: '#FCA5A5' }}>
          {t("⚔️ Round")} {currentStage + 1} / {stages.length}
        </div>
      </header>

      {/* ======== PROGRESS BAR ======== */}
      <div style={{ width: '100%', height: 8, background: '#1a0a2e', position: 'relative', zIndex: 40 }}>
        <div style={{
          height: '100%', width: `${progress}%`,
          background: 'linear-gradient(90deg, #EF4444, #F59E0B, #E9C46A)',
          transition: 'width 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
          boxShadow: '0 0 15px rgba(239, 68, 68, 0.6)',
        }} />
      </div>

      <main style={{
        maxWidth: '56rem', margin: '1rem auto 1.5rem',
        padding: '0 1.5rem', position: 'relative', zIndex: 5,
      }}>

        {/* ── STORY NARRATOR BOX ── */}
        <div style={{
          background: 'linear-gradient(145deg, rgba(74,14,14,0.92), rgba(40,5,5,0.96))',
          border: '3px solid #EF4444',
          borderRadius: 'var(--radius-xl)',
          padding: '1.25rem 1.5rem',
          marginBottom: '1rem',
          display: 'flex', alignItems: 'flex-start', gap: '1rem',
          boxShadow: '0 4px 20px rgba(239,68,68,0.25)',
        }}>
          <span style={{ fontSize: '2.8rem', flexShrink: 0 }}>{beat.character}</span>
          <div style={{ flex: 1 }}>
            <div style={{
              fontFamily: 'var(--font-heading)', fontSize: '0.8rem',
              color: '#FCA5A5', marginBottom: '0.4rem',
              letterSpacing: '0.05em', textTransform: 'uppercase',
            }}>
              {t(beat.characterName)} {t("says:")}
            </div>
            <p style={{
              fontFamily: 'var(--font-fun)', fontSize: '0.95rem',
              color: 'rgba(255,255,255,0.88)', lineHeight: 1.6,
              fontStyle: 'italic', margin: 0,
            }}>
              "{t(beat.characterSays)}"
            </p>
            <div style={{
              marginTop: '0.5rem', fontSize: '0.82rem',
              color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-fun)',
            }}>
              📖 {t(beat.narrator)}
            </div>
          </div>
        </div>

        {/* ── MONSTER AREA ── */}
        <div style={{
          background: 'linear-gradient(145deg, rgba(26, 10, 46, 0.9), rgba(45, 27, 105, 0.9))',
          borderRadius: 'var(--radius-xl)', padding: '1.5rem',
          marginBottom: '1rem',
          border: '3px solid #5b2c6f',
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          position: 'relative',
          boxShadow: '0 0 30px rgba(91, 44, 111, 0.4), inset 0 0 20px rgba(0,0,0,0.3)',
          overflow: 'hidden',
        }}>
          {/* Glow */}
          <div style={{
            position: 'absolute', top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 180, height: 180, borderRadius: '50%',
            background: monsterHp > 0
              ? 'radial-gradient(circle, rgba(239, 68, 68, 0.25), transparent)'
              : 'radial-gradient(circle, rgba(233, 196, 106, 0.25), transparent)',
            animation: 'pulse 2s ease-in-out infinite',
          }} />

          {/* Monster */}
          <div style={{
            fontSize: '4.5rem', marginBottom: '0.75rem',
            animation: monsterHp > 0 ? 'monsterIdle 2s ease-in-out infinite' : 'monsterDefeat 1s ease-in forwards',
            filter: monsterHp <= 0 ? 'grayscale(1) opacity(0.4)' : 'none',
            position: 'relative', zIndex: 2,
          }}>
            👾
          </div>

          {/* Name */}
          <div style={{
            fontFamily: 'var(--font-heading)', color: '#FCA5A5',
            fontSize: '1rem', letterSpacing: '0.1em',
            marginBottom: '0.5rem', textShadow: '0 0 10px rgba(239,68,68,0.5)',
          }}>
            {t("MAGMUS — Fraction Monster")}
          </div>

          {/* HP Bar */}
          <div style={{ width: '65%', maxWidth: 280, marginBottom: '0.4rem' }}>
            <div className="hp-bar">
              <div className="hp-bar-fill" style={{ width: `${monsterHp}%` }} />
            </div>
          </div>
          <div style={{
            fontFamily: 'var(--font-fun)',
            color: monsterHp > 50 ? '#FCA5A5' : monsterHp > 0 ? '#F59E0B' : '#9CA3AF',
            fontWeight: 700, fontSize: '0.85rem',
          }}>
            {monsterHp > 0 ? `${t("HP:")} ${monsterHp}%` : `💀 ${t("DEFEATED!")}`}
          </div>
        </div>

        {/* ── BATTLE CARD ── */}
        <div style={{
          background: 'linear-gradient(145deg, rgba(243, 229, 192, 0.96), rgba(245, 230, 200, 0.98))',
          border: '4px solid #8B6914',
          borderRadius: 'var(--radius-xl)', padding: '1.75rem',
          textAlign: 'center', position: 'relative', overflow: 'hidden',
          boxShadow: 'var(--shadow-xl)',
        }}>
          <span style={{ position: 'absolute', top: 8, left: 12, fontSize: '1.2rem', opacity: 0.3, animation: 'float 2s ease-in-out infinite' }}>🔥</span>
          <span style={{ position: 'absolute', top: 8, right: 12, fontSize: '1.2rem', opacity: 0.3, animation: 'float 2.5s ease-in-out infinite' }}>🔥</span>

          {/* Round badge */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.3rem',
            background: 'linear-gradient(145deg, #991B1B, #7F1D1D)',
            color: '#FCA5A5', padding: '0.25rem 0.75rem',
            borderRadius: 'var(--radius-full)', fontSize: '0.75rem',
            fontFamily: 'var(--font-fun)', fontWeight: 700,
            marginBottom: '0.75rem',
          }}>
            {t("⚔️ Battle Round")} {currentStage + 1}
          </div>

          <h3 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)',
            color: 'var(--primary-dark)', marginBottom: '1.25rem',
            lineHeight: 1.4,
          }}>
            {t("Choose the correct symbol to deal damage to MAGMUS!")}
          </h3>

          {/* Fraction comparison */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            gap: 'clamp(1rem, 3vw, 2rem)', marginBottom: '1.5rem', flexWrap: 'wrap',
          }}>
            {/* Left fraction */}
            <div style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(2.2rem, 5vw, 3.2rem)',
              color: 'var(--ocean-dark)',
              background: 'linear-gradient(145deg, #E0F2FE, #BAE6FD)',
              padding: '1.25rem 1.75rem', borderRadius: 'var(--radius-xl)',
              border: '4px solid var(--ocean)',
              boxShadow: 'var(--shadow-md), 0 0 15px rgba(33, 158, 188, 0.2)',
              minWidth: 90,
            }}>
              {stage.f1}
            </div>

            {/* Symbol buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {['>', '=', '<'].map((symbol) => (
                <button
                  key={symbol}
                  onClick={() => !feedback && handleAnswer(symbol)}
                  style={{
                    width: 60, height: 60,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.8rem', fontWeight: 700,
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
              fontSize: 'clamp(2.2rem, 5vw, 3.2rem)',
              color: 'var(--purple)',
              background: 'linear-gradient(145deg, #F3E8FF, #DDD6FE)',
              padding: '1.25rem 1.75rem', borderRadius: 'var(--radius-xl)',
              border: '4px solid var(--purple)',
              boxShadow: 'var(--shadow-md), 0 0 15px rgba(123, 45, 142, 0.2)',
              minWidth: 90,
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
                  fontFamily: 'var(--font-heading)', fontSize: '2rem',
                  background: 'linear-gradient(90deg, #EF4444, #F59E0B)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                }}>
                  {t("CRITICAL HIT!")}
                </div>
                <div style={{ fontFamily: 'var(--font-fun)', fontSize: '0.9rem', color: '#6B7280', fontStyle: 'italic' }}>
                  {t(stage.hint)}
                </div>
                <div className="badge-coin" style={{ fontSize: '1rem' }}>
                  🪙 +{CONFIG.coinsPerAnswer} {t("Coins!")}
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
                fontSize: '1.7rem', color: 'white',
                background: 'rgba(185, 28, 28, 0.95)',
                padding: '1rem 2rem', borderRadius: 'var(--radius-xl)',
                border: '3px solid #991B1B',
                boxShadow: 'var(--shadow-lg)',
                textAlign: 'center',
              }}>
                {t("💨 Magmus Dodged!")}
                <div style={{ fontSize: '0.9rem', marginTop: '0.3rem', color: 'rgba(255,255,255,0.7)' }}>
                  {t("Try a different symbol!")}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Hint */}
        <div style={{
          textAlign: 'center', marginTop: '1rem',
          fontFamily: 'var(--font-fun)',
          color: 'rgba(255,255,255,0.45)', fontSize: '0.9rem',
        }}>
          💡 <em>{t(stage.hint || "Tip: Think about which fraction represents a bigger piece of the whole!")}</em>
        </div>
      </main>
    </div>
  );
}

export default Level3;

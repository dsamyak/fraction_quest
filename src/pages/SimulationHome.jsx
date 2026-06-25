import React from 'react';
import { Link } from 'react-router-dom';
import { useGame } from '../context/GameContext';
import treasureMap from '../assets/treasure-map.png';
import levelBeach from '../assets/level-beach.png';
import levelBridge from '../assets/level-bridge.png';
import levelVolcano from '../assets/level-volcano.png';
import intelliaLogo from '../assets/intellia-logo.jpeg';

function SimulationHome() {
  const { coins, xp, unlockedLevels, rank, t } = useGame();

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--bg-sky)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Subtle treasure map watermark */}
      <div style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '90%',
        maxWidth: 700,
        opacity: 0.04,
        zIndex: 0,
        pointerEvents: 'none',
      }}>
        <img src={treasureMap} alt="" style={{ width: '100%' }} />
      </div>

      {/* ======== WOOD HEADER ======== */}
      <header className="wood-header" style={{
        padding: '1rem 1.5rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'sticky',
        top: 0,
        zIndex: 50,
      }}>
        <Link to="/" className="btn btn-secondary" style={{ fontSize: '0.85rem', padding: '0.5rem 1rem' }}>
          ⬅ {t("Back to Harbor")}
        </Link>

        <div style={{
          fontFamily: 'var(--font-heading)',
          fontSize: 'clamp(1rem, 2.5vw, 1.4rem)',
          textShadow: '2px 2px 0 rgba(0,0,0,0.3)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
        }}>
          <img src={intelliaLogo} alt="Intellia 360" style={{
            height: 32, width: 32, borderRadius: '50%', objectFit: 'cover',
            border: '2px solid rgba(255,255,255,0.5)',
            boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
          }} />
          🏝️ {t("Fraction Island Quest")}
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <div className="badge-coin">
            <span className="animate-coin-spin">🪙</span> {coins}
          </div>
          <div className="badge-xp">
            ⭐ {xp} {t("XP!")}
          </div>
        </div>
      </header>

      {/* ======== RANK BANNER ======== */}
      <div style={{
        textAlign: 'center',
        padding: '1.5rem',
        background: 'linear-gradient(145deg, rgba(243, 229, 192, 0.85), rgba(245, 230, 200, 0.9))',
        borderBottom: '3px solid #B8860B',
        position: 'relative',
        zIndex: 5,
      }}>
        <div style={{
          fontFamily: 'var(--font-heading)',
          fontSize: '2.5rem',
          color: 'var(--primary-dark)',
          marginBottom: '0.25rem',
          textShadow: '2px 2px 0 rgba(45, 106, 79, 0.1)',
        }}>
          🗺️ {t("Choose Your Path, Explorer!")}
        </div>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          background: 'linear-gradient(145deg, var(--primary), var(--primary-dark))',
          padding: '0.4rem 1.2rem',
          borderRadius: 'var(--radius-full)',
          color: 'white',
          fontFamily: 'var(--font-fun)',
          fontWeight: 700,
          fontSize: '0.9rem',
          boxShadow: 'var(--shadow-sm)',
        }}>
          🎖️ {t("Rank:")} {rank}
        </div>
      </div>

      {/* ======== LEVEL CARDS ======== */}
      <main style={{
        maxWidth: '72rem',
        margin: '2rem auto',
        padding: '0 1.5rem 6rem',
        position: 'relative',
        zIndex: 5,
      }}>
        {/* Dotted trail connecting levels */}
        <div style={{
          position: 'absolute',
          top: '5rem',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 4,
          height: 'calc(100% - 10rem)',
          backgroundImage: 'repeating-linear-gradient(180deg, #B8860B 0, #B8860B 8px, transparent 8px, transparent 16px)',
          zIndex: 0,
          display: 'none', /* visible only on large screens vertically */
        }} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3" style={{ gap: '2rem' }}>
          <LevelCard
            title={t("Level 1: Beach Landing")}
            desc={t("Match fractions to pictures on the sandy shores. Start your adventure here!")}
            icon="🏖️"
            image={levelBeach}
            path="/simulation/level1"
            status={unlockedLevels.includes('level1') ? 'unlocked' : 'locked'}
            reward={t("10 coins per answer")}
            difficulty={t("Easy")}
            diffColor="var(--success)"
            t={t}
          />
          <LevelCard
            title={t("Level 2: Bridge Builder")}
            desc={t("Find equivalent fractions to build bridges across the jungle river!")}
            icon="🌉"
            image={levelBridge}
            path="/simulation/level2"
            status={unlockedLevels.includes('level2') ? 'unlocked' : 'locked'}
            reward={t("15 coins per answer")}
            difficulty={t("Medium")}
            diffColor="var(--accent)"
            t={t}
          />
          <LevelCard
            title={t("Level 3: Volcano Battle")}
            desc={t("Compare fractions to defeat the mighty Fraction Monster at the volcano!")}
            icon="🌋"
            image={levelVolcano}
            path="/simulation/level3"
            status={unlockedLevels.includes('level3') ? 'unlocked' : 'locked'}
            reward={t("20 coins per answer")}
            difficulty={t("Hard")}
            diffColor="var(--danger)"
            t={t}
          />
        </div>
      </main>

      {/* ======== FOOTER ======== */}
      <footer style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        width: '100%',
        padding: '0.5rem 1rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem',
        fontSize: '0.8rem',
        fontFamily: 'var(--font-fun)',
        color: 'rgba(27, 67, 50, 0.65)',
        background: 'linear-gradient(180deg, rgba(224, 242, 254, 0), rgba(224, 242, 254, 0.97) 30%)',
        backdropFilter: 'blur(8px)',
        zIndex: 40,
      }}>
        <img src={intelliaLogo} alt="Intellia 360" style={{ height: 24, width: 24, borderRadius: '50%', objectFit: 'cover', border: '1.5px solid #B8860B' }} />
        <span>⛵ {t("Powered by")} <strong>{t("Intellia 360")}</strong> – "{t("Every Fraction Unlocks a New Treasure!")}" 🏴‍☠️</span>
      </footer>
    </div>
  );
}

function LevelCard({ title, desc, icon, image, path, status, reward, difficulty, diffColor, t }) {
  const isLocked = status === 'locked';

  return (
    <div
      className="card-adventure"
      style={{
        transition: 'all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
        opacity: isLocked ? 0.6 : 1,
        filter: isLocked ? 'grayscale(0.8)' : 'none',
        cursor: isLocked ? 'not-allowed' : 'default',
      }}
      onMouseEnter={(e) => {
        if (!isLocked) {
          e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
          e.currentTarget.style.boxShadow = 'var(--shadow-xl), 0 0 20px rgba(233, 196, 106, 0.2)';
        }
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0) scale(1)';
        e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
      }}
    >
      {/* Level image */}
      <div style={{
        height: 160,
        overflow: 'hidden',
        borderRadius: 'var(--radius-xl) var(--radius-xl) 0 0',
        position: 'relative',
      }}>
        <img
          src={image}
          alt={title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
        {/* Difficulty badge */}
        <div style={{
          position: 'absolute',
          top: 12,
          right: 12,
          background: diffColor,
          color: 'white',
          padding: '0.25rem 0.75rem',
          borderRadius: 'var(--radius-full)',
          fontSize: '0.75rem',
          fontFamily: 'var(--font-fun)',
          fontWeight: 700,
          boxShadow: 'var(--shadow-sm)',
        }}>
          {difficulty}
        </div>
        {/* Icon overlay */}
        <div style={{
          position: 'absolute',
          bottom: -20,
          left: 20,
          fontSize: '2.5rem',
          background: 'var(--bg-parchment)',
          borderRadius: 'var(--radius-full)',
          width: 52,
          height: 52,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '3px solid #B8860B',
          boxShadow: 'var(--shadow-md)',
        }}>
          {icon}
        </div>

        {/* Lock overlay */}
        {isLocked && (
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backdropFilter: 'blur(2px)',
          }}>
            <span style={{ fontSize: '3rem' }}>🔒</span>
          </div>
        )}
      </div>

      {/* Card content */}
      <div style={{ padding: '2rem 1.5rem 1.5rem' }}>
        <h3 style={{
          fontFamily: 'var(--font-heading)',
          fontSize: '1.35rem',
          color: 'var(--primary-dark)',
          marginBottom: '0.5rem',
        }}>
          {title}
        </h3>
        <p style={{
          color: 'var(--text-parchment)',
          fontSize: '0.95rem',
          lineHeight: 1.5,
          marginBottom: '1rem',
          minHeight: '3rem',
        }}>
          {desc}
        </p>

        {/* Reward info */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.35rem',
          marginBottom: '1.25rem',
          fontSize: '0.85rem',
          color: 'var(--accent-dark)',
          fontFamily: 'var(--font-fun)',
          fontWeight: 600,
        }}>
          🪙 {reward}
        </div>

        {isLocked ? (
          <button
            disabled
            style={{
              width: '100%',
              padding: '0.85rem',
              borderRadius: 'var(--radius-lg)',
              fontFamily: 'var(--font-fun)',
              fontWeight: 700,
              fontSize: '1rem',
              background: '#D1D5DB',
              color: '#9CA3AF',
              border: '3px solid #B0B5BF',
              cursor: 'not-allowed',
            }}
          >
            🔒 {t("Complete Previous Level")}
          </button>
        ) : (
          <Link
            to={path}
            className="btn btn-accent animate-treasure-glow"
            style={{
              display: 'block',
              width: '100%',
              textAlign: 'center',
              fontSize: '1.05rem',
              padding: '0.85rem',
            }}
          >
            ⚔️ {t("Start Adventure!")}
          </Link>
        )}
      </div>
    </div>
  );
}

export default SimulationHome;

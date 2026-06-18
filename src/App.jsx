import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import SimulationHome from './pages/SimulationHome';
import WorksheetHome from './pages/WorksheetHome';
import Level1 from './pages/Level1';
import Level2 from './pages/Level2';
import Level3 from './pages/Level3';
import { GameProvider } from './context/GameContext';
import islandBg from './assets/island-hero-bg.png';
import fractionIslandCover from './assets/fraction-island-cover.jpeg';
import treasureMap from './assets/treasure-map.png';

function App() {
  return (
    <BrowserRouter>
      <GameProvider>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/simulation" element={<SimulationHome />} />
          <Route path="/simulation/level1" element={<Level1 />} />
          <Route path="/simulation/level2" element={<Level2 />} />
          <Route path="/simulation/level3" element={<Level3 />} />
          <Route path="/worksheet" element={<WorksheetHome />} />
        </Routes>
      </GameProvider>
    </BrowserRouter>
  );
}

/* ============================
   Animated floating clouds
   ============================ */
function FloatingClouds() {
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 1 }}>
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            top: `${8 + i * 12}%`,
            left: `${-20 + i * 15}%`,
            fontSize: `${2.5 + i * 0.4}rem`,
            opacity: 0.6 - i * 0.08,
            animation: `floatCloud ${18 + i * 5}s linear infinite`,
            animationDelay: `${i * 3}s`,
          }}
        >
          ☁️
        </div>
      ))}
      <style>{`
        @keyframes floatCloud {
          0% { transform: translateX(-100px); }
          100% { transform: translateX(calc(100vw + 200px)); }
        }
      `}</style>
    </div>
  );
}

/* ============================
   Animated sparkle particles
   ============================ */
function SparkleParticles() {
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 2 }}>
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            top: `${Math.random() * 80 + 10}%`,
            left: `${Math.random() * 90 + 5}%`,
            fontSize: `${0.6 + Math.random() * 0.6}rem`,
            animation: `sparkle ${2 + Math.random() * 2}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 3}s`,
          }}
        >
          ✨
        </div>
      ))}
    </div>
  );
}

/* ============================
   Scroll indicator compass
   ============================ */
function ScrollCompass() {
  return (
    <div
      style={{
        position: 'absolute',
        bottom: 30,
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 4,
        animation: 'float 3s ease-in-out infinite',
        cursor: 'pointer',
      }}
      onClick={() => document.getElementById('adventure-section')?.scrollIntoView({ behavior: 'smooth' })}
    >
      <span style={{ fontSize: '2rem' }}>🧭</span>
      <span style={{
        fontFamily: 'var(--font-fun)',
        fontSize: '0.8rem',
        color: 'var(--primary-dark)',
        fontWeight: 700,
        textShadow: '0 1px 0 rgba(255,255,255,0.8)',
      }}>
        Explore More
      </span>
      <span style={{
        fontSize: '1.2rem',
        animation: 'bounce 1s infinite',
      }}>
        ▼
      </span>
    </div>
  );
}

/* ============================
   LANDING PAGE
   ============================ */
function Landing() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <div style={{ minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>

      {/* ======== HERO SECTION ======== */}
      <section
        style={{
          minHeight: '100vh',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem',
          background: 'var(--bg-sky)',
          overflow: 'hidden',
        }}
      >
        {/* Background island image */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '65%',
            backgroundImage: `url(${islandBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center top',
            opacity: 0.35,
            filter: 'blur(2px)',
            zIndex: 0,
          }}
        />

        <FloatingClouds />
        <SparkleParticles />

        {/* Main title card */}
        <div
          className={loaded ? 'animate-popIn' : ''}
          style={{
            position: 'relative',
            zIndex: 5,
            textAlign: 'center',
            maxWidth: 700,
            padding: '3rem 3rem 2.5rem',
            background: 'linear-gradient(145deg, rgba(243, 229, 192, 0.95), rgba(245, 230, 200, 0.98))',
            border: '5px solid #8B6914',
            borderRadius: 'var(--radius-xl)',
            boxShadow: '0 20px 50px rgba(27, 67, 50, 0.3), inset 0 0 40px rgba(139, 105, 20, 0.06)',
          }}
        >
          {/* Decorative corner ropes */}
          <span style={{ position: 'absolute', top: -12, left: -12, fontSize: '1.5rem' }}>⚓</span>
          <span style={{ position: 'absolute', top: -12, right: -12, fontSize: '1.5rem' }}>🧭</span>

          {/* Title banner */}
          <div style={{
            background: 'linear-gradient(145deg, var(--secondary), var(--secondary-dark))',
            padding: '0.6rem 2rem',
            borderRadius: 'var(--radius-full)',
            display: 'inline-block',
            marginBottom: '1rem',
            boxShadow: 'var(--shadow-md)',
          }}>
            <span style={{
              fontFamily: 'var(--font-fun)',
              fontSize: '0.95rem',
              color: 'white',
              fontWeight: 700,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
            }}>
              ⭐ Math Adventures ⭐
            </span>
          </div>

          <h1
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(2.5rem, 6vw, 4rem)',
              color: 'var(--primary-dark)',
              marginBottom: '0.5rem',
              lineHeight: 1.1,
              textShadow: '2px 2px 0 rgba(45, 106, 79, 0.15)',
            }}
          >
            The Adventures on<br />
            <span style={{
              color: 'var(--secondary)',
              fontSize: '1.2em',
              textShadow: '3px 3px 0 rgba(231, 111, 81, 0.2)',
            }}>
              Fraction Island!
            </span>
          </h1>

          <p
            style={{
              fontFamily: 'var(--font-fun)',
              fontSize: '1.15rem',
              color: 'var(--text-parchment)',
              margin: '1rem 0 2rem',
              lineHeight: 1.6,
            }}
          >
            Explore • Learn • Have Fun! 🌴<br />
            Solve clues, collect fraction coins, and find the legendary treasure!
          </p>

          {/* Cover image */}
          <img
            src={fractionIslandCover}
            alt="Fraction Island Cover"
            style={{
              width: '85%',
              maxWidth: 420,
              margin: '0 auto 1.5rem',
              display: 'block',
              filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.15))',
              borderRadius: 'var(--radius-lg)',
              border: '3px solid #B8860B'
            }}
          />

          {/* CTA buttons */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
              <Link to="/simulation" className="btn btn-primary" style={{ fontSize: '1.2rem', padding: '1rem 2.5rem' }}>
                🎮 Play Simulation
              </Link>
              <Link to="/worksheet" className="btn btn-treasure" style={{ fontSize: '1.2rem', padding: '1rem 2.5rem' }}>
                🗺️ Printable Worksheet
              </Link>
            </div>
          </div>
        </div>

        <ScrollCompass />
      </section>

      {/* ======== ADVENTURE FEATURES SECTION ======== */}
      <section
        id="adventure-section"
        style={{
          position: 'relative',
          padding: '5rem 2rem 4rem',
          background: 'linear-gradient(180deg, #E0F2FE 0%, #B5E3F5 30%, #8ECAE6 100%)',
          zIndex: 5,
        }}
      >
        {/* Treasure map background */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '80%',
          maxWidth: 600,
          opacity: 0.08,
          zIndex: 0,
        }}>
          <img src={treasureMap} alt="" style={{ width: '100%' }} />
        </div>

        <div style={{ position: 'relative', zIndex: 2, maxWidth: 1000, margin: '0 auto' }}>
          <h2 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(2rem, 4vw, 2.8rem)',
            textAlign: 'center',
            color: 'var(--ocean-dark)',
            marginBottom: '3rem',
          }}>
            🏝️ Your Fraction Island Adventure
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2rem',
          }}>
            <FeatureCard
              emoji="🗺️"
              title="Explore the Island"
              desc="Navigate through beaches, bridges, and mountains solving fraction challenges along the way!"
              color="var(--primary)"
            />
            <FeatureCard
              emoji="🪙"
              title="Collect Fraction Coins"
              desc="Earn gold coins for every correct answer. Build your treasure collection to become a Fraction Master!"
              color="var(--accent-dark)"
            />
            <FeatureCard
              emoji="👾"
              title="Meet Fraction Monsters"
              desc="Make friends with colorful monsters who love math! They'll help you on your quest!"
              color="var(--purple)"
            />
          </div>
        </div>
      </section>

      {/* ======== FOOTER ======== */}
      <footer
        style={{
          background: 'linear-gradient(180deg, #023047, #01141F)',
          color: 'rgba(255,255,255,0.7)',
          textAlign: 'center',
          padding: '2rem',
          fontFamily: 'var(--font-fun)',
          fontSize: '0.9rem',
          position: 'relative',
          zIndex: 5,
        }}
      >
        <div style={{ marginBottom: '0.5rem', fontSize: '1.5rem' }}>🏴‍☠️ ⛵ 🌊</div>
        Powered by <strong style={{ color: 'var(--treasure)' }}>Intellia 360</strong> – Learn Through Adventure
        <div style={{ marginTop: '0.5rem', fontSize: '0.8rem', opacity: 0.5 }}>
          "Every Fraction Unlocks a New Treasure!"
        </div>
      </footer>
    </div>
  );
}

/* ============================
   Feature Card Component
   ============================ */
function FeatureCard({ emoji, title, desc, color }) {
  return (
    <div
      className="card-parchment"
      style={{
        padding: '2rem',
        textAlign: 'center',
        transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
        cursor: 'default',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-8px) rotate(-1deg)';
        e.currentTarget.style.boxShadow = 'var(--shadow-xl)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0) rotate(0deg)';
        e.currentTarget.style.boxShadow = 'var(--shadow-md)';
      }}
    >
      <div style={{
        fontSize: '3.5rem',
        marginBottom: '1rem',
        animation: 'float 3s ease-in-out infinite',
      }}>
        {emoji}
      </div>
      <h3 style={{
        fontFamily: 'var(--font-heading)',
        fontSize: '1.5rem',
        color: color,
        marginBottom: '0.75rem',
      }}>
        {title}
      </h3>
      <p style={{
        fontFamily: 'var(--font-body)',
        color: 'var(--text-parchment)',
        lineHeight: 1.6,
        fontSize: '1rem',
      }}>
        {desc}
      </p>
    </div>
  );
}

export default App;

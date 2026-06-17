import React from 'react';
import { Link } from 'react-router-dom';

function WorksheetHome() {
  return (
    <div style={{ background: '#F5F0E1', minHeight: '100vh' }}>
      {/* UI Controls (Hidden on Print) */}
      <div className="no-print wood-header" style={{
        padding: '0.75rem 1.5rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'sticky',
        top: 0,
        zIndex: 50,
      }}>
        <Link to="/" className="btn btn-secondary" style={{ fontSize: '0.8rem', padding: '0.4rem 0.8rem' }}>
          🏝️ Back to Harbor
        </Link>
        <div style={{
          fontFamily: 'var(--font-heading)',
          fontSize: '1.2rem',
          textShadow: '2px 2px 0 rgba(0,0,0,0.3)',
        }}>
          🗺️ Fractions Adventure Worksheet
        </div>
        <button
          className="btn btn-treasure"
          style={{ fontSize: '0.85rem', padding: '0.5rem 1.2rem' }}
          onClick={() => window.print()}
        >
          🖨️ Print Worksheet
        </button>
      </div>

      {/* Printable Area */}
      <div style={{
        maxWidth: '8.5in',
        margin: '2rem auto',
        background: 'white',
        boxShadow: '0 10px 40px rgba(0,0,0,0.15)',
      }} className="worksheet-container">

        {/* Page 1: Adventure Story */}
        <div className="print-page" style={{
          padding: '3rem',
          minHeight: '10.5in',
          position: 'relative',
          border: '8px solid var(--accent)',
          borderStyle: 'double',
        }}>
          {/* Corner decorations */}
          <span style={{ position: 'absolute', top: 12, left: 12, fontSize: '1.2rem' }}>⚓</span>
          <span style={{ position: 'absolute', top: 12, right: 12, fontSize: '1.2rem' }}>🧭</span>
          <span style={{ position: 'absolute', bottom: 12, left: 12, fontSize: '1.2rem' }}>🐚</span>
          <span style={{ position: 'absolute', bottom: 12, right: 12, fontSize: '1.2rem' }}>⭐</span>

          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div style={{
              fontFamily: 'var(--font-fun)',
              fontSize: '0.85rem',
              color: 'var(--secondary)',
              fontWeight: 700,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              marginBottom: '0.5rem',
            }}>
              ⭐ Math Adventures ⭐
            </div>
            <h1 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '2.8rem',
              color: 'var(--primary-dark)',
              marginBottom: '0.5rem',
            }}>
              Fractions Adventure
            </h1>
            <h2 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '1.8rem',
              color: 'var(--accent-dark)',
            }}>
              The Lost Treasure of Fraction Island 🏴‍☠️
            </h2>
          </div>

          {/* Story box */}
          <div style={{
            background: 'var(--bg-parchment)',
            padding: '2rem',
            border: '3px solid #8B6914',
            borderRadius: 'var(--radius-lg)',
            position: 'relative',
            marginBottom: '2rem',
            boxShadow: 'inset 0 0 20px rgba(139, 105, 20, 0.06)',
          }}>
            {/* Corner rivets */}
            {[{ top: 8, left: 8 }, { top: 8, right: 8 }, { bottom: 8, left: 8 }, { bottom: 8, right: 8 }].map((pos, i) => (
              <div key={i} style={{
                position: 'absolute',
                ...pos,
                width: 14,
                height: 14,
                borderRadius: '50%',
                background: 'linear-gradient(145deg, #B8860B, #8B6914)',
                border: '1px solid #6B4F1D',
              }} />
            ))}

            <p style={{
              fontSize: '1.1rem',
              lineHeight: 1.7,
              marginBottom: '1rem',
              color: '#5C3D0F',
              fontWeight: 600,
            }}>
              🏴‍☠️ Ahoy, young explorer! Welcome to <strong>Fraction Island</strong>. Legend says a legendary treasure is hidden somewhere on this island, but the path is guarded by the math-loving Fraction Monsters!
            </p>
            <p style={{
              fontSize: '1.1rem',
              lineHeight: 1.7,
              color: '#5C3D0F',
              fontWeight: 600,
            }}>
              ⚔️ To find the treasure, you must solve fraction challenges to unlock secret paths, collect gold coins, and prove your math skills. Are you ready for the adventure?
            </p>
          </div>

          {/* Explorer Profile */}
          <div style={{
            border: '3px solid var(--primary)',
            borderRadius: 'var(--radius-lg)',
            padding: '1.5rem',
            background: 'linear-gradient(145deg, #E0F2FE, #F0F9FF)',
          }}>
            <h3 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '1.5rem',
              color: 'var(--primary-dark)',
              marginBottom: '1rem',
            }}>
              🗺️ Explorer Profile
            </h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.75rem' }}>
              <span style={{ fontWeight: 700, fontSize: '1.05rem' }}>Name:</span>
              <div style={{ borderBottom: '2px solid #1B4332', flex: 1, height: 30 }} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
              <span style={{ fontWeight: 700, fontSize: '1.05rem' }}>Date:</span>
              <div style={{ borderBottom: '2px solid #1B4332', width: 180, height: 30 }} />
            </div>
            <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center' }}>
              <div style={{
                width: 120,
                height: 120,
                border: '3px dashed #9CA3AF',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#9CA3AF',
                textAlign: 'center',
                padding: '0.5rem',
                background: 'white',
                fontSize: '0.85rem',
              }}>
                Draw Your Avatar Here
              </div>
            </div>
          </div>
          <WorksheetFooter />
        </div>

        {/* Page 2: Fraction Map Challenge */}
        <div className="print-page" style={{ padding: '3rem', minHeight: '10.5in', position: 'relative' }}>
          <WorksheetHeader title="1. Fraction Map Challenge 🗺️" />

          <p style={{ fontSize: '1.05rem', marginBottom: '2rem', lineHeight: 1.6 }}>
            The old pirate map has been torn into pieces! To read the map, you need to identify the fractions.
            <strong> Color the shapes</strong> to match the fraction given, or <strong>write the fraction</strong> that is shaded.
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '2rem',
            marginTop: '2rem',
          }}>
            {/* Box 1 */}
            <FractionBox title="Color 1/2">
              <div style={{
                width: 140,
                height: 140,
                border: '3px solid #1B4332',
                borderRadius: '50%',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                overflow: 'hidden',
              }}>
                <div style={{ borderRight: '3px solid #1B4332' }} />
                <div />
              </div>
            </FractionBox>

            {/* Box 2 */}
            <FractionBox title="Color 3/4">
              <div style={{
                width: 140,
                height: 140,
                border: '3px solid #1B4332',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gridTemplateRows: '1fr 1fr',
              }}>
                <div style={{ borderRight: '3px solid #1B4332', borderBottom: '3px solid #1B4332' }} />
                <div style={{ borderBottom: '3px solid #1B4332' }} />
                <div style={{ borderRight: '3px solid #1B4332' }} />
                <div />
              </div>
            </FractionBox>

            {/* Box 3 */}
            <FractionBox title="What fraction is shaded?">
              <div style={{
                width: 140,
                height: 140,
                border: '3px solid #1B4332',
                display: 'flex',
              }}>
                <div style={{ flex: 1, background: '#D1D5DB', borderRight: '3px solid #1B4332' }} />
                <div style={{ flex: 1, background: '#D1D5DB', borderRight: '3px solid #1B4332' }} />
                <div style={{ flex: 1, borderRight: '3px solid #1B4332' }} />
                <div style={{ flex: 1 }} />
              </div>
              <div style={{
                width: 80,
                height: 50,
                border: '2px dashed #9CA3AF',
                background: '#FAFAFA',
                marginTop: '0.75rem',
                borderRadius: 6,
              }} />
            </FractionBox>

            {/* Box 4 */}
            <FractionBox title="What fraction is shaded?">
              <div style={{
                width: 140,
                height: 140,
                border: '3px solid #1B4332',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr',
              }}>
                <div style={{ borderRight: '3px solid #1B4332', background: '#D1D5DB' }} />
                <div style={{ borderRight: '3px solid #1B4332' }} />
                <div />
              </div>
              <div style={{
                width: 80,
                height: 50,
                border: '2px dashed #9CA3AF',
                background: '#FAFAFA',
                marginTop: '0.75rem',
                borderRadius: 6,
              }} />
            </FractionBox>
          </div>
          <WorksheetFooter />
        </div>

        {/* Page 3: Fraction Treasure Hunt */}
        <div className="print-page" style={{ padding: '3rem', minHeight: '10.5in', position: 'relative' }}>
          <WorksheetHeader title="2. Fraction Treasure Hunt 💎" />
          <p style={{ fontSize: '1.05rem', marginBottom: '2rem', lineHeight: 1.6 }}>
            You found the treasure chests! Draw a line from the fraction on the left to the correct treasure chest description on the right.
          </p>

          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '2rem 3rem',
            marginTop: '2rem',
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
              {['1/3', '4/5', '5/8', '1/4'].map((f) => (
                <div key={f} style={{
                  padding: '0.75rem 1.5rem',
                  border: '3px solid var(--primary)',
                  borderRadius: 'var(--radius-lg)',
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.8rem',
                  textAlign: 'center',
                  color: 'var(--primary-dark)',
                  background: '#F0F9FF',
                  minWidth: 80,
                }}>
                  {f}
                </div>
              ))}
            </div>

            <div style={{ flex: 1 }} />

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <TreasureChest text="4 out of 5 gems are red 💎" />
              <TreasureChest text="1 out of 4 coins is gold 🪙" />
              <TreasureChest text="1 out of 3 swords is silver ⚔️" />
              <TreasureChest text="5 out of 8 pearls are black 🖤" />
            </div>
          </div>
          <WorksheetFooter />
        </div>

        {/* Pages 4-15 */}
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i + 4} className="print-page" style={{
            padding: '3rem',
            minHeight: '10.5in',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
          }}>
            <WorksheetHeader title={`${i + 3}. ${getPageTitle(i + 4)}`} />
            <div style={{
              flex: 1,
              border: '3px dashed #D1D5DB',
              borderRadius: 'var(--radius-lg)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '2rem',
              textAlign: 'center',
              color: '#9CA3AF',
              marginTop: '2rem',
              marginBottom: '4rem',
              background: '#FAFAFA',
            }}>
              <div>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>
                  {getPageEmoji(i + 4)}
                </div>
                <div style={{ fontSize: '1.3rem', fontWeight: 600 }}>
                  Activity Area: {getPageTitle(i + 4)}
                </div>
                <div style={{ fontSize: '0.85rem', marginTop: '0.5rem', opacity: 0.6 }}>
                  Teacher Note: Students will complete the gamified challenge here.
                </div>
              </div>
            </div>
            <WorksheetFooter />
          </div>
        ))}
      </div>
    </div>
  );
}

function getPageTitle(pageNum) {
  const titles = {
    4: "Numerator vs Denominator Battle",
    5: "Fraction Monster Maze",
    6: "Pizza Kingdom Fractions",
    7: "Equivalent Fraction Bridge",
    8: "Fraction Comparison Mountain",
    9: "Fraction Coding Puzzle",
    10: "Real-Life Fraction Quest",
    11: "Fraction Spin Challenge",
    12: "Fraction Escape Cave",
    13: "Fraction Boss Battle",
    14: "Treasure Certificate",
    15: "Complete Answer Key"
  };
  return titles[pageNum];
}

function getPageEmoji(pageNum) {
  const emojis = {
    4: '⚔️', 5: '🧩', 6: '🍕', 7: '🌉',
    8: '⛰️', 9: '💻', 10: '🌍', 11: '🎯',
    12: '🦇', 13: '👾', 14: '🏆', 15: '📝',
  };
  return emojis[pageNum] || '📄';
}

function FractionBox({ title, children }) {
  return (
    <div style={{
      border: '2px solid #D1D5DB',
      padding: '1.5rem',
      borderRadius: 'var(--radius-lg)',
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}>
      <h4 style={{
        fontFamily: 'var(--font-fun)',
        fontWeight: 700,
        fontSize: '1.1rem',
        marginBottom: '1rem',
        color: 'var(--primary-dark)',
      }}>
        {title}
      </h4>
      {children}
    </div>
  );
}

function WorksheetHeader({ title }) {
  return (
    <div style={{
      borderBottom: '3px solid var(--primary-dark)',
      paddingBottom: '0.75rem',
      marginBottom: '1.5rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
    }}>
      <h2 style={{
        fontFamily: 'var(--font-heading)',
        fontSize: '1.8rem',
        color: 'var(--primary-dark)',
      }}>
        {title}
      </h2>
      <div style={{
        fontSize: '0.85rem',
        fontWeight: 700,
        border: '2px solid #1B4332',
        padding: '0.4rem 0.75rem',
        borderRadius: 6,
        width: 100,
        textAlign: 'center',
      }}>
        Score: /10
      </div>
    </div>
  );
}

function WorksheetFooter() {
  return (
    <div style={{
      position: 'absolute',
      bottom: 20,
      left: 0,
      width: '100%',
      textAlign: 'center',
      fontSize: '0.8rem',
      fontWeight: 700,
      color: '#9CA3AF',
      fontFamily: 'var(--font-fun)',
    }}>
      ⛵ Powered by Intellia 360 – "Every Fraction Unlocks a New Treasure!" 🏴‍☠️
    </div>
  );
}

function TreasureChest({ text }) {
  return (
    <div style={{
      border: '2px solid #8B6914',
      padding: '1rem 1.25rem',
      width: 240,
      borderRadius: 'var(--radius-lg)',
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      textAlign: 'left',
      background: 'var(--bg-parchment)',
      fontWeight: 600,
      fontSize: '0.95rem',
      color: '#5C3D0F',
    }}>
      <span style={{ fontSize: '1.5rem' }}>📦</span>
      {text}
    </div>
  );
}

export default WorksheetHome;

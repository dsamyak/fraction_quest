import React, { useState, useEffect } from 'react';
import { useGame } from '../context/GameContext';

// Generates an array of particles based on the effect type
const generateParticles = (effect, emojis) => {
  const particles = [];
  const count = effect === 'pop' ? 12 : effect === 'firework' ? 24 : 8;
  
  for (let i = 0; i < count; i++) {
    const angle = (i * (360 / count)) * (Math.PI / 180);
    const distance = 40 + Math.random() * 60;
    particles.push({
      id: i,
      emoji: emojis[i % emojis.length],
      tx: Math.cos(angle) * distance,
      ty: Math.sin(angle) * distance,
      delay: Math.random() * 0.1,
      scale: 0.5 + Math.random() * 0.8
    });
  }
  return particles;
};

function ClickEffect({ x, y, effect, dialogue, reward, particles: emojiList, onComplete }) {
  const { t } = useGame();
  const [active, setActive] = useState(true);
  const [particlesState] = useState(() => generateParticles(effect, emojiList || ['✨', '⭐']));

  useEffect(() => {
    // Determine how long the effect should show
    const duration = dialogue ? 3000 : 1500;
    
    const timer = setTimeout(() => {
      setActive(false);
      if (onComplete) onComplete();
    }, duration);

    return () => clearTimeout(timer);
  }, [dialogue, onComplete]);

  if (!active) return null;

  return (
    <div style={{ position: 'absolute', left: `${x}%`, top: `${y}%`, zIndex: 200, pointerEvents: 'none' }}>
      
      {/* 1. Pop/Ripple Effect */}
      {(effect === 'pop' || effect === 'splash') && (
        <div className="pop-effect" style={{
          width: 80, height: 80,
          transform: 'translate(-50%, -50%)',
          background: effect === 'splash' 
            ? 'radial-gradient(circle, rgba(135,206,235,0.6), rgba(33,158,188,0.3), transparent)'
            : 'radial-gradient(circle, rgba(233, 196, 106, 0.6), rgba(231, 111, 81, 0.3), transparent)'
        }} />
      )}

      {/* 2. Particles */}
      {particlesState.map(p => (
        <div key={p.id} className="click-particle" style={{
          '--tx': `${p.tx}px`,
          '--ty': `${p.ty}px`,
          animationDelay: `${p.delay}s`,
          transform: `scale(${p.scale})`
        }}>
          {p.emoji}
        </div>
      ))}

      {/* 3. Floating Reward Text */}
      {reward && (
        <div className="floating-text" style={{
          color: reward.type === 'coins' ? '#FCD34D' : reward.type === 'xp' ? '#86efac' : '#FCA5A5',
          textShadow: '0 2px 4px rgba(0,0,0,0.5)',
          fontSize: '1.2rem',
          transform: 'translate(-50%, -100%)'
        }}>
          {reward.type === 'coins' && `+${reward.amount} 🪙`}
          {reward.type === 'xp' && `+${reward.amount} ⭐`}
          {reward.type === 'friend' && `${t('New Monster Friend!')} ${t(reward.name)}!`}
          {reward.type === 'map' && t('Map Fragment Found!')}
        </div>
      )}

      {/* 4. Speech Bubble */}
      {dialogue && (
        <div className="speech-bubble" style={{
          bottom: '120%', left: '50%', transform: 'translateX(-50%)',
          minWidth: 'max-content'
        }}>
          {t(dialogue)}
        </div>
      )}
      
    </div>
  );
}

export default ClickEffect;

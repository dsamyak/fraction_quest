import React, { useState } from 'react';
import ClickEffect from './ClickEffect';
import { useGame } from '../context/GameContext';
import confetti from 'canvas-confetti';

function InteractiveScene({ scene, onSceneComplete }) {
  const { discoverItem, discoveredItems, addCoins, addXp, addMonsterFriend, addMapFragment } = useGame();
  
  // Track currently playing effects
  const [activeEffects, setActiveEffects] = useState([]);

  const handleHotspotClick = (hotspot) => {
    // Don't re-trigger if already discovered
    if (discoveredItems.has(hotspot.id)) return;

    // Apply rewards immediately
    if (hotspot.reward) {
      const { type, amount, name } = hotspot.reward;
      if (type === 'coins') addCoins(amount);
      if (type === 'xp') addXp(amount);
      if (type === 'friend') addMonsterFriend(name);
      if (type === 'map') addMapFragment();
    }

    // Special global effects
    if (hotspot.effect === 'firework' || hotspot.effect === 'open') {
      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.6, x: hotspot.x / 100 },
        colors: ['#E9C46A', '#F59E0B', '#EF4444', '#10B981']
      });
    }

    // Add visual effect
    const newEffect = {
      id: Date.now(),
      ...hotspot
    };
    
    setActiveEffects(prev => [...prev, newEffect]);

    // Mark as discovered after a tiny delay so the click effect registers visually
    // while keeping the element there for the animation to finish if it's a character
    setTimeout(() => {
      discoverItem(hotspot.id);
      
      // Check if all required items are found
      const requiredLeft = scene.requiredHotspots.filter(id => id !== hotspot.id && !discoveredItems.has(id));
      if (requiredLeft.length === 0) {
        // Scene complete!
        setTimeout(() => {
          onSceneComplete();
        }, 1500); // Give time for the final effect to finish
      }
    }, 100);
  };

  const removeEffect = (effectId) => {
    setActiveEffects(prev => prev.filter(e => e.id !== effectId));
  };

  return (
    <div className="adventure-scene">
      {/* Background Image */}
      <img src={scene.image} alt={scene.title} className="adventure-scene__image" />

      {/* Dark gradient overlay for bottom text area readability */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: '40%',
        background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
        pointerEvents: 'none', zIndex: 1
      }} />

      {/* Hotspots */}
      {scene.hotspots.map((hotspot) => {
        const isDiscovered = discoveredItems.has(hotspot.id);
        
        // Define the base style for this hotspot
        let animationStyle = {};
        if (isDiscovered) {
          if (hotspot.effect === 'pop' || hotspot.effect === 'collect') {
             // For pop/collect, the item completely disappears
             animationStyle = { display: 'none' };
          } else if (hotspot.effect === 'bounce') {
             // For characters, they might stay but just be non-interactive
             animationStyle = { filter: 'brightness(1.1)', transform: 'scale(1.05)' };
          } else if (hotspot.effect === 'glow') {
             animationStyle = { animation: 'glowPulse 2s infinite' };
          } else if (hotspot.effect === 'flip') {
             animationStyle = { transform: 'rotateY(180deg)', opacity: 0.8 };
          }
        }

        return (
          <div
            key={hotspot.id}
            className={`hotspot ${isDiscovered ? 'hotspot--discovered' : ''}`}
            style={{
              left: `${hotspot.x}%`,
              top: `${hotspot.y}%`,
              width: `${hotspot.width}%`,
              height: `${hotspot.height}%`,
              transform: 'translate(-50%, -50%)',
              ...animationStyle
            }}
            onClick={() => handleHotspotClick(hotspot)}
          >
            {/* Visual hint for undiscovered items */}
            {!isDiscovered && hotspot.effect !== 'pop' && hotspot.effect !== 'collect' && (
              <div className="interact-hint" style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                ✨
              </div>
            )}
            
            {/* Special collect flying animation element (only shown when clicked) */}
            {activeEffects.some(e => e.id === hotspot.id && e.effect === 'collect') && (
              <div className="collect-fly" style={{ fontSize: '2rem' }}>
                {hotspot.emoji}
              </div>
            )}
          </div>
        );
      })}

      {/* Active Click Effects Layer */}
      {activeEffects.map(effect => (
        <ClickEffect
          key={effect.id}
          x={effect.x}
          y={effect.y}
          effect={effect.effect}
          dialogue={effect.dialogue}
          reward={effect.reward}
          particles={effect.particles}
          onComplete={() => removeEffect(effect.id)}
        />
      ))}
    </div>
  );
}

export default InteractiveScene;

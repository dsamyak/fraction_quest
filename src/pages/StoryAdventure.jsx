import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../context/GameContext';
import InteractiveScene from '../components/InteractiveScene';
import { storyScenes } from '../data/storyScenes';
import { level1Questions, level2Questions, level3Questions, pickRandom, shuffleArray } from '../data/questionBank';

/**
 * The main Adventure Mode engine.
 * Wraps InteractiveScene, manages narration text typing, HUD overlay, and 
 * the inline fraction challenges that pop up between scenes.
 */
function StoryAdventure() {
  const { 
    currentScene, goToScene, 
    coins, xp, mapFragments, monsterFriends,
    addCoins, addXp, markChallengeSolved, solvedChallenges,
    t
  } = useGame();
  
  const navigate = useNavigate();
  const scene = storyScenes[currentScene];

  const [narrationIndex, setNarrationIndex] = useState(0);
  const [typedText, setTypedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [showChallenge, setShowChallenge] = useState(false);
  const [challengeState, setChallengeState] = useState(null); // { questions: [], currentIndex: 0, feedback: null }

  // Scene transition
  const [transitioning, setTransitioning] = useState(false);

  // Typewriter effect for narration
  useEffect(() => {
    if (!scene) return;
    
    const currentNarration = scene.narration[narrationIndex];
    if (!currentNarration) return;

    setIsTyping(true);
    setTypedText('');
    
    let i = 0;
    const text = t(currentNarration.text);
    const speed = 30; // ms per char

    const typingInterval = setInterval(() => {
      if (i < text.length) {
        setTypedText(prev => prev + text.charAt(i));
        i++;
      } else {
        clearInterval(typingInterval);
        setIsTyping(false);
      }
    }, speed);

    return () => clearInterval(typingInterval);
  }, [currentScene, narrationIndex, scene, t]);

  if (!scene) {
    // End of game or invalid scene
    return (
      <div style={{ minHeight: '100vh', background: '#0B1E14', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
        <h2>{t("Adventure Complete!")}</h2>
        <button className="btn btn-primary" onClick={() => navigate('/')}>{t("Return to Menu")}</button>
      </div>
    );
  }

  const handleNextNarration = () => {
    if (isTyping) {
      // Skip typing animation
      setTypedText(scene.narration[narrationIndex].text);
      setIsTyping(false);
    } else if (narrationIndex < scene.narration.length - 1) {
      setNarrationIndex(n => n + 1);
    }
  };

  const handleSceneComplete = () => {
    if (scene.challenge && !solvedChallenges.has(scene.id)) {
      // Init challenge
      let questionsPool = [];
      if (scene.challenge.type === 'level1') questionsPool = level1Questions;
      else if (scene.challenge.type === 'level2') questionsPool = level2Questions;
      else if (scene.challenge.type === 'level3') questionsPool = level3Questions;

      const picked = pickRandom(questionsPool, scene.challenge.questionCount).map(q => ({
        ...q,
        options: q.options ? shuffleArray(q.options) : undefined
      }));

      setChallengeState({
        questions: picked,
        currentIndex: 0,
        feedback: null
      });
      setShowChallenge(true);
    } else {
      nextScene();
    }
  };

  const nextScene = () => {
    setTransitioning(true);
    setTimeout(() => {
      if (currentScene < storyScenes.length - 1) {
        goToScene(currentScene + 1);
        setNarrationIndex(0);
      } else {
        // End of game
        navigate('/');
      }
      setTransitioning(false);
    }, 500);
  };

  const handleChallengeAnswer = (answer) => {
    if (challengeState.feedback) return; // Prevent multiple clicks

    const currentQ = challengeState.questions[challengeState.currentIndex];
    let isCorrect = false;

    if (scene.challenge.type === 'level1') {
      isCorrect = answer.correct === true;
    } else if (scene.challenge.type === 'level2') {
      isCorrect = currentQ.correctAnswers.includes(answer);
    } else if (scene.challenge.type === 'level3') {
      isCorrect = answer === currentQ.correct;
    }

    if (isCorrect) {
      setChallengeState(prev => ({ ...prev, feedback: 'correct' }));
      addCoins(10);
      addXp(15);
      
      setTimeout(() => {
        if (challengeState.currentIndex < challengeState.questions.length - 1) {
          setChallengeState(prev => ({
            ...prev,
            currentIndex: prev.currentIndex + 1,
            feedback: null
          }));
        } else {
          // Challenge complete
          markChallengeSolved(scene.id);
          setShowChallenge(false);
          nextScene();
        }
      }, 1500);
    } else {
      setChallengeState(prev => ({ ...prev, feedback: 'incorrect' }));
      setTimeout(() => {
        setChallengeState(prev => ({ ...prev, feedback: null }));
      }, 1200);
    }
  };

  // Render inline challenge UI
  const renderChallenge = () => {
    if (!challengeState) return null;
    const currentQ = challengeState.questions[challengeState.currentIndex];
    
    return (
      <div className="challenge-overlay">
        <div style={{
          background: 'linear-gradient(145deg, #F3E5C0, #F5E6C8)',
          border: '4px solid #8B6914',
          borderRadius: 'var(--radius-xl)',
          padding: '2.5rem',
          maxWidth: 600, width: '90%',
          textAlign: 'center',
          boxShadow: '0 10px 40px rgba(0,0,0,0.5)',
          position: 'relative'
        }}>
          <h2 style={{ fontFamily: 'var(--font-heading)', color: 'var(--primary-dark)', fontSize: '2rem', marginBottom: '0.5rem' }}>
            {t(scene.challenge.intro)}
          </h2>
          <div style={{ marginBottom: '2rem', fontFamily: 'var(--font-fun)', color: '#6B7280' }}>
            {t("Question")} {challengeState.currentIndex + 1} {t("of")} {challengeState.questions.length}
          </div>

          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', marginBottom: '2rem' }}>
            {scene.challenge.type === 'level1' && t(currentQ.question)}
            {scene.challenge.type === 'level2' && t(currentQ.instruction)}
            {scene.challenge.type === 'level3' && t("Choose the correct symbol to compare the fractions:")}
          </h3>

          {/* Render options based on challenge type */}
          {scene.challenge.type === 'level1' && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              {currentQ.options.map(opt => (
                <button
                  key={opt.id}
                  className="btn"
                  onClick={() => handleChallengeAnswer(opt)}
                  style={{
                    padding: '1rem', background: 'white', border: '2px solid var(--primary)',
                    borderRadius: '12px', fontSize: '1.2rem', fontFamily: 'var(--font-fun)', cursor: 'pointer'
                  }}
                >
                  {t(opt.label)}
                </button>
              ))}
            </div>
          )}

          {scene.challenge.type === 'level2' && (
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1rem' }}>
              <div style={{ fontSize: '3rem', fontFamily: 'var(--font-heading)', color: 'var(--ocean-dark)', width: '100%', marginBottom: '1rem' }}>
                {currentQ.target}
              </div>
              {currentQ.options.map((opt, i) => (
                <button key={i} onClick={() => handleChallengeAnswer(opt)} className="btn btn-secondary" style={{ fontSize: '1.5rem', padding: '1rem 1.5rem' }}>
                  {opt}
                </button>
              ))}
            </div>
          )}

          {scene.challenge.type === 'level3' && (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
               <div style={{ fontSize: '2.5rem', fontFamily: 'var(--font-heading)' }}>{currentQ.f1}</div>
               <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                 {['>', '=', '<'].map(sym => (
                    <button key={sym} onClick={() => handleChallengeAnswer(sym)} className="btn btn-primary" style={{ fontSize: '1.5rem', width: 60, height: 60 }}>
                      {sym}
                    </button>
                 ))}
               </div>
               <div style={{ fontSize: '2.5rem', fontFamily: 'var(--font-heading)' }}>{currentQ.f2}</div>
            </div>
          )}

          {/* Challenge Feedback */}
          {challengeState.feedback === 'correct' && (
             <div className="animate-popIn" style={{ position: 'absolute', inset: 0, background: 'rgba(255,255,255,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '16px', fontSize: '3rem', color: 'var(--success)' }}>
               {t("✅ Correct!")}
             </div>
          )}
          {challengeState.feedback === 'incorrect' && (
             <div className="animate-popIn" style={{ position: 'absolute', inset: 0, background: 'rgba(255,255,255,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '16px', fontSize: '3rem', color: 'var(--danger)' }}>
               {t("❌ Oops!")}
             </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden', background: '#000' }}>
      
      {/* Top HUD Overlay */}
      <div className="adventure-hud">
        <button onClick={() => navigate('/')} className="btn btn-secondary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}>
          {t("Menu")}
        </button>
        
        <div style={{ display: 'flex', gap: '1rem' }}>
          <div className="badge-coin">🪙 {coins}</div>
          <div className="badge-xp">⭐ {xp}</div>
          {mapFragments > 0 && <div className="badge" style={{ background: '#F59E0B', color: 'white' }}>🗺️ {mapFragments}/3</div>}
          {monsterFriends.length > 0 && <div className="badge" style={{ background: '#10B981', color: 'white' }}>👾 {monsterFriends.length}/4</div>}
        </div>
      </div>

      {/* Main Interactive Scene */}
      <InteractiveScene scene={scene} onSceneComplete={handleSceneComplete} />

      {/* Bottom Narration Bar */}
      <div className="narration-bar" onClick={handleNextNarration}>
        <div className="narration-character">
          <span style={{ fontSize: '1.5rem' }}>{scene.narration[narrationIndex]?.character}</span>
          {t(scene.narration[narrationIndex]?.name)}
        </div>
        <div className="narration-text">
          {typedText}
          {!isTyping && narrationIndex < scene.narration.length - 1 && (
             <span style={{ fontSize: '0.8rem', opacity: 0.5, marginLeft: '10px', animation: 'hotspotPulse 1s infinite' }}>▼</span>
          )}
        </div>
        
        {/* Progress dots for narration */}
        <div className="scene-dots" style={{ marginTop: '0.5rem' }}>
          {scene.narration.map((_, i) => (
            <div key={i} className={`scene-dot ${i === narrationIndex ? 'scene-dot--active' : i < narrationIndex ? 'scene-dot--completed' : ''}`} />
          ))}
        </div>
      </div>

      {/* Challenge Overlay */}
      {showChallenge && renderChallenge()}

      {/* Transition Overlay */}
      {transitioning && <div className="scene-transition scene-transition--enter" />}
    </div>
  );
}

export default StoryAdventure;

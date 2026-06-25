import React, { createContext, useContext, useState } from 'react';
import { t as translate } from '../translations';

const GameContext = createContext();

export function GameProvider({ children }) {
  const [coins, setCoins] = useState(0);
  const [xp, setXp] = useState(0);
  const [unlockedLevels, setUnlockedLevels] = useState(['level1']);
  
  // Localization state
  const [language, setLanguage] = useState('korku'); // Default to Korku

  // Adventure story state
  const [currentScene, setCurrentScene] = useState(0);
  const [discoveredItems, setDiscoveredItems] = useState(new Set());
  const [monsterFriends, setMonsterFriends] = useState([]);
  const [mapFragments, setMapFragments] = useState(0);
  const [solvedChallenges, setSolvedChallenges] = useState(new Set());

  const addCoins = (amount) => setCoins(c => c + amount);
  const addXp = (amount) => setXp(x => x + amount);
  const unlockLevel = (levelId) => {
    if (!unlockedLevels.includes(levelId)) {
      setUnlockedLevels(prev => [...prev, levelId]);
    }
  };

  const advanceScene = () => setCurrentScene(s => s + 1);
  const goToScene = (idx) => setCurrentScene(idx);

  const discoverItem = (id) => {
    setDiscoveredItems(prev => {
      const next = new Set(prev);
      next.add(id);
      return next;
    });
  };

  const addMonsterFriend = (name) => {
    if (!monsterFriends.includes(name)) {
      setMonsterFriends(prev => [...prev, name]);
    }
  };

  const addMapFragment = () => setMapFragments(f => f + 1);

  const markChallengeSolved = (id) => {
    setSolvedChallenges(prev => {
      const next = new Set(prev);
      next.add(id);
      return next;
    });
  };

  const rank = xp < 100 ? translate('Beginner', language) : xp < 300 ? translate('Explorer', language) : translate('Treasure Hunter', language);

  const t = (key) => translate(key, language);

  return (
    <GameContext.Provider value={{
      coins, addCoins,
      xp, addXp,
      unlockedLevels, unlockLevel,
      rank,
      language, setLanguage, t,
      // Adventure state
      currentScene, advanceScene, goToScene,
      discoveredItems, discoverItem,
      monsterFriends, addMonsterFriend,
      mapFragments, addMapFragment,
      solvedChallenges, markChallengeSolved,
    }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  return useContext(GameContext);
}

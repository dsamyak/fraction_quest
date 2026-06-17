import React, { createContext, useContext, useState } from 'react';

const GameContext = createContext();

export function GameProvider({ children }) {
  const [coins, setCoins] = useState(0);
  const [xp, setXp] = useState(0);
  const [unlockedLevels, setUnlockedLevels] = useState(['level1']);
  
  const addCoins = (amount) => setCoins(c => c + amount);
  const addXp = (amount) => setXp(x => x + amount);
  const unlockLevel = (levelId) => {
    if (!unlockedLevels.includes(levelId)) {
      setUnlockedLevels(prev => [...prev, levelId]);
    }
  };

  const rank = xp < 100 ? 'Beginner' : xp < 300 ? 'Explorer' : 'Treasure Hunter';

  return (
    <GameContext.Provider value={{
      coins, addCoins,
      xp, addXp,
      unlockedLevels, unlockLevel,
      rank
    }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  return useContext(GameContext);
}

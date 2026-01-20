import React, { createContext, useContext } from 'react';
import useSound from '../hooks/useSound';

const SoundContext = createContext();

export const SoundProvider = ({ children }) => {
  const soundSettings = useSound();

  return (
    <SoundContext.Provider value={soundSettings}>
      {children}
    </SoundContext.Provider>
  );
};

export const useSoundContext = () => {
  const context = useContext(SoundContext);
  if (!context) {
    throw new Error('useSoundContext must be used within a SoundProvider');
  }
  return context;
};

export default SoundContext;

import { useState, createContext, useContext } from 'react';

// Common store (context or simple state)
export const StoreContext = createContext(null);

export const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  const [appState, setAppState] = useState({ initialized: true });
  return (
    <StoreContext.Provider value={{ appState, setAppState }}>
      {children}
    </StoreContext.Provider>
  );
};

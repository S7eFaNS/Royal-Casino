import React, { createContext, useContext, useState, ReactNode } from 'react';

interface BalanceContextProps {
  userBalance: number | null;
  setBalance: (newBalance: number | null) => void;
}

const BalanceContext = createContext<BalanceContextProps | undefined>(undefined);

interface BalanceProviderProps {
  children: ReactNode;
}

export const BalanceProvider: React.FC<BalanceProviderProps> = ({ children }) => {
  const [userBalance, setUserBalance] = useState<number | null>(null);

  const setBalance = (newBalance: number | null) => {
    setUserBalance(newBalance);
  };

  return (
    <BalanceContext.Provider value={{ userBalance, setBalance }}>
      {children}
    </BalanceContext.Provider>
  );
};

export const useBalance = (): BalanceContextProps => {
  const context = useContext(BalanceContext);
  if (!context) {
    throw new Error('useBalance must be used within a BalanceProvider');
  }
  return context;
};

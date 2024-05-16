import React, { createContext, useState } from 'react';

export const BalanceContext = createContext();

export const BalanceProvider = ({ children }) => {
  const [balance, setBalance] = useState(1000000); // Saldo inicial simulado
  const [earnings, setEarnings] = useState(500000); // Ganancias iniciales simuladas

  return (
    <BalanceContext.Provider value={{ balance, earnings, setBalance, setEarnings }}>{children}</BalanceContext.Provider>
  );
};

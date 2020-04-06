import React, { useState, createContext } from "react";

export const EntriesContext = createContext();

export const EntriesProvider = ({ children }) => {
  const [data, setData] = useState({ entries: [] });

  return (
    <EntriesContext.Provider value={[data, setData]}>
      {children}
    </EntriesContext.Provider>
  );
};

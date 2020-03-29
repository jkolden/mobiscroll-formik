import React, { useState, createContext } from "react";

export const EntriesContext = createContext();

export const EntriesProvider = props => {
  const [entries, setEntries] = useState([]);

  return (
    <EntriesContext.Provider value={[entries, setEntries]}>
      {props.children}
    </EntriesContext.Provider>
  );
};

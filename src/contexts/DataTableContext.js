import React, { createContext, useState, useContext } from 'react';

const DataTableContext = createContext();

export function DataTableProvider({ children }) {
  const [filteredData, setFilteredData] = useState([]);

  return (
    <DataTableContext.Provider value={{ filteredData, setFilteredData }}>
      {children}
    </DataTableContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataTableContext);
  if (!context) {
    throw new Error('useData deve ser usado dentro de um DataProvider');
  }
  return context;
}
import React, {createContext, useContext, useState} from 'react';

export const AppContext = createContext({
  selectedCustomerName: '',
  setSelectedCustomerName: null,
});

export const AppContextProvider = props => {
  const [selectedCustomerName, setSelectedCustomerName] = useState('');
  return (
    <AppContext.Provider
      value={{
        selectedCustomerName,
        setSelectedCustomerName,
      }}>
      {props.children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);

import React, {createContext, ReactNode, useContext} from 'react';

const AppContext = createContext<any>({});

type AppContextProviderProps = {
  children?: ReactNode;
  isUserEnter?: boolean;
  setUserEnter?: boolean;
  currentLatitude?: any;
  setCurrentLatitude?: any;
  currentLongitude?: any;
  setCurrentLongitude?: any;
  currentAddress?: any;
  setCurrenAddress?: any;
};

export default ({children}: AppContextProviderProps) => {
  const [isLoggedIn, setIsLoggedIn] = React.useState<unknown>(null);
  const [isUserEnter, setUserEnter] = React.useState(false);
  const [currentLatitude, setCurrentLatitude] = React.useState();
  const [currentLongitude, setCurrentLongitude] = React.useState();
  const [currentAddress, setCurrenAddress] = React.useState<any>();

  return (
    <AppContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        isUserEnter,
        setUserEnter,
        currentLatitude,
        setCurrentLatitude,
        currentLongitude,
        setCurrentLongitude,
        currentAddress,
        setCurrenAddress,
      }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);

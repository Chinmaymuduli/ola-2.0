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
  currentUserAddress?: any;
  setCurrenUserAddress?: any;
  userDestination?: any;
  setUserDestination?: any;
  currentDes?: any;
  setCurrentDes?: any;
  destinationDes?: any;
  setDestinationDes?: any;
};

export default ({children}: AppContextProviderProps) => {
  const [isLoggedIn, setIsLoggedIn] = React.useState<unknown>(null);
  const [isUserEnter, setUserEnter] = React.useState(false);
  const [currentLatitude, setCurrentLatitude] = React.useState();
  const [currentLongitude, setCurrentLongitude] = React.useState();
  const [currentUserAddress, setCurrenUserAddress] = React.useState<any>();
  const [userDestination, setUserDestination] = React.useState<any>();
  const [currentDes, setCurrentDes] = React.useState<any>('');
  const [destinationDes, setDestinationDes] = React.useState<any>('');

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
        currentUserAddress,
        setCurrenUserAddress,
        userDestination,
        setUserDestination,
        currentDes,
        setCurrentDes,
        destinationDes,
        setDestinationDes,
      }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);

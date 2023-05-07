import { createContext, useEffect, useState, useContext } from 'react';

import { useApi } from '../services/useApi';
import { LoginContext } from './LoginContextProvider';

export const BuildingsContext = createContext({});

export default function BuildingsContextProvider({ children }) {
  // const [activeProfile, setActiveProfile] = useState();
  // const api = useApi();

  // const { user } = useContext(LoginContext);

  // useEffect(() => {
  //   const validateProfile = async () => {
  //     const storageData = localStorage.getItem('activeProfile');
  //     if (storageData) {
  //       const data = await api.validateToken(storageData);
  //       if (data.buildings) {
  //         setUser(data.buildings);
  //       }
  //     }
  //   };
  //   validateProfile();
  // }, []);

  // const getPermitedBuildings = async () => {
  //   const data = await api.getBuildings(user.username);
  //   setBuildingsList(data.buildings);
  //   console.log(buildingsList);
  // };

  // const setProfile = (profile) => {
  //   localStorage.setItem('loginToken', profile);
  // };

  const value = {
    // getPermitedBuildings,
    // buildingsList,
    // setBuildingsList,
  };

  return (
    <BuildingsContext.Provider value={value}>
      {children}
    </BuildingsContext.Provider>
  );
}

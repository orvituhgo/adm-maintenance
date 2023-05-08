import { createContext, useEffect, useState, useContext } from 'react';

import { useApi } from '../services/useApi';
import { LoginContext } from './LoginContextProvider';

export const BuildingsContext = createContext({});

export default function BuildingsContextProvider({ children }) {
  const [buildingInfo, setBuildingInfo] = useState([]);

  const api = useApi();

  const { getActiveProfile } = useContext(LoginContext);

  useEffect(() => {
    const validateProfile = async () => {
      const storageData = getActiveProfile();
      console.log('storageData:', storageData);
      if (storageData) {
        const data = await api.getBuildingInfo(storageData);
        if (data.building) {
          setBuildingInfo(data.building);
        }
      }
    };
    validateProfile();
  }, []);

  const syncBuildingProfile = async () => {
    const activeProfile = getActiveProfile();
    const response = await api.getBuildingInfo(activeProfile);
    setBuildingInfo(response);
  };

  const value = {
    syncBuildingProfile,
    buildingInfo,
  };

  return (
    <BuildingsContext.Provider value={value}>
      {children}
    </BuildingsContext.Provider>
  );
}

import { createContext, useEffect, useState, useContext } from 'react';

import { useApi } from '../services/useApi';
import { LoginContext } from './LoginContextProvider';
import { useFirestore } from '../services/useFirestore';

export const BuildingsContext = createContext({});

export default function BuildingsContextProvider({ children }) {
  const [buildingInfo, setBuildingInfo] = useState([]);
  // const
  const api = useApi();
  const firestore = useFirestore();

  const { getActiveProfile } = useContext(LoginContext);

  const watcherStorageData = getActiveProfile();

  useEffect(() => {
    const validateProfile = async () => {
      const storageData = getActiveProfile();
      if (storageData) {
        const data = await api.getBuildingInfo(storageData);
        if (data.building) {
          setBuildingInfo(data.building);
        }
      }
    };
    validateProfile();
  }, [watcherStorageData]);
  //necessário watcher aqui pois não está num hook, portanto não estava sendo observado quando perdia os dados

  const syncBuildingProfile = async () => {
    const activeProfile = getActiveProfile();
    const response = await api.getBuildingInfo(activeProfile);
    setBuildingInfo(response);
  };

  const createBuildingToUser = async (
    id,
    nickname,
    url = 'https://placehold.co/400x500/736b66/403d39'
  ) => {
    const image = url || 'https://placehold.co/400x500/736b66/403d39';
    const newBuilding = await firestore.addBuilding(nickname, image);
    await firestore.updateUserBuildingsList(id, nickname);
    console.log(newBuilding);
  };

  const value = {
    syncBuildingProfile,
    createBuildingToUser,
    buildingInfo,
  };

  return (
    <BuildingsContext.Provider value={value}>
      {children}
    </BuildingsContext.Provider>
  );
}

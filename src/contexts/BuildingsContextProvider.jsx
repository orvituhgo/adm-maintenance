import { createContext, useEffect, useState, useContext } from 'react';

import { useApi } from '../services/useApi';
import { LoginContext } from './LoginContextProvider';
import { useFirestore } from '../services/useFirestore';

export const BuildingsContext = createContext({});

export default function BuildingsContextProvider({ children }) {
  const [buildingInfo, setBuildingInfo] = useState([]);
  // const [buildings, setBuildings] = useState([]);

  const api = useApi();
  const firestore = useFirestore();

  const { getActiveProfile, user } = useContext(LoginContext);

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
    // const setBuildingsList = async () => {
    //   const { userId } = user;
    //   const data = await getBuildingsToShowInProfile(userId);
    //   setBuildings(data);
    // };
    // setBuildingsList();
    validateProfile();
  }, [watcherStorageData]);
  //necessário watcher aqui pois não está num hook, portanto não estava sendo observado quando perdia os dados

  const getBuildingOsList = async () => {
    const activeProfile = getActiveProfile();
    const response = await api.getBuildingInfo(activeProfile);
    setBuildingInfo(response);
  };

  const getBuildingsToShowInProfile = (id) => {
    try {
      const { buildingsList } = user;
      if (buildingsList) {
        console.log('buildingsContextProvider: ', buildingsList);
        return buildingsList;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const createBuildingToUser = async (id, nickname, url) => {
    const image = url || 'https://placehold.co/400x500/736b66/403d39';
    const newBuilding = await firestore.addBuilding(nickname, image);
    await firestore.addOsList(nickname);
    await firestore.updateUserBuildingsList(id, nickname);
    console.log(newBuilding);
  };

  const value = {
    buildingInfo,
    // buildings,
    getBuildingOsList,
    createBuildingToUser,
    getBuildingsToShowInProfile,
  };

  return (
    <BuildingsContext.Provider value={value}>
      {children}
    </BuildingsContext.Provider>
  );
}

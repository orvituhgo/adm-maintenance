import { createContext, useEffect, useState } from 'react';
import { useApi } from '../services/useApi';
import { useFirestore } from '../services/useFirestore';

export const LoginContext = createContext({});

export default function LoginContextProvider({ children }) {
  const [user, setUser] = useState([]);
  const [buildingList, setBuildingList] = useState([]);

  const firestore = useFirestore();

  useEffect(() => {
    const validateToken = async () => {
      const dataStoraged = sessionStorage.getItem('loginToken'); // substituir para verificar no servidor
      if (dataStoraged) {
        const dataParsed = JSON.parse(dataStoraged);
        const data = await firestore.getUser(dataParsed.id);
        if (data) {
          setUser(data.user);
        }
      }
    };
    validateToken();
  }, []);

  //functions async to fetch the api here
  const api = useApi();

  const login = async (email, password) => {
    const data = await api.login(email, password);
    if (data) {
      setUser(data.user);
      setToken(JSON.stringify(data.user));
      return true;
    }
    return false;
  };

  const logout = async () => {
    await api.logout();
    setUser(null);
    setToken('');
    unsetActiveProfile();
  };

  const getActiveProfile = () => {
    return sessionStorage.getItem('activeProfile');
  };
  const setActiveProfile = (profileClicked) => {
    sessionStorage.setItem('activeProfile', profileClicked);
  };
  const getLoginToken = () => {
    return JSON.parse(sessionStorage.getItem('loginToken'));
  };
  const unsetActiveProfile = () => {
    setActiveProfile('');
  };
  const setToken = (token) => {
    sessionStorage.setItem('loginToken', token);
  };

  const value = {
    user,
    buildingList,
    login,
    logout,
    getActiveProfile,
    setActiveProfile,
    unsetActiveProfile,
    getLoginToken,
  };

  return (
    <LoginContext.Provider value={value}>{children}</LoginContext.Provider>
  );
}

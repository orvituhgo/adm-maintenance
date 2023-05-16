import { createContext, useEffect, useState } from 'react';
import { useApi } from '../services/useApi';
import { useFirestore } from '../services/useFirestore';
import { onSnapshot } from 'firebase/firestore';

export const LoginContext = createContext({});

export default function LoginContextProvider({ children }) {
  const [user, setUser] = useState([]);
  const [buildingList, setBuildingList] = useState([]);

  const firestore = useFirestore();

  useEffect(() => {
    const validateToken = async () => {
      const dataStoraged = sessionStorage.getItem('loginToken'); // substituir para verificar no servidor
      if (dataStoraged) {
        console.log('pegando user');
        const dataParsed = JSON.parse(dataStoraged);
        const data = await firestore.getUser(dataParsed.id);
        if (data) {
          setUser(data);
        }
      }
    };

    validateToken();
    console.log('setUser: ', user);
    console.log('setBuildingList: ', buildingList);
  }, []);
  //não necessário watcher pois está dentro de um hook useState forçando a rodar useEffect sempre que mudar o state

  //functions async to fetch the api here
  const api = useApi();
  const firebase = useFirestore();

  const listenerUser = (id) => {
    const docRef = doc(`/users/${id}`);
    onSnapshot(docRef, (docSnapshot) => {
      if (docSnapshot.exists()) {
        console.log('docSnapshot: ', docSnapshot.data());
      }
    });
  };

  const login = async (email, password) => {
    const data = await api.login(email, password);
    const dataToStorage = {
      token: data.user.accessToken,
      id: data.user.uid,
    };
    if (data) {
      setUser(data.user);
      setToken(JSON.stringify(dataToStorage));
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
    return sessionStorage.getItem('loginToken');
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

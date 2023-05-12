import { createContext, useEffect, useState, useContext } from 'react';
import { useApi } from '../services/useApi';
import { useFirestore } from '../services/useFirestore';

export const LoginContext = createContext({});

export default function LoginContextProvider({ children }) {
  const [user, setUser] = useState([]);
  const firestore = useFirestore();

  useEffect(() => {
    const validateToken = async () => {
      const dataStoraged = localStorage.getItem('loginToken');
      console.log('Data storaged: ', dataStoraged);
      if (dataStoraged) {
        const dataParsed = JSON.parse(dataStoraged);
        console.log('Data parsed: ', dataParsed);
        const data = await firestore.getUser(dataParsed.id);
        console.log('data', data);
        if (data) {
          setUser(data);
          console.log('user', user);
        }
      }
    };
    validateToken();
  }, []);
  //não necessário watcher pois está dentro de um hook useState forçando a rodar useEffect sempre que mudar o state

  //functions async to fetch the api here
  const api = useApi();

  const login = async (email, password) => {
    const data = await api.login(email, password);
    const dataToStorage = {
      token: data.user.accessToken,
      id: data.user.uid,
    };
    console.log('dataToStorage: ', dataToStorage);
    if (data) {
      console.log(data.user);
      setUser(data.user);
      console.log('setUser: ', data.user);
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
    return localStorage.getItem('activeProfile');
  };
  const setActiveProfile = (profileClicked) => {
    localStorage.setItem('activeProfile', profileClicked);
  };
  const unsetActiveProfile = () => {
    setActiveProfile('');
  };

  const setToken = (token) => {
    localStorage.setItem('loginToken', token);
  };

  const value = {
    user,
    login,
    logout,
    getActiveProfile,
    setActiveProfile,
    unsetActiveProfile,
  };

  return (
    <LoginContext.Provider value={value}>{children}</LoginContext.Provider>
  );
}

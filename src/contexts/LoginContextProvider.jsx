import { createContext, useEffect, useState, useContext } from 'react';
import { useApi } from '../services/useApi';
import { BuildingsContext } from './BuildingsContextProvider';

export const LoginContext = createContext({});

export default function LoginContextProvider({ children }) {
  const [user, setUser] = useState([]);
  const [activeProfile, setActiveProfile] = useState('');

  useEffect(() => {
    const validateToken = async () => {
      const storageData = localStorage.getItem('loginToken');
      if (storageData) {
        const data = await api.validateToken(storageData);
        if (data.user) {
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
    if (data.user) {
      console.log(data.user.username, data.user.password, data.buildings);
      setUser(data.user);
      setToken(data.token);
      return true;
    }
    return false;
  };

  const logout = async () => {
    const data = await api.logout();
    setUser(null);
    setToken('');
  };

  const saveActiveProfile = (profileClicked) => {
    localStorage.setItem('activeProfile', profileClicked);
  };

  const setToken = (token) => {
    localStorage.setItem('loginToken', token);
  };

  const value = {
    user,
    login,
    logout,
    activeProfile,
    saveActiveProfile,
    setActiveProfile,
  };

  return (
    <LoginContext.Provider value={value}>{children}</LoginContext.Provider>
  );
}

import { api } from './axios';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';

import { auth } from '../configs/firebase';

export const useApi = () => ({
  login: async (email, password) => {
    try {
      const data = await signInWithEmailAndPassword(auth, email, password);
      console.log('login data:', data);
      return data;
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(errorCode);
      console.error(errorMessage);
      return false;
    }
    // const response = await api.post('/signin', { email, password });
    // return response.data
  },
  logout: async () => {
    try {
      await signOut(auth);
      console.log('sai');
    } catch (err) {
      console.error(err);
    }
    // const response = await api.post('/logout');
    // return response.data;
  },

  getBuildingInfo: (building) => {
    return {
      building: {
        nickname: building,
        url: 'https://placehold.co/400x500/736b66/403d39',
        osList: [
          {
            no: 123456,
            datetime: '01 Jan 1970 00:00:00 GMT',
            orderBy: 'Maria Silva',
            type: 'Manutenção Corretiva',
            local: `${building} 8º andar`,
          },
          {
            no: 234567,
            datetime: '01 Jan 1970 00:00:00 GMT',
            orderBy: 'José Pereira',
            type: 'Manutenção Preventiva',
            local: `${building} Ap 1109`,
          },
        ],
      },
    };
  },
  // const response = await api.get('/buildings', {nickname});
  // return response.data;
});

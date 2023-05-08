import { api } from './axios';

export const useApi = () => ({
  validateToken: async (token) => {
    return {
      user: {
        username: 'admin',
        passoword: 'admin',
        buildings: [
          {
            nickname: 'TowerOne',
            url: 'https://placehold.co/400x600/3292A8/403d39',
          },
          {
            nickname: 'TowerThree',
            url: 'https://placehold.co/400x600/3292A8/403d39',
          },
          {
            nickname: 'TowerFour',
            url: 'https://placehold.co/400x600/3292A8/403d39',
          },
        ],
      },
    };
    // const response = await api.post('/validate', { token });
    // return response.data;
  },
  login: async (email, passoword) => {
    return {
      user: {
        username: 'admin',
        passoword: 'admin',
        buildings: [
          {
            nickname: 'TowerOne',
            url: 'https://placehold.co/400x600/3292A8/403d39',
          },
          {
            nickname: 'TowerThree',
            url: 'https://placehold.co/400x600/3292A8/403d39',
          },
          {
            nickname: 'TowerFour',
            url: 'https://placehold.co/400x600/3292A8/403d39',
          },
        ],
      },
      token: '123456789',
    };
    // const response = await api.post('/signin', { email, passoword });
    // return response.data
  },
  logout: async () => {
    return {
      user: { username: 'admin', passoword: 'admin' },
      token: '123456789',
    };
    // const response = await api.post('/logout');
    // return response.data;
  },
  getBuildings: async (email) => {
    return {
      data: [
        {
          nickname: 'TowerOne',
          url: 'https://placehold.co/400x500/736b66/403d39',
        },
        {
          nickname: 'TowerTwo',
          url: 'https://placehold.co/400x500/736b66/403d39',
        },
        {
          nickname: 'TowerThree',
          url: 'https://placehold.co/400x500/736b66/403d39',
        },
        {
          nickname: 'TowerFour',
          url: 'https://placehold.co/400x500/736b66/403d39',
        },
      ],
    };
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

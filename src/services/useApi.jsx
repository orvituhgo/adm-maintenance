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
        setActiveProfile: (profile) => {
          this.activeProfile;
          return profile;
        },
        activeProfile: this.setActiveProfile,
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
    // const response = await api.get('/buildings', {email});
    // return response.data;
  },
});

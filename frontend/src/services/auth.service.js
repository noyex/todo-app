import api from '../utils/api';

export const AuthService = {
  signup: async (data) => {
    return await api.post('/auth/signup', data);
  },

  verify: async (data) => {
    return await api.post('/auth/verify', data);
  },

  login: async (data) => {
    const response = await api.post('/auth/login', data);
    return response.data;
  }
};
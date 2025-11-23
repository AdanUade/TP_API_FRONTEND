import { API_ENDPOINTS, TOKEN_KEY } from '../constants/apiConfig'
import api from './api'

const BASE_URL = API_ENDPOINTS.AUTH

export const register = async (registerRequest) => {
  const response = await api.post(`${BASE_URL}/register`, registerRequest)
  return response.data
}

export const authenticate = async (authRequest) => {
  const response = await api.post(`${BASE_URL}/authenticate`, authRequest)
  return response.data
}

export const saveToken = (accessToken) => {
  localStorage.setItem(TOKEN_KEY, accessToken)
}

export const getToken = () => {
    return localStorage.getItem(TOKEN_KEY);
};

export const removeToken = () => {
    localStorage.removeItem(TOKEN_KEY);
};

export const isAuthenticated = () => {
    return getToken() !== null;
};

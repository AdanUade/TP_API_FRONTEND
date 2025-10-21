import { API_ENDPOINTS, TOKEN_KEY } from '../constants/apiConfig';
import { handleApiResponse } from '../utils/apiHelpers';

const BASE_URL = API_ENDPOINTS.AUTH;

export const register = (registerRequest) => {
    return fetch(`${BASE_URL}/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(registerRequest)
    }).then(handleApiResponse);
};

export const authenticate = (authRequest) => {
    return fetch(`${BASE_URL}/authenticate`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(authRequest)
    }).then(handleApiResponse);
};

export const saveToken = (accessToken) => {
    localStorage.setItem(TOKEN_KEY, accessToken);
};

export const getToken = () => {
    return localStorage.getItem(TOKEN_KEY);
};

export const removeToken = () => {
    localStorage.removeItem(TOKEN_KEY);
};

export const isAuthenticated = () => {
    return getToken() !== null;
};

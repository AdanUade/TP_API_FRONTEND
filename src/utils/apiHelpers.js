import { getToken } from '../api/AuthApi';

export const getAuthHeaders = (token) => {
    const authToken = token || getToken();
    
    const headers = {
        'Content-Type': 'application/json',
    };
    
    if (authToken) {
        headers['Authorization'] = `Bearer ${authToken}`;
    }
    
    return headers;
};

export const getFormDataHeaders = (token) => {
    const authToken = token || getToken();
    
    const headers = {};
    
    if (authToken) {
        headers['Authorization'] = `Bearer ${authToken}`;
    }
    
    return headers;
};

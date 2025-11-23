import { TOKEN_KEY } from '../constants/apiConfig';

export const getAuthHeaders = (token) => {
    const authToken = token || localStorage.getItem(TOKEN_KEY);
    
    const headers = {
        'Content-Type': 'application/json',
    };
    
    if (authToken) {
        headers['Authorization'] = `Bearer ${authToken}`;
    }
    
    return headers;
};

export const getFormDataHeaders = (token) => {
    const authToken = token || localStorage.getItem(TOKEN_KEY);
    
    const headers = {};
    
    if (authToken) {
        headers['Authorization'] = `Bearer ${authToken}`;
    }
    
    return headers;
};
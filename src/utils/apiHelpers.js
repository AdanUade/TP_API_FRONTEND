import { TOKEN_KEY } from '../constants/apiConfig';

export const handleApiResponse = async (response) => {
    if (!response.ok) {
        try {
            const errorBody = await response.json();
            return Promise.reject(errorBody);
        } catch {
            return Promise.reject({
                message: `Error ${response.status}: ${response.statusText}`,
                status: response.status
            });
        }
    }
    
    if (response.status === 204) {
        return Promise.resolve(null);
    }
    
    const text = await response.text();
    if (!text) return Promise.resolve(null);

    try {
        return JSON.parse(text);
    } catch (e) {
        return text;
    }
};

export const buildQueryString = (params) => {
    const searchParams = new URLSearchParams();
    
    Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
            searchParams.append(key, value);
        }
    });
    
    const queryString = searchParams.toString();
    return queryString ? `?${queryString}` : '';
};

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
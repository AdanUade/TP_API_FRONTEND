import { API_ENDPOINTS } from '../constants/apiConfig';
import { 
    handleApiResponse, 
    buildQueryString, 
    getAuthHeaders 
} from '../utils/apiHelpers';

const BASE_URL = API_ENDPOINTS.USERS;

export const getAllUsers = ({ page, size } = {}) => {
    const queryString = buildQueryString({ page, size });
    const url = `${BASE_URL}${queryString}`;
    
    return fetch(url, {
        headers: getAuthHeaders()
    }).then(handleApiResponse);
};

export const getUserById = (id) => {
    return fetch(`${BASE_URL}/${id}`, {
        headers: getAuthHeaders()
    }).then(handleApiResponse);
};

export const getUserMe = () => {
    return fetch(`${BASE_URL}/me`, {
        method: 'GET',
        headers: getAuthHeaders()
    }).then(handleApiResponse);
};

export const createUser = (userRequest) => {
    return fetch(BASE_URL, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(userRequest)
    }).then(handleApiResponse);
};

export const updateUserMe = (userRequest) => {
    return fetch(`${BASE_URL}/me`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(userRequest)
    }).then(handleApiResponse);
};

export const updateUserRole = (id, rol) => {
    return fetch(`${BASE_URL}/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(rol)
    }).then(handleApiResponse);
};

export const deleteUser = (id) => {
    return fetch(`${BASE_URL}/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
    }).then(handleApiResponse);
};

export const validatePassword = (password) => {
    return fetch(`${BASE_URL}/validate-password`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ password })
    }).then(handleApiResponse);
};
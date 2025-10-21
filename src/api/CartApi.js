import { getAuthHeaders, handleApiResponse } from '../utils/apiHelpers';
import { API_ENDPOINTS } from '../constants/apiConfig';

const BASE_URL = API_ENDPOINTS.CART;

export const viewCart = () => {
    return fetch(`${BASE_URL}`, {
        method: 'GET',
        headers: getAuthHeaders()
    })
    .then(handleApiResponse);
};

export const addToCart = (productId, quantity) => {
    return fetch(`${BASE_URL}`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ productId, quantity })
    })
    .then(handleApiResponse);
};

export const updateCart = (productId, quantity) => {
    return fetch(`${BASE_URL}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify({ productId, quantity })
    })
    .then(handleApiResponse);
};

export const clearCart = () => {
    return fetch(`${BASE_URL}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
    })
    .then(handleApiResponse);
};

export const removeFromCart = (productId) => {
    return fetch(`${BASE_URL}/${productId}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
    })
    .then(handleApiResponse);
};
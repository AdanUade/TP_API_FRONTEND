import { getAuthHeaders, handleApiResponse } from '../utils/apiHelpers';
import { API_ENDPOINTS } from '../constants/apiConfig';

const BASE_URL = API_ENDPOINTS.ORDERS;

export const getMyOrders = () => {
    return fetch(`${BASE_URL}/me`, {
        method: 'GET',
        headers: getAuthHeaders()
    })
    .then(handleApiResponse);
};

export const getMyOrderById = (orderId) => {
    return fetch(`${BASE_URL}/me/${orderId}`, {
        method: 'GET',
        headers: getAuthHeaders()
    })
    .then(handleApiResponse);
};

export const createOrder = (orderRequest) => {
    return fetch(`${BASE_URL}`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(orderRequest)
    })
    .then(handleApiResponse);
};

export const updateMyOrder = (orderId, orderRequest) => {
    return fetch(`${BASE_URL}/me/${orderId}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(orderRequest)
    })
    .then(handleApiResponse);
};

export const getAllOrders = () => {
    return fetch(`${BASE_URL}/admin`, {
        method: 'GET',
        headers: getAuthHeaders()
    })
    .then(handleApiResponse);
};

export const getOrdersByUserId = (userId) => {
    return fetch(`${BASE_URL}/admin/${userId}`, {
        method: 'GET',
        headers: getAuthHeaders()
    })
    .then(handleApiResponse);
};

export const getOrderByUserIdAndOrderId = (userId, orderId) => {
    return fetch(`${BASE_URL}/admin/${userId}/${orderId}`, {
        method: 'GET',
        headers: getAuthHeaders()
    })
    .then(handleApiResponse);
};

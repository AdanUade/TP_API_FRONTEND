export const API_BASE_URL = 'http://localhost:8080';

export const API_ENDPOINTS = {
    AUTH: `${API_BASE_URL}/auth`,
    PRODUCTS: `${API_BASE_URL}/products`,
    USERS: `${API_BASE_URL}/users`,
    CART: `${API_BASE_URL}/carts`,
    ORDERS: `${API_BASE_URL}/orders`,
    IMAGES: `${API_BASE_URL}/images`,
};

export const DEFAULT_PAGINATION = {
    PAGE: 0,
    SIZE: 8,
    SIZE_LARGE: 100,
};

export const TOKEN_KEY = 'access_token';
import { API_ENDPOINTS, DEFAULT_PAGINATION } from '../constants/apiConfig';
import { 
    handleApiResponse, 
    buildQueryString, 
    getAuthHeaders, 
    getFormDataHeaders 
} from '../utils/apiHelpers';

const BASE_URL = API_ENDPOINTS.PRODUCTS;

export const getAllProducts = ({ page = DEFAULT_PAGINATION.PAGE, size = DEFAULT_PAGINATION.SIZE, sortByPrice }) => {
    const params = { page, size };
    if (sortByPrice && sortByPrice !== 'default') {
        params.sortByPrice = sortByPrice === 'price-asc' ? 'asc' : 'desc';
    }
    const queryString = buildQueryString(params);
    return fetch(`${BASE_URL}${queryString}`).then(handleApiResponse);
}

export const getProductsByCategory = ({ category, page = DEFAULT_PAGINATION.PAGE, size = DEFAULT_PAGINATION.SIZE, sortByPrice, onSale }) => {
    const params = { page, size, onSale: onSale ? 'true' : undefined };
    if (sortByPrice && sortByPrice !== 'default') {
        params.sortByPrice = sortByPrice === 'price-asc' ? 'asc' : 'desc';
    }
    const queryString = buildQueryString(params);
    return fetch(`${BASE_URL}/category/${category}${queryString}`).then(handleApiResponse);
};

export const getProductsOnSale = ({ page = DEFAULT_PAGINATION.PAGE, size = DEFAULT_PAGINATION.SIZE, sortByPrice }) => {
    const params = { page, size };
    if (sortByPrice && sortByPrice !== 'default') {
        params.sortByPrice = sortByPrice === 'price-asc' ? 'asc' : 'desc';
    }
    const queryString = buildQueryString(params);
    return fetch(`${BASE_URL}/sale${queryString}`).then(handleApiResponse);
};

export const getProductById = (productId) => {
    return fetch(`${BASE_URL}/${productId}`).then(handleApiResponse);
};

export const searchProducts = (query, page = DEFAULT_PAGINATION.PAGE, size = DEFAULT_PAGINATION.SIZE) => {
    const queryString = buildQueryString({ query, page, size });
    return fetch(`${BASE_URL}/search${queryString}`).then(handleApiResponse);
};

export const getProductsOutOfStock = ({ page = DEFAULT_PAGINATION.PAGE, size = DEFAULT_PAGINATION.SIZE_LARGE } = {}) => {
    const queryString = buildQueryString({ page, size });
    return fetch(`${BASE_URL}/out-of-stock${queryString}`).then(handleApiResponse);
};

export const createProduct = ({ productRequest, token }) => {
    return fetch(BASE_URL, {
        method: 'POST',
        headers: getAuthHeaders(token),
        body: JSON.stringify(productRequest),
    }).then(handleApiResponse);
};

export const createProductWithImage = ({ productRequest, image, token }) => {
    const formData = new FormData();
    formData.append('product', new Blob([JSON.stringify(productRequest)], { type: 'application/json' }));
    if (image) {
    formData.append('image', image);
}

return fetch(`${BASE_URL}/with-image`, {
    method: 'POST',
    headers: getFormDataHeaders(token),
    body: formData,
    }).then(handleApiResponse);
};

export const updateProduct = ({ productId, productRequest, token }) => {
    return fetch(`${BASE_URL}/${productId}`, {
    method: 'PUT',
    headers: getAuthHeaders(token),
    body: JSON.stringify(productRequest),
    }).then(handleApiResponse);
};

export const deleteProduct = ({ productId, token }) => {
    return fetch(`${BASE_URL}/${productId}`, {
    method: 'DELETE',
    headers: getAuthHeaders(token),
    }).then(handleApiResponse);
};
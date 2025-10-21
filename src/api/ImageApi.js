import { API_ENDPOINTS } from '../constants/apiConfig';
import { 
    handleApiResponse, 
    getAuthHeaders, 
    getFormDataHeaders 
} from '../utils/apiHelpers';

const BASE_URL = API_ENDPOINTS.IMAGES;

export const getImageById = (id) => {
    return fetch(`${BASE_URL}?id=${id}`).then(handleApiResponse);
};

export const uploadImage = ({ imageFile, productId, token }) => {
    const formData = new FormData();
    formData.append('image', imageFile);

    return fetch(`${BASE_URL}?productId=${productId}`, {
        method: 'POST',
        headers: getFormDataHeaders(token),
        body: formData,
    }).then(handleApiResponse);
};


export const deleteImage = ({ imageId, token }) => {
    return fetch(`${BASE_URL}/${imageId}`, {
        method: 'DELETE',
        headers: getAuthHeaders(token),
    }).then(handleApiResponse);
};

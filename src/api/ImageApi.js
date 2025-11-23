import { API_ENDPOINTS } from '../constants/apiConfig'
import {
  getAuthHeaders,
  getFormDataHeaders
} from '../utils/apiHelpers'
import api from './api'

const BASE_URL = API_ENDPOINTS.IMAGES

export const getImageById = async (id) => {
  const response = await api.get(`${BASE_URL}?id=${id}`)
  return response.data
}

export const uploadImage = async ({ imageFile, productId, token }) => {
  const formData = new FormData()
  formData.append('image', imageFile)

  const response = await api.post(`${BASE_URL}?productId=${productId}`, formData, {
    headers: {
      ...getFormDataHeaders(token),
      'Content-Type': 'multipart/form-data'
    }
  })
  return response.data
}

export const deleteImage = async ({ imageId, token }) => {
  const response = await api.delete(`${BASE_URL}/${imageId}`, { headers: getAuthHeaders(token) })
  return response.data
}

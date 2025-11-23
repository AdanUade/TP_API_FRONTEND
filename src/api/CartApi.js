import { getAuthHeaders } from '../utils/apiHelpers'
import { API_ENDPOINTS } from '../constants/apiConfig'
import api from './api'

const BASE_URL = API_ENDPOINTS.CART

export const viewCart = async () => {
  const response = await api.get(`${BASE_URL}`, { headers: getAuthHeaders() })
  return response.data
}

export const addToCart = async (productId, quantity) => {
  const response = await api.post(`${BASE_URL}`, { productId, quantity }, { headers: getAuthHeaders() })
  return response.data
}

export const updateCart = async (productId, quantity) => {
  const response = await api.put(`${BASE_URL}`, { productId, quantity }, { headers: getAuthHeaders() })
  return response.data
}

export const clearCart = async () => {
  const response = await api.delete(`${BASE_URL}`, { headers: getAuthHeaders() })
  return response.data
}

export const removeFromCart = async (productId) => {
  const response = await api.delete(`${BASE_URL}/${productId}`, { headers: getAuthHeaders() })
  return response.data
}
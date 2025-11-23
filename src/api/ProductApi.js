import { API_ENDPOINTS, DEFAULT_PAGINATION } from '../constants/apiConfig'
import {
  getAuthHeaders,
  getFormDataHeaders
} from '../utils/apiHelpers'
import api from './api'

const BASE_URL = API_ENDPOINTS.PRODUCTS

export const getAllProducts = async ({ page = DEFAULT_PAGINATION.PAGE, size = DEFAULT_PAGINATION.SIZE, sortByPrice }) => {
  const params = { page, size }
  if (sortByPrice && sortByPrice !== 'default') {
    params.sortByPrice = sortByPrice === 'price-asc' ? 'asc' : 'desc'
  }
  const response = await api.get(`${BASE_URL}`, { params })
  return response.data
}

export const getProductsByCategory = async ({ category, page = DEFAULT_PAGINATION.PAGE, size = DEFAULT_PAGINATION.SIZE, sortByPrice, onSale }) => {
  const params = { page, size, onSale: onSale ? 'true' : undefined }
  if (sortByPrice && sortByPrice !== 'default') {
    params.sortByPrice = sortByPrice === 'price-asc' ? 'asc' : 'desc'
  }
  const response = await api.get(`${BASE_URL}/category/${category}`, { params })
  return response.data
}

export const getProductsOnSale = async ({ page = DEFAULT_PAGINATION.PAGE, size = DEFAULT_PAGINATION.SIZE, sortByPrice }) => {
  const params = { page, size }
  if (sortByPrice && sortByPrice !== 'default') {
    params.sortByPrice = sortByPrice === 'price-asc' ? 'asc' : 'desc'
  }
  const response = await api.get(`${BASE_URL}/sale`, { params })
  return response.data
}

export const getProductById = async (productId) => {
  const response = await api.get(`${BASE_URL}/${productId}`)
  return response.data
}

export const searchProducts = async (query, page = DEFAULT_PAGINATION.PAGE, size = DEFAULT_PAGINATION.SIZE) => {
  const params = { query, page, size }
  const response = await api.get(`${BASE_URL}/search`, { params })
  return response.data
}

export const getProductsOutOfStock = async ({ page = DEFAULT_PAGINATION.PAGE, size = DEFAULT_PAGINATION.SIZE_LARGE } = {}) => {
  const params = { page, size }
  const response = await api.get(`${BASE_URL}/out-of-stock`, { params })
  return response.data
}

export const createProduct = async ({ productRequest, token }) => {
  const response = await api.post(BASE_URL, productRequest, { headers: getAuthHeaders(token) })
  return response.data
}

export const createProductWithImage = async ({ productRequest, image, token }) => {
  const formData = new FormData()
  formData.append('product', new Blob([JSON.stringify(productRequest)], { type: 'application/json' }))
  if (image) {
    formData.append('image', image)
  }

  const response = await api.post(`${BASE_URL}/with-image`, formData, {
    headers: {
      ...getFormDataHeaders(token),
      'Content-Type': 'multipart/form-data'
    }
  })
  return response.data
}

export const updateProduct = async ({ productId, productRequest, token }) => {
  const response = await api.put(`${BASE_URL}/${productId}`, productRequest, { headers: getAuthHeaders(token) })
  return response.data
}

export const deleteProduct = async ({ productId, token }) => {
  const response = await api.delete(`${BASE_URL}/${productId}`, { headers: getAuthHeaders(token) })
  return response.data
}
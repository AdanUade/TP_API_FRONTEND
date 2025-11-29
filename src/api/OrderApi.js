import { API_ENDPOINTS } from '../constants/apiConfig'
import api from './api'

const BASE_URL = API_ENDPOINTS.ORDERS

export const getMyOrders = async () => {
  const response = await api.get(`${BASE_URL}/me`)
  return response.data
}

export const getMyOrderById = async (orderId) => {
  const response = await api.get(`${BASE_URL}/me/${orderId}`)
  return response.data
}

export const createOrder = async (orderRequest) => {
  const response = await api.post(`${BASE_URL}`, orderRequest)
  return response.data
}

export const updateMyOrder = async (orderId, orderRequest) => {
  const response = await api.put(`${BASE_URL}/me/${orderId}`, orderRequest)
  return response.data
}

export const getAllOrders = async () => {
  const response = await api.get(`${BASE_URL}/admin`)
  return response.data
}

export const getOrdersByUserId = async (userId) => {
  const response = await api.get(`${BASE_URL}/admin/${userId}`)
  return response.data
}

export const getOrderByUserIdAndOrderId = async (userId, orderId) => {
  const response = await api.get(`${BASE_URL}/admin/${userId}/${orderId}`)
  return response.data
}

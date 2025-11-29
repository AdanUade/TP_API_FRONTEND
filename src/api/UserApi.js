import { API_ENDPOINTS } from '../constants/apiConfig'
import api from './api'

const BASE_URL = API_ENDPOINTS.USERS

export const getAllUsers = async ({ page, size } = {}) => {
  const params = { page, size }
  const response = await api.get(`${BASE_URL}`, { params })
  return response.data
}

export const getUserById = async (id) => {
  const response = await api.get(`${BASE_URL}/${id}`)
  return response.data
}

export const getUserMe = async () => {
  const response = await api.get(`${BASE_URL}/me`)
  return response.data
}

export const createUser = async (userRequest) => {
  const response = await api.post(BASE_URL, userRequest)
  return response.data
}

export const updateUserMe = async (userRequest) => {
  const response = await api.put(`${BASE_URL}/me`, userRequest)
  return response.data
}

export const updateUserRole = async (id, rol) => {
  const response = await api.put(`${BASE_URL}/${id}`, rol)
  return response.data
}

export const deleteUser = async (id) => {
  const response = await api.delete(`${BASE_URL}/${id}`)
  return response.data
}

export const validatePassword = async (password) => {
  const response = await api.post(`${BASE_URL}/validate-password`, { password })
  return response.data
}
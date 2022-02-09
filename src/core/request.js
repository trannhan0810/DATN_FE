/* eslint-disable no-param-reassign */
import axios from 'axios'
import qs from 'qs'
import { removeToken, getToken } from './token'

// http://api-development.patience.vn/swagger/index.html

export const baseUrl = 'http://api-development.patience.vn/api'

const request = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL || baseUrl,
  timeout: 500000,
  paramsSerializer: params => {
    return qs.stringify(params, { encode: true })
  },
})

request.interceptors.request.use(
  config => {
    const token = getToken()
    if (token) {
      config.headers.authorization = `Bearer ${token}`
    }
    return config
  },
  error => {
    return Promise.reject(error.response || error.message)
  },
)

request.interceptors.response.use(
  response => {
    return response.data
  },
  error => {
    if (error?.response?.status === 401) {
      // removeToken()
      window.location.reload()
    }
    if (error?.response?.status === 404) {
      const message = '404 Not Found'
      return Promise.reject(message)
    }

    if (error?.response?.status === 403) {
      const message = 'Bạn không được phép thực hiện hành vi này'
      return Promise.reject(message)
    }
    return Promise.reject(error.response.data || error.message)
  },
)

export default request

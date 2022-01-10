export const STORAGE_KEY = 'telesale-token'

export const getToken = () => localStorage.getItem(STORAGE_KEY) ?? ''
export const removeToken = () => localStorage.removeItem(STORAGE_KEY)
export const setToken = token => localStorage.setItem(STORAGE_KEY, token)

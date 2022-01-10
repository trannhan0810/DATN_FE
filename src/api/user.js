import request from 'core/request'

export const getUsers = params => request.get('Users', { params })
export const getUser = ({ id }) => request.get(`Users/${id}`)

export const postUser = params => request.post('Users', params)
export const putUser = params => request.put(`Users/${params.id}`, params)
export const changeUserStatus = id => request.patch(`Users/status/${id}`, { id })
export const getRoles = () => request.get('Roles')

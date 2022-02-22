import request from 'core/request'

export const getUsers = params => request.get('api/v1/users', { params })
export const getUser = ({ id }) => request.get(`api/v1/users/${id}`)

export const postUser = params => request.post('api/v1/users', params)
export const putUser = params => request.put(`api/v1/users/${params.id}`, params)
export const changeUserStatus = id => request.patch(`Users/status/${id}`, { id })
export const getRoles = () => request.get('Roles')

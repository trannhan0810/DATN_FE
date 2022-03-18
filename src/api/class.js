import request from 'core/request'

export const getClasses = params => request.get(`api/v1/classes`, { params })

export const getClassesMe = params => request.get(`api/v1/classes/me`, { params })

export const getClass = id => request.get(`api/v1/classes/${id}`)

export const postClass = data =>
  request.post('api/v1/classes', {
    name: data.name,
    avatar: data.avatar,
    policy: data.policy,
  })

export const joinClassApi = data =>
  request.post('api/v1/classes/join', {
    code: data.code,
  })

export const putClass = (id, data) =>
  request.put(`api/v1/classes/${id}`, {
    name: data.name,
    avatar: data.avatar,
    policy: data.policy,
  })

export const deleteClass = id => request.delete(`api/v1/classes/${id}`)

export const getClassMembers = (id, params) => request.get(`api/v1/classes/${id}/members`, { params })

export const addClassMember = ({ id, userId, isOwner }) =>
  request.post(`api/v1/classes/${id}/members`, { userId, isOwner })

export const removeClassMember = ({ id, userId }) => request.delete(`api/v1/classes/${id}/members`, { userId })

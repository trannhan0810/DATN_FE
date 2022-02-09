import request from 'core/request'

export const getClasses = params => request.get(`api/v1/classes`, { params })

export const getClassById = id => request.get(`api/v1/classes/${id}`)

export const createClass = data =>
  request.post('api/v1/classes', {
    name: data.name,
    avatar: data.avatar,
  })

export const updateClass = (id, data) =>
  request.put(`api/v1/classes/${id}`, {
    name: data.name,
    avatar: data.avatar,
  })

export const deleteClass = id => request.delete(`api/v1/classes/${id}`)

import request from 'core/request'

export const getChatMsgs = params => request.get(`api/v1/classes`, { params })

export const sendChatMsg = data =>
  request.post('api/v1/classes', {
    name: data.name,
    avatar: data.avatar,
  })

export const addUser = (id, data) =>
  request.put(`api/v1/classes/${id}`, {
    name: data.name,
    avatar: data.avatar,
  })

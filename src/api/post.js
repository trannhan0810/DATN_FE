import request from 'core/request'

export const getClassPosts = (classId, params) => request.get(`api/v1/classes/${classId}/posts`, { params })

export const createClassPost = ({ title, content, classId }) =>
  request.post(`api/v1/classes/${classId}/posts`, { title, content })

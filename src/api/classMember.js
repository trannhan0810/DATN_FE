import request from 'core/request'

export const getClassMembers = params => request.get('api/v1/classes_members', { params })

export const addClassMember = data =>
  request.post('api/v1/classes_members', {
    userId: data.userId,
    classId: data.classId,
  })

export const removeClassMember = id => request.delete(`api/v1/classes_members/${id}`)

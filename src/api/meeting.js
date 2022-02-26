import request from 'core/request'

// const data = { room: roomId, chat: chatId, admin: user.email }
// response => success ||failure
export const createNewMeeting = data => request.post('/new_meeting', data)

// const data = { room: roomId }
// response => { status: failure }
export const checkExistMeeting = data => request.post('/existing_meeting', data)

export const getClassMeetings = (classId, params) => request.get(`/api/v1/classes/${classId}/meetings`, { params })

export const createMeeting = ({ classId }) => request.post(`/api/v1/meetings`, { classId })

import request from 'core/request'

// const data = { room: roomId, chat: chatId, admin: user.email }
// response => success ||failure
export const createNewMeeting = data => request.post('/new_meeting', data)

// const data = { room: roomId }
// response => { status: failure }
export const checkExistMeeting = data => request.post('/existing_meeting', data)

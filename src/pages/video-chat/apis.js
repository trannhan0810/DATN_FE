import moment from 'moment'
import request from '../../core/request'

export const createUser = async (email, firstName, lastName) => {
  try {
    const response = await request.post('/create_user', {
      username: email,
      first_name: firstName,
      last_name: 'lastName',
      email,
    })
    return response.data.id
  } catch (error) {
    // console.log(error);
  }
}

export const createChat = async (roomId, admin, name) => {
  try {
    const userName = name?.length > 0 ? name : admin
    console.log(roomId, admin, name)
    const today = new Date()
    const formattedDate = moment(today).format('MMMM Do YYYY, h:mm:ss a')
    const response = await request.post('/create_chat', {
      title: `${userName}'s Meeting@${formattedDate}: Room=${roomId}`,
      admin_username: admin, // one who creates the meeting
    })
    console.log(response)
    return response.id // return the chat id
  } catch (error) {
    console.log(error)
  }
}

export const deleteChat = async (admin, chatId) => {
  try {
    await request.post('/delete_chat', {
      admin_username: admin, // one who creates the meeting,
      chat_id: chatId,
    })
  } catch (error) {
    // console.log(error);
  }
}

export const addUser = async (userName, chatId) => {
  try {
    await request.post('/add_user', {
      username: userName,
      chatId,
    })
  } catch (error) {
    // console.log(error);
  }
}

export const getChatMsgs = async roomId => {
  try {
    const response = await request.post('/get_chat_msgs', {
      room: roomId,
    })
    return response
  } catch (error) {
    // console.log(error);
  }
}

export const sendChatMsg = async (roomId, userName, msg) => {
  try {
    await request.post('/post_chat_msg', {
      room: roomId,
      username: userName,
      text: msg,
    })
  } catch (error) {
    // console.log(error);
  }
}

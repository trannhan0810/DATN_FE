import { useState } from 'react'
import { v4 as uuid } from 'uuid'
import useRouter from './useRouter'
import { createChat, createUser, deleteChat } from 'pages/meeting/apis'
import { getCurrentUser } from 'core/currentUser'
import { showError } from 'core/tools'
import { checkExistMeeting, createNewMeeting } from 'api/meeting'

const useMeeting = () => {
  const silenceAudio = new Audio('/sounds/silence.mp3')
  const errorAudio = new Audio('/sounds/error.mp3')
  const [loading, setLoading] = useState(false)
  const { history } = useRouter()

  const startNewMeeting = async () => {
    const user = getCurrentUser() && JSON.parse(getCurrentUser())
    setLoading(true)
    const roomId = uuid()
    const userId = await createUser(user.email, user.fullName, '')
    const chatId = await createChat(roomId, user.email, user.fullName)
    if (!chatId) {
      // errorAudio.play()
      showError('connection timed out')
      setLoading(false)
    } else {
      // chat created successfully
      try {
        const data = { room: roomId, chat: chatId, admin: user.email }
        const response = await createNewMeeting(data)
        if (response === 'success') {
          setLoading(false)
          history.push({
            pathname: `/meeting/room/${roomId}`,
            state: { authorised: true, admin: true },
          })
        } else {
          // errorAudio.play()
          showError('meet creation failed')
          await deleteChat(user.email, chatId)
          setLoading(false)
        }
      } catch (error) {
        console.log(error)
        // errorAudio.play()
        showError('connection timed out')
        await deleteChat(user.email, chatId)
        setLoading(false)
      }
    }
  }

  const handleExistingMeetJoin = async (direct, roomId) => {
    setLoading(true)

    // check if the meeting link is valid i.e. contains atleast one user
    try {
      const response = await checkExistMeeting('/existing_meeting', {
        room: roomId,
      })
      if (response.status === 'failure') {
        setLoading(false)
        // errorAudio.play()
        showError('Meeting link invalid')
      } else {
        setLoading(false)
        history.push({
          pathname: `/videochat/room/${roomId}`,
          state: { authorised: true, admin: false },
        })
      }
    } catch (err) {
      console.log(err)
      setLoading(false)
      // errorAudio.play()
      showError('connection timed out')
    }
  }

  return { loading, startNewMeeting, handleExistingMeetJoin }
}

export default useMeeting

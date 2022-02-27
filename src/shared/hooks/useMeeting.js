import { useState } from 'react'
import { v4 as uuid } from 'uuid'
import useRouter from './useRouter'
import { createChat, createUser, deleteChat } from 'pages/meeting/apis'
import { getCurrentUser } from 'core/currentUser'
import { showError } from 'core/tools'
import { checkExistMeeting, createNewMeeting, createMeeting } from 'api/meeting'

const useMeeting = () => {
  const silenceAudio = new Audio('/sounds/silence.mp3')
  const errorAudio = new Audio('/sounds/error.mp3')
  const [loading, setLoading] = useState(false)
  const { history } = useRouter()

  const startMeeting = async classId => {
    setLoading(true)
    try {
      const meeting = await createMeeting({ classId })
      if (!meeting) {
        // errorAudio.play()
        showError('meet creation failed')
        setLoading(false)
      } else {
        const { roomId } = meeting
        setLoading(false)
        history.push({
          pathname: `/meeting/room/${roomId}`,
          state: { authorised: true, admin: true },
        })
      }
    } catch (err) {
      console.log(err)
      setLoading(false)
      // errorAudio.play()
      showError('connection timed out')
    }
  }

  const handleExistingMeetJoin = async (direct, roomId) => {
    setLoading(true)
    // check if the meeting link is valid i.e. contains atleast one user
    try {
      const response = await checkExistMeeting({
        room: roomId,
      })
      if (response.status === 'failure') {
        setLoading(false)
        // errorAudio.play()
        showError('Meeting link invalid')
      } else {
        setLoading(false)
        history.push({
          pathname: `/meeting/room/${roomId}`,
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

  return { loading, handleExistingMeetJoin, startMeeting }
}

export default useMeeting

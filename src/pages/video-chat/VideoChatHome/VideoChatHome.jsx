/* eslint-disable no-use-before-define */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/button-has-type */
import React, { useState, useEffect } from 'react'
// import { useAuth0 } from '@auth0/auth0-react'
import { v1 as uuid } from 'uuid'
import axios from 'axios'
import { createChat, createUser, deleteChat } from '../apis'
import AlertDialog from '../popups/AlertDialog'
import './VideoChatHome.scss'
import request from '../../../core/request'
import PropTypes from 'prop-types'
import { getCurrentUser } from 'core/currentUser'
import { createNewMeeting } from 'api/meeting'

const VideoChatHome = props => {
  const silenceAudio = new Audio('/sounds/silence.mp3')
  const errorAudio = new Audio('/sounds/error.mp3')
  const [popup, setPopup] = useState('')
  const [link, setLink] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    silenceAudio.autoplay = true
    setTimeout(() => {
      if (localStorage.getItem('room')) {
        setLoading(true)
        const roomId = localStorage.getItem('room')
        localStorage.removeItem('room')
        handleExistingMeetJoin(false, roomId)
      }
    }, 500)
  }, [])

  const handleInputChange = event => {
    setLink(event.target.value)
  }

  const startNewMeeting = async () => {
    setLoading(true)
    const roomId = uuid()
    const user = getCurrentUser() && JSON.parse(getCurrentUser())
    const userId = await createUser(user.email, user.fullName, '')
    const chatId = await createChat(roomId, user.email, user.fullName)
    if (!chatId) {
      setLink('')
      errorAudio.play()
      setPopup('connection timed out')
      setLoading(false)
    } else {
      // chat created successfully
      try {
        const data = { room: roomId, chat: chatId, admin: user.email }
        const response = await createNewMeeting(data)
        if (response === 'success') {
          setLoading(false)
          props.history.push({
            pathname: `/videochat/room/${roomId}`,
            state: { authorised: true, admin: true },
          })
        } else {
          setLink('')
          errorAudio.play()
          setPopup('meet creation failed')
          await deleteChat(user.email, chatId)
          setLoading(false)
        }
      } catch (error) {
        setLink('')
        errorAudio.play()
        setPopup('connection timed out')
        await deleteChat(user.email, chatId)
        setLoading(false)
      }
    }
  }

  const handleExistingMeetJoin = async (direct, room) => {
    if (direct) setLoading(true)
    const roomId = direct ? link : room

    // check if the meeting link is valid i.e. contains atleast one user
    try {
      console.log(roomId)
      const response = await request.post('/existing_meeting', {
        room: roomId,
      })
      if (response.status === 'failure') {
        setLink('')
        setLoading(false)
        errorAudio.play()
        setPopup('Meeting link invalid')
      } else {
        // join the user in
        setLink('')
        setLoading(false)
        props.history.push({
          pathname: `/videochat/room/${roomId}`,
          state: { authorised: true, admin: false },
        })
      }
    } catch (err) {
      console.log(err)
      setLink('')
      setLoading(false)
      errorAudio.play()
      setPopup('connection timed out')
    }
  }

  if (popup === 'connection timed out') {
    return (
      <AlertDialog
        title="ERR Connection Timed Out!"
        message="Please check your internet connection and try again."
        showLeft={false}
        showRight
        auto={false}
        btnTextRight="Ok"
        onClose={() => setPopup('')}
        onRight={() => setPopup('')}
      />
    )
  }

  if (popup === 'meet creation failed') {
    return (
      <AlertDialog
        title="Meet creation failed!"
        message="There was a problem in your meeting creation. Please try again."
        showLeft={false}
        showRight
        auto
        time={5000}
        btnTextRight="Ok"
        onClose={() => setPopup('')}
        onRight={() => setPopup('')}
      />
    )
  }

  if (popup === 'Meeting link invalid') {
    return (
      <AlertDialog
        title="Meeting code invalid!"
        message="The meeting code you entered is invalid. Please check the code properly and try again."
        showLeft={false}
        showRight
        auto
        time={5000}
        btnTextRight="Ok"
        onClose={() => setPopup('')}
        onRight={() => setPopup('')}
      />
    )
  }

  return (
    <div className="home-page">
      <center style={{ marginTop: '120px' }}>
        <div className="body">
          <div className="left-side">
            <div className="content">
              <div className="action-btn">
                <button className="btn" onClick={startNewMeeting}>
                  New Meeting
                </button>
                <div className="input-block">
                  <div className="input-section">
                    <input placeholder="Enter meeting code" onChange={handleInputChange} />
                  </div>
                  <button
                    className="btn no-bg"
                    onClick={() => handleExistingMeetJoin(true, 0)}
                    style={{ display: link.length > 0 ? 'block' : 'none' }}
                  >
                    Join
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </center>
    </div>
  )
}

VideoChatHome.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func }),
}

export default VideoChatHome

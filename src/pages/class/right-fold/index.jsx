/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { VideoCameraOutlined } from '@ant-design/icons'
import { Tooltip } from 'antd'
import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import './right-fold.css'
import { v1 as uuid } from 'uuid'
import PropTypes from 'prop-types'
import { getCurrentUser } from 'core/currentUser'
import { createChat, createUser, deleteChat } from 'pages/video-chat/apis'
import { showError } from 'core/tools'
import { checkExistMeeting, createNewMeeting } from 'api/meeting'

function RightFold(props) {
  const [loading, setLoading] = useState(false)
  const [link, setLink] = useState('')
  const silenceAudio = new Audio('/sounds/silence.mp3')
  const errorAudio = new Audio('/sounds/error.mp3')
  const user = getCurrentUser() && JSON.parse(getCurrentUser())
  const history = useHistory()

  const startNewMeeting = async () => {
    setLoading(true)
    const roomId = uuid()
    const userId = await createUser(user.email, user.fullName, '')
    const chatId = await createChat(roomId, user.email, user.fullName)
    if (!chatId) {
      setLink('')
      errorAudio.play()
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
          setLink('')
          errorAudio.play()
          showError('meet creation failed')
          await deleteChat(user.email, chatId)
          setLoading(false)
        }
      } catch (error) {
        console.log(error)
        setLink('')
        errorAudio.play()
        showError('connection timed out')
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
      const response = await checkExistMeeting('/existing_meeting', {
        room: roomId,
      })
      if (response.status === 'failure') {
        setLink('')
        setLoading(false)
        errorAudio.play()
        showError('Meeting link invalid')
      } else {
        setLink('')
        setLoading(false)
        history.push({
          pathname: `/videochat/room/${roomId}`,
          state: { authorised: true, admin: false },
        })
      }
    } catch (err) {
      console.log(err)
      setLink('')
      setLoading(false)
      errorAudio.play()
      showError('connection timed out')
    }
  }

  return (
    <div className="rightFold">
      <div className="rightFold-heading">
        <div>
          <label className="heading-label">Classes</label>
          <label className="heading-sub-label">Chat</label>
          <label className="heading-sub-label">Member</label>
        </div>
        <div className="contact-search">
          <input className="no-outline" placeholder="Find a class" />
          <div className="contact-search-icon">
            <i className="fi-rr-search" />
          </div>
        </div>
        <div className="flex justify-end btn-list">
          <Tooltip className="add-button" onClick={startNewMeeting}>
            <VideoCameraOutlined className="add-icon" />
            <label className="add-label">Meet</label>
          </Tooltip>
        </div>
      </div>
      {/* <div className="contact-list">
        {contacts.map(item => {
          return <ContactCard key={item.id} item={item} />
        })}
      </div> */}
    </div>
  )
}

RightFold.propTypes = {}

export default RightFold

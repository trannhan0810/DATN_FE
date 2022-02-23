/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { VideoCameraOutlined } from '@ant-design/icons'
import { Avatar, Tabs, Tooltip } from 'antd'
import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { v1 as uuid } from 'uuid'
import PropTypes from 'prop-types'
import { Send } from '@mui/icons-material'
import ClassMessenger from '../component/ClassMessenger'
import ClassMemberList from '../component/ClassMemberList'
import ClassMeetingList from '../component/ClassMeetingList'
import ClassInfoLayoutWrapper from './style'
import { getCurrentUser } from 'core/currentUser'
import { createChat, createUser, deleteChat } from 'pages/meeting/apis'
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

  const tabData = [
    { displayText: 'Chat', component: <ClassMessenger /> },
    { displayText: 'Meetings', component: <ClassMeetingList /> },
    { displayText: 'Members', component: <ClassMemberList /> },
    { displayText: 'Setting', component: <div /> },
  ]

  return (
    <ClassInfoLayoutWrapper>
      <div className="rightFold-header">
        <div className="rightFold-class-name">Classes</div>
        <div className="rightFold-heading-right">
          <Tooltip className="add-button" onClick={startNewMeeting}>
            <VideoCameraOutlined className="add-icon" />
            <label className="add-label">Meet</label>
          </Tooltip>
        </div>
      </div>

      <div className="rightFold-content">
        <Tabs
          defaultActiveKey={1}
          tabPosition="top"
          tabBarStyle={{ height: '40px', width: '100%', margin: 0, borderBottom: '2px solid lightgray' }}
          style={{ height: '100%', width: '100%' }}
        >
          {tabData.map((_ele, i) => (
            <Tabs.TabPane
              className="class-content"
              tab={tabData[i].displayText}
              key={Number(i)}
              style={{ flex: '1 1 0px' }}
            >
              {tabData[i].component}
            </Tabs.TabPane>
          ))}
        </Tabs>
      </div>
    </ClassInfoLayoutWrapper>
  )
}

RightFold.propTypes = {}

export default RightFold

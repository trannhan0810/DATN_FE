import React, { useState } from 'react'
import './Messenger.scss'
import DOMPurify from 'dompurify'
import { IconButton, Tooltip as MyToolTip } from '@mui/material'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import PropTypes from 'prop-types'
import { formatTime } from '../../../shared/utils/date'

const Messenger = ({ setIsMessenger, sendMsg, messageList }) => {
  const [msg, setMsg] = useState('')

  const handleChangeMsg = e => {
    setMsg(e.target.value)
  }

  const handleKeyDown = e => {
    if (e.key === 'Enter') {
      sendMsg(msg)
      setMsg('')
    }
  }

  const handleSendMsg = () => {
    if (msg.length > 0) sendMsg(msg)
    setMsg('')
  }

  return (
    <div className="messenger-container">
      <div className="messenger-header">
        <h3>Meeting Chat</h3>
        <CloseOutlinedIcon
          onClick={() => {
            setIsMessenger(false)
          }}
        />
      </div>

      <div className="messenger-header-tabs" />

      <div className="chat-section">
        {messageList.map(item => (
          <div key={item.time} className="chat-block">
            <div className="sender">
              {item.user} <small>{formatTime(item.time)}</small>
            </div>
            <p
              className="msg"
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(item.msg),
              }}
            />
          </div>
        ))}
      </div>

      <div className="send-msg-section">
        <input
          placeholder="Send a message to everyone"
          value={msg}
          onChange={e => handleChangeMsg(e)}
          onKeyDown={e => handleKeyDown(e)}
        />

        <MyToolTip title={msg.length > 0 ? 'Send Message' : ''}>
          <IconButton
            disabled={!(msg.length > 0)}
            onClick={handleSendMsg}
            style={{
              cursor: msg.length > 0 ? 'pointer' : 'default',
              fontSize: '20px',
            }}
          >
            <span
              className="material-icons-sharp"
              style={{
                color: msg.length > 0 ? '#0e7878' : 'grey',
                fontSize: '32px',
              }}
            >
              send
            </span>
          </IconButton>
        </MyToolTip>
      </div>
    </div>
  )
}

Messenger.propTypes = {
  setIsMessenger: PropTypes.func,
  sendMsg: PropTypes.func,
  messageList: PropTypes.arrayOf(
    PropTypes.shape({
      time: PropTypes.number,
      user: PropTypes.string,
      msg: PropTypes.string,
    }),
  ),
}

export default Messenger

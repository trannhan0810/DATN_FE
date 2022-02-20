import { Close, Send } from '@mui/icons-material'
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import MessengerWrapper from './style'
import { formatTime } from 'shared/utils/date'

const MessengerBox = ({ sendMsg, messageList, closeMessenger }) => {
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
    <MessengerWrapper>
      <div className="mess-container">
        <div className="mess-header">
          <h3>Messenger</h3>
          <Close onClick={closeMessenger} />
        </div>
        <div className="mess-body">
          {messageList.map(item => {
            return (
              <div key={item.time} className="chat-block">
                <div className="sender">
                  {item.user} <small>{formatTime(item.time)}</small>
                </div>
                <p className="msg">{item.msg}</p>
              </div>
            )
          })}
        </div>
        <div className="mess-footer">
          <input
            placeholder="Send a message to everyone"
            value={msg}
            onChange={e => handleChangeMsg(e)}
            onKeyDown={e => handleKeyDown(e)}
          />
          <Send disabled={!(msg.length > 0)} onClick={handleSendMsg} />
        </div>
      </div>
    </MessengerWrapper>
  )
}

MessengerBox.propTypes = {
  sendMsg: PropTypes.func,
  messageList: PropTypes.arrayOf(
    PropTypes.shape({
      time: PropTypes.number,
      user: PropTypes.string,
      msg: PropTypes.string,
    }),
  ),
  closeMessenger: PropTypes.func,
}

export default MessengerBox

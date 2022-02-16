import { Close, Send } from '@mui/icons-material'
import React from 'react'
import MessengerWrapper from './style'

const MessengerBox = () => {
  return (
    <MessengerWrapper>
      <div className="mess-container">
        <div className="mess-header">
          <h3>Messenger</h3>
          <Close />
        </div>
        <div className="mess-body">
          <div className="chat-block">
            <div className="sender">
              You <small>12:00 AM</small>
            </div>
            <p className="msg">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
              ea commodo consequat.
            </p>
          </div>
          <div className="chat-block">
            <div className="sender">
              Me <small>13:00 AM</small>
            </div>
            <p className="msg">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
              ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
              laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit,
              sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>
        </div>
        <div className="mess-footer">
          <input />
          <Send />
        </div>
      </div>
    </MessengerWrapper>
  )
}

export default MessengerBox

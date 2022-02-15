import React from 'react'
import PropsTypes from 'prop-types'
import { ChatBubbleOutline, ChatOutlined, MarkUnreadChatAltOutlined } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import { Tooltip } from 'antd'
import ControlButtonWrapper from './style'

const MessengerButton = props => {
  const { isShowMessenger, isHaveNewMessage, onClick } = props
  const title = isHaveNewMessage ? 'Unread messages' : 'Chat with Everyone'
  const icon = isHaveNewMessage ? <MarkUnreadChatAltOutlined /> : <ChatOutlined />

  return (
    <ControlButtonWrapper>
      <Tooltip title={title}>
        <IconButton onClick={onClick} className="grey">
          {isShowMessenger ? <ChatBubbleOutline /> : icon}
        </IconButton>
      </Tooltip>
    </ControlButtonWrapper>
  )
}

MessengerButton.propTypes = {
  isShowMessenger: PropsTypes.bool,
  isHaveNewMessage: PropsTypes.bool,
  onClick: PropsTypes.func,
}

export default MessengerButton

import React from 'react'
import PropsTypes from 'prop-types'
import { VideocamOffOutlined, VideocamOutlined } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import { Tooltip } from 'antd'
import ControlButtonWrapper from './style'

const VideoButton = props => {
  const { isVideoMuted, onClick } = props
  return (
    <ControlButtonWrapper>
      <Tooltip title={isVideoMuted ? 'Turn on Camera' : 'Turn off Camera'}>
        <IconButton onClick={onClick} className={`${isVideoMuted ? 'red' : 'grey'}`}>
          {isVideoMuted ? <VideocamOffOutlined /> : <VideocamOutlined />}
        </IconButton>
      </Tooltip>
    </ControlButtonWrapper>
  )
}

VideoButton.propTypes = {
  isVideoMuted: PropsTypes.bool,
  onClick: PropsTypes.func,
}

export default VideoButton

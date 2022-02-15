import React from 'react'
import PropsTypes from 'prop-types'
import { Mic, MicOff } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import { Tooltip } from 'antd'
import ControlButtonWrapper from './style'

const AudioButton = props => {
  const { isAudioMuted, onClick } = props
  return (
    <ControlButtonWrapper>
      <Tooltip title={isAudioMuted ? 'Turn on Microphone' : 'Turn off Microphone'}>
        <IconButton onClick={onClick} className={`${isAudioMuted ? 'red' : 'grey'}`}>
          {isAudioMuted ? <MicOff /> : <Mic />}
        </IconButton>
      </Tooltip>
    </ControlButtonWrapper>
  )
}

AudioButton.propTypes = {
  isAudioMuted: PropsTypes.bool,
  onClick: PropsTypes.func,
}

export default AudioButton

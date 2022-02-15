import React from 'react'
import PropsTypes from 'prop-types'
import { CallEnd } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import { Tooltip } from 'antd'
import ControlButtonWrapper from './style'

const CallEndButton = props => {
  const { onClick } = props
  return (
    <ControlButtonWrapper>
      <Tooltip title="Hang Up">
        <IconButton onClick={onClick} className="red">
          <CallEnd />
        </IconButton>
      </Tooltip>
    </ControlButtonWrapper>
  )
}

CallEndButton.propTypes = {
  onClick: PropsTypes.func,
}

export default CallEndButton

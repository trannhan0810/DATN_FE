import React from 'react'
import PropsTypes from 'prop-types'
import { CancelPresentationOutlined, PresentToAllOutlined } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import { Tooltip } from 'antd'
import ControlButtonWrapper from './style'

const ShareScreenButton = props => {
  const { isScreenShared, onClick } = props
  return (
    <ControlButtonWrapper>
      <Tooltip title={isScreenShared ? 'Stop Presenting' : 'Present Now'}>
        <IconButton onClick={onClick} className={`${isScreenShared ? 'cyan' : 'grey'}`}>
          {isScreenShared ? <CancelPresentationOutlined /> : <PresentToAllOutlined />}
        </IconButton>
      </Tooltip>
    </ControlButtonWrapper>
  )
}

ShareScreenButton.propTypes = {
  isScreenShared: PropsTypes.bool,
  onClick: PropsTypes.func,
}

export default ShareScreenButton

import React from 'react'
import PropsTypes from 'prop-types'
import { ContentCopyOutlined } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import { Tooltip } from 'antd'
import ControlButtonWrapper from './style'

const CopyIdButton = props => {
  const { onClick } = props
  return (
    <ControlButtonWrapper>
      <Tooltip title="Copy invite code">
        <IconButton onClick={onClick} className="grey">
          <ContentCopyOutlined />
        </IconButton>
      </Tooltip>
    </ControlButtonWrapper>
  )
}

CopyIdButton.propTypes = {
  onClick: PropsTypes.func,
}

export default CopyIdButton

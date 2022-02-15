import React from 'react'
import PropsTypes from 'prop-types'
import { People, PeopleOutline } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import { Tooltip } from 'antd'
import ControlButtonWrapper from './style'

const ParticipantButton = props => {
  const { isShowParticipant, numOfParticipants, onClick } = props
  const title = `${numOfParticipants} participant`

  return (
    <ControlButtonWrapper>
      <Tooltip title={title}>
        <IconButton onClick={onClick} className="grey">
          {isShowParticipant ? <People /> : <PeopleOutline />}
        </IconButton>
      </Tooltip>
    </ControlButtonWrapper>
  )
}

ParticipantButton.propTypes = {
  isShowParticipant: PropsTypes.bool,
  numOfParticipants: PropsTypes.number,
  onClick: PropsTypes.func,
}

export default ParticipantButton

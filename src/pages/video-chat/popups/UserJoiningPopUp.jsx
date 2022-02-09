import React from 'react'
import PropTypes from 'prop-types'
import AlertDialog from './AlertDialog'

const UserJoiningPopUp = ({ onAccept, onDenied, onClose, data }) => {
  return (
    <AlertDialog
      title="User joined"
      message={`${data.name} has joined the meeting.`}
      showLeft={false}
      showRight
      btnTextRight="OK"
      auto
      time={5000}
      onClose={onClose}
      onRight={onAccept}
    />
  )
}

UserJoiningPopUp.propTypes = {
  onAccept: PropTypes.func,
  onDenied: PropTypes.func,
  onClose: PropTypes.func,
  data: PropTypes.shape({ name: PropTypes.string }),
}

export default UserJoiningPopUp

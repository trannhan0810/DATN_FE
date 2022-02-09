import React from 'react'
import PropTypes from 'prop-types'
import AlertDialog from './AlertDialog'

const UserLeftPopUp = ({ onAccept, onDenied, onClose, data }) => {
  return (
    <AlertDialog
      title="User left"
      message={`${data.name} has left the meeting.`}
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

UserLeftPopUp.propTypes = {
  onAccept: PropTypes.func,
  onDenied: PropTypes.func,
  onClose: PropTypes.func,
  data: PropTypes.shape({ name: PropTypes.string }),
}

export default UserLeftPopUp

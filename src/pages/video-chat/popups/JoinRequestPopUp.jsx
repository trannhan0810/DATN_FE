import React from 'react'
import PropTypes from 'prop-types'
import AlertDialog from './AlertDialog'

const JoinRequestPopUp = ({ onAccept, onDenied, onClose, data }) => {
  return (
    <AlertDialog
      title="Join request!"
      message={`${data.name} is requesting to join the call.`}
      showLeft
      showRight
      auto={false}
      btnTextLeft="Deny Entry"
      btnTextRight="Admit"
      // onClose equivalent to deny
      onClose={onClose}
      onLeft={onDenied}
      onRight={onAccept}
    />
  )
}

JoinRequestPopUp.propTypes = {
  onAccept: PropTypes.func,
  onDenied: PropTypes.func,
  onClose: PropTypes.func,
  data: PropTypes.shape({ name: PropTypes.string }),
}

export default JoinRequestPopUp

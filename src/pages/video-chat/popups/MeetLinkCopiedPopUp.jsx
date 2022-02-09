import React from 'react'
import PropTypes from 'prop-types'
import AlertDialog from './AlertDialog'

const MeetLinkCopiedPopUp = ({ onAccept, onDenied, onClose, data }) => {
  return (
    <AlertDialog
      title="Meeting Code copied to Clipboard."
      message="Share with those whom you would like to join here and ask them to enter the code on the videochat's home page."
      showLeft={false}
      showRight
      auto={false}
      btnTextRight="Ok"
      onClose={onClose}
      onRight={onAccept}
    />
  )
}

MeetLinkCopiedPopUp.propTypes = {
  onAccept: PropTypes.func,
  onDenied: PropTypes.func,
  onClose: PropTypes.func,
  data: PropTypes.shape({ name: PropTypes.string }),
}

export default MeetLinkCopiedPopUp

import React from 'react'
import PropTypes from 'prop-types'
import AlertDialog from './AlertDialog'

const ConnectTimeOutPopup = ({ onAccept, onDenied, onClose, data }) => {
  return (
    <AlertDialog
      title="ERR Connection Timed Out!"
      message="Please check your internet connection and try again."
      showLeft={false}
      showRight
      btnTextRight="OK"
      auto={false}
      onClose={onClose}
      onRight={onAccept}
    />
  )
}

ConnectTimeOutPopup.propTypes = {
  onAccept: PropTypes.func,
  onDenied: PropTypes.func,
  onClose: PropTypes.func,
  data: PropTypes.shape({ name: PropTypes.string }),
}

export default ConnectTimeOutPopup

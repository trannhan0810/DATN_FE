import React from 'react'
import PropTypes from 'prop-types'
import AlertDialog from './AlertDialog'

const PermissionDenied = ({ onAccept, onDenied, onClose, data }) => {
  return (
    <AlertDialog
      title="Permission denied!"
      message="You were denied to join the call by the meeting admin. You will shortly be redirected to videochat's home page."
      showLeft={false}
      showRight={false}
      auto
      time={5000}
      onClose={onClose}
    />
  )
}

PermissionDenied.propTypes = {
  onAccept: PropTypes.func,
  onDenied: PropTypes.func,
  onClose: PropTypes.func,
  data: PropTypes.shape({ name: PropTypes.string }),
}

export default PermissionDenied

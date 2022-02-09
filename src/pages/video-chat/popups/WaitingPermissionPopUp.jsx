import { CircularProgress } from '@mui/material'
import React from 'react'
import PropTypes from 'prop-types'
import AlertDialog from './AlertDialog'

const WaitingPermissionPopUp = ({ onAccept, onDenied, onClose, data }) => {
  return (
    <AlertDialog
      title={<CircularProgress color="secondary" />}
      message="Waiting for the meeting admin to let you in."
      showLeft={false}
      showRight={false}
      auto={false}
      keepOpen
      onClose={() => {}}
    />
  )
}

WaitingPermissionPopUp.propTypes = {
  onAccept: PropTypes.func,
  onDenied: PropTypes.func,
  onClose: PropTypes.func,
  data: PropTypes.shape({ name: PropTypes.string }),
}

export default WaitingPermissionPopUp

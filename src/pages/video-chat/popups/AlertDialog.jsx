/* eslint-disable no-use-before-define */
/* eslint-disable react/destructuring-assignment */
import React, { useEffect } from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Slide from '@mui/material/Slide'
import PropTypes from 'prop-types'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />
})

function AlertDialog(props) {
  const [open, setOpen] = React.useState(true)

  useEffect(() => {
    if (props.auto) {
      setTimeout(() => {
        handleClose()
      }, props.time)
    }
  }, [])

  const handleClose = () => {
    if (props.keepOpen) {
      // dont close the dialog
    } else {
      setOpen(false)
    }
    props.onClose()
  }

  const handleLeftButton = () => {
    if (props.keepOpen) {
      // dont close the dialog
    } else {
      setOpen(false)
    }
    props.onLeft()
  }

  const handleRightButton = () => {
    if (props.keepOpen) {
      // dont close the dialog
    } else {
      setOpen(false)
    }
    props.onRight()
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
      keepMounted
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{props.title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">{props.message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        {props.showLeft && (
          <Button onClick={handleLeftButton} color="primary">
            {props.btnTextLeft}
          </Button>
        )}
        {props.showRight && (
          <Button
            onClick={handleRightButton}
            color="primary"
            autoFocus
            style={{ display: props.showRight ? 'block' : 'none' }}
          >
            {props.btnTextRight}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  )
}

AlertDialog.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  message: PropTypes.string,
  showLeft: PropTypes.bool,
  showRight: PropTypes.bool,
  btnTextLeft: PropTypes.string,
  btnTextRight: PropTypes.string,
  auto: PropTypes.bool,
  onClose: PropTypes.func,
  onRight: PropTypes.func,
  onLeft: PropTypes.func,
  keepOpen: PropTypes.bool,
  time: PropTypes.number,
}

export default AlertDialog

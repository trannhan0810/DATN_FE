import { Modal } from 'antd'
import PropTypes from 'prop-types'
import React from 'react'

const JoinClassModal = ({ isVisible, handleOk, handleCancel }) => {
  return (
    <Modal title="Basic Modal" visible={isVisible} onOk={handleOk} onCancel={handleCancel}>
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </Modal>
  )
}

JoinClassModal.propTypes = {
  isVisible: PropTypes.bool,
  handleOk: PropTypes.func,
  handleCancel: PropTypes.func,
}

export default JoinClassModal

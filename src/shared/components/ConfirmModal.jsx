import React from 'react'
import { Modal } from 'antd'
import PropTypes from 'prop-types'

const ConfirmModal = ({ onSubmit, isVisible, onClose, isLoading, title, description }) => {
  return (
    <Modal
      title={title}
      onCancel={onClose}
      visible={isVisible}
      width={800}
      onOk={onSubmit}
      confirmLoading={isLoading}
      maskClosable={false}
    >
      {description}
    </Modal>
  )
}
ConfirmModal.propTypes = {
  onSubmit: PropTypes.func,
  isVisible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  title: PropTypes.string,
  description: PropTypes.string,
}
export default ConfirmModal

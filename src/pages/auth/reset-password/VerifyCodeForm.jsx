import React from 'react'
import { Form, Input } from 'antd'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { RoundedButton } from 'shared/components/common'

const VerifyCodeForm = ({ onSubmit }) => {
  const isLoading = useSelector(state => state.auth.loading)
  return (
    <Form onFinish={onSubmit} layout="vertical">
      <Form.Item label="Verification code" name="resetPasswordCode" rules={[{ required: true }]}>
        <Input type="text" size="large" maxLength={6} />
      </Form.Item>
      <Form.Item>
        <RoundedButton htmlType="submit" block size="large" type="primary" loading={isLoading}>
          CONTINUE
        </RoundedButton>
      </Form.Item>
    </Form>
  )
}
VerifyCodeForm.propTypes = {
  onSubmit: PropTypes.func,
}
export default VerifyCodeForm

import React from 'react'
import { Form, Input, Button } from 'antd'
import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { RoundedButton } from 'shared/components/common'

export const StyledButton = styled(Button)`
  && {
    border-radius: 21.5px;
  }
`
const ForgotPasswordForm = ({ onSubmit }) => {
  const isLoading = useSelector(state => state.auth.isSendVerifyCode)

  return (
    <Form onFinish={onSubmit} layout="vertical">
      <Form.Item label="Email" name="email" rules={[{ required: true }]}>
        <Input type="email" size="large" />
      </Form.Item>
      <Form.Item>
        <RoundedButton htmlType="submit" block size="large" type="primary" loading={isLoading}>
          GET CODE
        </RoundedButton>
      </Form.Item>
    </Form>
  )
}
ForgotPasswordForm.propTypes = {
  onSubmit: PropTypes.func,
}
export default ForgotPasswordForm

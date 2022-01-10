import React from 'react'
import { Form, Input } from 'antd'
import PropTypes from 'prop-types'
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons'
import { useSelector } from 'react-redux'
import { RoundedButton } from 'shared/components/common'

const ResetPasswordForm = ({ onSubmit }) => {
  const isLoading = useSelector(state => state.auth.loading)
  return (
    <div>
      <Form onFinish={onSubmit} layout="vertical">
        <Form.Item label="New password" name="newPassword" rules={[{ required: true }]}>
          <Input.Password
            minLength={6}
            type="password"
            block
            size="large"
            iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
          />
        </Form.Item>
        <Form.Item label="Confirm password" name="confirmNewPassword" rules={[{ required: true }]}>
          <Input.Password
            minLength={6}
            type="password"
            block
            size="large"
            iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
          />
        </Form.Item>
        <Form.Item>
          <RoundedButton htmlType="submit" block size="large" type="primary" loading={isLoading}>
            GET CODE
          </RoundedButton>
        </Form.Item>
      </Form>
    </div>
  )
}
ResetPasswordForm.propTypes = {
  onSubmit: PropTypes.func,
}
export default ResetPasswordForm

import React from 'react'
import { Form, Checkbox, Input, Button } from 'antd'
// import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons'
import { useSelector } from 'react-redux'

const FormLogin = ({ onSubmit }) => {
  const FormItem = Form.Item
  const isLoading = useSelector(state => state.auth.loading)

  return (
    <>
      <h2 className="t-400-25px-34px">Welcome to OLearning</h2>
      <Form onFinish={onSubmit} layout="vertical">
        <div className="form-content">
          <FormItem label="email" name="email" rules={[{ required: true, message: 'Please enter email' }]}>
            <Input type="text" size="large" />
          </FormItem>
          <FormItem label="Password" name="password" rules={[{ required: true, message: 'Please enter password' }]}>
            <Input.Password
              autoComplete="off"
              type="password"
              size="large"
              iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
            />
          </FormItem>
          <FormItem>
            {/* <Link to="/forgot-password" style={{ float: 'right' }}>
              Quên mật khẩu?
            </Link> */}
          </FormItem>
          <FormItem>
            <Button htmlType="submit" block size="large" type="primary" loading={isLoading} className="custom-btn">
              Login
            </Button>
          </FormItem>
        </div>
      </Form>
    </>
  )
}
FormLogin.propTypes = {
  onSubmit: PropTypes.func.isRequired,
}
export default FormLogin

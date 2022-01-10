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
      <h2 className="t-400-25px-34px">Welcome to Patcredit</h2>
      <Form onFinish={onSubmit} layout="vertical">
        <div className="form-content">
          <FormItem
            label="Tên đăng nhập"
            name="userIdentity"
            rules={[{ required: true, message: 'Vui lòng nhập tên đăng nhập' }]}
          >
            <Input type="text" size="large" />
          </FormItem>
          <FormItem label="Mật khẩu" name="password" rules={[{ required: true, message: 'Vui lòng nhập mật khẩu' }]}>
            <Input.Password
              autoComplete="off"
              type="password"
              size="large"
              iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
            />
          </FormItem>
          <FormItem>
            <FormItem name="isRememberMe" valuePropName="checked" noStyle>
              <Checkbox>Ghi nhớ đăng nhập</Checkbox>
            </FormItem>
            {/* <Link to="/forgot-password" style={{ float: 'right' }}>
              Quên mật khẩu?
            </Link> */}
          </FormItem>
          <FormItem>
            <Button htmlType="submit" block size="large" type="primary" loading={isLoading} className="custom-btn">
              Đăng nhập
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

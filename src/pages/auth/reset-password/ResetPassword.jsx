import React from 'react'
import { Row, Col } from 'antd'
import styled from '@emotion/styled'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { unwrapResult } from '@reduxjs/toolkit'
import { resetNewPassword } from '../reducer'
import ResetPasswordForm from './ResetPasswordForm'
import Logo from 'shared/components/Logo'
import introImage from 'assets/images/intro.png'
import { showError, showInfo, showSuccess } from 'core/tools'

const RightCol = styled(Col)`
  height: 100vh;
  background-color: var(--primary-color);
`
const ResetPassword = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const resetPasswordToken = useSelector(state => state.auth.resetPasswordToken)
  const onSubmit = async ({ newPassword, confirmNewPassword }) => {
    if (newPassword === confirmNewPassword) {
      dispatch(resetNewPassword({ newPassword, resetPasswordToken }))
        .then(unwrapResult)
        .then(() => {
          showSuccess('Your password has been changed successfully')
          history.push('/login')
        })
        .catch(showError)
    } else {
      showInfo('Your password and confirm password not match!')
    }
  }
  return (
    <Row>
      <Col xs={24} md={24} lg={8} xl={8} style={{ padding: 34 }} className="h-screen">
        <Logo height={113} width={123} style={{ marginBottom: '28%' }} />
        <h2 className="t-400-25px-34px">Reset Password</h2>
        <p>Please enter your new password and confirm new password to reset</p>
        <ResetPasswordForm onSubmit={onSubmit} />
      </Col>
      <RightCol xs={0} md={0} lg={16} xl={16} className="flex center2">
        <img src={introImage} alt="intro" />
      </RightCol>
    </Row>
  )
}
export default ResetPassword

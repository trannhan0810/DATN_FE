import React from 'react'
import { Row, Col } from 'antd'
import styled from '@emotion/styled'
import { useHistory } from 'react-router'
import { useDispatch } from 'react-redux'
import { unwrapResult } from '@reduxjs/toolkit'
import { forgotPass } from '../reducer'
import ForgotPasswordForm from './ForgotPasswordForm'
import introImage from 'assets/images/intro.png'
import Logo from 'shared/components/Logo'

const RightCol = styled(Col)`
  height: 100vh;
  background-color: var(--primary-color);
`
const ForgotPassword = () => {
  const history = useHistory()
  const dispatch = useDispatch()

  const onSubmit = async ({ email }) => {
    dispatch(forgotPass({ email }))
      .then(unwrapResult)
      .then(() => {
        history.push({
          pathname: '/verify-code',
          state: email,
        })
      })
  }

  return (
    <Row>
      <Col md={24} lg={8} style={{ padding: 34 }} className="h-screen">
        <Logo height={113} width={123} style={{ marginBottom: '28%' }} />
        <h2 className="t-400-25px-34px">Forgot Password</h2>
        <p>Please enter your email address to get code login.</p>
        <ForgotPasswordForm onSubmit={onSubmit} />
      </Col>
      <RightCol xs={0} md={0} lg={16} xl={16} className="flex center2">
        <img src={introImage} alt="intro" />
      </RightCol>
    </Row>
  )
}
export default ForgotPassword

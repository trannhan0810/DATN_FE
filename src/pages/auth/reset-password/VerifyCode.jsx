import React from 'react'
import { Row, Col, Button } from 'antd'
import styled from '@emotion/styled'
import { useDispatch } from 'react-redux'
import { unwrapResult } from '@reduxjs/toolkit'
import { forgotPass, verifyCode } from '../reducer'
import VerifyCodeForm from './VerifyCodeForm'
import Logo from 'shared/components/Logo'
import introImage from 'assets/images/intro.png'
import { showError } from 'core/tools'
import useRouter from 'shared/hooks/useRouter'

const RightCol = styled(Col)`
  height: 100vh;
  background-color: var(--primary-color);
`
const SpanText = styled.span`
  color: var(--primary-color);
`
const VerifyCode = () => {
  const dispatch = useDispatch()
  const { history, location } = useRouter()
  const email = location.state
  const onSubmit = async ({ resetPasswordCode }) => {
    dispatch(verifyCode({ email, resetPasswordCode }))
      .then(unwrapResult)
      .then(() => {
        history.push('/reset-password')
      })
      .catch(showError)
  }
  const onSendAgain = () => {
    dispatch(forgotPass({ email }))
  }
  return (
    <Row>
      <Col md={24} lg={8} style={{ padding: 34 }} className="h-screen">
        <Logo height={113} width={123} style={{ marginBottom: '28%' }} />
        <h2 className="t-400-25px-34px">Reset Password</h2>
        <p>A code has been sent to your registered email, please open your inbox to check.</p>
        <VerifyCodeForm onSubmit={onSubmit} />
        <p>
          Haven’t received the code?
          <Button onClick={onSendAgain} className="border-none">
            <SpanText> Send it again</SpanText>
          </Button>
        </p>
      </Col>
      <RightCol xs={0} md={0} lg={16} xl={16} className="flex center2">
        <img src={introImage} alt="intro" />
      </RightCol>
    </Row>
  )
}
export default VerifyCode

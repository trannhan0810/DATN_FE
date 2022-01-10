import { Col, Row } from 'antd'
import React from 'react'
import PropTypes from 'prop-types'
import AuthWrapper from './style'
import introImage from 'assets/images/intro.png'

const AuthLayout = ({ children }) => {
  return (
    <AuthWrapper>
      <Row className="full-height">
        <Col className="left-side" md={11} sm={0} xs={0}>
          <img src={introImage} alt="intro" />
        </Col>
        <Col className="right-col" md={13} sm={24} xs={24}>
          <div className="right-side">{children}</div>
        </Col>
      </Row>
    </AuthWrapper>
  )
}

AuthLayout.propTypes = {
  children: PropTypes.element.isRequired,
}

export default AuthLayout

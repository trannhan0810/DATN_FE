import React from 'react'
import { Col, Row } from 'antd'
import { ReadOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import CurrentUser from './CurrenUser'
import HeaderWrapper from './style'

const HomeHeader = () => {
  return (
    <HeaderWrapper>
      <Row className="header">
        <Col span={1} className="logo-holder">
          <Link to="/home" className="logo">
            <ReadOutlined style={{ fontSize: '40px' }} />
          </Link>
        </Col>
        <Col span={23}>
          <Row className="items-center">
            <Col span={5} className="app-name">
              <span> App </span>
            </Col>
            <Col span={14} />
            <Col span={5} className="flex justify-end">
              <CurrentUser />
            </Col>
          </Row>
        </Col>
      </Row>
    </HeaderWrapper>
  )
}

export default HomeHeader

import React from 'react'
import PropTypes from 'prop-types'
import { Col, Row } from 'antd'
import HomeLayoutStyle from './style'
import HomeHeader from './header/Header'
import SideBar from './side-bar/SideBar'

const HomeLayout = ({ children }) => {
  return (
    <HomeLayoutStyle>
      <div className="full-height">
        <HomeHeader />
        <Row className="body">
          <Col span={1} className="side-bar">
            <SideBar />
          </Col>
          <Col span={23}> {children}</Col>
        </Row>
      </div>
    </HomeLayoutStyle>
  )
}

HomeLayout.propTypes = {
  children: PropTypes.node,
}

export default HomeLayout

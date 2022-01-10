import { HomeOutlined, SettingFilled, UserOutlined } from '@ant-design/icons'
import { Row } from 'antd'
import React from 'react'
import SideBarItem from './SideBarItem'
import SideBarWrapper from './style'

const SideBar = () => {
  const routes = [
    { path: '/', name: 'Home', icon: <HomeOutlined style={{ fontSize: '32px' }} /> },
    { path: '/profile', name: 'Profile', icon: <UserOutlined style={{ fontSize: '32px' }} /> },
    { path: '/setting', name: 'Setting', icon: <SettingFilled style={{ fontSize: '32px' }} /> },
  ]

  return (
    <SideBarWrapper className="shadow">
      <Row className="side-bar-item-holder">
        {routes.map(route => (
          <SideBarItem className="side-bar-item" key={route.name} {...route} />
        ))}
      </Row>
    </SideBarWrapper>
  )
}

export default SideBar

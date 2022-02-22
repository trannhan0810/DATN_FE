import React from 'react'
import { LogoutOutlined, MoreOutlined } from '@ant-design/icons'
import { Avatar, Menu, Tooltip, Dropdown } from 'antd'
import PropTypes from 'prop-types'
import { MenuOutlined } from '@mui/icons-material'
import defaultAvatar from '../../../assets/images/avatar.png'
import HeaderMenu from '../component/HeaderMenu'
import HeaderWrapper from './style'
import useWindowDimensions from 'shared/hooks/useWindowDimensions'

function Header(props) {
  const { width } = useWindowDimensions()
  const appName = width > 800 ? 'Online Learning' : ''
  const { onClickIcon, className } = props

  return (
    <HeaderWrapper className={className}>
      <div className="header-logo">
        <MenuOutlined onClick={onClickIcon} />
      </div>
      <div className="header-menubar">
        <div className="header-appName">
          <span className="header-label">{appName}</span>
        </div>
        <div className="header-controls">
          <div className="header-search">
            <i className="fi-rr-search" />
            <input placeholder="Search" />
          </div>
          <div className="header-profile">
            {/* <span className="header-user-name"> Name </span> */}
            <Avatar className="header-avatar" alt="" src={defaultAvatar} />
            <Dropdown overlay={<HeaderMenu />} trigger={['click']} placement="bottomRight">
              <div className="header-icon">
                <MoreOutlined rotate={90} className="btn-logout" />
              </div>
            </Dropdown>
          </div>
        </div>
      </div>
    </HeaderWrapper>
  )
}

Header.propTypes = {
  onClickIcon: PropTypes.func,
  className: PropTypes.string,
}

export default Header

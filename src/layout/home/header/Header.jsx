import React from 'react'
import { MoreOutlined } from '@ant-design/icons'
import { Avatar, Dropdown } from 'antd'
import PropTypes from 'prop-types'
import { MenuOutlined } from '@mui/icons-material'
import InitialsAvatar from 'react-initials-avatar'
import defaultAvatar from '../../../assets/images/avatar.png'
import HeaderMenu from '../component/HeaderMenu'
import HeaderWrapper from './style'
import useWindowDimensions from 'shared/hooks/useWindowDimensions'
import { getCurrentUser } from 'core/currentUser'

function Header(props) {
  const { width } = useWindowDimensions()
  const appName = width > 800 ? 'OLearning' : ''
  const { onClickIcon, className } = props
  const user = getCurrentUser() && JSON.parse(getCurrentUser())

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
          {/* <div className="header-search">
            <i className="fi-rr-search" />
            <input placeholder="Search" />
          </div> */}
          <div className="header-profile">
            {/* <span className="header-user-name"> Name </span> */}
            <InitialsAvatar alt="" src={defaultAvatar} name={user.fullName || ''} />
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

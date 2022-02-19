import React from 'react'
import { LogoutOutlined, MoreOutlined } from '@ant-design/icons'
import { Avatar, Menu, Tooltip } from 'antd'
import PropTypes from 'prop-types'
import { MenuOutlined } from '@mui/icons-material'
import defaultAvatar from '../../../assets/images/avatar.png'
import HeaderWrapper from './style'
import { getToken, removeToken } from 'core/token'
import { getCurrentUser, removeCurrentUser } from 'core/currentUser'
import useRouter from 'shared/hooks/useRouter'
import useWindowDimensions from 'shared/hooks/useWindowDimensions'

function Header(props) {
  const profile = JSON.parse(getCurrentUser())
  const { history } = useRouter()
  const { width } = useWindowDimensions()
  const appName = width > 800 ? 'Online Learning' : ''
  const { onClickIcon } = props

  const onLogout = () => {
    const token = getToken()
    if (token) {
      removeToken(token)
      removeCurrentUser(profile)
      history.push('/login')
    }
  }

  return (
    <HeaderWrapper>
      <div className="header">
        <div className="header-menu">
          <MenuOutlined onClick={onClickIcon} />
        </div>
        <div className="header-appName">
          <span className="header-label">{appName}</span>
        </div>
        <div className="header-rightFold">
          <div className="header-search">
            <i className="fi-rr-search" />
            <input placeholder="Search" />
          </div>
          <div className="header-profile">
            {/* <span className="header-user-name"> Name </span> */}
            <Avatar className="header-avatar" alt="" src={defaultAvatar} />
            <Tooltip title="Profile" className="profile-options">
              <MoreOutlined rotate={90} />
            </Tooltip>
            <Tooltip title="Logout" className="btn-logout" onClick={onLogout}>
              <LogoutOutlined />
            </Tooltip>
          </div>
        </div>
      </div>
    </HeaderWrapper>
  )
}

Header.propTypes = {
  onClickIcon: PropTypes.func,
}

export default Header

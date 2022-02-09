import React from 'react'
import { LogoutOutlined, MoreOutlined } from '@ant-design/icons'
import { Avatar, Tooltip } from 'antd'
import defaultAvatar from '../../../assets/images/avatar.png'
import HeaderWrapper from './style'
import { getToken, removeToken } from 'core/token'
import { getCurrentUser, removeCurrentUser } from 'core/currentUser'
import useRouter from 'shared/hooks/useRouter'

function Header() {
  const appName = 'Online Learning'

  const profile = JSON.parse(getCurrentUser())
  const { history } = useRouter()

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
          <i className="fi-rr-layout-fluid" />
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
            <span className="header-user-name"> Name </span>
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

export default Header

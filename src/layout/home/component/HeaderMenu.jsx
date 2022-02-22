import React from 'react'
import { Menu, Dropdown, Button, Space } from 'antd'
import { getToken, removeToken } from 'core/token'
import { getCurrentUser, removeCurrentUser } from 'core/currentUser'
import useRouter from 'shared/hooks/useRouter'

const HeaderMenu = () => {
  const profile = JSON.parse(getCurrentUser())
  const { history } = useRouter()

  const logout = () => {
    const token = getToken()
    if (token) {
      removeToken(token)
      removeCurrentUser(profile)
      history.push('/login')
    }
  }

  return (
    <Menu style={{ minWidth: ' 80px' }}>
      <Menu.Item disabled>{profile.fullName || 'Noname'}</Menu.Item>
      <Menu.Item onClick={logout}>Log out</Menu.Item>
    </Menu>
  )
}

export default HeaderMenu

import { Avatar, Button, Tooltip } from 'antd'
import React from 'react'
import { LogoutOutlined } from '@ant-design/icons'
import Text from 'antd/lib/typography/Text'
import { getCurrentUser, removeCurrentUser } from 'core/currentUser'
import { getToken, removeToken } from 'core/token'
import useRouter from 'shared/hooks/useRouter'

const CurrentUser = () => {
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
    <>
      <Text style={{ fontSize: '1.5em' }}>Hi, {profile.fullName} </Text>
      <Avatar style={{ marginLeft: '10px', marginRight: '10px' }} />

      <Tooltip title="Logout">
        <Button
          className="menu-btn border-none"
          icon={<LogoutOutlined className="btn-menu" style={{ fontSize: '30px' }} />}
          onClick={onLogout}
        />
      </Tooltip>
    </>
  )
}

export default CurrentUser

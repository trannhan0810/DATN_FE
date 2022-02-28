import { DeleteOutline, Edit, VisibilitySharp } from '@mui/icons-material'
import { Avatar, Tooltip } from 'antd'
import InitialsAvatar from 'react-initials-avatar'
import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'

const UserItemWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: white;

  .avatar-container {
    flex: 0 0 auto;
    padding: 4px;
  }

  .user-info {
    flex: 1 1 0px;
    display: flex;
    flex-direction: column;
    b {
      font-size: 16px;
    }
    small {
      font-size: 14px;
    }
  }

  .user-role {
    flex: 1 1 0px;
    display: flex;
    flex-direction: column;
    small {
      font-size: 14px;
    }
    b {
      font-size: 16px;
    }
  }

  .actions-buttons {
    flex: 0 0 auto;

    .action-btn {
      cursor: pointer;
      font-size: 32px;
    }
  }
`

const AddMemberItem = props => {
  const { className, user, onAdd } = props

  return (
    <UserItemWrapper className={className}>
      <div className="avatar-container">
        {user.avatar ? <Avatar size={48} src={user.avatar} /> : <InitialsAvatar name={user.fullName || ''} />}
      </div>
      <div className="user-info">
        <b className="user-name">{user.fullName}</b>
        <small className="user-email">{user.email}</small>
      </div>
      <button type="button" className="btn-add" onClick={onAdd}>
        <Tooltip>Add</Tooltip>
      </button>
    </UserItemWrapper>
  )
}

AddMemberItem.propTypes = {
  className: PropTypes.string,
  user: PropTypes.shape({
    fullName: PropTypes.string,
    email: PropTypes.string,
    avatar: PropTypes.string,
    roleName: PropTypes.string,
  }),
  onAdd: PropTypes.func,
}

export default AddMemberItem

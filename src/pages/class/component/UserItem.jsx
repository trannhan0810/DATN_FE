import { DeleteOutline, Edit, VisibilitySharp } from '@mui/icons-material'
import { Avatar, Tooltip } from 'antd'
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

  .actions-buttons {
    flex: 0 0 auto;

    .action-btn {
      cursor: pointer;
      font-size: 32px;
    }
  }
`

const UserItem = props => {
  const { className, user, onView, onEdit, onDelete } = props

  return (
    <UserItemWrapper className={className}>
      <div className="avatar-container">
        <Avatar src={user.avatar} size={48} />
      </div>
      <div className="user-info">
        <b className="user-name">{user.fullName}</b>
        <small className="user-email">{user.email}</small>
      </div>
      <div className="actions-buttons">
        {onView && (
          <Tooltip className="action-btn" onClick={onView}>
            <VisibilitySharp />
          </Tooltip>
        )}
        {onEdit && (
          <Tooltip className="action-btn" onClick={onEdit}>
            <Edit />
          </Tooltip>
        )}
        {onDelete && (
          <Tooltip className="action-btn" onCLick={onDelete}>
            <DeleteOutline />
          </Tooltip>
        )}
      </div>
    </UserItemWrapper>
  )
}

UserItem.propTypes = {
  className: PropTypes.string,
  user: PropTypes.shape({
    fullName: PropTypes.string,
    email: PropTypes.string,
    avatar: PropTypes.string,
  }),
  onEdit: PropTypes.func,
  onView: PropTypes.func,
  onDelete: PropTypes.func,
}

export default UserItem

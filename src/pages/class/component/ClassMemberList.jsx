import React from 'react'
import { Tooltip } from 'antd'
import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import { UserAddOutlined } from '@ant-design/icons'
import UserItem from './UserItem'
import useUsers from 'shared/hooks/useUsers'

const ClassMemberListWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-flow: column;

  .classMemberList-content {
    width: 100%;
    flex: 1 1 0;
    border-bottom: 2px solid lightgray;
    overflow-y: scroll;
    display: flex;
    flex-direction: column;
    padding: 8px;

    .classMemberList-user-item {
      width: 100%;
      height: auto;
      border-radius: 8px;
      box-shadow: 5px 0px 6px #dbdbdb, -5px 0px 6px #dbdbdb;
      margin-bottom: 8px;
    }
  }

  .classMemberList-footer {
    width: 100%;
    flex: 0 0 64px;
    display: flex;
    align-items: center;
  }
`

const ClassMemberList = ({ className }) => {
  const { users, isLoading } = useUsers()

  return (
    <ClassMemberListWrapper className={className}>
      <div className="classMemberList-content">
        {!isLoading &&
          users.map(user => (
            <UserItem
              className="classMemberList-user-item"
              key={user.id}
              user={user}
              onView={() => {}}
              onEdit={() => {}}
              onDelete={() => {}}
            />
          ))}
      </div>
      <Tooltip className="add-button">
        <UserAddOutlined className="add-icon" />
        Add Member
      </Tooltip>
      <div className="classMemberList-footer" />
    </ClassMemberListWrapper>
  )
}

ClassMemberList.propTypes = {
  className: PropTypes.string,
}

export default ClassMemberList

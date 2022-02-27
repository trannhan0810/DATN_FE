import React, { useRef, useState } from 'react'
import { Avatar, Button, Dropdown, Empty, Menu, Spin, Tooltip } from 'antd'
import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import { UserAddOutlined } from '@ant-design/icons'
import { useParams } from 'react-router'
import InfiniteScroll from 'react-infinite-scroll-component'
import { PersonAddAlt1Outlined, Search } from '@mui/icons-material'
import UserItem from './UserItem'
import useUsers from 'shared/hooks/useUsers'
import useClassMember from 'shared/hooks/useClassMembers'

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
    justify-content: space-between;
    padding: 8px;

    .search-bar {
      width: 100%;
      display: flex;
      align-items: center;
      background-color: white;
      border-radius: 8px;
      box-shadow: 5px 0px 6px #dbdbdb, -5px 0px 6px #dbdbdb;
      padding: 0px 12px;
      max-width: 400px;

      input,
      input:focus {
        width: 0px;
        flex: 1 1 0px;
        padding: 12px;
        border: none;
        outline: none;
        font-size: 20px;
      }

      svg {
        flex: 0 0 auto;
        cursor: pointer;
      }
    }
  }
`

const ClassMemberList = ({ className }) => {
  const { classId } = useParams()
  const { members, hasMore, fetchMoreClassMembers, isLoading } = useClassMember(classId)
  const [isAddUser, setIsAddUser] = useState(false)
  const searchRef = useRef()

  return (
    <ClassMemberListWrapper className={className} id="memberList">
      <div className="classMemberList-footer">
        <div className="search-bar">
          <input ref={searchRef} placeholder={isAddUser ? 'Search member' : 'Search member in class'} />
          <Search />
        </div>

        <Tooltip className="add-button" onClick={() => setIsAddUser(!isAddUser)}>
          <UserAddOutlined className="add-icon" />
          {isAddUser ? 'Done' : 'Add Member'}
        </Tooltip>
      </div>
      <div className="classMemberList-content">
        {!isAddUser && (
          <InfiniteScroll
            dataLength={members?.length || 0}
            next={fetchMoreClassMembers}
            hasMore={hasMore}
            loader={<h4>Loading...</h4>}
            scrollableTarget="memberList"
            style={{ display: 'flex', flexDirection: 'column' }}
            endMessage={
              !isLoading && (
                <div style={{ alignSelf: 'center' }}>
                  {Empty.PRESENTED_IMAGE_DEFAULT}
                  <h4> No more meeting here !</h4>
                </div>
              )
            }
          >
            {isLoading && <Spin size="large" />}
            {!isLoading &&
              members.map(user => (
                <UserItem
                  className="classMemberList-user-item"
                  key={user.id}
                  user={user}
                  onView={() => {}}
                  onEdit={() => {}}
                  onDelete={() => {}}
                />
              ))}
          </InfiniteScroll>
        )}
      </div>
    </ClassMemberListWrapper>
  )
}

ClassMemberList.propTypes = {
  className: PropTypes.string,
  // classId: PropTypes.string,
}

export default ClassMemberList

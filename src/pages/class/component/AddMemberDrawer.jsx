import React, { useEffect, useRef, useState } from 'react'
import { Drawer } from 'antd'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { useParams } from 'react-router'
import AddMemberItem from './AddMemberItem'
import { getUsers } from 'api/user'
import { addClassMember } from 'api/class'
import { showError } from 'core/tools'

const DrawerContent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  .input-holder {
    background-color: #ececec;
    border-radius: 8px;
    padding: 4px;
    input {
      border: none;
      outline: none;
      background-color: transparent;
      width: 90%;
    }
  }

  .user-list {
  }
`

const AddMemberDrawer = props => {
  const { visible, close, refreshMemberList } = props
  const [searchText, setSearchText] = useState('')
  const [users, setUsers] = useState([])
  const { classId } = useParams()
  const inputRef = useRef()

  useEffect(() => {
    const timeOut = setTimeout(async () => {
      if (inputRef.current.value && inputRef.current.value.length > 0) {
        const data = await getUsers({
          pageNumber: 1,
          pageSize: 10,
          searchUser: inputRef.current.value,
          excludeClassId: classId,
        })
        setUsers(data.results)
      }
    }, 100)
    return () => {
      clearTimeout(timeOut)
    }
  }, [searchText])

  return (
    <Drawer
      title="Add new member"
      placement="right"
      closable
      onClose={close}
      visible={visible}
      getContainer={false}
      style={{ position: 'absolute' }}
    >
      <DrawerContent>
        Enter email or user name
        <div className="input-holder">
          <input ref={inputRef} onChange={setSearchText} />
        </div>
        <div className="use-list">
          {users.map(user => (
            <AddMemberItem
              key={user.id}
              user={user}
              onAdd={async () => {
                try {
                  await addClassMember({ id: classId, userId: user.id, isOwner: false })
                  refreshMemberList()
                } catch {
                  showError('You have this permission')
                }
              }}
            />
          ))}
        </div>
      </DrawerContent>
    </Drawer>
  )
}

AddMemberDrawer.propTypes = {
  visible: PropTypes.bool,
  close: PropTypes.func,
  refreshMemberList: PropTypes.func,
}

export default AddMemberDrawer

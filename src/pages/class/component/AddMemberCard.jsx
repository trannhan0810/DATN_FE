import { Modal } from 'antd'
import React, { useRef, useState } from 'react'

const AddUserCard = () => {
  const [selectedUsers, setSelectedUsers] = useState([])
  const [userResults, setUserResults] = useState([])

  const inputRef = useRef()
  const onChangeSearchText = () => {}

  return (
    <Modal>
      <input onChange={onChangeSearchText} ref={inputRef} />
      <div style={{ display: 'flex' }}>
        {selectedUsers.map(user => {
          return <div key={user.id} />
        })}
      </div>
    </Modal>
  )
}

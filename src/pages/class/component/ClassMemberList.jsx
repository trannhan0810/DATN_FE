import React from 'react'
import { Avatar } from 'antd'
import { Send } from '@mui/icons-material'
import styled from '@emotion/styled'
import PropTypes from 'prop-types'
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
  }

  .classMemberList-footer {
    width: 100%;
    flex: 0 0 64px;
    display: flex;
    align-items: center;
  }
`

const ClassMemberList = ({ className }) => {
  const { users } = useUsers()

  return (
    <ClassMemberListWrapper className={className}>
      <div className="classMemberList-content" />
      <div className="classMemberList-footer" />
    </ClassMemberListWrapper>
  )
}

ClassMemberList.propTypes = {
  className: PropTypes.string,
}

export default ClassMemberList

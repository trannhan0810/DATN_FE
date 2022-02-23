import React, { useEffect, useState } from 'react'
import { Avatar } from 'antd'
import { Send } from '@mui/icons-material'
import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import { formatDateTimeDetail } from '../../../shared/utils/date'
import MeetingItem from './PostItem'

const ClassMeetingWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-flow: column;

  .classMessenger-content {
    width: 100%;
    flex: 1 1 0;
    border-bottom: 2px solid lightgray;
    overflow-y: scroll;
    display: flex;
    flex-direction: column;
    padding: 8px;

    .post-item {
      width: 100%;
      height: auto;
      display: flex;
      flex-direction: column;
      border-radius: 8px;
      box-shadow: 5px 0px 6px #dbdbdb, -5px 0px 6px #dbdbdb;
      margin-bottom: 8px;
    }
  }

  .classMessenger-footer {
    width: 100%;
    flex: 0 0 64px;
    display: flex;
    align-items: center;

    .send-msg-form {
      width: 100%;
      display: flex;
      align-items: center;
      background-color: white;
      border-radius: 8px;
      box-shadow: 5px 0px 6px #dbdbdb, -5px 0px 6px #dbdbdb;
      padding: 0px 12px;

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

const ClassMeetingList = ({ className }) => {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const getPosts = () => {
      setPosts([
        { id: 1, avatar: null, userName: null, title: 'New channel meeting started', content: null, time: new Date() },
        { id: 2, avatar: null, userName: null, title: 'New channel meeting started', content: null, time: new Date() },
      ])
    }
    getPosts()
  }, [])

  return (
    <ClassMeetingWrapper className={className}>
      <div className="classMessenger-content">
        {posts.length > 0 && posts.map(post => <MeetingItem className="post-item" key={post.id} post={post} />)}
      </div>
      <div className="classMessenger-footer">
        <div className="send-msg-form">
          <input />
          <Send />
        </div>
      </div>
    </ClassMeetingWrapper>
  )
}

ClassMeetingList.propTypes = {
  className: PropTypes.string,
}

export default ClassMeetingList

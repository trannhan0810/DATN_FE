import React, { useRef } from 'react'
import { Send } from '@mui/icons-material'

import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useParams } from 'react-router'
import { Empty, Spin } from 'antd'
import styled from '@emotion/styled'
import PostItem from './PostItem'
import useClassPosts from 'shared/hooks/useClassPosts'

const ClassMessengerWrapper = styled.div`
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
    flex-direction: column-reverse;
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

const ClassMessenger = ({ className }) => {
  const { classId } = useParams()
  const { posts, hasMore, fetchMorePosts, sendPost, isLoading } = useClassPosts(classId)
  const draftMsgRef = useRef()

  const sendPostHandler = () => {
    sendPost({
      content: draftMsgRef.current.value,
    })
    draftMsgRef.current.value = ''
  }

  return (
    <ClassMessengerWrapper className={className}>
      <div className="classMessenger-content" id="messageList" style={{ height: '100%', overflow: 'auto' }}>
        {/* {posts.length > 0 && posts.map(post => <PostItem className="post-item" key={post.id} post={post} />)} */}
        <InfiniteScroll
          dataLength={posts?.length || 0}
          next={fetchMorePosts}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
          scrollableTarget="messageList"
          inverse
          style={{ display: 'flex', flexDirection: 'column-reverse' }}
          endMessage={
            !isLoading && (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  width: '100%',
                  height: 400,
                }}
              >
                {Empty.PRESENTED_IMAGE_DEFAULT}
                <h4> No more post here !</h4>
              </div>
            )
          }
        >
          {isLoading && <Spin size="large" />}
          {!isLoading &&
            posts?.length > 0 &&
            posts.map(post => <PostItem className="post-item" key={post.id} post={post} />)}
        </InfiniteScroll>
      </div>
      <div className="classMessenger-footer">
        <div className="send-msg-form">
          <input ref={draftMsgRef} />
          <Send onClick={sendPostHandler} />
        </div>
      </div>
    </ClassMessengerWrapper>
  )
}

ClassMessenger.propTypes = {
  className: PropTypes.string,
}

export default ClassMessenger

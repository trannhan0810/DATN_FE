import React, { useRef } from 'react'
import { Send } from '@mui/icons-material'

import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useParams } from 'react-router'
import PostItem from '../PostItem'
import ClassMessengerWrapper from './style'
import useClassPosts from 'shared/hooks/useClassPosts'

const ClassMessenger = ({ className }) => {
  const { classId } = useParams()
  const { posts, hasMore, fetchMorePosts, sendPost } = useClassPosts(classId)
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
            <p style={{ textAlign: 'center' }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          {posts?.length > 0 && posts.map(post => <PostItem className="post-item" key={post.id} post={post} />)}
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

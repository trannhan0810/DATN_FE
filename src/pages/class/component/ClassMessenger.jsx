import React, { useEffect, useState } from 'react'
import { Avatar } from 'antd'
import { Send } from '@mui/icons-material'
import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import { formatDateTimeDetail } from '../../../shared/utils/date'

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
    flex-direction: column;
    padding: 8px;

    .post-items {
      width: 100%;
      height: auto;
      display: flex;
      flex-direction: column;
      border-radius: 8px;
      box-shadow: 5px 0px 6px #dbdbdb, -5px 0px 6px #dbdbdb;
      margin-bottom: 8px;

      .post-msg-block {
        flex: 1 1 auto;
        background-color: white;
        display: flex;
        flex-direction: column;

        .post-msg-header {
          display: flex;
          flex-direction: row;

          .post-msg-header-left {
            flex: 0 0 48px;
            margin: 8px;
          }

          .post-msg-header-right {
            flex: 1 1 0px;
            display: flex;
            flex-direction: column;
            justify-content: space-around;

            b {
              font-size: 18px;
            }

            small {
              font-size: 16px;
            }
          }
        }

        .post-msg-content {
          width: 100%;
          min-width: 0px;
          flex: 1 1 0px;
          padding: 8px 12px;

          p {
            font-size: 18px;
          }
        }
      }

      .post-msg-reply {
        width: 100%;
        min-width: 0px;
        background-color: #f5f5f5;
        padding: 0px 12px;
        flex: 0 0 36px;
        cursor: pointer;
        display: flex;
        align-items: center;
        font-size: 20px;
        font-weight: 500;
      }

      .post-msg-reply::hover {
        color: --primary-color;
      }
    }

    @media only screen and (max-width: 720px) {
      .post-items {
        flex-direction: column;

        .post-user-avatar {
          flex: 0 0 64px;
        }

        .post-msg-block {
          flex: 0 0 auto;
        }
      }
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
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const getPosts = () => {
      setPosts([
        { id: 1, avatar: null, userName: null, title: 'New channel meeting started', content: null, time: new Date() },
        {
          id: 2,
          avatar: null,
          userName: 'Tran Nhan',
          title: null,
          content:
            'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.',
          time: new Date(),
          replies: [{ id: 4, userName: 'John', msg: 'iansoksa ioana akn', time: new Date() }],
        },
      ])
    }
    getPosts()
  }, [])

  return (
    <ClassMessengerWrapper className={className}>
      <div className="classMessenger-content">
        {posts.length > 0 &&
          posts.map(post => (
            <div className="post-items" key={post.id}>
              <div className="post-msg-block">
                <div className="post-msg-header">
                  <div className="post-msg-header-left">
                    <Avatar size={48} src={post.avatar} />
                  </div>
                  <div className="post-msg-header-right">
                    <b>{post.userName || post.title}</b>
                    <small> {formatDateTimeDetail(post.time)} </small>
                  </div>
                </div>
                <div className="post-msg-content">{post.content && <p> {post.content} </p>}</div>
              </div>
              <div className="post-msg-reply">Reply</div>
            </div>
          ))}
      </div>
      <div className="classMessenger-footer">
        <div className="send-msg-form">
          <input />
          <Send />
        </div>
      </div>
    </ClassMessengerWrapper>
  )
}

ClassMessenger.propTypes = {
  className: PropTypes.string,
}

export default ClassMessenger

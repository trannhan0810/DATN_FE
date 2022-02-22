import React from 'react'
import { Avatar } from 'antd'
import { Send } from '@mui/icons-material'
import styled from '@emotion/styled'
import PropTypes from 'prop-types'

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

    .post-items {
      display: flex;
      flex-direction: row;
      padding: 16px 24px;
      margin-left: -12px;

      .post-user-avatar {
        flex: 0 0 64px;
        margin: 12px;
      }

      .post-msg-block {
        flex: 1 1 0px;
        min-height: 64px;
        background-color: white;
        border-radius: 8px;
        box-shadow: 5px 0px 6px #dbdbdb, -5px 0px 6px #dbdbdb;
        display: flex;
        flex-direction: column;

        .post-msg-content {
          flex: 1 1 0px;
          padding: 8px 12px;

          b {
            font-size: 18px;
          }

          small {
            font-size: 16px;
          }

          p {
            font-size: 18px;
          }
        }

        .post-msg-reply {
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
    }
  }

  .classMessenger-footer {
    width: 100%;
    flex: 0 0 96px;
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
  return (
    <ClassMessengerWrapper className={className}>
      <div className="classMessenger-content">
        <div className="post-items">
          <div className="post-user-avatar">
            <Avatar size={64} />
          </div>

          <div className="post-msg-block">
            <div className="post-msg-content">
              <b>New channel meeting started</b>
            </div>
            <div className="post-msg-reply">Reply</div>
          </div>
        </div>
        <div className="post-items">
          <div className="post-user-avatar">
            <Avatar size={64} />
          </div>
          <div className="post-msg-block">
            <div className="post-msg-content">
              <b>Tran Nhan</b>
              <small> 12:00 AM</small>
              <p>
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam
                rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt
                explicabo.
              </p>
            </div>
            <div className="post-msg-reply">Reply</div>
          </div>
        </div>
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

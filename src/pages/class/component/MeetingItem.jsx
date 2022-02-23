import { Avatar, Tooltip } from 'antd'
import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { formatDateTimeDetail } from 'shared/utils/date'

const MeetingItemWrapper = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;

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

    .join-meeting-btn {
      flex: 0 0 auto;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      padding: 16px 8px;
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
`

const MeetingItem = props => {
  const { className, meeting, onReply } = props

  return (
    <MeetingItemWrapper className={className}>
      <div className="post-msg-block">
        <div className="post-msg-header">
          <div className="post-msg-header-left">
            <Avatar size={48} src={meeting.avatar} />
          </div>
          <div className="post-msg-header-right">
            <b>{meeting.userName || meeting.title}</b>
            <small>
              {formatDateTimeDetail(meeting.startTime)}
              {' - '}
              {!meeting.endTime ? 'now' : formatDateTimeDetail(meeting.endTime)}
            </small>
          </div>
        </div>
        {!meeting.endTime && (
          <div className="join-meeting-btn">
            <Tooltip className="add-button">Join</Tooltip>
          </div>
        )}
      </div>
      <Tooltip onClick={onReply}>
        <div className="post-msg-reply">Reply</div>
      </Tooltip>
    </MeetingItemWrapper>
  )
}

MeetingItem.propTypes = {
  className: PropTypes.string,
  meeting: PropTypes.shape({
    title: PropTypes.string,
    userName: PropTypes.string,
    avatar: PropTypes.string,
    startTime: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.instanceOf(Date)]),
    endTime: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.instanceOf(Date)]),
  }),
  onReply: PropTypes.func,
}

export default MeetingItem

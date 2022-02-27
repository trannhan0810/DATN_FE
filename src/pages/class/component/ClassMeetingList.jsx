import React, { useEffect, useState } from 'react'
import { Send } from '@mui/icons-material'
import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import { useParams } from 'react-router'
import InfiniteScroll from 'react-infinite-scroll-component'
import { Empty, Spin } from 'antd'
import MeetingItem from './MeetingItem'
import useClassMeetings from 'shared/hooks/useClassMeeting'
import useMeeting from 'shared/hooks/useMeeting'

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
  const { classId } = useParams()
  const { meetings, hasMore, fetchMoreMeetings, isLoading } = useClassMeetings(classId)
  const { handleExistingMeetJoin } = useMeeting()

  return (
    <ClassMeetingWrapper className={className}>
      <div className="classMessenger-content" id="meetingList">
        {/* {meetings.length > 0 &&
          meetings.map(meeting => <MeetingItem className="post-item" key={meeting.id} meeting={meeting} />)} */}
        <InfiniteScroll
          dataLength={meetings?.length || 0}
          next={fetchMoreMeetings}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
          scrollableTarget="meetingList"
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
            meetings.length > 0 &&
            meetings.map(meeting => (
              <MeetingItem
                className="post-item"
                key={meeting.id}
                meeting={meeting}
                onJoinMeeting={() => handleExistingMeetJoin(false, meeting.roomId)}
              />
            ))}
        </InfiniteScroll>
      </div>
    </ClassMeetingWrapper>
  )
}

ClassMeetingList.propTypes = {
  className: PropTypes.string,
}

export default ClassMeetingList

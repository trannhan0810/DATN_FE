import React from 'react'
import MeetingPageWrapper from './style'
import MeetingControlBar from './control-bar'

const Meeting = () => {
  return (
    <MeetingPageWrapper>
      <video className="video-container" src="" controls>
        <track kind="captions" />
      </video>
      <MeetingControlBar />
      <div className="messenger-container">
        <h1>sabsa</h1>
      </div>
    </MeetingPageWrapper>
  )
}

export default Meeting

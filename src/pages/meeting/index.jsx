import React, { useState } from 'react'
import MeetingPageWrapper from './style'
import MeetingControlBar from './control-bar'

const Meeting = () => {
  const [msgs, setMsgs] = useState([])

  return (
    <MeetingPageWrapper>
      <div className="video-grid">
        <video className="video-container" src="" controls>
          <track kind="captions" />
        </video>
        <div className="info-container">
          <div className="messenger" />
        </div>
      </div>

      <MeetingControlBar />
    </MeetingPageWrapper>
  )
}

export default Meeting

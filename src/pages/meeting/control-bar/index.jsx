import {
  AudioOutlined,
  FundProjectionScreenOutlined,
  MessageOutlined,
  PhoneFilled,
  TeamOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons'
import { Tooltip } from 'antd'
import React from 'react'
import './style.css'
import PropTypes from 'prop-types'

const MeetingControlBar = props => {
  const { toggleAudio, toggleVideo, shareScreen, showMessenger, showParticipant } = props

  return (
    <div className="meeting-control-container">
      <Tooltip title="Turn on video" onClick={toggleVideo}>
        <div className="meeting-control-btn">
          <VideoCameraOutlined className="meeting-control-icon" />
        </div>
      </Tooltip>
      <Tooltip title="Turn on audio" onClick={toggleAudio}>
        <div className="meeting-control-btn">
          <AudioOutlined className="meeting-control-icon" />
        </div>
      </Tooltip>
      <Tooltip title="Share screen" onClick={shareScreen}>
        <div className="meeting-control-btn">
          <FundProjectionScreenOutlined className="meeting-control-icon" />
        </div>
      </Tooltip>
      <Tooltip title="Show messenger" onClick={showMessenger}>
        <div className="meeting-control-btn">
          <MessageOutlined className="meeting-control-icon" />
        </div>
      </Tooltip>
      <Tooltip title="Show participant" onClick={showParticipant}>
        <div className="meeting-control-btn">
          <TeamOutlined className="meeting-control-icon" />
        </div>
      </Tooltip>
      <Tooltip title="End meeting" onClick={showParticipant}>
        <div className="end-meeting-btn">
          <PhoneFilled className="meeting-control-icon" rotate={225} />
          <span>Leave</span>
        </div>
      </Tooltip>
    </div>
  )
}

MeetingControlBar.propTypes = {
  toggleVideo: PropTypes.func,
  toggleAudio: PropTypes.func,
  shareScreen: PropTypes.func,
  showMessenger: PropTypes.func,
  showParticipant: PropTypes.func,
}

export default MeetingControlBar

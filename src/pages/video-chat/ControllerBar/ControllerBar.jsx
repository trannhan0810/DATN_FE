import React from 'react'
import { IconButton, Tooltip as MyToolTip } from '@mui/material'
import {
  CallEnd,
  CancelPresentationOutlined,
  ChatBubbleOutline,
  ChatOutlined,
  ContentCopyOutlined,
  MarkUnreadChatAltOutlined,
  Mic,
  MicOff,
  PresentToAllOutlined,
  VideocamOffOutlined,
  VideocamOutlined,
} from '@mui/icons-material'
import PeopleOutLineIcon from '@mui/icons-material/PeopleOutline'
import PropTypes from 'prop-types'
import useWindowDimensions from '../../../shared/hooks/useWindowDimensions'
import ControlBarWrapper from './style'

const ControllerBar = props => {
  const { width } = useWindowDimensions()
  const {
    userStream,
    videoMuted,
    muteVideo,
    audioMuted,
    muteAudio,
    screenShared,
    shareScreen,
    stopShareScreen,
    copyRoomId,
    messageAlert,
    isMessenger,
    setIsMessenger,
    setMessageAlert,
    peers,
    endCall,
  } = props

  const redButtonStyle = {
    backgroundColor: '#eb3f21',
    margin: `${width < 600 ? 2 : 4}px`,
    color: 'white',
  }

  const greyButtonStyle = {
    backgroundColor: '#404239',
    margin: `${width < 600 ? 2 : 4}px`,
    color: 'white',
  }

  const greenButtonStyle = {
    backgroundColor: '#8eb2f5',
    margin: `${width < 600 ? 2 : 4}px`,
    color: 'white',
  }

  return (
    <ControlBarWrapper>
      {width > 500 && (
        <h3
          style={{
            position: 'absolute',
            left: `${width < 600 ? 7 : 20}px`,
            color: 'white',
            fontSize: 'medium',
          }}
        >
          {new Date().toLocaleString('en-US', {
            hour12: true,
            hour: 'numeric',
            minute: 'numeric',
          })}
        </h3>
      )}
      <div
        style={{
          position: 'absolute',
          left: `${(width < 700 && (width * 38) / 100) || (width < 500 ? 14 : (width * 20) / 100)}px`,
        }}
      >
        {!screenShared && (
          <MyToolTip
            title={(userStream.current && 'Loading...') || (videoMuted ? 'Turn on Camera' : 'Turn off Camera')}
          >
            <IconButton onClick={muteVideo} style={videoMuted ? redButtonStyle : greyButtonStyle}>
              {videoMuted ? <VideocamOffOutlined /> : <VideocamOutlined />}
            </IconButton>
          </MyToolTip>
        )}

        <MyToolTip
          title={(userStream.current && 'Loading...') || (audioMuted ? 'Turn on Microphone' : 'Turn off Microphone')}
        >
          <IconButton onClick={muteAudio} style={audioMuted ? redButtonStyle : greyButtonStyle}>
            {audioMuted ? <MicOff /> : <Mic />}
          </IconButton>
        </MyToolTip>

        <MyToolTip title={(userStream.current && 'Loading...') || (screenShared ? 'Stop Presenting' : 'Present Now')}>
          <IconButton
            onClick={screenShared ? stopShareScreen : shareScreen}
            style={screenShared ? greenButtonStyle : greyButtonStyle}
          >
            {screenShared ? <CancelPresentationOutlined /> : <PresentToAllOutlined />}
          </IconButton>
        </MyToolTip>

        <MyToolTip title="Copy meeting Room">
          <IconButton onClick={copyRoomId} style={greyButtonStyle}>
            <ContentCopyOutlined />
          </IconButton>
        </MyToolTip>

        <MyToolTip title={messageAlert ? 'Unread messages' : 'Chat with Everyone'}>
          <IconButton
            onClick={() => {
              setIsMessenger(prev => !prev)
              if (messageAlert) setMessageAlert(false)
            }}
            style={greyButtonStyle}
          >
            {isMessenger && <ChatBubbleOutline />}
            {!isMessenger && messageAlert && <MarkUnreadChatAltOutlined />}
            {!isMessenger && !messageAlert && <ChatOutlined />}
          </IconButton>
        </MyToolTip>

        <MyToolTip title={`Participants: ${peers.length + 1}`}>
          <IconButton onClick={() => {}} style={greyButtonStyle}>
            <PeopleOutLineIcon />
          </IconButton>
        </MyToolTip>

        <MyToolTip title="Hang Up">
          <IconButton onClick={endCall} style={redButtonStyle}>
            <CallEnd />
          </IconButton>
        </MyToolTip>
      </div>
    </ControlBarWrapper>
  )
}

ControllerBar.propTypes = {
  userStream: PropTypes.shape({ current: PropTypes.instanceOf(MediaStream) }),
  videoMuted: PropTypes.bool,
  muteVideo: PropTypes.func,
  audioMuted: PropTypes.bool,
  muteAudio: PropTypes.func,
  screenShared: PropTypes.bool,
  shareScreen: PropTypes.func,
  stopShareScreen: PropTypes.func,
  copyRoomId: PropTypes.func,
  messageAlert: PropTypes.bool,
  isMessenger: PropTypes.bool,
  setIsMessenger: PropTypes.func,
  setMessageAlert: PropTypes.func,
  peers: PropTypes.arrayOf(PropTypes.any),
  endCall: PropTypes.func,
}

export default ControllerBar

import React, { useState } from 'react'
import PropsTypes from 'prop-types'
import { Col, Row } from 'antd'
import MeetingPageWrapper from './style'
import VideoGrid from './video-grid/VideoGrid'
import VideoGridItem from './video-grid-item/VideoGridItem'
import MessengerBox from './messenger/MessengerBox'
import MeetingControllerWrapper from './meeting-controller/style'
import VideoButton from './meeting-controller/buttons/VideoButton'
import AudioButton from './meeting-controller/buttons/AudioButton'
import ShareScreenButton from './meeting-controller/buttons/ShareScreenButton'
import CopyIdButton from './meeting-controller/buttons/CopyIdButton'
import MessengerButton from './meeting-controller/buttons/MessengerButton'
import ParticipantButton from './meeting-controller/buttons/ParticipantButton'
import CallEndButton from './meeting-controller/buttons/CallEndButton'
import useWindowDimensions from 'shared/hooks/useWindowDimensions'

const MeetingPage = props => {
  const numOfItem = 23
  const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21].slice(0, numOfItem)
  const { width } = useWindowDimensions()

  const [isVideoMuted, setIsVideoMuted] = useState(false)
  const [isAudioMuted, setIsAudioMuted] = useState(false)
  const [isScreenShared, setIsScreenShared] = useState(false)
  const [isShowMessenger, setShowMessenger] = useState(false)
  const [isHaveNewMessage, setIsHaveNewMessage] = useState(true)
  const [isShowParticipant, setShowParticipant] = useState(false)
  const [isShowRightVideos, setShowRightVideos] = useState(false)
  const isShowRightPart = isShowMessenger || isShowParticipant || isShowRightVideos

  const videoButtonHandler = () => setIsVideoMuted(!isVideoMuted)
  const audioButtonHandler = () => setIsAudioMuted(!isAudioMuted)
  const shareScreenButtonHandler = () => {
    setIsScreenShared(!isScreenShared)
    if (!isScreenShared) {
      setShowRightVideos(true)
    }
  }
  const messengerButtonHandler = () => {
    setIsHaveNewMessage(false)
    if (isShowMessenger === false) {
      setShowParticipant(false)
    }
    setShowMessenger(!isShowMessenger)
  }

  const participantButtonHandler = () => {
    if (isShowParticipant === false) {
      setShowMessenger(false)
    }
    setShowParticipant(!isShowParticipant)
  }

  return (
    <MeetingPageWrapper>
      <div className="meeting-main">
        {(!isShowRightPart || width > 480) && (
          <>
            {isScreenShared && <VideoGridItem />}
            {!isScreenShared && (
              <div className="meeting-videos">
                <VideoGrid numOfItem={numOfItem}>
                  {items.map(id => (
                    <VideoGridItem key={id} />
                  ))}
                </VideoGrid>
              </div>
            )}
          </>
        )}

        {isShowRightPart && (
          <div className="meeting-info">
            {isShowMessenger && <MessengerBox />}
            {!isShowMessenger && !isShowParticipant && isScreenShared && (
              <VideoGrid numOfItem={Math.min(numOfItem, 12)}>
                {items.slice(0, 12).map(id => (
                  <VideoGridItem key={id} />
                ))}
              </VideoGrid>
            )}
          </div>
        )}
      </div>
      <div className="control-bar">
        <MeetingControllerWrapper>
          <Row className="content">
            {width > 800 && (
              <Col className="time" md={3} sm={0} xs={0}>
                24:00
              </Col>
            )}

            <Col className="buttons" md={21} sm={24} xs={24}>
              <VideoButton isVideoMuted={isVideoMuted} onClick={videoButtonHandler} />
              <AudioButton isAudioMuted={isAudioMuted} onClick={audioButtonHandler} />
              <ShareScreenButton isScreenShared={isScreenShared} onClick={shareScreenButtonHandler} />
              <CopyIdButton />
              <MessengerButton
                isShowMessenger={isShowMessenger}
                isHaveNewMessage={isHaveNewMessage}
                onClick={messengerButtonHandler}
              />
              <ParticipantButton isShowParticipant={isShowParticipant} onClick={participantButtonHandler} />
              <CallEndButton />
            </Col>
          </Row>
        </MeetingControllerWrapper>
      </div>
    </MeetingPageWrapper>
  )
}

MeetingPage.propTypes = {}

export default MeetingPage

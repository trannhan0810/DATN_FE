/* eslint-disable prefer-destructuring */
/* eslint-disable no-console */
import React, { useEffect, useRef, useState } from 'react'
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
import MyVideoItem from './video-grid-item/MyVideoItem'
import useWindowDimensions from 'shared/hooks/useWindowDimensions'
import useRouter from 'shared/hooks/useRouter'

const MeetingPage = props => {
  const numOfItem = 23
  const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21].slice(0, numOfItem)
  const { width } = useWindowDimensions()
  const { history } = useRouter()

  const [isLoading, setIsLoading] = useState(false)

  const [isVideoMuted, setIsVideoMuted] = useState(false)
  const [isAudioMuted, setIsAudioMuted] = useState(false)
  const [isScreenShared, setIsScreenShared] = useState(false)
  const [isShowMessenger, setShowMessenger] = useState(false)
  const [isHaveNewMessage, setIsHaveNewMessage] = useState(true)
  const [isShowParticipant, setShowParticipant] = useState(false)
  const [isShowRightVideos, setShowRightVideos] = useState(false)
  const isShowRightPart = isShowMessenger || isShowParticipant || isShowRightVideos

  const userVideoRef = useRef(null)
  const userStream = useRef(null)
  const videoTrack = useRef(null)
  const audioTrack = useRef(null)

  const videoButtonHandler = () => {
    if (userStream.current) {
      if (userVideoRef.current.srcObject && !isScreenShared) {
        videoTrack.current.enabled = !videoTrack.current.enabled
      }
      setIsVideoMuted(!isVideoMuted)
    }
  }
  const audioButtonHandler = () => {
    if (userStream.current) {
      if (userVideoRef.current.srcObject && !isScreenShared) {
        audioTrack.current.enabled = !audioTrack.current.enabled
      }
      setIsVideoMuted(!isAudioMuted)
    }
  }
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

  const endCall = () => {
    if (userStream.current) {
      userStream.current.getTracks().forEach(track => track.stop())
    }
    history.push('/classes')
  }

  const joinInMeeting = () => {
    setIsLoading(true)
    setTimeout(() => {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then(myStream => {
          setIsLoading(false)
          userStream.current = myStream
          console.log(myStream)
          videoTrack.current = userStream.current.getTracks()[1]
          audioTrack.current = userStream.current.getTracks()[0]
          userVideoRef.current.srcObject = myStream
        })
        .catch(console.log)
    }, 1000)
  }

  useEffect(() => {
    setTimeout(() => {
      joinInMeeting()
    }, 500)
  }, [])

  return (
    <MeetingPageWrapper>
      <div className="meeting-main">
        {(!isShowRightPart || width > 480) && (
          <>
            {isScreenShared && <MyVideoItem />}
            {!isScreenShared && (
              <div className="meeting-videos">
                <VideoGrid numOfItem={numOfItem}>
                  {[<MyVideoItem ref={userVideoRef} key={-1} />, ...items.map(id => <VideoGridItem key={id} />)]}
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
              <CallEndButton onClick={endCall} />
            </Col>
          </Row>
        </MeetingControllerWrapper>
      </div>
    </MeetingPageWrapper>
  )
}

MeetingPage.propTypes = {}

export default MeetingPage

import React from 'react'
import { Col, Row } from 'antd'
import PropTypes from 'prop-types'
import MeetingControllerWrapper from './style'
import CallEndButton from './buttons/CallEndButton'
import VideoButton from './buttons/VideoButton'
import AudioButton from './buttons/AudioButton'
import ShareScreenButton from './buttons/ShareScreenButton'
import CopyIdButton from './buttons/CopyIdButton'
import MessengerButton from './buttons/MessengerButton'
import ParticipantButton from './buttons/ParticipantButton'
import useWindowDimensions from 'shared/hooks/useWindowDimensions'

const MeetingController = () => {
  const { width } = useWindowDimensions()

  return (
    <MeetingControllerWrapper>
      <Row className="content">
        {width > 800 && (
          <Col className="time" md={3} sm={0} xs={0}>
            24:00
          </Col>
        )}

        <Col className="buttons" md={21} sm={24} xs={24}>
          <VideoButton />
          <AudioButton />
          <ShareScreenButton />
          <CopyIdButton />
          <MessengerButton />
          <ParticipantButton />
          <CallEndButton />
        </Col>
      </Row>
    </MeetingControllerWrapper>
  )
}

MeetingController.propTypes = {}

export default MeetingController

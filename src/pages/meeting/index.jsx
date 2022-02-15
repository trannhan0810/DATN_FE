import React from 'react'
import PropsTypes from 'prop-types'
import { Col, Row } from 'antd'
import MeetingPageWrapper from './style'
import MeetingController from './meeting-controller/MeetingController'
import Messenger from './messenger/Messenger'
import VideoGrid from './video-grid/VideoGrid'
import VideoGridItem from './video-grid-item/VideoGridItem'

const MeetingPage = props => {
  const numOfItem = 2
  const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21].slice(0, numOfItem)
  return (
    <MeetingPageWrapper>
      <Row className="meeting-main">
        <Col md={24} sm={24} xs={24} className="meeting-videos">
          <VideoGrid numOfItem={numOfItem}>
            {items.map(id => (
              <VideoGridItem key={id} />
            ))}
          </VideoGrid>
        </Col>
        <Col md={0} sm={0} xs={0} className="meeting-info">
          {/* <Messenger setIsMessenger={() => {}} sendMsg={() => {}} messageList={[]} /> */}
        </Col>
      </Row>
      <div className="control-bar">
        <MeetingController />
      </div>
    </MeetingPageWrapper>
  )
}

MeetingPage.propTypes = {}

export default MeetingPage

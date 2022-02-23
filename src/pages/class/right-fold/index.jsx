/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { VideoCameraOutlined } from '@ant-design/icons'
import { Avatar, Tabs, Tooltip } from 'antd'
import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { v1 as uuid } from 'uuid'
import PropTypes from 'prop-types'
import { Send } from '@mui/icons-material'
import ClassMessenger from '../component/ClassMessenger'
import ClassMemberList from '../component/ClassMemberList'
import ClassMeetingList from '../component/ClassMeetingList'
import ClassInfoLayoutWrapper from './style'
import useMeeting from 'shared/hooks/useMeeting'

function RightFold(props) {
  const { handleExistingMeetJoin, startNewMeeting } = useMeeting()

  const tabData = [
    { displayText: 'Chat', component: <ClassMessenger /> },
    { displayText: 'Meetings', component: <ClassMeetingList /> },
    { displayText: 'Members', component: <ClassMemberList /> },
    { displayText: 'Setting', component: <div /> },
  ]

  return (
    <ClassInfoLayoutWrapper>
      <div className="rightFold-header">
        <div className="rightFold-class-name">Classes</div>
        <div className="rightFold-heading-right">
          <Tooltip className="add-button" onClick={startNewMeeting}>
            <VideoCameraOutlined /> Meet
          </Tooltip>
        </div>
      </div>

      <div className="rightFold-content">
        <Tabs
          defaultActiveKey={1}
          tabPosition="top"
          tabBarStyle={{ height: '40px', width: '100%', margin: 0, borderBottom: '2px solid lightgray' }}
          style={{ height: '100%', width: '100%' }}
        >
          {tabData.map((_ele, i) => (
            <Tabs.TabPane
              className="class-content"
              tab={tabData[i].displayText}
              key={Number(i)}
              style={{ flex: '1 1 0px' }}
            >
              {tabData[i].component}
            </Tabs.TabPane>
          ))}
        </Tabs>
      </div>
    </ClassInfoLayoutWrapper>
  )
}

RightFold.propTypes = {}

export default RightFold

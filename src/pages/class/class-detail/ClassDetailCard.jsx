/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { VideoCameraOutlined } from '@ant-design/icons'
import { Tooltip } from 'antd'
import React from 'react'
import ClassMessenger from '../component/ClassMessenger'
import ClassMemberList from '../component/ClassMemberList'
import ClassMeetingList from '../component/ClassMeetingList'
import ClassInfoLayoutWrapper, { ClassInfoHeader } from './style'
import useMeeting from 'shared/hooks/useMeeting'
import FoldCardWithTabs from 'shared/components/fold-card/FoldCardWithTabs'

function ClassDetailCard(props) {
  const { handleExistingMeetJoin, startNewMeeting } = useMeeting()

  const tabData = [
    { displayText: 'Chat', component: <ClassMessenger /> },
    { displayText: 'Meetings', component: <ClassMeetingList /> },
    { displayText: 'Members', component: <ClassMemberList /> },
    { displayText: 'Setting', component: <div /> },
  ]

  const Header = (
    <ClassInfoHeader>
      <div className="rightFold-class-name">Classes</div>
      <div className="rightFold-heading-right">
        <Tooltip className="add-button" onClick={startNewMeeting}>
          <VideoCameraOutlined /> Meet
        </Tooltip>
      </div>
    </ClassInfoHeader>
  )

  return (
    <ClassInfoLayoutWrapper>
      <FoldCardWithTabs FoldCardHeader={Header} tabs={tabData} />
    </ClassInfoLayoutWrapper>
  )
}

ClassDetailCard.propTypes = {}

export default ClassDetailCard

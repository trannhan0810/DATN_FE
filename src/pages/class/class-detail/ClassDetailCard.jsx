/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { VideoCameraOutlined } from '@ant-design/icons'
import { Tooltip } from 'antd'
import React from 'react'
import PropTypes from 'prop-types'
import ClassMessenger from '../component/class-messenger/ClassMessenger'
import ClassMemberList from '../component/ClassMemberList'
import ClassMeetingList from '../component/ClassMeetingList'
import ClassInfoLayoutWrapper, { ClassInfoHeader } from './style'
import useMeeting from 'shared/hooks/useMeeting'
import FoldCardWithTabs from 'shared/components/fold-card/FoldCardWithTabs'
import EllipsisFlexText from 'shared/components/EllipsisFlexText'

function ClassDetailCard(props) {
  const { classInfo, loading } = props
  const { handleExistingMeetJoin, startNewMeeting, startMeeting } = useMeeting()

  const tabData = [
    { displayText: 'Chat', component: <ClassMessenger loading={loading} classId={classInfo.id} /> },
    { displayText: 'Meetings', component: <ClassMeetingList /> },
    { displayText: 'Members', component: <ClassMemberList /> },
    { displayText: 'Setting', component: <div style={{ width: '100%' }} /> },
  ]

  const Header = (
    <ClassInfoHeader>
      <div className="rightFold-class-name">
        <EllipsisFlexText>Classes</EllipsisFlexText>
      </div>
      <Tooltip onClick={() => startMeeting(classInfo.id)}>
        <button type="button" className="add-button" style={{ cursor: 'pointer' }}>
          <VideoCameraOutlined /> Meet
        </button>
      </Tooltip>
    </ClassInfoHeader>
  )

  return (
    <ClassInfoLayoutWrapper>
      <FoldCardWithTabs FoldCardHeader={Header} tabs={tabData} />
    </ClassInfoLayoutWrapper>
  )
}

ClassDetailCard.propTypes = {
  loading: PropTypes.bool,
  classInfo: PropTypes.object,
}

export default ClassDetailCard

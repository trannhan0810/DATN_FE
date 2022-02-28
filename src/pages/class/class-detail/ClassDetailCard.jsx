/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { VideoCameraOutlined } from '@ant-design/icons'
import { Empty, Tooltip } from 'antd'
import React from 'react'
import PropTypes from 'prop-types'
import { useParams } from 'react-router'
import { MenuOpen } from '@mui/icons-material'
import ClassMessenger from '../component/ClassMessenger'
import ClassMemberList from '../component/ClassMemberList'
import ClassMeetingList from '../component/ClassMeetingList'
import ClassInfoLayoutWrapper, { ClassInfoHeader } from './style'
import useMeeting from 'shared/hooks/useMeeting'
import FoldCardWithTabs from 'shared/components/fold-card/FoldCardWithTabs'
import EllipsisFlexText from 'shared/components/EllipsisFlexText'
import FoldCard from 'shared/components/fold-card/FoldCard'
import useWindowDimensions from 'shared/hooks/useWindowDimensions'
import useRouter from 'shared/hooks/useRouter'

function ClassDetailCard(props) {
  const { classId } = useParams()
  const { width } = useWindowDimensions()
  const { history } = useRouter()

  if (!classId) return <FoldCard FoldCardContent={<div> {Empty.PRESENTED_IMAGE_DEFAULT}</div>} />

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
        {width < 720 && <MenuOpen style={{ marginRight: 8 }} onClick={() => history.push('/classes')} />}
        <EllipsisFlexText>{classInfo.name}</EllipsisFlexText>
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

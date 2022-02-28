import React, { useEffect, useRef, useState } from 'react'
import { CallToAction, Close, MoreHorizOutlined, Search } from '@mui/icons-material'
import { Avatar, Drawer, Empty, Tooltip } from 'antd'
import InitialsAvatar from 'react-initials-avatar'
import PropTypes from 'prop-types'
import { useParams } from 'react-router'
import useClassesMe from '../../../shared/hooks/useClassesMe'
import CreateClass from '../components/CreateClass'
import JoinClass from '../components/JoinClass'
import ClassListCardWrapper, { ClassListItem } from './style'
import FoldCard from 'shared/components/fold-card/FoldCard'
import EllipsisFlexText from 'shared/components/EllipsisFlexText'
import useRouter from 'shared/hooks/useRouter'
import SearchBarHeader from 'shared/components/SearchBarHeader'
import useWindowDimensions from 'shared/hooks/useWindowDimensions'

const ClassListCard = props => {
  const { myClasses, isLoading } = useClassesMe()
  const [allClasses, setAllClasses] = useState([])
  const [filterClasses, setFilterClasses] = useState([])
  const [isSearch, setIsSearch] = useState(false)
  const searchInputRef = useRef(null)
  const { history } = useRouter()
  const [showDrawer, setShowDrawer] = useState('')
  const { width } = useWindowDimensions()
  const { classId } = useParams()

  const Header = (
    <SearchBarHeader
      title="All Class"
      searchPlaceHolder="Type something to search"
      isSearch={isSearch}
      setIsSearch={setIsSearch}
      searchInputRef={searchInputRef}
    />
  )

  const Content = (
    <div className="class-list-content site-drawer-render-in-current-wrapper">
      <div className="class-list-container">
        {!isLoading && filterClasses.length === 0 && (
          <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {Empty.PRESENTED_IMAGE_DEFAULT}
            <h2> Not join any class</h2>{' '}
          </div>
        )}
        {filterClasses.map(classItem => (
          <ClassListItem
            style={{ backgroundColor: classId === classItem.id ? 'white' : 'transparent' }}
            key={classItem.id}
            onClick={() => history.push(`/classes/${classItem.id}`)}
          >
            <div className="class-list-item-avatar">
              {classItem.avatar ? (
                <Avatar size={48} src={classItem.avatar} shape="square" />
              ) : (
                <InitialsAvatar name={classItem.name} />
              )}
            </div>
            <div className="class-list-item-name">
              <EllipsisFlexText>{classItem.name}</EllipsisFlexText>
            </div>
            {/* <div className="class-list-item-menu">
              <MoreHorizOutlined />
            </div> */}
          </ClassListItem>
        ))}
      </div>
      <Tooltip className="class-list-action" onClick={() => setShowDrawer('createClass')}>
        Create class
      </Tooltip>
      <Tooltip className="class-list-action" onClick={() => setShowDrawer('joinClass')}>
        Join class with code
      </Tooltip>
      <Drawer
        title={(showDrawer === 'createClass' && 'Create New Class') || (showDrawer === 'joinClass' && 'Join Class')}
        placement="bottom"
        closable
        onClose={() => {
          setShowDrawer('')
        }}
        visible={showDrawer === 'createClass' || showDrawer === 'joinClass'}
        getContainer={false}
        style={{ position: 'absolute' }}
      >
        {showDrawer === 'createClass' && <CreateClass onOK={() => setShowDrawer('')} />}
        {showDrawer === 'joinClass' && <JoinClass />}
      </Drawer>
    </div>
  )

  useEffect(() => {
    if (!isLoading) {
      setAllClasses(myClasses)
      setFilterClasses(myClasses)
    }
  }, [isLoading])

  useEffect(() => {
    if (!classId && !isLoading && myClasses.length > 0 && width > 720) {
      history.push(`/classes/${myClasses[0].id}`)
    }
  }, [classId, isLoading, myClasses, width])

  return (
    <ClassListCardWrapper>
      <FoldCard FoldCardHeader={Header} FoldCardContent={Content} />
    </ClassListCardWrapper>
  )
}

ClassListCard.propTypes = {
  // classes: PropTypes.arrayOf(
  //   PropTypes.shape({
  //     id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  //     name: PropTypes.string,
  //     avatar: PropTypes.string,
  //   }),
  // ),
  // loading: PropTypes.bool,
}

export default ClassListCard

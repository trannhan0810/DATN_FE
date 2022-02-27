import React, { useEffect, useRef, useState } from 'react'
import { CallToAction, Close, MoreHorizOutlined, Search } from '@mui/icons-material'
import { Avatar, Empty, Tooltip, Row, Col } from 'antd'
import InitialsAvatar from 'react-initials-avatar'
import PropTypes from 'prop-types'
import useClassesMe from '../../../shared/hooks/useClassesMe'
import ClassListCardWrapper, { ClassListItem } from './style'
import FoldCard from 'shared/components/fold-card/FoldCard'
import EllipsisFlexText from 'shared/components/EllipsisFlexText'
import useRouter from 'shared/hooks/useRouter'
import SearchBarHeader from 'shared/components/SearchBarHeader'

const ClassListCard = props => {
  const { myClasses, isLoading } = useClassesMe()
  const [allClasses, setAllClasses] = useState([])
  const [filterClasses, setFilterClasses] = useState([])
  const [isSearch, setIsSearch] = useState(false)
  const searchInputRef = useRef(null)
  const { history } = useRouter()

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
    <div className="class-list-content">
      <div className="class-list-container">
        {!isLoading && filterClasses.length === 0 && (
          <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {Empty.PRESENTED_IMAGE_DEFAULT}
            <h2> Not join any class</h2>{' '}
          </div>
        )}
        <Row gutter={12} style={{ width: '100%' }}>
          {filterClasses.map(classItem => (
            <Col
              key={classItem.id}
              span={6}
              style={{ padding: 16, cursor: 'pointer' }}
              onClick={() => history.push(`/classes/${classItem.id}`)}
            >
              <div
                style={{
                  padding: 16,
                  backgroundColor: 'white',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  borderRadius: 8,
                }}
              >
                <div>
                  {classItem.avatar ? (
                    <Avatar size={64} src={classItem.avatar} shape="square" />
                  ) : (
                    <InitialsAvatar name={classItem.name} />
                  )}
                </div>
                <div>{classItem.name}</div>
                <div>
                  <MoreHorizOutlined />
                </div>
              </div>
            </Col>

            // <ClassListItem key={classItem.id} onClick={() => history.push(`/classes/${classItem.id}`)}>
            //   <div className="class-list-item-avatar">
            //     {classItem.avatar ? (
            //       <Avatar size={48} src={classItem.avatar} shape="square" />
            //     ) : (
            //       <InitialsAvatar name={classItem.name} />
            //     )}
            //   </div>
            //   <div className="class-list-item-name">
            //     <EllipsisFlexText>{classItem.name}</EllipsisFlexText>
            //   </div>
            //   <div className="class-list-item-menu">
            //     <MoreHorizOutlined />
            //   </div>
            // </ClassListItem>
          ))}
        </Row>
      </div>
    </div>
  )

  useEffect(() => {
    if (!isLoading) {
      setAllClasses(myClasses)
      setFilterClasses(myClasses)
    }
  }, [isLoading])

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

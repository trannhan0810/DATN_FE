import React, { useEffect, useRef, useState } from 'react'
import { Close, More, MoreHorizOutlined, MoreOutlined, Search } from '@mui/icons-material'
import { Avatar, Tooltip, Typography } from 'antd'
import InitialsAvatar from 'react-initials-avatar'
import PropTypes from 'prop-types'
import Text from 'antd/lib/typography/Text'
import ClassListCardWrapper, { ClassListItem } from './style'
import FoldCard from 'shared/components/fold-card/FoldCard'
import EllipsisFlexText from 'shared/components/EllipsisFlexText'

const ClassListCard = props => {
  const { classes, loading } = props
  const [allClasses, setAllClasses] = useState([])
  const [filterClasses, setFilterClasses] = useState([])
  const [isSearch, setIsSearch] = useState(false)
  const searchInputRef = useRef(null)

  const Header = (
    <div className="search-header">
      <div className="search-bar">
        {isSearch ? (
          <input ref={searchInputRef} className="search-bar" placeholder="Type something to search" />
        ) : (
          'All Class'
        )}
      </div>
      <Tooltip className="search-icon" onClick={() => setIsSearch(!isSearch)}>
        {isSearch ? <Close /> : <Search />}
      </Tooltip>
    </div>
  )

  const Content = (
    <div className="class-list-content">
      <div className="class-list-container">
        {filterClasses.map(classItem => (
          <ClassListItem key={classItem.id}>
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
            <div className="class-list-item-menu">
              <MoreHorizOutlined />
            </div>
          </ClassListItem>
        ))}
      </div>
    </div>
  )

  useEffect(() => {
    if (!loading) {
      setAllClasses(classes)
      setFilterClasses(classes)
    }
  }, [loading])

  return (
    <ClassListCardWrapper>
      <FoldCard FoldCardHeader={Header} FoldCardContent={Content} />
    </ClassListCardWrapper>
  )
}

ClassListCard.propTypes = {
  classes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      name: PropTypes.string,
      avatar: PropTypes.string,
    }),
  ),
  loading: PropTypes.bool,
}

export default ClassListCard

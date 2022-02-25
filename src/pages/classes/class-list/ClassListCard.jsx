import React, { useEffect, useRef, useState } from 'react'
import { CallToAction, Close, MoreHorizOutlined, Search } from '@mui/icons-material'
import { Avatar, Tooltip } from 'antd'
import InitialsAvatar from 'react-initials-avatar'
import PropTypes from 'prop-types'
import useClassesMe from '../../../shared/hooks/useClassesMe'
import ClassListCardWrapper, { ClassListItem } from './style'
import FoldCard from 'shared/components/fold-card/FoldCard'
import EllipsisFlexText from 'shared/components/EllipsisFlexText'
import useRouter from 'shared/hooks/useRouter'

const ClassListCard = props => {
  const { myClasses, isLoading } = useClassesMe()
  const [allClasses, setAllClasses] = useState([])
  const [filterClasses, setFilterClasses] = useState([])
  const [isSearch, setIsSearch] = useState(false)
  const searchInputRef = useRef(null)
  const { history } = useRouter()

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
          <ClassListItem key={classItem.id} onClick={() => history.push(`/classes/${classItem.id}`)}>
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
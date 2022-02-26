/* eslint-disable jsx-a11y/label-has-associated-control */
import { Tooltip } from 'antd'
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Redirect, useLocation } from 'react-router'
import { LeftOutlined } from '@ant-design/icons'
import SkeletonImage from 'antd/lib/skeleton/Image'
import ClassInfoWrapper from './style'
import useRouter from 'shared/hooks/useRouter'
import FoldCard from 'shared/components/fold-card/FoldCard'

function ClassSummaryCard(props) {
  const [redirect, setRedirect] = useState('')
  const location = useLocation()
  const { history } = useRouter()
  const { classInfo, loading } = props

  const backToAllClasses = () => {
    history.push(location.pathname)
    setRedirect('/classes')
  }

  const classDetail = {
    name: classInfo.name ?? '',
    avatar: classInfo.avatar ?? '',
    numOfMember: 3,
  }

  const Header = (
    <div className="class-summary-header">
      {redirect.length > 1 && <Redirect to={redirect} />}
      <Tooltip onClick={backToAllClasses} style={{ fontSize: 120 }}>
        <LeftOutlined />
        <label className="menu-label pointer-mouse">Classes</label>
      </Tooltip>
    </div>
  )

  const Content = (
    <div className="class-summary-content">
      {loading && <SkeletonImage className="class-summary-avatar" loading={loading} />}
      {!loading && <img className="class-summary-avatar" src={classDetail.avatar} alt="" />}
      <div className="element">
        <div className="truncate class-summary-name">{classDetail.name}</div>
      </div>
    </div>
  )

  return (
    <ClassInfoWrapper>
      <FoldCard FoldCardHeader={Header} FoldCardContent={Content} />
    </ClassInfoWrapper>
  )
}

ClassSummaryCard.propTypes = {
  loading: PropTypes.bool,
  classInfo: PropTypes.shape({
    name: PropTypes.string,
    avatar: PropTypes.string,
  }),
  classMember: PropTypes.shape({}),
}

export default ClassSummaryCard

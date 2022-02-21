/* eslint-disable jsx-a11y/label-has-associated-control */
import { Tooltip } from 'antd'
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Redirect, useLocation } from 'react-router'
import { LeftOutlined, UserAddOutlined } from '@ant-design/icons'
import classImg from '../../../assets/images/class-img.jpg'
import ClassInfoWrapper from './style'
import useRouter from 'shared/hooks/useRouter'

function LeftFold(props) {
  const [redirect, setRedirect] = useState('')
  const location = useLocation()
  const { history } = useRouter()
  const { classInfo } = props

  const backToAllClasses = () => {
    history.push(location.pathname)
    setRedirect('/classes')
  }

  const classDetail = {
    name: classInfo.name ?? 'Art Is Kaboommmm!',
    avatar: classInfo.avatar ?? classImg,
    numOfMember: 3,
  }

  return (
    <>
      <ClassInfoWrapper>
        <div className="class-info-header">
          {redirect.length > 1 && <Redirect to={redirect} />}
          <Tooltip title="All classes" onClick={backToAllClasses}>
            <LeftOutlined />
            <label className="menu-label pointer-mouse">Class</label>
          </Tooltip>
        </div>
        <div className="class-info-content">
          <img className="class-info-avatar" src={classDetail.avatar} alt="" />
          <h1 className="class-info-name">{classDetail.name}</h1>
        </div>
        <div className="class-info-bottom" />
      </ClassInfoWrapper>
    </>
  )
}

LeftFold.propTypes = {
  classInfo: PropTypes.shape({
    name: PropTypes.string,
    avatar: PropTypes.string,
  }),
  classMember: PropTypes.shape({}),
}

export default LeftFold

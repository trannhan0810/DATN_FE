/* eslint-disable jsx-a11y/label-has-associated-control */
import { Button, Tooltip } from 'antd'
import React, { useState } from 'react'
import { Redirect, useLocation } from 'react-router'
import { LeftOutlined, UserAddOutlined } from '@ant-design/icons'
import classImg from '../../../assets/images/class-img.jpg'
import { DialerList } from './member'
import MemberItem from './member-item/member-item'
import './left-fold.css'
import useRouter from 'shared/hooks/useRouter'

function LeftFold() {
  const dialerList = DialerList
  const [redirect, setRedirect] = useState('')
  const location = useLocation()
  const { history } = useRouter()
  const backToAllClasses = () => {
    history.push(location.pathname)
    setRedirect('/classes')
  }

  const classDetail = {
    name: 'Art Is Kaboommmm!',
    avatar: classImg,
    numOfMember: 3,
  }

  return (
    <div className="leftFold">
      {redirect.length > 1 && <Redirect to={redirect} />}
      <div className="leftFold-top">
        <div className="leftFold-header">
          <Tooltip title="All classes" onClick={backToAllClasses}>
            <LeftOutlined />
          </Tooltip>
          <label className="menu-label">Class</label>
        </div>
        <img className="class-img" src={classDetail.avatar} alt="" />
        <h1 className="class-name">{classDetail.name}</h1>
      </div>

      <div className="leftFold-bottom">
        <div className="flex space-between">
          <div className="justify-left flex">
            <label className="dialer-label">Member ({classDetail.numOfMember}) </label>
          </div>
          <div className="justify-right flex">
            <Tooltip title="Add member">
              <Button className="add-member-btn">
                <UserAddOutlined />
              </Button>
            </Tooltip>
          </div>
        </div>

        <div className="dialer-search">
          <input placeholder="Type a name" style={{ width: '100%' }} />
        </div>
        <div className="dialer-suggested">
          <div className="suggested-list">
            {dialerList.map(item => {
              return <MemberItem key={item.id} item={item} />
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default LeftFold

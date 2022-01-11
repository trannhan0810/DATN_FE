/* eslint-disable jsx-a11y/label-has-associated-control */
import { VideoCameraFilled, VideoCameraOutlined } from '@ant-design/icons'
import { Tooltip } from 'antd'
import Item from 'antd/lib/list/Item'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { CallsContact } from './calls'
import ContactCard from './class-card/class-card'
import './right-fold.css'

function RightFold() {
  return (
    <div className="rightFold">
      <div className="rightFold-heading">
        <div>
          <label className="heading-label">Classes</label>
          <label className="heading-sub-label">Classes</label>
          <label className="heading-sub-label">Classes</label>
        </div>
        <div className="contact-search">
          <input className="no-outline" placeholder="Find a class" />
          <div className="contact-search-icon">
            <i className="fi-rr-search" />
          </div>
        </div>
        <div className="flex justify-end btn-list">
          <Tooltip className="add-button">
            <Link to="/meeting" target="_blank">
              <VideoCameraOutlined className="add-icon" />
              <label className="add-label">Meet</label>
            </Link>
          </Tooltip>
        </div>
      </div>
      {/* <div className="contact-list">
        {contacts.map(item => {
          return <ContactCard key={item.id} item={item} />
        })}
      </div> */}
    </div>
  )
}

export default RightFold

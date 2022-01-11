/* eslint-disable jsx-a11y/label-has-associated-control */
import { Tooltip } from 'antd'
import React from 'react'
import { ClassList } from './calls'
import ContactCard from './class-card/class-card'
import './right-fold.css'

function RightFold() {
  const classes = ClassList

  return (
    <div className="rightFold">
      <div className="rightFold-heading">
        <label className="heading-label">Classes</label>
      </div>
      <div className="rightFold-options">
        <div className="contact-search">
          <input className="no-outline" placeholder="Find a class" />
          <div className="contact-search-icon">
            <i className="fi-rr-search" />
          </div>
        </div>
        <div className="btn-list">
          <Tooltip className="add-button">
            <span className="add-icon">
              <i className="fi-rr-user-add" />
            </span>
            <label className="add-label">Join Class</label>
          </Tooltip>
          <Tooltip className="add-button">
            <span className="add-icon">
              <i className="fi-rr-user-add" />
            </span>
            <label className="add-label">Creat Class</label>
          </Tooltip>
        </div>
      </div>
      <div className="contact-list">
        {classes.map(item => {
          return <ContactCard key={item.id} item={item} />
        })}
      </div>
    </div>
  )
}

export default RightFold

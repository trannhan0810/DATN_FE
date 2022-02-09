/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react'
import PropTypes from 'prop-types'
import ContactCard from './class-card/class-card'
import './right-fold.css'
import JoinClassModal from './join-class-modal/JoinClassModal'
import useToggle from 'shared/hooks/useToggle'

function RightFold(props) {
  const { classes } = props
  const { isVisible: isJoinClassVisible, onClose: closeJoinClassModal, onOpen: openJoinClassModal } = useToggle()

  return (
    <>
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
            <button className="add-button" type="button" onClick={openJoinClassModal}>
              <span className="add-icon">
                <i className="fi-rr-user-add" />
              </span>
              <label className="add-label">Join Class</label>
            </button>
            <button className="add-button" type="button">
              <span className="add-icon">
                <i className="fi-rr-user-add" />
              </span>
              <label className="add-label">Create Class</label>
            </button>
          </div>
        </div>
        <div className="contact-list">
          {classes.map(item => {
            return <ContactCard key={item.id} item={item} />
          })}
        </div>
      </div>
      <JoinClassModal
        isVisible={isJoinClassVisible}
        handleOk={() => {
          closeJoinClassModal()
        }}
        handleCancel={closeJoinClassModal}
      />
    </>
  )
}

RightFold.propTypes = {
  classes: PropTypes.arrayOf(PropTypes.shape({ name: PropTypes.string })),
}

export default RightFold

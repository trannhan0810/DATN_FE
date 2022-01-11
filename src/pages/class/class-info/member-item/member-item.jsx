/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react'
import PropTypes from 'prop-types'
import MemberItemWrapper from './style'

const DialerItem = ({ item }) => {
  return (
    <MemberItemWrapper>
      <div className="dialer-item">
        <img src={item.avatar} alt="" className="item-avatar" />
        <div className="item-info">
          <label className="item-title">{item.name}</label>
          <label className="item-subtitle">{item.type}</label>
        </div>
      </div>
    </MemberItemWrapper>
  )
}

DialerItem.propTypes = {
  item: PropTypes.shape({
    avatar: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string,
  }),
}

export default DialerItem

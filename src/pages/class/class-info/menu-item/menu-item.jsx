/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react'
import PropTypes from 'prop-types'
import { Tooltip } from 'antd'
import ClassMenuItemWrapper from './style'

function MenuItem({ item, isActive }) {
  const classList = isActive ? 'item-active menu-item' : 'menu-item'
  return (
    <ClassMenuItemWrapper>
      <Tooltip className={classList}>
        <div className="item-icon">{item.icon}</div>
        <label className="item-label">{item.name}</label>
      </Tooltip>
    </ClassMenuItemWrapper>
  )
}

MenuItem.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string,
    icon: PropTypes.string,
    type: PropTypes.string,
  }),
  isActive: PropTypes.bool,
}

export default MenuItem

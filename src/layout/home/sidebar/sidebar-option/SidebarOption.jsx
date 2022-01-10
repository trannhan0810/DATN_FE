import React from 'react'
import PropTypes from 'prop-types'
import { Redirect, useLocation } from 'react-router'
import { Tooltip } from 'antd'
import SidebarOptionWrapper from './style'

const SidebarOption = ({ option, isActive }) => {
  const location = useLocation()
  isActive = location.pathname === option.path
  const classList = isActive ? 'sidebar-option active' : 'sidebar-option'
  const onClick = () => <Redirect to={option.path || '/'} />
  return (
    <SidebarOptionWrapper>
      <Tooltip title={option.name} onClick={onClick}>
        <div className={classList}>
          <div className="sidebar-icon">{option.icon}</div>
          {option.name && <span className="sidebar-label">{option.name}</span>}
        </div>
      </Tooltip>
    </SidebarOptionWrapper>
  )
}

SidebarOption.propTypes = {
  option: PropTypes.shape({
    name: PropTypes.string,
    icon: PropTypes.node,
    id: PropTypes.number,
    path: PropTypes.string,
  }),
  isActive: PropTypes.bool,
}

export default SidebarOption

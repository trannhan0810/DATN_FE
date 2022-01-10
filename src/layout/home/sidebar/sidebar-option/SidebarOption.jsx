import React from 'react'
import PropTypes from 'prop-types'
import { useLocation } from 'react-router'
import { Tooltip } from 'antd'
import { Link } from 'react-router-dom'
import SidebarOptionWrapper from './style'

const SidebarOption = ({ option }) => {
  const location = useLocation()
  const isActive = location.pathname === option.path
  const classList = isActive ? 'sidebar-option active' : 'sidebar-option'

  return (
    <SidebarOptionWrapper>
      <Tooltip className={classList}>
        <Link to={option.path || '/'}>
          <div className="sidebar-icon">{option.icon}</div>
          {option.name && <span className="sidebar-label">{option.name}</span>}
        </Link>
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
}

export default SidebarOption

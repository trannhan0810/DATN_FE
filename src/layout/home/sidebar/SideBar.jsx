import React from 'react'
import PropTypes from 'prop-types'
import { SidebarBottom, SidebarData, SidebarMore } from './sidebarData'
import SidebarWrapper from './style'
import SidebarOption from './sidebar-option/SidebarOption'

function Sidebar(props) {
  const topOptions = SidebarData
  const more = SidebarMore
  const bottomOption = SidebarBottom
  const { className } = props

  return (
    <SidebarWrapper className={className}>
      <div className="sidebar-top">
        {topOptions.map(option => (
          <SidebarOption key={option.id} option={option} />
        ))}
        <SidebarOption option={more} />
      </div>
    </SidebarWrapper>
  )
}

Sidebar.propTypes = {
  className: PropTypes.string,
}

export default Sidebar

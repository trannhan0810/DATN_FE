import React from 'react'
import { SidebarBottom, SidebarData, SidebarMore } from './sidebarData'
import SidebarWrapper from './style'
import SidebarOption from './sidebar-option/SidebarOption'

function Sidebar() {
  const topOptions = SidebarData
  const more = SidebarMore
  const bottomOption = SidebarBottom

  return (
    <SidebarWrapper>
      <div className="sidebar-top">
        <div>
          {topOptions.map(option => (
            <SidebarOption key={option.id} option={option} />
          ))}
        </div>
        <div>
          <SidebarOption option={more} />
        </div>
      </div>
      {/* <div className="sidebar-bottom">
        {bottomOption.map(option => {
          return <SidebarOption key={option.id} option={option} />
        })}
      </div> */}
    </SidebarWrapper>
  )
}

export default Sidebar

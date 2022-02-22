import React, { useState } from 'react'
import PropTypes from 'prop-types'
import HomeLayoutStyle from './style'
import { SidebarData, SidebarMore } from './sidebar/sidebarData'
import Header from './header/Header'
import SidebarOption from './sidebar/sidebar-option/SidebarOption'

const HomeLayout = props => {
  // eslint-disable-next-line react/destructuring-assignment
  const { LeftFold, RightFold, isHaveLeftFold = true } = props
  const [isShowLeftFold, setShowLeftFold] = useState(isHaveLeftFold)
  const topOptions = SidebarData
  const more = SidebarMore
  return (
    <HomeLayoutStyle>
      <Header className="home-header" onClickIcon={() => setShowLeftFold(!isShowLeftFold)} />
      <div className="home-body">
        <div className="home-sidebar">
          {topOptions.map(option => (
            <SidebarOption key={option.id} option={option} className="side-bar-icon" />
          ))}
          <SidebarOption option={more} className="side-bar-icon" />
        </div>
        <div className="content">
          {isHaveLeftFold && isShowLeftFold && <div className="content-left-fold">{LeftFold}</div>}
          <div className="content-right-fold">{RightFold}</div>
        </div>
      </div>
    </HomeLayoutStyle>
  )
}

HomeLayout.propTypes = {
  isHaveLeftFold: PropTypes.bool,
  LeftFold: PropTypes.node,
  RightFold: PropTypes.node,
}

export default HomeLayout

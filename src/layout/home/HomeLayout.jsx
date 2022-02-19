import React, { useState } from 'react'
import PropTypes from 'prop-types'
import HomeLayoutStyle from './style'
import Sidebar from './sidebar/SideBar'
import Header from './header/Header'

const HomeLayout = props => {
  // eslint-disable-next-line react/destructuring-assignment
  const { LeftFold, RightFold, isHaveLeftFold = true } = props
  const [isShowLeftFold, setShowLeftFold] = useState(isHaveLeftFold)
  return (
    <HomeLayoutStyle>
      <div className="home-header">
        <Header onClickIcon={() => setShowLeftFold(!isShowLeftFold)} />
      </div>
      <div className="home-body">
        <div className="home-body-inner">
          <div className="home-sidebar">
            <Sidebar />
          </div>
          <div className="content">
            {isHaveLeftFold && isShowLeftFold && <div className="content-left-fold">{LeftFold}</div>}
            <div className="content-right-fold">{RightFold}</div>
          </div>
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

import React from 'react'
import PropTypes from 'prop-types'
import HomeLayoutStyle from './style'
import Sidebar from './sidebar/SideBar'
import Header from './header/Header'

const HomeLayout = ({ children }) => {
  return (
    <HomeLayoutStyle>
      <div className="calls-container">
        <Header />
        <div className="calls-body">
          <div className="calls-sidebar">
            <Sidebar />
          </div>
          <div className="calls-leftFold">{/* <LeftFold /> */}</div>
          <div className="calls-rightFold">{/* <RightFold /> */}</div>
        </div>
      </div>
    </HomeLayoutStyle>
  )
}

HomeLayout.propTypes = {
  children: PropTypes.node,
}

export default HomeLayout

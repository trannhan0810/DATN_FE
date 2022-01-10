import React from 'react'
import PropTypes from 'prop-types'
import HomeLayoutStyle from './style'
import Sidebar from './sidebar/SideBar'
import Header from './header/Header'

const HomeLayout = ({ children }) => {
  return (
    <HomeLayoutStyle>
      <div className="home-container">
        <Header />
        <div className="home-body">
          <div className="home-sidebar">
            <Sidebar />
          </div>
          <div className="content">{children}</div>
          {/* <div className="home-leftFold"><LeftFold /></div>
          <div className="home-rightFold"><RightFold /> </div> */}
        </div>
      </div>
    </HomeLayoutStyle>
  )
}

HomeLayout.propTypes = {
  children: PropTypes.node,
}

export default HomeLayout

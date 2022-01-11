import React from 'react'
import ClassesPageStyle from './style'
import RightFold from './right-fold'
import HomeLayout from 'layout/home/HomeLayout'

const Classes = () => {
  return (
    <HomeLayout>
      <ClassesPageStyle>
        {/* <div className="home-leftFold">
          <LeftFold />
        </div>
        <div className="home-rightFold">
          <RightFold />
        </div> */}
        <RightFold />
      </ClassesPageStyle>
    </HomeLayout>
  )
}

export default Classes

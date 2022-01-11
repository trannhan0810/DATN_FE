import React from 'react'
import ClassPageStyle from './style'
import ClassInfo from './class-info'
import RightFold from './right-fold'
import HomeLayout from 'layout/home/HomeLayout'

const Class = () => {
  return (
    <HomeLayout>
      <ClassPageStyle>
        <div className="home-leftFold">
          <ClassInfo />
        </div>
        <div className="home-rightFold">
          <RightFold />
        </div>
      </ClassPageStyle>
    </HomeLayout>
  )
}

export default Class

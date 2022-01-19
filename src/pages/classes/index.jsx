import React from 'react'
import ClassesPageWrapper from './style'
import RightFold from './right-fold'
import HomeLayout from 'layout/home/HomeLayout'

const Classes = () => {
  return (
    <HomeLayout>
      <ClassesPageWrapper>
        <RightFold />
      </ClassesPageWrapper>
    </HomeLayout>
  )
}

export default Classes

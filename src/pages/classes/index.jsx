import React, { useEffect, useState } from 'react'
import ClassListCard from './class-list/ClassListCard'
import HomeLayout from 'layout/home/HomeLayout'
import useWindowDimensions from 'shared/hooks/useWindowDimensions'

const Classes = () => {
  const { width } = useWindowDimensions()
  const [loading, setLoading] = useState(true)
  const [classes, setClasses] = useState([])

  if (width < 720) {
    return <HomeLayout isHaveLeftFold={false} RightFold={<ClassListCard />} />
  }

  // return <HomeLayout LeftFold={<ClassListCard />} RightFold={<RightFold loading={loading} classes={classes} />} />
  return <HomeLayout isHaveLeftFold={false} RightFold={<ClassListCard />} />
}

export default Classes

import React, { useEffect, useState } from 'react'
import { FlareSharp } from '@mui/icons-material'
import ClassesPageWrapper from './style'
import RightFold from './right-fold'
import ClassListCard from './class-list/ClassListCard'
import HomeLayout from 'layout/home/HomeLayout'
import { getClasses } from 'api/class'
import { showError } from 'core/tools'
import useWindowDimensions from 'shared/hooks/useWindowDimensions'

const Classes = () => {
  const { width } = useWindowDimensions()
  const [loading, setLoading] = useState(true)
  const [classes, setClasses] = useState([])

  if (width < 720) {
    return <HomeLayout isHaveLeftFold={false} RightFold={<ClassListCard />} />
  }

  return <HomeLayout LeftFold={<ClassListCard />} RightFold={<RightFold loading={loading} classes={classes} />} />
}

export default Classes

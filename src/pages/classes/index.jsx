import React, { useEffect, useState } from 'react'
import { FlareSharp } from '@mui/icons-material'
import ClassesPageWrapper from './style'
import RightFold from './right-fold'
import ClassListCard from './class-list/ClassListCard'
import HomeLayout from 'layout/home/HomeLayout'
import { getClasses } from 'api/class'
import { showError } from 'core/tools'

const Classes = () => {
  const [loading, setLoading] = useState(true)
  const [classes, setClasses] = useState([])

  return <HomeLayout LeftFold={<ClassListCard />} RightFold={<RightFold loading={loading} classes={classes} />} />
}

export default Classes

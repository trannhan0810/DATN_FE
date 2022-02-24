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
  useEffect(() => {
    const getClassList = async () => {
      setLoading(true)
      try {
        const data = await getClasses({})
        setClasses(data)
      } catch {
        showError('Load data fail')
        setClasses([])
      } finally {
        setLoading(false)
      }
    }
    getClassList()
  }, [])

  return (
    <HomeLayout
      LeftFold={<ClassListCard loading={loading} classes={classes} />}
      RightFold={<RightFold loading={loading} classes={classes} />}
    />
  )
}

export default Classes

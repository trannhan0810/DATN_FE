import React, { useEffect, useState } from 'react'
import ClassesPageWrapper from './style'
import RightFold from './right-fold'
import { ClassList } from './classList'
import HomeLayout from 'layout/home/HomeLayout'
import { getClasses } from 'api/class'
import { showError } from 'core/tools'

const Classes = () => {
  const [loading, setLoading] = useState(false)
  const [classes, setClasses] = useState([])
  useEffect(async () => {
    setLoading(true)
    try {
      const data = await getClasses({})
      setClasses(data.results)
    } catch {
      showError('Load data fail')
    } finally {
      setLoading(false)
    }
  }, [])

  return (
    <HomeLayout>
      <ClassesPageWrapper>
        <RightFold classes={classes} />
      </ClassesPageWrapper>
    </HomeLayout>
  )
}

export default Classes

import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import ClassSummaryCard from './class-summary/ClassSummaryCard'
import ClassDetailCard from './class-detail/ClassDetailCard'
import HomeLayout from 'layout/home/HomeLayout'
import { getClass } from 'api/class'
import { showError } from 'core/tools'

const Class = () => {
  const { id } = useParams()
  const [loading, setLoading] = useState(false)
  const [classInfo, setClassInfo] = useState({})

  useEffect(() => {
    setLoading(true)
    const getClassData = async () => {
      try {
        const data = await getClass(id)
        setClassInfo(data)
      } catch {
        showError('Load data fail')
      } finally {
        setLoading(false)
      }
    }
    getClassData()
  }, [])

  return (
    <HomeLayout
      LeftFold={<ClassSummaryCard loading={loading} classInfo={classInfo} />}
      RightFold={<ClassDetailCard />}
    />
  )
}

export default Class

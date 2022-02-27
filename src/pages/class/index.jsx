import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import ClassSummaryCard from './class-summary/ClassSummaryCard'
import ClassDetailCard from './class-detail/ClassDetailCard'
import HomeLayout from 'layout/home/HomeLayout'
import { getClass } from 'api/class'
import { showError } from 'core/tools'
import ClassListCard from 'pages/classes/class-list/ClassListCard'

const Class = () => {
  const { classId } = useParams()
  const [loading, setLoading] = useState(false)
  const [classInfo, setClassInfo] = useState({})

  useEffect(() => {
    setLoading(true)
    const getClassData = async () => {
      try {
        const data = await getClass(classId)
        setClassInfo(data)
      } catch {
        showError('Load data fail')
      } finally {
        setLoading(false)
      }
    }
    getClassData()
  }, [classId])

  return (
    <HomeLayout LeftFold={<ClassListCard />} RightFold={<ClassDetailCard loading={loading} classInfo={classInfo} />} />
  )
}

export default Class

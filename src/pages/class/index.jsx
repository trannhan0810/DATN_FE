import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import ClassInfo from './component/class-info'
import RightFold from './right-fold'
import HomeLayout from 'layout/home/HomeLayout'
import { getClassById } from 'api/class'
import { showError } from 'core/tools'

const Class = () => {
  const { id } = useParams()
  const [loading, setLoading] = useState(false)
  const [classInfo, setClassInfo] = useState({})

  useEffect(() => {
    setLoading(true)
    const getClassData = async () => {
      try {
        const data = await getClassById(id)
        setClassInfo(data)
      } catch {
        showError('Load data fail')
      } finally {
        setLoading(false)
      }
    }
    getClassData()
  }, [])

  return <HomeLayout LeftFold={<ClassInfo loading={loading} classInfo={classInfo} />} RightFold={<RightFold />} />
}

export default Class

import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import request from '../../core/request'
import ClassPageStyle from './style'
import ClassInfo from './class-info'
import RightFold from './right-fold'
import HomeLayout from 'layout/home/HomeLayout'
import { getClassById, getClasses } from 'api/class'
import { showError } from 'core/tools'

const Class = () => {
  const { id } = useParams()
  const [loading, setLoading] = useState(false)
  const [classInfo, setClassInfo] = useState({})

  useEffect(async () => {
    setLoading(true)
    try {
      const data = await getClassById(id)
      setClassInfo(data)
    } catch {
      showError('Load data fail')
    } finally {
      setLoading(false)
    }
  }, [])

  return (
    <HomeLayout>
      <ClassPageStyle>
        <div className="home-leftFold">
          <ClassInfo classInfo={classInfo} />
        </div>
        <div className="home-rightFold">
          <RightFold />
        </div>
      </ClassPageStyle>
    </HomeLayout>
  )
}

export default Class

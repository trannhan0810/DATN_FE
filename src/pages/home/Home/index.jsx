import React from 'react'
import { Redirect } from 'react-router'
import HomeLayout from 'layout/home/HomeLayout'
import FoldCard from 'shared/components/fold-card/FoldCard'
import ClassListCard from 'pages/classes/class-list/ClassListCard'
import ClassDetailCard from 'pages/class/class-detail/ClassDetailCard'

const Home = () => {
  return <HomeLayout LeftFold={<ClassListCard />} RightFold={<ClassDetailCard />} />
}

export default Home

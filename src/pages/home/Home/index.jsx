import React from 'react'
import { Redirect } from 'react-router'
import HomeLayout from 'layout/home/HomeLayout'
import FoldCard from 'shared/components/fold-card/FoldCard'

const Home = () => {
  // return <HomeLayout isHaveLeftFold={false} RightFold={<FoldCard />} />
  return <Redirect to="/classes/" />
}

export default Home

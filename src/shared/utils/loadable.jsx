/* eslint-disable react/jsx-props-no-spreading */
import React, { Suspense, lazy } from 'react'
import Loading from '../components/Loading'

const loadable = (importFunc, { fallback } = { fallback: <Loading /> }) => {
  const LazyComponent = lazy(() => importFunc)
  return props => (
    <Suspense fallback={fallback}>
      <LazyComponent {...props} />
    </Suspense>
  )
}

export default loadable

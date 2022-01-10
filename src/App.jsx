import React, { useEffect } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { useClearCacheCtx } from 'react-clear-cache'
import GuardRoute from './shared/routes/GuardRoute'
import loadable from './shared/utils/loadable'

function App() {
  const { isLatestVersion, emptyCacheStorage } = useClearCacheCtx()

  useEffect(() => {
    if (!isLatestVersion) {
      emptyCacheStorage()
    }
  }, [])
  return (
    <BrowserRouter>
      <Switch>
        <GuardRoute path="/login" component={loadable(import('./pages/auth/login/Login'))} exact />
        <Route path="*" component={loadable(import('./pages/404Page'))} exact />
      </Switch>
    </BrowserRouter>
  )
}

export default App

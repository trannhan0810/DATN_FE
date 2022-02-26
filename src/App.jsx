import React, { useEffect } from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
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
        {/* <GuardRoute isPrivate path="/" component={() => <Redirect to="/classes" />} exact /> */}
        <GuardRoute isPrivate path="/chat" component={loadable(import('./pages/home/Home'))} exact />
        <GuardRoute isPrivate path="/classes/:classId" component={loadable(import('./pages/class'))} exact />
        <GuardRoute isPrivate path="/classes" component={loadable(import('./pages/classes'))} exact />
        <GuardRoute isPrivate path="/calls" component={loadable(import('./pages/home/Home'))} exact />
        <GuardRoute isPrivate path="/meeting" component={loadable(import('./pages/meeting'))} exact />
        <GuardRoute isPrivate path="/meeting/room/:roomId" component={loadable(import('./pages/meeting'))} exact />
        <GuardRoute isPrivate path="/file" component={loadable(import('./pages/home/Home'))} exact />
        <GuardRoute
          isPrivate
          path="/videochat"
          component={loadable(import('./pages/video-chat/VideoChatHome/VideoChatHome'))}
          exact
        />
        <GuardRoute
          isPrivate
          path="/videochat/room/:roomID"
          component={loadable(import('./pages/video-chat/VideoChat'))}
          exact
        />

        <GuardRoute path="/login" component={loadable(import('./pages/auth/login/Login'))} exact />
        <Route path="*" component={loadable(import('./pages/404Page'))} exact />
      </Switch>
    </BrowserRouter>
  )
}

export default App

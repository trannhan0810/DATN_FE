import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { reduxBatch } from '@manaflair/redux-batch'
import { createBrowserHistory } from 'history'
import { routerMiddleware } from 'connected-react-router'
import rootReducer from './reducers'

export const history = createBrowserHistory()

const middleware = [...getDefaultMiddleware(), routerMiddleware(history)]

const store = configureStore({
  reducer: rootReducer(history),
  middleware,
  devTools: process.env.NODE_ENV !== 'production',
  enhancers: [reduxBatch],
})

export default store

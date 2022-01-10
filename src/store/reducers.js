import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import auth from '../pages/auth/reducer'
import config from '../shared/selectors/reducer'

export default history =>
  combineReducers({
    router: connectRouter(history),
    auth,
    config,
  })

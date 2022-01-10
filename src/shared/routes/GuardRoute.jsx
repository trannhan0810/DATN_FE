/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react'
import { Redirect, Route } from 'react-router-dom'
import PropTypes from 'prop-types'
import { JSONParse } from '../utils/tool'
import { getToken } from 'core/token'
import { getCurrentUser } from 'core/currentUser'

const GuardRoute = ({ isPrivate = false, isAdmin = false, ...rest }) => {
  const token = getToken()
  const user = getCurrentUser() && JSONParse(getCurrentUser())

  if (!token && isPrivate) {
    return <Redirect to="/login" />
  }

  // if (token && !isPrivate) {
  //   return <Redirect to="/" />
  // }

  return <Route {...rest} />
}

GuardRoute.propTypes = {
  isPrivate: PropTypes.bool,
  isAdmin: PropTypes.bool,
}

export default GuardRoute

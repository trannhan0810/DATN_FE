import React from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { unwrapResult } from '@reduxjs/toolkit'
import { loginAuth } from '../reducer'
import FormLogin from './FormLogin'
import AuthLayout from 'layout/auth/AuthLayout'
import { showError } from 'core/tools'

const Login = () => {
  const history = useHistory()
  const dispatch = useDispatch()

  const onSubmit = async values => {
    dispatch(loginAuth(values))
      .then(unwrapResult)
      .then(user => {
        if (user.role.name === 'employee') {
          history.push('/leads-contact')
        }
        if (user.role.name === 'qa') {
          history.push('/users')
        } else {
          history.push('/')
        }
      })
      .catch(showError)
  }
  return (
    <AuthLayout>
      <FormLogin onSubmit={onSubmit} />
    </AuthLayout>
  )
}
export default Login

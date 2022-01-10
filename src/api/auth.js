import request from 'core/request'

export const login = params => request.post('Tokens', params)

export const forgotPassword = ({ email }) => request.post('auth/forgotPassword', { email })

export const verifyForgotPasswordCode = ({ email, resetPasswordCode }) =>
  request.post('auth/verifyForgotPasswordCode', { email, resetPasswordCode })

export const resetPassword = ({ newPassword, resetPasswordToken }) =>
  request.post('auth/resetPassword', { newPassword, resetPasswordToken })

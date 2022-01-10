import { message } from 'antd'

export const showError = error => {
  const content = (() => {
    if (typeof error === 'string') return error
    return error?.message ?? 'Server Internall Error. Please try later !!!!'
  })()

  return message.error({
    content,
    className: 'message-error',
  })
}

export const showSuccess = content => {
  return message.success({
    content,
    className: 'message-success',
  })
}
export const showInfo = content => {
  return message.info({
    content,
    className: 'message-info',
  })
}

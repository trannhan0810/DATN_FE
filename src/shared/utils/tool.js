import dayjs from 'dayjs'
import { LEAD_STATUS } from 'configs/constants'

export const JSONParse = text => {
  if (text) {
    try {
      return JSON.parse(text)
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Warning: ', error.toString())
    }
  }
}

export const roundNumber = (number, decimalPlaces = 2) =>
  // eslint-disable-next-line no-restricted-properties
  Math.round(number * Math.pow(10, decimalPlaces)) / Math.pow(10, decimalPlaces)

export const formatDate = (timestamp, formatter = 'HH:mm DD/MM/YYYY') => {
  return dayjs(timestamp).format(formatter)
}

export const getLeadStatus = lead => {
  if (lead.isCompleted) {
    return 'Đã Hoàn Thành'
  }
  if (lead.status) {
    return `${LEAD_STATUS[parseFloat(lead.status)]}`
  }
  if (!lead?.status && !lead?.userHandler) {
    return 'Khả Dụng'
  }
  return 'Đang chờ xử lý'
}

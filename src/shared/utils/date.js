import dayjs from 'dayjs'

const getDate = prevDays => {
  const now = dayjs()
  const date = now.subtract(prevDays, 'day').toDate()
  return date
}
export default getDate

export const formatDateTime = (date, formatter = 'DD/MM/YYYY') => {
  return dayjs(date).subtract(7, 'hour').format(formatter)
}

export const formatDateTimeDetail = (date, formatter = 'DD/MM/YYYY HH:mm') => {
  return dayjs(date).format(formatter)
}

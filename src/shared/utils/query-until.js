/* eslint-disable import/prefer-default-export */
/* eslint-disable no-return-assign */
import { isEmpty } from 'lodash-es'

const getOrderBy = order => order === 'descend'

export const convertQueryToParams = queryParams => {
  const { pageSize, currentPage, filters, sorter } = queryParams

  let params = {
    pageNumber: currentPage,
    pageSize,
  }
  // sorter
  if (!isEmpty(sorter)) {
    params = {
      ...params,
      SortBy: `${sorter.field}`,
      IsSortDesc: getOrderBy(sorter.order),
    }
  } else {
    params = { ...params }
  }
  // filters
  if (!isEmpty(filters)) {
    Object.entries(filters).forEach(([key, value]) => {
      if (key === 'Status' && value === 4) {
        return (params = { ...params, IsWaitingInProgress: true })
      }
      if (key === 'Status' && value === 5) {
        return (params = { ...params, IsAvailable: true })
      }
      return (params = { ...params, [key]: value })
    })
  }
  return params
}

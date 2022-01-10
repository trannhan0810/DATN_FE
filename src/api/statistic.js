import request from 'core/request'

export const getLeadStatistic = params => request.get(`Reports/statistic`, { params })

export const exportExcelStatistic = params => request.get(`Reports/statistic/exportExcel`, { params })

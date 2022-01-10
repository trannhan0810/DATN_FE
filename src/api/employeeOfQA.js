import request from 'core/request'

export const getEmployeeOfQA = params => request.get('Users/employeeOfQA', { params })

export const assignEmployeeToQA = params => request.patch('Users/assignEmployeeToQA', params)

export const getEmployeeAvailable = params => request.get('Users/employeeAvailableForQA', { params })

export const removeEmployeeOfQA = params => request.put('Users/removeEmployeeFromQA', params)

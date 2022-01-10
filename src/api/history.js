import request from 'core/request'

export const getLeadHistories = params => request.get(`Histories/lead/${params.id}`, { params })

export const getLeadReturnOfEmployee = params => request.get(`Histories/leadReturned`, { params })

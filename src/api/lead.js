import request from 'core/request'
// Lead Storage
export const getLeads = params => request.get('LeadStorages', { params })
export const getLead = ({ id }) => request.get(`LeadStorages/User/${id}`)
export const getLeadsBadDebt = params => request.get('LeadStorages/baddebt/user', { params })

export const postLead = params => request.post('LeadStorages', params)
export const putLead = params => request.put(`LeadStorages/${params.id}`, params)
export const deleteLead = id => request.delete(`LeadStorages/${id}`)
export const exportLeadExcel = params => request.get(`LeadStorages/export`, { params })

// Lead Contact
export const getLeadsContact = params => request.get(`LeadStorages/user/${params.id}`, { params })
export const getNewLeads = () => request.get(`/LeadContacts`)

export const sendLeadToStorage = ({ id, reason }) => request.patch(`LeadContacts/returnStorage/${id}`, { id, reason })
export const setLeadIsCompleted = ({ id }) => request.patch(`LeadContacts/complete/${id}`, { id })
export const sendLeadFromBaddebtToStorage = ({ id }) =>
  request.patch(`LeadContacts/baddebt/returnStorage/${id}`, { id })

// Config Lead
export const getJobsConfig = () => request.get(`Configurations/jobs`)
export const getPriorityConfig = () => request.get(`Configurations/priority`)
export const getStatusConfig = () => request.get(`Configurations/status/lead`)
export const getReasonConfig = () => request.get(`Configurations/reason`)

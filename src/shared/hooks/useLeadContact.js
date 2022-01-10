import { useCallback, useEffect, useState } from 'react'
import { isEqual } from 'lodash-es'
import { convertQueryToParams } from '../utils/query-until'
import usePagination from './usePagination'
import { showError, showSuccess } from 'core/tools'
import * as cms from 'api/lead'
import { formatDateTime } from 'shared/utils/date'

const useLeadContact = (id, isCompleted = undefined) => {
  const { pageSize, currentPage, sorter, onChangePagination, setCurrentPage } = usePagination()

  const [isLoading, setIsLoading] = useState(false)
  const [isUpsert, setIsUpsert] = useState(false)
  const [leads, setLeads] = useState([])
  const [totalItems, setTotalItem] = useState(0)
  const [filters, setFilters] = useState({ IsCompleted: isCompleted })

  const onFilters = values => {
    if (isEqual(values, filters)) {
      return
    }
    setFilters({ ...filters, ...values })
    setCurrentPage(1)
  }

  // Get Leads Contact
  const getLeadLists = useCallback(async () => {
    try {
      setIsLoading(true)
      const params = convertQueryToParams({
        pageSize,
        currentPage,
        sorter,
        filters,
      })
      const res = await cms.getLeadsContact({ ...params, id })
      setLeads(res?.data)
      setTotalItem(res?.totalItems)
      setIsLoading(false)
    } catch (error) {
      showError(error)
      setLeads([])
      setIsLoading(false)
    }
  }, [currentPage, pageSize, filters, sorter])

  useEffect(() => {
    getLeadLists()
  }, [getLeadLists])

  // Create Lead
  const createLead = async values => {
    try {
      setIsUpsert(true)
      const response = await cms.postLead(values)
      setIsUpsert(false)
      if (response) {
        getLeadLists()
        showSuccess(`Thông tin Lead ${response?.data?.fullName} đã tạo thành công`)
        return response
      }
    } catch (error) {
      setIsUpsert(false)
      showError(error)
    }
  }

  // Update Lead
  const updateLead = async values => {
    try {
      setIsUpsert(true)
      const response = await cms.putLead({
        ...values,
        timeCallBack: values.timeCallBack ? formatDateTime(values.timeCallBack, 'MM/DD/YYYY HH:mm') : undefined,
      })
      if (response) {
        const newLeads = leads.map(item => {
          if (item.id === response.data.id) {
            return { ...item, ...response?.data }
          }
          return item
        })
        setLeads(newLeads)
        showSuccess(`Thông tin Lead ${response?.data?.fullName} đã cập nhật thành công`)
        return response
      }
    } catch (error) {
      showError(error)
    } finally {
      setIsUpsert(false)
    }
  }

  // Get New List
  const getNewLeadsContact = async () => {
    try {
      setIsLoading(true)
      const response = await cms.getNewLeads()
      if (response) {
        getLeadLists()
        showSuccess(`Danh sách Lead đã cập nhật thành công`)
      }
    } catch (error) {
      showError(error)
    } finally {
      setIsLoading(false)
    }
  }

  // Return Lead to Storage
  const returnLeadToStorage = async values => {
    try {
      setIsUpsert(true)
      const response = await cms.sendLeadToStorage(values)
      if (response) {
        getLeadLists()
        showSuccess(`Trả Lead về kho thành công`)
        return response
      }
    } catch (error) {
      showError(error)
    } finally {
      setIsUpsert(false)
    }
  }

  // Set Lead is completed
  const setLeadIsCompleted = async values => {
    try {
      setIsUpsert(true)
      const response = await cms.setLeadIsCompleted(values)
      if (response) {
        getLeadLists()
        showSuccess(`Đã hoàn thành Lead ${values.fullName}`)
        return response
      }
    } catch (error) {
      showError(error)
    } finally {
      setIsUpsert(false)
    }
  }

  return {
    isLoading,
    isUpsert,
    totalItems,
    leads,
    pageSize,
    currentPage,
    onChangePagination,
    setCurrentPage,
    onFilters,
    createLead,
    updateLead,
    getNewLeadsContact,
    returnLeadToStorage,
    setLeadIsCompleted,
  }
}
export default useLeadContact

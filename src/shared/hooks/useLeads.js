import { useCallback, useEffect, useState } from 'react'
import { isEqual } from 'lodash-es'
import { convertQueryToParams } from '../utils/query-until'
import usePagination from './usePagination'
import { showError, showSuccess } from 'core/tools'
import { getLeads, postLead, putLead, exportLeadExcel } from 'api/lead'

const useLeads = ({ IsBadDebt, isCompleted = undefined }) => {
  const { pageSize, currentPage, sorter, onChangePagination, setCurrentPage } = usePagination()

  const [isLoading, setIsLoading] = useState(false)
  const [isUpsert, setIsUpsert] = useState(false)
  const [leads, setLeads] = useState([])
  const [totalItems, setTotalItem] = useState(0)
  const [filters, setFilters] = useState({ IsBadDebt, IsCompleted: isCompleted })

  const onFilters = values => {
    if (isEqual(values, filters)) {
      return
    }
    setFilters({ ...filters, ...values })
    setCurrentPage(1)
  }

  // Get Users
  const getLeadLists = useCallback(async () => {
    try {
      setIsLoading(true)
      const params = convertQueryToParams({
        pageSize,
        currentPage,
        sorter,
        filters,
      })

      const res = await getLeads(params)
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
      const response = await postLead(values)
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
      const response = await putLead(values)
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

  // Export Excel
  const exportLead = async () => {
    try {
      const params = convertQueryToParams({
        sorter,
        filters,
      })
      showSuccess(`Tiến trình xuất file sẽ mất một lúc để hoàn thành. Vui lòng kiểm tra email của bạn để nhận file.`)
      await exportLeadExcel(params)
      // window.open(res, '_blank')
    } catch (error) {
      showError(error)
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
    exportLead,
    getLeadLists,
  }
}
export default useLeads

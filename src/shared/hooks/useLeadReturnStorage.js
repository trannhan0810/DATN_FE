import { useCallback, useEffect, useState } from 'react'
import { isEqual } from 'lodash-es'
import { convertQueryToParams } from '../utils/query-until'
import usePagination from './usePagination'
import { showError } from 'core/tools'
import { getLeadReturnOfEmployee } from 'api/history'

const useLeadReturnStorage = (userId = undefined) => {
  const { pageSize, currentPage, sorter, onChangePagination, setCurrentPage } = usePagination()

  const [isLoading, setIsLoading] = useState(false)
  const [leads, setLeads] = useState([])
  const [totalItems, setTotalItem] = useState(0)
  const [filters, setFilters] = useState({ UserId: userId })
  const onFilters = values => {
    if (isEqual(values, filters)) {
      return
    }
    setFilters({ ...filters, ...values })
    setCurrentPage(1)
  }

  // Get Leads Return Storage
  const getLeadReturnStorage = useCallback(async () => {
    if (!filters.UserId) {
      return
    }
    try {
      setIsLoading(true)
      const params = convertQueryToParams({
        pageSize,
        currentPage,
        sorter,
        filters,
      })
      const res = await getLeadReturnOfEmployee(params)
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
    getLeadReturnStorage()
  }, [getLeadReturnStorage])

  return {
    isLoading,
    totalItems,
    leads,
    pageSize,
    currentPage,
    onChangePagination,
    setCurrentPage,
    onFilters,
  }
}
export default useLeadReturnStorage

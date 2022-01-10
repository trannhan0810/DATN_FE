import { useCallback, useEffect, useState } from 'react'
import { isEqual } from 'lodash-es'
import { convertQueryToParams } from '../utils/query-until'
import usePagination from './usePagination'
import { showError } from 'core/tools'
import { getLeadReturnOfEmployee } from 'api/history'

const useLeadBadDebtOfEmployee = ({ userId }) => {
  const { pageSize, currentPage, sorter, onChangePagination, setCurrentPage } = usePagination()

  const [isLoading, setIsLoading] = useState(false)
  const [leads, setLeads] = useState([])
  const [totalItems, setTotalItem] = useState(0)
  const [filters, setFilters] = useState({ IsBadDebt: true, UserId: userId })

  const onFilters = values => {
    if (isEqual(values, filters)) {
      return
    }
    setFilters({ ...filters, ...values })
    setCurrentPage(1)
  }

  // Get Users
  const getLeadsBadDebtOfEmployee = useCallback(async () => {
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
    getLeadsBadDebtOfEmployee()
  }, [getLeadsBadDebtOfEmployee])

  return {
    isLoading,
    totalItems,
    leads,
    pageSize,
    currentPage,
    onChangePagination,
    setCurrentPage,
    onFilters,
    getLeadsBadDebtOfEmployee,
  }
}
export default useLeadBadDebtOfEmployee

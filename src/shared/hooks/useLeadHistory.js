import { useCallback, useEffect, useState } from 'react'
import { isEqual } from 'lodash-es'
import { convertQueryToParams } from '../utils/query-until'
import usePagination from './usePagination'
import { showError } from 'core/tools'
import { getLeadHistories } from 'api/history'

const useLeadHistory = lead => {
  const { pageSize, currentPage, sorter, onChangePagination, setCurrentPage } = usePagination()

  const [isLoading, setIsLoading] = useState(false)
  const [history, setHistory] = useState([])
  const [totalItems, setTotalItem] = useState(0)
  const [filters, setFilters] = useState({})

  const onFilters = values => {
    if (isEqual(values, filters)) {
      return
    }
    setFilters(values)
    setCurrentPage(1)
  }

  // Get Users
  const getHistories = useCallback(async () => {
    try {
      setIsLoading(true)
      const params = convertQueryToParams({
        pageSize,
        currentPage,
        sorter,
        filters,
      })
      const res = await getLeadHistories({ ...params, id: lead.id })
      setHistory(res?.data)
      setTotalItem(res?.totalItems)
      setIsLoading(false)
    } catch (error) {
      showError(error)
      setHistory([])
      setIsLoading(false)
    }
  }, [currentPage, pageSize, filters, sorter])

  useEffect(() => {
    getHistories()
  }, [getHistories])

  return {
    isLoading,
    totalItems,
    history,
    pageSize,
    currentPage,
    onChangePagination,
    setCurrentPage,
    onFilters,
  }
}
export default useLeadHistory

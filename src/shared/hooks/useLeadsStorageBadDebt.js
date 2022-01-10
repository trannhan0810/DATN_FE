import { useCallback, useEffect, useState } from 'react'
import { isEqual } from 'lodash-es'
import { convertQueryToParams } from '../utils/query-until'
import usePagination from './usePagination'
import { showError, showSuccess } from 'core/tools'
import { getLeadsBadDebt, sendLeadFromBaddebtToStorage } from 'api/lead'

const useLeadsStorageBadDebt = () => {
  const { pageSize, currentPage, sorter, onChangePagination, setCurrentPage } = usePagination()

  const [isLoading, setIsLoading] = useState(false)
  const [isUpsert, setIsUpsert] = useState(false)
  const [leads, setLeads] = useState([])
  const [totalItems, setTotalItem] = useState(0)
  const [filters, setFilters] = useState({})

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

      const res = await getLeadsBadDebt(params)
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

  // Return Lead to Storage
  const returnLeadFromBaddebtToStorage = async values => {
    try {
      setIsUpsert(true)
      const response = await sendLeadFromBaddebtToStorage(values)
      if (response) {
        getLeadLists()
        showSuccess(`Trả Lead về Tổng kho thành công`)
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
    getLeadLists,
    returnLeadFromBaddebtToStorage,
  }
}
export default useLeadsStorageBadDebt

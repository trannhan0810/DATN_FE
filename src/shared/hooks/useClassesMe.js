import { useCallback, useEffect, useState } from 'react'
import { isEqual } from 'lodash-es'
import { convertQueryToParams } from '../utils/query-until'
import usePagination from './usePagination'
import { showError, showSuccess } from 'core/tools'
import { getClassesMe, postClass, putClass } from 'api/class'

const useClassesMe = () => {
  const { pageSize, currentPage, sorter, onChangePagination, setCurrentPage } = usePagination()

  const [isLoading, setIsLoading] = useState(false)
  const [isUpsert, setIsUpsert] = useState(false)
  const [myClasses, setMyClasses] = useState([])
  const [totalItems, setTotalItem] = useState(0)
  const [filters, setFilters] = useState({})

  const onFilters = values => {
    if (isEqual(values, filters)) {
      return
    }
    setFilters(values)
    setCurrentPage(1)
  }

  // Get Classes
  const getMyClassList = useCallback(async () => {
    try {
      setIsLoading(true)
      const params = convertQueryToParams({
        pageSize,
        currentPage,
        sorter,
        filters,
      })
      const res = await getClassesMe(params)
      setMyClasses(res?.results)
      setTotalItem(res?.total)
      setIsLoading(false)
    } catch (error) {
      showError(error)
      setMyClasses([])
      setIsLoading(false)
    }
  }, [currentPage, pageSize, filters, sorter])

  useEffect(() => {
    getMyClassList()
  }, [getMyClassList])

  return {
    isLoading,
    isUpsert,
    totalItems,
    myClasses,
    pageSize,
    currentPage,
    onChangePagination,
    setCurrentPage,
    onFilters,
  }
}
export default useClassesMe

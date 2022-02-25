import { useCallback, useEffect, useState } from 'react'
import { isEqual } from 'lodash-es'
import { convertQueryToParams } from '../utils/query-until'
import usePagination from './usePagination'
import { showError, showSuccess } from 'core/tools'
import { getClasses, postClass, putClass } from 'api/class'

const useClasses = () => {
  const { pageSize, currentPage, sorter, onChangePagination, setCurrentPage } = usePagination()

  const [isLoading, setIsLoading] = useState(false)
  const [isUpsert, setIsUpsert] = useState(false)
  const [classes, setClasses] = useState([])
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
  const getClassList = useCallback(async () => {
    try {
      setIsLoading(true)
      const params = convertQueryToParams({
        pageSize,
        currentPage,
        sorter,
        filters,
      })
      const res = await getClasses(params)
      setClasses(res?.results)
      setTotalItem(res?.total)
      setIsLoading(false)
    } catch (error) {
      showError(error)
      setClasses([])
      setIsLoading(false)
    }
  }, [currentPage, pageSize, filters, sorter])

  useEffect(() => {
    getClassList()
  }, [getClassList])

  // Create Classes
  const createClass = async values => {
    try {
      setIsUpsert(true)
      const response = await postClass(values)
      if (response) {
        getClassList()
        showSuccess(`Create class successfully`)
        return response?.data // TODO: Close Modal
      }
    } catch (error) {
      showError(error)
    } finally {
      setIsUpsert(false)
    }
  }

  // Update class
  const updateClass = async values => {
    try {
      setIsUpsert(true)
      const response = await putClass(values)
      if (response) {
        const newClasses = classes.map(item => {
          if (item.id === response.data.id) {
            return { ...item, ...response?.data }
          }
          return item
        })
        setClasses(newClasses)
        showSuccess(`class's information is successfully update`)
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
    classes,
    pageSize,
    currentPage,
    onChangePagination,
    setCurrentPage,
    onFilters,
    createClass,
    updateClass,
  }
}
export default useClasses

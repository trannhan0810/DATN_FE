import { useCallback, useEffect, useState } from 'react'
import { isEqual } from 'lodash-es'
import { useParams } from 'react-router'
import { convertQueryToParams } from '../utils/query-until'
import usePagination from './usePagination'
import { getClassMembers } from 'api/class'
import { showError } from 'core/tools'

const useClassMember = () => {
  const { pageSize, currentPage, sorter, onChangePagination, setCurrentPage } = usePagination()
  const [isLoading, setIsLoading] = useState(false)
  const [members, setMembers] = useState([])
  const [hasMore, setHasMore] = useState(false)
  const [filters, setFilters] = useState({})
  const { classId } = useParams()

  const onFilters = values => {
    if (!isEqual(values, filters)) {
      setFilters(values)
      setCurrentPage(1)
    }
  }

  const fetchInitialClassMembers = useCallback(async () => {
    try {
      if (!classId) return
      setIsLoading(true)
      const params = convertQueryToParams({ pageSize, currentPage, sorter, filters })
      const res = await getClassMembers(classId, params)
      setCurrentPage(1)
      setMembers(res?.results || [])
      setHasMore(res?.total > pageSize)
    } catch (error) {
      showError(error)
      setCurrentPage(1)
      setMembers([])
      setHasMore(false)
    } finally {
      setIsLoading(false)
    }
  }, [pageSize, filters, sorter, classId])

  const fetchMoreClassMembers = async () => {
    if (isLoading) return
    const currentClassMembers = members
    const oldCurrentPage = currentPage
    try {
      const newCurrentPage = currentPage + 1
      setIsLoading(true)
      const params = convertQueryToParams({ pageSize, currentPage: newCurrentPage, sorter, filters })
      const res = await getClassMembers(classId, params)
      setMembers([...members, ...res?.results])
      setCurrentPage(newCurrentPage)
      setHasMore(res?.total > newCurrentPage * pageSize)
    } catch (error) {
      showError(error)
      setCurrentPage(oldCurrentPage)
      setMembers(currentClassMembers)
      setHasMore(false)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchInitialClassMembers()
  }, [fetchInitialClassMembers])

  return {
    isLoading,
    members,
    hasMore,
    pageSize,
    currentPage,
    onChangePagination,
    setCurrentPage,
    onFilters,
    fetchMoreClassMembers,
  }
}

export default useClassMember

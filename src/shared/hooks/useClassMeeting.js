import { useCallback, useEffect, useState } from 'react'
import { isEqual } from 'lodash-es'
import { useParams } from 'react-router'
import { convertQueryToParams } from '../utils/query-until'
import usePagination from './usePagination'
import { showError } from 'core/tools'
import { getClassMeetings } from 'api/meeting'

const useClassMeetings = () => {
  const { pageSize, currentPage, sorter, onChangePagination, setCurrentPage } = usePagination()
  const [isLoading, setIsLoading] = useState(false)
  const [meetings, setMeetings] = useState([])
  const [hasMore, setHasMore] = useState(false)
  const [filters, setFilters] = useState({})
  const { classId } = useParams()

  const onFilters = values => {
    if (!isEqual(values, filters)) {
      setFilters(values)
      setCurrentPage(1)
    }
  }

  const fetchInitialMeetings = useCallback(async () => {
    try {
      if (!classId) return
      setIsLoading(true)
      const params = convertQueryToParams({ pageSize, currentPage, sorter, filters })
      const res = await getClassMeetings(classId, params)
      setCurrentPage(1)
      setMeetings(res?.results || [])
      setHasMore(res?.total > pageSize)
    } catch (error) {
      showError(error)
      setCurrentPage(1)
      setMeetings([])
      setHasMore(false)
    } finally {
      setIsLoading(false)
    }
  }, [pageSize, filters, sorter, classId])

  const fetchMoreMeetings = async () => {
    if (isLoading) return
    const currentMeetings = meetings
    const oldCurrentPage = currentPage
    try {
      const newCurrentPage = currentPage + 1
      setIsLoading(true)
      const params = convertQueryToParams({ pageSize, currentPage: newCurrentPage, sorter, filters })
      const res = await getClassMeetings(classId, params)
      setMeetings([...meetings, ...res?.results])
      setCurrentPage(newCurrentPage)
      setHasMore(res?.total > newCurrentPage * pageSize)
    } catch (error) {
      showError(error)
      setCurrentPage(oldCurrentPage)
      setMeetings(currentMeetings)
      setHasMore(false)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchInitialMeetings()
  }, [fetchInitialMeetings])

  return {
    isLoading,
    meetings,
    hasMore,
    pageSize,
    currentPage,
    onChangePagination,
    setCurrentPage,
    onFilters,
    fetchMoreMeetings,
  }
}

export default useClassMeetings

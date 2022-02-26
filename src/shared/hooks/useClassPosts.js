import { useCallback, useEffect, useState } from 'react'
import { isEqual } from 'lodash-es'
import { useParams } from 'react-router'
import { convertQueryToParams } from '../utils/query-until'
import usePagination from './usePagination'
import { showError, showSuccess } from 'core/tools'
import { getClassPosts, createClassPost } from 'api/post'

const useClassPosts = () => {
  const { pageSize, currentPage, sorter, onChangePagination, setCurrentPage } = usePagination()
  const [isLoading, setIsLoading] = useState(false)
  const [isUpsert, setIsUpsert] = useState(false)
  const [posts, setPosts] = useState([])
  const [hasMore, setHasMore] = useState(false)
  const [filters, setFilters] = useState({})
  const { classId } = useParams()

  const onFilters = values => {
    if (!isEqual(values, filters)) {
      setFilters(values)
      setCurrentPage(1)
    }
  }

  const fetchInitialPosts = useCallback(async () => {
    try {
      if (!classId) return
      setIsLoading(true)
      const params = convertQueryToParams({ pageSize, currentPage, sorter, filters })
      const res = await getClassPosts(classId, params)
      setCurrentPage(1)
      setPosts(res?.results || [])
      setHasMore(res?.total > pageSize)
    } catch (error) {
      showError(error)
      setCurrentPage(1)
      setPosts([])
      setHasMore(false)
    } finally {
      setIsLoading(false)
    }
  }, [pageSize, filters, sorter, classId])

  const fetchMorePosts = async () => {
    if (isLoading) return
    const currentPosts = posts
    const oldCurrentPage = currentPage
    try {
      const newCurrentPage = currentPage + 1
      setIsLoading(true)
      const params = convertQueryToParams({ pageSize, currentPage: newCurrentPage, sorter, filters })
      const res = await getClassPosts(classId, params)
      setPosts([...posts, ...res?.results])
      setCurrentPage(newCurrentPage)
      setHasMore(res?.total > newCurrentPage * pageSize)
    } catch (error) {
      showError(error)
      setCurrentPage(oldCurrentPage)
      setPosts(currentPosts)
      setHasMore(false)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchInitialPosts()
  }, [fetchInitialPosts])

  const sendPost = async values => {
    try {
      setIsUpsert(true)
      const response = await createClassPost({ ...values, classId })
      if (response) {
        fetchInitialPosts()
        showSuccess(`New post created`)
        return response?.data // TODO: Close Modal
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
    posts,
    hasMore,
    pageSize,
    currentPage,
    onChangePagination,
    setCurrentPage,
    onFilters,
    sendPost,
    fetchMorePosts,
  }
}

export default useClassPosts

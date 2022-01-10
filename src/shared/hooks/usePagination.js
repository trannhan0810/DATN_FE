/* eslint-disable consistent-return */
import { useState } from 'react'

const usePagination = () => {
  const [pageSize, setPageSize] = useState(10)
  const [currentPage, setCurrentPage] = useState(1)
  const [sorter, setSorter] = useState({})
  const [filters, setFilters] = useState('')

  const onChangePagination = (pagination, filter, sort) => {
    if (pagination.current !== currentPage) {
      return setCurrentPage(pagination.current)
    }
    setCurrentPage(1)
    setPageSize(pagination.pageSize)
    setFilters(filter)
    setSorter(sort)
  }

  return {
    pageSize,
    setPageSize,
    currentPage,
    setCurrentPage,
    sorter,
    setSorter,
    filters,
    onChangePagination,
  }
}

export default usePagination

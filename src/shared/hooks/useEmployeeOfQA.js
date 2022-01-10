import { useCallback, useEffect, useState } from 'react'
import { isEqual } from 'lodash-es'
import { convertQueryToParams } from '../utils/query-until'
import usePagination from './usePagination'
import { showError, showSuccess } from 'core/tools'
import { getEmployeeOfQA, assignEmployeeToQA, removeEmployeeOfQA } from 'api/employeeOfQA'

const useEmployeeOfQA = managerId => {
  const { pageSize, currentPage, sorter, onChangePagination, setCurrentPage } = usePagination()

  const [isLoading, setIsLoading] = useState(false)
  const [isUpsert, setIsUpsert] = useState(false)
  const [users, setUsers] = useState([])
  const [totalItems, setTotalItem] = useState(0)
  const [filters, setFilters] = useState({ ManagerId: managerId })

  const onFilters = values => {
    if (isEqual(values, filters)) {
      return
    }
    setFilters({ ...values, ManagerId: managerId })
    setCurrentPage(1)
  }

  // Get Users
  const getListEmployeeOfQA = useCallback(async () => {
    try {
      setIsLoading(true)
      const params = convertQueryToParams({
        pageSize,
        currentPage,
        sorter,
        filters,
      })
      const res = await getEmployeeOfQA(params)
      setUsers(res?.data)
      setTotalItem(res?.totalItems)
      setIsLoading(false)
    } catch (error) {
      showError(error)
      setUsers([])
      setIsLoading(false)
    }
  }, [currentPage, pageSize, filters, sorter])

  useEffect(() => {
    getListEmployeeOfQA()
  }, [getListEmployeeOfQA])

  // Create Users
  const assignEmployee = async values => {
    try {
      setIsUpsert(true)
      const response = await assignEmployeeToQA(values)
      if (response) {
        getListEmployeeOfQA()
        showSuccess(`Đã thêm nhân viên vào danh sách quản lý của QA`)
        return true
      }
    } catch (error) {
      showError(error)
    } finally {
      setIsUpsert(false)
    }
  }

  // Change Users Status
  const removeEmployee = async params => {
    try {
      const response = await removeEmployeeOfQA(params)
      if (response) {
        getListEmployeeOfQA()
      }
    } catch (error) {
      showError(error)
    }
  }

  return {
    isLoading,
    isUpsert,
    totalItems,
    users,
    pageSize,
    currentPage,
    onChangePagination,
    setCurrentPage,
    onFilters,
    assignEmployee,
    removeEmployee,
  }
}
export default useEmployeeOfQA

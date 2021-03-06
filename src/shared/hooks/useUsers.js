import { useCallback, useEffect, useState } from 'react'
import { isEqual } from 'lodash-es'
import { convertQueryToParams } from '../utils/query-until'
import usePagination from './usePagination'
import { showError, showSuccess } from 'core/tools'
import { getUsers, postUser, changeUserStatus, putUser } from 'api/user'

const useUsers = () => {
  const { pageSize, currentPage, sorter, onChangePagination, setCurrentPage } = usePagination()

  const [isLoading, setIsLoading] = useState(false)
  const [isUpsert, setIsUpsert] = useState(false)
  const [users, setUsers] = useState([])
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
  const getUserList = useCallback(async () => {
    try {
      setIsLoading(true)
      const params = convertQueryToParams({
        pageSize,
        currentPage,
        sorter,
        filters,
      })
      const res = await getUsers(params)
      setUsers(res?.results)
      setTotalItem(res?.total)
      setIsLoading(false)
    } catch (error) {
      showError(error)
      setUsers([])
      setIsLoading(false)
    }
  }, [currentPage, pageSize, filters, sorter])

  useEffect(() => {
    getUserList()
  }, [getUserList])

  // Create Users
  const createUser = async values => {
    try {
      setIsUpsert(true)
      const response = await postUser(values)
      if (response) {
        getUserList()
        showSuccess(`Create user successfully`)
        return response?.data // TODO: Close Modal
      }
    } catch (error) {
      showError(error)
    } finally {
      setIsUpsert(false)
    }
  }

  // Update User
  const updateUser = async values => {
    try {
      setIsUpsert(true)
      const response = await putUser(values)
      if (response) {
        const newUsers = users.map(item => {
          if (item.id === response.data.id) {
            return { ...item, ...response?.data }
          }
          return item
        })
        setUsers(newUsers)
        showSuccess(`User's information is successfully update`)
        return response
      }
    } catch (error) {
      showError(error)
    } finally {
      setIsUpsert(false)
    }
  }

  // Change Users Status
  const toggleChangeUserStatus = async user => {
    try {
      const response = await changeUserStatus(user.id)
      if (response) {
        const newLeads = users.map(item => {
          if (item.id === user.id) {
            return { ...item, isActive: !user.isActive }
          }
          return item
        })
        setUsers(newLeads)
        const message = user.isActive ? `User is inactive now` : `User is active now`
        showSuccess(message)
        return response
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
    createUser,
    updateUser,
    toggleChangeUserStatus,
  }
}
export default useUsers

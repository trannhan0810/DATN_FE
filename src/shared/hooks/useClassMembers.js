import { useCallback, useEffect, useState } from 'react'
import { isEqual } from 'lodash-es'
import { convertQueryToParams } from '../utils/query-until'
import usePagination from './usePagination'
import { showError, showSuccess } from 'core/tools'
import { getClassMembers, addClassMember, removeClassMember } from 'api/class'

const useClassMembers = () => {
  const { pageSize, currentPage, sorter, onChangePagination, setCurrentPage } = usePagination()
  const [isLoading, setIsLoading] = useState(false)
  const [isUpsert, setIsUpsert] = useState(false)
  const [members, setMembers] = useState([])
  const [totalItems, setTotalItem] = useState(0)
  const [filters, setFilters] = useState({})
  const [classId, setClassId] = useState(null)

  const onFilters = values => {
    if (!isEqual(values, filters)) {
      setFilters(values)
      setCurrentPage(1)
    }
  }

  const getClassMemberList = useCallback(async () => {
    if (classId) {
      try {
        setIsLoading(true)
        const params = convertQueryToParams({ pageSize, currentPage, sorter, filters })
        const res = await getClassMembers(params)
        setMembers(res?.data)
        setTotalItem(res?.totalItems)
        setIsLoading(false)
      } catch (error) {
        showError(error)
        setMembers([])
        setIsLoading(false)
      }
    }
  }, [currentPage, pageSize, filters, sorter])

  useEffect(() => {
    getClassMemberList()
  }, [getClassMemberList])

  const addMember = async values => {
    try {
      setIsUpsert(true)
      const response = await addClassMember(values)
      if (response) {
        getClassMemberList()
        showSuccess(`Add member successfully`)
        return response?.data // TODO: Close Modal
      }
    } catch (error) {
      showError(error)
    } finally {
      setIsUpsert(false)
    }
  }

  const removeMember = async values => {
    try {
      setIsUpsert(true)
      const response = await removeClassMember(values)
      if (response) {
        getClassMemberList()
        showSuccess(`Can not remove this member`)
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
    totalItems,
    members,
    pageSize,
    currentPage,
    onChangePagination,
    setCurrentPage,
    onFilters,
    addMember,
    removeMember,
  }
}

export default useClassMembers

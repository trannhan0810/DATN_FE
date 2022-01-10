import React, { useEffect, useState, useCallback } from 'react'
import { Select } from 'antd'
import PropTypes from 'prop-types'
import { convertQueryToParams } from '../utils/query-until'
import { convertDataToEmployeeOptions } from './utils'
import { getEmployeeAvailable } from 'api/employeeOfQA'

const EmployeeAvailableSelector = ({ value, onChange, style, disabled, managerId }) => {
  // Get Users
  const [users, setUsers] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const getUserLists = useCallback(async () => {
    try {
      setIsLoading(true)
      const params = convertQueryToParams({
        pageSize: 200,
        currentPage: 1,
        filters: {
          ManagerId: managerId,
        },
      })
      const res = await getEmployeeAvailable(params)
      setUsers(res?.data)
      setIsLoading(false)
    } catch (error) {
      setUsers([])
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    getUserLists()
  }, [getUserLists])

  return (
    <Select
      showSearch
      disabled={disabled}
      allowClear
      style={style}
      value={users ? value : undefined}
      showArrow
      options={convertDataToEmployeeOptions(users)}
      placeholder="Chọn Nhân Viên"
      optionFilterProp="label"
      onChange={onChange}
      loading={isLoading}
    />
  )
}

EmployeeAvailableSelector.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  style: PropTypes.oneOfType([PropTypes.any, PropTypes.arrayOf(PropTypes.any)]),
  disabled: PropTypes.bool,
  managerId: PropTypes.string,
}

export default EmployeeAvailableSelector

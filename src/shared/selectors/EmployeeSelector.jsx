import React, { useEffect, useState, useCallback } from 'react'
import { Select } from 'antd'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { isEmpty } from 'lodash-es'
import { convertQueryToParams } from '../utils/query-until'
import { convertDataToEmployeeOptions } from './utils'
import { getUserRoles } from './reducer'
import { getUsers } from 'api/user'

const EmployeeSelector = ({ value, onChange, style, disabled, ...props }) => {
  const dispatch = useDispatch()
  const roles = useSelector(state => state.config.roles)

  useEffect(() => {
    if (isEmpty(roles)) {
      dispatch(getUserRoles())
    }
  }, [])

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
          RoleId: roles.find(item => item.name === 'employee').id,
        },
      })
      const res = await getUsers(params)
      setUsers(res?.data)
      setIsLoading(false)
    } catch (error) {
      setUsers([])
      setIsLoading(false)
    }
  }, [roles])

  useEffect(() => {
    getUserLists()
  }, [getUserLists])

  return (
    <Select
      {...props}
      showSearch
      disabled={disabled}
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

EmployeeSelector.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  style: PropTypes.oneOfType([PropTypes.any, PropTypes.arrayOf(PropTypes.any)]),
  disabled: PropTypes.bool,
}

export default EmployeeSelector

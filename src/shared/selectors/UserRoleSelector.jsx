import React, { useEffect } from 'react'
import { Select } from 'antd'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { isEmpty } from 'lodash-es'
import { convertDataToSelectOptions } from './utils'
import { getUserRoles } from './reducer'

const UserRoleSelector = ({ value, onChange, style, ...props }) => {
  const dispatch = useDispatch()
  const roles = useSelector(state => state.config.roles)
  const isLoading = useSelector(state => state.config.isLoadingRoles)

  useEffect(() => {
    if (isEmpty(roles)) {
      dispatch(getUserRoles())
    }
  }, [])

  return (
    <Select
      {...props}
      allowClear
      style={style}
      value={roles ? value : undefined}
      showArrow
      options={convertDataToSelectOptions(roles, 'id', 'nameVni')}
      loading={isLoading}
      placeholder="Chọn quyền"
      optionFilterProp="label"
      onChange={onChange}
    />
  )
}

UserRoleSelector.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  style: PropTypes.oneOfType([PropTypes.any, PropTypes.arrayOf(PropTypes.any)]),
}

export default UserRoleSelector

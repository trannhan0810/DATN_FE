import React, { useEffect, useMemo } from 'react'
import { Select } from 'antd'
import PropTypes from 'prop-types'
import { isEmpty } from 'lodash-es'
import { useDispatch, useSelector } from 'react-redux'
import { convertDataToStatusOptions } from './utils'
import { getStatusLead } from './reducer'

const StatusLeadFilterSelector = ({ value, onChange, style, disabled, isAdmin }) => {
  const dispatch = useDispatch()
  const status = useSelector(state => state.config.statusLead)
  const isLoading = useSelector(state => state.config.isLoadingStatus)

  useEffect(() => {
    if (isEmpty(status)) {
      dispatch(getStatusLead())
    }
  }, [])

  const statusOptions = useMemo(() => {
    if (isAdmin) {
      return [...status, 'ĐANG CHỜ XỬ LÝ', 'KHẢ DỤNG']
    }
    return [...status, 'ĐANG CHỜ XỬ LÝ']
  })
  return (
    <Select
      disabled={disabled}
      allowClear
      style={style}
      value={status ? value : undefined}
      showArrow
      options={convertDataToStatusOptions(statusOptions)}
      loading={isLoading}
      placeholder="Chọn Trạng Thái"
      optionFilterProp="label"
      onChange={onChange}
    />
  )
}

StatusLeadFilterSelector.propTypes = {
  value: PropTypes.number,
  onChange: PropTypes.func,
  style: PropTypes.oneOfType([PropTypes.any, PropTypes.arrayOf(PropTypes.any)]),
  disabled: PropTypes.bool,
  isAdmin: PropTypes.bool,
}

export default StatusLeadFilterSelector

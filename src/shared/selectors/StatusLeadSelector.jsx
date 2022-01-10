import React, { useEffect } from 'react'
import { Select } from 'antd'
import PropTypes from 'prop-types'
import { isEmpty } from 'lodash-es'
import { useDispatch, useSelector } from 'react-redux'
import { convertDataToStatusOptions } from './utils'
import { getStatusLead } from './reducer'

const StatusLeadSelector = ({ value, onChange, style, disabled }) => {
  const dispatch = useDispatch()
  const status = useSelector(state => state.config.statusLead)
  const isLoading = useSelector(state => state.config.isLoadingStatus)

  useEffect(() => {
    if (isEmpty(status)) {
      dispatch(getStatusLead())
    }
  }, [])

  return (
    <Select
      disabled={disabled}
      allowClear
      style={style}
      value={status ? value : undefined}
      showArrow
      options={convertDataToStatusOptions(status)}
      loading={isLoading}
      placeholder="Chọn Trạng Thái"
      optionFilterProp="label"
      onChange={onChange}
    />
  )
}

StatusLeadSelector.propTypes = {
  value: PropTypes.number,
  onChange: PropTypes.func,
  style: PropTypes.oneOfType([PropTypes.any, PropTypes.arrayOf(PropTypes.any)]),
  disabled: PropTypes.bool,
}

export default StatusLeadSelector

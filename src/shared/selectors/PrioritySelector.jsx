import React, { useEffect } from 'react'
import { Select } from 'antd'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { isEmpty } from 'lodash-es'
import { convertDataToPriorityOptions } from './utils'
import { getPriority } from './reducer'

const PrioritySelector = ({ value, onChange, style, disabled }) => {
  const dispatch = useDispatch()
  const priority = useSelector(state => state.config.priority)
  const isLoading = useSelector(state => state.config.isLoadingPrioriry)

  useEffect(() => {
    if (isEmpty(priority)) {
      dispatch(getPriority())
    }
  }, [])

  return (
    <Select
      allowClear
      disabled={disabled}
      style={style}
      value={priority ? value : undefined}
      showArrow
      options={convertDataToPriorityOptions(priority)}
      loading={isLoading}
      placeholder="Chọn Mức Ưu tiên"
      optionFilterProp="label"
      onChange={onChange}
    />
  )
}

PrioritySelector.propTypes = {
  value: PropTypes.number,
  onChange: PropTypes.func,
  style: PropTypes.oneOfType([PropTypes.any, PropTypes.arrayOf(PropTypes.any)]),
  disabled: PropTypes.bool,
}

export default PrioritySelector

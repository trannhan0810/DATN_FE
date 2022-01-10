import React, { useEffect } from 'react'
import { Select } from 'antd'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { isEmpty } from 'lodash-es'
import { convertDataToReasonOptions } from './utils'
import { getReason } from './reducer'

const ReasonReturnLeadSelector = ({ value, onChange, style, ...props }) => {
  const dispatch = useDispatch()
  const reasons = useSelector(state => state.config.reasons)
  const isLoading = useSelector(state => state.config.isLoadingReason)

  useEffect(() => {
    if (isEmpty(reasons)) {
      dispatch(getReason())
    }
  }, [])

  return (
    <Select
      {...props}
      allowClear
      style={style}
      value={reasons ? value : undefined}
      showArrow
      options={convertDataToReasonOptions(reasons)}
      loading={isLoading}
      placeholder="Chọn lí do trả về kho"
      optionFilterProp="label"
      onChange={onChange}
    />
  )
}

ReasonReturnLeadSelector.propTypes = {
  value: PropTypes.number,
  onChange: PropTypes.func,
  style: PropTypes.oneOfType([PropTypes.any, PropTypes.arrayOf(PropTypes.any)]),
}

export default ReasonReturnLeadSelector

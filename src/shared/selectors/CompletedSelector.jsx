import React from 'react'
import { Select } from 'antd'
import PropTypes from 'prop-types'

const CompletedSelector = ({ value, onChange, style }) => {
  const options = [
    { value: '', label: 'Tất cả' },
    { value: false, label: 'Chưa Hoàn Thành' },
    { value: true, label: 'Đã Hoàn Thành' },
  ]

  return (
    <Select
      allowClear
      style={style}
      value={value}
      defaultValue=""
      showArrow
      options={options}
      placeholder="Chọn Trạng Thái Hoàn Thành"
      optionFilterProp="label"
      onChange={onChange}
    />
  )
}

CompletedSelector.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  style: PropTypes.oneOfType([PropTypes.any, PropTypes.arrayOf(PropTypes.any)]),
}

export default CompletedSelector

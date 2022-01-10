import React from 'react'
import { Select } from 'antd'
import PropTypes from 'prop-types'

const MirarSelector = ({ value, onChange, style }) => {
  const options = [
    { value: true, label: 'OK' },
    { value: false, label: 'NOT OK' },
  ]

  return (
    <Select
      allowClear
      style={style}
      value={value}
      showArrow
      options={options}
      placeholder="OK/NOT OK"
      optionFilterProp="label"
      onChange={onChange}
    />
  )
}

MirarSelector.propTypes = {
  value: PropTypes.bool,
  onChange: PropTypes.func,
  style: PropTypes.oneOfType([PropTypes.any, PropTypes.arrayOf(PropTypes.any)]),
}

export default MirarSelector

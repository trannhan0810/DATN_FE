import React, { useEffect } from 'react'
import { Select } from 'antd'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { isEmpty } from 'lodash-es'
import { convertDataToJobOptions } from './utils'
import { getJobs } from './reducer'

const JobSelector = ({ value, onChange, style }) => {
  const dispatch = useDispatch()
  const jobs = useSelector(state => state.config.jobs)
  const isLoading = useSelector(state => state.config.isLoadingJobs)

  useEffect(() => {
    if (isEmpty(jobs)) {
      dispatch(getJobs())
    }
  }, [])

  return (
    <Select
      allowClear
      style={style}
      value={jobs ? value : undefined}
      showArrow
      options={convertDataToJobOptions(jobs)}
      loading={isLoading}
      placeholder="Chọn Công Việc"
      optionFilterProp="label"
      onChange={onChange}
    />
  )
}

JobSelector.propTypes = {
  value: PropTypes.number,
  onChange: PropTypes.func,
  style: PropTypes.oneOfType([PropTypes.any, PropTypes.arrayOf(PropTypes.any)]),
}

export default JobSelector

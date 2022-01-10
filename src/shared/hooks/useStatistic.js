import { useCallback, useEffect, useState } from 'react'
import { showError } from 'core/tools'
import { getLeadStatistic, exportExcelStatistic } from 'api/statistic'
import { formatDateTime } from 'shared/utils/date'

export const formatter = 'MM/DD/YYYY HH:mm'

const useStatistic = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [statistic, setStatistic] = useState([])
  const [filters, setFilters] = useState({})
  const [isFirstTime, setIsFirstTime] = useState(true)

  const onFilters = values => {
    setIsFirstTime(false)
    setFilters(values)
  }

  // Get Users
  const getStatistic = useCallback(async () => {
    if (isFirstTime) {
      return
    }

    if (!filters.StartTime) {
      return showError('Vui lòng chọn ngày bắt đầu')
    }
    if (!filters.EndTime) {
      return showError('Vui lòng chọn ngày kết thúc')
    }
    if (!filters.employeeIds?.length) {
      return showError('Vui lòng chọn nhân viên')
    }

    try {
      setIsLoading(true)
      const { StartTime, EndTime, employeeIds } = filters

      const res = await getLeadStatistic({
        StartTime: formatDateTime(StartTime, formatter),
        EndTime: formatDateTime(EndTime, formatter),
        EmployeeIds: employeeIds,
      })
      setStatistic(res?.data)
      setIsLoading(false)
    } catch (error) {
      showError(error)
      setStatistic([])
      setIsLoading(false)
    }
  }, [filters])

  useEffect(() => {
    getStatistic()
  }, [getStatistic])

  // Export Excel
  const exportStatistic = async () => {
    if (!filters.StartTime) {
      return showError('Vui lòng chọn ngày bắt đầu')
    }
    if (!filters.EndTime) {
      return showError('Vui lòng chọn ngày kết thúc')
    }
    if (!filters.employeeIds?.length) {
      return showError('Vui lòng chọn nhân viên')
    }

    try {
      const { StartTime, EndTime, employeeIds } = filters

      const res = await exportExcelStatistic({
        StartTime: formatDateTime(StartTime, formatter),
        EndTime: formatDateTime(EndTime, formatter),
        EmployeeIds: employeeIds,
      })
      window.open(res, '_blank')
    } catch (error) {
      showError(error)
    }
  }

  return {
    isLoading,
    statistic,
    onFilters,
    exportStatistic,
  }
}
export default useStatistic

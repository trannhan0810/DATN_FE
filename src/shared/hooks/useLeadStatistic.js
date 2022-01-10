import { useEffect, useState } from 'react'
import { getLeadStatistic } from 'api/statistic'

const useLeadStatistic = params => {
  const [statistic, setStatistic] = useState()
  useEffect(() => {
    async function getStatistic() {
      const response = await getLeadStatistic(params)
      setStatistic(response.data)
    }

    getStatistic()
  }, [])
  return statistic
}
export default useLeadStatistic

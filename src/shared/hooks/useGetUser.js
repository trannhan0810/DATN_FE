import { useEffect, useState } from 'react'
import { getUser } from 'api/user'

const useGetUser = id => {
  const [user, setUser] = useState()
  useEffect(() => {
    async function getUserDetail() {
      const response = await getUser({ id })
      setUser(response.data)
    }

    getUserDetail()
  }, [])
  return user
}
export default useGetUser

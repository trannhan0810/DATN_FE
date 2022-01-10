import * as qs from 'query-string'
import { useMemo } from 'react'
import { useHistory, useLocation, useParams, useRouteMatch } from 'react-router-dom'

function useRouter() {
  const params = useParams()
  const location = useLocation()
  const history = useHistory()
  const match = useRouteMatch()

  return useMemo(() => {
    return {
      back: history.goBack,
      history,
      location,
      match,
      pathname: location.pathname,
      push: history.push,
      query: {
        ...qs.parse(location.search),
        ...params,
      },
      replace: history.replace,
      routerState: location.state,
    }
  }, [history, location, params, match])
}

export default useRouter

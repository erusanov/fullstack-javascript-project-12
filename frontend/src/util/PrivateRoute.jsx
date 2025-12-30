import { Navigate, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'

const PrivateRoute = ({ children }) => {
  const { token } = useSelector(state => state.auth)
  const location = useLocation()

  return (
    token
      ? children
      : (
          <Navigate
            to="/login"
            state={{ from: location }}
          />
        )
  )
}

export {
  PrivateRoute,
}

import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { UiLoader } from '../../ui/ui-loader'
import { useAuth } from '../data-access'

export function AuthRoute({ redirectTo }: { redirectTo: string }) {
  const { loading, user } = useAuth()
  const location = useLocation()

  if (loading) {
    return <UiLoader />
  }

  return user ? <Outlet /> : <Navigate replace to={redirectTo} state={{ from: location }} />
}

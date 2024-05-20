import { useAuth } from '@/hooks/use-auth'
import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import LoadingState from './LoadingState'

function GuestGuard() {
  const navigate = useNavigate()
  const { isAuthenticated, isLoading } = useAuth()

  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      navigate('/')
    }
  }, [navigate, isAuthenticated, isLoading])

  if (!isLoading && isAuthenticated) {
    return (
      <div className='grid h-dvh place-items-center'>
        <LoadingState />
      </div>
    )
  }
  return <Outlet />
}

export default GuestGuard

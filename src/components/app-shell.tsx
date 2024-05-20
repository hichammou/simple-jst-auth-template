import { Outlet, useNavigate } from 'react-router-dom'
import Sidebar from './sidebar'
import useIsCollapsed from '@/hooks/use-is-collapsed'
import { useEffect } from 'react'
import { useAuth } from '@/hooks/use-auth'
import LoadingState from './LoadingState'

export default function AppShell() {
  const [isCollapsed, setIsCollapsed] = useIsCollapsed()
  const navigate = useNavigate()
  const { isAuthenticated, isLoading } = useAuth()

  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      navigate('/auth/sign-in')
    }
  }, [navigate, isAuthenticated, isLoading])

  if (!isLoading && !isAuthenticated) {
    return (
      <div className='grid h-dvh place-items-center'>
        <LoadingState />
      </div>
    )
  }

  return (
    <div className='relative h-full overflow-hidden bg-background'>
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <main
        id='content'
        className={`overflow-x-hidden pt-16 transition-[margin] md:overflow-y-hidden md:pt-0 ${isCollapsed ? 'md:ml-14' : 'md:ml-64'} h-full`}
      >
        <Outlet />
      </main>
    </div>
  )
}

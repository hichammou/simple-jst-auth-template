import { AuthContext } from '@/contexts/auth-context'
import { useContext } from 'react'

export const useAuth = function () {
  const authContext = useContext(AuthContext)
  if (!authContext) throw new Error('Cannot use context out of its provider')
  return authContext
}

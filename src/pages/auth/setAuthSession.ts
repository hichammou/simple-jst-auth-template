import axios from '@/lib/axios'
import { verifyToken } from './verifyToken'
import { secretToken } from '@/lib/config'

export function setAuthSession({
  token,
  rememberMe = false,
}: {
  token: string
  rememberMe?: boolean
}) {
  if (verifyToken(token)) {
    axios.defaults.headers.common.Authorization = 'Bearer ' + token
    if (!rememberMe) {
      sessionStorage.setItem(secretToken, token)
    } else {
      localStorage.setItem(secretToken, token)
    }
    return true
  }
  return false
}

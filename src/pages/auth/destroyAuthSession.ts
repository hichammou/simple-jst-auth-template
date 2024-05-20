import axios from '@/lib/axios'
import { secretToken } from '@/lib/config'

export function destroyAuthSession() {
  delete axios.defaults.headers.common.Authorization
  sessionStorage.removeItem(secretToken)
  localStorage.removeItem(secretToken)
}

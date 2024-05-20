import { jwtDecode } from 'jwt-decode'

export function verifyToken(token: string): boolean {
  try {
    const { exp } = jwtDecode(token)
    const expirationTime = new Date(exp || 1 * 1000)
    const currentTime = new Date()
    return currentTime > expirationTime
  } catch (error) {
    return false
  }
}

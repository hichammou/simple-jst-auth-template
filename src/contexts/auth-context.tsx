import axios from '@/lib/axios'
import { secretToken } from '@/lib/config'
import { destroyAuthSession } from '@/pages/auth/destroyAuthSession'
import { setAuthSession } from '@/pages/auth/setAuthSession'
import { createContext, useEffect, useReducer, useState } from 'react'

type User = {
  username: string
  email?: string
}

type InitialState = {
  isLoading: boolean
  isAuthenticated: boolean
  user: User | null
}

const initialState: InitialState = {
  isLoading: false,
  isAuthenticated: false,
  user: null,
}

type PayloadType = {
  isAuthenticated: boolean
  isLoading: boolean
  user: User | null
}

type ActionType = {
  type: 'login' | 'logout' | 'setLoading'
  payload: PayloadType
}

const handlers = {
  login: (state: InitialState, action: ActionType) => {
    const { isAuthenticated, user, isLoading } = action.payload

    return {
      ...state,
      isAuthenticated,
      user,
      isLoading,
    }
  },
  logout: (state: InitialState, action: ActionType) => ({
    ...state,
    ...action.payload,
  }),
  setLoading(state: InitialState, action: ActionType): InitialState {
    return { ...state, isLoading: action.payload.isLoading }
  },
}

type ContextProps = {
  isAuthenticated?: boolean
  login: (
    username: string,
    password: string,
    rememberMe: boolean
  ) => Promise<void>
  logout?: () => void
  user?: User | null
  isLoading?: boolean
  isLogging?: boolean
}

export const AuthContext = createContext<ContextProps>({
  login() {
    return Promise.resolve()
  },
})

const reducer = (state: InitialState, action: ActionType) =>
  handlers[action.type] ? handlers[action.type](state, action) : state

async function validateUser(
  token: string,
  dispatch: React.Dispatch<ActionType>
): Promise<boolean> {
  if (token) {
    if (setAuthSession({ token })) {
      const { data } = await axios.get('/account')
      dispatch({
        type: 'login',
        payload: {
          isAuthenticated: true,
          isLoading: false,
          user: { username: data.firstName, email: data.email },
        },
      })

      return true
    }
  }

  dispatch({
    type: 'logout',
    payload: {
      isAuthenticated: false,
      isLoading: false,
      user: null,
    },
  })
  return false
}

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [{ isAuthenticated, user, isLoading }, dispatch] = useReducer(
    reducer,
    initialState
  )
  const [isLogging, setIsLogging] = useState(false)

  useEffect(() => {
    async function check() {
      dispatch({
        type: 'setLoading',
        payload: {
          isAuthenticated,
          user: { username: user?.username || '', email: user?.email },
          isLoading: true,
        },
      })
      const firgoToken =
        localStorage.getItem(secretToken) ||
        sessionStorage.getItem(secretToken)

      if (firgoToken) {
        await validateUser(firgoToken, dispatch)
      } else {
        dispatch({
          type: 'logout',
          payload: {
            isAuthenticated: false,
            isLoading: false,
            user: null,
          },
        })
      }
    }
    check()
  }, [isAuthenticated, user?.email, user?.username])

  async function login(
    username: string,
    password: string,
    rememberMe: boolean
  ): Promise<void> {
    setIsLogging(true)
    try {
      const req = await axios.post('/authenticate', {
        username,
        password,
      })

      if (req.status === 200 && req.data.id_token) {
        if (setAuthSession({ rememberMe, token: req.data.id_token })) {
          const { data } = await axios.get('/account')
          dispatch({
            type: 'login',
            payload: {
              isAuthenticated: true,
              isLoading: false,
              user: { username: data.firstName, email: data.email },
            },
          })
        }
      }
      setIsLogging(false)
    } catch (error) {
      setIsLogging(false)
      throw error
    }
  }

  function logout() {
    dispatch({ type: 'logout', payload: initialState })
    destroyAuthSession()
  }

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, isLoading, login, logout, isLogging }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider

import { ColorScheme } from '@mantine/core'
import { useLocalStorage } from '@mantine/hooks'
import { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export interface User {
  id: string
  username: string
  avatarUrl: string
}
export interface LoginInput {
  username: string
  password: string
}
export interface AuthProviderContext {
  loading: boolean
  loggedIn: boolean
  login: (input: LoginInput) => User | undefined
  logout: () => Promise<void>
  user: User | undefined
}

const AuthProviderContext = createContext<AuthProviderContext>({} as AuthProviderContext)
function AuthProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)

  const [user, setUser] = useLocalStorage<User | undefined>({
    key: 'mantine-admin-dummy-user',
    defaultValue: undefined,
    getInitialValueInEffect: true,
  })

  useEffect(() => {
    // FIXME: This is a dummy implementation, replace with your own logic to check if user is logged in, then stop loading
    setLoading(false)
  }, [user])

  const login = (input: LoginInput) => {
    console.log('do login', input)
    setLoading(true)
    const user = { id: '1', username: 'admin', avatarUrl: 'https://avatars.githubusercontent.com/u/79146003?v=4' }
    setUser(user)
    console.log('user', user)
    setLoading(false)
    navigate('/')
    return user
  }

  const logout = async () => {
    console.log('do logout')
    setUser(undefined)
    navigate('/')
  }

  const value = {
    loading,
    loggedIn: !!user,
    login,
    logout,
    user,
  }
  return <AuthProviderContext.Provider value={value}>{children}</AuthProviderContext.Provider>
}

const useAuth = () => useContext(AuthProviderContext)

export { AuthProvider, useAuth }

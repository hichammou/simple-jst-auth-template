import { useEffect } from 'react'
import { UserAuthForm } from './components/user-auth-form'
import { useAuth } from '@/hooks/use-auth'
import { useNavigate } from 'react-router-dom'

export default function SignIn() {
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/')
    }
  })

  return (
    <div>
      <div className='lg:p-8'>
        <div className='mx-auto flex w-full flex-col justify-center space-y-2 sm:w-[350px]'>
          <div className='flex flex-col space-y-2 text-left'>
            <h1 className='text-2xl font-semibold tracking-tight'>
              Hello again
            </h1>
            <p className='text-sm text-muted-foreground'>
              Enter your login information
            </p>
          </div>
          <UserAuthForm />
        </div>
      </div>
    </div>
  )
}

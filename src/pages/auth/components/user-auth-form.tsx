/* eslint-disable @typescript-eslint/no-explicit-any */
import { HTMLAttributes, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { useAuth } from '@/hooks/use-auth'

interface UserAuthFormProps extends HTMLAttributes<HTMLDivElement> {}

const formSchema = z.object({
  username: z.string().min(3, { message: 'Please enter your username' }),
  rememberMe: z.boolean().default(false),
  password: z
    .string()
    .min(1, {
      message: 'Please enter your password',
    })
    .min(4, {
      message: 'Password must be at least 4 characters long',
    }),
})
export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const [error, setError] = useState('')
  const { login, isLogging } = useAuth()

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      password: '',
      rememberMe: false,
    },
  })

  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      await login(data.username, data.password, data.rememberMe)
    } catch (error: { status: number; detail: string } | any) {
      if (error.status === 401) {
        return setError('Please Entre a valid credentials')
      }
      setError(error.detail)
    }
  }

  return (
    <div className={`grid gap-6 ${className}`} {...props}>
      {error && (
        <div className='rounded-md bg-red-300 px-3 py-3 text-xs text-red-800'>
          {error}
        </div>
      )}
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className='grid gap-2'>
          <div className='space-y-1'>
            <label>Username</label>
            <input
              type='text'
              placeholder='username'
              {...form.register('username')}
            />
            {form.formState.errors.username && (
              <p>{form.formState.errors.username.message}</p>
            )}
          </div>
          <div className='space-y-1'>
            <label>Password</label>
            <input
              type='password'
              placeholder='********'
              {...form.register('password')}
            />
            {form.formState.errors.password && (
              <p>{form.formState.errors.password.message}</p>
            )}
          </div>
          <div className='mt-3 flex flex-row items-start space-x-3 space-y-0'>
            <input type='checkbox' {...form.register('rememberMe')} />
            <div className='space-y-1 leading-none'>
              <label>Remember me</label>
            </div>
          </div>
          <Link
            to='/forgot-password'
            className='my-2 justify-self-end text-sm font-medium text-blue-500 hover:opacity-75'
          >
            Forgot password?
          </Link>
          <button
            type='submit'
            className='mt-2 bg-blue-600'
            disabled={isLogging}
          >
            {isLogging ? 'Loading...' : 'Login'}
          </button>
        </div>
      </form>
    </div>
  )
}

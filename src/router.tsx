import { createBrowserRouter } from 'react-router-dom'

const router = createBrowserRouter([
  // Auth routes
  {
    path: '/auth',
    lazy: async () => ({
      Component: (await import('./components/guest-guard')).default,
    }),
    children: [
      {
        path: 'sign-in',
        lazy: async () => ({
          Component: (await import('./pages/auth/sign-in')).default,
        }),
      },
      
    ],
  },

  // Main routes
  {
    path: '/',
    lazy: async () => {
      const AppShell = await import('./components/app-shell')
      return { Component: AppShell.default }
    },
  },
])

export default router

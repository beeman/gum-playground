import { BrowserRouter } from 'react-router-dom'
import { AppRoutes } from './app-routes'
import { AppShell } from './app-shell'
import { AuthProvider } from './auth/data-access'

export function App() {
  return (
    <BrowserRouter>
      <AppShell>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </AppShell>
    </BrowserRouter>
  )
}

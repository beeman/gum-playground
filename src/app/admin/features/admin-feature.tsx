import { Route, Routes } from 'react-router-dom'
import { AdminAppFeature } from './admin-app.feature'
import { AdminDashboardFeature } from './admin-dashboard-feature'
import { AdminSdkFeature } from './admin-sdk.feature'
import { AdminUserRoutes } from './user/admin-user.routes'

export function AdminFeature() {
  return (
    <Routes>
      <Route index element={<AdminDashboardFeature />} />
      <Route path="apps/*" element={<AdminAppFeature />} />
      <Route path="sdks/*" element={<AdminSdkFeature />} />
      <Route path="users/*" element={<AdminUserRoutes />} />
    </Routes>
  )
}

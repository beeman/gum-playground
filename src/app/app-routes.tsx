import { Anchor, Container, Stack, Text } from '@mantine/core'
import { Link, Navigate, Route, Routes, useParams } from 'react-router-dom'
import { AdminFeature } from './admin/features/admin-feature'
import { AuthFeature } from './auth/feature'
import { AuthRoute } from './auth/ui/auth-route'
import { DashboardFeature } from './dashboard/feature/dashboard-feature'
import { NotFoundFeature } from './not-found.feature'
import { UiLayout } from './ui/layout'

export function AppRoutes() {
  return (
    <Routes>
      <Route index element={<Navigate replace to={'/dashboard'} />} />
      <Route path="/login" element={<AuthFeature />} />
      <Route element={<AuthRoute redirectTo="/login" />}>
        <Route element={<UiLayout />}>
          <Route path="/admin/*" element={<AdminFeature />} />
          <Route path="/dashboard" element={<DashboardFeature />} />
          <Route path="/demo/:path" element={<CatchAllFeature />} />
          <Route path="/demo/:path/:sub" element={<CatchAllFeature />} />
        </Route>
      </Route>
      <Route path="*" element={<NotFoundFeature />} />
    </Routes>
  )
}

export function CatchAllFeature() {
  const { path, sub } = useParams()
  return (
    <Container my="md">
      <Stack>
        <Text size="xl">
          You are at {path} {sub ? ` - ${sub}` : null}
        </Text>
        <Anchor component={Link} to="/" color="brand">
          Click here to go back to root page.
        </Anchor>
      </Stack>
    </Container>
  )
}

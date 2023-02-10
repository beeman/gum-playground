import { Alert, Paper, useMantineTheme } from '@mantine/core'
import { useParams } from 'react-router-dom'
import { UiPage } from '../../../ui/page'
import { UiTabRoutes } from '../../../ui/ui-tab-routes'
import { DEMO_USERS, User } from '../../../user/data-access'
import { AdminUserLogsTab } from './admin-user-logs.tab'
import { AdminUserSettingsTab } from './admin-user-settings.tab'

export function AdminUserDetailFeature() {
  const theme = useMantineTheme()
  const { userId } = useParams<{ userId: string }>()
  // FIXME: Get data from API instead of DEMO_USERS
  const data: User | undefined = DEMO_USERS.find((u) => u.id === userId)

  const updateUser = (user: Partial<User>) => {
    console.log('FIXME: implement updateUser', user)
  }

  if (!data) {
    return (
      <UiPage title="User">
        <Alert color={'red'}>User not found</Alert>
      </UiPage>
    )
  }

  return (
    <UiPage title={`User ${data.username}`}>
      <Alert color="yellow">FIXME: BUILD OUT THE USER DETAIL HEADER</Alert>
      <Paper component="pre" withBorder radius="md" p={theme.spacing.md} fz={'xs'}>
        {JSON.stringify(data, null, 2)}
      </Paper>
      <UiTabRoutes
        tabs={[
          {
            label: 'Settings',
            value: 'settings',
            component: <AdminUserSettingsTab user={data} updateUser={updateUser} />,
          },
          { label: 'Logs', value: 'logs', component: <AdminUserLogsTab user={data} /> },
        ]}
      />
    </UiPage>
  )
}

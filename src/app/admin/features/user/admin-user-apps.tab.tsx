import { Alert, Paper, Stack, useMantineTheme } from '@mantine/core'
import { User } from '../../../user/data-access'

export function AdminUserAppsTab({ user }: { user: User }) {
  const theme = useMantineTheme()
  // FIXME: Fetch data based on user

  return (
    <Stack>
      <Alert color="yellow">FIXME: BUILD OUT USER APPS TAB</Alert>
      <Paper component="pre" withBorder radius="md" p={theme.spacing.md} fz={'xs'}>
        {JSON.stringify({ user }, null, 2)}
      </Paper>
    </Stack>
  )
}

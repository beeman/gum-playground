import { ActionIcon, Group, Stack, Title } from '@mantine/core'
import { IconRefresh } from '@tabler/icons-react'
import React from 'react'

import { UiCard } from '../ui/ui-card'
import { UiLoader } from '../ui/ui-loader'
import { GumUserCreateButton } from './gum-user-create-button'
import { GumUserItem } from './gum-user-item'
import { useGumApp } from './use-gum-app'

export function GumApp() {
  const { loading, users, refresh } = useGumApp()
  return (
    <Stack spacing={42}>
      <UiCard>
        <Group position="apart">
          <Title order={2}>Users</Title>
          <Group>
            <GumUserCreateButton />
            <ActionIcon
              loading={loading}
              loaderProps={{ variant: 'dots' }}
              color="brand"
              variant="filled"
              size="xl"
              radius="xl"
              onClick={refresh}
            >
              <IconRefresh size={24} />
            </ActionIcon>
          </Group>
        </Group>
      </UiCard>

      {users?.length ? (
        users?.map((user) => <GumUserItem key={user?.publicKey?.toString()} user={user} />)
      ) : (
        <UiCard>
          <Stack align="center">
            {loading ? <UiLoader /> : <Title order={3}>Create a user to get started!</Title>}
          </Stack>
        </UiCard>
      )}
    </Stack>
  )
}

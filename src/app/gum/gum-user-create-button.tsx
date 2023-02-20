import { useCreateUser } from '@gumhq/react-sdk'
import { Button } from '@mantine/core'
import React from 'react'
import { UiError } from '../ui/ui-error'
import { useGumApp } from './use-gum-app'

export function GumUserCreateButton() {
  const { sdk, owner, refresh } = useGumApp()
  const { create, loading, error } = useCreateUser(sdk)

  if (error) {
    console.error(error)
    return <UiError error={error} />
  }

  return (
    <Button size="lg" radius="xl" loading={loading} onClick={() => create(owner).then(() => refresh())}>
      Create User
    </Button>
  )
}

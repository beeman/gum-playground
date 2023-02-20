import { ActionIcon } from '@mantine/core'
import React from 'react'

export function UiSocialLink({ href, icon: Icon }: { href: string; icon: React.ComponentType<{ size: number }> }) {
  return (
    <ActionIcon target="_blank" radius="xl" size="xl" variant="default" component="a" href={href}>
      <Icon size={24} />
    </ActionIcon>
  )
}

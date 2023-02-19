import { Button } from '@mantine/core'
import React from 'react'

import { Namespace } from './lib/gum-interfaces'
import { GumProfileTypeIcon } from './lib/use-gum-app'

export function GumProfileCreateButton({ onClick, type }: { onClick: () => void; type: Namespace }) {
  return (
    <Button
      size="lg"
      radius="xl"
      variant="light"
      onClick={onClick}
      leftIcon={<GumProfileTypeIcon type={type} size={32} />}
    >
      Create {type} Profile
    </Button>
  )
}
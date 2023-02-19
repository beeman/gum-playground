import { Paper } from '@mantine/core'
import React, { ReactNode } from 'react'

export function UiCard({ children }: { children: ReactNode }) {
  return (
    <Paper withBorder sx={{ borderWidth: 4 }} radius="xl" p="xl">
      {children}
    </Paper>
  )
}

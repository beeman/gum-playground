import { Paper, PaperProps } from '@mantine/core'
import React, { ReactNode } from 'react'

export function UiCard({ children, ...props }: PaperProps & { children: ReactNode }) {
  return (
    <Paper withBorder sx={{ borderWidth: 4 }} radius="xl" p="xl" {...props}>
      {children}
    </Paper>
  )
}

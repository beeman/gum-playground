import { Box, Container, Group, Paper, Stack } from '@mantine/core'
import React from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import { GumFeature } from './gum/gum.feature'
import { NotFoundFeature } from './not-found.feature'
import { GumLogo } from './ui/gum-logo'
import { UiThemeToggle } from './ui/layout/ui-theme-toggle'
import { WalletMultiButton } from './ui/wallet-adapter-mantine-ui/wallet-multi-button'

export function AppRoutes() {
  return (
    <Container my="md">
      <Stack mt={64} spacing={32}>
        <Paper withBorder sx={{ borderWidth: 4 }} radius="xl" p="xl">
          <Group position="apart" align="center">
            <Box component={Link} to="/" sx={{ height: 48 }}>
              <GumLogo height={48} width={140} />
            </Box>
            <Group>
              <WalletMultiButton />
              <UiThemeToggle />
            </Group>
          </Group>
        </Paper>
        <Routes>
          <Route index element={<GumFeature />} />
          <Route path="*" element={<NotFoundFeature />} />
        </Routes>
      </Stack>
    </Container>
  )
}

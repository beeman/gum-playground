import { Box, Container, Group, Stack } from '@mantine/core'
import { IconBrandGithub, IconBrandTwitter } from '@tabler/icons-react'
import React from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import { GumFeature } from './gum/gum.feature'
import { NotFoundFeature } from './not-found.feature'
import { GumLogo } from './ui/gum-logo'
import { UiCard } from './ui/ui-card'
import { UiSocialLink } from './ui/ui-social-link'
import { UiThemeToggle } from './ui/ui-theme-toggle'
import { WalletMultiButton } from './ui/wallet-adapter-mantine-ui/wallet-multi-button'

export function AppRoutes() {
  const text = encodeURIComponent(
    'Check out this Gum Playground! https://gum-playground.pages.dev by @beeman_nl using @gumisfunn',
  )
  return (
    <Container my="md">
      <Stack mt={64} spacing={32}>
        <UiCard>
          <Group position="apart" align="center">
            <Box component={Link} to="/" sx={{ height: 48 }}>
              <GumLogo height={48} width={140} />
            </Box>
            <Group>
              <WalletMultiButton />
              <UiSocialLink icon={IconBrandTwitter} href={`https://twitter.com/intent/tweet?text=${text}`} />
              <UiSocialLink icon={IconBrandGithub} href="https://github.com/beeman/gum-playground" />
              <UiThemeToggle />
            </Group>
          </Group>
        </UiCard>
        <Routes>
          <Route index element={<GumFeature />} />
          <Route path="*" element={<NotFoundFeature />} />
        </Routes>
      </Stack>
    </Container>
  )
}

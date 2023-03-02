import { Box, Container, Group, Stack } from '@mantine/core'
import { IconBrandGithub, IconBrandTwitter } from '@tabler/icons-react'
import React from 'react'
import { Link } from 'react-router-dom'
import { GumLogo } from './gum-logo'
import { UiCard } from './ui-card'
import { UiNetworkSwitcher } from './ui-network-switcher'
import { UiSocialLink } from './ui-social-link'
import { UiThemeToggle } from './ui-theme-toggle'
import { WalletMultiButton } from './wallet-adapter-mantine-ui/wallet-multi-button'

export function UiLayout({ children }: { children: React.ReactNode }) {
  return (
    <Container my="md">
      <Stack mt={64} spacing={32}>
        <UiHeader />
        {children}
        <UiFooter />
      </Stack>
    </Container>
  )
}

function UiFooter() {
  const text = encodeURIComponent(
    'Check out this Gum Playground! https://gum-playground.pages.dev by @beeman_nl using @gumisfunn',
  )
  return (
    <Group position="center" align="center">
      <Group>
        <UiSocialLink icon={IconBrandTwitter} href={`https://twitter.com/intent/tweet?text=${text}`} />
        <UiSocialLink icon={IconBrandGithub} href="https://github.com/beeman/gum-playground" />
        <UiThemeToggle />
      </Group>
    </Group>
  )
}

function UiHeader() {
  return (
    <UiCard>
      <Group position="apart" align="center">
        <Box component={Link} to="/" sx={{ height: 48 }}>
          <GumLogo height={48} width={140} />
        </Box>
        <Group>
          <WalletMultiButton />
          <UiNetworkSwitcher />
        </Group>
      </Group>
    </UiCard>
  )
}

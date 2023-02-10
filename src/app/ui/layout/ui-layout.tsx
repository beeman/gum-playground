import { AppShell, useMantineTheme } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import {
  IconAdjustments,
  IconCalendarStats,
  IconFileAnalytics,
  IconGauge,
  IconLock,
  IconPresentationAnalytics,
} from '@tabler/icons-react'
import { Outlet } from 'react-router-dom'
import { UiLogo } from '../ui-logo'
import { UiFooter } from './ui-footer'
import { UiHeader } from './ui-header'
import { UiNavbar } from './ui-navbar'

export function UiLayout() {
  const theme = useMantineTheme()
  const [opened, { toggle }] = useDisclosure(false)
  const logo = <UiLogo width={36} />
  const footerLinks = [
    {
      link: 'https://github.com/beeman/mantine-admin-starter',
      label: 'GitHub',
    },
  ]

  return (
    <AppShell
      styles={{
        main: {
          background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
        },
      }}
      navbarOffsetBreakpoint="md"
      navbar={
        <UiNavbar
          hidden={!opened}
          links={[
            { label: 'Dashboard', icon: IconGauge, link: '/dashboard' },
            { label: 'Analytics', link: '/demo/analytics', icon: IconPresentationAnalytics },
            { label: 'Contracts', link: '/demo/contracts', icon: IconFileAnalytics },
            {
              label: 'Releases',
              icon: IconCalendarStats,
              link: '/demo/releases',
              links: [
                { label: 'Upcoming releases', link: '/demo/releases/upcoming' },
                { label: 'Previous releases', link: '/demo/releases/previous' },
                { label: 'Releases schedule', link: '/demo/releases/schedule' },
              ],
            },
            {
              label: 'Admin',
              icon: IconLock,
              link: '/admin',
              links: [{ label: 'Users', link: '/admin/users' }],
            },
            { label: 'Settings', link: '/demo/settings', icon: IconAdjustments },
          ]}
        />
      }
      footer={<UiFooter links={footerLinks} logo={logo} />}
      header={<UiHeader toggle={toggle} opened={opened} links={[]} logo={logo} />}
    >
      <Outlet />
    </AppShell>
  )
}

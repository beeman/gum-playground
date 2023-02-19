import { AppShell, useMantineTheme } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { Outlet } from 'react-router-dom'
import { UiLogo } from '../ui-logo'
import { UiFooter } from './ui-footer'
import { UiHeader } from './ui-header'

export function UiLayout() {
  const theme = useMantineTheme()
  const [opened, { toggle }] = useDisclosure(false)
  const logo = <UiLogo width={36} />
  const footerLinks = [
    {
      link: 'https://github.com/beeman/gum-mantine-starter',
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
      footer={<UiFooter links={footerLinks} logo={logo} />}
      header={<UiHeader toggle={toggle} opened={opened} links={[]} logo={logo} />}
    >
      <Outlet />
    </AppShell>
  )
}

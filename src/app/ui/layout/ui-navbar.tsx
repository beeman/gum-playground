import { createStyles, Menu, Navbar, ScrollArea, Text } from '@mantine/core'
import {
  IconArrowsLeftRight,
  IconLogout,
  IconMessageCircle,
  IconPhoto,
  IconSearch,
  IconSettings,
  IconTrash,
} from '@tabler/icons-react'
import { useAuth } from '../../auth/data-access'
import { UiNavbarLinkGroup, UiNavbarLinkGroupProps } from './ui-navbar-links-group'
import { UiNavbarUserButton } from './ui-navbar-user-button'

const useStyles = createStyles((theme) => ({
  navbar: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    paddingBottom: 0,
  },

  header: {
    padding: theme.spacing.md,
    paddingTop: 0,
    marginLeft: -theme.spacing.md,
    marginRight: -theme.spacing.md,
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    borderBottom: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]}`,
  },

  links: {
    marginLeft: -theme.spacing.md,
    marginRight: -theme.spacing.md,
  },

  linksInner: {
    paddingTop: theme.spacing.xs,
    paddingBottom: theme.spacing.xs,
  },

  footer: {
    marginLeft: -theme.spacing.md,
    marginRight: -theme.spacing.md,
    borderTop: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]}`,
  },
}))

export function UiNavbar({ hidden, links }: { hidden: boolean; links: UiNavbarLinkGroupProps[] }) {
  const { classes } = useStyles()
  const { logout } = useAuth()
  const navLinks = links.map((item) => <UiNavbarLinkGroup {...item} key={item.label} />)

  return (
    <Navbar width={{ sm: 300 }} px="md" className={classes.navbar} hidden={hidden}>
      <Navbar.Section grow className={classes.links} component={ScrollArea}>
        <div className={classes.linksInner}>{navLinks}</div>
      </Navbar.Section>

      <Navbar.Section className={classes.footer}>
        <Menu position="right-end" offset={4} withArrow>
          <Menu.Target>
            <UiNavbarUserButton
              avatarUrl="https://avatars.githubusercontent.com/u/79146003?v=4"
              name="Mantine Admin"
              email="admin@example.com"
            />
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item color="red" icon={<IconLogout size={14} />} onClick={() => logout()}>
              Log out
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Navbar.Section>
    </Navbar>
  )
}

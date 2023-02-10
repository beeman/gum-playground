import { Anchor, Burger, createStyles, Flex, Group, Header, MediaQuery } from '@mantine/core'
import { ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { UiThemeToggle } from './ui-theme-toggle'

const useStyles = createStyles((theme) => ({
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
  },

  links: {
    [theme.fn.smallerThan('xs')]: {
      display: 'none',
    },
  },

  link: {
    display: 'block',
    lineHeight: 1,
    padding: '8px 12px',
    borderRadius: theme.radius.sm,
    textDecoration: 'none',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    },
  },

  linkActive: {
    '&, &:hover': {
      backgroundColor: theme.fn.variant({
        variant: 'light',
        color: theme.primaryColor,
      }).background,
      color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
    },
  },

  logoLink: {
    display: 'flex',
    alignItems: 'center',
  },
}))

interface UiHeaderProps {
  links: { link: string; label: string }[]
  logo: ReactNode
  opened: boolean
  toggle: () => void
}

export function UiHeader({ links, logo, opened, toggle }: UiHeaderProps) {
  const { classes, cx } = useStyles()
  const location = useLocation()
  const activeLink = links.find((item) => item.link === location.pathname)?.link

  const items = links.map((link) => (
    <Anchor
      component={Link}
      key={link.label}
      to={link.link}
      className={cx(classes.link, {
        [classes.linkActive]: activeLink === link.link,
      })}
    >
      {link.label}
    </Anchor>
  ))

  return (
    <Header height={60} mb={120}>
      <Flex className={classes.header}>
        <Group spacing={2}>
          <MediaQuery largerThan="md" styles={{ display: 'none' }}>
            <Burger opened={opened} onClick={toggle} size="sm" mr="xl" />
          </MediaQuery>
          <Anchor component={Link} to="/" className={classes.logoLink}>
            {logo}
          </Anchor>
        </Group>
        <Group spacing={5} className={classes.links}>
          {items}
        </Group>
        <UiThemeToggle />
      </Flex>
    </Header>
  )
}

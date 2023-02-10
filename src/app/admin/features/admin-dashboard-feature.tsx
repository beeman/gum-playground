import { Card, createStyles, SimpleGrid, Text, UnstyledButton } from '@mantine/core'
import { IconUsers } from '@tabler/icons-react'
import { Link } from 'react-router-dom'
import { UiPage } from '../../ui/page'

const icons = [
  // { title: '', icon: '', color: 'blue', link: '/admin/' },
  // { title: '', icon: '', color: 'green', link: '/admin/' },
  // { title: '', icon: '', color: 'pink', link: '/admin/' },
  { title: 'Users', icon: IconUsers, color: 'orange', link: '/admin/users' },
]

const useStyles = createStyles((theme) => ({
  title: {
    fontWeight: 700,
  },

  item: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    borderRadius: theme.radius.md,
    height: 90,
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    transition: 'box-shadow 150ms ease, transform 100ms ease',

    '&:hover': {
      boxShadow: `${theme.shadows.md} !important`,
      transform: 'scale(1.02)',
    },
  },
}))

export function AdminDashboardFeature() {
  const { classes, theme } = useStyles()

  const items = icons.map((item) => (
    <UnstyledButton component={Link} to={item.link} key={item.title} className={classes.item}>
      <item.icon color={theme.colors[item.color][6]} size={32} />
      <Text size="xs" mt={7}>
        {item.title}
      </Text>
    </UnstyledButton>
  ))

  return (
    <UiPage>
      <Card withBorder radius="md">
        <SimpleGrid cols={2} mt="md">
          {items}
        </SimpleGrid>
      </Card>
    </UiPage>
  )
}

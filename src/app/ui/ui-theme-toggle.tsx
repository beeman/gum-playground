import { ActionIcon, useMantineColorScheme } from '@mantine/core'
import { IconMoonStars, IconSun } from '@tabler/icons-react'

export function UiThemeToggle() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme()

  return (
    <ActionIcon
      radius="xl"
      onClick={() => toggleColorScheme()}
      size="xl"
      variant="default"
      sx={(theme) => ({
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        color: theme.colorScheme === 'dark' ? theme.colors.brand[3] : theme.colors.brand[6],
      })}
    >
      {colorScheme === 'dark' ? <IconSun size={24} /> : <IconMoonStars size={24} />}
    </ActionIcon>
  )
}

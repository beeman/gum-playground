import { ActionIcon, useMantineColorScheme } from '@mantine/core'
import { IconMoon, IconSun } from '@tabler/icons-react'

export function UiThemeToggle() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme()

  return (
    <ActionIcon radius="xl" onClick={() => toggleColorScheme()} size="xl" variant="default">
      {colorScheme === 'dark' ? <IconSun size={24} /> : <IconMoon size={24} />}
    </ActionIcon>
  )
}

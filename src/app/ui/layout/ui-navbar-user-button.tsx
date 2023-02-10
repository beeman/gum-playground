import { Avatar, Group, Text, UnstyledButton, UnstyledButtonProps } from '@mantine/core'
import { IconChevronRight } from '@tabler/icons-react'
import { forwardRef, ReactNode } from 'react'

interface UiNavbarUserButtonProps extends UnstyledButtonProps {
  avatarUrl: string
  name: string
  email: string
  icon?: ReactNode
}

export const UiNavbarUserButton = forwardRef<HTMLButtonElement, UiNavbarUserButtonProps>(
  ({ avatarUrl, name, email, icon, ...others }: UiNavbarUserButtonProps, ref) => (
    <UnstyledButton
      ref={ref}
      sx={(theme) => ({
        display: 'block',
        width: '100%',
        padding: theme.spacing.md,
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

        '&:hover': {
          backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
        },
      })}
      {...others}
    >
      <Group>
        <Avatar src={avatarUrl} radius="xl" />

        <div style={{ flex: 1 }}>
          <Text size="sm" weight={500}>
            {name}
          </Text>

          <Text color="dimmed" size="xs">
            {email}
          </Text>
        </div>

        {icon || <IconChevronRight size={14} stroke={1.5} />}
      </Group>
    </UnstyledButton>
  ),
)

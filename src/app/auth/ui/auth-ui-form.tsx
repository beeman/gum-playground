import {
  Anchor,
  Button,
  Checkbox,
  Divider,
  Flex,
  Group,
  Paper,
  PaperProps,
  PasswordInput,
  Stack,
  Text,
  TextInput,
} from '@mantine/core'

import { useForm } from '@mantine/form'
import { upperFirst, useToggle } from '@mantine/hooks'
import { UiLogo } from '../../ui/ui-logo'
import { useAuth } from '../data-access'
import { GoogleIcon } from './google-icon'
import { GitHubButton, GoogleButton } from './social-buttons'

export function AuthUiForm(props: PaperProps) {
  const { login } = useAuth()
  const [type, toggle] = useToggle(['login', 'register'])
  const form = useForm({
    initialValues: {
      email: '',
      name: '',
      password: '',
      terms: true,
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
      password: (val) => (val.length <= 6 ? 'Password should include at least 6 characters' : null),
    },
  })

  return (
    <Paper radius="md" p="xl" withBorder {...props}>
      <Stack>
        <Flex justify="center">
          <UiLogo />
        </Flex>

        <Text size="lg" weight={500}>
          Welcome to Mantine Admin, {type} with
        </Text>
      </Stack>

      <Group grow mb="md" mt="md">
        <GoogleButton onClick={() => login({ username: '', password: '' })} radius="xl">
          Google
        </GoogleButton>

        <GitHubButton onClick={() => login({ username: '', password: '' })} radius="xl">
          GitHub
        </GitHubButton>
      </Group>

      <Divider label="Or continue with email" labelPosition="center" my="lg" />

      <form onSubmit={form.onSubmit(() => {})}>
        <Stack>
          {type === 'register' && (
            <TextInput
              label="Name"
              placeholder="Your name"
              value={form.values.name}
              onChange={(event) => form.setFieldValue('name', event.currentTarget.value)}
            />
          )}

          <TextInput
            required
            label="Email"
            placeholder="hello@mantine.dev"
            value={form.values.email}
            onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
            error={form.errors['email'] && 'Invalid email'}
          />

          <PasswordInput
            required
            label="Password"
            placeholder="Your password"
            value={form.values.password}
            onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
            error={form.errors['password'] && 'Password should include at least 6 characters'}
          />

          {type === 'register' && (
            <Checkbox
              label="I accept terms and conditions"
              checked={form.values.terms}
              onChange={(event) => form.setFieldValue('terms', event.currentTarget.checked)}
            />
          )}
        </Stack>

        <Group position="apart" mt="xl">
          <Anchor component="button" type="button" color="dimmed" onClick={() => toggle()} size="xs">
            {type === 'register' ? 'Already have an account? Login' : "Don't have an account? Register"}
          </Anchor>
          <Button type="submit">{upperFirst(type)}</Button>
        </Group>
      </form>
    </Paper>
  )
}

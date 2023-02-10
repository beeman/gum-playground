import { Button, Paper, Stack, useMantineTheme } from '@mantine/core'
import {
  formFieldCheckbox,
  formFieldInput,
  formFieldSelect,
  formFieldTextarea,
  UiForm,
  UiFormField,
} from '../../../ui/form'
import { User, userRoleOptions } from '../../../user/data-access'

export function AdminUserSettingsTab({ user, updateUser }: { user: User; updateUser: (user: Partial<User>) => void }) {
  const theme = useMantineTheme()
  // FIXME: Fetch data based on user

  const fields: UiFormField<User>[] = [
    formFieldSelect('role', { label: 'Role', options: userRoleOptions() }),
    formFieldInput('username', { label: 'Username', required: true }),
    formFieldInput('firstName', { label: 'First name' }),
    formFieldInput('lastName', { label: 'Last name' }),
    formFieldInput('phone', { label: 'Phone' }),
    formFieldInput('avatarUrl', { label: 'Avatar URL' }),
    formFieldInput('location', { label: 'Location' }),
    formFieldTextarea('bio', { label: 'Bio' }),
    formFieldCheckbox('developer', { label: 'Developer' }),
  ]

  const validate = (data: User): Record<string, string> => {
    // FIXME: Validate data
    console.log('validate', data)
    return {
      username: data?.username?.length < 3 ? 'Username must be at least 3 characters' : '',
    }
  }

  return (
    <Stack>
      <Paper withBorder radius="md" p={theme.spacing.md}>
        <UiForm<User> fields={fields} data={user} submit={updateUser} validate={validate}>
          <Button type="submit">Submit</Button>
        </UiForm>
      </Paper>
    </Stack>
  )
}

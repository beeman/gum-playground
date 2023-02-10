import { Container, Flex } from '@mantine/core'
import { AuthUiForm } from '../ui/auth-ui-form'

export function AuthFeature() {
  return (
    <Flex h="100%" align="center">
      <Container size="xs">
        <AuthUiForm />
      </Container>
    </Flex>
  )
}

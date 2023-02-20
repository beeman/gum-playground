import { Flex, Loader } from '@mantine/core'
import { MantineNumberSize } from '@mantine/styles'

export function UiLoader({ size = 'lg' }: { size?: MantineNumberSize }) {
  return (
    <Flex h="100%" justify="center" align="center">
      <Loader size={size} />
    </Flex>
  )
}

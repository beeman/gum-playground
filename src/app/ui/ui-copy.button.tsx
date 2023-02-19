import { ActionIcon, CopyButton, Tooltip } from '@mantine/core'
import { IconCheck, IconCopy } from '@tabler/icons-react'

export function UiCopyButton({ text }: { text: string }) {
  return (
    <CopyButton value={text} timeout={2000}>
      {({ copied, copy }) => (
        <Tooltip label={copied ? 'Copied' : 'Copy'} withArrow position="right">
          <ActionIcon color={copied ? 'brand' : 'gray'} onClick={copy}>
            {copied ? <IconCheck size={16} /> : <IconCopy size={16} />}
          </ActionIcon>
        </Tooltip>
      )}
    </CopyButton>
  )
}

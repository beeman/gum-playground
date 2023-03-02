import { Button, Menu } from '@mantine/core'
import { IconNetwork } from '@tabler/icons-react'
import React from 'react'
import { useSolana } from '../solana-provider'

export function UiNetworkSwitcher() {
  const { network, networks, setNetwork } = useSolana()
  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <Button radius="xl" size="md" variant="default">
          {network.name}
        </Button>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Clusters</Menu.Label>
        {networks.map((item) => (
          <Menu.Item
            key={item.id}
            icon={<IconNetwork size={14} />}
            onClick={() => setNetwork(item)}
            disabled={item.id === network.id}
          >
            {item.name}
          </Menu.Item>
        ))}
      </Menu.Dropdown>
    </Menu>
  )
}

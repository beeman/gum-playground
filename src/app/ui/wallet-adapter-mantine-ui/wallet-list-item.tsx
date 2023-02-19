import { NavLink, Text } from '@mantine/core'
import { WalletReadyState } from '@solana/wallet-adapter-base'
import type { Wallet } from '@solana/wallet-adapter-react'
import type { FC, MouseEventHandler } from 'react'
import React from 'react'
import { WalletIcon } from './wallet-icon'

export interface WalletListItemProps {
  handleClick: MouseEventHandler<HTMLButtonElement>
  tabIndex?: number
  wallet: Wallet
}

export const WalletListItem: FC<WalletListItemProps> = ({ handleClick, tabIndex, wallet }) => {
  return (
    <NavLink
      sx={{ height: 48, borderRadius: 50 }}
      label={<Text size="lg">{wallet.adapter.name}</Text>}
      icon={<WalletIcon wallet={wallet} />}
      rightSection={wallet.readyState === WalletReadyState.Installed && <span>Detected</span>}
      variant="filled"
      onClick={(event: any) => handleClick(event)}
    />
  )
}

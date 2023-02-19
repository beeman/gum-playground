import { ButtonProps } from '@mantine/core'
import type { MouseEvent, PropsWithChildren } from 'react'
import React from 'react'

export type WalletButtonProps = PropsWithChildren<
  ButtonProps & {
    onClick?: (e: MouseEvent<HTMLButtonElement>) => void
  }
>

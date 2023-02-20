import { Box, Title } from '@mantine/core'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { useSolana } from '../solana-provider'
import { UiCard } from '../ui/ui-card'

import { UiLoader } from '../ui/ui-loader'
import { GumApp } from './gum-app'
import { GumAppProvider, useGumSDK } from './use-gum-app'

export function GumFeature() {
  const wallet = useWallet()
  const { network } = useSolana()
  const { connection } = useConnection()

  const sdk = useGumSDK(connection, { commitment: 'confirmed' }, network)

  if (wallet.connecting) {
    return (
      <UiCard>
        <Box py={'lg'}>
          <UiLoader />
        </Box>
        <Title align="center" order={2}></Title>
      </UiCard>
    )
  }

  if (!wallet.connected || !wallet?.publicKey) {
    return (
      <UiCard>
        <Title align="center" order={2}>
          Connect your wallet to continue
        </Title>
      </UiCard>
    )
  }

  if (!sdk) {
    return (
      <UiCard>
        <Title align="center" order={2}>
          Loading Gum App...
        </Title>
      </UiCard>
    )
  }

  return (
    <GumAppProvider owner={wallet.publicKey} sdk={sdk}>
      <GumApp />
    </GumAppProvider>
  )
}

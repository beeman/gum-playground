import { Box } from '@mantine/core'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'

import { UiLoader } from '../ui/ui-loader'
import { GumApp } from './gum-app'
import { GumAppProvider, useGumSDK } from './lib/use-gum-app'

export function GumFeature() {
  const wallet = useWallet()
  const { connection } = useConnection()
  const sdk = useGumSDK(connection, { commitment: 'confirmed' }, 'devnet')

  return (
    <Box>
      {wallet?.publicKey && sdk ? (
        <GumAppProvider owner={wallet.publicKey} sdk={sdk}>
          <GumApp />
        </GumAppProvider>
      ) : (
        <UiLoader />
      )}
    </Box>
  )
}

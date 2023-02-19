import { WalletAdapterNetwork } from '@solana/wallet-adapter-base'
import { ConnectionProvider, WalletProvider as SolanaWalletProvider } from '@solana/wallet-adapter-react'

import { PhantomWalletAdapter, SolflareWalletAdapter } from '@solana/wallet-adapter-wallets'
import { createContext, ReactNode, useContext, useMemo } from 'react'
import { WalletModalProvider } from './ui/wallet-adapter-mantine-ui/wallet-modal-provider'

export interface SolanaProviderContext {
  network: WalletAdapterNetwork
  endpoint: string
}

const SolanaContext = createContext<SolanaProviderContext>({} as SolanaProviderContext)

export function SolanaProvider({
  children,
  endpoint,
  network,
}: {
  children: ReactNode
  endpoint: string
  network: WalletAdapterNetwork
}) {
  const wallets = useMemo(
    () => [
      //
      new SolflareWalletAdapter({ network }),
      new PhantomWalletAdapter({ network }),
    ],
    [network],
  )

  const value: SolanaProviderContext = {
    network,
    endpoint,
  }

  return (
    <SolanaContext.Provider value={value}>
      <ConnectionProvider endpoint={endpoint}>
        <SolanaWalletProvider wallets={wallets} autoConnect>
          <WalletModalProvider>{children}</WalletModalProvider>
        </SolanaWalletProvider>
      </ConnectionProvider>
    </SolanaContext.Provider>
  )
}

export const useSolana = () => useContext(SolanaContext)

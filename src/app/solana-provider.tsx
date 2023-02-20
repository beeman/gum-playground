import { Adapter, WalletAdapterNetwork } from '@solana/wallet-adapter-base'
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react'
import { createContext, ReactNode, useContext } from 'react'
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
  wallets = [],
}: {
  children: ReactNode
  endpoint: string
  network: WalletAdapterNetwork
  wallets?: Adapter[]
}) {
  const value: SolanaProviderContext = {
    network,
    endpoint,
  }

  return (
    <SolanaContext.Provider value={value}>
      <ConnectionProvider endpoint={endpoint}>
        <WalletProvider wallets={wallets} autoConnect>
          <WalletModalProvider>{children}</WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </SolanaContext.Provider>
  )
}

export const useSolana = () => useContext(SolanaContext)

import { WalletAdapterNetwork } from '@solana/wallet-adapter-base'
import { PhantomWalletAdapter, SolflareWalletAdapter } from '@solana/wallet-adapter-wallets'
import { clusterApiUrl } from '@solana/web3.js'
import { useMemo } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { AppRoutes } from './app-routes'
import { AppShell } from './app-shell'
import { SolanaProvider } from './solana-provider'

export function App() {
  const network = WalletAdapterNetwork.Devnet
  const endpoint = clusterApiUrl(network)
  const wallets = useMemo(
    () => [
      // Add more wallets here
      new SolflareWalletAdapter({ network }),
      new PhantomWalletAdapter({ network }),
    ],
    [network],
  )

  return (
    <BrowserRouter>
      <AppShell>
        <SolanaProvider endpoint={endpoint} network={network} wallets={wallets}>
          <AppRoutes />
        </SolanaProvider>
      </AppShell>
    </BrowserRouter>
  )
}

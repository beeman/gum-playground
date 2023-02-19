import { WalletAdapterNetwork } from '@solana/wallet-adapter-base'
import { clusterApiUrl } from '@solana/web3.js'
import { BrowserRouter } from 'react-router-dom'
import { AppRoutes } from './app-routes'
import { AppShell } from './app-shell'
import { SolanaProvider } from './solana-wrapper'

export function App() {
  return (
    <BrowserRouter>
      <AppShell>
        <SolanaProvider network={WalletAdapterNetwork.Devnet} endpoint={clusterApiUrl('devnet')}>
          <AppRoutes />
        </SolanaProvider>
      </AppShell>
    </BrowserRouter>
  )
}

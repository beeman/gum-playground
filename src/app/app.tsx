import { WalletAdapterNetwork } from '@solana/wallet-adapter-base'
import { BrowserRouter } from 'react-router-dom'
import { AppRoutes } from './app-routes'
import { AppShell } from './app-shell'
import { SolanaProvider } from './solana-provider'

export function App() {
  return (
    <BrowserRouter>
      <AppShell>
        <SolanaProvider
          networks={[
            {
              id: WalletAdapterNetwork.Devnet,
              name: 'Devnet',
              endpoint: 'https://rpc-devnet.helius.xyz/?api-key=2a88ca2b-67c0-44c7-b2b6-1f7851af671f',
            },
            {
              id: WalletAdapterNetwork.Mainnet,
              name: 'Mainnet',
              endpoint: 'https://rpc.helius.xyz/?api-key=2a88ca2b-67c0-44c7-b2b6-1f7851af671f',
            },
          ]}
        >
          <AppRoutes />
        </SolanaProvider>
      </AppShell>
    </BrowserRouter>
  )
}

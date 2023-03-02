import { Anchor, AnchorProps, Flex } from '@mantine/core'
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base'
import { PublicKey } from '@solana/web3.js'
import { useSolana } from '../solana-provider'
import { UiCopyButton } from './ui-copy.button'

export function ellipsify(str = '', len = 4) {
  if (str.length > 30) {
    return str.substring(0, len) + '..' + str.substring(str.length - len, str.length)
  }
  return str
}

const prefix = 'https://solscan.io'

export function LinkAccount(
  props: AnchorProps & {
    address: string | PublicKey
    ellipsis?: boolean
    label?: string
  },
) {
  const { ellipsis = true } = props
  let { address, label } = props
  address = typeof address === 'string' ? address : address.toBase58()

  label = label ? label : ellipsis ? ellipsify(address, 8) : address

  return <LinkExplorer value={address} path={`${prefix}/account/${address}`} label={label} />
}

export function LinkExplorer({ label, path, value }: { label?: string; path: string; value: string | number }) {
  const { network } = useSolana()
  const clusterSuffix = network.id === WalletAdapterNetwork.Mainnet ? '' : `?cluster=${network.id?.toLowerCase()}`
  return (
    <Flex align="center">
      <UiCopyButton text={value.toString()} />
      <Anchor href={`${path}${clusterSuffix}`} sx={{ overflowWrap: 'anywhere' }} ff="monospace" fz="sm" ml={4}>
        {label ?? path}
      </Anchor>
    </Flex>
  )
}

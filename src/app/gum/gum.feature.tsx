import { Group, Paper, Stack, Title } from '@mantine/core'

import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { PublicKey } from '@solana/web3.js'
import { IconCandy } from '@tabler/icons-react'
import { useEffect, useState } from 'react'
import { UiDebug } from '../ui/ui-debug'
import { UiLoader } from '../ui/ui-loader'
import { GumPostList } from './gum-post-components'
import { getStructuredData, gumGetOwnerData, GumOwnerData, GumUser, useGumSDK } from './gum-sdk'

import { GumUserList } from './gum-user.create'

export function GumFeature() {
  const wallet = useWallet()
  const { connection } = useConnection()

  const [account, setAccount] = useState<GumOwnerData | undefined>(undefined)
  const sdk = useGumSDK(connection, { commitment: 'confirmed' }, 'devnet')

  useEffect(() => {
    if (!wallet.connected || !sdk) return

    gumGetOwnerData(wallet.publicKey as PublicKey, sdk).then((account) => {
      setAccount(account)
    })
  }, [wallet.connected, sdk])

  const structured = account ? getStructuredData(account) : undefined

  return (
    <Stack spacing="xl">
      <Paper withBorder sx={{ borderWidth: 4 }} radius="xl" p="xl">
        <Title>
          <Group>
            <IconCandy size={32} color={'pink'} /> Gum
          </Group>
        </Title>
      </Paper>
      {account && sdk ? (
        <>
          <GumUserList
            owner={wallet.publicKey as PublicKey}
            sdk={sdk}
            users={account?.usersList}
            profiles={account?.profilesList}
            metaUrl={'metaUrl'}
          />
          {account.usersList.length ? (
            <GumPostList owner={wallet.publicKey as PublicKey} sdk={sdk} posts={account?.postsList} />
          ) : null}
        </>
      ) : (
        <UiLoader />
      )}

      <UiDebug
        data={{
          structured,
          posts: account?.postsList,
          // profilesList: account?.profilesList,
          // profileMetadataList: account?.profileMetadataList,
          // usersList: account?.usersList,
        }}
      />
    </Stack>
  )
}

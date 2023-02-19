import { SDK, useCreatePost } from '@gumhq/react-sdk'
import { Box, Button, Group, Paper, Stack, Title } from '@mantine/core'

import { PublicKey } from '@solana/web3.js'
import React from 'react'
import { UiError } from '../ui/ui-error'
import { LinkAccount } from '../ui/ui-link-explorer'
import { GumSDKPost } from './gum-interfaces'

export interface GumCreatePostProps {
  sdk: SDK
  publicKey: PublicKey
}

export function GumPostComponents({ sdk, publicKey }: GumCreatePostProps) {
  const { create, loading, error } = useCreatePost(sdk)

  if (error) {
    console.error(error)
    return <UiError error={error} />
  }

  return (
    <Button
      size="lg"
      radius="xl"
      loading={loading}
      onClick={(event: any) => {
        event.preventDefault()
        // create(publicKey)
      }}
    >
      Create Post
    </Button>
  )
}
export function GumPostList({ posts, owner, sdk }: { posts: GumSDKPost[]; owner: PublicKey; sdk: SDK }) {
  return (
    <Paper withBorder sx={{ borderWidth: 4 }} radius="xl" p="xl">
      <Stack>
        <Group position="apart">
          <Title order={2}>Posts</Title>
          <GumPostComponents sdk={sdk} publicKey={owner} />
        </Group>
        {posts?.map((post) => (
          <Box key={post.publicKey.toString()}>
            <LinkAccount address={post?.publicKey.toBase58()} />
          </Box>
        ))}
      </Stack>
    </Paper>
  )
}

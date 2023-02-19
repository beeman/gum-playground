import { Box, Button, Group, Modal, Paper, Stack, Title, Tooltip } from '@mantine/core'

import { SDK, useCreateUser, useProfile, useUser } from '@gumhq/react-sdk'
import { PublicKey } from '@solana/web3.js'
import React, { useState } from 'react'
import { UiDebug, UiDebugModal } from '../ui/ui-debug'
import { UiError } from '../ui/ui-error'
import { ellipsify, LinkAccount } from '../ui/ui-link-explorer'
import { showNotificationError, showNotificationSuccess } from '../ui/ui-notifications'
import { GumSDKProfile, GumSDKUser } from './gum-interfaces'
import { CreateUserProfile, GumProfileTypeIcon, GumProfileTypeLabel } from './gum-profile-components'

export function GumUserCreate({ sdk, owner }: { sdk: SDK; owner: PublicKey }) {
  const { create, loading, error } = useCreateUser(sdk)

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
        create(owner)
      }}
    >
      Create User
    </Button>
  )
}

export function GumUserDelete({ sdk, owner, userAccount }: { sdk: SDK; owner: PublicKey; userAccount: PublicKey }) {
  const loading = false
  // if (error) {
  //   console.error(error)
  //   return <UiError error={error} />
  // }

  return (
    <Button
      size="xs"
      color="red"
      radius="xl"
      variant={loading ? 'filled' : 'outline'}
      // loading={loading}
      onClick={(event: any) => {
        event.preventDefault()
        console.log(`userAccount, owner`, userAccount.toString(), owner.toString())
        sdk.user
          .delete(userAccount, owner)
          .rpc()
          .then(() => {
            showNotificationSuccess('User Deleted')
          })
          .catch((err) => {
            console.log(`err`, err)
            showNotificationError('User Deletion Failed')
          })
      }}
    >
      Delete User
    </Button>
  )
}

export function GumUserList({
  users,
  profiles,
  owner,
  sdk,
  metaUrl,
}: {
  users: GumSDKUser[]
  profiles: GumSDKProfile[]
  owner: PublicKey
  sdk: SDK
  metaUrl: string
}) {
  console.log(`users`, users)
  return (
    <Paper withBorder sx={{ borderWidth: 4 }} radius="xl" p="xl">
      <Stack>
        <Group position="apart">
          <Title order={2}>Users</Title>
          <GumUserCreate sdk={sdk} owner={owner} />
        </Group>
        {users?.map((user) => (
          <GumUserItem
            key={user?.publicKey?.toString()}
            user={user}
            owner={owner}
            sdk={sdk}
            metaUrl={metaUrl}
            profiles={profiles.filter((profile) => profile?.account?.user?.toString() === user?.publicKey?.toString())}
          />
        ))}
      </Stack>
    </Paper>
  )
}
export function GumUserItem({
  user,
  sdk,
  owner,
  metaUrl,
  profiles,
}: {
  user: GumSDKUser
  sdk: SDK
  owner: PublicKey
  metaUrl: string
  profiles: GumSDKProfile[]
}) {
  return (
    <Box>
      <Stack>
        <Title order={3}>Account</Title>
        <Group position="apart">
          <GumUserDetailModal user={user} sdk={sdk} />
          <Stack>
            <Group>
              <LinkAccount address={user?.publicKey} ellipsis />
              <UiDebugModal data={{ user }} />
            </Group>
            <Group position="right">
              <GumUserDelete sdk={sdk} owner={owner} userAccount={user?.publicKey} />
            </Group>
          </Stack>
        </Group>
        {profiles.length ? <Title order={4}>Your profiles</Title> : <Title order={4}>You have no profiles</Title>}
        {profiles.map((profile) => (
          <GumProfileItem key={profile.publicKey.toString()} profile={profile} sdk={sdk} user={user} owner={owner} />
        ))}
        <CreateUserProfile profiles={profiles} sdk={sdk} owner={owner} userAccount={user.publicKey} metaUrl={metaUrl} />
        {/* <UiDebug data={profiles} />*/}
      </Stack>
    </Box>
  )
}

export function GumProfileItem({
  profile,
  sdk,
  owner,
  user,
}: {
  profile: GumSDKProfile
  sdk: SDK
  user: GumSDKUser
  owner: PublicKey
}) {
  return (
    <Box py="md">
      <Group position="apart">
        <Stack>
          <Group>
            <GumProfileTypeIcon type={Object.keys(profile.account.namespace)[0] as string} size={32} />
            <GumProfileTypeLabel type={Object.keys(profile.account.namespace)[0] as string} />
          </Group>
          <GumProfileDetailModal profile={profile} sdk={sdk} />
        </Stack>
        <Stack>
          <Group>
            <LinkAccount ellipsis address={profile?.publicKey} />
            <UiDebugModal data={{ profile }} />
          </Group>
          <Group position="right">
            <Button
              size="xs"
              color="brand"
              radius="xl"
              variant="outline"
              onClick={() => {
                console.log(`Create Post`)
                sdk.post
                  .create(
                    'https://jzhsx6pb6yqy7rsq3wm6kmgk7bpgixy5yymmzdk4b5go6wuie5vq.arweave.net/Tk8r-eH2IY_GUN2Z5TDK-F5kXx3GGMyNXA9M71qIJ2s',
                    profile.publicKey,
                    user.publicKey,
                    owner,
                  )
                  .then((rpc) => {
                    rpc.instructionMethodBuilder
                      .rpc()
                      .then((createPost) => {
                        console.log('createPost', createPost)

                        return createPost
                      })
                      .then(() => {
                        showNotificationSuccess('Post created')
                        console.log('created post')
                      })
                  })
              }}
            >
              Create Post
            </Button>
            <Button
              size="xs"
              color="red"
              radius="xl"
              variant="outline"
              onClick={() => {
                console.log(`delete profile`, sdk.profile)
                if (!window.confirm('Are you sure you want to delete this profile?')) return
                sdk.profile
                  .delete(profile.publicKey, user.publicKey, owner)
                  .rpc()
                  .then((deleteProfile) => {
                    console.log('deleteProfile', deleteProfile)

                    return deleteProfile
                  })
                  .then(() => {
                    showNotificationSuccess('Profile deleted')
                    console.log('deleted profile')
                  })
              }}
            >
              Delete Profile
            </Button>
          </Group>
        </Stack>
      </Group>
    </Box>
  )
}

export function GumUserDetailModal({ user, sdk }: { user: GumSDKUser; sdk: SDK }) {
  const [opened, setOpened] = useState(false)

  return (
    <>
      <Modal opened={opened} onClose={() => setOpened(false)} title={user.publicKey.toString() ?? ''} centered>
        <GumUserDetail user={user} sdk={sdk} />
        <UiDebug data={{ user }} open={opened} hideButton />
      </Modal>

      <Tooltip label={`Show debug data`}>
        <Button radius="xl" onClick={() => setOpened(true)}>
          {ellipsify(user.publicKey.toString(), 8)}
        </Button>
      </Tooltip>
    </>
  )
}

export function GumUserDetail(props: { user: GumSDKUser; sdk: SDK }) {
  console.log('user', props?.user)
  const { user, loading, error } = useUser(props.sdk, props.user.publicKey)
  return (
    <Stack>
      <Title order={3}>Account</Title>
      <UiDebug data={{ user, loading, error }} open />
      {/*<Group position="apart">*/}
      {/*  <GumUserDetailModal user={user} />*/}
      {/*  <Group>*/}
      {/*    <LinkAccount address={user?.publicKey} ellipsis />*/}
      {/*    <UiDebugModal data={{ user }} />*/}
      {/*    /!*<GumUserDelete sdk={sdk} owner={owner} userAccount={user?.publicKey} />*!/*/}
      {/*  </Group>*/}
      {/*</Group>*/}
    </Stack>
  )
}

export function GumProfileDetailModal({ profile, sdk }: { profile: GumSDKProfile; sdk: SDK }) {
  const [opened, setOpened] = useState(false)

  return (
    <>
      <Modal opened={opened} onClose={() => setOpened(false)} title={profile.publicKey.toString() ?? ''} centered>
        <GumProfileDetail profile={profile} sdk={sdk} />
        <UiDebug data={{ profile }} open={opened} hideButton />
      </Modal>

      <Tooltip label={`Show debug data`}>
        <Button radius="xl" onClick={() => setOpened(true)}>
          {ellipsify(profile.publicKey.toString(), 8)}
        </Button>
      </Tooltip>
    </>
  )
}

export function GumProfileDetail(props: { profile: GumSDKProfile; sdk: SDK }) {
  console.log('profile', props?.profile)
  const { profile, loading, error } = useProfile(props.sdk, props.profile.publicKey)
  return (
    <Stack>
      <Title order={3}>Account</Title>
      <UiDebug data={{ profile, loading, error }} open />
      {/*<Group position="apart">*/}
      {/*  <GumProfileDetailModal profile={profile} />*/}
      {/*  <Group>*/}
      {/*    <LinkAccount address={profile?.publicKey} ellipsis />*/}
      {/*    <UiDebugModal data={{ profile }} />*/}
      {/*    /!*<GumProfileDelete sdk={sdk} owner={owner} profileAccount={profile?.publicKey} />*!/*/}
      {/*  </Group>*/}
      {/*</Group>*/}
    </Stack>
  )
}

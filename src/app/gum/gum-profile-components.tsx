import { SDK, useCreateProfile } from '@gumhq/react-sdk'
import { Box, Button, Stack, useMantineTheme } from '@mantine/core'
import { PublicKey } from '@solana/web3.js'
import { IconBuildingBank, IconDeviceGamepad, IconPigMoney, IconQuestionMark, IconUser } from '@tabler/icons-react'
import React, { useState } from 'react'
import { showNotificationError, showNotificationSuccess } from '../ui/ui-notifications'
import { GumSDKProfile } from './gum-interfaces'

export type Namespace = 'Professional' | 'Personal' | 'Gaming' | 'Degen'
export const profileTypes = ['Personal', 'Professional', 'Gaming', 'Degen'] as const

export interface GumProfileInput {
  metadataUri: string
  namespace: Namespace
  userAccount: PublicKey
  owner: PublicKey
}

export function CreateUserProfile(props: {
  metaUrl: string
  owner: PublicKey
  sdk: SDK
  userAccount: PublicKey
  profiles: GumSDKProfile[]
}) {
  const sdk = props.sdk
  const { create, profilePDA, error, loading } = useCreateProfile(sdk)
  const [profileInput, setProfileInput] = useState<GumProfileInput>({
    owner: props.owner,
    namespace: 'Personal',
    userAccount: props.userAccount,
    metadataUri: props.metaUrl,
  })

  const availableProfiles = profileTypes.filter((type) => {
    return !props.profiles.find(
      (profile) => Object.keys(profile.account.namespace)[0]?.toString().toLowerCase() === type.toLowerCase(),
    )
  })

  const createProfile = async (input: {
    owner: PublicKey
    userAccount: PublicKey
    namespace: Namespace
    metadataUri: string
  }) => {
    try {
      create(input.metadataUri, input.namespace, input.userAccount, input.owner)
        .then((res) => {
          showNotificationSuccess('Profile Created')
        })
        .catch((err) => {
          showNotificationError('Profile Creation Failed')
          console.log('err', err)
        })
    } catch (error) {
      console.log('error', error)
    }
  }

  if (!availableProfiles.length) return null
  return (
    <Stack>
      {availableProfiles.map((type) => (
        <Box key={type}>
          <Button
            size="lg"
            radius="xl"
            variant="light"
            onClick={() => {
              const updated = { ...profileInput, namespace: type }
              setProfileInput(updated)
              createProfile(updated)
            }}
            color="brand"
            leftIcon={<GumProfileTypeIcon type={type} size={32} />}
          >
            Create {type} Profile
          </Button>
        </Box>
      ))}
      {/*<UiDebugModal data={{ input: profileInput, profilePDA, error, loading }} />*/}
    </Stack>
  )
}

export function GumProfileTypeColor({ type }: { type: Namespace | string }): string {
  switch (type.toLowerCase()) {
    case 'professional':
      return 'blue'
    case 'personal':
      return 'green'
    case 'gaming':
      return 'yellow'
    case 'degen':
      return 'red'
    default:
      return 'gray'
  }
}
export function GumProfileTypeIcon({ size = 16, type }: { size?: number; type: Namespace | string }) {
  const theme = useMantineTheme()
  const color = theme.colors[GumProfileTypeColor({ type })][6]
  switch (type.toLowerCase()) {
    case 'professional':
      return <IconBuildingBank size={size} color={color} />
    case 'personal':
      return <IconUser size={size} color={color} />
    case 'gaming':
      return <IconDeviceGamepad size={size} color={color} />
    case 'degen':
      return <IconPigMoney size={size} color={color} />
    default:
      return <IconQuestionMark size={size} color={color} />
  }
  return null
}

export function GumProfileTypeLabel({ type }: { type: Namespace | string }) {
  return <>{`${profileTypes.find((t) => t.toLowerCase() === type.toLowerCase()) || type}`}</>
}

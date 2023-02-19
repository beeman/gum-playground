import { SDK, useGum } from '@gumhq/react-sdk'
import { AnchorWallet, useAnchorWallet } from '@solana/wallet-adapter-react'
import { Cluster, ConfirmOptions, Connection, PublicKey } from '@solana/web3.js'
import { GumOwnerData, GumSDKUser } from './gum-interfaces'

export * from './gum-interfaces'

export const useGumSDK = (connection: Connection, opts: ConfirmOptions, cluster: Cluster) => {
  const anchorWallet = useAnchorWallet() as AnchorWallet

  const sdk = useGum(anchorWallet, connection, opts, cluster)

  return sdk
}

export async function gumGetOwnerData(owner: PublicKey, sdk: SDK): Promise<GumOwnerData> {
  const [profileMetadataList, profilesList, usersList, postsList] = await Promise.all([
    sdk.profileMetadata.getProfileMetadataAccountsByUser(owner),
    sdk.profile.getProfileAccountsByUser(owner),
    sdk.user.getUserAccountsByUser(owner),
    sdk.post.getPostAccountsByUser(owner),
  ])

  return {
    profileMetadataList: profileMetadataList.flat(),
    profilesList,
    usersList: usersList as GumSDKUser[],
    postsList,
  }
}

interface GumProfileMeta {
  metadataUri: string
  publicKey: PublicKey
}

interface GumPost {
  metadataUri: string
  publicKey: PublicKey
  replyTo: PublicKey
}

interface GumProfile {
  name: string
  publicKey: PublicKey
  metadata?: GumProfileMeta[]
  posts?: GumPost[]
}

export interface GumUser {
  owner: PublicKey
  publicKey: PublicKey
  profiles?: GumProfile[]
}

export function getStructuredData(account: GumOwnerData): GumUser[] {
  return account?.usersList.map((user) => ({
    owner: user.account.authority,
    publicKey: user.publicKey,
    profiles: account?.profilesList
      .filter((profile) => profile.account.user.equals(user.publicKey))
      .map((profile) => ({
        name: Object.keys(profile?.account?.namespace)[0].toString(),
        publicKey: profile.publicKey,
        metadata: account?.profileMetadataList
          .filter((metadata) => metadata?.account?.profile.equals(profile.publicKey))
          .map((item) => ({
            metadataUri: item.account.metadataUri,
            publicKey: item.account.profile,
          })),
        posts: account.postsList
          .filter((post) => post.account.profile.equals(profile.publicKey))
          .map((post) => ({
            metadataUri: post.account.metadataUri,
            publicKey: post.publicKey,
            replyTo: post.account.replyTo,
          })),
      })),
  }))
}

import { PublicKey } from '@solana/web3.js'

export interface GumOwnerData {
  profileMetadataList: GumSDKProfileMeta[]
  profilesList: GumSDKProfile[]
  usersList: GumSDKUser[]
  postsList: GumSDKPost[]
}

export interface GumSDKProfile {
  publicKey: PublicKey
  account: {
    user: PublicKey
    namespace: {
      [key: string]: any
    }
  }
}
export interface GumSDKPost {
  publicKey: PublicKey
  account: {
    profile: PublicKey
    metadataUri: string
    replyTo: PublicKey
  }
}
export interface GumSDKProfileMeta {
  publicKey: PublicKey
  account: {
    profile: PublicKey
    metadataUri: string
  }
}
export interface GumSDKUser {
  publicKey: PublicKey
  account: {
    authority: PublicKey
    randomHash: number[]
  }
}

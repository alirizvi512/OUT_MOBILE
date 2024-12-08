export interface IProfile {
    id: number;
    outId?: string;
    handle: string;
    displayName: string;
    profilePic: string;
    coverPic: string;
    socialLinkDiscord: string;
    socialLinkTelegram: string;
    socialLinkTwitter: string;
    socialLinkInstagram: string;
    followCheck: number;
    bio: string;
    isInfluencer: boolean;
    isOutAdmin: number;
    dmAllowIncoming: number;
    amountFollowers: number;
    amountFollowing: number;
    earnedFees: number;
    referralLinks: any[];
    refLink: string;
    auth0id: string;
    iAmBlocked: number;
    iMutedThisProfile: number;
    iBlockedThisProfile: number;
    twitterConnectionFound: number;
    userState: number;
    trollName: string;
    trollColor: string;
    followsMe: number;
    portfolioValue: number;
    holdersCount: number;
    holdingCount: number;
    referralWallet: string;
    wallets: UserWallet[];
    walletsTotal: UserWallet[];
    bullbear: number;
    myHoldingAmount: number;
    profileMerged: number;
    iAmBotBlocked: number;
    postToTwitterDefault: number;
    iAmTimedOut: number;
    logRocketMonitoring: number;
    homefeedSetting: number;
    website: string;
    socialLinkWebsite: string;
    referralHandle: string;
    reflinkBlocked: number;
    themeSetting: number;
    gccActivated: number;
}

export interface UserWallet {
    evm_address: string;
    inj_address: string;
    wallet_client_type: string;
    chain_type: string;
}

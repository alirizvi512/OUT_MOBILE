export interface IGCCHoldings {
    subject: Subject
    tokens: bigint
    solPaid: bigint
    subjectAddress: string
    tokens_onmarket: bigint
}

export interface Subject {
    outId: number
    handle: string
    displayName: string
    profilePic: string
    followCheck: number
    followsMe: number
    referralHandle: string
}

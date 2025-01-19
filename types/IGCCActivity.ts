export interface IGCCActivity {
    subject: Subject
    solPaid: bigint
    tokenAmount: bigint
    timestamp: number
    isBuy: boolean
    id: number
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
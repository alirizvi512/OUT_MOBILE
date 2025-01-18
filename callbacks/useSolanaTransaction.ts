import { SOLANA_RPC_URL } from "@/constants/Privy";
import { useCallback, useEffect, useState } from "react";
import {
    Connection,
    PublicKey,
} from "@solana/web3.js";
import {
    useEmbeddedSolanaWallet,
    usePrivy,
} from '@privy-io/expo';

export interface IWallet { balance: number, address: string }

const useSolanaTransaction = () => {
    const { } = usePrivy();
    const { wallets } = useEmbeddedSolanaWallet()
    const [selectedWallet, setSelectedWallet] = useState<IWallet>();
    const [localWallets, setLocalWallets] = useState<IWallet[]>([]);
    const connection = new Connection(SOLANA_RPC_URL, "confirmed");

    useEffect(() => {
        init();
    }, [wallets]);

    const init = async () => {
        if (wallets && wallets.length > 0) {
            for (let index = 0; index < wallets.length; index++) {
                let obj: IWallet = {
                    address: wallets[index].address,
                    balance: 0
                };
                obj.balance = await getSolBalance(wallets[index].address) || 0;
                setLocalWallets([obj]);
                setSelectedWallet({
                    address: wallets[index].address,
                    balance: await getSolBalance(wallets[index].address) || 0
                })
            }
        }
    }

    const getSolBalance = useCallback(async (address: string) => {
        if (address) {
            const balance = await connection.getBalance(
                new PublicKey(address)
            );
            return balance / 1e9;
        }
    }, [connection]);

    return {
        getSolBalance,
        localWallets,
        selectedWallet
    }
}

export default useSolanaTransaction;
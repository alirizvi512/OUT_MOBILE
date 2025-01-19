import { SOLANA_RPC_URL } from "@/constants/Privy";
import { useCallback, useEffect, useState } from "react";
import {
    Connection,
    LAMPORTS_PER_SOL,
    PublicKey,
    SystemProgram,
    Transaction,
} from "@solana/web3.js";
import {
    useEmbeddedSolanaWallet,
} from '@privy-io/expo';

export interface IWallet { balance: number, address: string }

const useSolanaTransaction = () => {
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

    const withdraw = useCallback(async (receiverAddress: string, amount: number) => {
        if (!selectedWallet) return;
        const receiver = new PublicKey(receiverAddress);

        const transaction = new Transaction().add(
            SystemProgram.transfer({
                fromPubkey: new PublicKey(selectedWallet.address),
                toPubkey: receiver,
                lamports: amount,
            })
        );

        return transaction;
    }, [connection, selectedWallet])

    const getWithdrawFeeCalculator = useCallback(
        async (transaction: Transaction, address: string) => {
            const walletAddress = new PublicKey(address);
            const { blockhash } = await connection.getLatestBlockhash();
            transaction.recentBlockhash = blockhash;
            transaction.feePayer = walletAddress
            const fee = await transaction.getEstimatedFee(connection);
            return fromLamports(BigInt(fee || 0));
        }, [connection]
    );

    const validateSolanaAddress = (address: string): boolean => {
        try {
            new PublicKey(address);
            return true;
        } catch (error) {
            return false;
        }
    };

    const fromLamports = (amount: bigint) => {
        return Number(amount) / Number(LAMPORTS_PER_SOL);
    };

    return {
        getSolBalance,
        localWallets,
        selectedWallet,
        withdraw,
        getWithdrawFeeCalculator,
        validateSolanaAddress,
        fromLamports
    }
}

export default useSolanaTransaction;
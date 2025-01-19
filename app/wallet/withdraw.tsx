import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    Image,
    TextInput,
    ScrollView
} from 'react-native';
import { router } from 'expo-router';
import useSolanaTransaction from '@/callbacks/useSolanaTransaction';
import { Ionicons } from '@expo/vector-icons';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';
import BigNumber from "bignumber.js";

export default function WithdrawScreen() {
    const { selectedWallet, withdraw, getWithdrawFeeCalculator, validateSolanaAddress } = useSolanaTransaction();

    const [displayAmount, setDisplayAmount] = useState("");
    const [estimatedFee, setEstimatedFee] = useState<number>(0);
    const [validAddress, setValidAddress] = useState<boolean>(false);
    const [submittedAddress, setSubmittedAddress] = useState<string>("");

    useEffect(() => {
        if (selectedWallet) {
            calculateGasFee()
        }
    }, [selectedWallet])

    useEffect(() => {
        if (submittedAddress && submittedAddress.length > 0) {
            const init = async () => {
                const validity = await validateSolanaAddress(submittedAddress);
                setValidAddress(validity);
            }
            init();
        }
    }, [submittedAddress])

    const addInput = (value: string) => {
        let localDisplayAmount = displayAmount
        // Validate input: Allow digits or a single '.'
        if (!/^[0-9.]$/.test(value)) {
            console.warn("Invalid input:", value);
            return;
        }

        // Prevent multiple decimals
        if (value === "." && localDisplayAmount.includes(".")) {
            console.warn("Decimal point already exists.");
            return;
        }

        // Append number or decimal
        if (value === "0" && localDisplayAmount === "0") {
            // Avoid leading multiple zeros
            return;
        } else if (value === "." && localDisplayAmount === "") {
            // Start with '0' when '.' is the first input
            localDisplayAmount = "0.";
        } else {
            localDisplayAmount += value;
        }

        // Ensure valid format (e.g., no leading zeros unless '0.')
        if (localDisplayAmount.startsWith("0") && !localDisplayAmount.startsWith("0.")) {
            localDisplayAmount = localDisplayAmount.replace(/^0+/, "0");
        }
        setDisplayAmount(localDisplayAmount);
    }

    const handleClear = () => {
        setDisplayAmount((prevDisplay) => {
            // Remove the last character
            let newDisplay = prevDisplay.slice(0, -1) || "0";

            // Check if the last character is a decimal point, remove it if so
            if (newDisplay.endsWith(".")) {
                newDisplay = newDisplay.slice(0, -1); // Remove the decimal point
            }

            return newDisplay;
        });
    };

    const calculateGasFee = async () => {
        if (selectedWallet && selectedWallet.address) {
            const transaction = await withdraw(
                selectedWallet.address.toString(),
                LAMPORTS_PER_SOL
            );
            if (transaction) {
                const fee = await getWithdrawFeeCalculator(transaction, selectedWallet.address.toString());
                setEstimatedFee(fee);
            }
        }
    }

    const selectMaxAmount = async () => {
        if (selectedWallet) {
            const balanceBN = new BigNumber(selectedWallet.balance);
            const estimatedFeeBN = new BigNumber(estimatedFee);
            const displayAmountBN = balanceBN.minus(estimatedFeeBN);
            setDisplayAmount(displayAmountBN.toString());
        }
    }

    const isDisable =
        !Number(displayAmount) ||
        selectedWallet && selectedWallet.balance <= 0 ||
        selectedWallet && selectedWallet.balance < +displayAmount ||
        validAddress === false;

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={styles.header}>
                    <View style={styles.textWrapper}>
                        <TouchableOpacity
                            onPress={() => {
                                router.back();
                            }}
                        >
                            <Image
                                source={require('./../../assets/images/return.png')}
                                resizeMode="contain"
                                style={{ height: 24, width: 24 }}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={{ ...styles.textWrapper, alignItems: 'center' }}>
                        <Text style={styles.depositText}>Deposit</Text>
                        <View style={styles.availableContainer}>
                            <Image
                                source={require('./../../assets/images/grey-solana.png')}
                                resizeMode="contain"
                                style={{ height: 16, width: 16 }}
                            />
                            <Text style={styles.availableText}>
                                {selectedWallet?.balance.toFixed(2)} available
                            </Text>
                        </View>
                    </View>
                    <View style={{ ...styles.textWrapper, alignItems: 'flex-end' }}>
                        <TouchableOpacity onPress={selectMaxAmount}>
                            <Text style={styles.maxBtnText}>Max</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.amountLabelContainer}>
                    <View style={styles.amountLabelWrapper}>
                        <Image
                            source={require('./../../assets/images/white-solana.png')}
                            resizeMode="contain"
                            style={{ height: 48, width: 48 }}
                        />
                        <Text style={styles.amountLabelText}>
                            {displayAmount && displayAmount.length > 0 ? Math.trunc(+displayAmount * 100) / 100 : "0"}
                        </Text>
                    </View>
                </View>
                <View style={styles.addressInputContainer}>
                    <Text style={styles.addressInputLabel}>
                        Address
                    </Text>
                    <TextInput
                        style={styles.addressInputField}
                        placeholder="Paste your address"
                        placeholderTextColor="#7b7b7b"
                        onChangeText={(text) => setSubmittedAddress(text)}
                    />
                    <Text style={styles.addressInfoLabel}>
                        Only Solana (SOL) Address
                    </Text>
                </View>
                <View style={styles.keyPadContainer}>
                    <View style={styles.keyPadRow}>
                        <TouchableOpacity onPress={() => { addInput("1") }}>
                            <Text style={styles.keyPadKey}>1</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { addInput("2") }}>
                            <Text style={styles.keyPadKey}>2</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { addInput("3") }}>
                            <Text style={styles.keyPadKey}>3</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.keyPadRow}>
                        <TouchableOpacity onPress={() => { addInput("4") }}>
                            <Text style={styles.keyPadKey}>4</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { addInput("5") }}>
                            <Text style={styles.keyPadKey}>5</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { addInput("6") }}>
                            <Text style={styles.keyPadKey}>6</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.keyPadRow}>
                        <TouchableOpacity onPress={() => { addInput("7") }}>
                            <Text style={styles.keyPadKey}>7</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { addInput("8") }}>
                            <Text style={styles.keyPadKey}>8</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { addInput("9") }}>
                            <Text style={styles.keyPadKey}>9</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.keyPadRow}>
                        <TouchableOpacity onPress={() => { addInput(".") }}>
                            <Text style={styles.keyPadKey}>.</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { addInput("0") }}>
                            <Text style={styles.keyPadKey}>0</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { handleClear() }}>
                            <Text style={styles.keyPadKey}><Ionicons name="arrow-back" size={24} color="white" /></Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.confirmButtonContainer}>
                    <TouchableOpacity disabled={isDisable} style={[
                        styles.confirmButton,
                        !isDisable && styles.confirmButtonEnable, // Only added if isDisabled === true
                    ]}>
                        <Text style={[styles.confirmButtonText, !isDisable && styles.confirmButtonTextEnable]}>Confirm</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    confirmButton: {
        display: 'flex',
        paddingVertical: 20,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'stretch',
        backgroundColor: '#373737',
        borderRadius: 100
    },
    confirmButtonEnable: {
        backgroundColor: '#fff',
    },
    confirmButtonText: {
        color: '#7B7B7B',
        textAlign: 'center',
        fontFamily: 'Inter',
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: 700,
        lineHeight: 22,
    },
    confirmButtonTextEnable: {
        color: '#000'
    },
    confirmButtonContainer: {
        paddingHorizontal: 24,
        paddingVertical: 12,
    },
    keyPadContainer: {
        padding: 24,
        gap: 24,
    },
    keyPadKey: {
        color: '#FFF',
        fontFamily: 'Inter',
        fontSize: 28,
        fontStyle: 'normal',
        fontWeight: 700,
        lineHeight: 39.2,
        padding: 24,
        alignItems: 'center'
    },
    keyPadRow: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    addressInputContainer: {
        padding: 24,
        gap: 4
    },
    addressInfoLabel: {
        color: '#7b7b7b',
        fontFamily: 'Inter',
        fontSize: 14,
        fontStyle: 'normal',
        fontWeight: 400,
        lineHeight: 20
    },
    addressInputField: {
        paddingVertical: 12,
        paddingHorizontal: 18,
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 8,
        borderColor: '#373737',
        borderWidth: 1,
        fontSize: 16,
        color: '#7b7b7b'
    },
    addressInputLabel: {
        color: '#fff',
        fontFamily: 'Inter',
        fontSize: 15,
        fontStyle: 'normal',
        fontWeight: 700,
        lineHeight: 18,
    },
    amountLabelContainer: {
        paddingHorizontal: 24,
        paddingVertical: 12,
    },
    amountLabelWrapper: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    amountLabelText: {
        color: '#FFF',
        textAlign: 'center',
        fontFamily: 'Inter',
        fontSize: 64,
        fontStyle: 'normal',
        fontWeight: 500,
        lineHeight: 89.6
    },
    //
    container: {
        flex: 1,
        backgroundColor: '#121212',
        paddingHorizontal: 20,
        paddingTop: 10,
    },
    header: {
        flexDirection: 'row',
        marginBottom: 10,
        padding: 12,
        alignItems: "center",
    },
    backArrow: {
        color: '#fff',
        fontSize: 24,
        marginRight: 10,
    },
    headerBalanceContainer: {
        flexDirection: 'column',
    },
    headerTitle: {
        flex: 1,
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',
        fontFamily: 'Inter',
        fontStyle: 'normal',
        fontWeight: 500,
        lineHeight: 22
    },
    balanceText: {
        color: '#ffffff99', // semi-transparent white
        fontSize: 14,
        marginBottom: 20,
        textAlign: 'center',
    },
    textWrapper: {
        flex: 1,
    },
    depositText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '600',
    },
    availableText: {
        color: '#aaaaaa',
        fontSize: 14,
        marginTop: 2,
    },
    availableContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    maxBtnText: {
        color: '#0080b2',
        fontWeight: 500
    }
});

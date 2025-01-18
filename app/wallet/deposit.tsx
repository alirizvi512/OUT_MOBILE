import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    Image
} from 'react-native';
import * as Clipboard from 'expo-clipboard';
import QRCode from 'react-native-qrcode-svg';
import { router } from 'expo-router';
import useSolanaTransaction from '@/callbacks/useSolanaTransaction';

export default function DepositScreen() {
    const { selectedWallet } = useSolanaTransaction();

    const handleCopyToClipboard = async () => {
        await Clipboard.setStringAsync(selectedWallet?.address || "");
        alert('Address copied to clipboard!');
    };

    return (
        <SafeAreaView style={styles.container}>
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
                <View style={styles.textWrapper}>
                </View>
            </View>
            <View style={styles.mainContainer}>
                {/* Coin title */}
                <Text style={styles.title}>Solana</Text>
                <Text style={styles.subTitle}>Only send over Solana (SOL) network</Text>

                {/* QR Code */}
                <View style={styles.qrContainer}>
                    <QRCode
                        value={selectedWallet?.address}
                        size={192}
                        logoSize={30}
                        logo={{ uri: 'https://ih1.redbubble.net/image.3195183455.4748/st,small,507x507-pad,600x600,f8f8f8.u2.jpg' }}
                    />
                </View>

                {/* Address section */}
                <Text style={styles.sectionLabel}>SOL address</Text>
                <View style={styles.addressContainer}>
                    <Text style={styles.address}>{selectedWallet?.address}</Text>
                    <TouchableOpacity onPress={handleCopyToClipboard} style={styles.copyButton}>
                        <Text style={styles.copyButtonText}>Copy</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
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
    title: {
        color: '#fff',
        fontSize: 28,
        fontWeight: '700',
        marginBottom: 4,
        fontFamily: 'Inter',
        fontStyle: 'normal',
        lineHeight: 39.2
    },
    subTitle: {
        fontSize: 16,
        marginBottom: 24,
        fontFamily: 'Inter',
        fontStyle: 'normal',
        lineHeight: 24,
        color: '#7B7B7B',
        fontWeight: 400
    },
    qrContainer: {
        marginBottom: 24,
    },
    sectionLabel: {
        color: '#FFF',
        fontSize: 16,
        marginBottom: 8,
        fontFamily: 'Inter',
        fontStyle: 'normal',
        fontWeight: 700,
        lineHeight: 22,
    },
    addressContainer: {
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    address: {
        color: '#7B7B7B',
        fontSize: 16,
        fontFamily: 'Inter',
        fontStyle: 'normal',
        fontWeight: 400,
        lineHeight: 24,
        flex: 1,
        marginRight: 10,
    },
    copyButton: {
        backgroundColor: '#373737',
        paddingVertical: 12,
        paddingHorizontal: 12,
        borderRadius: 999999,
    },
    copyButtonText: {
        color: '#FFF',
        fontSize: 16,
        fontFamily: 'Inter',
        fontStyle: 'normal',
        fontWeight: 700,
        lineHeight: 22,
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
        color: '#7B7B7B',
        fontSize: 14,
        marginTop: 2,
        lineHeight: 20,
    },
    mainContainer: {
        padding: 24
    },
    availableContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    }
});

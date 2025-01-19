import React, { useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Image
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { truncateAddress } from '@/utils/generalFunctions';
import useSolanaTransaction from '@/callbacks/useSolanaTransaction';
import * as Clipboard from 'expo-clipboard';
import { router } from 'expo-router';
import SinglePortfolio from './SinglePotfolio';
import EmptyWalletContainer from './EmptyWalletContainer';
import SingleHistory from './SingleHistory';

export default function WalletWrapper() {

    const { localWallets, selectedWallet } = useSolanaTransaction();
    const copyToClipboard = async () => {
        await Clipboard.setStringAsync(selectedWallet?.address || "");
        alert('Copied to clipboard!');
    };
    return (
        <ScrollView style={styles.container}>

            {/* --- Wallets Section --- */}
            <Text style={{ ...styles.sectionTitle, padding: 24 }}>Wallets</Text>

            <ScrollView
                horizontal
                style={styles.walletsContainer}
                contentContainerStyle={styles.walletsContentContainer}
                showsHorizontalScrollIndicator={false}
            >
                {
                    localWallets.map((wallet, index) => {
                        return (
                            <View key={index} style={styles.walletCard}>
                                <View style={styles.walletCardHeader}>
                                    <Image
                                        source={require('./../../assets/images/privy.png')}
                                        resizeMode="contain"
                                        style={styles.walletImage}
                                    />
                                    <Image
                                        source={require('./../../assets/images/tick-circle.png')}
                                        resizeMode="contain"
                                        style={styles.tickImage}
                                    />
                                </View>
                                <View style={styles.walletInfo}>
                                    <View style={styles.walletAmountWrapper}>
                                        <Image
                                            source={require('./../../assets/images/white-solana.png')}
                                            resizeMode="contain"
                                            style={styles.solanaImage}
                                        />
                                        <Text style={styles.walletAmount}>{wallet.balance.toFixed(2)}</Text>
                                    </View>
                                    {/* <Text style={styles.walletAddress}>{wallet.address}</Text> */}
                                    <Text style={styles.walletAddress}>{truncateAddress(wallet.address)}</Text>
                                </View>
                            </View>
                        )
                    })
                }
            </ScrollView>

            <View style={styles.divider} />

            {/* --- Balance Section --- */}
            <View style={styles.balanceContainer}>
                {/* <View style={styles.balanceHeader}> */}
                <Text style={styles.balanceTitle}>Balance</Text>
                <View style={styles.walletAmountWrapper}>
                    <Image
                        source={require('./../../assets/images/white-solana.png')}
                        resizeMode="contain"
                        style={styles.solanaBigImage}
                    />
                    <Text style={styles.balanceAmount}>{selectedWallet?.balance.toFixed(2)}</Text>
                </View>
                {/* </View> */}
            </View>


            <View style={styles.actionsRow}>
                <TouchableOpacity style={styles.actionItem} onPress={() => { router.push("/wallet/deposit") }}>
                    <LinearGradient
                        colors={['#22C1C3', '#6EF195']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.walletButtons}
                    >
                        <Image
                            source={require('./../../assets/images/arrow-down.png')}
                            resizeMode="contain"
                            style={{ height: 24, width: 24 }}
                        />
                    </LinearGradient>
                    <Text style={styles.actionLabel}>Deposit</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionItem} onPress={() => { router.push("/wallet/withdraw") }}>
                    <LinearGradient
                        colors={['#F40752', '#F65770', '#F9AB8F']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.walletButtons}
                    >
                        <Image
                            source={require('./../../assets/images/arrow-up.png')}
                            resizeMode="contain"
                            style={{ height: 24, width: 24 }}
                        />
                    </LinearGradient>
                    <Text style={styles.actionLabel}>Withdraw</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionItem}>
                    <LinearGradient
                        colors={['#FFB628', '#EA6A23']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.walletButtons}
                    >
                        <Image
                            source={require('./../../assets/images/export.png')}
                            resizeMode="contain"
                            style={{ height: 24, width: 24 }}
                        />
                    </LinearGradient>
                    <Text style={styles.actionLabel}>Export</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={copyToClipboard} style={styles.actionItem}>
                    <LinearGradient
                        colors={['#3B7475', '#44A08D']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.walletButtons}
                    >
                        <Image
                            source={require('./../../assets/images/copy.png')}
                            resizeMode="contain"
                            style={{ height: 24, width: 24 }}
                        />
                    </LinearGradient>
                    <Text style={styles.actionLabel}>Copy</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.divider} />

            {/* --- Portfolio Section --- */}
            <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Portfolio</Text>
                <TouchableOpacity onPress={() => { router.push("/wallet/portfolio") }}>
                    <Text style={styles.showAll}>
                        Show all
                    </Text>
                </TouchableOpacity>
            </View>
            <SinglePortfolio />
            <SinglePortfolio />
            <SinglePortfolio />

            <View style={styles.divider} />

            <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>History</Text>
                <TouchableOpacity onPress={() => { router.push("/wallet/activity") }}>
                    <Text style={styles.showAll}>
                        Show all
                    </Text>
                </TouchableOpacity>
            </View>
            <SingleHistory success={true} />
            <SingleHistory success={false} />
            <SingleHistory success={true} />
            {/* <EmptyWalletContainer /> */}
        </ScrollView >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#171717',
    },
    sectionTitle: {
        color: '#fff',
        fontSize: 21,
        fontWeight: 'bold',
        lineHeight: 29.4,
    },
    walletsContainer: {
        borderRadius: 10,
        padding: 24,
        paddingTop: 0,
    },
    walletsContentContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    walletCard: {
        width: 160,
        height: 120,
        padding: 18,
        paddingBottom: 12,
        borderRadius: 8,
        backgroundColor: '#4A4A4A',
        marginRight: 16,
    },
    walletCardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        alignSelf: 'stretch',
    },
    walletImage: {
        width: 18.595,
        height: 24,
    },
    tickImage: {
        width: 24,
        height: 24,
    },
    solanaImage: {
        width: 20,
        height: 20,
    },
    solanaBigImage: {
        width: 30,
        height: 30,
    },
    walletInfo: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    walletAmountWrapper: {
        flexDirection: 'row',
    },
    walletAmount: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
        lineHeight: 22,
        marginLeft: 4, // spacing after icon
    },
    walletButtons: {
        width: 44,
        height: 44,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '50%'
    },
    walletAddress: {
        color: '#7B7B7B',
        fontSize: 14,
        marginTop: 4,
    },
    divider: {
        height: 1,
        backgroundColor: '#2D2D2D',
    },
    balanceContainer: {
        display: 'flex',
        padding: 24,
        flexDirection: 'column',
        alignItems: 'flex-start',
        // gap: 24,
        alignSelf: 'stretch'
    },
    balanceHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        marginBottom: 16,
        paddingHorizontal: 24,
    },
    balanceTitle: {
        color: '#7B7B7B',
        fontFamily: 'Inter',
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: 700,
        lineHeight: 22,
        marginBottom: 7
    },
    balanceAmount: {
        color: '#fff',
        fontSize: 28,
        fontFamily: 'Inter',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        fontStyle: 'normal',
        fontWeight: 700,
        lineHeight: 32
    },
    actionsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    actionItem: {
        alignItems: 'center',
        width: '23%',
    },
    actionLabel: {
        color: '#fff',
        fontSize: 14,
        marginTop: 4,
        lineHeight: 20
    },
    sectionHeader: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 24,
    },
    showAll: {
        fontSize: 16,
        color: '#7B7B7B',
        textAlign: 'center',
        fontFamily: 'Inter',
        fontStyle: 'normal',
        fontWeight: 700,
        lineHeight: 22,
    }
});

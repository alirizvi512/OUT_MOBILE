import BottomSheetComponent from "@/components/common/BottomSheetComponent";
import { router } from "expo-router";
import React, { useState, useEffect } from "react";
import {
    SafeAreaView,
    StatusBar,
    StyleSheet,
    TouchableOpacity,
    View,
    Image,
    Text,
    TextInput,
    ScrollView
} from "react-native";

export default function InitialBuyScreen() {
    const [amount, setAmount] = useState('');

    const handleMaxPress = () => {
        setAmount('100');
    };

    return (
        <>
            <StatusBar barStyle="light-content" backgroundColor="#171717" />
            <SafeAreaView style={styles.container}>
                {/* Scrollable area for all the top content */}
                <ScrollView
                    style={{ flex: 1 }}
                    contentContainerStyle={{ paddingBottom: 60 }}
                >
                    <View style={styles.header}>
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
                        <Image
                            source={{ uri: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD...' }}
                            resizeMode="contain"
                            style={styles.pfpImage}
                        />
                        <View>
                            <Text style={styles.displayName}>Ovidiu Protopopescu</Text>
                            <Text style={styles.handle}>@ovidui</Text>
                        </View>
                    </View>

                    <View style={styles.detailsContainer}>
                        <Text style={styles.detailsLabel}>Details</Text>
                        <View style={styles.detailsValueContainer}>
                            <View style={styles.leftItems}>
                                <Image
                                    source={require('./../../assets/images/chips.png')}
                                    resizeMode="contain"
                                    style={{ height: 24, width: 24, marginRight: 8 }}
                                />
                                <Text style={styles.detailsValueLabel}>Circulating Chips</Text>
                            </View>
                            <Text style={[styles.detailsValueLabel]}>250</Text>
                        </View>
                        <View style={styles.detailsValueContainer}>
                            <View style={styles.leftItems}>
                                <Image
                                    source={require('./../../assets/images/solana-green.png')}
                                    resizeMode="contain"
                                    style={{ height: 24, width: 24, marginRight: 8 }}
                                />
                                <Text style={styles.detailsValueLabel}>Price per Chip</Text>
                            </View>
                            <Text style={styles.detailsValueLabel}>1 SOL</Text>
                        </View>
                    </View>

                    <View style={styles.inputContainer}>
                        <View style={styles.inputDiv}>
                            <Text style={styles.inputLabel}>Chips Amount</Text>
                            <View style={styles.maxInputContainer}>
                                <TextInput
                                    style={styles.maxInput}
                                    placeholder="Enter Amount"
                                    placeholderTextColor="#7B7B7B"
                                    value={amount}
                                    onChangeText={setAmount}
                                    keyboardType="numeric"
                                />
                                <TouchableOpacity onPress={handleMaxPress}>
                                    <Text style={styles.maxBtnText}>Max</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.inputDiv}>
                            <Text style={styles.inputLabel}>Wallet</Text>
                            <View style={styles.maxInputContainer}>
                                <TextInput
                                    style={styles.maxInput}
                                    placeholder="Enter Amount"
                                    placeholderTextColor="#7B7B7B"
                                    keyboardType="numeric"
                                />
                                <TouchableOpacity onPress={handleMaxPress}>
                                    <Image
                                        source={require('./../../assets/images/down-caret.png')}
                                        resizeMode="contain"
                                        style={{ height: 24, width: 24 }}
                                    />
                                </TouchableOpacity>
                            </View>
                            <BottomSheetComponent selectedWallet="" setSelectedWallet={() => { }}>
                                <View>
                                    <Text>This is custom content passed as children!</Text>
                                </View>
                            </BottomSheetComponent>
                        </View>
                    </View>

                    <View style={styles.additionalDetailsContainer}>
                        <View style={styles.additionalDetailsRow}>
                            <Text style={styles.additionalDetailsLabel}>Fee</Text>
                            <View style={styles.additionalDetailsAmountRow}>
                                <Image
                                    source={require('./../../assets/images/white-solana.png')}
                                    resizeMode="contain"
                                    style={{ height: 20, width: 20 }}
                                />
                                <Text style={styles.additionalDetailsLabel}>0</Text>
                            </View>
                        </View>
                        <View style={styles.additionalDetailsRow}>
                            <Text style={styles.additionalDetailsLabel}>Total</Text>
                            <View style={styles.additionalDetailsAmountRow}>
                                <Image
                                    source={require('./../../assets/images/white-solana.png')}
                                    resizeMode="contain"
                                    style={{ height: 20, width: 20 }}
                                />
                                <Text style={styles.additionalDetailsLabel}>0</Text>
                            </View>
                        </View>
                        <View style={styles.additionalDetailsNoticeRow}>
                            <Text style={styles.additionalDetailsNotice}>90% of chips fees goes directly to creators</Text>
                        </View>
                    </View>
                </ScrollView>

                {/* BUY button pinned at the bottom */}
                <View style={styles.buyButtonContainer}>
                    <TouchableOpacity style={styles.buyButton}>
                        <Text style={styles.buyButtonText}>BUY</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </>
    )
}

const styles = StyleSheet.create({
    additionalDetailsNoticeRow: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    additionalDetailsNotice: {
        textAlign: 'center',
        color: '#7B7B7B',
        fontFamily: 'Inter',
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: 500,
        lineHeight: 22,
    },
    buyButtonText: {
        textAlign: 'center',
        color: '#7B7B7B',
        fontFamily: 'Inter',
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: 700,
        lineHeight: 22,
    },
    buyButton: {
        width: '100%',
        paddingVertical: 20,
        borderRadius: 100,
        backgroundColor: '#373737'
    },
    buyButtonContainer: {
        display: 'flex',
        flexDirection: 'row',
        paddingVertical: 16,
        paddingHorizontal: 24
    },
    additionalDetailsLabel: {
        color: '#FFF',
        fontFamily: 'Inter',
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: 400,
        lineHeight: 24,
    },
    additionalDetailsAmountRow: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    additionalDetailsRow: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    additionalDetailsContainer: {
        display: 'flex',
        padding: 24,
        gap: 24
    },
    inputDiv: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        gap: 4
    },
    maxInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 8,
        borderColor: '#373737',
        borderWidth: 1,
        paddingHorizontal: 18,
        paddingVertical: 12,
    },
    maxInput: {
        flex: 1,
        color: '#fff',
        fontSize: 16,
        marginRight: 8,
    },
    maxBtnText: {
        color: '#00adee',
        fontSize: 16,
        fontWeight: '600',
    },
    inputLabel: {
        color: '#FFF',
        fontFamily: 'Inter',
        fontSize: 15,
        fontStyle: 'normal',
        fontWeight: 700,
        lineHeight: 18,
    },
    inputContainer: {
        padding: 24,
        gap: 24,
        borderBottomColor: '#373737',
        borderBottomWidth: 2
    },
    detailsValueContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 8,
    },
    leftItems: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    detailsValueLabel: {
        color: '#FFF',
        fontFamily: 'Inter',
        fontSize: 16,
        fontWeight: '400',
        lineHeight: 24,
    },
    detailsLabel: {
        color: '#FFF',
        fontFamily: 'Inter',
        fontSize: 21,
        fontStyle: 'normal',
        fontWeight: 700,
        lineHeight: 29.4,
    },
    detailsContainer: {
        padding: 24,
        gap: 24,
        borderBottomColor: '#373737',
        borderBottomWidth: 2
    },
    handle: {
        color: '#7B7B7B',
        fontFamily: 'Inter',
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: 500,
        lineHeight: 22,
    },
    displayName: {
        color: '#FFF',
        fontFamily: 'Inter',
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: 700,
        lineHeight: 22,
    },
    pfpImage: {
        width: 48,
        height: 48,
        borderRadius: 48
    },
    header: {
        padding: 12,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
        borderBottomColor: '#373737',
        borderBottomWidth: 2
    },
    container: {
        flex: 1,
        backgroundColor: "#171717",
        paddingHorizontal: 20,
        paddingTop: 10,
    },
});

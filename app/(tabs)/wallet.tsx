
import Header from "@/components/common/Header";
import WalletWrapper from "@/components/wallet/Wrapper";
import React from "react";
import { SafeAreaView, StatusBar, StyleSheet } from "react-native";

export default function WalletScreen() {
    return (
        <>
            <StatusBar barStyle="light-content" backgroundColor="#171717" />
            <SafeAreaView style={styles.safeArea}>
                <Header from="wallet" />
                <WalletWrapper />
            </SafeAreaView>
        </>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#171717',
    },
    footer: {
        paddingVertical: 20,
    },
});

import WalletHeader from "@/components/wallet/WalletHeader";
import React, { useState, useEffect } from "react";
import { SafeAreaView, StatusBar, StyleSheet, View, Text } from "react-native";
export default function SearchScreen() {
    return (
        <>
            <StatusBar barStyle="light-content" backgroundColor="#171717" />
            <SafeAreaView style={styles.container}>
                <WalletHeader from="portfolio" />
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Portfolio</Text>
                </View>
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>History</Text>
                </View>
                {/* <FlatList
                    data={portfolios}
                    renderItem={renderPortfolio}
                    keyExtractor={(item, index) =>
                        index.toString()
                    }
                    onEndReached={loadPortfolios}
                    onEndReachedThreshold={0.5}
                    ListFooterComponent={renderFooter}
                    contentContainerStyle={styles.listContent}
                /> */}
            </SafeAreaView>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#171717",
        paddingHorizontal: 20,
        paddingTop: 10,
    },
    listContent: {
        paddingVertical: 24,
    },
    sectionTitle: {
        color: '#fff',
        fontSize: 21,
        fontWeight: 'bold',
        lineHeight: 29.4,
    },
    sectionHeader: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 24,
        paddingTop: 0,
    },
});
import React, { useState, useEffect } from "react";
import { SafeAreaView, FlatList, StyleSheet, ActivityIndicator, View, StatusBar, Text } from "react-native";
import WalletHeader from "@/components/wallet/WalletHeader";
import SinglePortfolio from "@/components/wallet/SinglePotfolio";
import { getGCCHoldings } from "@/services/getGCCHoldings";
import { IGCCHoldings } from "@/types/IGCCHoldings";
import useSolanaTransaction from "@/callbacks/useSolanaTransaction";

export default function Portfolio() {
    const { selectedWallet } = useSolanaTransaction()
    const [portfolios, setPortfolios] = useState<IGCCHoldings[]>([]);
    const [page, setPage] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);
    const [hasMore, setHasMore] = useState<boolean>(true);

    const loadPortfolios = async () => {
        console.log(loading, hasMore, selectedWallet)
        if (loading || !hasMore || !selectedWallet) return;
        setLoading(true);
        const data = await getGCCHoldings(page, selectedWallet.address, "");

        if (!data || data.length === 0) {
            setHasMore(false);
        } else {
            setPortfolios((prev) => [...prev, ...data]);
            setPage((prev) => prev + 1);
        }

        setLoading(false);
    };

    useEffect(() => {
        if (selectedWallet) {
            loadPortfolios();
        }
    }, [selectedWallet]);

    const renderPortfolio = ({ item }: { item: IGCCHoldings }) => (
        <SinglePortfolio portfolio={item} />
    );
    const renderFooter = () => {
        if (!loading) return null;
        return (
            <View style={{ paddingVertical: 20 }}>
                <ActivityIndicator color="#fff" />
            </View>
        );
    };

    return (
        <>
            <StatusBar barStyle="light-content" backgroundColor="#171717" />
            <SafeAreaView style={styles.container}>
                <WalletHeader from="portfolio" />
                <FlatList
                    ListHeaderComponent={
                        <View style={styles.sectionHeader}>
                            <Text style={styles.sectionTitle}>Portfolio</Text>
                        </View>
                    }
                    data={portfolios}
                    renderItem={renderPortfolio}
                    keyExtractor={(item, index) =>
                        index.toString()
                    }
                    onEndReached={loadPortfolios}
                    onEndReachedThreshold={0.5}
                    ListFooterComponent={renderFooter}
                    contentContainerStyle={styles.listContent}
                />
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

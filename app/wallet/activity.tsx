import React, { useState, useEffect } from "react";
import { SafeAreaView, FlatList, StyleSheet, ActivityIndicator, View, StatusBar } from "react-native";
import WalletHeader from "@/components/wallet/WalletHeader";
import useSolanaTransaction from "@/callbacks/useSolanaTransaction";
import SingleHistory from "@/components/wallet/SingleHistory";
import { IGCCActivity } from "@/types/IGCCActivity";
import { getGCCActivity } from "@/services/getGCCActivity";

export default function Activity() {
    const { selectedWallet } = useSolanaTransaction()
    const [activities, setActivities] = useState<IGCCActivity[]>([]);
    const [page, setPage] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);
    const [hasMore, setHasMore] = useState<boolean>(true);

    const loadActivities = async () => {
        console.log(loading, hasMore, selectedWallet)
        if (loading || !hasMore || !selectedWallet) return;
        setLoading(true);
        const data = await getGCCActivity(page, selectedWallet.address, "");

        if (!data || data.length === 0) {
            setHasMore(false);
        } else {
            setActivities((prev) => [...prev, ...data]);
            setPage((prev) => prev + 1);
        }

        setLoading(false);
    };

    useEffect(() => {
        if (selectedWallet) {
            loadActivities();
        }
    }, [selectedWallet]);

    const renderActivity = ({ item }: { item: IGCCActivity }) => (
        <SingleHistory activity={item} />
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
                <WalletHeader from="activity" />
                <FlatList
                    data={activities}
                    renderItem={renderActivity}
                    keyExtractor={(item, index) =>
                        index.toString()
                    }
                    onEndReached={loadActivities}
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
});

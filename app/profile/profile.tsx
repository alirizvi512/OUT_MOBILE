import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    ActivityIndicator,
    RefreshControl,
    Animated,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import Card from "@/components/feed/Card";
import { fetchFeedStart, refreshFeedStart } from "@/redux/slice/feedSlice";
import { RootState } from "@/redux/store";
import { ITake } from "@/types/Itake";
import { deleteSecureData } from "@/store";

export default function ProfileScreen() {
    const dispatch = useDispatch();
    const { data, isLoading, isRefreshing, hasMore, page } = useSelector((state: RootState) => state.feed);
    const [scrollY] = useState(new Animated.Value(0)); // Track scroll position

    useEffect(() => {
        // dispatch(fetchFeedStart(0)); // Fetch initial data (page 0)
    }, [dispatch]);

    const handleRefresh = () => {
        dispatch(refreshFeedStart());
    };

    const handleLoadMore = () => {
        if (!isLoading && hasMore) {
            dispatch(fetchFeedStart(page + 1)); // Fetch next page
        }
    };

    const renderFooter = () => {
        if (!isLoading || !hasMore) return null;
        return <ActivityIndicator style={styles.footer} />;
    };

    const renderItem = ({ item }: { item: ITake }) => <Card key={item.id} take={item} />;

    return (
        <View style={styles.safeContainer}>
            <FlatList
                data={data}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
                onEndReached={handleLoadMore}
                onEndReachedThreshold={0.5}
                ListFooterComponent={renderFooter}
                refreshControl={
                    <RefreshControl
                        refreshing={isRefreshing}
                        onRefresh={handleRefresh}
                        colors={["#FFFFFF"]}
                        tintColor="#FFFFFF"
                    />
                }
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyTitle}>Empty</Text>
                        <Text style={styles.emptyText}>
                            No take is associated with this user so far.
                        </Text>
                    </View>
                }
                ListHeaderComponent={
                    <View style={styles.takesContainer}>
                        {/* Header Image */}
                        <View style={styles.headerImageContainer}>
                            <Image
                                source={{ uri: "https://c8.alamy.com/comp/2HM57JM/nft-non-fungible-token-high-tech-technology-banner-2HM57JM.jpg" }}
                                style={styles.headerImage}
                            />
                            <TouchableOpacity
                                style={styles.backButton}
                                onPress={() => {
                                    router.back();
                                }}
                            >
                                <Ionicons name="arrow-back" size={24} color="white" />
                            </TouchableOpacity>
                        </View>

                        {/* Profile Info */}
                        <View style={styles.profileContainer}>
                            <Image
                                source={{ uri: "https://unchainedcrypto.com/wp-content/uploads/2023/07/pfp-nft.png" }}
                                style={styles.profileImage}
                            />
                            <View style={styles.userName}>
                                <Text style={styles.profileName}>Ovidiu Protopopescu</Text>
                                <Text onPress={() => { router.push("/profile/followers-followings") }} style={styles.profileStats}>
                                    <Text style={styles.count}>23K</Text> Followers{" "}
                                    <Text style={styles.count}>109</Text> Following
                                </Text>
                            </View>
                        </View>
                        <View style={styles.socialContainer}>
                            <TouchableOpacity style={styles.socialButton}>
                                <Image style={styles.XImage} source={require('./../../assets/images/X.png')} />
                                <Text style={styles.socialButtonText}>@Ovidiu</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.socialButton}>
                                <Image
                                    source={{ uri: "https://unchainedcrypto.com/wp-content/uploads/2023/07/pfp-nft.png" }} // Replace with actual profile image URL
                                    style={styles.socialImage}
                                />
                                <Text style={styles.socialButtonText}>Art Theory</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.socialButton} onPress={() => { router.push("/profile/points") }}>
                                <Image
                                    source={require('./../../assets/images/star.png')} // Replace with actual profile image URL
                                    style={styles.socialImage}
                                />
                                <Text style={styles.socialButtonText}>23K</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.descriptionContainer}>
                            <Text style={styles.descriptionText}>
                                Art Theory is one of a number of newer cult designed to compete with
                                real art world. Like traditional art, Art Theory is both a cult and a
                                place for artist to share a place.
                            </Text>
                        </View>

                        <View style={styles.buttonRow}>
                            <TouchableOpacity style={styles.actionButton}>
                                <Text style={styles.actionButtonText}>GET GCC</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.actionButton}>
                                <Text style={styles.actionButtonText}>Follow</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                }
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    { useNativeDriver: false }
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    socialContainer: {
        flexDirection: "row",
        padding: 10,
        justifyContent: "space-between"
    },
    socialImage: {
        width: 24,
        height: 24,
        borderRadius: 40,
    },
    socialButton: {
        gap: 5,
        flexDirection: "row",
        backgroundColor: '#4A4A4A',
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 20,
        marginHorizontal: 5,
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
    },
    socialButtonText: {
        color: "#fff",
        fontWeight: 700,
        fontSize: 16
    },
    XImage: {
        width: 20,
        height: 20
    },
    emptyTitle: {
        color: "#aaa",
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 5,
    },
    emptyText: {
        color: "#555",
        fontSize: 14,
    },
    emptyContainer: {
        alignItems: "center",
        padding: 50,
        backgroundColor: "#171717",
        borderTopColor: '#373737',
        borderTopWidth: 2,
        marginTop: 20
    },
    takesContainer: {
        backgroundColor: "#171717",
        borderBottomColor: '#373737',
        borderBottomWidth: 2,
        paddingBottom: 20
    },
    buttonRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 10,
    },
    actionButton: {
        backgroundColor: "#fff",
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 20,
        marginHorizontal: 5,
        width: 172.5,
        alignItems: 'center',
        justifyContent: 'center',
        height: 46
    },
    actionButtonText: {
        color: "#000",
        fontWeight: "bold",
        fontSize: 16
    },
    safeContainer: {
        flex: 1,
        backgroundColor: "#171717", // Ensure background color is consistent
    },
    stickyHeader: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: 50,
        backgroundColor: "#1A1A1A",
        zIndex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    stickyHeaderContent: {
        flexDirection: "row",
        alignItems: "center",
    },
    stickyProfileImage: {
        width: 30,
        height: 30,
        borderRadius: 15,
        marginRight: 10,
    },
    stickyProfileName: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "bold",
    },
    headerImageContainer: {
        position: "relative",
    },
    headerImage: {
        width: "100%",
        height: 131,
    },
    backButton: {
        position: "absolute",
        bottom: 10,
        left: 10,
        backgroundColor: "#00000080",
        padding: 8,
        borderRadius: 20,
    },
    profileContainer: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        marginTop: 20,
    },
    profileImage: {
        width: 48,
        height: 48,
        borderRadius: 40,
        marginBottom: 10,
    },
    userName: {
        flexDirection: "column",
        marginLeft: 20,
    },
    profileName: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "700",
    },
    profileStats: {
        color: "#aaa",
        fontWeight: "500",
        fontSize: 14,
        marginTop: 5
    },
    count: {
        color: "#fff",
    },
    footer: {
        paddingVertical: 20,
    },
    descriptionContainer: {
        padding: 10,
    },
    descriptionText: {
        color: "#fff",
        fontSize: 16,
        lineHeight: 24,
        fontWeight: 400
    },
});

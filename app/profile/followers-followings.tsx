import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    FlatList,
    SafeAreaView,
    StatusBar,
} from "react-native";

const followers = Array(25).fill({
    name: "Bryan Johnson",
    username: "@zeroism",
    avatar: "https://img.freepik.com/free-vector/hand-drawn-nft-style-ape-illustration_23-2149622021.jpg", // Replace with actual avatar URLs
    isFollowing: false,
});

const followings = Array(25).fill({
    name: "Zayn Muslim",
    username: "@zaynu",
    avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQskK8bc4O3OArNEKNumZJssAuzLtYGHXsr0g&s", // Replace with actual avatar URLs
    isFollowing: true,
});

const FollowersFollowingsScreen = () => {
    const [activeTab, setActiveTab] = useState<string>("followers");
    const renderFollower = ({ item }: any) => (
        <View style={styles.followerItem}>
            <Image source={{ uri: item.avatar }} style={styles.avatar} />
            <View style={styles.followerInfo}>
                <Text style={styles.followerName}>{item.name}</Text>
                <Text style={styles.followerUsername}>{item.username}</Text>
            </View>
            <TouchableOpacity
                style={[
                    styles.followButton,
                    item.isFollowing && styles.followingButton,
                ]}
            >
                <Text
                    style={[
                        styles.followButtonText,
                        item.isFollowing && styles.followingButtonText,
                    ]}
                >
                    {item.isFollowing ? "Following" : "Follow"}
                </Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <>
            <StatusBar barStyle="light-content" backgroundColor="#171717" />
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.container}>
                    {/* Header */}
                    <View style={styles.header}>
                        <TouchableOpacity
                            onPress={() => {
                                router.back();
                            }}
                        >
                            <Ionicons name="arrow-back" size={24} color="white" />
                        </TouchableOpacity>
                        <Image
                            source={{
                                uri: "https://img.freepik.com/free-vector/hand-drawn-nft-style-ape-illustration_23-2149622021.jpg", // Replace with profile image URL
                            }}
                            style={styles.profileAvatar}
                        />
                        <View style={styles.profileInfo}>
                            <Text style={styles.profileName}>Ovidiu Protopopescu</Text>
                            <Text style={styles.profileStats}>
                                <Text style={styles.stat}>23K</Text> Followers{" "}
                                <Text style={styles.stat}>109</Text> Following
                            </Text>
                        </View>
                    </View>

                    {/* Tab Navigation */}
                    <View style={styles.tabContainer}>
                        <TouchableOpacity style={[styles.tabButton, activeTab === 'followers' ? styles.activeTab : ""]} onPress={() => { setActiveTab("followers") }}>
                            <Text style={[styles.tabText, activeTab === 'followers' ? "" : styles.inactiveTabText]}>Followers</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.tabButton, activeTab === 'followings' ? styles.activeTab : ""]} onPress={() => { setActiveTab("followings") }}>
                            <Text style={[styles.tabText, activeTab === 'followings' ? "" : styles.inactiveTabText]}>
                                Following
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <FlatList
                        data={activeTab === "followers" ? followers : followings}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={renderFollower}
                        contentContainerStyle={styles.listContent}
                    />
                </View>
            </SafeAreaView>
        </>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#171717',
    },
    container: {
        flex: 1,
        backgroundColor: "#171717",
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        padding: 16,
        backgroundColor: "#171717",
    },
    profileAvatar: {
        width: 48,
        height: 48,
        borderRadius: 40,
        marginRight: 16,
        marginLeft: 30,
    },
    profileInfo: {
        flex: 1,
    },
    profileName: {
        fontSize: 16,
        color: "#fff",
        fontWeight: 700,
        lineHeight: 22
    },
    profileStats: {
        fontSize: 14,
        color: "#bbb",
        marginTop: 4,
        fontWeight: 500,
        lineHeight: 20
    },
    stat: {
        color: "#fff",
        fontWeight: 500,
    },
    tabContainer: {
        flexDirection: "row",
        borderBottomWidth: 2,
        borderBottomColor: "#373737",
        borderTopWidth: 2,
        borderTopColor: "#373737",
    },
    tabButton: {
        alignItems: "center",
        paddingVertical: 25,
        paddingHorizontal: 20
    },
    activeTab: {
        borderBottomWidth: 2,
        borderBottomColor: "#fff",
    },
    tabText: {
        fontSize: 16,
        fontWeight: 700,
        color: "#fff",
    },
    inactiveTabText: {
        color: "#666",
    },
    listContent: {
        padding: 16,
    },
    followerItem: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 16,
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 12,
    },
    followerInfo: {
        flex: 1,
    },
    followerName: {
        fontSize: 16,
        color: "#fff",
        fontWeight: 700,
    },
    followerUsername: {
        fontSize: 16,
        color: "#888",
        fontWeight: 500,
        marginTop: 2,
    },
    followButton: {
        backgroundColor: "#fff",
        borderRadius: 999999,
        height: 46,
        width: 99,
        alignItems: "center",
        justifyContent: "center"
    },
    followButtonText: {
        fontSize: 16,
        fontWeight: 700,
        color: "#000",
        lineHeight: 22
    },
    followingButton: {
        backgroundColor: "#333",
    },
    followingButtonText: {
        color: "#fff",
    },
});

export default FollowersFollowingsScreen;

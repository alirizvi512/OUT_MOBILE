import React from "react";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Image,
    FlatList,
    TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const hotCults = Array(5).fill({
    name: "Don't Die",
    username: "@zeroism",
    avatar: "https://via.placeholder.com/50", // Replace with actual avatar URL
    followers: "23K",
    posts: "4.6M",
});

const topPredictors = Array(5).fill({
    name: "Bryan Johnson",
    username: "@zeroism",
    avatar: "https://via.placeholder.com/50", // Replace with actual avatar URL
});

const App = () => {
    const renderHotCult = ({ item }: any) => (
        <View style={styles.hotCultItem}>
            <Image source={{ uri: item.avatar }} style={styles.avatar} />
            <View style={styles.cultInfo}>
                <Text style={styles.cultName}>{item.name}</Text>
                <Text style={styles.cultUsername}>{item.username}</Text>
            </View>
            <View style={styles.cultStats}>
                <Text style={styles.stat}>
                    <Text style={styles.statIcon}>👥</Text> {item.followers}
                </Text>
                <Text style={styles.stat}>
                    <Text style={styles.statIcon}>📰</Text> {item.posts}
                </Text>
            </View>
        </View>
    );

    const renderPredictor = ({ item }: any) => (
        <View style={styles.predictorItem}>
            <Image source={{ uri: item.avatar }} style={styles.avatar} />
            <View style={styles.predictorInfo}>
                <Text style={styles.predictorName}>{item.name}</Text>
                <Text style={styles.predictorUsername}>{item.username}</Text>
            </View>
            <TouchableOpacity style={styles.followButton}>
                <Text style={styles.followButtonText}>Follow</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity style={styles.backButton}>
                        <Text style={styles.backArrow}>&lt;</Text>
                    </TouchableOpacity>
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search"
                        placeholderTextColor="#888"
                    />
                </View>
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Hot Cults</Text>
                    <FlatList
                        data={hotCults}
                        keyExtractor={(item, index) => `hotCult-${index}`}
                        renderItem={renderHotCult}
                    />
                </View>
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Top Predictors</Text>
                    <FlatList
                        data={topPredictors}
                        keyExtractor={(item, index) => `predictor-${index}`}
                        renderItem={renderPredictor}
                    />
                </View>
            </View>
        </SafeAreaView>
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
        padding: 16,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 16,
    },
    backButton: {
        marginRight: 12,
    },
    backArrow: {
        fontSize: 18,
        color: "#fff",
    },
    searchInput: {
        flex: 1,
        height: 40,
        backgroundColor: "#1A1A1A",
        borderRadius: 8,
        paddingHorizontal: 12,
        fontSize: 14,
        color: "#fff",
    },
    section: {
        marginTop: 16,
    },
    sectionTitle: {
        fontSize: 16,
        color: "#fff",
        fontWeight: "bold",
        marginBottom: 8,
    },
    hotCultItem: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 12,
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 12,
    },
    cultInfo: {
        flex: 1,
    },
    cultName: {
        fontSize: 14,
        color: "#fff",
        fontWeight: "bold",
    },
    cultUsername: {
        fontSize: 12,
        color: "#888",
    },
    cultStats: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: 100,
    },
    stat: {
        fontSize: 12,
        color: "#888",
    },
    statIcon: {
        fontSize: 12,
    },
    predictorItem: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 12,
    },
    predictorInfo: {
        flex: 1,
    },
    predictorName: {
        fontSize: 14,
        color: "#fff",
        fontWeight: "bold",
    },
    predictorUsername: {
        fontSize: 12,
        color: "#888",
    },
    followButton: {
        backgroundColor: "#fff",
        paddingVertical: 6,
        paddingHorizontal: 16,
        borderRadius: 16,
    },
    followButtonText: {
        fontSize: 12,
        fontWeight: "bold",
        color: "#000",
    },
});

export default App;

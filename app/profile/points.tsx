import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    SafeAreaView,
} from "react-native";

const PointsScreen = () => {
    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => {
                            router.back();
                        }}
                    >
                        <Ionicons name="arrow-back" size={24} color="white" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Points</Text>
                </View>

                {/* Profile Section */}
                <View style={styles.profileSection}>
                    <Image
                        source={{
                            uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVoBlvEt6wRxYF77pTe02gCrJ5pBzuUYYkug&s", // Replace with actual profile image URL
                        }}
                        style={styles.profileImage}
                    />
                    <View style={styles.profileInfo}>
                        <Text style={styles.profileName}>Ovidiu Protopopescu</Text>
                        <Text style={styles.profileUsername}>@ovidiu</Text>
                    </View>
                </View>

                {/* Balance Section */}
                <View style={styles.balanceSection}>
                    <Text style={styles.balanceLabel}>Balance:</Text>
                    <Text style={styles.balanceValue}>23,546 Points</Text>
                </View>

                {/* Referral Code Section */}
                <View style={styles.referralSection}>
                    <View style={styles.referralCodeContainer}>
                        <Text style={styles.referralLabel}>Referral Code</Text>
                        <Text style={styles.referralCode}>HLZmEP2YBKHENvzhpvo9rG</Text>
                    </View>
                    <TouchableOpacity style={styles.copyButton}>
                        <Text style={styles.copyButtonText}>Copy</Text>
                    </TouchableOpacity>
                </View>

                {/* Done Button */}
                <TouchableOpacity style={styles.doneButton} onPress={() => { router.back() }}>
                    <Text style={styles.doneButtonText}>Done</Text>
                </TouchableOpacity>
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
        paddingHorizontal: 20,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 16,
    },
    backButton: {
        position: "absolute",
        left: 0,
        justifyContent: "center",
        alignItems: "center",
    },
    backArrow: {
        fontSize: 18,
        color: "#FFFFFF",
    },
    headerTitle: {
        fontSize: 16,
        fontWeight: 500,
        color: "#FFFFFF",
    },
    profileSection: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 24,
    },
    profileImage: {
        width: 60,
        height: 60,
        borderRadius: 40,
        marginRight: 16,
    },
    profileInfo: {
        flex: 1,
    },
    profileName: {
        fontSize: 21,
        fontWeight: 700,
        color: "#FFFFFF",
        lineHeight: 29.4
    },
    profileUsername: {
        fontSize: 16,
        color: "#7b7b7b",
        fontWeight: 500,
        marginTop: 4,
    },
    balanceSection: {
        marginVertical: 16,
        flexDirection: "row",
        gap: 5
    },
    balanceLabel: {
        fontSize: 16,
        color: "#FFFFFF",
        fontWeight: 700,
        lineHeight: 22,
        marginBottom: 8,
    },
    balanceValue: {
        fontSize: 16,
        fontWeight: 700,
        lineHeight: 22,
        color: "#FFFFFF",
    },
    referralSection: {
        marginVertical: 16,
        flexDirection: "row",
        justifyContent: "space-between"
    },
    referralLabel: {
        fontSize: 16,
        fontWeight: 700,
        lineHeight: 22,
        color: "#FFFFFF",
        marginBottom: 8,
    },
    referralCodeContainer: {
        flexDirection: "column",
        alignItems: "flex-start",
        height: 53
    },
    referralCode: {
        fontSize: 16,
        fontWeight: 400,
        lineHeight: 24,
        color: "#7b7b7b",
        flex: 1,
    },
    copyButton: {
        backgroundColor: "#373737",
        height: 46,
        width: 81,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 999999,
    },
    copyButtonText: {
        fontSize: 16,
        fontWeight: 700,
        lineHeight: 22,
        color: "#FFFFFF",
    },
    doneButton: {
        backgroundColor: "#FFFFFF",
        borderRadius: 24,
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 14,
        marginTop: "auto",
        marginBottom: 16,
    },
    doneButtonText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#000000",
    },
});

export default PointsScreen;

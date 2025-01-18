import { View, Image, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function EmptyWalletContainer() {
    return (
        <View style={styles.emptyContainer}>
            <Text style={styles.emptyTitle}>Empty</Text>
            <Text style={styles.emptySubtitle}>
                You do not hold any Chips in your portfolio.
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    emptyContainer: {
        paddingVertical: 32,
        alignItems: 'center',
        justifyContent: 'center',
    },
    emptyTitle: {
        fontSize: 21,
        marginBottom: 4,
        color: '#7B7B7B',
        textAlign: 'center',
        fontFamily: 'Inter',
        fontStyle: 'normal',
        fontWeight: 700,
        lineHeight: 29.4,
    },
    emptySubtitle: {
        fontSize: 16,
        color: '#7B7B7B',
        textAlign: 'center',
        fontFamily: 'Inter',
        fontStyle: 'normal',
        fontWeight: 400,
        lineHeight: 24,
    },
});
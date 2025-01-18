import { View, Image, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function SinglePortfolio() {
    return (
        <View style={styles.listingContainer}>
            <View style={styles.listingInnerDiv}>
                <Image
                    source={{ uri: "data:image/jpeg;base64,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" }}
                    resizeMode="contain"
                    style={styles.pfpImage}
                />
                <View style={styles.userInfo}>
                    <Text style={styles.username}>Retardio</Text>
                    <Text style={styles.handle}>@retardioworld</Text>
                </View>
            </View>
            <View style={styles.listingInnerDiv}>
                <View style={styles.chipsAmountParentDiv}>
                    <Text style={styles.chipsAmount}>16 Chips</Text>
                </View>
                <View style={styles.chipsAmountParentDiv}>
                    <TouchableOpacity style={styles.modalBtn}>
                        <Image
                            source={require('./../../assets/images/arrow-right.png')}
                            resizeMode="contain"
                            style={{ width: 24, height: 24 }}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    listingInnerDiv: {
        flexDirection: 'row',
        gap: 12
    },
    modalBtn: {
        display: 'flex',
        padding: 3,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
        borderRadius: 999999,
        backgroundColor: '#373737',
        width: 39,
        height: 39
    },
    chipsAmountParentDiv: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    chipsAmount: {
        color: '#FFF',
        textAlign: 'right',
        fontFamily: 'Inter',
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: 500,
        lineHeight: 22,
    },
    handle: {
        color: '#7B7B7B',
        fontFamily: 'Inter',
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: 500,
        lineHeight: 22
    },
    username: {
        color: '#FFF',
        fontFamily: 'Inter',
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: 700,
        lineHeight: 22
    },
    userInfo: {
        flexDirection: 'column',
        gap: 4
    },
    pfpImage: {
        borderRadius: 48,
        width: 48,
        height: 48,
    },
    listingContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 24,
        paddingTop: 0,
        gap: 12
    },
});
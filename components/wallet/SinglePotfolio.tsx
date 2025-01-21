import useSolanaTransaction from "@/callbacks/useSolanaTransaction";
import { IGCCHoldings } from "@/types/IGCCHoldings";
import { router } from "expo-router";
import { useState } from "react";
import { View, Image, Text, TouchableOpacity, StyleSheet } from "react-native";

type SinglePortfolioProps = {
    portfolio: IGCCHoldings
}

export default function SinglePortfolio({ portfolio }: SinglePortfolioProps) {
    const [error, setError] = useState<boolean>(false);
    const { fromLamports } = useSolanaTransaction();
    return (
        <View style={styles.listingContainer}>
            <View style={styles.listingInnerDiv}>
                <Image
                    source={
                        error
                            ? require('./../../assets/images/default-pfp.png')
                            : {
                                uri: portfolio.subject.profilePic
                            }
                    }
                    resizeMode="contain"
                    style={styles.pfpImage}
                    defaultSource={require('./../../assets/images/default-pfp.png')}
                    onError={(e) => {
                        setError(true);
                    }}
                />
                <View style={styles.userInfo}>
                    <Text style={styles.username} numberOfLines={1} ellipsizeMode="middle">{portfolio.subject.displayName}</Text>
                    <Text style={styles.handle} numberOfLines={1} ellipsizeMode="middle">@{portfolio.subject.handle}</Text>
                </View>
            </View>
            <View style={styles.listingInnerDiv}>
                <View style={styles.chipsAmountParentDiv}>
                    <Text style={styles.chipsAmount}>{fromLamports(portfolio.tokens)} Chips</Text>
                </View>
                <View style={styles.chipsAmountParentDiv}>
                    <TouchableOpacity style={styles.modalBtn} onPress={() => { router.push("/profile/initialBuy") }}>
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
        gap: 4,
        maxWidth: 140
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